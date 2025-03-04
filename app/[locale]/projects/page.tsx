import Image from "next/image"
import * as motion from "motion/react-client"
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, BarChart2, Clock, DollarSign, Database, Users, RefreshCw, Sparkles, ListChecks, LineChart } from "lucide-react"
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function ProjectsPage() {
  const t = useTranslations('projects')
  
  // Define project icons - these won't need translation
  const featureIcons = {
    "dailyTransactionHistory": <Clock className="h-4 w-4 text-blue-500" />,
    "goldInventoryTracking": <Database className="h-4 w-4 text-yellow-500" />,
    "cashFlowManagement": <DollarSign className="h-4 w-4 text-green-500" />,
    "profitAnalytics": <BarChart2 className="h-4 w-4 text-purple-500" />,
    "customizableTimer": <Clock className="h-4 w-4 text-red-500" />,
    "aiTaskGeneration": <Sparkles className="h-4 w-4 text-amber-500" />,
    "taskManagement": <ListChecks className="h-4 w-4 text-indigo-500" />,
    "productivityAnalytics": <LineChart className="h-4 w-4 text-emerald-500" />
  }

  // Animation variants
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

  // Get projects from translation file
  const projects = t.raw('projectItems')

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {t('description')}
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {projects.map((project: any, index: number) => (
          <motion.div 
            id={`project-${project.id}`} 
            key={index} 
            variants={item} 
            transition={{ duration: 0.5 }}
            className="scroll-mt-20" // Add scroll margin to prevent navbar overlap
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                {/* Left side: Screenshots */}
                <div className="md:w-2/5 p-4 bg-muted/30">
                  <div className="flex flex-wrap justify-center gap-4">
                    {project.type === "mobile" ? (
                      // Mobile screenshots for She Pawn Shop - side by side
                      <div className="flex justify-center gap-2 md:gap-3">
                        {project.screenshots.map((screenshot: any, i: number) => (
                          <div key={i} className="w-[100px] md:w-[90px] lg:w-[110px] rounded-md overflow-hidden shadow-sm">
                            <div className="aspect-[9/16] relative">
                              <Image 
                                src={screenshot.src} 
                                alt={screenshot.alt} 
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Single screenshot for web projects (PomodoAI)
                      <div className="w-full max-w-[320px] rounded-md overflow-hidden shadow-sm">
                        <div className="aspect-[16/9] relative">
                          <Image 
                            src={project.screenshots[0].src} 
                            alt={project.screenshots[0].alt} 
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Right side: Content */}
                <div className="md:w-3/5">
                  <CardHeader>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <CardDescription className="text-base">{project.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">{t('features')}:</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.features.map((feature: any, i: number) => (
                          <div key={i} className="flex items-center gap-2">
                            {featureIcons[feature.icon as keyof typeof featureIcons]}
                            <span className="text-sm">{feature.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <h3 className="text-sm font-medium text-muted-foreground mr-2">{t('technologies')}:</h3>
                      {project.tags.map((tag: string) => (
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
                    {project.github && project.github !=="#" && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          {t('sourceCode')}
                        </a>
                      </Button>
                    )}
                    {project.demo && project.demo !== "#" && (
                      <Button size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {t('liveDemo')}
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </div>
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
        <h2 className="text-2xl font-bold mb-6 text-center">{t('comingSoon.title')}</h2>
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
              {t('comingSoon.description')}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}