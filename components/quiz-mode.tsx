"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, CheckCircle, XCircle, Trophy, Target, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  difficulty: "Beginner" | "Intermediate" | "OOP"
  explanation: string
}

interface QuizModeProps {
  language: string
  onBack: () => void
}

// Sample quiz data - in a real app, this would come from an API
const sampleQuizzes: Record<string, QuizQuestion[]> = {
  python: [
    {
      id: "py-q1",
      question: "Which of the following is the correct way to create a variable in Python?",
      options: ["var x = 5", "x = 5", "int x = 5", "x := 5"],
      correctAnswer: 1,
      difficulty: "Beginner",
      explanation: "In Python, you create variables by simply assigning a value using the = operator.",
    },
    {
      id: "py-q2",
      question: "What is the output of: print(type([1, 2, 3]))?",
      options: ["<class 'array'>", "<class 'list'>", "<class 'tuple'>", "<class 'dict'>"],
      correctAnswer: 1,
      difficulty: "Beginner",
      explanation: "Lists in Python are of type 'list', which is displayed as <class 'list'>.",
    },
    {
      id: "py-q3",
      question: "Which method is used to add an element to the end of a list?",
      options: ["add()", "append()", "insert()", "push()"],
      correctAnswer: 1,
      difficulty: "Intermediate",
      explanation: "The append() method adds an element to the end of a list in Python.",
    },
    {
      id: "py-q4",
      question: "What is inheritance in Object-Oriented Programming?",
      options: [
        "A way to hide data",
        "A way to create multiple objects",
        "A way for a class to inherit properties from another class",
        "A way to delete objects",
      ],
      correctAnswer: 2,
      difficulty: "OOP",
      explanation: "Inheritance allows a class to inherit attributes and methods from a parent class.",
    },
    {
      id: "py-q5",
      question: "What does the 'self' parameter represent in Python class methods?",
      options: ["The class itself", "The current instance of the class", "A static variable", "The parent class"],
      correctAnswer: 1,
      difficulty: "OOP",
      explanation:
        "'self' refers to the current instance of the class and is used to access instance variables and methods.",
    },
  ],
  javascript: [
    {
      id: "js-q1",
      question: "Which of the following is used to declare a constant in JavaScript?",
      options: ["var", "let", "const", "final"],
      correctAnswer: 2,
      difficulty: "Beginner",
      explanation: "The 'const' keyword is used to declare constants in JavaScript.",
    },
    {
      id: "js-q2",
      question: "What is the result of: typeof null?",
      options: ["'null'", "'undefined'", "'object'", "'boolean'"],
      correctAnswer: 2,
      difficulty: "Intermediate",
      explanation: "This is a known quirk in JavaScript - typeof null returns 'object'.",
    },
  ],
  html5: [
    {
      id: "html-q1",
      question: "Which HTML5 element is used to define navigation links?",
      options: ["<navigation>", "<nav>", "<menu>", "<links>"],
      correctAnswer: 1,
      difficulty: "Beginner",
      explanation: "The <nav> element is used to define a section of navigation links.",
    },
  ],
  css3: [
    {
      id: "css-q1",
      question: "Which CSS property is used to create flexible layouts?",
      options: ["display: block", "display: flex", "display: inline", "display: table"],
      correctAnswer: 1,
      difficulty: "Intermediate",
      explanation: "display: flex creates a flexible layout container using Flexbox.",
    },
  ],
}

export function QuizMode({ language, onBack }: QuizModeProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [timeLeft, setTimeLeft] = useState(20 * 60) // 20 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All")

  const allQuestions = sampleQuizzes[language] || []
  const filteredQuestions =
    selectedDifficulty === "All" ? allQuestions : allQuestions.filter((q) => q.difficulty === selectedDifficulty)

  const currentQuestion = filteredQuestions[currentQuestionIndex]
  const progress = filteredQuestions.length > 0 ? ((currentQuestionIndex + 1) / filteredQuestions.length) * 100 : 0

  // Calculate score
  const calculateScore = useCallback(() => {
    let correct = 0
    filteredQuestions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++
      }
    })
    return {
      correct,
      total: filteredQuestions.length,
      percentage: filteredQuestions.length > 0 ? Math.round((correct / filteredQuestions.length) * 100) : 0,
    }
  }, [filteredQuestions, selectedAnswers])

  // Timer effect
  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setQuizCompleted(true)
            setShowResults(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [quizStarted, quizCompleted, timeLeft])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setQuizCompleted(false)
    setShowResults(false)
    setTimeLeft(20 * 60)
  }

  const selectAnswer = (answerIndex: number) => {
    if (!currentQuestion || quizCompleted) return

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerIndex,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setQuizCompleted(true)
      setShowResults(true)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const restartQuiz = () => {
    setQuizStarted(false)
    setQuizCompleted(false)
    setShowResults(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setTimeLeft(20 * 60)
  }

  const difficulties = ["All", "Beginner", "Intermediate", "OOP"]
  const score = calculateScore()
  const isPassing = score.percentage >= 70

  // Quiz not started screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-6 animate-gradient-shift">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 animate-fade-in-up"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modes
          </Button>

          <div className="max-w-2xl mx-auto text-center">
            <div className="p-6 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 w-24 h-24 mx-auto mb-6 flex items-center justify-center animate-float animate-fade-in-up animation-delay-200">
              <Target className="h-12 w-12 text-blue-400" />
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4 animate-fade-in-up animation-delay-300">
              {languages.find((l) => l.id === language)?.name} Quiz Challenge
            </h1>

            <p className="text-gray-300 mb-8 text-pretty animate-fade-in-up animation-delay-400">
              Test your knowledge with our timed quiz. You have 20 minutes to complete all questions. Score 70% or
              higher to pass!
            </p>

            {/* Difficulty Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in-up animation-delay-500">
              {difficulties.map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={
                    selectedDifficulty === difficulty
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                      : "border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300"
                  }
                >
                  {difficulty}
                </Button>
              ))}
            </div>

            <Card className="mb-8 glass-card hover:scale-105 transition-all duration-500 animate-fade-in-up animation-delay-600">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                      {filteredQuestions.length}
                    </div>
                    <div className="text-sm text-gray-300">Questions</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                      20
                    </div>
                    <div className="text-sm text-gray-300">Minutes</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      70%
                    </div>
                    <div className="text-sm text-gray-300">To Pass</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={startQuiz}
              size="lg"
              className="px-8 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 animate-fade-in-up animation-delay-700"
              disabled={filteredQuestions.length === 0}
            >
              Start Quiz
            </Button>

            {filteredQuestions.length === 0 && (
              <p className="text-gray-300 mt-4 animate-fade-in-up animation-delay-800">
                No questions available for this difficulty level.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Results screen
  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-6 animate-gradient-shift">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div
              className={cn(
                "p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center animate-fade-in-up",
                isPassing
                  ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20"
                  : "bg-gradient-to-br from-red-500/20 to-pink-500/20",
              )}
            >
              {isPassing ? (
                <Trophy className="h-12 w-12 text-green-400" />
              ) : (
                <XCircle className="h-12 w-12 text-red-400" />
              )}
            </div>

            <h1
              className={cn(
                "text-4xl font-bold mb-4 animate-fade-in-up animation-delay-200",
                isPassing
                  ? "bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent",
              )}
            >
              {isPassing ? "Congratulations!" : "Keep Practicing!"}
            </h1>

            <p className="text-gray-300 mb-8 animate-fade-in-up animation-delay-300">
              {isPassing
                ? "You passed the quiz! Great job on mastering these concepts."
                : "You need 70% to pass. Review the material and try again."}
            </p>

            <Card className="mb-8 glass-card hover:scale-105 transition-all duration-500 animate-fade-in-up animation-delay-400">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div
                      className={cn(
                        "text-4xl font-bold",
                        isPassing
                          ? "bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
                          : "bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent",
                      )}
                    >
                      {score.percentage}%
                    </div>
                    <div className="text-sm text-gray-300">Final Score</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                      {score.correct}
                    </div>
                    <div className="text-sm text-gray-300">Correct Answers</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      {score.total}
                    </div>
                    <div className="text-sm text-gray-300">Total Questions</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Review */}
            <Card className="mb-8 text-left glass-card animate-fade-in-up animation-delay-500">
              <CardHeader>
                <CardTitle className="text-white">Question Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredQuestions.map((question, index) => {
                  const userAnswer = selectedAnswers[question.id]
                  const isCorrect = userAnswer === question.correctAnswer

                  return (
                    <div key={question.id} className="border border-slate-600/50 rounded-lg p-4 bg-slate-800/30">
                      <div className="flex items-start gap-3 mb-2">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2 text-white">
                            {index + 1}. {question.question}
                          </p>
                          <p className="text-sm text-gray-300 mb-2">
                            Your answer: {userAnswer !== undefined ? question.options[userAnswer] : "Not answered"}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-400 mb-2">
                              Correct answer: {question.options[question.correctAnswer]}
                            </p>
                          )}
                          <p className="text-sm text-gray-400">{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center animate-fade-in-up animation-delay-600">
              <Button
                onClick={restartQuiz}
                variant="outline"
                className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button
                onClick={onBack}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
              >
                Back to Modes
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Quiz in progress
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-6 animate-gradient-shift">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={onBack} className="mb-6 text-gray-300 hover:text-white hover:bg-white/10">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modes
          </Button>
          <div className="text-center">
            <p className="text-gray-300">No questions available.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-6 animate-gradient-shift">
      <div className="container mx-auto px-4 py-8">
        {/* Header with timer */}
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modes
          </Button>
          <div className="flex items-center gap-4">
            <Badge
              variant={timeLeft < 300 ? "destructive" : "secondary"}
              className={cn(
                "gap-2 px-4 py-2 text-lg font-mono",
                timeLeft < 300
                  ? "bg-red-500/20 text-red-300 border-red-500/30"
                  : "bg-slate-800/50 text-gray-300 border-slate-600/50",
              )}
            >
              <Clock className="h-4 w-4" />
              {formatTime(timeLeft)}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">
              Question {currentQuestionIndex + 1} of {filteredQuestions.length}
            </span>
            <Badge variant="outline" className="border-blue-500/30 text-blue-300 bg-blue-500/10">
              {currentQuestion.difficulty}
            </Badge>
          </div>
          <Progress value={progress} className="mb-4 h-2 bg-slate-800/50" />
        </div>

        {/* Question */}
        <div className="max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
          <Card className="mb-8 glass-card">
            <CardHeader>
              <CardTitle className="text-xl text-pretty text-white">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswers[currentQuestion.id] === index ? "default" : "outline"}
                  className={cn(
                    "w-full justify-start text-left h-auto p-4 transition-all duration-300",
                    selectedAnswers[currentQuestion.id] === index
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                      : "border-slate-600/50 text-gray-300 hover:bg-blue-500/20 hover:border-blue-400",
                  )}
                  onClick={() => selectAnswer(index)}
                >
                  <span className="mr-3 font-medium">{String.fromCharCode(65 + index)}.</span>
                  <span className="text-pretty">{option}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between animate-fade-in-up animation-delay-400">
            <Button
              variant="outline"
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 disabled:opacity-50 bg-transparent"
            >
              Previous
            </Button>

            <div className="text-sm text-gray-300">
              {Object.keys(selectedAnswers).length} of {filteredQuestions.length} answered
            </div>

            <Button
              onClick={nextQuestion}
              disabled={selectedAnswers[currentQuestion.id] === undefined}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50"
            >
              {currentQuestionIndex === filteredQuestions.length - 1 ? "Finish Quiz" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper to find language data
const languages = [
  { id: "python", name: "Python" },
  { id: "javascript", name: "JavaScript" },
  { id: "html5", name: "HTML5" },
  { id: "css3", name: "CSS3" },
]
