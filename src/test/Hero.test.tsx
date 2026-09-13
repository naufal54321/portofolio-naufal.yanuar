import { render, screen, waitFor } from "@testing-library/react"
import Hero from "../components/Hero"

describe("Hero", () => {
  it("renders heading and description", () => {
    render(<Hero />)
    expect(screen.getByText(/Muhammad Naufal Yanuar/i)).toBeInTheDocument()
    expect(screen.getByText(/Lihat Project/i)).toBeInTheDocument()
  })

  it("renders typing effect text", async () => {
    render(<Hero />)
    await waitFor(() => {
      expect(screen.getByText(/Full Stack Web Developer/)).toBeInTheDocument()
    }, { timeout: 5000 })
  })
})
