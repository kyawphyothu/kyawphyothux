import { Facebook, Github, Mail } from "lucide-react";

export function Footer({ copyright }: { copyright: string }) {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/kyawphyothu",
      icon: <Github className="h-5 w-5" />,
    },
    {
      name: "Facebook",
      href: "https://facebook.com/kyawphyothu.x",
      icon: <Facebook className="h-5 w-5" />,
    },
    {
      name: "Email",
      href: "mailto:kyawphyothukpt256@gmail.com",
      icon: <Mail className="h-5 w-5" />,
    },
  ];

  return (
    <footer className="border-t bg-background py-8 w-full">
      <div className="container max-w-6xl mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <p
          className="text-center text-sm leading-loose text-muted-foreground md:text-left animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {copyright}
        </p>
        <div className="flex gap-4">
          {socialLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors animate-fade-in-up"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <span className="sr-only">{link.name}</span>
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}