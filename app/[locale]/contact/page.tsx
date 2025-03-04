"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone } from "lucide-react"
import { toast } from "sonner"
import { useTranslations } from 'next-intl'

export default function ContactPage() {
  const t = useTranslations('contact')
  
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
        toast.success(t('success.title'), {
          description: t('success.description'),
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(t('error.title'), {
          description: data.error || t('error.description'),
        });
      }
    } catch (error) {
      toast.error(t('error.title'), {
        description: t('error.description'),
      });
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Use contact info from translations
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      titleKey: 'info.email.title',
      valueKey: 'info.email.value',
      href: `mailto:${t.raw('info.email.value')}`
    },
    {
      icon: <Phone className="h-6 w-6" />,
      titleKey: 'info.phone.title',
      valueKey: 'info.phone.value',
      href: `tel:+959787977509`
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      titleKey: 'info.location.title',
      valueKey: 'info.location.value',
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
        <h1 className="text-4xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {t('description')}
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
              <CardTitle>{t('form.title')}</CardTitle>
              <CardDescription>
                {t('form.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {t('form.name')}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={t('form.name')}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t('form.email')}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t('form.email')}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    {t('form.subject')}
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder={t('form.subject')}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t('form.message')}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t('form.message')}
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? t('form.sending') : t('form.sendButton')}
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
                  <h3 className="font-medium">{t(item.titleKey)}</h3>
                  {item.href ? (
                    <a 
                      href={item.href} 
                      className="text-muted-foreground hover:text-primary transition-colors break-all"
                    >
                      {t(item.valueKey)}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{t(item.valueKey)}</p>
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