"use client"

import {useEffect, useState} from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Safari } from "@/components/ui/safari"
import {CheckCircle, XCircle, RotateCcw, Code, Bug, Play, ChevronRight, ChevronLeft} from "lucide-react"
import { ProgressRadial} from "@/components/radial-chart";
import {questions} from "@/data/questions.data";
import {Navigation} from "@/components/quiz/navigation";

export default function QCMPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<(number | string)[]>([])
    const [showResults, setShowResults] = useState(false)
    const [answered, setAnswered] = useState(false)
    const [userCode, setUserCode] = useState("")
    const playSound = (src: string) => {
        const audio = new Audio(src)
        audio.play().catch(err => console.warn("Erreur audio :", err))
    }

    const handleAnswerSelect = (answerIndex: number) => {
        if (answered) return

        const newAnswers = [...selectedAnswers]
        newAnswers[currentQuestion] = answerIndex
        setSelectedAnswers(newAnswers)

        const question = questions[currentQuestion]

        // ✅ jouer le son si la réponse est correcte
        if (question.type === "multiple-choice" && answerIndex === question.correctAnswer) {
            playSound("/sounds/succes.mp3")
        } else {
            playSound("/sounds/error.mp3") // optionnel si tu veux aussi un son d'erreur
        }

        setAnswered(true)
    }

    const handleCodeSubmit = () => {
        if (answered) return

        const newAnswers = [...selectedAnswers]
        newAnswers[currentQuestion] = userCode.trim()
        setSelectedAnswers(newAnswers)

        const question = questions[currentQuestion]
        const userAnswer = userCode.trim()
        const correctAnswer = question.type === "code-correction" ? question.correctCode.trim() : ""

        // ✅ jouer le son si le code est correct
        if (question.type === "code-correction" && userAnswer === correctAnswer) {
            playSound("/sounds/succes.mp3")
        } else {
            playSound("/sounds/error.mp3") // optionnel
        }

        setAnswered(true)
    }

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
            setAnswered(selectedAnswers[currentQuestion + 1] !== undefined)
            const nextQuestion = questions[currentQuestion + 1]
            if (nextQuestion.type === "code-correction") {
                setUserCode(nextQuestion.buggyCode)
            }
        } else {
            setShowResults(true)
            playSound("/sounds/succes_1.mp3") // 🔊 son de fin
        }
    }

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1)
            setAnswered(selectedAnswers[currentQuestion - 1] !== undefined)
            const prevQuestion = questions[currentQuestion - 1]
            if (prevQuestion.type === "code-correction") {
                const prevAnswer = selectedAnswers[currentQuestion - 1]
                setUserCode(typeof prevAnswer === "string" ? prevAnswer : prevQuestion.buggyCode)
            }
        }
    }

    const handleRestart = () => {
        setCurrentQuestion(0)
        setSelectedAnswers([])
        setShowResults(false)
        setAnswered(false)
        const firstQuestion = questions[0]
        if (firstQuestion.type === "code-correction") {
            setUserCode(firstQuestion.buggyCode)
        }
    }

    const calculateScore = () => {
        return selectedAnswers.reduce((score: number, answer, index) => {
            const question = questions[index]
            if (question.type === "multiple-choice") {
                return score + (typeof answer === "number" && answer === question.correctAnswer ? 1 : 0)
            } else if (question.type === "code-correction") {
                // Comparaison simple du code (on pourrait améliorer avec une comparaison plus sophistiquée)
                const userAnswer = typeof answer === "string" ? answer.trim() : ""
                const correctAnswer = question.correctCode.trim()
                return score + (userAnswer === correctAnswer ? 1 : 0)
            }
            return score
        }, 0)
    }

    useEffect(() => {
        const firstQuestion = questions[0]
        if (firstQuestion.type === "code-correction") {
            setUserCode(firstQuestion.buggyCode)
        }
    }, [questions])

    const getScoreColor = (score: number) => {
        const percentage = (score / questions.length) * 100
        if (percentage >= 80) return "text-green-600"
        if (percentage >= 60) return "text-yellow-600"
        return "text-red-600"
    }

    if (showResults) {
        const score = calculateScore()
        const percentage = Math.round((score / questions.length) * 100)

        return (
            <div className="min-h-screen bg-background p-4">
                <div className="max-w-6xl mx-auto">
                    <Safari url="qcm-programmation.dev/resultats" width={1200} height={800} className="mb-8">
                        <div className="p-8 h-full overflow-y-auto">
                            <Card className="border-0 shadow-none">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-3xl font-bold text-primary">Résultats du QCM Programmation</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <div className="text-center">
                                            <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
                                                {score}/{questions.length}
                                            </div>
                                            <div className="text-2xl text-muted-foreground">{percentage}% de réussite</div>
                                        </div>
                                        <div>
                                            <ProgressRadial current={50} target={100} />
                                        </div>
                                    </div>


                                    <div className="space-y-4">
                                        {questions.map((question, index) => {
                                            const userAnswer = selectedAnswers[index]
                                            let isCorrect = false

                                            if (question.type === "multiple-choice") {
                                                isCorrect = userAnswer === question.correctAnswer
                                            } else if (question.type === "code-correction") {
                                                const userCode = typeof userAnswer === "string" ? userAnswer.trim() : ""
                                                isCorrect = userCode === question.correctCode.trim()
                                            }

                                            return (
                                                <Card key={question.id} className="border-l-4 border-l-primary">
                                                    <CardContent className="p-4">
                                                        <div className="flex items-start gap-3">
                                                            {isCorrect ? (
                                                                <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                                                            ) : (
                                                                <XCircle className="text-red-600 mt-1 flex-shrink-0" size={20} />
                                                            )}
                                                            <div className="flex-1">
                                                                <p className="font-medium mb-2">{question.question}</p>
                                                                <div className="text-sm space-y-2">
                                                                    {question.type === "multiple-choice" ? (
                                                                        <>
                                                                            <p>
                                                                                <span className="font-medium">Votre réponse :</span>{" "}
                                                                                <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                                                                                   {question.options[userAnswer as number]}
                                                                                </span>
                                                                            </p>
                                                                            {!isCorrect && (
                                                                                <p>
                                                                                    <span className="font-medium">Bonne réponse :</span>{" "}
                                                                                    <span className="text-green-600">
                                                                                       {question.options[question.correctAnswer]}
                                                                                    </span>
                                                                                </p>
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <div className="space-y-2">
                                                                            <div>
                                                                                <span className="font-medium">Votre code :</span>
                                                                                <pre className="bg-muted p-2 rounded text-xs mt-1 overflow-x-auto">
                                                                                    <code>{userAnswer as string}</code>
                                                                                </pre>
                                                                            </div>
                                                                            {!isCorrect && (
                                                                                <div>
                                                                                    <span className="font-medium text-green-600">Code correct :</span>
                                                                                    <pre className="bg-green-50 p-2 rounded text-xs mt-1 overflow-x-auto">
                                                                                        <code>{question.correctCode}</code>
                                                                                    </pre>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    {question.explanation && (
                                                                        <p className="text-muted-foreground italic">{question.explanation}</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )
                                        })}
                                    </div>

                                    <div className="text-center">
                                        <Button onClick={handleRestart} className="gap-2">
                                            <RotateCcw size={16} />
                                            Recommencer le QCM
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </Safari>
                </div>
            </div>
        )
    }

    const question = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-primary mb-4 text-balance">QCM Programmation</h1>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>
                              Question {currentQuestion + 1} sur {questions.length}
                            </span>
                            <span>{Math.round(progress)}% complété</span>
                        </div>
                        <Progress value={progress} className="h-2"/>
                    </div>
                </div>

                {/* Question Card */}
                <Safari
                    url={`mindforg:glitch/python/question-${currentQuestion + 1}`}
                    width={1200}
                    height={550}
                    className="mb-6"
                >
                    <div className="p-6 h-full overflow-y-auto">
                        <Card className="border-0 shadow-none mb-6">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="secondary" className="text-sm">
                                        Question {currentQuestion + 1}
                                    </Badge>
                                    <Badge
                                        variant={question.type === "code-correction" ? "default" : "outline"}
                                        className="text-sm gap-1"
                                    >
                                        {question.type === "code-correction" ? (
                                            <>
                                                <Bug size={12}/>
                                                Correction de code
                                            </>
                                        ) : (
                                            <>
                                                <Code size={12}/>
                                                QCM
                                            </>
                                        )}
                                    </Badge>
                                </div>
                                <CardTitle
                                    className="text-xl text-balance leading-relaxed">{question.question}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {question.type === "multiple-choice" ? (
                                    <div className="space-y-3">
                                        {question.options.map((option, index) => {
                                            const isSelected = selectedAnswers[currentQuestion] === index
                                            const isCorrect = index === question.correctAnswer
                                            const showFeedback = answered

                                            let buttonVariant: "default" | "secondary" | "outline" = "outline"
                                            let buttonClass = ""

                                            if (showFeedback) {
                                                if (isSelected && isCorrect) {
                                                    buttonClass = "bg-green-100 border-green-500 text-green-700 hover:bg-green-100"
                                                } else if (isSelected && !isCorrect) {
                                                    buttonClass = "bg-red-100 border-red-500 text-red-700 hover:bg-red-100"
                                                } else if (!isSelected && isCorrect) {
                                                    buttonClass = "bg-green-50 border-green-300 text-green-600"
                                                }
                                            } else if (isSelected) {
                                                buttonVariant = "secondary"
                                            }

                                            return (
                                                <Button
                                                    key={index}
                                                    variant={buttonVariant}
                                                    className={`w-full justify-start text-left h-auto p-4 text-wrap leading-relaxed ${buttonClass}`}
                                                    onClick={() => handleAnswerSelect(index)}
                                                    disabled={answered}
                                                >
                                                    <span
                                                        className="font-medium mr-3 text-primary">{String.fromCharCode(65 + index)}.</span>
                                                    {option}
                                                    {showFeedback && isSelected && (
                                                        <span className="ml-auto">
                                                            {isCorrect ? (
                                                                <CheckCircle className="text-green-600" size={20}/>
                                                            ) : (
                                                                <XCircle className="text-red-600" size={20}/>
                                                            )}
                                                        </span>
                                                    )}
                                                </Button>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {question.hint && (
                                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                                <p className="text-sm text-blue-800">
                                                    <span className="font-medium">💡 Indice :</span> {question.hint}
                                                </p>
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Corrigez le code ci-dessous ({question.language}) :
                                            </label>
                                            <Textarea
                                                value={userCode}
                                                onChange={(e) => setUserCode(e.target.value)}
                                                className="font-mono text-sm min-h-32 resize-y"
                                                placeholder="Tapez votre code corrigé ici..."
                                                disabled={answered}
                                            />
                                        </div>

                                        {!answered && (
                                            <Button onClick={handleCodeSubmit} disabled={!userCode.trim()}
                                                    className="w-full">
                                                Soumettre le code corrigé
                                            </Button>
                                        )}

                                        {answered && (
                                            <div className="space-y-3">
                                                <div className="p-3 bg-muted rounded-lg">
                                                    <p className="text-sm font-medium mb-2">Votre code :</p>
                                                    <pre className="text-xs overflow-x-auto">
                                                        <code>{selectedAnswers[currentQuestion] as string}</code>
                                                    </pre>
                                                </div>

                                                {userCode.trim() !== question.correctCode.trim() && (
                                                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                                        <p className="text-sm font-medium mb-2 text-green-800">Code
                                                            correct :</p>
                                                        <pre className="text-xs overflow-x-auto text-green-700">
                                                          <code>{question.correctCode}</code>
                                                        </pre>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {answered && question.explanation && (
                                    <div className="mt-4 p-4 bg-muted rounded-lg">
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Explication :</span> {question.explanation}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </Safari>

                {/* Navigation */}
                <Navigation onClick={handlePrevious} currentQuestion={currentQuestion} onClick1={handleNext} answered={answered}/>
            </div>
        </div>
    )
}
