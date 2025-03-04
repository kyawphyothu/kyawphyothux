"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiHtml5,
  SiCss3, SiTailwindcss, SiNodedotjs, SiGit, SiPhp, SiLaravel,
  SiExpo, SiApollographql, SiRedux, SiMysql, SiMongodb, SiPostgresql,
  SiDocker, SiLinux, SiGnubash, SiGnometerminal, SiUbuntu
} from "react-icons/si"
import { FaCode, FaDesktop, FaMobileAlt, FaServer, FaLayerGroup, FaTerminal } from "react-icons/fa"

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const experiences = [
    {
      title: "Web Developer",
      company: "Poppa Technology",
      period: "2022 - Present",
      description: "Developing and maintaining modern web applications with React, Next.js, and TypeScript. Collaborating with cross-functional teams to deliver user-centered solutions and implementing responsive designs that work across all devices."
    }
  ]

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
      {/* About Me section remains unchanged */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            Hello! I'm Kyaw Phyo Thu, a passionate web and mobile developer specializing in JavaScript, TypeScript, PHP, Laravel, React, Next.js, and Expo. I build clean, efficient, and scalable applications, turning ideas into seamless digital experiences.
          </p>
          <p className="text-lg">
            Since 2022, I've been crafting modern web applications at Poppa Technology, where I've honed my skills in both front-end and back-end development. I approach each project with a problem-solving mindset, looking for ways to optimize performance while maintaining clean, maintainable code.
          </p>
          <p className="text-lg">
            What drives me is the continuous evolution of web and mobile technologies and the challenge of staying at the cutting edge. I enjoy working across the full stack to build dynamic, responsive interfaces that deliver exceptional user experiences across all devices.
          </p>
        </div>
      </motion.div>

      {/* Experience section remains unchanged */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-6">Experience</h2>
        <div className="space-y-4">
          {experiences.map((exp, index) => (
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
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-6">Skills & Technologies</h2>
        
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

      {/* Let's Build Something Together section remains unchanged */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="prose dark:prose-invert max-w-none"
      >
        <h2 className="text-3xl font-bold mb-6">Let's Build Something Together</h2>
        <p className="text-lg">
          I'm always open to new challenges and opportunities to collaborate on exciting projects. Whether you're looking to develop a new web application, enhance an existing one, or simply want to connect with a fellow developer, I'd love to hear from you.
        </p>
        <p className="text-lg">
          Feel free to explore my projects and reach out through the contact page if you'd like to discuss how we might work together to bring your ideas to life.
        </p>
      </motion.div>
    </div>
  )
}