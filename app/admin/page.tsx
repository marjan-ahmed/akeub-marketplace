"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  MessageCircle, 
  Search,
  Filter,
  Download,
  Eye,
  Settings,
  Shield
} from 'lucide-react';
import PDFUploadManager from '@/components/admin/PDFUploadManager';

export default function AdminPanel() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ahmed Ali",
      email: "ahmed.ali@email.com",
      grade: "SSC II",
      gender: "Male",
      city: "Karachi",
      questionsAttempted: 156,
      correctAnswers: 124,
      accuracy: 79,
      lastActive: "2024-01-15",
      joinedAt: "2024-01-10"
    },
    {
      id: 2,
      name: "Fatima Khan",
      email: "fatima.khan@email.com",
      grade: "HSC I",
      gender: "Female",
      city: "Lahore",
      questionsAttempted: 203,
      correctAnswers: 167,
      accuracy: 82,
      lastActive: "2024-01-14",
      joinedAt: "2024-01-08"
    },
    {
      id: 3,
      name: "Muhammad Hassan",
      email: "hassan@email.com",
      grade: "SSC I",
      gender: "Male",
      city: "Islamabad",
      questionsAttempted: 89,
      correctAnswers: 61,
      accuracy: 68,
      lastActive: "2024-01-13",
      joinedAt: "2024-01-12"
    },
    {
      id: 4,
      name: "Ayesha Malik",
      email: "ayesha.malik@email.com",
      grade: "HSC II",
      gender: "Female",
      city: "Rawalpindi",
      questionsAttempted: 298,
      correctAnswers: 245,
      accuracy: 82,
      lastActive: "2024-01-15",
      joinedAt: "2024-01-05"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterGender, setFilterGender] = useState('all');

  const stats = {
    totalStudents: students.length,
    maleStudents: students.filter(s => s.gender === 'Male').length,
    femaleStudents: students.filter(s => s.gender === 'Female').length,
    averageAccuracy: Math.round(students.reduce((sum, s) => sum + s.accuracy, 0) / students.length),
    totalQuestions: students.reduce((sum, s) => sum + s.questionsAttempted, 0),
    activeToday: students.filter(s => s.lastActive === "2024-01-15").length
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGrade = filterGrade === 'all' || student.grade === filterGrade;
    const matchesGender = filterGender === 'all' || student.gender === filterGender;
    
    return matchesSearch && matchesGrade && matchesGender;
  });

  const recentActivities = [
    { id: 1, user: "Ahmed Ali", action: "Completed Mathematics Chapter 5", time: "2 minutes ago" },
    { id: 2, user: "Fatima Khan", action: "Scored 85% in Physics quiz", time: "5 minutes ago" },
    { id: 3, user: "Muhammad Hassan", action: "Started Biology Chapter 3", time: "10 minutes ago" },
    { id: 4, user: "Ayesha Malik", action: "Achieved 90% accuracy milestone", time: "15 minutes ago" },
    { id: 5, user: "Sara Ahmed", action: "Joined Mathematics study group", time: "30 minutes ago" }
  ];

  const chatMessages = [
    { id: 1, from: "Ahmed Ali", message: "Can someone help with quadratic equations?", time: "5 min ago", type: "question" },
    { id: 2, from: "Fatima Khan", message: "I found a great resource for chemistry!", time: "10 min ago", type: "help" },
    { id: 3, from: "Muhammad Hassan", message: "Thanks for the physics notes!", time: "15 min ago", type: "thanks" },
    { id: 4, from: "Ayesha Malik", message: "Study group meeting tomorrow at 3 PM", time: "20 min ago", type: "announcement" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Male Students</p>
                  <p className="text-2xl font-bold text-green-600">{stats.maleStudents}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Female Students</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.femaleStudents}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Accuracy</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.averageAccuracy}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Questions</p>
                  <p className="text-2xl font-bold text-red-600">{stats.totalQuestions}</p>
                </div>
                <BookOpen className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Today</p>
                  <p className="text-2xl font-bold text-indigo-600">{stats.activeToday}</p>
                </div>
                <Eye className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="chats">Chats</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>
                  View and manage all registered students
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search students..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={filterGrade} onValueChange={setFilterGrade}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      <SelectItem value="SSC I">SSC I</SelectItem>
                      <SelectItem value="SSC II">SSC II</SelectItem>
                      <SelectItem value="HSC I">HSC I</SelectItem>
                      <SelectItem value="HSC II">HSC II</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterGender} onValueChange={setFilterGender}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genders</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Students Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Student</th>
                        <th className="text-left p-3 font-medium">Grade</th>
                        <th className="text-left p-3 font-medium">Gender</th>
                        <th className="text-left p-3 font-medium">City</th>
                        <th className="text-left p-3 font-medium">Questions</th>
                        <th className="text-left p-3 font-medium">Accuracy</th>
                        <th className="text-left p-3 font-medium">Last Active</th>
                        <th className="text-left p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div>
                              <div className="font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline">{student.grade}</Badge>
                          </td>
                          <td className="p-3">
                            <Badge variant={student.gender === 'Male' ? 'default' : 'secondary'}>
                              {student.gender}
                            </Badge>
                          </td>
                          <td className="p-3 text-gray-600">{student.city}</td>
                          <td className="p-3 text-gray-600">{student.questionsAttempted}</td>
                          <td className="p-3">
                            <Badge variant={student.accuracy >= 80 ? 'default' : student.accuracy >= 60 ? 'secondary' : 'destructive'}>
                              {student.accuracy}%
                            </Badge>
                          </td>
                          <td className="p-3 text-gray-600">{student.lastActive}</td>
                          <td className="p-3">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>
                  Monitor student activities and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.user}</p>
                          <p className="text-sm text-gray-600">{activity.action}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average Score</span>
                      <span className="font-medium">{stats.averageAccuracy}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Questions Asked</span>
                      <span className="font-medium">{stats.totalQuestions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Students Today</span>
                      <span className="font-medium">{stats.activeToday}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Completion Rate</span>
                      <span className="font-medium">74%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { subject: 'Mathematics', score: 78, students: 45 },
                      { subject: 'Physics', score: 82, students: 38 },
                      { subject: 'Chemistry', score: 75, students: 41 },
                      { subject: 'Biology', score: 81, students: 39 }
                    ].map((item) => (
                      <div key={item.subject} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{item.subject}</span>
                            <span className="text-sm text-gray-600">{item.score}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${item.score}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 ml-4">{item.students} students</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Chats</CardTitle>
                <CardDescription>
                  Monitor student conversations and interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {message.from.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{message.from}</span>
                          <Badge variant="outline" className="text-xs">
                            {message.type}
                          </Badge>
                          <span className="text-sm text-gray-500">{message.time}</span>
                        </div>
                        <p className="text-gray-700">{message.message}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}