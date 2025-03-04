"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useTranslations } from 'next-intl'

export default function ContactForm() {
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

  return (
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
  )
}