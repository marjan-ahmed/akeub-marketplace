"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Clock, RefreshCw, Home, Share2, BookOpen } from 'lucide-react';

export default function Results() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  
  const score = parseInt(searchParams.get('score') || '0');
  const total = parseInt(searchParams.get('total') || '0');
  const difficulty = searchParams.get('difficulty') || 'medium';
  const subject = searchParams.get('subject') || '';
  const chapter = searchParams.get('chapter') || '';
  const percentage = Math.round((score / total) * 100);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/');
    }
  }, [router]);

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'bg-green-500', message: 'Excellent!' };
    if (percentage >= 80) return { grade: 'A', color: 'bg-green-400', message: 'Great job!' };
    if (percentage >= 70) return { grade: 'B', color: 'bg-blue-400', message: 'Good work!' };
    if (percentage >= 60) return { grade: 'C', color: 'bg-yellow-400', message: 'Keep trying!' };
    if (percentage >= 50) return { grade: 'D', color: 'bg-orange-400', message: 'Need improvement!' };
    return { grade: 'F', color: 'bg-red-400', message: 'Keep practicing!' };
  };

  const gradeInfo = getGrade(percentage);

  const recommendations = [
    {
      title: "Review Incorrect Answers",
      description: "Focus on the questions you got wrong to identify knowledge gaps",
      icon: Target,
      action: "Review Now"
    },
    {
      title: "Practice Similar Questions",
      description: "Find more questions on the same topics to strengthen your understanding",
      icon: RefreshCw,
      action: "Practice More"
    },
    {
      title: "Study Resources",
      description: "Access additional study materials and explanations",
      icon: BookOpen,
      action: "Browse Resources"
    }
  ];

  const handleTryAgain = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/dashboard');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AKUEB MCQ Practice Results',
        text: `I scored ${score}/${total} (${percentage}%) on my MCQ practice!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `I scored ${score}/${total} (${percentage}%) on my AKUEB MCQ practice!`;
      navigator.clipboard.writeText(text);
      alert('Results copied to clipboard!');
    }
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Quiz Results</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">{user.name}</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Results Card */}
        <Card className="mb-8 bg-white shadow-lg">
          <CardHeader className="text-center pb-8">
            <div className={`w-24 h-24 rounded-full ${gradeInfo.color} flex items-center justify-center mx-auto mb-4`}>
              <span className="text-3xl font-bold text-white">{gradeInfo.grade}</span>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              {gradeInfo.message}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              You scored {score} out of {total} questions correctly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Score Breakdown */}
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {percentage}%
                </div>
                <div className="mb-4">
                  <Progress value={percentage} className="h-3 mb-2" />
                  <div className="flex justify-center space-x-4 text-sm text-gray-600">
                    <span>Subject: {subject}</span>
                    <span>•</span>
                    <span>Chapter: {chapter}</span>
                    <span>•</span>
                    <span>Level: {difficulty}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{score}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">{total - score}</div>
                    <div className="text-sm text-gray-600">Incorrect</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-600">{total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                </div>
              </div>

              {/* Practice Stats */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Practice Session Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Questions Attempted:</span>
                    <span className="font-medium ml-2">{total}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Accuracy Rate:</span>
                    <span className="font-medium ml-2">{percentage}%</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Difficulty Level:</span>
                    <span className="font-medium ml-2 capitalize">{difficulty}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Subject:</span>
                    <span className="font-medium ml-2 capitalize">{subject}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleTryAgain} className="flex-1 sm:flex-none">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button variant="outline" onClick={handleGoHome} className="flex-1 sm:flex-none">
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button variant="outline" onClick={handleShare} className="flex-1 sm:flex-none">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Results
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span>Performance Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Strengths</h4>
                <ul className="space-y-2">
                  {score > total * 0.7 && (
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Good overall understanding</span>
                    </li>
                  )}
                  {score > total * 0.5 && (
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Solid foundation in concepts</span>
                    </li>
                  )}
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Completed the full quiz</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Areas for Improvement</h4>
                <ul className="space-y-2">
                  {score < total * 0.8 && (
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Review topic concepts</span>
                    </li>
                  )}
                  {score < total * 0.6 && (
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Practice more questions</span>
                    </li>
                  )}
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Focus on time management</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <div className="grid md:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <rec.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">{rec.title}</CardTitle>
                <CardDescription>{rec.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  {rec.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Steps */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center text-blue-900">
              Infinite Practice Available!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-blue-800 mb-4">
              You can practice unlimited questions on any topic. Try different difficulty levels and subjects to improve your overall performance.
            </p>
            <div className="flex justify-center space-x-4">
              <Button onClick={() => router.push('/dashboard')} className="bg-blue-600 hover:bg-blue-700">
                Practice More Questions
              </Button>
              <Button variant="outline" onClick={handleTryAgain}>
                Try Same Topic Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}