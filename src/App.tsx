/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  School, 
  BookOpen, 
  Users, 
  Award, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronLeft, 
  ChevronDown,
  Menu, 
  X,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Home,
  Info,
  Trophy,
  LayoutGrid,
  MessageSquare,
  Search,
  ClipboardList,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const ElegantDropdown = ({ label, options, value, onChange, widthClass = "md:w-64" }: { label: string, options: string[], value: string, onChange: (v: string) => void, widthClass?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex flex-col gap-2 w-full ${widthClass} relative`}>
      <span className="text-xs font-bold text-slate-400 mr-2 uppercase tracking-widest">{label}</span>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3.5 font-bold text-slate-700 hover:bg-slate-100 transition-all"
      >
        <span>{value}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-30 overflow-hidden p-2"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-right px-4 py-3 rounded-xl font-bold transition-all ${value === opt ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = ({ setView, currentView }: { setView: (v: string) => void, currentView: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', id: 'home', icon: Home },
    { name: 'التقويم والجدول', id: 'schedule', icon: Calendar },
    { name: 'أرقام الجلوس', id: 'seating', icon: ClipboardList },
    { name: 'بوابة الأهالي', id: 'parent-portal', icon: UserCheck },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || currentView !== 'home' ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`} dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <div className="bg-emerald-600 p-2 rounded-lg">
              <School className="text-white w-6 h-6" />
            </div>
            <span className={`text-xl font-bold ${isScrolled || currentView !== 'home' ? 'text-slate-900' : 'text-white'}`}>مدرسة 22 مايو</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => setView(link.id)}
                className={`font-medium transition-colors hover:text-emerald-500 flex items-center gap-1.5 text-sm lg:text-base ${currentView === link.id ? 'text-emerald-600' : (isScrolled || currentView !== 'home' ? 'text-slate-600' : 'text-white')}`}
              >
                <link.icon className="w-4 h-4 opacity-70" />
                {link.name}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={isScrolled || currentView !== 'home' ? 'text-slate-900' : 'text-white'}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl py-4"
          >
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => { setView(link.id); setIsOpen(false); }}
                className={`flex items-center gap-3 w-full text-right px-8 py-3 hover:bg-emerald-50 font-medium transition-colors ${currentView === link.id ? 'text-emerald-600 bg-emerald-50' : 'text-slate-700'}`}
              >
                <link.icon className="w-5 h-5 text-emerald-500" />
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

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
  }, []);

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
          />
          <div className="absolute inset-0 bg-gradient-to-l from-slate-900/90 via-slate-900/60 to-slate-900/40"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-emerald-600/30 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-bold mb-6 backdrop-blur-md border border-emerald-500/30">
              {slides[currentSlide].tag}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {slides[currentSlide].title.split(' ').map((word, i) => (
                word === '22' || word === 'مايو' ? <span key={i} className="text-emerald-500"> {word} </span> : <span key={i}>{word} </span>
              ))}
            </h1>
            <p className="text-xl text-slate-200 mb-10 max-w-2xl leading-relaxed">
              {slides[currentSlide].desc}
            </p>
            <div className="flex flex-wrap gap-4 justify-start">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2 group">
                سجل طفلك الآن
                <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all">
                مشاهدة الإنجازات
              </button>
            </div>
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

const StudentCard = ({ student, idx }: { student: any, idx: number, key?: string }) => {
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
              student.rank === 1 ? 'bg-yellow-400 text-white' : 
              student.rank === 2 ? 'bg-slate-300 text-slate-700' : 'bg-orange-300 text-orange-900'
            }`}
          >
            {student.rank}
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
                  {student.achievements.map((achievement: string, i: number) => (
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

const TopStudents = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedGrade, setSelectedGrade] = useState('الصف السادس');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const students = [
    // 2024 - Grade 6
    { 
      name: 'أحمد محمد علي', 
      grade: 'الصف السادس', 
      year: '2024', 
      rank: 1, 
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200', 
      score: '99.8%',
      achievements: ['المركز الأول في أولمبياد الرياضيات', 'جائزة الطالب المثالي', 'قائد فريق الإذاعة المدرسية']
    },
    { 
      name: 'سارة خالد حسن', 
      grade: 'الصف السادس', 
      year: '2024', 
      rank: 2, 
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200', 
      score: '99.5%',
      achievements: ['جائزة أفضل قصة قصيرة', 'المركز الثاني في مسابقة الرسم', 'عضو متميز في نادي القراءة']
    },
    { 
      name: 'عمر ياسين', 
      grade: 'الصف السادس', 
      year: '2024', 
      rank: 3, 
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', 
      score: '99.2%',
      achievements: ['بطل المدرسة في الشطرنج', 'جائزة الابتكار العلمي', 'متطوع في الهلال الأحمر الطلابي']
    },
    { 
      name: 'ليان العتيبي', 
      grade: 'الصف السادس', 
      year: '2024', 
      rank: 4, 
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200', 
      score: '98.9%',
      achievements: ['المركز الأول في مسابقة الإلقاء', 'عضو في نادي العلوم']
    },
    { 
      name: 'خالد منصور', 
      grade: 'الصف السادس', 
      year: '2024', 
      rank: 5, 
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', 
      score: '98.7%',
      achievements: ['جائزة الطالب الخلوق', 'مشارك في فريق كرة القدم']
    },
    
    // 2024 - Grade 5
    { 
      name: 'يوسف إبراهيم', 
      grade: 'الصف الخامس', 
      year: '2024', 
      rank: 1, 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', 
      score: '99.7%',
      achievements: ['المركز الأول في حفظ القرآن', 'جائزة الخط العربي', 'عضو فريق كرة القدم']
    },
    { 
      name: 'مريم عبدالله', 
      grade: 'الصف الخامس', 
      year: '2024', 
      rank: 2, 
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', 
      score: '99.4%',
      achievements: ['جائزة التميز في اللغة الإنجليزية', 'المركز الأول في مسابقة الإلقاء', 'مساهمة في مجلة المدرسة']
    },

    // 2023 - Grade 6
    { 
      name: 'ليلى محمود', 
      grade: 'الصف السادس', 
      year: '2023', 
      rank: 1, 
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200', 
      score: '99.9%',
      achievements: ['جائزة التفوق الدراسي الشامل', 'المركز الأول في تحدي القراءة العربي', 'رئيسة مجلس الطلاب']
    },
    { 
      name: 'فهد العتيبي', 
      grade: 'الصف السادس', 
      year: '2023', 
      rank: 2, 
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', 
      score: '99.6%',
      achievements: ['بطل المنطقة في السباحة', 'جائزة الطالب المبتكر', 'عضو فريق الروبوت']
    },
  ];

  const filteredStudents = students.filter(s => 
    s.year === selectedYear && 
    s.grade === selectedGrade &&
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedStudents = showAll ? filteredStudents : filteredStudents.slice(0, 3);

  return (
    <section id="top-students" className="py-24 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">لوحة الشرف</h2>
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

          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <ElegantDropdown 
              label="العام الدراسي"
              options={['2024', '2023', '2022']}
              value={selectedYear}
              onChange={(val) => { setSelectedYear(val); setShowAll(false); }}
            />
            <ElegantDropdown 
              label="المرحلة الدراسية"
              options={['الصف الخامس', 'الصف السادس', 'الصف السابع']}
              value={selectedGrade}
              onChange={(val) => { setSelectedGrade(val); setShowAll(false); }}
            />
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="wait">
            {displayedStudents.length > 0 ? (
              displayedStudents.map((student, idx) => (
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

const AcademicSchedule = () => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [selectedGrade, setSelectedGrade] = useState('الصف السادس الابتدائي');

  const grades = [
    'الصف الأول الابتدائي',
    'الصف الثاني الابتدائي',
    'الصف الثالث الابتدائي',
    'الصف الرابع الابتدائي',
    'الصف الخامس الابتدائي',
    'الصف السادس الابتدائي'
  ];

  const events = [
    { date: '15 مارس', title: 'بداية اختبارات منتصف الفصل', type: 'academic' },
    { date: '22 مارس', title: 'يوم النشاط الطلابي المفتوح', type: 'activity' },
    { date: '1 أبريل', title: 'إجازة عيد الفطر المبارك', type: 'holiday' },
    { date: '10 أبريل', title: 'عودة الدراسة بعد الإجازة', type: 'academic' },
  ];

  const schedule = [
    { time: '08:00 - 08:45', sun: 'رياضيات', mon: 'علوم', tue: 'لغة عربية', wed: 'إنجليزي', thu: 'تربية إسلامية' },
    { time: '08:45 - 09:30', sun: 'لغة عربية', mon: 'رياضيات', tue: 'إنجليزي', wed: 'علوم', thu: 'اجتماعيات' },
    { time: '09:30 - 10:00', sun: 'فـسـحـة', mon: 'فـسـحـة', tue: 'فـسـحـة', wed: 'فـسـحـة', thu: 'فـسـحـة' },
    { time: '10:00 - 10:45', sun: 'علوم', mon: 'إنجليزي', tue: 'رياضيات', wed: 'لغة عربية', thu: 'حاسب آلي' },
  ];

  return (
    <section id="schedule" className="py-24 bg-slate-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="text-right">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">التقويم والجدول</h2>
            <p className="text-slate-500">ابقَ على اطلاع بمواعيد الحصص والفعاليات المدرسية</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            {activeTab === 'schedule' && (
              <ElegantDropdown 
                label="اختر الصف"
                options={grades}
                value={selectedGrade}
                onChange={(val) => setSelectedGrade(val)}
                widthClass="md:w-72"
              />
            )}
            
            <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 h-fit self-end">
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'calendar' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <Calendar className="w-5 h-5" />
                التقويم الدراسي
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'schedule' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <Clock className="w-5 h-5" />
                جدول الحصص
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'calendar' ? (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="space-y-4">
                {events.map((event, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 hover:border-emerald-200 transition-all">
                    <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl text-center min-w-[100px]">
                      <div className="text-sm font-bold opacity-70">2026</div>
                      <div className="text-lg font-black">{event.date}</div>
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
          ) : (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-slate-100"
            >
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="p-6 font-bold text-slate-900 border-b border-slate-100">الوقت</th>
                    <th className="p-6 font-bold text-slate-900 border-b border-slate-100">الأحد</th>
                    <th className="p-6 font-bold text-slate-900 border-b border-slate-100">الاثنين</th>
                    <th className="p-6 font-bold text-slate-900 border-b border-slate-100">الثلاثاء</th>
                    <th className="p-6 font-bold text-slate-900 border-b border-slate-100">الأربعاء</th>
                    <th className="p-6 font-bold text-slate-900 border-b border-slate-100">الخميس</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-6 font-bold text-emerald-600 border-b border-slate-100">{row.time}</td>
                      <td className="p-6 text-slate-600 border-b border-slate-100">{row.sun}</td>
                      <td className="p-6 text-slate-600 border-b border-slate-100">{row.mon}</td>
                      <td className="p-6 text-slate-600 border-b border-slate-100">{row.tue}</td>
                      <td className="p-6 text-slate-600 border-b border-slate-100">{row.wed}</td>
                      <td className="p-6 text-slate-600 border-b border-slate-100">{row.thu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-6 bg-slate-50 text-center">
                <p className="text-slate-500 text-sm">ملاحظة: هذا الجدول خاص بـ {selectedGrade} - الشعبة (أ)</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const BlogSection = () => {
  const posts = [
    {
      id: 1,
      title: "تتويج فريق المدرسة ببطولة الروبوت الإقليمية",
      excerpt: "حقق طلابنا المركز الأول في مسابقة الروبوت والذكاء الاصطناعي التي أقيمت على مستوى المنطقة...",
      date: "12 مارس 2026",
      category: "إنجازات",
      image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "ندوة حول أهمية القراءة في العصر الرقمي",
      excerpt: "استضافت المدرسة نخبة من الكتاب والمثقفين في ندوة حوارية تهدف إلى تعزيز حب القراءة لدى الطلاب...",
      date: "10 مارس 2026",
      category: "فعاليات",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "تحديثات في المختبرات العلمية والتقنية",
      excerpt: "تم تزويد مختبرات العلوم بأجهزة حديثة وتقنيات واقع معزز لتسهيل فهم المفاهيم العلمية المعقدة...",
      date: "05 مارس 2026",
      category: "تطوير",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="blog" className="py-24 bg-slate-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-right">
            <h2 className="text-emerald-600 font-bold text-sm uppercase tracking-wider mb-2">أخبارنا ومدونتنا</h2>
            <h3 className="text-4xl font-bold text-slate-900">آخر المستجدات والفعاليات</h3>
          </div>
          <button className="text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            عرض كافة الأخبار
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-slate-100"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-emerald-600 transition-colors">
                  {post.title}
                </h4>
                <p className="text-slate-500 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <button className="text-slate-900 font-bold flex items-center gap-2 group/btn">
                  اقرأ المزيد
                  <ArrowRight className="w-4 h-4 rotate-180 group-hover/btn:-translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

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

const SeatingNumbers = () => {
  const [selectedGrade, setSelectedGrade] = useState('الصف السادس');
  const [selectedSection, setSelectedSection] = useState('أ');

  const seatingData = [
    { id: '101', name: 'أحمد محمد علي', grade: 'الصف السادس', section: 'أ', seatNumber: '601' },
    { id: '102', name: 'سارة خالد حسن', grade: 'الصف السادس', section: 'أ', seatNumber: '602' },
    { id: '103', name: 'عمر ياسين', grade: 'الصف السادس', section: 'أ', seatNumber: '603' },
    { id: '104', name: 'ياسر عمار', grade: 'الصف السادس', section: 'ب', seatNumber: '621' },
    { id: '105', name: 'نورة السبيعي', grade: 'الصف السادس', section: 'ب', seatNumber: '622' },
    { id: '106', name: 'يوسف إبراهيم', grade: 'الصف الخامس', section: 'أ', seatNumber: '501' },
    { id: '107', name: 'مريم عبدالله', grade: 'الصف الخامس', section: 'أ', seatNumber: '502' },
  ];

  const filteredData = seatingData.filter(s => s.grade === selectedGrade && s.section === selectedSection);

  return (
    <section id="seating" className="py-24 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">أرقام الجلوس</h2>
          <p className="text-slate-500 text-lg">يمكنكم الاطلاع على أرقام الجلوس الخاصة بالطلاب حسب الصف والشعبة</p>
          <div className="w-24 h-1.5 bg-emerald-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
          <ElegantDropdown 
            label="الصف الدراسي"
            options={['الصف الخامس', 'الصف السادس', 'الصف السابع']}
            value={selectedGrade}
            onChange={(val) => setSelectedGrade(val)}
            widthClass="md:w-64"
          />
          <ElegantDropdown 
            label="الشعبة"
            options={['أ', 'ب', 'ج']}
            value={selectedSection}
            onChange={(val) => setSelectedSection(val)}
            widthClass="md:w-48"
          />
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-6 font-bold text-slate-900 border-b border-slate-100">اسم الطالب</th>
                <th className="p-6 font-bold text-slate-900 border-b border-slate-100 text-center">رقم الجلوس</th>
                <th className="p-6 font-bold text-slate-900 border-b border-slate-100 text-center">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((student, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-medium text-slate-700 border-b border-slate-100">{student.name}</td>
                    <td className="p-6 font-black text-emerald-600 border-b border-slate-100 text-center text-xl">{student.seatNumber}</td>
                    <td className="p-6 border-b border-slate-100 text-center">
                      <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">مؤكد</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-20 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-4">
                      <Users className="w-12 h-12 opacity-20" />
                      <p>لا توجد بيانات لهذه الشعبة حالياً</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const ParentPortal = () => {
  const [studentId, setStudentId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const mockData: any = {
    '12345': {
      name: 'أحمد محمد علي',
      grade: 'الصف السادس',
      attendance: '98%',
      behavior: 'ممتاز',
      results: [
        { subject: 'الرياضيات', score: 98, total: 100, trend: [85, 88, 92, 98] },
        { subject: 'اللغة العربية', score: 95, total: 100, trend: [90, 92, 94, 95] },
        { subject: 'العلوم', score: 99, total: 100, trend: [88, 94, 96, 99] },
        { subject: 'اللغة الإنجليزية', score: 92, total: 100, trend: [80, 85, 88, 92] },
      ],
      overallTrend: [
        { month: 'أكتوبر', score: 86 },
        { month: 'نوفمبر', score: 89 },
        { month: 'ديسمبر', score: 93 },
        { month: 'يناير', score: 96 },
      ],
      feedback: [
        { teacher: 'أ. محمد (الرياضيات)', comment: 'أحمد طالب متميز جداً، لديه قدرة استثنائية على حل المسائل المعقدة بسرعة.' },
        { teacher: 'أ. سارة (اللغة العربية)', comment: 'تحسن ملحوظ في مهارات الكتابة الإبداعية، يحتاج فقط للتركيز أكثر على قواعد النحو.' },
        { teacher: 'أ. خالد (العلوم)', comment: 'مشارك فعال في التجارب المخبرية، يظهر شغفاً كبيراً بالاكتشاف.' }
      ]
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!studentId) {
      setError('يرجى إدخال رقم الطالب.');
      return;
    }

    if (mockData[studentId]) {
      setResult(mockData[studentId]);
    } else {
      setResult(null);
      setError('عذراً، لم يتم العثور على طالب بهذا الرقم. يرجى التأكد من الرقم والمحاولة مرة أخرى.');
    }
  };

  return (
    <section id="parent-portal" className="py-32 bg-slate-900 text-white min-h-screen relative overflow-hidden" dir="rtl">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">بوابة أولياء الأمور</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">أدخل رقم الطالب الخاص لمتابعة المستوى الدراسي ونتائج الامتحانات</p>
        </div>

        <div className="max-w-xl mx-auto mb-16">
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <div className="space-y-4 mb-10">
              <label className="text-sm font-bold text-slate-300 block text-center">رقم الطالب الخاص (Student ID)</label>
              <input 
                type="text" 
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
              className="grid lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-emerald-600 p-3 rounded-2xl">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{result.name}</h3>
                      <p className="text-slate-400 text-sm">{result.grade}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                      <span className="text-slate-400">نسبة الحضور</span>
                      <span className="text-emerald-400 font-bold">{result.attendance}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                      <span className="text-slate-400">السلوك</span>
                      <span className="text-emerald-400 font-bold">{result.behavior}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-8">
                {/* Results Grid */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <Award className="text-emerald-500" />
                    نتائج الاختبارات الفصلية
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {result.results.map((item: any, idx: number) => (
                      <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-bold text-lg">{item.subject}</span>
                          <span className="text-emerald-500 font-black text-xl">{item.score} / {item.total}</span>
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-4">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.score / item.total) * 100}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className="bg-emerald-500 h-full rounded-full"
                          ></motion.div>
                        </div>
                        {/* Mini Trend Sparkline */}
                        <div className="h-10 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={item.trend.map((val: number, i: number) => ({ val, i }))}>
                              <Line type="monotone" dataKey="val" stroke="#10b981" strokeWidth={2} dot={false} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 text-center">اتجاه الأداء في آخر 4 اختبارات</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Trend Chart */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <Trophy className="text-emerald-500" />
                    منحنى التطور العام
                  </h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.overallTrend}>
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                          itemStyle={{ color: '#10b981' }}
                        />
                        <Area type="monotone" dataKey="score" stroke="#10b981" fillOpacity={1} fill="url(#colorScore)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Teacher Feedback */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <MessageSquare className="text-emerald-500" />
                    ملاحظات المعلمين
                  </h3>
                  <div className="space-y-6">
                    {result.feedback.map((f: any, idx: number) => (
                      <div key={idx} className="bg-white/5 p-6 rounded-2xl border-r-4 border-emerald-500">
                        <h4 className="font-bold text-emerald-400 mb-2">{f.teacher}</h4>
                        <p className="text-slate-300 leading-relaxed italic">"{f.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Registration = () => {
  const [selectedGrade, setSelectedGrade] = useState('الصف الأول الابتدائي');
  const grades = [
    'الصف الأول الابتدائي',
    'الصف الثاني الابتدائي',
    'الصف الثالث الابتدائي',
    'الصف الرابع الابتدائي',
    'الصف الخامس الابتدائي',
    'الصف السادس الابتدائي'
  ];

  return (
    <section id="registration" className="py-24 bg-emerald-600 relative overflow-hidden" dir="rtl">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-700 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden grid lg:grid-cols-5">
          <div className="lg:col-span-2 bg-slate-900 p-12 text-white flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6 leading-tight">انضم إلى عائلة <br /><span className="text-emerald-500">مدرسة 22 مايو</span></h2>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed">
              افتح آفاقاً جديدة لمستقبل طفلك. عملية التسجيل بسيطة وسهلة، وفريقنا جاهز لمساعدتك في كل خطوة.
            </p>
            <div className="space-y-6">
              {[
                { title: 'خطوة 1', desc: 'تعبئة نموذج طلب الالتحاق المبدئي' },
                { title: 'خطوة 2', desc: 'تحديد موعد للمقابلة واختبار القياس' },
                { title: 'خطوة 3', desc: 'استكمال الأوراق الرسمية والقبول النهائي' },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-500 flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">{step.title}</h4>
                    <p className="text-sm text-slate-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 p-12">
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">نموذج التسجيل المبدئي</h3>
              <p className="text-slate-500">يرجى تعبئة البيانات التالية وسنقوم بالتواصل معكم قريباً</p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 mr-2">اسم الطالب</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="الاسم ثلاثي" />
                </div>
                <div className="space-y-2">
                  <ElegantDropdown 
                    label="المرحلة الدراسية"
                    options={grades}
                    value={selectedGrade}
                    onChange={(val) => setSelectedGrade(val)}
                    widthClass="w-full"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 mr-2">اسم ولي الأمر</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="الاسم الكامل" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 mr-2">رقم التواصل</label>
                  <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="05xxxxxxxx" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 mr-2">ملاحظات إضافية</label>
                <textarea rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="أي معلومات تود إضافتها..."></textarea>
              </div>

              <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-3 group">
                إرسال طلب التسجيل
                <CheckCircle2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-slate-900 text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-emerald-500 font-bold mb-4">تواصل معنا</h2>
            <h3 className="text-4xl font-bold mb-8">نحن هنا للإجابة على استفساراتكم</h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <MapPin className="text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">العنوان</h4>
                  <p className="text-slate-400">حي النرجس، الرياض، المملكة العربية السعودية</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Phone className="text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">الهاتف</h4>
                  <p className="text-slate-400" dir="ltr">+966 11 123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Mail className="text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">البريد الإلكتروني</h4>
                  <p className="text-slate-400">info@excellence-school.edu.sa</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 font-medium mb-2">الاسم الكامل</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="أدخل اسمك" />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-2">رقم الجوال</label>
                  <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="05xxxxxxxx" />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-2">البريد الإلكتروني</label>
                <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="example@mail.com" />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-2">الرسالة</label>
                <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="كيف يمكننا مساعدتك؟"></textarea>
              </div>
              <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-12 border-t border-white/5" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <School className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold">مدرسة 22 مايو</span>
        </div>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto">
          نحن نلتزم بتقديم تعليم عالي الجودة ينمي مهارات التفكير النقدي والإبداعي لدى طلابنا.
        </p>
        <div className="flex justify-center gap-6 mb-8">
          {['Twitter', 'Instagram', 'Facebook', 'LinkedIn'].map((social) => (
            <a key={social} href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
              {social}
            </a>
          ))}
        </div>
        <div className="text-slate-600 text-sm">
          © {new Date().getFullYear()} مدرسة 22 مايو النموذجية. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [view, setView] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar setView={setView} currentView={view} />
      <main>
        {view === 'home' && (
          <>
            <Hero />
            <AboutSection />
            <TopStudents />
            <BlogSection />
            <VisionMission />
            <Services />
            <Contact />
          </>
        )}
        {view === 'schedule' && <AcademicSchedule />}
        {view === 'seating' && <SeatingNumbers />}
        {view === 'parent-portal' && <ParentPortal />}
      </main>
      <Footer />
    </div>
  );
}
