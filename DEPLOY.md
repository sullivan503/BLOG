# 🌿 疯文斋：自动化部署原理手册 (Automated CI/CD)

> **现在的部署方式**：全自动。你只需要负责写代码，剩下的交给机器人。

---

## 🛠 核心原理 (The "Magic")

这是一套标准的 **CI/CD (持续集成/持续部署)** 流程。
简单来说，我们雇佣了 GitHub 当我们的“搬运工”。

### 流程图解
```mermaid
graph LR
    A[本地电脑 (Local)] -- 1. git push --> B[GitHub 仓库 (Remote)]
    B -- 2. 触发信号 --> C[GitHub Actions (云端流水线)]
    subgraph "GitHub Actions 自动作业"
        C1[安装 Node.js]
        C2[npm run build (打包生成的 dist)]
        C3[SSH 连接 VPS]
    end
    C --> C1 --> C2 --> C3
    C3 -- 3. SCP 上传文件的 --> D[宝塔 VPS (Server)]
    D --> E[用户访问 (Live)]
```

---

## 📝 详细步骤拆解

### 1. 本地 (Local)
我们在 VS Code 里修改代码。
- **动作**：`git push`
- **作用**：把代码推送到 GitHub 的 `main` 主分支。这就是发令枪。

### 2. GitHub (Middleman)
GitHub 收到代码后，会检查 `.github/workflows/deploy.yml` 这个文件。
- **配置**：它发现我们写了“只要 main 分支有变动，就干活”。

### 3. GitHub Actions (The Worker)
GitHub 会临时启动一台 Linux 虚拟机（Runner），按顺序执行以下命令：
1.  **Checkout**: 把你的代码拉下来。
2.  **Install**: `npm install` 安装依赖。
3.  **Build**: `npm run build`。这一步会把我们的 React 代码编译成浏览器能看懂的 HTML/CSS/JS，放在 `dist` 文件夹里。
4.  **Deploy**: 使用 `appleboy/scp-action` 插件。
    - 它读取仓库设置里的 **Secrets** (密码/IP)。
    - 远程连接你的 VPS。
    - 把 `dist` 文件夹里的所有东西，**覆盖**上传到 VPS 的 `/www/wwwroot/www.fengwz.me` 目录。

### 4. VPS (The Host)
服务器其实什么都没做，只是被动接收了新文件。
- Nginx 发现文件变了，下次用户刷新页面时，就会加载新的内容。

---

## 🔑 关键配置 (Secrets)
为了让 GitHub 能连上你的 VPS，我们在 GitHub 仓库的 `Settings -> Secrets` 里配置了这些“钥匙”：
- `HOST`: 你的 VPS IP 地址
- `USERNAME`: 登录用户名 (e.g., root)
- `PASSWORD`: 登录密码
- `VITE_GEMINI_API_KEY`: 也就是在那边打包时需要的 API Key

---

## 🚀 总结
**以后更新网站只需要三步：**
1. 改代码。
2. `git add .` + `git commit -m "更新内容"`
3. `git push`

**然后喝口水，等 1 分钟，网站就自动更新了。**
