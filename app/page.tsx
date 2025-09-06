"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Code, Zap, TrendingUp, BookOpen, Timer, BarChart3 } from "lucide-react"
import { FlashcardsMode } from "@/components/flashcards-mode"
import { QuizMode } from "@/components/quiz-mode"
import { AnalyticsMode } from "@/components/analytics-mode"
import { CheatSheetMode } from "@/components/cheat-sheet-mode"

const languages = [
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    description: "Master Python fundamentals and advanced concepts",
    color: "bg-yellow-500",
    topics: ["Variables", "Functions", "OOP", "Data Structures"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "⚡",
    description: "Learn modern JavaScript and web development",
    color: "bg-yellow-400",
    topics: ["ES6+", "DOM", "Async/Await", "React"],
  },
  {
    id: "html5",
    name: "HTML5",
    icon: "🌐",
    description: "Build semantic and accessible web structures",
    color: "bg-orange-500",
    topics: ["Semantic HTML", "Forms", "Media", "APIs"],
  },
  {
    id: "css3",
    name: "CSS3",
    icon: "🎨",
    description: "Style beautiful and responsive interfaces",
    color: "bg-blue-500",
    topics: ["Flexbox", "Grid", "Animations", "Responsive"],
  },
]

const learningModes = [
  {
    id: "flashcards",
    name: "Flashcards",
    description: "Quick revision with interactive cards",
    icon: BookOpen,
    color: "text-primary",
  },
  {
    id: "quiz",
    name: "Quiz Me!",
    description: "20-minute timed challenges",
    icon: Timer,
    color: "text-accent",
  },
  {
    id: "cheatsheet",
    name: "Cheat Sheet",
    description: "Quick reference guides",
    icon: Code,
    color: "text-secondary",
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Track your learning progress",
    icon: BarChart3,
    color: "text-primary",
  },
]

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [selectedMode, setSelectedMode] = useState<string | null>(null)

  const handleLanguageSelect = (languageId: string) => {
    setSelectedLanguage(languageId)
    setSelectedMode(null)
  }

  const handleModeSelect = (modeId: string) => {
    setSelectedMode(modeId)
  }

  const handleBackToModes = () => {
    setSelectedMode(null)
  }

  const handleBackToLanguages = () => {
    setSelectedLanguage(null)
    setSelectedMode(null)
  }

  if (selectedLanguage && selectedMode === "flashcards") {
    return <FlashcardsMode language={selectedLanguage} onBack={handleBackToModes} />
  }

  if (selectedLanguage && selectedMode === "quiz") {
    return <QuizMode language={selectedLanguage} onBack={handleBackToModes} />
  }

  if (selectedLanguage && selectedMode === "analytics") {
    return <AnalyticsMode language={selectedLanguage} onBack={handleBackToModes} />
  }

  if (selectedLanguage && selectedMode === "cheatsheet") {
    return <CheatSheetMode language={selectedLanguage} onBack={handleBackToModes} />
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-slide-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full gradient-primary animate-glow">
              <Brain className="h-8 w-8 text-white animate-float" />
            </div>
            <h1 className="text-4xl font-bold text-center mb-8 text-balance">
              <span className="text-gradient">RevvUp</span>
              <span className="text-foreground">: Your AI Learning Hub</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto animate-fade-in-scale animate-delay-200">
            Master programming languages through gamified flashcards, interactive quizzes, and AI-powered insights
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 animate-fade-in-scale animate-delay-300">
            <Badge variant="secondary" className="gap-2 gradient-accent text-white border-0 hover-gradient">
              <Zap className="h-4 w-4" />
              AI-Powered
            </Badge>
            <Badge variant="outline" className="gap-2 border-gradient glass-effect">
              <TrendingUp className="h-4 w-4" />
              Progress Tracking
            </Badge>
          </div>
        </div>

        {!selectedLanguage ? (
          /* Enhanced language selection with gradient cards and animations */
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-8 text-balance animate-slide-in-up animate-delay-100">
              Choose Your Programming Language
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {languages.map((language, index) => (
                <Card
                  key={language.id}
                  className="cursor-pointer gradient-card card-hover border-gradient animate-fade-in-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleLanguageSelect(language.id)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                        {language.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gradient">{language.name}</CardTitle>
                        <CardDescription className="text-pretty text-muted-foreground">
                          {language.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {language.topics.map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs glass-effect border-0">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Enhanced learning mode selection with gradient effects */
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8 animate-slide-in-up">
              <Button
                variant="ghost"
                onClick={handleBackToLanguages}
                className="text-muted-foreground hover:text-foreground glass-effect hover-gradient"
              >
                ← Back to Languages
              </Button>
              <div className="flex items-center gap-3">
                <span className="text-2xl animate-float">{languages.find((l) => l.id === selectedLanguage)?.icon}</span>
                <h2 className="text-2xl font-semibold text-gradient">
                  {languages.find((l) => l.id === selectedLanguage)?.name} Learning Modes
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningModes.map((mode, index) => {
                const IconComponent = mode.icon
                return (
                  <Card
                    key={mode.id}
                    className="cursor-pointer gradient-card card-hover border-gradient animate-fade-in-scale"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleModeSelect(mode.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full gradient-primary animate-glow ${mode.color}`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-gradient">{mode.name}</CardTitle>
                          <CardDescription className="text-pretty text-muted-foreground">
                            {mode.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        <div className="mt-16 text-center animate-fade-in-scale animate-delay-400">
          <h3 className="text-lg font-medium text-muted-foreground mb-4">Powered by AI for Personalized Learning</h3>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground glass-effect rounded-full px-8 py-4 mx-auto max-w-fit">
            <div className="flex items-center gap-2 hover:text-primary transition-colors">
              <BookOpen className="h-4 w-4" />
              Interactive Flashcards
            </div>
            <div className="flex items-center gap-2 hover:text-accent transition-colors">
              <Timer className="h-4 w-4" />
              Timed Quizzes
            </div>
            <div className="flex items-center gap-2 hover:text-secondary transition-colors">
              <BarChart3 className="h-4 w-4" />
              Progress Analytics
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
