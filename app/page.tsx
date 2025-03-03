"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Home() {
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
      <section className="h-screen flex flex-col justify-center items-center relative p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Avatar className="w-32 h-32 mb-8 mx-auto border-4 border-primary/20">
            <AvatarImage src="/images/profile.png" alt="Kyaw Phyo Thu" className="object-cover" />
            <AvatarFallback className="text-4xl">KP</AvatarFallback>
          </Avatar>
          <h1 className="text-6xl font-bold mb-4">Kyaw Phyo Thu</h1>
          <p className="text-xl text-muted-foreground mb-8">Software Engineer & Web Developer</p>
          <div className="flex gap-4 justify-center">
            <Button>View Projects</Button>
            <Button variant="outline">Contact Me</Button>
          </div>
        </motion.div>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8"
        >
          <span className="text-3xl">↓</span>
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
                <CardTitle className="text-2xl">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">
                  I'm a passionate software engineer specializing in building exceptional digital experiences. 
                  With a strong foundation in modern web technologies, I create scalable and user-friendly applications 
                  that solve real-world problems.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Git"].map((skill) => (
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
                <CardTitle className="text-2xl">Featured Projects</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                {[1, 2].map((project) => (
                  <Card key={project} className="overflow-hidden">
                    <div className="h-48 bg-muted"/>
                    <CardHeader>
                      <CardTitle>Project {project}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        A brief description of the project and the technologies used.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link">Learn More →</Button>
                    </CardFooter>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}