import * as motion from 'motion/react-client'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Home() {
  const tHome = useTranslations('home');
  const tHero = useTranslations('hero');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <section 
        className="flex flex-col justify-center items-center relative p-8 min-h-[calc(100vh-4rem)]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* More explicit sizing for Safari compatibility */}
          <div className="relative mx-auto mb-8" style={{ width: '160px', height: '160px' }}>
            <Avatar className="w-full h-full border-4 border-primary/20">
              <AvatarImage src="/images/profile.png" alt={tHero('name')} className="object-cover" />
              <AvatarFallback className="text-5xl">KP</AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">{tHero('name')}</h1>
          <p className="text-xl text-muted-foreground mb-8">{tHero('role')}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild>
              <Link href="/projects">{tHero('cta.viewProjects')}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">{tHero('cta.contactMe')}</Link>
            </Button>
          </div>
        </motion.div>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8"
        >
          <ArrowRight size={24} className="rotate-90" />
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* About Section */}
          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl">{tHome('about.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">
                  {tHome('about.content')}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="p-0">
                  <Link href="/about">
                    {tHome('about.learnMore')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl">{tHome('skills.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tHome.raw('skills.list').map((skill: string) => (
                    <span key={skill} className="px-3 py-1 bg-secondary rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Featured Projects */}
          <motion.div variants={item} className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{tHome('projects.title')}</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                {tHome.raw('projects.items').map((project: any, index: number) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="h-48 bg-muted"/>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" asChild className="p-0">
                        <Link href={{ pathname: '/projects', hash: `project${index + 1}` }}>
                          {tHome('projects.learnMore')} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </CardContent>
              <CardFooter className="justify-center pt-6">
                <Button asChild>
                  <Link href={{ pathname: '/projects' }}>
                    {tHome('projects.viewAll')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}