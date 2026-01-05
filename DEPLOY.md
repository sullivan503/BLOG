# 🌿 疯文斋：可视化部署通关手册 (Final Edition)

---

## 🏁 基础设施与环境 - [DONE ✅]
- [x] VPS (Debian 12) + 宝塔面板
- [x] LNMP (Nginx + PHP + MySQL)
- [x] WordPress 一键部署

---

## 🎨 域名与加密 - [DONE ✅]
- [x] DNS A记录解析 (Namecheap)
- [x] SSL 证书申请 (Let's Encrypt)
- [x] 强制 HTTPS 开启

---

## 🚀 最终发布：如何让 React 接管网站

### 1. 本地打包 (Local Build)
在开发环境执行：
```bash
npm run build
```
这会生成一个 `dist` 文件夹，这是你网站的“实体”。

### 2. 服务器文件替换 (File Management)
通过宝塔“文件”管理器进入网站根目录：
1.  **备份/更名**：将原有的 `index.php` 重命名为 `index_backup.php`。
2.  **上传**：将 `dist` 目录下的所有内容（`index.html` 和 `assets` 文件夹）上传到根目录。
3.  **保留**：保留 `wp-admin`, `wp-content`, `wp-includes` 等文件夹，它们是后台管理系统。

### 3. Nginx 优先级微调 (Critical!)
在宝塔“网站设置” -> “配置文件”中修改：
```nginx
# 找到这一行，把 index.html 挪到最前面
index index.html index.php;
```
这样服务器就会优先读取我们的 React 前端。

### 4. 伪静态设置 (SPA Routing)
在宝塔“网站设置” -> “伪静态”中，**清空**原有内容，添加以下代码：
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
# 保留后台访问
location /wp-admin/ {
    try_files $uri $uri/ /index.php?$args;
}
```
*这能确保你在点击“关于我”或“文章详情”后刷新页面不会报 404 错误。*

---

### 🎊 验收环节
访问 `https://fengwz.me`：
- 看到 React 界面？ **OK!**
- 看到 SSL 小锁？ **OK!**
- 访问 `https://fengwz.me/wp-admin` 还能登录写文章？ **OK!**

**恭喜！你的 Headless 个人网站正式上线！**
