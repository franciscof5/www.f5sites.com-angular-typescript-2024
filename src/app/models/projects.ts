export interface Project {
  title: string;
  language: string;
  slug: string;
  description: string;
  icon: string;
  banner: string;
  priority: number;
  status: string;
  type: string;
  domain: string;
  github: string;
  youtube: string;
  instagram: string;
  tiktok: string;
  twitter: string;
  facebook: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  updated: string;
}

export interface ProjectsResponse {
  success: boolean;
  count: number;
  data: Project[];
}

export interface ProjectErrorResponse {
  success: false;
  error: string;
}

export interface ProjectStats {
  success: boolean;
  generatedAt: string;
  total: number;
  featured: number;

  production: number;
  project: number;
  startup: number;
  course: number;

  status: { [key: string]: number };
  types: { [key: string]: number };
  tags: { [key: string]: number };
}

export interface ProjectQueryParams {
  featured?: boolean;
  status?: string;
  type?: string;
  search?: string;
  refresh?: boolean;
  lang?: string;
}