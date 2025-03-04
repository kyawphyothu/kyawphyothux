import * as motion from 'motion/react-client'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FaDatabase, FaDesktop, FaServer } from 'react-icons/fa';
import Image from 'next/image';

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
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">{tHome('about.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                <p className="leading-relaxed">
                  {tHome('about.content')}
                </p>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-sm text-muted-foreground">
                    {tHome('about.experience')}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="p-0">
                  <Link href={{ pathname: '/about', hash: "about" }}>
                    {tHome('about.learnMore')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={item}>
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">{tHome('skills.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 flex-grow">
                {/* Featured skill categories */}
                <div className="grid grid-cols-3 gap-4">
                  {tHome.raw('skills.featured')?.map((category: {name: string, icon: string}, index: number) => (
                    <motion.div 
                      key={index} 
                      className="flex flex-col items-center p-3 rounded-lg bg-card border hover:shadow-md transition-all duration-200"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex justify-center items-center h-10 w-10 rounded-full bg-secondary mb-2">
                        {category.icon === 'FaDesktop' && <FaDesktop className="text-blue-500 text-lg" />}
                        {category.icon === 'FaServer' && <FaServer className="text-purple-500 text-lg" />}
                        {category.icon === 'FaDatabase' && <FaDatabase className="text-green-500 text-lg" />}
                      </div>
                      <span className="text-sm font-medium text-center">{category.name}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="p-0">
                  <Link href={{ pathname: '/about', hash: 'skills' }}>
                    {tHome('skills.viewAll')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Featured Projects */}
          <motion.div variants={item} className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{tHome('projects.title')}</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                {tHome.raw('projects.items').map((project: any, index: number) => (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -5 }}
                    className="transition-all duration-200"
                  >
                    <Link href={{ pathname: '/projects', hash: `project-${project.id}` }} className="block">
                      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow h-full">
                        <div className="h-48 w-full relative bg-muted">
                          <Image
                            src={project.image} 
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle>{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.technologies.map((tech: string, techIndex: number) => (
                              <span key={techIndex} className="px-2 py-1 bg-secondary rounded-full text-xs">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="link" className="p-0">
                            {tHome('projects.learnMore')} <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  </motion.div>
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