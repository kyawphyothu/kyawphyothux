import * as motion from "motion/react-client"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/yourusername",
      icon: <Github className="h-5 w-5" />,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/yourusername",
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/yourusername",
      icon: <Twitter className="h-5 w-5" />,
    },
    {
      name: "Email",
      href: "mailto:kyawphyothukpt256@gmail.com",
      icon: <Mail className="h-5 w-5" />,
    },
  ]

  return (
    <footer className="border-t bg-background py-8 w-full">
      <div className="container max-w-6xl mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-sm leading-loose text-muted-foreground md:text-left"
        >
          {t('copyright', { year: currentYear })}
        </motion.p>
        <div className="flex gap-4">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ scale: 1.1 }}
            >
              <span className="sr-only">{link.name}</span>
              {link.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}