import { Facebook, Github, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer({ copyright }: { copyright: string }) {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/kyawphyothu",
      icon: <Github className="h-5 w-5" aria-hidden="true" />,
      label: "Visit Kyaw Phyo Thu's GitHub profile",
    },
    {
      name: "Facebook",
      href: "https://facebook.com/kyawphyothu.x",
      icon: <Facebook className="h-5 w-5" aria-hidden="true" />,
      label: "Connect with Kyaw Phyo Thu on Facebook",
    },
    {
      name: "Email",
      href: "mailto:kyawphyothukpt256@gmail.com",
      icon: <Mail className="h-5 w-5" aria-hidden="true" />,
      label: "Send an email to Kyaw Phyo Thu",
    },
  ];

  return (
    <footer 
      className="border-t bg-background py-8 w-full print:hidden" 
      role="contentinfo" 
      aria-label="Site footer"
    >
      <div className="container max-w-6xl mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <p
          className="text-center text-sm leading-loose text-muted-foreground md:text-left"
        >
          {copyright}
        </p>
        
        <nav 
          className="flex gap-4" 
          aria-label="Social media links"
        >
          {socialLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-muted-foreground hover:text-foreground focus:text-foreground",
                "transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md p-1"
              )}
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}