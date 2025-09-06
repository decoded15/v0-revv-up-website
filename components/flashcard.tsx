"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, BookmarkCheck, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface FlashcardProps {
  id: string
  question: string
  answer: string
  difficulty: "Beginner" | "Intermediate" | "OOP"
  isBookmarked: boolean
  onBookmark: (id: string) => void
  onFlip: () => void
}

export function Flashcard({ id, question, answer, difficulty, isBookmarked, onBookmark, onFlip }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
    onFlip()
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation()
    onBookmark(id)
  }

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "OOP":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="perspective-1000 w-full max-w-md mx-auto">
      <div
        className={cn(
          "relative w-full h-80 transition-transform duration-700 transform-style-preserve-3d cursor-pointer",
          isFlipped && "rotate-y-180",
        )}
        onClick={handleFlip}
      >
        {/* Front of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden border-2 hover:border-primary/50 transition-colors">
          <CardContent className="flex flex-col justify-between h-full p-6">
            <div className="flex justify-between items-start">
              <Badge className={getDifficultyColor(difficulty)}>{difficulty}</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className="text-muted-foreground hover:text-primary"
              >
                {isBookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
              </Button>
            </div>

            <div className="flex-1 flex items-center justify-center text-center">
              <h3 className="text-lg font-medium text-balance leading-relaxed">{question}</h3>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
              Click to reveal answer
            </div>
          </CardContent>
        </Card>

        {/* Back of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 border-2 border-primary/50 bg-primary/5">
          <CardContent className="flex flex-col justify-between h-full p-6">
            <div className="flex justify-between items-start">
              <Badge className={getDifficultyColor(difficulty)}>{difficulty}</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className="text-muted-foreground hover:text-primary"
              >
                {isBookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
              </Button>
            </div>

            <div className="flex-1 flex items-center justify-center text-center">
              <div className="space-y-3">
                <div className="text-sm text-primary font-medium">Answer:</div>
                <p className="text-base leading-relaxed text-pretty">{answer}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
              Click to flip back
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
