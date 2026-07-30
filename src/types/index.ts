export interface Project {
  id: number
  title: string
  description: string
  image: string
  github: string
  demo: string
  tech: string[]
}

export interface Skill {
  name: string
  level: number
  category: string
}

export interface Experience {
  id: number
  title: string
  company: string
  period: string
  description: string
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
