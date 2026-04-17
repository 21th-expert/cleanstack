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

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string | null;
  portfolioUrl: string | null;
  githubUrl: string | null;
  order: number;
  createdAt: string;
}

export interface ValueItem {
  id: string;
  icon: string;
  title: string;
  body: string;
  order: number;
  createdAt: string;
}
