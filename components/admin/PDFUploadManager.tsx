"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Download,
  Eye,
  Trash2
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  type: 'syllabus' | 'pastpaper';
  status: 'processing' | 'completed' | 'failed';
  grade: string;
  subject: string;
  year?: string;
  extractedItems: number;
  uploadDate: string;
}

export default function PDFUploadManager() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<'syllabus' | 'pastpaper'>('syllabus');
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [syllabusYear, setSyllabusYear] = useState('');
  const [paperYear, setPaperYear] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Mathematics_SSC2_2025_Syllabus.pdf',
      type: 'syllabus',
      status: 'completed',
      grade: 'SSC II',
      subject: 'Mathematics',
      year: '2025',
      extractedItems: 12,
      uploadDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Physics_HSC1_2023_PastPaper.pdf',
      type: 'pastpaper',
      status: 'completed',
      grade: 'HSC I',
      subject: 'Physics',
      year: '2023',
      extractedItems: 45,
      uploadDate: '2024-01-14'
    },
    {
      id: '3',
      name: 'Chemistry_SSC1_2024_Syllabus.pdf',
      type: 'syllabus',
      status: 'processing',
      grade: 'SSC I',
      subject: 'Chemistry',
      year: '2024',
      extractedItems: 0,
      uploadDate: '2024-01-16'
    }
  ]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a valid PDF file');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !grade || !subject) {
      alert('Please fill all required fields');
      return;
    }

    if (uploadType === 'syllabus' && !syllabusYear) {
      alert('Please select syllabus year');
      return;
    }

    if (uploadType === 'pastpaper' && !paperYear) {
      alert('Please enter paper year');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // TODO: Implement actual PDF processing
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // formData.append('type', uploadType);
      // formData.append('grade', grade);
      // formData.append('subject', subject);
      // formData.append('year', uploadType === 'syllabus' ? syllabusYear : paperYear);

      // const response = await fetch('/api/pdf/upload', {
      //   method: 'POST',
      //   body: formData
      // });

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful upload
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: selectedFile.name,
        type: uploadType,
        status: 'completed',
        grade: grade,
        subject: subject,
        year: uploadType === 'syllabus' ? syllabusYear : paperYear,
        extractedItems: Math.floor(Math.random() * 50) + 10,
        uploadDate: new Date().toISOString().split('T')[0]
      };

      setUploadedFiles(prev => [newFile, ...prev]);
      setUploadProgress(100);

      // Reset form
      setTimeout(() => {
        setSelectedFile(null);
        setGrade('');
        setSubject('');
        setSyllabusYear('');
        setPaperYear('');
        setUploading(false);
        setUploadProgress(0);
      }, 1000);

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-blue-600" />
            <span>PDF Upload Manager</span>
          </CardTitle>
          <CardDescription>
            Upload AKUEB syllabus PDFs and past papers for automatic content extraction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={uploadType} onValueChange={(value) => setUploadType(value as 'syllabus' | 'pastpaper')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="syllabus">Syllabus PDF</TabsTrigger>
              <TabsTrigger value="pastpaper">Past Paper PDF</TabsTrigger>
            </TabsList>

            <TabsContent value="syllabus" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="grade">Grade Level</Label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ssc1">SSC I (Grade 9)</SelectItem>
                      <SelectItem value="ssc2">SSC II (Grade 10)</SelectItem>
                      <SelectItem value="hsc1">HSC I (Grade 11)</SelectItem>
                      <SelectItem value="hsc2">HSC II (Grade 12)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="urdu">Urdu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="syllabusYear">Syllabus Year</Label>
                  <Select value={syllabusYear} onValueChange={setSyllabusYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pastpaper" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="grade">Grade Level</Label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ssc1">SSC I (Grade 9)</SelectItem>
                      <SelectItem value="ssc2">SSC II (Grade 10)</SelectItem>
                      <SelectItem value="hsc1">HSC I (Grade 11)</SelectItem>
                      <SelectItem value="hsc2">HSC II (Grade 12)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="paperYear">Paper Year</Label>
                  <Input
                    id="paperYear"
                    type="number"
                    placeholder="e.g., 2023"
                    value={paperYear}
                    onChange={(e) => setPaperYear(e.target.value)}
                    min="2015"
                    max="2024"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Label htmlFor="file">Select PDF File</Label>
            <div className="mt-2 flex items-center space-x-4">
              <Input
                id="file"
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                disabled={uploading}
                className="flex-1"
              />
              <Button 
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="min-w-[120px]"
              >
                {uploading ? 'Processing...' : 'Upload & Extract'}
              </Button>
            </div>
            
            {selectedFile && (
              <div className="mt-2 text-sm text-gray-600">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}

            {uploading && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Processing PDF...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files List */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Files</CardTitle>
          <CardDescription>
            Manage uploaded syllabus and past paper files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <h4 className="font-medium">{file.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{file.grade}</Badge>
                      <Badge variant="outline">{file.subject}</Badge>
                      <Badge variant="outline">{file.year}</Badge>
                      <Badge className={getStatusColor(file.status)}>
                        {file.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {file.extractedItems} items extracted • Uploaded {file.uploadDate}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getStatusIcon(file.status)}
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}