import * as motion from "motion/react-client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useTranslations } from 'next-intl';
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiNodedotjs, SiGit, SiPhp, SiLaravel,
  SiExpo, SiMysql, SiMongodb,
  SiDocker, SiLinux, SiGnubash, SiGnometerminal, SiUbuntu, SiSqlite
} from "react-icons/si"
import { FaDesktop, FaMobileAlt, FaServer, FaLayerGroup, FaTerminal, FaDatabase } from "react-icons/fa"
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('about.title'),
    description: t('about.description'),
    openGraph: {
      title: t('about.og.title'),
      description: t('about.og.description'),
      images: ['/images/profile.png']
    }
  };
}

export default function AboutPage() {
  const t = useTranslations('about');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const skillCategories = [
    {
      name: "Frontend",
      icon: <FaDesktop className="text-blue-500" />,
      skills: [
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
        { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
        { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
        { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
        { name: "Next.js", icon: <SiNextdotjs /> },
      ]
    },
    {
      name: "Backend",
      icon: <FaServer className="text-purple-500" />,
      skills: [
        { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
        { name: "PHP", icon: <SiPhp className="text-[#777BB4]" /> },
        { name: "Laravel", icon: <SiLaravel className="text-[#FF2D20]" /> },
        { name: "REST APIs", icon: <FaServer className="text-purple-500" /> },
      ]
    },
    {
      name: "Databases",
      icon: <FaDatabase className="text-blue-500" />,
      skills: [
        { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
        { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
        { name: "SQLite", icon: <SiSqlite className="text-[#003B57]" /> },
      ]
    },
    {
      name: "Mobile",
      icon: <FaMobileAlt className="text-green-500" />,
      skills: [
        { name: "Expo", icon: <SiExpo /> },
        { name: "React Native", icon: <SiReact className="text-[#61DAFB]" /> },
      ]
    },
    {
      name: "System Administration",
      icon: <FaTerminal className="text-yellow-500" />,
      skills: [
        { name: "Linux", icon: <SiLinux className="" /> },
        { name: "Bash", icon: <SiGnubash className="text-[#4EAA25]" /> },
        { name: "Shell Scripting", icon: <SiGnometerminal className="text-gray-400" /> },
        { name: "Server Management", icon: <SiUbuntu className="text-[#E95420]" /> },
      ]
    },
    {
      name: "Tools & DevOps",
      icon: <FaLayerGroup className="text-orange-500" />,
      skills: [
        { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
        { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
      ]
    }
  ]

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* About Me section */}
      <motion.div
        id="about"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="scroll-mt-28"
      >
        <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
        <div className="prose dark:prose-invert max-w-none space-y-4">
          <ReactMarkdown components={{
            p: ({node, ...props}) => <p className="text-lg" {...props} />
          }}>
            {t('intro.p1')}
          </ReactMarkdown>
          <ReactMarkdown components={{
            p: ({node, ...props}) => <p className="text-lg" {...props} />
          }}>
            {t('intro.p2')}
          </ReactMarkdown>
          <ReactMarkdown components={{
            p: ({node, ...props}) => <p className="text-lg" {...props} />
          }}>
            {t('intro.p3')}
          </ReactMarkdown>
        </div>
      </motion.div>

      {/* Experience section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-6">{t('experience.title')}</h2>
        <div className="space-y-4">
          {/* Map through experiences from translation */}
          {t.raw('experience.items').map((exp: any, index: number) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{exp.title} @ {exp.company}</CardTitle>
                <p className="text-sm text-muted-foreground">{exp.period}</p>
              </CardHeader>
              <CardContent>
                <p>{exp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Categorized Skills section */}
      <motion.div
        id="skills"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="scroll-mt-28"
      >
        <h2 className="text-3xl font-bold mb-6">{t('skills.title')}</h2>
        
        <div className="space-y-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={`category-${categoryIndex}`} className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="text-2xl">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold">{category.name}</h3>
              </div>
              
              <div className="flex flex-wrap -mx-2">
                {category.skills.map((skill, skillIndex) => (
                  <div key={`skill-wrapper-${categoryIndex}-${skillIndex}`} className="w-1/2 px-2 mb-4 sm:w-1/3 md:w-1/5">
                    <motion.div
                      key={`skill-${categoryIndex}-${skillIndex}`}
                      whileHover={{ y: -5, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ borderRadius: '0.5rem' }}
                      className="bg-card border p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300 h-full rounded-lg overflow-hidden"
                    >
                      <div className="text-3xl mb-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {skill.icon}
                      </div>
                      <span className="font-medium">{skill.name}</span>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Let's Build Something Together section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="prose dark:prose-invert max-w-none"
      >
        <h2 className="text-3xl font-bold mb-6">{t('callToAction.title')}</h2>
        <p className="text-lg">
          {t('callToAction.p1')}
        </p>
        <p className="text-lg">
          {t('callToAction.p2')}
        </p>
      </motion.div>
    </div>
  )
}