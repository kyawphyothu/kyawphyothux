"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

export default function ProjectsPage() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with product catalog, cart, checkout and payment integration.",
      image: "/images/project1.jpg",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Stripe"],
      github: "https://github.com/username/project1",
      demo: "https://project1-demo.com"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team features.",
      image: "/images/project2.jpg",
      tags: ["React", "Firebase", "Tailwind CSS", "React Query"],
      github: "https://github.com/username/project2",
      demo: "https://project2-demo.com"
    },
    {
      title: "Personal Dashboard",
      description: "A customizable dashboard with widgets for productivity, weather, tasks and more.",
      image: "/images/project3.jpg",
      tags: ["React", "TypeScript", "D3.js", "Express"],
      github: "https://github.com/username/project3",
      demo: "https://project3-demo.com"
    },
    {
      title: "Social Media Analytics",
      description: "Analytics dashboard for tracking social media performance across multiple platforms.",
      image: "/images/project4.jpg",
      tags: ["Next.js", "Chart.js", "Tailwind CSS", "Node.js"],
      github: "https://github.com/username/project4",
      demo: "https://project4-demo.com"
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1 
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={item} transition={{ duration: 0.5 }}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <div className="h-full w-full bg-muted flex items-center justify-center">
                  {/* Replace with actual images when available */}
                  {/* <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  /> */}
                  <span className="text-muted-foreground">[Project Image]</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button variant="outline" size="sm" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Source Code
                  </a>
                </Button>
                <Button size="sm" asChild>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}