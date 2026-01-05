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
  categories?: string[]; // Added categories
  imageUrl: string;
  rating?: number; // Added rating
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