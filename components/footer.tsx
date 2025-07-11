import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Link href="/" className="font-bold text-lg">
            <span className="text-primary p-5">Sanidhya Portfolio</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()}  All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="https://github.com/sanidhya-Git" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="https://www.linkedin.com/in/sanidhya-mehra-a0310a25b/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link href="mailto:sanidhya.web@gmail.com" aria-label="Email">
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

