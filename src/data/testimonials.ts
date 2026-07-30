export interface Testimonial {
  id: number
  name: string
  role: string
  avatar: string
  text: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ahmad Fauzi",
    role: "Klien - Website Desa",
    avatar: "https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=16a34a&color=fff&size=100",
    text: "Pengerjaan cepat dan hasilnya memuaskan. Website desa kami jadi lebih modern dan mudah dikelola.",
  },
  {
    id: 2,
    name: "Rina Wijaya",
    role: "Rekan Kerja",
    avatar: "https://ui-avatars.com/api/?name=Rina+Wijaya&background=22c55e&color=fff&size=100",
    text: "Naufal sangat detail dalam coding dan selalu memastikan setiap fitur berjalan dengan baik sebelum deploy.",
  },
  {
    id: 3,
    name: "Budi Santoso",
    role: "Dosen",
    avatar: "https://ui-avatars.com/api/?name=Budi+Santoso&background=84cc16&color=fff&size=100",
    text: "Mahasiswa yang tekun dan cepat belajar. Project yang dikerjakan selalu sesuai dengan requirement.",
  },
]

export default testimonials
