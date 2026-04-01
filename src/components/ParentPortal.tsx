import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserCheck, ArrowRight, X, Users, Clock, Award, Calendar, Trophy, ChevronLeft } from 'lucide-react';

interface ParentPortalProps {
  studentId: string;
  setStudentId: (s: string) => void;
  result: any;
  setResult: (r: any) => void;
  parentPortalData: any;
  students: any[];
}

const ParentPortal: React.FC<ParentPortalProps> = ({ 
  studentId, 
  setStudentId, 
  result, 
  setResult,
  parentPortalData,
  students
}) => {
  const [error, setError] = useState('');
  const [expandedMonths, setExpandedMonths] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!studentId) {
      setError('يرجى إدخال رقم الطالب.');
      return;
    }

    const student = students.find((s: any) => s.id === studentId);
    const portalData = parentPortalData[studentId];
    
    if (portalData || student) {
      const mergedResult = {
        ...(portalData || {}),
        name: student?.name || portalData?.name,
        grade: student?.grade || portalData?.grade,
        exams: portalData?.exams || [],
        attendanceDetails: portalData?.attendanceDetails || []
      };

      setResult(mergedResult);
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('parentPortalStudentId', studentId);
        }
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
    } else {
      setResult(null);
      setError('عذراً، لم يتم العثور على طالب بهذا الرقم. يرجى التأكد من الرقم والمحاولة مرة أخرى.');
    }
  };

  const handleLogout = () => {
    setResult(null);
    setStudentId('');
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('parentPortalStudentId');
      }
    } catch (e) {
      console.warn('LocalStorage removal failed:', e);
    }
  };

  const getExamTotal = (exam: any) => (exam.results || []).reduce((acc: number, r: any) => acc + (r.score || 0), 0);
  
  const semester1Exams = result ? (result.exams || []).filter((e: any) => e.semester === 1) : [];
  const semester2Exams = result ? (result.exams || []).filter((e: any) => e.semester === 2) : [];

  const allExams = [...semester1Exams, ...semester2Exams];
  const totalPresent = allExams.reduce((acc, e) => acc + (Number(e.present) || 0), 0);
  const totalAbsent = allExams.reduce((acc, e) => acc + (Number(e.absent) || 0), 0);
  const totalDays = totalPresent + totalAbsent;
  const attendancePercentage = totalDays > 0 ? Math.round((totalPresent / totalDays) * 100) + '%' : (result?.attendance || '100%');

  const semester1MonthlyTotal = semester1Exams.filter((e: any) => e.type === 'monthly').reduce((acc, e) => acc + getExamTotal(e), 0);
  const semester1FinalExam = semester1Exams.find((e: any) => e.type === 'final');
  const semester1FinalScore = semester1FinalExam ? getExamTotal(semester1FinalExam) : 0;

  const semester2MonthlyTotal = semester2Exams.filter((e: any) => e.type === 'monthly').reduce((acc, e) => acc + getExamTotal(e), 0);
  const semester2FinalExam = semester2Exams.find((e: any) => e.type === 'final');
  const semester2FinalScore = semester2FinalExam ? getExamTotal(semester2FinalExam) : 0;

  const finalTotal = semester1MonthlyTotal + semester1FinalScore + semester2MonthlyTotal + semester2FinalScore;

  const hasSemester1Final = semester1Exams.some((e: any) => e.type === 'final');

  const toggleMonth = (key: string) => {
    setExpandedMonths(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  return (
    <section id="parent-portal" className="py-20 lg:py-32 bg-slate-900 text-white min-h-screen relative overflow-x-hidden" dir="rtl">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">بوابة أولياء الأمور</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">أدخل رقم الطالب الخاص لمتابعة المستوى الدراسي ونتائج الامتحانات</p>
        </div>

        <div className="max-w-xl mx-auto mb-16">
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl">
            <div className="space-y-4 mb-10">
              <label className="text-sm font-bold text-slate-300 block text-center">رقم الطالب الخاص (Student ID)</label>
              <input 
                type="number" 
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="أدخل الرقم (مثال: 12345)"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-center text-2xl font-bold tracking-widest"
              />
            </div>

            <button type="submit" className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 group">
              <UserCheck className="w-6 h-6" />
              عرض التقرير الدراسي
              <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-2 transition-transform" />
            </button>
            
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 mt-6 text-center font-medium bg-red-400/10 py-3 rounded-xl border border-red-400/20"
              >
                {error}
              </motion.p>
            )}
          </form>
        </div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full"
            >
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-8 relative overflow-hidden">
                  <button 
                    onClick={handleLogout}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-400 transition-colors p-2 bg-white/5 rounded-full z-20"
                    title="تسجيل الخروج"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex flex-col items-center text-center gap-4 mb-8 pt-4">
                    <div className="bg-emerald-600 p-4 rounded-3xl shadow-lg shadow-emerald-600/20">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{result.name}</h3>
                      <p className="text-emerald-500 font-bold text-sm bg-emerald-500/10 px-4 py-1 rounded-full inline-block">{result.grade}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-emerald-500" />
                        <span className="text-slate-400 text-sm">نسبة الحضور</span>
                      </div>
                      <span className="text-emerald-400 font-black">{attendancePercentage}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <Award className="w-4 h-4 text-emerald-500" />
                        <span className="text-slate-400 text-sm">السلوك العام</span>
                      </div>
                      <span className="text-emerald-400 font-black">{result.behavior}</span>
                    </div>
                  </div>
                </div>

                {/* Final Total Score - Only if both terms are available */}
                {hasSemester1Final && semester2Exams.some((e: any) => e.type === 'final') && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-gradient-to-br from-emerald-600 to-blue-600 rounded-[2rem] p-8 text-center shadow-2xl shadow-emerald-600/20 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <Trophy className="w-12 h-12 text-white/20 absolute bottom-4 left-4 rotate-12" />
                    
                    <span className="text-white/80 text-sm font-bold uppercase tracking-widest mb-3 block">المجموع النهائي العام</span>
                    <h3 className="text-6xl font-black text-white mb-2 drop-shadow-lg">
                      {finalTotal}
                    </h3>
                    <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold">
                      الدرجة الكلية المستحقة
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="lg:col-span-2 space-y-8">
                {/* Semester 1 Section */}
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-4 sm:p-6 relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">الفصل الدراسي الأول</h3>
                      <p className="text-slate-500 text-sm">نتائج الاختبارات الشهرية والحضور</p>
                    </div>
                  </div>

                  <div className="grid gap-4 mb-8">
                    {semester1Exams.map((exam: any) => {
                      const monthName = exam.month;
                      const examScore = getExamTotal(exam);
                      
                      if (exam.type === 'final') return null;

                      const key = `1-${monthName}`;
                      const isExpanded = expandedMonths.includes(key);

                      return (
                        <div key={exam.id} className="bg-white/5 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all overflow-hidden">
                          <div 
                            onClick={() => toggleMonth(key)}
                            className="flex flex-col sm:flex-row items-center justify-between p-5 gap-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-sm">
                                {monthName?.substring(0, 3)}
                              </div>
                              <div>
                                <span className="font-bold text-slate-200 block text-lg">{monthName}</span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider">التقييم الشهري</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">
                              <div className="text-center">
                                <span className="block text-[10px] text-slate-500 mb-1">المجموع</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-400 font-black text-2xl">{examScore}</span>
                                </div>
                              </div>
                              <div className="text-center">
                                <span className="block text-[10px] text-slate-500 mb-1">الحضور</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-white font-bold">{exam.present}</span>
                                  <span className="text-slate-600">/</span>
                                  <span className="text-slate-400 text-xs">{Number(exam.present) + Number(exam.absent)}</span>
                                </div>
                              </div>
                              <ChevronLeft className={`w-5 h-5 text-slate-600 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </div>
                          </div>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-6 bg-black/20">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {(exam.results || []).map((res: any, i: number) => (
                                      <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                                        <span className="text-slate-400 text-sm">{res.subject}</span>
                                        <div className="flex items-center gap-2">
                                          <span className="text-white font-bold">{res.score}</span>
                                          <span className="text-slate-600">/</span>
                                          <span className="text-slate-500 text-xs">{res.total}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  {semester1FinalExam && (
                    <div className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-[2rem] p-8 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                          <Trophy className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">نتيجة نهاية الفصل الأول</h4>
                          <p className="text-emerald-500/80 text-sm font-bold">الامتحان النهائي للفصل الدراسي الأول</p>
                        </div>
                      </div>
                      <div className="text-center sm:text-left">
                        <span className="block text-xs text-slate-400 mb-1 uppercase tracking-widest">المجموع الكلي</span>
                        <span className="text-5xl font-black text-white">{semester1FinalScore}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Semester 2 Section */}
                {semester2Exams.length > 0 && (
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-4 sm:p-6 relative overflow-hidden">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">الفصل الدراسي الثاني</h3>
                        <p className="text-slate-500 text-sm">نتائج الاختبارات الشهرية والحضور</p>
                      </div>
                    </div>

                    <div className="grid gap-4 mb-8">
                      {semester2Exams.map((exam: any) => {
                        const monthName = exam.month;
                        const examScore = getExamTotal(exam);
                        
                        if (exam.type === 'final') return null;

                        const key = `2-${monthName}`;
                        const isExpanded = expandedMonths.includes(key);

                        return (
                          <div key={exam.id} className="bg-white/5 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all overflow-hidden">
                            <div 
                              onClick={() => toggleMonth(key)}
                              className="flex flex-col sm:flex-row items-center justify-between p-5 gap-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors"
                            >
                              <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-sm">
                                  {monthName?.substring(0, 3)}
                                </div>
                                <div>
                                  <span className="font-bold text-slate-200 block text-lg">{monthName}</span>
                                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">التقييم الشهري</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">
                                <div className="text-center">
                                  <span className="block text-[10px] text-slate-500 mb-1">المجموع</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-blue-400 font-black text-2xl">{examScore}</span>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <span className="block text-[10px] text-slate-500 mb-1">الحضور</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-white font-bold">{exam.present}</span>
                                    <span className="text-slate-600">/</span>
                                    <span className="text-slate-400 text-xs">{Number(exam.present) + Number(exam.absent)}</span>
                                  </div>
                                </div>
                                <ChevronLeft className={`w-5 h-5 text-slate-600 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                              </div>
                            </div>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-6 bg-black/20">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      {(exam.results || []).map((res: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                                          <span className="text-slate-400 text-sm">{res.subject}</span>
                                          <div className="flex items-center gap-2">
                                            <span className="text-white font-bold">{res.score}</span>
                                            <span className="text-slate-600">/</span>
                                            <span className="text-slate-500 text-xs">{res.total}</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>

                    {semester2FinalExam && (
                      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[2rem] p-8 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Trophy className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white">نتيجة نهاية الفصل الثاني</h4>
                            <p className="text-blue-500/80 text-sm font-bold">الامتحان النهائي للفصل الدراسي الثاني</p>
                          </div>
                        </div>
                        <div className="text-center sm:text-left">
                          <span className="block text-xs text-slate-400 mb-1 uppercase tracking-widest">المجموع الكلي</span>
                          <span className="text-5xl font-black text-white">{semester2FinalScore}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ParentPortal;
