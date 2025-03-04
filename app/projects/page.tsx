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
import { Github, ExternalLink, BarChart2, Clock, DollarSign, Database, Users, RefreshCw } from "lucide-react"

export default function ProjectsPage() {
  const projects = [
    {
      title: "She Pawn Shop Management System",
      description: "A comprehensive mobile application built with Expo and React Native for managing a family pawn shop business. This app handles inventory tracking, financial management, and reporting.",
      tags: ["Expo", "React Native", "Laravel", "RESTful API", "Financial Management"],
      features: [
        { name: "Daily Transaction History", icon: <Clock className="h-4 w-4 text-blue-500" /> },
        { name: "Gold Inventory Tracking", icon: <Database className="h-4 w-4 text-yellow-500" /> },
        { name: "Cash Flow Management", icon: <DollarSign className="h-4 w-4 text-green-500" /> },
        { name: "Profit Analytics", icon: <BarChart2 className="h-4 w-4 text-purple-500" /> }
      ],
      github: "https://github.com/username/pawnshop-management",
      demo: "#"
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
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">My Projects</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Here's a showcase of my development work. Each project represents my approach to solving real-world problems through technology.
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={item} transition={{ duration: 0.5 }}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex flex-col">
                {/* Main Featured Screenshots - Limited to 3 key screens */}
                <div className="p-4 bg-muted/30">
                  <div className="flex flex-wrap justify-center gap-4">
                    {/* Use larger size for main screens */}
                    <div className="w-[180px] rounded-md overflow-hidden shadow-sm">
                      <div className="aspect-[9/16] relative">
                        <Image 
                          src="/images/she/home-1.png" 
                          alt="She Pawn Shop Home Screen" 
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="w-[180px] rounded-md overflow-hidden shadow-sm">
                      <div className="aspect-[9/16] relative">
                        <Image 
                          src="/images/she/daily-history.png" 
                          alt="Daily History Screen" 
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="w-[180px] rounded-md overflow-hidden shadow-sm">
                      <div className="aspect-[9/16] relative">
                        <Image 
                          src="/images/she/orders.png" 
                          alt="Orders Screen" 
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Key Features:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          {feature.icon}
                          <span className="text-sm">{feature.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground mr-2">Technologies:</h3>
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
                
                <CardFooter className="flex gap-4 pt-0">
                  {project.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Source Code
                      </a>
                    </Button>
                  )}
                  {project.demo && project.demo !== "#" && (
                    <Button size="sm" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Projects In Development Section */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">More Projects Coming Soon</h2>
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
              I'm currently working on several new projects that will be showcased here soon. 
              Feel free to check back later or contact me to learn more about my current work.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}