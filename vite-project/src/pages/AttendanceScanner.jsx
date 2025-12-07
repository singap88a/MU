import React, { useState } from 'react';
import { QrCode, Camera, CheckCircle2, XCircle, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useSectionContext } from '../context/SectionContext';

export default function AttendanceScanner() {
  const { selectedSection } = useSectionContext();
  const [isScanning, setIsScanning] = useState(false);
  const [manualId, setManualId] = useState('');
  const [lastScanned, setLastScanned] = useState(null);

  if (!selectedSection) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-secondary-500">لم يتم اختيار سكشن</p>
      </div>
    );
  }

  const handleScan = (studentId) => {
    setIsScanning(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsScanning(false);
      
      const student = selectedSection.students.find(s => s.code === studentId || s.id === studentId);
      
      if (student) {
        setLastScanned({
          name: student.name,
          id: student.code,
          section: selectedSection.number,
          time: new Date().toLocaleTimeString('ar-EG'),
          status: 'success'
        });
        // Here you would typically call an API to save the attendance
      } else {
        setLastScanned({
          name: 'غير معروف',
          id: studentId,
          section: '-',
          time: new Date().toLocaleTimeString('ar-EG'),
          status: 'error'
        });
      }
    }, 1000);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualId) {
      handleScan(manualId);
      setManualId('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-white">ماسح الحضور</h2>
        <p className="text-secondary-500 dark:text-secondary-400">
          سكشن {selectedSection.number} - {selectedSection.subject}
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-video bg-black flex items-center justify-center">
            {isScanning ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-transparent animate-scan" />
                <QrCode className="h-24 w-24 text-white/50 animate-pulse" />
                <p className="mt-4 text-white font-medium">جاري التحقق...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-secondary-400">
                <Camera className="h-16 w-16 mb-4" />
                <p>الكاميرا جاهزة للمسح</p>
              </div>
            )}
          </div>
        </CardContent>
        <div className="p-6 bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800 space-y-4">
          <Button 
            size="lg" 
            className="w-full" 
            onClick={() => handleScan('2020001')} // Simulate random scan for demo
            disabled={isScanning}
          >
            {isScanning ? 'جاري المسح...' : 'محاكاة مسح QR Code'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-secondary-200 dark:border-secondary-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-secondary-900 px-2 text-secondary-500">أو إدخال يدوي</span>
            </div>
          </div>

          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <Input 
              placeholder="أدخل رقم الكارنيه..." 
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
              disabled={isScanning}
            />
            <Button type="submit" variant="secondary" disabled={isScanning || !manualId}>
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>

      {lastScanned && (
        <Card className={`border-l-4 ${lastScanned.status === 'success' ? 'border-l-emerald-500' : 'border-l-red-500'} animate-in slide-in-from-bottom-2`}>
          <CardContent className="p-6 flex items-start gap-4">
            <div className={`p-2 rounded-full ${lastScanned.status === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
              {lastScanned.status === 'success' ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-secondary-900 dark:text-white">
                {lastScanned.status === 'success' ? 'تم تسجيل الحضور بنجاح' : 'الطالب غير موجود في هذا السكشن'}
              </h3>
              <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-secondary-500">اسم الطالب</p>
                  <p className="font-medium text-secondary-900 dark:text-secondary-50">{lastScanned.name}</p>
                </div>
                <div>
                  <p className="text-secondary-500">رقم الطالب</p>
                  <p className="font-medium text-secondary-900 dark:text-secondary-50">{lastScanned.id}</p>
                </div>
                <div>
                  <p className="text-secondary-500">السكشن</p>
                  <p className="font-medium text-secondary-900 dark:text-secondary-50">{lastScanned.section}</p>
                </div>
                <div>
                  <p className="text-secondary-500">وقت التسجيل</p>
                  <p className="font-medium text-secondary-900 dark:text-secondary-50">{lastScanned.time}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
