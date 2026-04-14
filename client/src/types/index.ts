export interface Service {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  order: number;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  techStack: string[];
  link: string | null;
  createdAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
