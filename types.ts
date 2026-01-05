export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  categories?: string[];
  imageUrl: string;
  rating?: number; // Normalized top-level rating
  // ACF Fields
  acf?: {
    // Common
    rating?: number;
    // Games
    platform?: string[] | string; // Select returns string or array depending on config
    play_status?: string;
    game_link?: string;
    // Library (Books/Media)
    media_type?: string;
    creator?: string; // Author or Director
    status?: string; // Reading status
    douban_link?: string;
  };
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  date: string;
}

export interface NewsletterSubscriber {
  email: string;
  date: string;
}

export enum ViewState {
  HOME = 'HOME',
  POST = 'POST',
  ABOUT = 'ABOUT'
}