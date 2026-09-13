export interface Project {
  id: string
  title: string
  description: string
  image: string
  github: string
  demo: string
  tech: string[]
  role: string
  challenges: string
  learnings: string
  created_at: string
}

export interface Skill {
  id: string
  name: string
  level: number
  category: string
  created_at: string
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
  created_at: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  text: string
  created_at: string
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  published: boolean
  created_at: string
}

export interface Setting {
  id: string
  key: string
  value: string
  created_at: string
}

export interface NavbarProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}
