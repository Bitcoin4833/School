import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Users, Hash, User, School } from 'lucide-react';
import ElegantDropdown from './ui/ElegantDropdown';

interface SeatingNumbersProps {
  seatingData: any[];
  grades: string[];
  sections: string[];
}

const SeatingNumbers: React.FC<SeatingNumbersProps> = ({ seatingData, grades, sections }) => {
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = (seatingData || []).filter(item => 
    item.grade === selectedGrade && 
    item.section === selectedSection &&
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="seating" className="py-24 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">أرقام الجلوس</h2>
            <p className="text-slate-500 text-lg">يمكنكم البحث عن أرقام جلوس الطلاب للامتحانات القادمة</p>
            <div className="w-24 h-1.5 bg-emerald-600 mx-auto mt-6 rounded-full"></div>
          </motion.div>
        </div>

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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-b border-slate-100">
            <div className="p-6 bg-slate-50 border-l border-slate-100 flex items-center gap-3">
              <User className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-slate-900">اسم الطالب</span>
            </div>
            <div className="p-6 bg-slate-50 border-l border-slate-100 flex items-center gap-3">
              <Hash className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-slate-900">رقم الجلوس</span>
            </div>
            <div className="p-6 bg-slate-50 flex items-center gap-3">
              <School className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-slate-900">القاعة</span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            <AnimatePresence mode="popLayout">
              {filteredData.length > 0 ? (
                filteredData.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 hover:bg-slate-50 transition-colors"
                  >
                    <div className="p-6 border-l border-slate-100 font-bold text-slate-900">{item.name}</div>
                    <div className="p-6 border-l border-slate-100 font-black text-emerald-600 text-xl">{item.seatingNumber}</div>
                    <div className="p-6 text-slate-600">{item.room}</div>
                  </motion.div>
                ))
              ) : (
                <div className="p-20 text-center">
                  <div className="bg-slate-50 p-10 rounded-full mb-6 inline-block">
                    <Users className="w-16 h-16 text-slate-200" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">لا توجد نتائج</h3>
                  <p className="text-slate-400">لم نجد بيانات مطابقة لبحثك في هذا الصف والشعبة.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeatingNumbers;
