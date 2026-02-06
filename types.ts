
export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Pillar {
  pain: string;
  solution: string;
  impact: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
