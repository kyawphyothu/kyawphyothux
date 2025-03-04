import * as motion from "motion/react-client"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import { getTranslations } from 'next-intl/server'
import ContactForm from './contact-form'

// export const dynamic = 'force-static';
// export const revalidate = false;

export default async function ContactPage() {
  const t = await getTranslations('contact')
  
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
          <ContactForm />
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