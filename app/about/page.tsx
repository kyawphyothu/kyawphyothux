"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Example Tech Inc.",
      period: "2020 - Present",
      description: "Led development of scalable web applications using React, Next.js, and Node.js."
    },
    {
      title: "Software Developer",
      company: "Tech Solutions Ltd.",
      period: "2017 - 2020",
      description: "Developed and maintained e-commerce platforms and internal tools."
    },
    {
      title: "Junior Developer",
      company: "StartUp Co.",
      period: "2015 - 2017",
      description: "Assisted in building front-end interfaces and implementing responsive designs."
    }
  ]

  const education = [
    {
      degree: "BSc Computer Science",
      institution: "Example University",
      year: "2011 - 2015"
    }
  ]

  return (
    <div className="container py-12 space-y-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            I am a passionate software engineer with over 7 years of experience in web development.
            I specialize in building high-performance web applications using modern technologies
            like React, Next.js, and TypeScript.
          </p>
          <p className="text-lg">
            My approach combines technical expertise with a keen understanding of user experience.
            I believe in writing clean, maintainable code and implementing best practices in all my projects.
          </p>
          <p className="text-lg">
            When I'm not coding, I enjoy hiking, reading tech blogs, and contributing to open-source projects.
          </p>
        </div>
      </motion.div>

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

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-6">Education</h2>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{edu.degree}</CardTitle>
                <p className="text-sm text-muted-foreground">{edu.institution}, {edu.year}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  )
}