export interface HelpArticleSection {
  id: string;
  title: string;
  content: string;
}

export interface HelpArticle {
  slug: string;
  title: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  image?: string;
  sections: HelpArticleSection[];
  faqs: { question: string; answer: string }[];
}
