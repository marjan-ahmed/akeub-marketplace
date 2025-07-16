"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  FileText,
  Clock
} from 'lucide-react';
import { mcqGenerator } from '@/lib/mcq-generator';

interface MCQAnswer {
  questionId: string;
  selectedOption: number | null;
  isCorrect: boolean | null;
  showAnswer: boolean;
}

export default function PaperModePractice() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Map<string, MCQAnswer>>(new Map());
  const [loading, setLoading] = useState(true);

  const grade = searchParams.get('grade');
  const syllabus = searchParams.get('syllabus');
  const subject = searchParams.get('subject');
  const chapter = searchParams.get('chapter');
  const difficulty = searchParams.get('difficulty') as 'easy' | 'medium' | 'hard' | 'impossible';

  useEffect(() => {
    if (grade && syllabus && subject && chapter && difficulty) {
      generateQuestions();
    }
  }, [grade, syllabus, subject, chapter, difficulty]);

  const generateQuestions = () => {
    setLoading(true);
    
    // Generate 20 questions for paper mode
    const generatedQuestions = mcqGenerator.generateMultipleMCQs({
      grade: grade!,
      subject: subject!,
      chapter: chapter!,
      difficulty: difficulty!,
      syllabus: syllabus!,
      count: 20
    });

    setQuestions(generatedQuestions);
    
    // Initialize answers map
    const initialAnswers = new Map<string, MCQAnswer>();
    generatedQuestions.forEach(q => {
      initialAnswers.set(q.id, {
        questionId: q.id,
        selectedOption: null,
        isCorrect: null,
        showAnswer: false
      });
    });
    setAnswers(initialAnswers);
    setLoading(false);
  };

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const isCorrect = optionIndex === question.correct;
    
    setAnswers(prev => {
      const newAnswers = new Map(prev);
      newAnswers.set(questionId, {
        questionId,
        selectedOption: optionIndex,
        isCorrect,
        showAnswer: false
      });
      return newAnswers;
    });
  };

  const toggleAnswerVisibility = (questionId: string) => {
    setAnswers(prev => {
      const newAnswers = new Map(prev);
      const current = newAnswers.get(questionId);
      if (current) {
        newAnswers.set(questionId, {
          ...current,
          showAnswer: !current.showAnswer
        });
      }
      return newAnswers;
    });
  };

  const getOptionClassName = (questionId: string, optionIndex: number) => {
    const answer = answers.get(questionId);
    const question = questions.find(q => q.id === questionId);
    
    if (!answer || !question) return 'border-gray-200 hover:border-gray-300';

    const isSelected = answer.selectedOption === optionIndex;
    const isCorrect = optionIndex === question.correct;
    const showAnswer = answer.showAnswer;

    if (showAnswer) {
      if (isCorrect) {
        return 'border-green-500 bg-green-50 text-green-800';
      } else if (isSelected && !isCorrect) {
        return 'border-red-500 bg-red-50 text-red-800';
      }
      return 'border-gray-200 bg-gray-50';
    }

    if (isSelected) {
      return 'border-blue-500 bg-blue-50 text-blue-800';
    }

    return 'border-gray-200 hover:border-gray-300';
  };

  const getQuestionStats = () => {
    let attempted = 0;
    let correct = 0;
    
    answers.forEach(answer => {
      if (answer.selectedOption !== null) {
        attempted++;
        if (answer.isCorrect) correct++;
      }
    });

    return { attempted, correct, total: questions.length };
  };

  const stats = getQuestionStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Paper Mode Practice</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{stats.attempted}</span>/{stats.total} attempted
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium text-green-600">{stats.correct}</span> correct
              </div>
              <Badge variant="outline" className="capitalize">
                {difficulty}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Paper Header */}
        <Card className="mb-8 bg-white shadow-sm">
          <CardHeader className="text-center border-b">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                AKUEB Examination Board
              </h2>
              <h3 className="text-xl font-semibold text-blue-600">
                {subject?.toUpperCase()} - {grade?.toUpperCase()}
              </h3>
              <div className="flex justify-center space-x-4 text-sm text-gray-600">
                <span>Chapter: {chapter}</span>
                <span>•</span>
                <span>Syllabus: {syllabus}</span>
                <span>•</span>
                <span>Questions: {questions.length}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.attempted}</div>
                <div className="text-sm text-gray-600">Attempted</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0}%
                </div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="py-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Instructions:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Select the best answer for each question</li>
                  <li>• Click "Show Answer" to reveal the correct answer and explanation</li>
                  <li>• You can attempt questions in any order</li>
                  <li>• Green indicates correct answers, red indicates incorrect selections</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-8">
          {questions.map((question, index) => {
            const answer = answers.get(question.id);
            const showAnswer = answer?.showAnswer || false;
            
            return (
              <Card key={question.id} className="bg-white shadow-sm">
                <CardContent className="p-6">
                  {/* Question Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {question.marks} mark{question.marks > 1 ? 's' : ''}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {question.questionType}
                      </Badge>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAnswerVisibility(question.id)}
                      disabled={!answer?.selectedOption}
                    >
                      {showAnswer ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-2" />
                          Hide Answer
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          Show Answer
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Question Text */}
                  <div className="mb-6">
                    <p className="text-gray-900 font-medium leading-relaxed">
                      {question.question}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-3 mb-6">
                    {question.options.map((option: string, optionIndex: number) => (
                      <div
                        key={optionIndex}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${getOptionClassName(question.id, optionIndex)}`}
                        onClick={() => handleOptionSelect(question.id, optionIndex)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                              <span className="text-sm font-bold">
                                {String.fromCharCode(65 + optionIndex)}
                              </span>
                            </div>
                            <span className="font-medium">{option}</span>
                          </div>
                          
                          {showAnswer && (
                            <div>
                              {optionIndex === question.correct && (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              )}
                              {answer?.selectedOption === optionIndex && optionIndex !== question.correct && (
                                <XCircle className="h-5 w-5 text-red-600" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Answer Explanation */}
                  {showAnswer && (
                    <>
                      <Separator className="mb-4" />
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-white">
                              {String.fromCharCode(65 + question.correct)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-blue-900 mb-2">
                              Correct Answer: {question.options[question.correct]}
                            </p>
                            <p className="text-sm text-blue-800 leading-relaxed">
                              {question.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 text-center">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Practice Complete!
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.correct}</div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0}%
                </div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={generateQuestions}>
                Generate New Questions
              </Button>
              <Button variant="outline" onClick={() => router.push('/dashboard')}>
                Back to Dashboard
              </Button>
              <Button variant="outline" onClick={() => router.push('/practice')}>
                Try Different Chapter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}