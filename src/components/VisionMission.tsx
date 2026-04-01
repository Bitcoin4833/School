import React from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen } from 'lucide-react';

const VisionMission = () => {
  return (
    <section id="vision" className="py-24 bg-slate-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">رؤيتنا ورسالتنا</h2>
          <div className="w-24 h-1.5 bg-emerald-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100"
          >
            <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Award className="text-emerald-600 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">رؤيتنا</h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              أن نكون المؤسسة التعليمية الرائدة في تقديم تعليم نوعي يواكب التطورات العالمية، ويحافظ على الهوية الوطنية والقيم الإسلامية، لنخرج أجيالاً مبدعة ومسؤولة.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100"
          >
            <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <BookOpen className="text-emerald-600 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">رسالتنا</h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              توفير بيئة تعليمية متكاملة تدعم التميز الأكاديمي والنمو الشخصي للطلاب، من خلال شراكة فاعلة مع الأسرة والمجتمع، واستخدام أفضل التقنيات التعليمية.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
