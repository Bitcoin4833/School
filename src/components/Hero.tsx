import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Users, Award, Calendar, BookOpen } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1523050335392-9ae867749296?auto=format&fit=crop&q=80&w=2000",
      tag: "مرحباً بكم في صرح العلم والمعرفة",
      title: "مدرسة 22 مايو النموذجية",
      desc: "نحن نؤمن بأن كل طفل لديه القدرة على الإبداع. نوفر بيئة تعليمية محفزة تجمع بين الأصالة والابتكار لبناء جيل يقود المستقبل."
    },
    {
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=2000",
      tag: "إنجازاتنا الأكاديمية",
      title: "المركز الأول في التميز التعليمي",
      desc: "فخورون بحصول مدرستنا على جائزة التميز التعليمي لهذا العام، تقديراً لجهود كادرنا وطلابنا المتفوقين."
    },
    {
      image: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&q=80&w=2000",
      tag: "الأنشطة المدرسية",
      title: "بيئة تعليمية حيوية ومبدعة",
      desc: "نقدم أكثر من 40 نشاطاً لاصفياً لتنمية مواهب الطلاب في الرياضة، الفنون، والبرمجة والابتكار التقني."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" dir="rtl">
      {/* Slideshow Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={slides[currentSlide].image} 
            alt="School Event" 
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
            loading={currentSlide === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-slate-900/90 via-slate-900/60 to-slate-900/40"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                }
              },
              exit: { 
                opacity: 0,
                x: -20,
                transition: { duration: 0.5 }
              }
            }}
          >
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="inline-block bg-emerald-600/30 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-bold mb-6 backdrop-blur-md border border-emerald-500/30"
            >
              {slides[currentSlide].tag}
            </motion.span>
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {slides[currentSlide].title.split(' ').map((word, i) => (
                word === '22' || word === 'مايو' ? <span key={i} className="text-emerald-500"> {word} </span> : <span key={i}>{word} </span>
              ))}
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="text-xl text-slate-200 mb-10 max-w-2xl leading-relaxed"
            >
              {slides[currentSlide].desc}
            </motion.p>
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="flex flex-wrap gap-4 justify-start"
            >
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2 group">
                سجل طفلك الآن
                <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all">
                مشاهدة الإنجازات
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-32 right-1/2 translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-500 ${currentSlide === idx ? 'w-12 bg-emerald-500' : 'w-3 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>

      {/* Floating Stats Card */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 hidden md:block z-20"
      >
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 grid grid-cols-4 gap-8 border border-white/20">
          {[
            { label: 'طالب وطالبة', value: '+1200', icon: Users },
            { label: 'معلم متميز', value: '+85', icon: Award },
            { label: 'عام من الخبرة', value: '25', icon: Calendar },
            { label: 'نشاط لاصفي', value: '+40', icon: BookOpen },
          ].map((stat, idx) => (
            <div key={idx} className="text-center border-l last:border-l-0 border-slate-100">
              <div className="flex justify-center mb-2">
                <stat.icon className="text-emerald-600 w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
