import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';

export function QuizUploadModal({ isOpen, onClose, examTitle, student, onSubmit }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('يرجى اختيار ملف PDF فقط');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
      
      if (onSubmit) {
        onSubmit(file);
      }

      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setFile(null);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`تسليم: ${examTitle}`}>
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
          <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">تم الرفع بنجاح!</h3>
          <p className="text-secondary-500">تم استلام إجابتك وسيتم تصحيحها قريباً.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Details Confirmation */}
          <div className="bg-secondary-50 dark:bg-secondary-800/50 p-4 rounded-lg space-y-3 border border-secondary-100 dark:border-secondary-700">
            <h4 className="text-sm font-bold text-secondary-900 dark:text-white mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              بيانات الطالب
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-secondary-500 block text-xs">الاسم</span>
                <span className="font-medium text-secondary-900 dark:text-secondary-200">{student?.name}</span>
              </div>
              <div>
                <span className="text-secondary-500 block text-xs">الفرقة</span>
                <span className="font-medium text-secondary-900 dark:text-secondary-200">{student?.year}</span>
              </div>
              <div>
                <span className="text-secondary-500 block text-xs">القسم</span>
                <span className="font-medium text-secondary-900 dark:text-secondary-200">{student?.department}</span>
              </div>
              <div>
                <span className="text-secondary-500 block text-xs">السكشن</span>
                <span className="font-medium text-secondary-900 dark:text-secondary-200">{student?.section}</span>
              </div>
            </div>
          </div>

          {/* File Upload Area */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">ملف الإجابة (PDF)</label>
            <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              file ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' : 'border-secondary-300 hover:border-primary-400 dark:border-secondary-700'
            }`}>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="quiz-upload"
              />
              <label htmlFor="quiz-upload" className="cursor-pointer flex flex-col items-center gap-2">
                {file ? (
                  <>
                    <FileText className="h-10 w-10 text-primary-600" />
                    <span className="font-medium text-primary-700 dark:text-primary-400">{file.name}</span>
                    <span className="text-xs text-secondary-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={(e) => {
                        e.preventDefault();
                        setFile(null);
                      }}
                    >
                      <X className="h-4 w-4 mr-1" />
                      إلغاء
                    </Button>
                  </>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-secondary-400" />
                    <span className="font-medium text-secondary-700 dark:text-secondary-300">اضغط لرفع الملف أو اسحبه هنا</span>
                    <span className="text-xs text-secondary-500">PDF فقط (الحد الأقصى 5 ميجابايت)</span>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>إلغاء</Button>
            <Button type="submit" disabled={!file} isLoading={isUploading}>
              {isUploading ? 'جاري الرفع...' : 'تأكيد وإرسال'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
