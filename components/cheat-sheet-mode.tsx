"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Code, BookOpen, Zap, Copy, Check } from "lucide-react"

interface CheatSheetModeProps {
  language: string
  onBack: () => void
}

interface CheatSheetSection {
  id: string
  title: string
  category: string
  content: CheatSheetItem[]
}

interface CheatSheetItem {
  title: string
  description: string
  syntax: string
  example?: string
}

// Sample cheat sheet data - in a real app, this would come from an API
const cheatSheetData: Record<string, CheatSheetSection[]> = {
  python: [
    {
      id: "basics",
      title: "Basic Syntax",
      category: "fundamentals",
      content: [
        {
          title: "Variables",
          description: "Store data in variables",
          syntax: "variable_name = value",
          example: "name = 'John'\nage = 25\nis_student = True",
        },
        {
          title: "Print Statement",
          description: "Output text to console",
          syntax: "print(value)",
          example: "print('Hello, World!')\nprint(f'My name is {name}')",
        },
        {
          title: "Comments",
          description: "Add comments to your code",
          syntax: "# Single line comment\n'''Multi-line comment'''",
          example: "# This is a comment\n'''\nThis is a\nmulti-line comment\n'''",
        },
      ],
    },
    {
      id: "data-types",
      title: "Data Types",
      category: "fundamentals",
      content: [
        {
          title: "Lists",
          description: "Ordered, mutable collections",
          syntax: "my_list = [item1, item2, item3]",
          example: "fruits = ['apple', 'banana', 'orange']\nfruits.append('grape')\nprint(fruits[0])  # apple",
        },
        {
          title: "Dictionaries",
          description: "Key-value pairs",
          syntax: "my_dict = {'key': 'value'}",
          example: "person = {'name': 'John', 'age': 25}\nprint(person['name'])  # John",
        },
        {
          title: "Tuples",
          description: "Ordered, immutable collections",
          syntax: "my_tuple = (item1, item2, item3)",
          example: "coordinates = (10, 20)\nx, y = coordinates  # Unpacking",
        },
      ],
    },
    {
      id: "functions",
      title: "Functions",
      category: "intermediate",
      content: [
        {
          title: "Function Definition",
          description: "Define reusable code blocks",
          syntax: "def function_name(parameters):\n    return value",
          example: "def greet(name):\n    return f'Hello, {name}!'\n\nresult = greet('Alice')",
        },
        {
          title: "Lambda Functions",
          description: "Anonymous functions",
          syntax: "lambda arguments: expression",
          example: "square = lambda x: x**2\nprint(square(5))  # 25",
        },
      ],
    },
    {
      id: "classes",
      title: "Classes & OOP",
      category: "advanced",
      content: [
        {
          title: "Class Definition",
          description: "Define classes and objects",
          syntax: "class ClassName:\n    def __init__(self, params):\n        self.attribute = value",
          example:
            "class Person:\n    def __init__(self, name):\n        self.name = name\n    \n    def greet(self):\n        return f'Hi, I am {self.name}'",
        },
        {
          title: "Inheritance",
          description: "Create child classes",
          syntax: "class Child(Parent):\n    def __init__(self):\n        super().__init__()",
          example:
            "class Student(Person):\n    def __init__(self, name, grade):\n        super().__init__(name)\n        self.grade = grade",
        },
      ],
    },
  ],
  javascript: [
    {
      id: "basics",
      title: "Basic Syntax",
      category: "fundamentals",
      content: [
        {
          title: "Variables",
          description: "Declare variables with let, const, or var",
          syntax: "let variableName = value;\nconst constantName = value;",
          example: "let name = 'John';\nconst age = 25;\nvar isStudent = true;",
        },
        {
          title: "Console Output",
          description: "Output to browser console",
          syntax: "console.log(value);",
          example: "console.log('Hello, World!');\nconsole.log(`My name is ${name}`);",
        },
        {
          title: "Comments",
          description: "Add comments to your code",
          syntax: "// Single line\n/* Multi-line */",
          example: "// This is a comment\n/* This is a\n   multi-line comment */",
        },
      ],
    },
    {
      id: "functions",
      title: "Functions",
      category: "intermediate",
      content: [
        {
          title: "Function Declaration",
          description: "Define functions",
          syntax: "function functionName(params) {\n    return value;\n}",
          example: "function greet(name) {\n    return `Hello, ${name}!`;\n}\n\nconst result = greet('Alice');",
        },
        {
          title: "Arrow Functions",
          description: "ES6 arrow function syntax",
          syntax: "const functionName = (params) => {\n    return value;\n};",
          example: "const square = (x) => x * x;\nconst add = (a, b) => a + b;",
        },
      ],
    },
    {
      id: "arrays",
      title: "Arrays & Objects",
      category: "intermediate",
      content: [
        {
          title: "Arrays",
          description: "Ordered collections of data",
          syntax: "const array = [item1, item2, item3];",
          example:
            "const fruits = ['apple', 'banana', 'orange'];\nfruits.push('grape');\nconsole.log(fruits[0]); // apple",
        },
        {
          title: "Objects",
          description: "Key-value pairs",
          syntax: "const object = { key: value };",
          example: "const person = { name: 'John', age: 25 };\nconsole.log(person.name); // John",
        },
      ],
    },
  ],
  html5: [
    {
      id: "structure",
      title: "Document Structure",
      category: "fundamentals",
      content: [
        {
          title: "Basic HTML Document",
          description: "Standard HTML5 document structure",
          syntax:
            "<!DOCTYPE html>\n<html>\n<head>\n    <title>Title</title>\n</head>\n<body>\n    Content\n</body>\n</html>",
          example:
            "<!DOCTYPE html>\n<html lang='en'>\n<head>\n    <meta charset='UTF-8'>\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Welcome</h1>\n</body>\n</html>",
        },
        {
          title: "Headings",
          description: "Six levels of headings",
          syntax: "<h1>Heading 1</h1>\n<h2>Heading 2</h2>\n...\n<h6>Heading 6</h6>",
          example: "<h1>Main Title</h1>\n<h2>Section Title</h2>\n<h3>Subsection</h3>",
        },
      ],
    },
    {
      id: "semantic",
      title: "Semantic Elements",
      category: "intermediate",
      content: [
        {
          title: "Page Structure",
          description: "Semantic HTML5 elements",
          syntax: "<header>\n<nav>\n<main>\n<section>\n<article>\n<aside>\n<footer>",
          example:
            "<header>\n    <nav>Navigation</nav>\n</header>\n<main>\n    <article>Content</article>\n</main>\n<footer>Footer</footer>",
        },
        {
          title: "Forms",
          description: "Form elements and inputs",
          syntax: "<form>\n    <input type='text' name='field'>\n    <button type='submit'>Submit</button>\n</form>",
          example:
            "<form>\n    <label for='email'>Email:</label>\n    <input type='email' id='email' required>\n    <button type='submit'>Send</button>\n</form>",
        },
      ],
    },
  ],
  css3: [
    {
      id: "selectors",
      title: "Selectors",
      category: "fundamentals",
      content: [
        {
          title: "Basic Selectors",
          description: "Target HTML elements",
          syntax: "element { property: value; }\n.class { property: value; }\n#id { property: value; }",
          example: "h1 { color: blue; }\n.highlight { background: yellow; }\n#header { font-size: 24px; }",
        },
        {
          title: "Pseudo-classes",
          description: "Style element states",
          syntax: "selector:pseudo-class { property: value; }",
          example:
            "a:hover { color: red; }\nbutton:active { transform: scale(0.95); }\ninput:focus { border: 2px solid blue; }",
        },
      ],
    },
    {
      id: "layout",
      title: "Layout",
      category: "intermediate",
      content: [
        {
          title: "Flexbox",
          description: "Flexible box layout",
          syntax: ".container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}",
          example:
            ".flex-container {\n    display: flex;\n    gap: 1rem;\n    flex-wrap: wrap;\n}\n\n.flex-item {\n    flex: 1;\n}",
        },
        {
          title: "Grid",
          description: "CSS Grid layout",
          syntax: ".container {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 1rem;\n}",
          example:
            ".grid-container {\n    display: grid;\n    grid-template-columns: 1fr 2fr 1fr;\n    grid-template-rows: auto 1fr auto;\n}",
        },
      ],
    },
  ],
}

export function CheatSheetMode({ language, onBack }: CheatSheetModeProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const cheatSheet = cheatSheetData[language] || []

  const categories = ["all", ...Array.from(new Set(cheatSheet.map((section) => section.category)))]

  const filteredSections = cheatSheet.filter((section) => {
    const matchesCategory = selectedCategory === "all" || section.category === selectedCategory
    const matchesSearch =
      searchTerm === "" ||
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.some(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    return matchesCategory && matchesSearch
  })

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(itemId)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "fundamentals":
        return "bg-green-100 text-green-800 border-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <Button variant="ghost" onClick={onBack} className="glass-card hover:bg-white/20 transition-all duration-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modes
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse-glow">
              <Code className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {language.charAt(0).toUpperCase() + language.slice(1)} Cheat Sheet
            </h1>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
              <Input
                placeholder="Search syntax, functions, or concepts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-card border-blue-500/30 bg-slate-800/50 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`capitalize transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                      : "glass-card border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400/50"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card className="glass-card border-blue-500/30 bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">{cheatSheet.length}</div>
                  <div className="text-sm text-gray-400">Sections</div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card border-blue-500/30 bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">
                    {cheatSheet.reduce((total, section) => total + section.content.length, 0)}
                  </div>
                  <div className="text-sm text-gray-400">Code Examples</div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card border-blue-500/30 bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">Quick</div>
                  <div className="text-sm text-gray-400">Reference</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cheat Sheet Content */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredSections.length === 0 ? (
            <Card className="glass-card border-blue-500/30 bg-slate-800/50">
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">No results found</h3>
                <p className="text-gray-400">Try adjusting your search terms or category filter.</p>
              </CardContent>
            </Card>
          ) : (
            filteredSections.map((section, sectionIndex) => (
              <Card
                key={section.id}
                className="glass-card border-blue-500/30 bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${sectionIndex * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-3 text-white">
                        {section.title}
                        <Badge
                          className={`${getCategoryColor(section.category)} bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-400/30`}
                        >
                          {section.category}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {section.content.length} code examples and syntax references
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.content.map((item, index) => (
                    <div
                      key={index}
                      className="glass-card border-blue-500/20 bg-slate-700/30 rounded-lg p-4 space-y-3 hover:bg-slate-700/50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-lg text-white">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(item.syntax, `${section.id}-${index}`)}
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 transition-all duration-300"
                        >
                          {copiedItem === `${section.id}-${index}` ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="text-sm font-medium text-blue-300 mb-2">Syntax:</div>
                          <div className="macbook-window bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                            <div className="macbook-header bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                              <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
                              </div>
                              <div className="flex-1 text-center">
                                <span className="text-xs text-gray-400 font-mono">
                                  {language}.
                                  {language === "html5"
                                    ? "html"
                                    : language === "css3"
                                      ? "css"
                                      : language === "javascript"
                                        ? "js"
                                        : "py"}
                                </span>
                              </div>
                            </div>
                            <pre className="p-4 text-sm overflow-x-auto text-gray-300 font-mono leading-relaxed">
                              <code className="language-{language}">{item.syntax}</code>
                            </pre>
                          </div>
                        </div>

                        {item.example && (
                          <div>
                            <div className="text-sm font-medium text-purple-300 mb-2">Example:</div>
                            <div className="macbook-window bg-slate-900 rounded-lg overflow-hidden border border-purple-500/30">
                              <div className="macbook-header bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-purple-500/30">
                                <div className="flex gap-2">
                                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
                                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
                                </div>
                                <div className="flex-1 text-center">
                                  <span className="text-xs text-purple-300 font-mono">
                                    example.
                                    {language === "html5"
                                      ? "html"
                                      : language === "css3"
                                        ? "css"
                                        : language === "javascript"
                                          ? "js"
                                          : "py"}
                                  </span>
                                </div>
                              </div>
                              <pre className="p-4 text-sm overflow-x-auto text-gray-300 font-mono leading-relaxed bg-gradient-to-br from-purple-900/10 to-blue-900/10">
                                <code className="language-{language}">{item.example}</code>
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="text-sm">
            Quick reference for {language.charAt(0).toUpperCase() + language.slice(1)} programming. Click the copy
            button to copy syntax to your clipboard.
          </p>
        </div>
      </div>
    </div>
  )
}
