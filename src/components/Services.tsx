import React from 'react';
import { motion } from 'motion/react';
import { School, BookOpen, Award, Clock } from 'lucide-react';

const Services = () => {
  const services = [
    { title: 'المختبرات العلمية', desc: 'مختبرات مجهزة بأحدث التقنيات لإجراء التجارب العلمية.', icon: School },
    { title: 'المكتبة الرقمية', desc: 'آلاف الكتب والمصادر الرقمية المتاحة للطلاب والباحثين.', icon: BookOpen },
    { title: 'الأنشطة الرياضية', desc: 'ملاعب وصالات رياضية لممارسة مختلف أنواع الرياضات.', icon: Award },
    { title: 'النقل المدرسي', desc: 'أسطول حافلات حديث وآمن يغطي كافة المناطق المحيطة.', icon: Clock },
  ];

  return (
    <section id="services" className="py-24 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="text-right">
            <h2 className="text-emerald-600 font-bold text-sm uppercase tracking-wider mb-2">خدماتنا</h2>
            <h3 className="text-4xl font-bold text-slate-900">مرافق تعليمية متطورة</h3>
          </div>
          <p className="text-slate-500 max-w-md text-right">
            نحن نستثمر في البنية التحتية لنضمن لطلابنا الحصول على أفضل تجربة تعليمية ممكنة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-3xl bg-slate-50 hover:bg-emerald-600 transition-all duration-500 cursor-pointer"
            >
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <service.icon className="text-emerald-600 w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-white transition-colors">{service.title}</h4>
              <p className="text-slate-500 group-hover:text-emerald-50/80 transition-colors leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
