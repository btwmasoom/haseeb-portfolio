"use client"

import { useState } from "react"
import Link from "next/link"
import { ThemeProvider } from "@/components/themeProvider"
import { Button } from "@/components/ui/button"
import { FileText, Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          <span className="text-primary p-5"></span>Sanidhya
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
            Projects
          </Link>
          <Link href="#client" className="text-muted-foreground hover:text-foreground transition-colors">
            Skills
          </Link>
          <Link href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link href="/files/resume.pdf" target="_blank" >
              <FileText className="mr-2 h-4 w-4" />
              Resume
            </Link>
          </Button>
          <ThemeProvider />
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <nav className="container flex flex-col py-4 gap-4">
              <Link
                href="#projects"
                className="px-4 py-2 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link href="#client" className="px-4 py-2 hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>
                Skills
              </Link>
              <Link href="#experience" className="px-4 py-2 hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link
                href="#contact"
                className="px-4 py-2 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex items-center justify-between px-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/files/resume.pdf" target="_blank" >
                    <FileText className="mr-2 h-4 w-4" />
                    Resume
                  </Link>
                </Button>
                <ThemeProvider />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}



