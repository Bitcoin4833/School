import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ChevronLeft } from 'lucide-react';

interface StudentCardProps {
  student: any;
  idx: number;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, idx }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: idx * 0.1 }}
      className="relative bg-white rounded-[2.5rem] p-8 text-center border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden"
    >
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[5rem] -z-0 transition-transform group-hover:scale-110"></div>
      
      <div className="relative z-10">
        <div className="relative inline-block mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-8 border-white shadow-xl mx-auto ring-1 ring-slate-100">
            <img 
              src={student.image} 
              alt={student.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shadow-lg border-4 border-white ${
              (idx + 1) === 1 ? 'bg-yellow-400 text-white' : 
              (idx + 1) === 2 ? 'bg-slate-300 text-slate-700' : 'bg-orange-300 text-orange-900'
            }`}
          >
            {idx + 1}
          </motion.div>
        </div>

        <h4 className="text-xl font-bold text-slate-900 mb-2">{student.name}</h4>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
            {student.grade}
          </span>
          <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">
            دفعة {student.year}
          </span>
        </div>

        {/* Achievements Section */}
        <div className="mb-6">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-emerald-600 text-xs font-bold flex items-center gap-1 mx-auto hover:text-emerald-700 transition-colors"
          >
            {isExpanded ? 'إخفاء الإنجازات' : 'عرض الإنجازات والأوسمة'}
            <ChevronLeft className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : '-rotate-90'}`} />
          </button>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-3"
              >
                <div className="bg-slate-50 rounded-2xl p-4 space-y-2">
                  {(student.achievements || []).map((achievement: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-right">
                      <Award className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      <span className="text-xs text-slate-600 font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase">المعدل</div>
            <div className="text-lg font-black text-emerald-600">{student.score}</div>
          </div>
          <div className="bg-emerald-600 p-2 rounded-xl text-white">
            <Award className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentCard;
