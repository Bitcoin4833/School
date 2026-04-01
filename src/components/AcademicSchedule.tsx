import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, ClipboardList, Download, ChevronLeft, School } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { domToPng } from 'modern-screenshot';
import ElegantDropdown from './ui/ElegantDropdown';

interface AcademicScheduleProps {
  events: any[];
  schedule: any[];
  examSchedule: any[];
  grades: string[];
  sections: string[];
}

const DAYS = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
const EXAM_TYPES = [
  { id: 'monthly', name: 'شهرية' },
  { id: 'midterm', name: 'نصف العام' },
  { id: 'final', name: 'نهاية العام' }
];

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch (e) {
    return dateString;
  }
};

const AcademicSchedule: React.FC<AcademicScheduleProps> = ({ events, schedule, examSchedule, grades, sections }) => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const [isDownloading, setIsDownloading] = useState(false);

  const scheduleRef = useRef<HTMLDivElement>(null);
  const examsRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async (ref: React.RefObject<HTMLDivElement>, fileName: string) => {
    if (!ref.current) return;
    setIsDownloading(true);
    try {
      // Temporarily disable overflow to capture full table width
      const originalStyle = ref.current.style.overflow;
      const originalWidth = ref.current.style.width;
      ref.current.style.overflow = 'visible';
      ref.current.style.width = 'fit-content';

      const dataUrl = await domToPng(ref.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        quality: 1
      });

      // Restore original styles
      ref.current.style.overflow = originalStyle;
      ref.current.style.width = originalWidth;
      
      // Use landscape orientation for tables
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const availableWidth = pdfWidth - (margin * 2);
      const availableHeight = pdfHeight - (margin * 2);
      
      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => (img.onload = resolve));
      
      let imgWidth = availableWidth;
      let imgHeight = (img.height * availableWidth) / img.width;

      // If height exceeds page, scale down further
      if (imgHeight > availableHeight) {
        imgHeight = availableHeight;
        imgWidth = (img.width * availableHeight) / img.height;
      }

      // Center horizontally
      const xOffset = (pdfWidth - imgWidth) / 2;
      
      pdf.addImage(dataUrl, 'PNG', xOffset, margin, imgWidth, imgHeight);
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('عذراً، حدث خطأ أثناء تحميل الملف. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="schedule" className="py-24 bg-slate-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="text-right">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">التقويم والجدول</h2>
            <p className="text-slate-500">ابقَ على اطلاع بمواعيد الحصص والفعاليات المدرسية والامتحانات</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <ElegantDropdown 
              label="الصف الدراسي"
              options={grades}
              value={selectedGrade}
              onChange={(val) => setSelectedGrade(val)}
              widthClass="w-full"
            />
            <ElegantDropdown 
              label="الشعبة"
              options={sections}
              value={selectedSection}
              onChange={(val) => setSelectedSection(val)}
              widthClass="w-full"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 h-fit w-full lg:w-auto gap-2 sm:gap-0">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`w-full sm:flex-1 lg:flex-none px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'calendar' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Calendar className="w-5 h-5" />
              التقويم الدراسي
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`w-full sm:flex-1 lg:flex-none px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'schedule' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Clock className="w-5 h-5" />
              جدول الحصص
            </button>
            <button
              onClick={() => setActiveTab('exams')}
              className={`w-full sm:flex-1 lg:flex-none px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'exams' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <ClipboardList className="w-5 h-5" />
              جدول الامتحانات
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="space-y-4">
                {(events || []).map((event, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 hover:border-emerald-200 transition-all">
                    <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl text-center min-w-[100px]">
                      <div className="text-sm font-bold opacity-70">2026</div>
                      <div className="text-lg font-black">{formatDate(event.date)}</div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-1">{event.title}</h4>
                      <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                        event.type === 'academic' ? 'bg-blue-100 text-blue-600' : 
                        event.type === 'holiday' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                      }`}>
                        {event.type === 'academic' ? 'أكاديمي' : event.type === 'holiday' ? 'إجازة' : 'نشاط'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-emerald-600 rounded-3xl p-10 text-white relative overflow-hidden flex flex-col justify-center">
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6">تحميل التقويم الكامل</h3>
                  <p className="text-emerald-50 mb-8 leading-relaxed">
                    يمكنكم تحميل نسخة PDF من التقويم الدراسي الكامل للعام الحالي 1447هـ / 2026م لتكون معكم دائماً.
                  </p>
                  <button className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all flex items-center gap-2">
                    تحميل الملف (PDF)
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
                <School className="absolute -bottom-10 -left-10 w-64 h-64 text-white/10 rotate-12" />
              </div>
            </motion.div>
          )}

          {activeTab === 'schedule' && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-end">
                <button 
                  onClick={() => downloadPDF(scheduleRef, `جدول_الحصص_${selectedGrade}_${selectedSection}`)}
                  disabled={isDownloading}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50"
                >
                  <Download className="w-5 h-5" />
                  {isDownloading ? 'جاري التحميل...' : 'تحميل الجدول (PDF)'}
                </button>
              </div>
              <div ref={scheduleRef} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4">
                <div className="mb-6 text-center border-b border-slate-100 pb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">جدول الحصص الأسبوعي</h3>
                  <p className="text-emerald-600 font-bold">{selectedGrade} - الشعبة ({selectedSection})</p>
                </div>
                <div className="table-responsive">
                  <table className="table w-full text-right border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="p-3 md:p-4 font-bold text-slate-900 border-b border-slate-100">اليوم</th>
                      <th className="p-3 md:p-4 font-bold text-slate-900 border-b border-slate-100 text-center">الحصة 1</th>
                      <th className="p-3 md:p-4 font-bold text-slate-900 border-b border-slate-100 text-center">الحصة 2</th>
                      <th className="p-3 md:p-4 font-bold text-slate-900 border-b border-slate-100 text-center">الحصة 3</th>
                      <th className="p-3 md:p-4 font-bold text-slate-900 border-b border-slate-100 text-center">الحصة 4</th>
                      <th className="p-3 md:p-4 font-bold text-slate-900 border-b border-slate-100 text-center">الحصة 5</th>
                      <th className="p-3 md:p-4 font-bold text-slate-900 border-b border-slate-100 text-center">الحصة 6</th>
                      <th className="p-3 md:p-4 font-bold text-slate-900 border-b border-slate-100 text-center">الحصة 7</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DAYS.map((day, idx) => {
                      const row = (schedule || []).find(s => s.day === day && s.grade === selectedGrade && s.section === selectedSection) || { day, p1: '-', p2: '-', p3: '-', p4: '-', p5: '-', p6: '-', p7: '-' };
                      return (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 md:p-4 font-bold text-emerald-600 border-b border-slate-100">{row.day}</td>
                          <td className="p-3 md:p-4 text-slate-600 border-b border-slate-100 text-center">{row.p1}</td>
                          <td className="p-3 md:p-4 text-slate-600 border-b border-slate-100 text-center">{row.p2}</td>
                          <td className="p-3 md:p-4 text-slate-600 border-b border-slate-100 text-center">{row.p3}</td>
                          <td className="p-3 md:p-4 text-slate-600 border-b border-slate-100 text-center">{row.p4}</td>
                          <td className="p-3 md:p-4 text-slate-600 border-b border-slate-100 text-center">{row.p5}</td>
                          <td className="p-3 md:p-4 text-slate-600 border-b border-slate-100 text-center">{row.p6}</td>
                          <td className="p-3 md:p-4 text-slate-600 border-b border-slate-100 text-center">{row.p7}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                </div>
                <div className="mt-6 text-center text-slate-400 text-xs">
                  تم استخراج هذا الجدول من الموقع الرسمي لمدرسة 22 مايو النموذجية
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'exams' && (
            <motion.div
              key="exams"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="flex justify-end">
                <button 
                  onClick={() => downloadPDF(examsRef, `جدول_الامتحانات_${selectedGrade}_${selectedSection}`)}
                  disabled={isDownloading}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50"
                >
                  <Download className="w-5 h-5" />
                  {isDownloading ? 'جاري التحميل...' : 'تحميل جدول الامتحانات (PDF)'}
                </button>
              </div>
              <div ref={examsRef} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4">
                <div className="mb-6 text-center border-b border-slate-100 pb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">جدول الامتحانات المدرسية</h3>
                  <p className="text-emerald-600 font-bold">{selectedGrade} - الشعبة ({selectedSection})</p>
                </div>
                <div className="space-y-10">
                  {EXAM_TYPES.map((type) => {
                    const filteredExams = (examSchedule || []).filter(exam => 
                      exam.grade === selectedGrade && 
                      exam.section === selectedSection && 
                      exam.type === type.id
                    );

                    if (filteredExams.length === 0) return null;

                    return (
                      <div key={type.id} className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="h-6 w-1 bg-emerald-600 rounded-full"></div>
                          <h3 className="text-xl font-bold text-slate-900">{type.name}</h3>
                        </div>
                        <div className="table-responsive border border-slate-50 rounded-2xl">
                          <table className="table w-full text-right border-collapse min-w-[800px]">
                            <thead>
                              <tr className="bg-slate-50">
                                <th className="p-3 md:p-4 font-bold text-slate-900 border-b border-slate-100">اليوم</th>
                                <th className="p-3 md:p-4 font-bold text-slate-900 border-b border-slate-100">اسم المادة</th>
                                <th className="p-3 md:p-4 font-bold text-slate-900 border-b border-slate-100">وقت الاختبار</th>
                                <th className="p-3 md:p-4 font-bold text-slate-900 border-b border-slate-100">التاريخ</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredExams.map((exam, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                  <td className="p-3 md:p-4 font-bold text-slate-900 border-b border-slate-100">{exam.day}</td>
                                  <td className="p-3 md:p-4 font-bold text-emerald-600 border-b border-slate-100">{exam.subject}</td>
                                  <td className="p-3 md:p-4 text-slate-600 border-b border-slate-100">{exam.time}</td>
                                  <td className="p-3 md:p-4 text-slate-600 border-b border-slate-100">{exam.date}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {(examSchedule || []).filter(exam => exam.grade === selectedGrade && exam.section === selectedSection).length === 0 && (
                  <div className="p-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-slate-400">لا توجد امتحانات مجدولة لهذا الصف والشعبة حالياً</p>
                  </div>
                )}
                <div className="mt-8 text-center text-slate-400 text-xs">
                  تم استخراج هذا الجدول من الموقع الرسمي لمدرسة 22 مايو النموذجية
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AcademicSchedule;
