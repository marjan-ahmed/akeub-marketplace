"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BookOpen, LogOut, User, Settings, MessageCircle, Trophy, Target, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { mcqGenerator } from '@/lib/mcq-generator';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSyllabus, setSelectedSyllabus] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [step, setStep] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const grades = [
    { value: 'ssc1', label: 'SSC I (Grade 9)' },
    { value: 'ssc2', label: 'SSC II (Grade 10)' },
    { value: 'hsc1', label: 'HSC I (Grade 11)' },
    { value: 'hsc2', label: 'HSC II (Grade 12)' }
  ];

  const syllabusYears = [
    { value: '2022', label: '2022 Syllabus' },
    { value: '2025', label: '2025 Syllabus' },
    { value: '2026', label: '2026 Syllabus' }
  ];

  const subjects = [
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'urdu', label: 'Urdu' },
    { value: 'islamiat', label: 'Islamiat' },
    { value: 'pakstudies', label: 'Pakistan Studies' }
  ];

  // Get chapters dynamically from MCQ generator
  const getChaptersForSubject = (subject: string, grade: string) => {
    return mcqGenerator.getAvailableChapters(subject, grade);
  };

  const handleNext = () => {
    if (step === 1 && selectedGrade && selectedSyllabus) {
      setStep(2);
    } else if (step === 2 && selectedSubject) {
      setStep(3);
    } else if (step === 3 && selectedChapter) {
      // Navigate to MCQ practice
      router.push(`/practice?grade=${selectedGrade}&syllabus=${selectedSyllabus}&subject=${selectedSubject}&chapter=${selectedChapter}`);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AKUEB MCQ Practice</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.push('/chat')}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">{user.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h2>
          <p className="text-gray-600">
            Ready to practice some MCQs? Let's get started with your exam preparation.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Questions Attempted</p>
                  <p className="text-2xl font-bold text-blue-600">156</p>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Correct Answers</p>
                  <p className="text-2xl font-bold text-green-600">124</p>
                </div>
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Accuracy Rate</p>
                  <p className="text-2xl font-bold text-purple-600">79%</p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Study Time</p>
                  <p className="text-2xl font-bold text-orange-600">24h</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selection Process */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Step {step} of 3:</span>
                  <span>
                    {step === 1 && 'Select Grade & Syllabus'}
                    {step === 2 && 'Choose Subject'}
                    {step === 3 && 'Select Chapter'}
                  </span>
                </CardTitle>
                <CardDescription>
                  {step === 1 && 'Choose your grade level and syllabus year'}
                  {step === 2 && 'Select the subject you want to practice'}
                  {step === 3 && 'Pick a chapter to start practicing MCQs'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Grade Level
                      </label>
                      <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {grades.map((grade) => (
                            <SelectItem key={grade.value} value={grade.value}>
                              {grade.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Syllabus Year
                      </label>
                      <Select value={selectedSyllabus} onValueChange={setSelectedSyllabus}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose syllabus year" />
                        </SelectTrigger>
                        <SelectContent>
                          {syllabusYears.map((year) => (
                            <SelectItem key={year.value} value={year.value}>
                              {year.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {subjects.map((subject) => (
                      <Card 
                        key={subject.value}
                        className={`cursor-pointer transition-all ${
                          selectedSubject === subject.value 
                            ? 'ring-2 ring-blue-500 bg-blue-50' 
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => setSelectedSubject(subject.value)}
                      >
                        <CardContent className="p-4 text-center">
                          <h3 className="font-semibold text-gray-900">{subject.label}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Practice MCQs for {subject.label}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {step === 3 && selectedSubject && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {getChaptersForSubject(selectedSubject, selectedGrade).map((chapter) => (
                      <Card 
                        key={chapter}
                        className={`cursor-pointer transition-all ${
                          selectedChapter === chapter 
                            ? 'ring-2 ring-blue-500 bg-blue-50' 
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => setSelectedChapter(chapter)}
                      >
                        <CardContent className="p-3">
                          <h4 className="font-medium text-gray-900 text-sm">{chapter}</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            ∞ Unlimited questions available
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline" 
                    onClick={handleBack}
                    disabled={step === 1}
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleNext}
                    disabled={
                      (step === 1 && (!selectedGrade || !selectedSyllabus)) ||
                      (step === 2 && !selectedSubject) ||
                      (step === 3 && !selectedChapter)
                    }
                  >
                    {step === 3 ? 'Start Practice' : 'Next'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Grade Level</span>
                  <Badge variant={selectedGrade ? "default" : "secondary"}>
                    {selectedGrade ? grades.find(g => g.value === selectedGrade)?.label.split(' ')[0] : 'Not Selected'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Syllabus</span>
                  <Badge variant={selectedSyllabus ? "default" : "secondary"}>
                    {selectedSyllabus || 'Not Selected'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Subject</span>
                  <Badge variant={selectedSubject ? "default" : "secondary"}>
                    {selectedSubject ? subjects.find(s => s.value === selectedSubject)?.label : 'Not Selected'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Chapter</span>
                  <Badge variant={selectedChapter ? "default" : "secondary"}>
                    {selectedChapter || 'Not Selected'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Trophy className="h-4 w-4 mr-2" />
                  View Achievements
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Performance Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Study Materials
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}