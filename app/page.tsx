"use client"

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [windowHeight, setWindowHeight] = useState("100vh");
  
  // This effect handles the viewport height calculation for Safari
  useEffect(() => {
    // Set the initial height
    const setHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      setWindowHeight(`calc(100 * var(--vh, 1vh) - 4rem)`);
    };
    
    setHeight();
    
    // Update the height on resize
    window.addEventListener('resize', setHeight);
    
    // Cleanup
    return () => window.removeEventListener('resize', setHeight);
  }, []);

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
        className="flex flex-col justify-center items-center relative p-8"
        style={{ minHeight: windowHeight }}
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
              <AvatarImage src="/images/profile.png" alt="Kyaw Phyo Thu" className="object-cover" />
              <AvatarFallback className="text-5xl">KP</AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">Kyaw Phyo Thu</h1>
          <p className="text-xl text-muted-foreground mb-8">Software Engineer & Web Developer</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild>
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Me</Link>
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
                <CardTitle className="text-2xl">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">
                  I'm a passionate software engineer specializing in building exceptional digital experiences. 
                  With a strong foundation in modern web technologies, I create scalable and user-friendly applications 
                  that solve real-world problems.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="p-0">
                  <Link href="/about">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
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
                      <Button variant="link" asChild className="p-0">
                        <Link href={`/projects#project${project}`}>
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </CardContent>
              <CardFooter className="justify-center pt-6">
                <Button asChild>
                  <Link href="/projects">
                    View All Projects <ArrowRight className="ml-2 h-4 w-4" />
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