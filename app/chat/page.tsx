"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Send, 
  Users, 
  MessageCircle, 
  Search,
  UserPlus,
  ArrowLeft,
  Hash,
  Crown,
  Smile
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/');
    }
  }, [router]);

  const studyGroups = [
    {
      id: 'mathematics-ssc2',
      name: 'Mathematics SSC II',
      members: 45,
      lastMessage: 'Can someone explain quadratic equations?',
      lastMessageTime: '2 min ago',
      unread: 3,
      subject: 'Mathematics',
      grade: 'SSC II'
    },
    {
      id: 'physics-hsc1',
      name: 'Physics HSC I',
      members: 38,
      lastMessage: 'Great explanation on electromagnetic waves!',
      lastMessageTime: '15 min ago',
      unread: 0,
      subject: 'Physics',
      grade: 'HSC I'
    },
    {
      id: 'chemistry-ssc1',
      name: 'Chemistry SSC I',
      members: 42,
      lastMessage: 'Does anyone have notes on atomic structure?',
      lastMessageTime: '1 hour ago',
      unread: 1,
      subject: 'Chemistry',
      grade: 'SSC I'
    },
    {
      id: 'biology-hsc2',
      name: 'Biology HSC II',
      members: 35,
      lastMessage: 'Thanks for sharing the genetics diagram!',
      lastMessageTime: '2 hours ago',
      unread: 0,
      subject: 'Biology',
      grade: 'HSC II'
    }
  ];

  const genderGroups = [
    {
      id: 'boys-general',
      name: 'Boys General Discussion',
      members: 156,
      lastMessage: 'Anyone up for a study session tomorrow?',
      lastMessageTime: '5 min ago',
      unread: 2,
      type: 'boys'
    },
    {
      id: 'girls-general',
      name: 'Girls General Discussion',
      members: 134,
      lastMessage: 'Found a great chemistry tutorial online',
      lastMessageTime: '10 min ago',
      unread: 1,
      type: 'girls'
    },
    {
      id: 'boys-mathematics',
      name: 'Boys Mathematics Help',
      members: 89,
      lastMessage: 'Solved that tricky calculus problem!',
      lastMessageTime: '30 min ago',
      unread: 0,
      type: 'boys'
    },
    {
      id: 'girls-sciences',
      name: 'Girls Science Discussion',
      members: 78,
      lastMessage: 'Lab experiment tips needed',
      lastMessageTime: '45 min ago',
      unread: 3,
      type: 'girls'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Ahmed Ali',
      message: 'Can someone explain the concept of derivatives in calculus?',
      time: '2:30 PM',
      avatar: 'AA',
      isOwn: false
    },
    {
      id: 2,
      sender: 'Fatima Khan',
      message: 'Sure! Derivatives represent the rate of change of a function. Think of it as the slope of a curve at any point.',
      time: '2:32 PM',
      avatar: 'FK',
      isOwn: false
    },
    {
      id: 3,
      sender: 'You',
      message: 'That\'s a great explanation! Do you have any practice problems?',
      time: '2:35 PM',
      avatar: user?.name?.charAt(0) || 'U',
      isOwn: true
    },
    {
      id: 4,
      sender: 'Hassan Muhammad',
      message: 'I can share some problems from my textbook. Let me upload them.',
      time: '2:37 PM',
      avatar: 'HM',
      isOwn: false
    },
    {
      id: 5,
      sender: 'Ayesha Malik',
      message: 'This is really helpful! Thanks everyone 🙏',
      time: '2:40 PM',
      avatar: 'AM',
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message sending logic here
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
  };

  const getCurrentChatName = () => {
    if (!selectedChat) return 'Select a chat';
    
    const studyGroup = studyGroups.find(g => g.id === selectedChat);
    if (studyGroup) return studyGroup.name;
    
    const genderGroup = genderGroups.find(g => g.id === selectedChat);
    if (genderGroup) return genderGroup.name;
    
    return 'Chat';
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
              <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <MessageCircle className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Study Chat</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">{user.name}</Badge>
              <Badge variant="outline">{user.gender}</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Study Groups</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search chats..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <Tabs defaultValue="subjects" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="subjects">Subjects</TabsTrigger>
                    <TabsTrigger value="gender">Groups</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="subjects" className="space-y-2 mt-4">
                    {studyGroups.map((group) => (
                      <div
                        key={group.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedChat === group.id 
                            ? 'bg-blue-50 border-2 border-blue-200' 
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                        onClick={() => handleChatSelect(group.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{group.name}</h4>
                          {group.unread > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {group.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{group.lastMessage}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{group.members} members</span>
                          <span className="text-xs text-gray-500">{group.lastMessageTime}</span>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="gender" className="space-y-2 mt-4">
                    {genderGroups
                      .filter(group => user.gender === 'Male' ? group.type === 'boys' : group.type === 'girls')
                      .map((group) => (
                        <div
                          key={group.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedChat === group.id 
                              ? 'bg-blue-50 border-2 border-blue-200' 
                              : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                          onClick={() => handleChatSelect(group.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm">{group.name}</h4>
                            {group.unread > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {group.unread}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{group.lastMessage}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{group.members} members</span>
                            <span className="text-xs text-gray-500">{group.lastMessageTime}</span>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Hash className="h-5 w-5 text-gray-600" />
                        <div>
                          <CardTitle className="text-lg">{getCurrentChatName()}</CardTitle>
                          <CardDescription>
                            {studyGroups.find(g => g.id === selectedChat)?.members || 
                             genderGroups.find(g => g.id === selectedChat)?.members} members online
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          Members
                        </Button>
                        <Button variant="outline" size="sm">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Invite
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {msg.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`rounded-lg p-3 ${msg.isOwn ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
                            <p className="text-sm font-medium mb-1">{msg.sender}</p>
                            <p className="text-sm">{msg.message}</p>
                            <p className={`text-xs mt-1 ${msg.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button variant="outline" size="icon">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button onClick={handleSendMessage} disabled={!message.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select a chat to start messaging
                    </h3>
                    <p className="text-gray-600">
                      Choose a study group or discussion room to join the conversation
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}