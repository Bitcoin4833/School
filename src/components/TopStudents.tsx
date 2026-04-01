import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, LayoutGrid, Users } from 'lucide-react';
import StudentCard from './StudentCard';
import ElegantDropdown from './ui/ElegantDropdown';

interface TopStudentsProps {
  students: any[];
  academicYears: string[];
  grades: string[];
  sections: string[];
}

const TopStudents: React.FC<TopStudentsProps> = ({ students, academicYears, grades, sections }) => {
  const [selectedYear, setSelectedYear] = useState(academicYears[0]);
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    if (gridRef.current && typeof window !== 'undefined') {
      const yOffset = -120; 
      const element = gridRef.current;
      const y = element.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0) + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [showAll, selectedYear, selectedGrade, selectedSection]);

  const filteredStudents = (students || []).filter(s => 
    s.year === selectedYear && 
    s.grade === selectedGrade &&
    (!selectedSection || s.section === selectedSection) &&
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a: any, b: any) => {
    const scoreA = parseFloat(a.score) || 0;
    const scoreB = parseFloat(b.score) || 0;
    if (scoreB !== scoreA) {
      return scoreB - scoreA;
    }
    return a.name.localeCompare(b.name, 'ar');
  });

  const displayedStudents = showAll ? sortedStudents : sortedStudents.slice(0, 3);

  return (
    <section id="top-students" className="py-24 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">لوحة الأوائل</h2>
            <p className="text-slate-500 text-lg">نحتفي بطلابنا المتميزين الذين حققوا أعلى الدرجات ورفعوا اسم مدرستنا عالياً</p>
            <div className="w-24 h-1.5 bg-emerald-600 mx-auto mt-6 rounded-full"></div>
          </motion.div>
        </div>

        {/* Search and Filters UI */}
        <div className="flex flex-col gap-8 mb-16">
          <div className="max-w-md mx-auto w-full relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="ابحث عن اسم الطالب..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pr-12 pl-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-700"
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <ElegantDropdown 
              label="العام الدراسي"
              options={academicYears}
              value={selectedYear}
              onChange={(val) => { setSelectedYear(val); setShowAll(false); }}
              widthClass="w-full"
            />
            <ElegantDropdown 
              label="المرحلة الدراسية"
              options={grades}
              value={selectedGrade}
              onChange={(val) => { setSelectedGrade(val); setShowAll(false); }}
              widthClass="w-full"
            />
            <ElegantDropdown 
              label="الشعبة"
              options={sections}
              value={selectedSection}
              onChange={(val) => { setSelectedSection(val); setShowAll(false); }}
              widthClass="w-full"
            />
          </div>
        </div>

        {/* Students Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="wait">
            {(displayedStudents || []).length > 0 ? (
              (displayedStudents || []).map((student, idx) => (
                <StudentCard key={`${student.name}-${student.year}`} student={student} idx={idx} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 flex flex-col items-center justify-center text-center"
              >
                <div className="bg-slate-50 p-10 rounded-full mb-6">
                  <Users className="w-16 h-16 text-slate-200" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">لا توجد نتائج</h3>
                <p className="text-slate-400 max-w-sm">
                  عذراً، لم نجد طلاباً يطابقون بحثك في <span className="text-emerald-600 font-bold">{selectedGrade}</span> لعام <span className="text-emerald-600 font-bold">{selectedYear}</span>.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        {!showAll && filteredStudents.length > 3 && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => setShowAll(true)}
              className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-2 mx-auto"
            >
              عرض جميع المتفوقين ({filteredStudents.length})
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopStudents;
