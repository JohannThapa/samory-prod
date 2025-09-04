export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatbotMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
  pending?: boolean;
}

export interface ChatbotApiResponse {
  code: number;
  message: string;
  data: string;
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
