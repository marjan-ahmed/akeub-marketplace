"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Award, TrendingUp, Phone, Mail } from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      setAuthType('register');
      setShowAuth(true);
    }
  };

  const handleLogin = () => {
    setAuthType('login');
    setShowAuth(true);
  };

  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AKUEB MCQ Practice</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleLogin}>
                Login
              </Button>
              <Button onClick={handleGetStarted}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Master Your <span className="text-blue-600">AKUEB</span> Exams
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Practice MCQs for SSC I, SSC II, HSC I, and HSC II with adaptive difficulty levels.
            Prepare for your exams with our comprehensive question bank.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3" onClick={handleGetStarted}>
              Start Practicing Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive MCQ practice designed specifically for AKUEB students
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Complete Syllabus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  MCQs covering all subjects and chapters from AKUEB syllabus 2022, 2025, and 2026
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Adaptive Difficulty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Four difficulty levels from Easy to Impossible, adapting to your skill level
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Performance Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Track your progress and identify areas for improvement
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Student Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connect with fellow students and share learning experiences
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Grade Levels Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Available for All Grades
            </h3>
            <p className="text-lg text-gray-600">
              Complete preparation for all AKUEB grade levels
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { grade: 'SSC I', class: 'Grade 9', subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'] },
              { grade: 'SSC II', class: 'Grade 10', subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'] },
              { grade: 'HSC I', class: 'Grade 11', subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'] },
              { grade: 'HSC II', class: 'Grade 12', subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'] }
            ].map((level, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-blue-600">{level.grade}</CardTitle>
                  <CardDescription className="text-lg">{level.class}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {level.subjects.map((subject, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        {subject}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-blue-400" />
                <h4 className="text-lg font-semibold">AKUEB MCQ Practice</h4>
              </div>
              <p className="text-gray-400">
                Your comprehensive platform for AKUEB exam preparation
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Subjects</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Mathematics</a></li>
                <li><a href="#" className="hover:text-white">Physics</a></li>
                <li><a href="#" className="hover:text-white">Chemistry</a></li>
                <li><a href="#" className="hover:text-white">Biology</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@akuebmcq.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+92 300 1234567</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AKUEB MCQ Practice. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          type={authType}
          onClose={() => setShowAuth(false)}
          onSuccess={(userData) => {
            setUser(userData);
            setShowAuth(false);
            router.push('/dashboard');
          }}
        />
      )}
    </div>
  );
}