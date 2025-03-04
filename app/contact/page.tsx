"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone } from "lucide-react"
import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success("Message sent successfully!", {
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message", {
          description: data.error || "Please try again later.",
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Unable to send your message. Please try again later.",
      });
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "kyawphyothukpt256@gmail.com",
      href: "mailto:kyawphyothukpt256@gmail.com"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      value: "+95 9787977509",
      href: "tel:+959787977509"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: "Hochiminh City, Vietnam",
      href: null
    }
  ]

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-2">Get In Touch</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Have a project in mind or just want to say hello? I'd love to hear from you!
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Send Me a Message</CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Subject of your message"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          {contactInfo.map((item, index) => (
            <Card key={index}>
              <CardContent className="flex items-start sm:items-center gap-4 p-6">
                <div className="rounded-full p-3 bg-primary/10 text-primary shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium">{item.title}</h3>
                  {item.href ? (
                    <a 
                      href={item.href} 
                      className="text-muted-foreground hover:text-primary transition-colors break-all"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{item.value}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  )
}