import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Upload, CheckCircle, FileText, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function SubmitAssignment() {
  const { sectionId, assignmentId } = useParams();
  const [studentName, setStudentName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentName && studentCode && file) {
      // في التطبيق الحقيقي سيتم رفع الملف للسيرفر
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2">تم رفع التاسك بنجاح!</h2>
            <p className="text-secondary-500 mb-6">شكراً {studentName}</p>
            <div className="bg-secondary-100 dark:bg-secondary-800 p-4 rounded-lg text-right">
              <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">تفاصيل التسليم:</p>
              <p className="text-sm"><span className="font-medium">الملف:</span> {file.name}</p>
              <p className="text-sm"><span className="font-medium">الحجم:</span> {(file.size / 1024).toFixed(2)} KB</p>
              <p className="text-sm"><span className="font-medium">التاريخ:</span> {new Date().toLocaleDateString('ar-EG')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">رفع التاسك</CardTitle>
            <p className="text-center text-secondary-500 mt-2">تاسك 1: تصميم واجهة مستخدم</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">الاسم</label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-950 dark:border-secondary-800"
                  placeholder="أدخل اسمك"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">رقم الكارنيه</label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-950 dark:border-secondary-800"
                  placeholder="أدخل رقم الكارنيه"
                  value={studentCode}
                  onChange={(e) => setStudentCode(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">الملف</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-secondary-300 dark:border-secondary-700'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  {file ? (
                    <div className="space-y-3">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                        <FileText className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900 dark:text-white">{file.name}</p>
                        <p className="text-sm text-secondary-500">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setFile(null)}
                      >
                        تغيير الملف
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-16 h-16 rounded-full bg-secondary-100 dark:bg-secondary-800 mx-auto flex items-center justify-center">
                        <Upload className="w-8 h-8 text-secondary-400" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900 dark:text-white">
                          اسحب الملف هنا أو اضغط للاختيار
                        </p>
                        <p className="text-sm text-secondary-500 mt-1">
                          PDF, DOC, DOCX, ZIP (حتى 10 MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        id="file-upload"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.zip"
                      />
                      <label htmlFor="file-upload">
                        <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('file-upload').click()}>
                          اختر ملف
                        </Button>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800 dark:text-amber-200">
                    <p className="font-medium mb-1">تنبيه:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>تأكد من رفع الملف الصحيح قبل الإرسال</li>
                      <li>لا يمكن تعديل التسليم بعد الإرسال</li>
                      <li>آخر موعد للتسليم: 25 نوفمبر 2023</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={!studentName || !studentCode || !file}
              >
                رفع التاسك
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
