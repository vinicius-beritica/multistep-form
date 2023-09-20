export interface FormData {
  id: number;
  name: string;
  email: string;
  birthdate: string;
  phone: string;
  role: string;
  bio: string;
  links: string[];
  state: string;
  city: string;
  tech: number[];
  abilities: number[];
  softskills: number[];
  experience: string;
  experiences: Experience[];
  experience_educational: Educational[];
}

export interface Experience {
  id: number;
  title: string;
  company_name: string;
  start_date: string;
  end_date?: string;
  function_performed: string;
}

export interface Educational {
  id: number;
  title_academy: string;
  institution: string;
  link: string[];
  start_date_academy: string;
  end_date_academy: string;
}
