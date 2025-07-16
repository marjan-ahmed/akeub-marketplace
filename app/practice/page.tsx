"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Target, Eye, EyeOff, CheckCircle, XCircle, ArrowLeft, ArrowRight, RefreshCw, Infinity } from 'lucide-react';
import { mcqGenerator, MCQQuestion, questionUtils } from '@/lib/mcq-generator';

export default function Practice() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState('');
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [questionsGenerated, setQuestionsGenerated] = useState(0);
  const [totalQuestionsAttempted, setTotalQuestionsAttempted] = useState(0);
  const [isGeneratingMore, setIsGeneratingMore] = useState(false);

  const grade = searchParams.get('grade');
  const syllabus = searchParams.get('syllabus');
  const subject = searchParams.get('subject');
  const chapter = searchParams.get('chapter');

  useEffect(() => {
    if (!grade || !syllabus || !subject || !chapter) {
      router.push('/dashboard');
    }
  }, [grade, syllabus, subject, chapter, router]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const handleDifficultySelect = (level: string) => {
    setDifficulty(level);
    generateInitialQuestions(level);
    setIsTimerActive(true);
  };

  const generateInitialQuestions = (difficultyLevel: string) => {
    if (!grade || !subject || !chapter) return;
    
    setIsGeneratingMore(true);
    const initialCount = mcqGenerator.getRecommendedQuestionCount(difficultyLevel);
    
    const newQuestions = mcqGenerator.generateMultipleMCQs({
      grade,
      subject,
      chapter,
      difficulty: difficultyLevel as any,
      syllabus: syllabus || '2025',
      count: initialCount
    });
    
    setQuestions(newQuestions);
    setQuestionsGenerated(initialCount);
    setIsGeneratingMore(false);
  };

  const generateMoreQuestions = () => {
    if (!grade || !subject || !chapter || !difficulty) return;
    
    setIsGeneratingMore(true);
    const additionalCount = 5; // Generate 5 more questions at a time
    
    const newQuestions = mcqGenerator.generateMultipleMCQs({
      grade,
      subject,
      chapter,
      difficulty: difficulty as any,
      syllabus: syllabus || '2025',
      count: additionalCount
    });
    
    setQuestions(prev => [...prev, ...newQuestions]);
    setQuestionsGenerated(prev => prev + additionalCount);
    setIsGeneratingMore(false);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex.toString());
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      const isCorrect = parseInt(selectedAnswer) === questions[currentQuestion].correct;
      if (isCorrect) {
        setScore(score + 1);
      }
      setShowAnswer(true);
      setIsTimerActive(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setTimeLeft(questions[currentQuestion + 1]?.timeLimit || 30);
      setIsTimerActive(true);
      setTotalQuestionsAttempted(prev => prev + 1);
      
      // Generate more questions when approaching the end
      if (currentQuestion >= questions.length - 3) {
        generateMoreQuestions();
      }
    } else {
      // Generate more questions for infinite practice
      generateMoreQuestions();
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setTimeLeft(questions[currentQuestion + 1]?.timeLimit || 30);
      setIsTimerActive(true);
      setTotalQuestionsAttempted(prev => prev + 1);
    }
  };

  const handleEndPractice = () => {
    router.push(`/results?score=${score}&total=${totalQuestionsAttempted + 1}&difficulty=${difficulty}&subject=${subject}&chapter=${chapter}`);
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-orange-500';
      case 'impossible': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (!difficulty) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">MCQ Practice</h1>
              </div>
              <Button variant="outline" onClick={() => router.push('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Difficulty Level</h2>
            <p className="text-gray-600">
              Choose your preferred difficulty level for {subject} - {chapter}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <Badge variant="outline">{grade?.toUpperCase()}</Badge>
              <Badge variant="outline">{syllabus} Syllabus</Badge>
              <Badge variant="outline">{subject}</Badge>
              <Badge variant="outline">{chapter}</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleDifficultySelect('easy')}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span>Easy</span>
                </CardTitle>
                <CardDescription>
                  Basic concepts and fundamental questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Simple conceptual questions</li>
                  <li>• Basic formula applications</li>
                  <li>• Straightforward calculations</li>
                  <li>• ∞ Unlimited questions available</li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleDifficultySelect('medium')}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span>Medium</span>
                </CardTitle>
                <CardDescription>
                  Past paper questions and moderate complexity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Past paper MCQs</li>
                  <li>• Multi-step problems</li>
                  <li>• Applied concepts</li>
                  <li>• ∞ Unlimited questions available</li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleDifficultySelect('hard')}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  <span>Hard</span>
                </CardTitle>
                <CardDescription>
                  Challenging questions with tricky concepts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Complex problem solving</li>
                  <li>• Tricky question formats</li>
                  <li>• Advanced applications</li>
                  <li>• ∞ Unlimited questions available</li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleDifficultySelect('impossible')}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span>Impossible</span>
                </CardTitle>
                <CardDescription>
                  Advanced questions including next grade level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Extremely challenging problems</li>
                  <li>• Higher grade level questions</li>
                  <li>• Advanced mathematical concepts</li>
                  <li>• ∞ Unlimited questions available</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MCQ Practice</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={getDifficultyColor(difficulty)}>
                {difficulty.toUpperCase()}
              </Badge>
              <div className="flex items-center space-x-2">
                <Infinity className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of ∞
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className={`text-sm ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-600'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Questions Attempted: {totalQuestionsAttempted + 1}
            </span>
            <span className="text-sm text-gray-600">
              Score: {score}/{totalQuestionsAttempted + 1} ({Math.round((score / Math.max(totalQuestionsAttempted + 1, 1)) * 100)}%)
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Progress value={Math.min((score / Math.max(totalQuestionsAttempted + 1, 1)) * 100, 100)} className="h-2 flex-1" />
            <Badge variant="outline" className="text-xs">
              {questionsGenerated} Generated
            </Badge>
          </div>
        </div>

        {/* Question Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalQuestionsAttempted + 1}</div>
              <div className="text-xs text-gray-600">Attempted</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-xs text-gray-600">Correct</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{Math.round((score / Math.max(totalQuestionsAttempted + 1, 1)) * 100)}%</div>
              <div className="text-xs text-gray-600">Accuracy</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{questions[currentQuestion]?.marks || 1}</div>
              <div className="text-xs text-gray-600">Marks</div>
            </div>
          </Card>
        </div>

        {/* Question Card */}
        {questions[currentQuestion] ? (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">{questions[currentQuestion].questionType}</Badge>
                <Badge variant="outline">{questions[currentQuestion].topic}</Badge>
              </div>
              <CardTitle className="text-xl">
                {questions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions[currentQuestion].options.map((option: string, index: number) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedAnswer === index.toString()
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${
                    showAnswer
                      ? index === questions[currentQuestion].correct
                        ? 'border-green-500 bg-green-50'
                        : selectedAnswer === index.toString()
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200'
                      : ''
                  }`}
                  onClick={() => !showAnswer && handleAnswerSelect(index)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{String.fromCharCode(65 + index)}. {option}</span>
                    {showAnswer && index === questions[currentQuestion].correct && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {showAnswer && selectedAnswer === index.toString() && index !== questions[currentQuestion].correct && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-6">
            <CardContent className="p-8 text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Generating your next question...</p>
            </CardContent>
          </Card>
        )}

        {/* Answer Explanation */}
        {showAnswer && questions[currentQuestion] && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Explanation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowAnswer(!showAnswer)}
              disabled={!selectedAnswer}
            >
              {showAnswer ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleEndPractice}
              className="text-red-600 hover:text-red-700"
            >
              End Practice
            </Button>
          </div>

          <div className="flex space-x-4">
            {isGeneratingMore && (
              <Button variant="outline" disabled>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </Button>
            )}
            
            {!showAnswer ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
              >
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                Next Question
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Infinite Practice Info */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Infinity className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">Infinite Practice Mode</h3>
            </div>
            <p className="text-blue-800 text-sm">
              Questions are generated dynamically as you progress. Practice as long as you want to master the topic!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}