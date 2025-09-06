"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, TrendingUp, Target, BookOpen, Award, Calendar, BarChart3 } from "lucide-react"

interface AnalyticsModeProps {
  language: string
  onBack: () => void
}

const sampleAnalytics = {
  python: {
    averageScore: 85,
    flashcardsReviewed: 230,
    quizzesCompleted: 12,
    studyStreak: 7,
    totalStudyTime: 45,
    weeklyGoal: 50,
    learningCurve: [
      { date: "Week 1", score: 65, time: 8 },
      { date: "Week 2", score: 72, time: 12 },
      { date: "Week 3", score: 68, time: 10 },
      { date: "Week 4", score: 78, time: 15 },
    ],
    topicMastery: [
      { topic: "Variables", mastery: 95, color: "#10B981" },
      { topic: "Functions", mastery: 88, color: "#3B82F6" },
      { topic: "Loops", mastery: 76, color: "#8B5CF6" },
      { topic: "Classes", mastery: 62, color: "#F59E0B" },
    ],
    improvement: 15,
  },
  javascript: {
    averageScore: 78,
    flashcardsReviewed: 185,
    quizzesCompleted: 10,
    studyStreak: 5,
    totalStudyTime: 35,
    weeklyGoal: 40,
    learningCurve: [
      { date: "Week 1", score: 55, time: 7 },
      { date: "Week 2", score: 62, time: 10 },
      { date: "Week 3", score: 68, time: 9 },
      { date: "Week 4", score: 72, time: 12 },
    ],
    topicMastery: [
      { topic: "Variables", mastery: 85, color: "#10B981" },
      { topic: "Functions", mastery: 78, color: "#3B82F6" },
      { topic: "Loops", mastery: 66, color: "#8B5CF6" },
      { topic: "Classes", mastery: 52, color: "#F59E0B" },
    ],
    improvement: 12,
  },
  html5: {
    averageScore: 92,
    flashcardsReviewed: 156,
    quizzesCompleted: 15,
    studyStreak: 10,
    totalStudyTime: 55,
    weeklyGoal: 60,
    learningCurve: [
      { date: "Week 1", score: 75, time: 10 },
      { date: "Week 2", score: 82, time: 15 },
      { date: "Week 3", score: 85, time: 12 },
      { date: "Week 4", score: 88, time: 18 },
    ],
    topicMastery: [
      { topic: "Elements", mastery: 90, color: "#10B981" },
      { topic: "Attributes", mastery: 82, color: "#3B82F6" },
      { topic: "Forms", mastery: 70, color: "#8B5CF6" },
      { topic: "Semantics", mastery: 58, color: "#F59E0B" },
    ],
    improvement: 8,
  },
  css3: {
    averageScore: 81,
    flashcardsReviewed: 198,
    quizzesCompleted: 14,
    studyStreak: 8,
    totalStudyTime: 40,
    weeklyGoal: 45,
    learningCurve: [
      { date: "Week 1", score: 60, time: 9 },
      { date: "Week 2", score: 68, time: 12 },
      { date: "Week 3", score: 72, time: 11 },
      { date: "Week 4", score: 76, time: 14 },
    ],
    topicMastery: [
      { topic: "Selectors", mastery: 85, color: "#10B981" },
      { topic: "Properties", mastery: 78, color: "#3B82F6" },
      { topic: "Flexbox", mastery: 66, color: "#8B5CF6" },
      { topic: "Grid", mastery: 52, color: "#F59E0B" },
    ],
    improvement: 18,
  },
}

export function AnalyticsMode({ language, onBack }: AnalyticsModeProps) {
  const analytics = sampleAnalytics[language as keyof typeof sampleAnalytics] || sampleAnalytics.python

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-6 animate-gradient-shift relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Modes
          </Button>
          <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-400/30">
            <span className="text-blue-300 font-medium capitalize">{language} Analytics</span>
          </div>
        </div>

        <div className="mb-12 animate-fade-in-up animation-delay-200 text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4 animate-gradient-text">
            Learning Dashboard
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Track your progress, celebrate achievements, and unlock your potential
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="glass-card hover:scale-105 transition-all duration-500 animate-fade-in-up animation-delay-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl">
                  <Target className="w-6 h-6 text-green-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-medium">Average Score</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  {analytics.averageScore}%
                </p>
                <p className="text-green-400 text-xs">+{analytics.improvement}% this month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:scale-105 transition-all duration-500 animate-fade-in-up animation-delay-400 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <BarChart3 className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-medium">Cards Reviewed</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                  {analytics.flashcardsReviewed}
                </p>
                <p className="text-blue-400 text-xs">This week</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:scale-105 transition-all duration-500 animate-fade-in-up animation-delay-500 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
                  <Award className="w-6 h-6 text-purple-400" />
                </div>
                <Calendar className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-medium">Study Streak</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  {analytics.studyStreak}
                </p>
                <p className="text-purple-400 text-xs">Days in a row</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:scale-105 transition-all duration-500 animate-fade-in-up animation-delay-600 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-orange-400" />
                </div>
                <div className="text-orange-400 text-xs">
                  {Math.round((analytics.totalStudyTime / analytics.weeklyGoal) * 100)}%
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-sm font-medium">Study Time</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                  {analytics.totalStudyTime}h
                </p>
                <p className="text-orange-400 text-xs">Goal: {analytics.weeklyGoal}h/week</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up animation-delay-700">
          <div>
            <Card className="glass-card hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
                  Topic Mastery
                </h3>
                <div className="space-y-4">
                  {analytics.topicMastery.map((topic, index) => (
                    <div key={topic.topic} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">{topic.topic}</span>
                        <span className="text-sm font-bold" style={{ color: topic.color }}>
                          {topic.mastery}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800/50 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${topic.mastery}%`,
                            background: `linear-gradient(90deg, ${topic.color}40, ${topic.color})`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="glass-card hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-gray-300 text-sm">Completed Python Quiz</p>
                      <p className="text-gray-500 text-xs">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-gray-300 text-sm">Reviewed 15 Flashcards</p>
                      <p className="text-gray-500 text-xs">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-gray-300 text-sm">Achieved 7-day streak</p>
                      <p className="text-gray-500 text-xs">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
