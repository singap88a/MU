import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Copy, 
  CheckCircle2, 
  Clock, 
  Trash2,
  RefreshCw,
  ShieldCheck,
  Users
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export default function InstructorsManagement() {
  const [instructors, setInstructors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const loadedInstructors = JSON.parse(localStorage.getItem('instructors') || '[]');
    setInstructors(loadedInstructors);
  };

  const [activeTab, setActiveTab] = useState('requests'); // requests, all

  const pendingInstructors = instructors.filter(i => i.status === 'pending');
  const activeInstructors = instructors.filter(i => i.status !== 'pending'); // active, or undefined (legacy)

  const handleApprove = (id) => {
    // Update local state and localStorage
    const updatedInstructors = instructors.map(i => {
      if (i.id === id) return { ...i, status: 'active', approvedAt: new Date().toISOString() };
      return i;
    });
    setInstructors(updatedInstructors);
    localStorage.setItem('instructors', JSON.stringify(updatedInstructors));
    alert('تم قبول طلب المعيد وتفعيل حسابه بنجاح! سيتم إرسال بريد إلكتروني له تلقائياً.');
  };

  const handleReject = (id) => {
    if (!window.confirm('هل أنت متأكد من رفض هذا الطلب؟ سيتم حذفه نهائياً.')) return;
    
    // Remove from list
    const updatedInstructors = instructors.filter(i => i.id !== id);
    setInstructors(updatedInstructors);
    localStorage.setItem('instructors', JSON.stringify(updatedInstructors));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة المعيدين</h1>
          <p className="text-secondary-500">مراجعة طلبات التسجيل والتحكم في الحسابات النشطة</p>
        </div>
        <div className="flex bg-secondary-100 dark:bg-secondary-800 p-1 rounded-lg">
           <button 
             onClick={() => setActiveTab('requests')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'requests' ? 'bg-white dark:bg-secondary-700 shadow-sm text-primary-600' : 'text-secondary-500 hover:text-secondary-700'}`}
           >
             طلبات الانتظار ({pendingInstructors.length})
           </button>
           <button 
             onClick={() => setActiveTab('all')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'all' ? 'bg-white dark:bg-secondary-700 shadow-sm text-primary-600' : 'text-secondary-500 hover:text-secondary-700'}`}
           >
             كل المعيدين ({activeInstructors.length})
           </button>
        </div>
      </div>

      {activeTab === 'requests' && (
        <div className="space-y-4">
          {pendingInstructors.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                 <div className="h-16 w-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-4">
                   <ShieldCheck className="h-8 w-8 text-emerald-500" />
                 </div>
                 <h3 className="text-lg font-bold text-secondary-900 dark:text-white">لا توجد طلبات جديدة</h3>
                 <p className="text-secondary-500">جميع طلبات التسجيل تمت مراجعتُها.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {pendingInstructors.map(instructor => (
                <Card key={instructor.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Proof Preview Section */}
                    <div className="w-full md:w-48 bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center p-4">
                      {instructor.proofFile ? (
                        <img src={instructor.proofFile} alt="Proof" className="max-h-32 object-contain rounded" />
                      ) : (
                        <div className="text-center text-secondary-400">
                          <ShieldCheck className="h-8 w-8 mx-auto mb-2" />
                          <span className="text-xs">لا توجد صورة</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                           <div>
                             <h3 className="font-bold text-lg text-secondary-900 dark:text-white">{instructor.name}</h3>
                             <p className="text-secondary-500 text-sm">{instructor.jobTitle || 'معيد'}</p>
                           </div>
                           <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                             قيد المراجعة
                           </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm mt-4">
                          <div className="flex items-center gap-2">
                             <span className="text-secondary-500">الجامعة:</span>
                             <span className="font-medium text-secondary-900 dark:text-white">{instructor.university}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <span className="text-secondary-500">القسم:</span>
                             <span className="font-medium text-secondary-900 dark:text-white">{instructor.department}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <span className="text-secondary-500">البريد:</span>
                             <span className="font-medium text-secondary-900 dark:text-white">{instructor.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <span className="text-secondary-500">تاريخ الطلب:</span>
                             <span className="font-medium text-secondary-900 dark:text-white">
                                {new Date(instructor.createdAt).toLocaleDateString('ar-EG')}
                             </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6 justify-end">
                        <Button variant="outline" className="text-red-600 hover:bg-red-50 border-red-200" onClick={() => handleReject(instructor.id)}>
                           <Trash2 className="ml-2 h-4 w-4" />
                           رفض الطلب
                        </Button>
                        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => handleApprove(instructor.id)}>
                           <CheckCircle2 className="ml-2 h-4 w-4" />
                           قبول وتفعيل الحساب
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'all' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary-500" />
                المعيدين النشطين
              </div>
              <div className="relative w-64">
                <Input
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-9"
                />
                <Search className="absolute right-3 top-2 h-4 w-4 text-secondary-400" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {activeInstructors.length === 0 ? (
                <p className="text-center text-secondary-500 py-8">لا يوجد معيدبن نشطين</p>
              ) : (
                activeInstructors.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase())).map((instructor) => (
                  <div key={instructor.id} className="flex items-center gap-3 p-3 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 rounded-lg transition-colors border border-transparent hover:border-secondary-200 dark:hover:border-secondary-700">
                    <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-bold shrink-0">
                      {instructor.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-secondary-900 dark:text-white truncate">{instructor.name}</p>
                        <Badge variant="outline" className="text-emerald-600 text-[10px] px-1 h-5 bg-emerald-50 border-emerald-200">نشط</Badge>
                      </div>
                      <p className="text-sm text-secondary-500 truncate">{instructor.email}</p>
                    </div>
                    <div className="text-xs text-secondary-400 whitespace-nowrap">
                      {new Date(instructor.createdAt).toLocaleDateString('ar-EG')}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
