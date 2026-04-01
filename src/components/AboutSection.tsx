import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000" 
                alt="Students learning" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-8 rounded-3xl shadow-xl hidden lg:block">
              <div className="text-4xl font-bold mb-1">98%</div>
              <div className="text-sm opacity-90">نسبة نجاح الطلاب</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-4">من نحن</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              نصنع قادة المستقبل من خلال <br /> تعليم متميز وشامل
            </h3>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              تأسست مدرسة 22 مايو لتكون منارة للعلم في منطقتنا. نحن نجمع بين المناهج التعليمية القوية والأنشطة التي تنمي شخصية الطالب وتصقل مواهبه في مختلف المجالات.
            </p>
            <div className="space-y-4">
              {[
                'بيئة تعليمية آمنة ومحفزة',
                'كادر تعليمي ذو خبرة وكفاءة عالية',
                'مختبرات علمية وتقنية مجهزة بأحدث الوسائل',
                'تركيز على القيم والأخلاق الحميدة'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
