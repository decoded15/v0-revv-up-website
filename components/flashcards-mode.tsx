"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Flashcard } from "./flashcard"
import { ArrowLeft, ArrowRight, Shuffle, BookOpen, Target, Trophy } from "lucide-react"

interface FlashcardData {
  id: string
  question: string
  answer: string
  difficulty: "Beginner" | "Intermediate" | "OOP"
}

interface FlashcardsModeProps {
  language: string
  onBack: () => void
}

// Sample flashcard data - in a real app, this would come from an API
const sampleFlashcards: Record<string, FlashcardData[]> = {
  python: [
    {
      id: "py1",
      question: "What is a variable in Python?",
      answer:
        "A variable is a named location in memory that stores data. In Python, you create variables by assigning values: x = 5",
      difficulty: "Beginner",
    },
    {
      id: "py2",
      question: "What is the difference between a list and a tuple?",
      answer:
        "Lists are mutable (can be changed) and use square brackets []. Tuples are immutable (cannot be changed) and use parentheses ().",
      difficulty: "Intermediate",
    },
    {
      id: "py3",
      question: "What is inheritance in Python?",
      answer:
        "Inheritance allows a class to inherit attributes and methods from another class. Use class Child(Parent): to create inheritance.",
      difficulty: "OOP",
    },
    {
      id: "py4",
      question: "How do you create a function in Python?",
      answer:
        "Use the 'def' keyword followed by function name and parameters: def my_function(param1, param2): return result",
      difficulty: "Beginner",
    },
  ],
  javascript: [
    {
      id: "js1",
      question: "What is the difference between let, const, and var?",
      answer:
        "var has function scope, let and const have block scope. const cannot be reassigned, let can be reassigned.",
      difficulty: "Beginner",
    },
    {
      id: "js2",
      question: "What is a Promise in JavaScript?",
      answer:
        "A Promise represents the eventual completion or failure of an asynchronous operation and its resulting value.",
      difficulty: "Intermediate",
    },
  ],
  html5: [
    {
      id: "html1",
      question: "What is semantic HTML?",
      answer:
        "Semantic HTML uses elements that clearly describe their meaning, like <header>, <nav>, <main>, <article>, <section>, <footer>.",
      difficulty: "Beginner",
    },
  ],
  css3: [
    {
      id: "css1",
      question: "What is Flexbox?",
      answer:
        "Flexbox is a CSS layout method that arranges items in a flexible container, allowing easy alignment and distribution of space.",
      difficulty: "Intermediate",
    },
  ],
}

export function FlashcardsMode({ language, onBack }: FlashcardsModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [bookmarkedCards, setBookmarkedCards] = useState<Set<string>>(new Set())
  const [reviewedCards, setReviewedCards] = useState<Set<string>>(new Set())
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All")

  const allCards = sampleFlashcards[language] || []
  const filteredCards =
    selectedDifficulty === "All" ? allCards : allCards.filter((card) => card.difficulty === selectedDifficulty)

  const currentCard = filteredCards[currentIndex]
  const progress = filteredCards.length > 0 ? ((currentIndex + 1) / filteredCards.length) * 100 : 0

  const handleBookmark = (cardId: string) => {
    const newBookmarked = new Set(bookmarkedCards)
    if (newBookmarked.has(cardId)) {
      newBookmarked.delete(cardId)
    } else {
      newBookmarked.add(cardId)
    }
    setBookmarkedCards(newBookmarked)
  }

  const handleFlip = () => {
    if (currentCard) {
      setReviewedCards((prev) => new Set([...prev, currentCard.id]))
    }
  }

  const nextCard = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const shuffleCards = () => {
    setCurrentIndex(0)
    // In a real app, you'd shuffle the array
  }

  const difficulties = ["All", "Beginner", "Intermediate", "OOP"]

  useEffect(() => {
    setCurrentIndex(0)
  }, [selectedDifficulty])

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-6 animate-gradient-shift">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modes
          </Button>
          <div className="text-center">
            <p className="text-gray-300">No flashcards available for this language and difficulty level.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-6 animate-gradient-shift">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modes
          </Button>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={shuffleCards}
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 bg-transparent"
            >
              <Shuffle className="h-4 w-4 mr-2" />
              Shuffle
            </Button>
          </div>
        </div>

        {/* Progress and Stats */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="glass-card hover:scale-105 transition-all duration-500 animate-fade-in-up animation-delay-200">
              <CardContent className="flex items-center gap-3 p-4">
                <BookOpen className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="text-sm text-gray-300">Cards Reviewed</div>
                  <div className="text-lg font-semibold text-white">{reviewedCards.size}</div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card hover:scale-105 transition-all duration-500 animate-fade-in-up animation-delay-300">
              <CardContent className="flex items-center gap-3 p-4">
                <Target className="h-5 w-5 text-cyan-400" />
                <div>
                  <div className="text-sm text-gray-300">Current Progress</div>
                  <div className="text-lg font-semibold text-white">
                    {currentIndex + 1} / {filteredCards.length}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card hover:scale-105 transition-all duration-500 animate-fade-in-up animation-delay-400">
              <CardContent className="flex items-center gap-3 p-4">
                <Trophy className="h-5 w-5 text-green-400" />
                <div>
                  <div className="text-sm text-gray-300">Bookmarked</div>
                  <div className="text-lg font-semibold text-white">{bookmarkedCards.size}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 animate-fade-in-up animation-delay-500">
            <Progress value={progress} className="h-2 bg-slate-800/50" />
          </div>

          {/* Difficulty Filter */}
          <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up animation-delay-600">
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
        </div>

        {/* Flashcard */}
        <div className="max-w-md mx-auto mb-8 animate-fade-in-up animation-delay-700">
          <Flashcard
            id={currentCard.id}
            question={currentCard.question}
            answer={currentCard.answer}
            difficulty={currentCard.difficulty}
            isBookmarked={bookmarkedCards.has(currentCard.id)}
            onBookmark={handleBookmark}
            onFlip={handleFlip}
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 animate-fade-in-up animation-delay-800">
          <Button
            variant="outline"
            onClick={prevCard}
            disabled={currentIndex === 0}
            className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 disabled:opacity-50 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Badge variant="secondary" className="px-4 py-2 bg-slate-800/50 text-gray-300 border-slate-600/50">
            {currentIndex + 1} of {filteredCards.length}
          </Badge>
          <Button
            variant="outline"
            onClick={nextCard}
            disabled={currentIndex === filteredCards.length - 1}
            className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 disabled:opacity-50 bg-transparent"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
