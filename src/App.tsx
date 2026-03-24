/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
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
  UserCheck,
  Settings,
  Plus,
  Trash2,
  Edit,
  Edit2,
  Save,
  LogOut,
  Lock,
  User,
  Download,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { domToPng } from 'modern-screenshot';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

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

const DAYS = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
const PERIODS = ['الحصة الأولى', 'الحصة الثانية', 'الحصة الثالثة', 'الحصة الرابعة', 'الحصة الخامسة', 'الحصة السادسة', 'الحصة السابعة'];
const INITIAL_SUBJECTS = ['رياضيات', 'علوم', 'لغة عربية', 'إنجليزي', 'تربية إسلامية', 'اجتماعيات', 'حاسب آلي', 'فنية', 'رياضة'];
const INITIAL_SOCIAL_LINKS = [
  { id: '1', name: 'Twitter', url: 'https://twitter.com' },
  { id: '2', name: 'Instagram', url: 'https://instagram.com' },
  { id: '3', name: 'Facebook', url: 'https://facebook.com' },
  { id: '4', name: 'LinkedIn', url: 'https://linkedin.com' }
];

const INITIAL_STUDENTS = [
  // 2024 - Grade 6
  { 
    id: '1',
    name: 'أحمد محمد علي', 
    grade: 'الصف السادس', 
    year: '2024', 
    rank: 1, 
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200', 
    score: '99.8%',
    achievements: ['المركز الأول في أولمبياد الرياضيات', 'جائزة الطالب المثالي', 'قائد فريق الإذاعة المدرسية']
  },
  { 
    id: '2',
    name: 'سارة خالد حسن', 
    grade: 'الصف السادس', 
    year: '2024', 
    rank: 2, 
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200', 
    score: '99.5%',
    achievements: ['جائزة أفضل قصة قصيرة', 'المركز الثاني في مسابقة الرسم', 'عضو متميز في نادي القراءة']
  },
  { 
    id: '3',
    name: 'عمر ياسين', 
    grade: 'الصف السادس', 
    year: '2024', 
    rank: 3, 
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', 
    score: '99.2%',
    achievements: ['بطل المدرسة في الشطرنج', 'جائزة الابتكار العلمي', 'متطوع في الهلال الأحمر الطلابي']
  },
  { 
    id: '4',
    name: 'ليان العتيبي', 
    grade: 'الصف السادس', 
    year: '2024', 
    rank: 4, 
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200', 
    score: '98.9%',
    achievements: ['المركز الأول في مسابقة الإلقاء', 'عضو في نادي العلوم']
  },
  { 
    id: '5',
    name: 'خالد منصور', 
    grade: 'الصف السادس', 
    year: '2024', 
    rank: 5, 
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', 
    score: '98.7%',
    achievements: ['جائزة الطالب الخلوق', 'مشارك في فريق كرة القدم']
  },
  { 
    id: '6',
    name: 'يوسف إبراهيم', 
    grade: 'الصف الخامس', 
    year: '2024', 
    rank: 1, 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', 
    score: '99.7%',
    achievements: ['المركز الأول في حفظ القرآن', 'جائزة الخط العربي', 'عضو فريق كرة القدم']
  },
  { 
    id: '7',
    name: 'مريم عبدالله', 
    grade: 'الصف الخامس', 
    year: '2024', 
    rank: 2, 
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', 
    score: '99.4%',
    achievements: ['جائزة التميز في اللغة الإنجليزية', 'المركز الأول في مسابقة الإلقاء', 'مساهمة في مجلة المدرسة']
  },
  { 
    id: '8',
    name: 'ليلى محمود', 
    grade: 'الصف السادس', 
    year: '2023', 
    rank: 1, 
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200', 
    score: '99.9%',
    achievements: ['جائزة التفوق الدراسي الشامل', 'المركز الأول في تحدي القراءة العربي', 'رئيسة مجلس الطلاب']
  },
  { 
    id: '9',
    name: 'فهد العتيبي', 
    grade: 'الصف السادس', 
    year: '2023', 
    rank: 2, 
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', 
    score: '99.6%',
    achievements: ['بطل المنطقة في السباحة', 'جائزة الطالب المبتكر', 'عضو فريق الروبوت']
  },
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

const INITIAL_EVENTS = [
  { id: '1', date: '2026-03-15', title: 'بداية اختبارات منتصف الفصل', type: 'academic' },
  { id: '2', date: '2026-03-22', title: 'يوم النشاط الطلابي المفتوح', type: 'activity' },
  { id: '3', date: '2026-04-01', title: 'إجازة عيد الفطر المبارك', type: 'holiday' },
  { id: '4', date: '2026-04-10', title: 'عودة الدراسة بعد الإجازة', type: 'academic' },
];

const INITIAL_SCHEDULE = [
  { id: '1', day: 'السبت', p1: 'رياضيات', p2: 'علوم', p3: 'لغة عربية', p4: 'إنجليزي', p5: 'تربية إسلامية', p6: '-', p7: '-', grade: 'الصف السادس الابتدائي', section: 'أ' },
  { id: '2', day: 'الأحد', p1: 'لغة عربية', p2: 'رياضيات', p3: 'إنجليزي', p4: 'علوم', p5: 'اجتماعيات', p6: '-', p7: '-', grade: 'الصف السادس الابتدائي', section: 'أ' },
  { id: '3', day: 'الاثنين', p1: 'علوم', p2: 'إنجليزي', p3: 'رياضيات', p4: 'لغة عربية', p5: 'حاسب آلي', p6: '-', p7: '-', grade: 'الصف السادس الابتدائي', section: 'أ' },
  { id: '4', day: 'الثلاثاء', p1: 'رياضيات', p2: 'لغة عربية', p3: 'علوم', p4: 'تربية إسلامية', p5: 'إنجليزي', p6: '-', p7: '-', grade: 'الصف السادس الابتدائي', section: 'أ' },
  { id: '5', day: 'الأربعاء', p1: 'لغة عربية', p2: 'علوم', p3: 'رياضيات', p4: 'اجتماعيات', p5: 'إنجليزي', p6: '-', p7: '-', grade: 'الصف السادس الابتدائي', section: 'أ' },
  { id: '6', day: 'الخميس', p1: 'علوم', p2: 'إنجليزي', p3: 'رياضيات', p4: 'لغة عربية', p5: 'حاسب آلي', p6: '-', p7: '-', grade: 'الصف السادس الابتدائي', section: 'أ' },
];
const INITIAL_EXAM_SCHEDULE = [
  { id: '1', type: 'monthly', subject: 'الرياضيات', time: '09:00 - 10:30', date: '2026-04-05', day: 'الأحد', grade: 'الصف السادس الابتدائي', section: 'أ' },
  { id: '2', type: 'midterm', subject: 'اللغة العربية', time: '08:30 - 10:30', date: '2026-05-10', day: 'الاثنين', grade: 'الصف السادس الابتدائي', section: 'أ' },
  { id: '3', type: 'final', subject: 'العلوم', time: '08:00 - 11:00', date: '2026-06-15', day: 'الثلاثاء', grade: 'الصف السادس الابتدائي', section: 'أ' },
];

const EXAM_TYPES = [
  { id: 'monthly', name: 'الامتحانات الشهرية' },
  { id: 'midterm', name: 'امتحانات نصف العام' },
  { id: 'final', name: 'امتحانات نهاية العام' }
];

const INITIAL_POSTS = [
  {
    id: 1,
    title: "تتويج فريق المدرسة ببطولة الروبوت الإقليمية",
    excerpt: "حقق طلابنا المركز الأول في مسابقة الروبوت والذكاء الاصطناعي التي أقيمت على مستوى المنطقة...",
    date: "2026-03-12",
    category: "إنجازات",
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "ندوة حول أهمية القراءة في العصر الرقمي",
    excerpt: "استضافت المدرسة نخبة من الكتاب والمثقفين في ندوة حوارية تهدف إلى تعزيز حب القراءة لدى الطلاب...",
    date: "2026-03-10",
    category: "فعاليات",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "تحديثات في المختبرات العلمية والتقنية",
    excerpt: "تم تزويد مختبرات العلوم بأجهزة حديثة وتقنيات واقع معزز لتسهيل فهم المفاهيم العلمية المعقدة...",
    date: "2026-03-05",
    category: "تطوير",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800"
  }
];

const INITIAL_SEATING_DATA = [
  { id: '101', name: 'أحمد محمد علي', grade: 'الصف السادس', section: 'أ', seatNumber: '601' },
  { id: '102', name: 'سارة خالد حسن', grade: 'الصف السادس', section: 'أ', seatNumber: '602' },
  { id: '103', name: 'عمر ياسين', grade: 'الصف السادس', section: 'أ', seatNumber: '603' },
  { id: '104', name: 'ياسر عمار', grade: 'الصف السادس', section: 'ب', seatNumber: '621' },
  { id: '105', name: 'نورة السبيعي', grade: 'الصف السادس', section: 'ب', seatNumber: '622' },
  { id: '106', name: 'يوسف إبراهيم', grade: 'الصف الخامس', section: 'أ', seatNumber: '501' },
  { id: '107', name: 'مريم عبدالله', grade: 'الصف الخامس', section: 'أ', seatNumber: '502' },
];

const PARENT_PORTAL_MOCK_DATA: any = {
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
    monthlyTests: [
      { month: 'أكتوبر', score: 92 },
      { month: 'نوفمبر', score: 88 },
      { month: 'ديسمبر', score: 95 },
      { month: 'يناير', score: 91 },
      { month: 'فبراير', score: 94 },
    ],
    termExams: {
      midterm: 96,
      final: 98
    },
    attendanceDetails: [
      { month: 'أكتوبر', present: 20, absent: 1 },
      { month: 'نوفمبر', present: 19, absent: 2 },
      { month: 'ديسمبر', present: 21, absent: 0 },
      { month: 'يناير', present: 18, absent: 3 },
      { month: 'فبراير', present: 22, absent: 0 },
    ],
    feedback: [
      { teacher: 'أ. محمد (الرياضيات)', comment: 'أحمد طالب متميز جداً، لديه قدرة استثنائية على حل المسائل المعقدة بسرعة.' },
      { teacher: 'أ. سارة (اللغة العربية)', comment: 'تحسن ملحوظ في مهارات الكتابة الإبداعية، يحتاج فقط للتركيز أكثر على قواعد النحو.' },
      { teacher: 'أ. خالد (العلوم)', comment: 'مشارك فعال في التجارب المخبرية، يظهر شغفاً كبيراً بالاكتشاف.' }
    ]
  }
};

const ElegantDropdown = ({ label, options, value, onChange, widthClass = "md:w-64", noLabel = false }: { label?: string, options: string[], value: string, onChange: (v: string) => void, widthClass?: string, noLabel?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = (options || []).filter(opt => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={dropdownRef} className={`flex flex-col gap-2 w-full ${widthClass} relative`}>
      {!noLabel && label && <span className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest text-right">{label}</span>}
      <button 
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setSearchTerm('');
        }}
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
            className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden p-2"
          >
            {(options || []).length > 5 && (
              <div className="p-2 border-b border-slate-50 mb-2">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="بحث..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl pr-9 pl-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
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
                ))
              ) : (
                <div className="p-4 text-center text-slate-400 text-sm">لا توجد نتائج</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const navLinks = [
  { name: 'الرئيسية', id: 'home', icon: Home },
  { name: 'التقويم والجدول', id: 'schedule', icon: Calendar },
  { name: 'أرقام الجلوس', id: 'seating', icon: ClipboardList },
  { name: 'بوابة الأهالي', id: 'parent-portal', icon: UserCheck },
  { name: 'لوحة التحكم', id: 'admin', icon: Settings },
];

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
          
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => setView(link.id)}
                className={`font-medium transition-colors hover:text-emerald-500 flex items-center gap-1.5 text-xs lg:text-base ${currentView === link.id ? 'text-emerald-600' : (isScrolled || currentView !== 'home' ? 'text-slate-600' : 'text-white')}`}
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
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 md:hidden z-[-1]"
            />
            
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.25,
                    ease: "easeOut",
                    staggerChildren: 0.03,
                  }
                },
                closed: { 
                  opacity: 0, 
                  y: -10,
                  transition: {
                    duration: 0.2,
                    ease: "easeIn",
                  }
                }
              }}
              style={{ transform: 'translateZ(0)' }}
              className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl py-6 rounded-b-[2rem] overflow-hidden border-t border-slate-50"
            >
              <div className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <motion.button 
                    variants={{
                      open: { 
                        opacity: 1, 
                        transition: { duration: 0.15 } 
                      },
                      closed: { 
                        opacity: 0, 
                        transition: { duration: 0.1 } 
                      }
                    }}
                    key={link.id} 
                    onClick={() => { setView(link.id); setIsOpen(false); }}
                    style={{ transform: 'translateZ(0)' }}
                    className={`flex items-center gap-4 w-full text-right px-6 py-4 rounded-2xl font-bold transition-colors duration-200 ${
                      currentView === link.id 
                        ? 'text-emerald-600 bg-emerald-50' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-2 rounded-xl transition-colors duration-200 ${
                      currentView === link.id ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <link.icon className="w-5 h-5" />
                    </div>
                    <span className="text-lg">{link.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
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
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
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

const TopStudents = ({ students, academicYears, grades }: { students: any[], academicYears: string[], grades: string[] }) => {
  const [selectedYear, setSelectedYear] = useState(academicYears[0]);
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
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
  }, [showAll, selectedYear, selectedGrade]);

  const filteredStudents = (students || []).filter(s => 
    s.year === selectedYear && 
    s.grade === selectedGrade &&
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
              options={academicYears}
              value={selectedYear}
              onChange={(val) => { setSelectedYear(val); setShowAll(false); }}
            />
            <ElegantDropdown 
              label="المرحلة الدراسية"
              options={grades}
              value={selectedGrade}
              onChange={(val) => { setSelectedGrade(val); setShowAll(false); }}
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

const AcademicSchedule = ({ events, schedule, examSchedule, grades, sections }: { events: any[], schedule: any[], examSchedule: any[], grades: string[], sections: string[] }) => {
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
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-col md:flex-row gap-4">
              <ElegantDropdown 
                label="اختر الصف"
                options={grades}
                value={selectedGrade}
                onChange={(val) => setSelectedGrade(val)}
                widthClass="md:w-64"
              />
              <ElegantDropdown 
                label="اختر الشعبة"
                options={sections}
                value={selectedSection}
                onChange={(val) => setSelectedSection(val)}
                widthClass="md:w-32"
              />
            </div>

            <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 h-fit self-end">
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'calendar' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <Calendar className="w-5 h-5" />
                التقويم الدراسي
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'schedule' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <Clock className="w-5 h-5" />
                جدول الحصص
              </button>
              <button
                onClick={() => setActiveTab('exams')}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'exams' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <ClipboardList className="w-5 h-5" />
                جدول الامتحانات
              </button>
            </div>
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

const BlogSection = ({ posts }: { posts: any[] }) => {
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
          {(posts || []).map((post, idx) => (
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
                  {formatDate(post.date)}
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

const SeatingNumbers = ({ seatingData, grades, sections }: { seatingData: any[], grades: string[], sections: string[] }) => {
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = (seatingData || []).filter(s => 
    s.grade === selectedGrade && 
    s.section === selectedSection &&
    s.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <section id="seating" className="py-24 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">أرقام الجلوس</h2>
          <p className="text-slate-500 text-lg">يمكنكم الاطلاع على أرقام الجلوس الخاصة بالطلاب حسب الصف والشعبة</p>
          <div className="w-24 h-1.5 bg-emerald-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
          <div className="relative w-full md:w-80">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="بحث عن اسم الطالب..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pr-12 pl-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500 text-lg shadow-sm transition-all"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <ElegantDropdown 
              label="الصف الدراسي"
              options={grades}
              value={selectedGrade}
              onChange={(val) => setSelectedGrade(val)}
              widthClass="w-full md:w-64"
            />
            <ElegantDropdown 
              label="الشعبة"
              options={sections}
              value={selectedSection}
              onChange={(val) => setSelectedSection(val)}
              widthClass="w-full md:w-48"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 table-responsive">
          <table className="table w-full text-right border-collapse min-w-[700px]">
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

const AdminDashboard = ({ 
  students, setStudents,
  events, setEvents,
  schedule, setSchedule,
  subjects, setSubjects,
  examSchedule, setExamSchedule,
  posts, setPosts,
  seatingData, setSeatingData,
  parentPortalData, setParentPortalData,
  grades, setGrades,
  academicYears, setAcademicYears,
  categories, setCategories,
  sections, setSections,
  contactInfo, setContactInfo,
  socialLinks, setSocialLinks,
  showHonorRoll, setShowHonorRoll
}: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('students');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [modalSubTab, setModalSubTab] = useState('basic');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState(grades[0]);
  const [selectedSectionFilter, setSelectedSectionFilter] = useState(sections[0]);
  const [selectedExamTypeFilter, setSelectedExamTypeFilter] = useState(EXAM_TYPES[0].id);
  const [parentPortalSearch, setParentPortalSearch] = useState('');
  const [seatingSearch, setSeatingSearch] = useState('');
  
  const [newGrade, setNewGrade] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newSection, setNewSection] = useState('');
  const [newSubject, setNewSubject] = useState('');

  const [tempContactInfo, setTempContactInfo] = useState(contactInfo);

  useEffect(() => {
    setTempContactInfo(contactInfo);
  }, [contactInfo]);

  // New state for schedule management
  const [localSchedule, setLocalSchedule] = useState<any[]>([]);
  const [showSubjectPicker, setShowSubjectPicker] = useState<{ day: string, period: string } | null>(null);
  const [showResultSubjectPicker, setShowResultSubjectPicker] = useState<number | null>(null);
  const [showAttendanceMonthPicker, setShowAttendanceMonthPicker] = useState<number | null>(null);

  useEffect(() => {
    // Initialize local schedule for the selected grade/section
    const filtered = schedule.filter((s: any) => s.grade === selectedGradeFilter && s.section === selectedSectionFilter);
    const fullSchedule = DAYS.map(day => {
      const existing = filtered.find((s: any) => s.day === day);
      return existing || { day, p1: '-', p2: '-', p3: '-', p4: '-', p5: '-', p6: '-', p7: '-', grade: selectedGradeFilter, section: selectedSectionFilter };
    });
    setLocalSchedule(fullSchedule);
  }, [selectedGradeFilter, selectedSectionFilter, schedule]);

  const handleSaveSchedule = () => {
    handleSave(new Event('submit') as any);
  };

  const updateCell = (day: string, period: string, subject: string) => {
    setLocalSchedule(prev => prev.map(s => s.day === day ? { ...s, [period]: subject } : s));
    setShowSubjectPicker(null);
  };

  const handleSaveContactInfo = () => {
    handleSave(new Event('submit') as any);
  };

  const executeDelete = (id: string | number, type: string) => {
    if (type === 'students') setStudents((students || []).filter((s: any) => s.id !== id));
    else if (type === 'posts') setPosts((posts || []).filter((p: any) => p.id !== id));
    else if (type === 'events') setEvents((events || []).filter((ev: any) => ev.id !== id));
    else if (type === 'schedule') setSchedule((schedule || []).filter((s: any) => s.id !== id));
    else if (type === 'examSchedule') setExamSchedule((examSchedule || []).filter((s: any) => s.id !== id));
    else if (type === 'seating') setSeatingData((seatingData || []).filter((s: any) => s.id !== id));
    else if (type === 'parent-portal') {
      const newData = { ...(parentPortalData || {}) };
      delete newData[id as string];
      setParentPortalData(newData);
    }
    else if (type === 'grade') setGrades((grades || []).filter((_, i) => i !== id));
    else if (type === 'year') setAcademicYears((academicYears || []).filter((_, i) => i !== id));
    else if (type === 'category') setCategories((categories || []).filter((_, i) => i !== id));
    else if (type === 'section') setSections((sections || []).filter((_, i) => i !== id));
    else if (type === 'subject') setSubjects((subjects || []).filter((_, i) => i !== id));
    else if (type === 'social') setSocialLinks((socialLinks || []).filter((l: any) => l.id !== id));
    else if (type === 'portal-result') {
      const newResults = (editingItem.results || []).filter((_: any, i: number) => i !== id);
      setEditingItem({...editingItem, results: newResults});
    }
    else if (type === 'portal-attendance') {
      const newDetails = (editingItem.attendanceDetails || []).filter((_: any, i: number) => i !== id);
      setEditingItem({...editingItem, attendanceDetails: newDetails});
    }
  };

  const triggerDelete = (id: string | number, type: string) => {
    MySwal.fire({
      title: 'هل أنت متأكد؟',
      text: "سيتم حذف هذا العنصر بشكل نهائي ولا يمكن التراجع عن هذه العملية.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'نعم، احذف',
      cancelButtonText: 'تراجع',
      customClass: {
        popup: 'rounded-[2rem]',
        confirmButton: 'rounded-xl px-6 py-3 font-bold',
        cancelButton: 'rounded-xl px-6 py-3 font-bold'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        executeDelete(id, type);
        MySwal.fire({
          title: 'تم الحذف!',
          text: 'تم حذف العنصر بنجاح.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-[2rem]'
          }
        });
      }
    });
  };

  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      setLoginError('كلمة المرور خاطئة');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4" dir="rtl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center"
        >
          <div className="bg-emerald-100 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Lock className="text-emerald-600 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">لوحة التحكم</h2>
          <p className="text-slate-500 mb-8">يرجى إدخال كلمة المرور للوصول إلى الإعدادات</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-center text-2xl tracking-widest focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              placeholder="••••••••"
            />
            {loginError && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold text-center animate-in fade-in slide-in-from-top-2">
                {loginError}
              </div>
            )}
            <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
              تسجيل الدخول
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'students', name: 'لوحة الشرف', icon: Trophy },
    { id: 'posts', name: 'المستجدات', icon: MessageSquare },
    { id: 'schedule', name: 'التقويم والجداول', icon: Calendar },
    { id: 'seating', name: 'أرقام الجلوس', icon: ClipboardList },
    { id: 'parent-portal', name: 'بوابة الأهالي', icon: UserCheck },
    { id: 'social', name: 'روابط التواصل', icon: Share2 },
    { id: 'settings', name: 'الإعدادات العامة', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 mb-6 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${showHonorRoll ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">عرض لوحة الشرف</h4>
                  <p className="text-sm text-slate-500">التحكم في ظهور قسم المتفوقين في الصفحة الرئيسية</p>
                </div>
              </div>
              <button 
                onClick={() => setShowHonorRoll(!showHonorRoll)}
                className={`w-14 h-8 rounded-full relative transition-all duration-300 ${showHonorRoll ? 'bg-emerald-600' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all duration-300 ${showHonorRoll ? 'right-7' : 'right-1'}`}></div>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-slate-900">إدارة لوحة الشرف</h3>
              <button 
                onClick={() => { setEditingItem({ name: '', grade: 'الصف السادس', year: '2024', rank: 1, score: '', achievements: [], image: '' }); setIsAdding(true); setModalSubTab('basic'); }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                إضافة طالب
              </button>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm table-responsive">
              <table className="table w-full text-right min-w-[800px]">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4 font-bold text-slate-600">الترتيب</th>
                    <th className="p-4 font-bold text-slate-600">الطالب</th>
                    <th className="p-4 font-bold text-slate-600">الصف</th>
                    <th className="p-4 font-bold text-slate-600">العام</th>
                    <th className="p-4 font-bold text-slate-600">المعدل</th>
                    <th className="p-4 font-bold text-slate-600">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {[...students].sort((a: any, b: any) => {
                    const scoreA = parseFloat(String(a.score).replace('%', '').replace(',', '.')) || 0;
                    const scoreB = parseFloat(String(b.score).replace('%', '').replace(',', '.')) || 0;
                    if (scoreB !== scoreA) {
                      return scoreB - scoreA;
                    }
                    return a.name.localeCompare(b.name, 'ar');
                  }).map((s: any, idx: number) => (
                    <tr key={s.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-bold text-slate-400">#{idx + 1}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={s.image} className="w-10 h-10 rounded-full object-cover" alt="" />
                          <span className="font-bold text-slate-800">{s.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600">{s.grade}</td>
                      <td className="p-4 text-slate-600">{s.year}</td>
                      <td className="p-4 font-bold text-emerald-600">{s.score}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingItem(s); setIsAdding(false); setModalSubTab('basic'); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => triggerDelete(s.id, 'students')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'posts':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-slate-900">إدارة الأخبار والفعاليات</h3>
              <button 
                onClick={() => { setEditingItem({ title: '', excerpt: '', date: new Date().toISOString().split('T')[0], category: 'فعاليات', image: '' }); setIsAdding(true); setModalSubTab('basic'); }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                إضافة خبر
              </button>
            </div>
            <div className="grid gap-4">
              {(posts || []).map((p: any) => (
                <div key={p.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row gap-6 items-center text-center sm:text-right">
                    <img src={p.image} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1">{p.title}</h4>
                      <p className="text-slate-500 text-sm">{formatDate(p.date)} • {p.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingItem(p); setIsAdding(false); setModalSubTab('basic'); }} className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"><Edit className="w-5 h-5" /></button>
                    <button onClick={() => triggerDelete(p.id, 'posts')} className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'schedule':
        return (
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-slate-900">التقويم الدراسي</h3>
                <button 
                  onClick={() => { setEditingItem({ date: new Date().toISOString().split('T')[0], title: '', type: 'academic' }); setIsAdding(true); setModalSubTab('basic'); }}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  إضافة حدث
                </button>
              </div>
              <div className="grid gap-4">
                {(events || []).map((e: any) => (
                  <div key={e.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4 items-center text-center sm:text-right">
                      <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl font-bold">{formatDate(e.date)}</div>
                      <div>
                        <h4 className="font-bold text-slate-900">{e.title}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          e.type === 'academic' ? 'bg-blue-100 text-blue-600' : 
                          e.type === 'holiday' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                        }`}>
                          {e.type === 'academic' ? 'أكاديمي' : e.type === 'holiday' ? 'إجازة' : 'نشاط'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingItem(e); setIsAdding(false); setModalSubTab('basic'); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => triggerDelete(e.id, 'events')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-10 border-t border-slate-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="text-2xl font-bold text-slate-900">الجدول الدراسي الأسبوعي</h3>
                <div className="flex flex-wrap gap-4 w-full md:w-auto">
                  <ElegantDropdown 
                    label="تصفية حسب الصف"
                    options={grades}
                    value={selectedGradeFilter}
                    onChange={(val) => setSelectedGradeFilter(val)}
                    widthClass="w-full md:w-64"
                  />
                  <ElegantDropdown 
                    label="تصفية حسب الشعبة"
                    options={sections}
                    value={selectedSectionFilter}
                    onChange={(val) => setSelectedSectionFilter(val)}
                    widthClass="w-full md:w-32"
                  />
                  <button 
                    onClick={handleSaveSchedule}
                    className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all w-full md:w-auto justify-center shadow-lg shadow-emerald-600/20"
                  >
                    <Save className="w-5 h-5" />
                    حفظ الجدول
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm table-responsive">
                <table className="table w-full text-right min-w-[1000px]">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="p-4 font-bold text-slate-600">اليوم</th>
                      <th className="p-4 font-bold text-slate-600 text-center">الحصة 1</th>
                      <th className="p-4 font-bold text-slate-600 text-center">الحصة 2</th>
                      <th className="p-4 font-bold text-slate-600 text-center">الحصة 3</th>
                      <th className="p-4 font-bold text-slate-600 text-center">الحصة 4</th>
                      <th className="p-4 font-bold text-slate-600 text-center">الحصة 5</th>
                      <th className="p-4 font-bold text-slate-600 text-center">الحصة 6</th>
                      <th className="p-4 font-bold text-slate-600 text-center">الحصة 7</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(localSchedule || []).map((s: any) => (
                      <tr key={s.day} className="border-t border-slate-50">
                        <td className="p-4 font-bold text-slate-800 bg-slate-50/50">{s.day}</td>
                        {[1, 2, 3, 4, 5, 6, 7].map(num => (
                          <td 
                            key={num} 
                            onClick={() => setShowSubjectPicker({ day: s.day, period: `p${num}` })}
                            className="p-4 text-slate-600 text-center cursor-pointer hover:bg-emerald-50 transition-colors border-r border-slate-50"
                          >
                            {s[`p${num}`] || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {showSubjectPicker && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden"
                >
                  <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-slate-900">اختر المادة</h3>
                    <button onClick={() => setShowSubjectPicker(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                      <X className="w-6 h-6 text-slate-400" />
                    </button>
                  </div>
                  <div className="p-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                    {['-', ...(subjects || [])].map((subject) => (
                      <button
                        key={subject}
                        onClick={() => updateCell(showSubjectPicker.day, showSubjectPicker.period, subject)}
                        className="p-4 rounded-2xl border border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 font-bold transition-all text-center"
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            <div className="space-y-8 pt-10 border-t border-slate-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <h3 className="text-2xl font-bold text-slate-900">جدول الامتحانات</h3>
                <div className="flex flex-col md:flex-row items-end gap-4 w-full md:w-auto">
                  <div className="flex flex-wrap gap-4 w-full md:w-auto">
                    <ElegantDropdown 
                      label="نوع الامتحان"
                      options={EXAM_TYPES.map(t => t.name)}
                      value={EXAM_TYPES.find(t => t.id === selectedExamTypeFilter)?.name || EXAM_TYPES[0].name}
                      onChange={(val) => {
                        const typeId = EXAM_TYPES.find(t => t.name === val)?.id;
                        setSelectedExamTypeFilter(typeId || EXAM_TYPES[0].id);
                      }}
                      widthClass="w-40"
                    />
                    <ElegantDropdown 
                      label="الصف"
                      options={grades}
                      value={selectedGradeFilter}
                      onChange={setSelectedGradeFilter}
                      widthClass="w-32"
                    />
                    <ElegantDropdown 
                      label="الشعبة"
                      options={sections}
                      value={selectedSectionFilter}
                      onChange={setSelectedSectionFilter}
                      widthClass="w-32"
                    />
                  </div>
                  <button 
                    onClick={() => { setEditingItem({ type: selectedExamTypeFilter, subject: subjects[0], time: '', date: '', day: DAYS[0], grade: selectedGradeFilter, section: selectedSectionFilter, isExam: true }); setIsAdding(true); setModalSubTab('basic'); }}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all w-full md:w-auto justify-center h-[52px]"
                  >
                    <Plus className="w-5 h-5" />
                    إضافة امتحان
                  </button>
                </div>
              </div>
              
              <div className="space-y-10">
                {EXAM_TYPES.filter(t => t.id === selectedExamTypeFilter).map((type) => {
                  const filteredExams = (examSchedule || []).filter((s: any) => 
                    s.grade === selectedGradeFilter && 
                    s.section === selectedSectionFilter && 
                    s.type === type.id
                  );

                  if (filteredExams.length === 0) {
                    return (
                      <div key={type.id} className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                        <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                          <Calendar className="w-10 h-10 text-slate-300" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">لا يوجد جدول {type.name}</h4>
                        <p className="text-slate-500">لم يتم إضافة أي امتحانات لهذا الصف والشعبة بعد.</p>
                      </div>
                    );
                  }

                  return (
                    <div key={type.id} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-1 bg-emerald-500 rounded-full"></div>
                        <h4 className="text-lg font-bold text-slate-700">{type.name}</h4>
                      </div>
                      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm table-responsive overflow-hidden">
                        <table className="table w-full text-right min-w-[800px]">
                          <thead className="bg-slate-50">
                            <tr>
                              <th className="p-4 font-bold text-slate-600">اليوم</th>
                              <th className="p-4 font-bold text-slate-600">المادة</th>
                              <th className="p-4 font-bold text-slate-600">التاريخ</th>
                              <th className="p-4 font-bold text-slate-600">الوقت</th>
                              <th className="p-4 font-bold text-slate-600">الإجراءات</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredExams.map((s: any) => (
                              <tr key={s.id} className="border-t border-slate-50 hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-bold text-slate-800">{s.day}</td>
                                <td className="p-4 font-bold text-emerald-600">{s.subject}</td>
                                <td className="p-4 text-slate-600">{s.date}</td>
                                <td className="p-4 text-slate-600">{s.time}</td>
                                <td className="p-4">
                                  <div className="flex gap-2">
                                    <button onClick={() => { setEditingItem({ ...s, isExam: true }); setIsAdding(false); setModalSubTab('basic'); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                                    <button onClick={() => triggerDelete(s.id, 'examSchedule')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}

                {(examSchedule || []).filter((s: any) => s.grade === selectedGradeFilter && s.section === selectedSectionFilter).length === 0 && (
                  <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-slate-400">لا توجد امتحانات مضافة لهذا الصف والشعبة</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-10">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">بيانات التواصل (تواصل معنا)</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 mr-2">العنوان</label>
                  <input 
                    type="text" 
                    value={tempContactInfo.address}
                    onChange={(e) => setTempContactInfo({ ...tempContactInfo, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                    placeholder="العنوان..." 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 mr-2">الهاتف</label>
                  <input 
                    type="text" 
                    value={tempContactInfo.phone}
                    onChange={(e) => setTempContactInfo({ ...tempContactInfo, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                    placeholder="رقم الهاتف..." 
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 mr-2">البريد الإلكتروني</label>
                  <input 
                    type="email" 
                    value={tempContactInfo.email}
                    onChange={(e) => setTempContactInfo({ ...tempContactInfo, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                    placeholder="البريد الإلكتروني..." 
                  />
                </div>
              </div>
              <button 
                onClick={handleSaveContactInfo}
                className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
              >
                حفظ بيانات التواصل
              </button>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">إدارة القوائم المنسدلة</h3>
              
              <div className="grid md:grid-cols-2 gap-10">
                {/* Grades */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-slate-700">المراحل الدراسية</label>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newGrade} 
                      onChange={(e) => setNewGrade(e.target.value)}
                      placeholder="إضافة مرحلة جديدة..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                    <button 
                      onClick={() => {
                        if (newGrade.trim()) {
                          setGrades([...grades, newGrade.trim()]);
                          setNewGrade('');
                          MySwal.fire({
                            title: 'تمت الإضافة!',
                            text: 'تم إضافة المرحلة الدراسية بنجاح',
                            icon: 'success',
                            confirmButtonText: 'حسناً',
                            timer: 2000
                          });
                        } else {
                          MySwal.fire({
                            title: 'خطأ!',
                            text: 'يرجى إدخال اسم المرحلة الدراسية',
                            icon: 'error',
                            confirmButtonText: 'حسناً'
                          });
                        }
                      }} 
                      className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(grades || []).map((g, i) => (
                      <div key={i} className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2 group">
                        <span className="font-bold text-slate-600">{g}</span>
                        <button onClick={() => triggerDelete(i, 'grade')} className="text-red-400 hover:text-red-600 transition-colors"><X className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Years */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-slate-700">الأعوام الدراسية</label>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newYear} 
                      onChange={(e) => setNewYear(e.target.value)}
                      placeholder="إضافة عام جديد..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                    <button 
                      onClick={() => {
                        if (newYear.trim()) {
                          setAcademicYears([...academicYears, newYear.trim()]);
                          setNewYear('');
                          MySwal.fire({
                            title: 'تمت الإضافة!',
                            text: 'تم إضافة العام الدراسي بنجاح',
                            icon: 'success',
                            confirmButtonText: 'حسناً',
                            timer: 2000
                          });
                        } else {
                          MySwal.fire({
                            title: 'خطأ!',
                            text: 'يرجى إدخال العام الدراسي',
                            icon: 'error',
                            confirmButtonText: 'حسناً'
                          });
                        }
                      }} 
                      className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(academicYears || []).map((y, i) => (
                      <div key={i} className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2 group">
                        <span className="font-bold text-slate-600">{y}</span>
                        <button onClick={() => triggerDelete(i, 'year')} className="text-red-400 hover:text-red-600 transition-colors"><X className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-slate-700">تصنيفات الأخبار</label>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newCategory} 
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="إضافة تصنيف جديد..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                    <button 
                      onClick={() => {
                        if (newCategory.trim()) {
                          setCategories([...categories, newCategory.trim()]);
                          setNewCategory('');
                          MySwal.fire({
                            title: 'تمت الإضافة!',
                            text: 'تم إضافة التصنيف بنجاح',
                            icon: 'success',
                            confirmButtonText: 'حسناً',
                            timer: 2000
                          });
                        } else {
                          MySwal.fire({
                            title: 'خطأ!',
                            text: 'يرجى إدخال اسم التصنيف',
                            icon: 'error',
                            confirmButtonText: 'حسناً'
                          });
                        }
                      }} 
                      className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(categories || []).map((c, i) => (
                      <div key={i} className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2 group">
                        <span className="font-bold text-slate-600">{c}</span>
                        <button onClick={() => triggerDelete(i, 'category')} className="text-red-400 hover:text-red-600 transition-colors"><X className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sections */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-slate-700">الشعب الدراسية</label>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newSection} 
                      onChange={(e) => setNewSection(e.target.value)}
                      placeholder="إضافة شعبة جديدة..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                    <button 
                      onClick={() => {
                        if (newSection.trim()) {
                          setSections([...sections, newSection.trim()]);
                          setNewSection('');
                          MySwal.fire({
                            title: 'تمت الإضافة!',
                            text: 'تم إضافة الشعبة بنجاح',
                            icon: 'success',
                            confirmButtonText: 'حسناً',
                            timer: 2000
                          });
                        } else {
                          MySwal.fire({
                            title: 'خطأ!',
                            text: 'يرجى إدخال اسم الشعبة',
                            icon: 'error',
                            confirmButtonText: 'حسناً'
                          });
                        }
                      }} 
                      className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(sections || []).map((s, i) => (
                      <div key={i} className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2 group">
                        <span className="font-bold text-slate-600">{s}</span>
                        <button onClick={() => triggerDelete(i, 'section')} className="text-red-400 hover:text-red-600 transition-colors"><X className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subjects */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-slate-700">المواد الدراسية</label>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newSubject} 
                      onChange={(e) => setNewSubject(e.target.value)}
                      placeholder="إضافة مادة جديدة..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                    <button 
                      onClick={() => {
                        if (newSubject.trim()) {
                          setSubjects([...subjects, newSubject.trim()]);
                          setNewSubject('');
                          MySwal.fire({
                            title: 'تمت الإضافة!',
                            text: 'تم إضافة المادة الدراسية بنجاح',
                            icon: 'success',
                            confirmButtonText: 'حسناً',
                            timer: 2000
                          });
                        } else {
                          MySwal.fire({
                            title: 'خطأ!',
                            text: 'يرجى إدخال اسم المادة الدراسية',
                            icon: 'error',
                            confirmButtonText: 'حسناً'
                          });
                        }
                      }} 
                      className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(subjects || []).map((s: string, i: number) => (
                      <div key={i} className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2 group">
                        <span className="font-bold text-slate-600">{s}</span>
                        <button onClick={() => triggerDelete(i, 'subject')} className="text-red-400 hover:text-red-600 transition-colors"><X className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'seating':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h3 className="text-2xl font-bold text-slate-900">إدارة أرقام الجلوس</h3>
              <div className="flex flex-wrap gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="بحث عن طالب..." 
                    value={seatingSearch}
                    onChange={(e) => setSeatingSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-12 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
                <ElegantDropdown 
                  label="الصف"
                  options={grades}
                  value={selectedGradeFilter}
                  onChange={(val) => setSelectedGradeFilter(val)}
                  widthClass="w-full md:w-48"
                />
                <ElegantDropdown 
                  label="الشعبة"
                  options={sections}
                  value={selectedSectionFilter}
                  onChange={(val) => setSelectedSectionFilter(val)}
                  widthClass="w-full md:w-32"
                />
                <button 
                  onClick={() => { setEditingItem({ name: '', grade: selectedGradeFilter, section: selectedSectionFilter, seatNumber: '' }); setIsAdding(true); setModalSubTab('basic'); }}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all w-full md:w-auto justify-center"
                >
                  <Plus className="w-5 h-5" />
                  إضافة رقم جلوس
                </button>
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm table-responsive">
              <table className="table w-full text-right min-w-[800px]">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4 font-bold text-slate-600">الطالب</th>
                    <th className="p-4 font-bold text-slate-600">الصف</th>
                    <th className="p-4 font-bold text-slate-600">الشعبة</th>
                    <th className="p-4 font-bold text-slate-600">رقم الجلوس</th>
                    <th className="p-4 font-bold text-slate-600">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {(seatingData || []).filter((s: any) => 
                    s.grade === selectedGradeFilter && 
                    s.section === selectedSectionFilter &&
                    s.name.toLowerCase().startsWith(seatingSearch.toLowerCase())
                  ).map((s: any) => (
                    <tr key={s.id} className="border-t border-slate-50">
                      <td className="p-4 font-bold text-slate-800">{s.name}</td>
                      <td className="p-4 text-slate-600">{s.grade}</td>
                      <td className="p-4 text-slate-600">{s.section}</td>
                      <td className="p-4 font-black text-emerald-600">{s.seatNumber}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingItem(s); setIsAdding(false); setModalSubTab('basic'); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => triggerDelete(s.id, 'seating')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'parent-portal':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h3 className="text-2xl font-bold text-slate-900">إدارة بيانات الطلاب (بوابة الأهالي)</h3>
              <div className="flex flex-wrap gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="بحث باسم الطالب أو الرقم..." 
                    value={parentPortalSearch}
                    onChange={(e) => setParentPortalSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-12 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
                <button 
                  onClick={() => { setEditingItem({ id: '', name: '', grade: grades[0], attendance: '0%', behavior: 'ممتاز', results: [], attendanceDetails: [], monthlyTests: [], termExams: { midterm: 0, final: 0 }, feedback: [] }); setIsAdding(true); setModalSubTab('basic'); }}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all w-full md:w-auto justify-center"
                >
                  <Plus className="w-5 h-5" />
                  إضافة طالب
                </button>
              </div>
            </div>
            <div className="grid gap-4">
              {Object.entries(parentPortalData).filter(([id, data]: any) => 
                data.name.toLowerCase().includes(parentPortalSearch.toLowerCase()) || id.includes(parentPortalSearch)
              ).map(([id, data]: any) => (
                <div key={id} className="bg-white p-6 rounded-3xl border border-slate-100 flex justify-between items-center group hover:shadow-md transition-all">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-600">
                      {data.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{data.name}</h4>
                      <p className="text-sm text-slate-500">رقم الطالب: {id}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingItem({ id, ...data }); setIsAdding(false); setModalSubTab('basic'); }} className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"><Edit className="w-5 h-5" /></button>
                    <button onClick={() => triggerDelete(id, 'parent-portal')} className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'social':
        return (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-xl">
                  <Share2 className="w-6 h-6 text-emerald-600" />
                </div>
                إدارة روابط التواصل الاجتماعي
              </h3>
              
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-700">الروابط الحالية</h4>
                  <button 
                    onClick={() => {
                      setEditingItem({ name: '', url: '' });
                      setIsAdding(true);
                      setModalSubTab('basic');
                    }} 
                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                  >
                    <Plus className="w-5 h-5" />
                    إضافة رابط جديد
                  </button>
                </div>

                <div className="grid gap-4">
                  {(socialLinks || []).map((link: any) => (
                    <div key={link.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex justify-between items-center group hover:bg-white hover:shadow-md transition-all">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-lg">{link.name}</span>
                        <span className="text-sm text-slate-500 font-mono">{link.url}</span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setEditingItem(link);
                            setIsAdding(false);
                            setModalSubTab('basic');
                          }}
                          className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => triggerDelete(link.id, 'social')}
                          className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    MySwal.fire({
      title: 'تأكيد الحفظ',
      text: "هل أنت متأكد من رغبتك في حفظ هذه التغييرات؟",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'نعم، احفظ',
      cancelButtonText: 'تراجع',
      customClass: {
        popup: 'rounded-[2rem]',
        confirmButton: 'rounded-xl px-6 py-3 font-bold',
        cancelButton: 'rounded-xl px-6 py-3 font-bold'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        confirmSave();
        MySwal.fire({
          title: 'تم الحفظ!',
          text: 'تم حفظ التغييرات بنجاح.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-[2rem]'
          }
        });
      }
    });
  };

  const confirmSave = () => {
    if (activeTab === 'settings') {
      setContactInfo(tempContactInfo);
      return;
    }

    if (activeTab === 'schedule' && !editingItem) {
      // Saving the whole schedule table
      const otherSchedules = schedule.filter((s: any) => !(s.grade === selectedGradeFilter && s.section === selectedSectionFilter));
      const updatedLocal = localSchedule.map(s => ({ ...s, id: s.id || Date.now().toString() + Math.random() }));
      setSchedule([...otherSchedules, ...updatedLocal]);
      return;
    }

    if (!editingItem) return;
    
    const defaultImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    const itemToSave = {
      ...editingItem,
      image: editingItem.image || defaultImage
    };

    if (activeTab === 'students') {
      if (isAdding) {
        setStudents([...(students || []), { ...itemToSave, id: Date.now().toString(), achievements: itemToSave.achievements || [] }]);
      } else {
        setStudents((students || []).map((s: any) => s.id === itemToSave.id ? { ...itemToSave, achievements: itemToSave.achievements || [] } : s));
      }
    } else if (activeTab === 'posts') {
      if (isAdding) {
        setPosts([...(posts || []), { ...itemToSave, id: Date.now().toString(), tags: itemToSave.tags || [] }]);
      } else {
        setPosts((posts || []).map((p: any) => p.id === itemToSave.id ? { ...itemToSave, tags: itemToSave.tags || [] } : p));
      }
    } else if (activeTab === 'schedule') {
      if (editingItem.isSchedule) {
        if (isAdding) {
          setSchedule([...(schedule || []), { ...editingItem, id: Date.now().toString() }]);
        } else {
          setSchedule((schedule || []).map((s: any) => s.id === editingItem.id ? editingItem : s));
        }
      } else if (editingItem.isExam) {
        if (isAdding) {
          setExamSchedule([...(examSchedule || []), { ...editingItem, id: Date.now().toString() }]);
        } else {
          setExamSchedule((examSchedule || []).map((s: any) => s.id === editingItem.id ? editingItem : s));
        }
      } else {
        if (isAdding) {
          setEvents([...(events || []), { ...editingItem, id: Date.now().toString() }]);
        } else {
          setEvents((events || []).map((ev: any) => ev.id === editingItem.id ? editingItem : ev));
        }
      }
    } else if (activeTab === 'seating') {
      if (isAdding) {
        setSeatingData([...(seatingData || []), { ...editingItem, id: Date.now().toString() }]);
      } else {
        setSeatingData((seatingData || []).map((s: any) => s.id === editingItem.id ? editingItem : s));
      }
    } else if (activeTab === 'parent-portal') {
      const { id, ...data } = editingItem;
      const sanitizedData = {
        ...data,
        results: data.results || [],
        attendanceDetails: data.attendanceDetails || [],
        monthlyTests: data.monthlyTests || [],
        termExams: data.termExams || { midterm: 0, final: 0 },
        feedback: data.feedback || []
      };
      setParentPortalData({ ...(parentPortalData || {}), [id]: sanitizedData });
    } else if (activeTab === 'social') {
      if (isAdding) {
        setSocialLinks([...(socialLinks || []), { ...editingItem, id: Date.now().toString() }]);
      } else {
        setSocialLinks((socialLinks || []).map((l: any) => l.id === editingItem.id ? editingItem : l));
      }
    }
    setEditingItem(null);
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 lg:pt-32 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-32 h-fit space-y-6">
            <div className="bg-white/80 backdrop-blur-xl p-5 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white/20 ring-1 ring-slate-100">
              <div className="flex items-center gap-4 p-4 mb-8 bg-slate-50/50 rounded-3xl border border-slate-100/50">
                <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-lg shadow-emerald-200">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-black text-slate-900 tracking-tight">لوحة الإدارة</h2>
                  <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em]">نظام الإدارة الذكي</p>
                </div>
              </div>
              
              <nav className="space-y-1.5">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`group relative w-full flex items-center gap-3.5 px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${
                        isActive 
                        ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200 translate-x-1' 
                        : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                      }`}
                    >
                      <tab.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                      <span className="relative z-10">{tab.name}</span>
                      {!isActive && (
                        <div className="absolute left-4 w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="group w-full flex items-center gap-3.5 px-5 py-4 rounded-2xl font-bold text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                >
                  <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="min-h-[600px] w-full overflow-hidden">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900">{isAdding ? 'إضافة جديد' : 'تعديل البيانات'}</h3>
                <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-6">
                {activeTab === 'students' && (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">اسم الطالب</label>
                        <input type="text" value={editingItem.name} onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" required />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">المعدل</label>
                        <input type="text" value={editingItem.score} onChange={(e) => setEditingItem({...editingItem, score: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="99.8%" required />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <ElegantDropdown 
                        label="الصف"
                        options={grades}
                        value={editingItem.grade}
                        onChange={(val) => setEditingItem({...editingItem, grade: val})}
                        widthClass="w-full"
                      />
                      <ElegantDropdown 
                        label="العام الدراسي"
                        options={academicYears}
                        value={editingItem.year}
                        onChange={(val) => setEditingItem({...editingItem, year: val})}
                        widthClass="w-full"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">الترتيب</label>
                        <input type="number" value={editingItem.rank} onChange={(e) => setEditingItem({...editingItem, rank: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" min="1" required />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">الصورة الشخصية</label>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setEditingItem({...editingItem, image: reader.result as string});
                              };
                              reader.readAsDataURL(file);
                            }
                          }} 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" 
                        />
                        <p className="text-xs text-slate-400 mt-1">اتركه فارغاً لاستخدام الصورة الافتراضية</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">الإنجازات (واحد في كل سطر)</label>
                      <textarea 
                        value={editingItem.achievements?.join('\n')} 
                        onChange={(e) => setEditingItem({...editingItem, achievements: e.target.value.split('\n').filter(a => a.trim() !== '')})} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" 
                        rows={3} 
                        placeholder="المركز الأول في الرياضيات&#10;جائزة الطالب المثالي"
                      />
                    </div>
                  </>
                )}
                {activeTab === 'schedule' && (
                  <>
                    {editingItem.isSchedule ? (
                      <>
                        <div className="grid md:grid-cols-3 gap-6">
                          <ElegantDropdown 
                            label="اليوم"
                            options={DAYS}
                            value={editingItem.day || DAYS[0]}
                            onChange={(val) => setEditingItem({...editingItem, day: val})}
                            widthClass="w-full"
                          />
                          <ElegantDropdown 
                            label="الصف"
                            options={grades}
                            value={editingItem.grade || grades[0]}
                            onChange={(val) => setEditingItem({...editingItem, grade: val})}
                            widthClass="w-full"
                          />
                          <ElegantDropdown 
                            label="الشعبة"
                            options={sections}
                            value={editingItem.section || sections[0]}
                            onChange={(val) => setEditingItem({...editingItem, section: val})}
                            widthClass="w-full"
                          />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                            <div key={num}>
                              <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">الحصة {num}</label>
                              <input 
                                type="text" 
                                value={editingItem[`p${num}`] || ''} 
                                onChange={(e) => setEditingItem({...editingItem, [`p${num}`]: e.target.value || '-'})} 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" 
                                placeholder="-"
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    ) : editingItem.isExam ? (
                      <>
                        <div className="grid md:grid-cols-2 gap-6">
                          <ElegantDropdown 
                            label="نوع الامتحان"
                            options={EXAM_TYPES.map(t => t.name)}
                            value={EXAM_TYPES.find(t => t.id === editingItem.type)?.name || EXAM_TYPES[0].name}
                            onChange={(val) => {
                              const typeId = EXAM_TYPES.find(t => t.name === val)?.id;
                              setEditingItem({...editingItem, type: typeId});
                            }}
                            widthClass="w-full"
                          />
                          <ElegantDropdown 
                            label="المادة"
                            options={subjects}
                            value={editingItem.subject}
                            onChange={(val) => setEditingItem({...editingItem, subject: val})}
                            widthClass="w-full"
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <ElegantDropdown 
                            label="اليوم"
                            options={DAYS}
                            value={editingItem.day || DAYS[0]}
                            onChange={(val) => setEditingItem({...editingItem, day: val})}
                            widthClass="w-full"
                          />
                          <div>
                            <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">التاريخ</label>
                            <input type="date" value={editingItem.date} onChange={(e) => setEditingItem({...editingItem, date: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" required />
                          </div>
                        </div>
                        {editingItem.type === 'monthly' ? (
                          <div className="grid md:grid-cols-1 gap-6">
                            <ElegantDropdown 
                              label="الحصة"
                              options={PERIODS}
                              value={editingItem.time || PERIODS[0]}
                              onChange={(val) => setEditingItem({...editingItem, time: val})}
                              widthClass="w-full"
                            />
                          </div>
                        ) : (
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">وقت البدء</label>
                              <input 
                                type="time" 
                                value={editingItem.time?.includes(' - ') ? editingItem.time?.split(' - ')[0] : ''} 
                                onChange={(e) => {
                                  const end = editingItem.time?.includes(' - ') ? editingItem.time?.split(' - ')[1] : '';
                                  setEditingItem({...editingItem, time: `${e.target.value} - ${end}`});
                                }} 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" 
                                required 
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">وقت الانتهاء</label>
                              <input 
                                type="time" 
                                value={editingItem.time?.includes(' - ') ? editingItem.time?.split(' - ')[1] : ''} 
                                onChange={(e) => {
                                  const start = editingItem.time?.includes(' - ') ? editingItem.time?.split(' - ')[0] : '';
                                  setEditingItem({...editingItem, time: `${start} - ${e.target.value}`});
                                }} 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" 
                                required 
                              />
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">عنوان الحدث</label>
                          <input type="text" value={editingItem.title} onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" required />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">التاريخ</label>
                            <input type="date" value={editingItem.date} onChange={(e) => setEditingItem({...editingItem, date: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" required />
                          </div>
                          <ElegantDropdown 
                            label="نوع الحدث"
                            options={['academic', 'activity', 'holiday']}
                            value={editingItem.type}
                            onChange={(val) => setEditingItem({...editingItem, type: val})}
                            widthClass="w-full"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
                {activeTab === 'posts' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">عنوان الخبر</label>
                      <input type="text" value={editingItem.title} onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">مقتطف</label>
                      <textarea value={editingItem.excerpt} onChange={(e) => setEditingItem({...editingItem, excerpt: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" rows={3} required />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <ElegantDropdown 
                        label="التصنيف"
                        options={categories}
                        value={editingItem.category}
                        onChange={(val) => setEditingItem({...editingItem, category: val})}
                        widthClass="w-full"
                      />
                      <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">التاريخ</label>
                        <input type="date" value={editingItem.date} onChange={(e) => setEditingItem({...editingItem, date: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">الصورة</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setEditingItem({ ...editingItem, image: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" 
                      />
                      {editingItem.image && (
                        <img src={editingItem.image} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded-lg" />
                      )}
                    </div>
                  </>
                )}
                {activeTab === 'seating' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">اسم الطالب</label>
                      <input type="text" value={editingItem.name} onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" required />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <ElegantDropdown 
                        label="الصف"
                        options={grades}
                        value={editingItem.grade}
                        onChange={(val) => setEditingItem({...editingItem, grade: val})}
                        widthClass="w-full"
                      />
                      <ElegantDropdown 
                        label="الشعبة"
                        options={sections}
                        value={editingItem.section}
                        onChange={(val) => setEditingItem({...editingItem, section: val})}
                        widthClass="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">رقم الجلوس</label>
                      <input type="text" value={editingItem.seatNumber} onChange={(e) => setEditingItem({...editingItem, seatNumber: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" required />
                    </div>
                  </>
                )}
                {activeTab === 'parent-portal' && (
                  <div className="space-y-6">
                    {/* Sub-tabs Navigation */}
                    <div className="flex p-1 bg-slate-100 rounded-2xl">
                      {[
                        { id: 'basic', name: 'المعلومات الأساسية', icon: User },
                        { id: 'results', name: 'النتائج الدراسية', icon: Trophy },
                        { id: 'attendance', name: 'الحضور والغياب', icon: ClipboardList }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setModalSubTab(tab.id)}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${modalSubTab === tab.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          <tab.icon className="w-4 h-4" />
                          <span className="text-sm">{tab.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* Basic Info Tab */}
                    {modalSubTab === 'basic' && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">رقم الطالب (ID)</label>
                            <input type="text" value={editingItem.id} onChange={(e) => setEditingItem({...editingItem, id: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" disabled={!isAdding} required />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">اسم الطالب</label>
                            <input type="text" value={editingItem.name} onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" required />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <ElegantDropdown 
                            label="الصف"
                            options={grades}
                            value={editingItem.grade}
                            onChange={(val) => setEditingItem({...editingItem, grade: val})}
                            widthClass="w-full"
                          />
                          <div>
                            <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">نسبة الحضور الإجمالية</label>
                            <input type="text" value={editingItem.attendance} onChange={(e) => setEditingItem({...editingItem, attendance: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="95%" required />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">تقييم السلوك</label>
                          <input type="text" value={editingItem.behavior} onChange={(e) => setEditingItem({...editingItem, behavior: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="ممتاز" required />
                        </div>
                      </div>
                    )}

                    {/* Results Tab */}
                    {modalSubTab === 'results' && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-slate-900">قائمة المواد والدرجات</h4>
                          <button type="button" onClick={() => {
                            const newResults = [...(editingItem.results || []), { subject: '', score: 0, total: 100, trend: [0, 0, 0, 0] }];
                            setEditingItem({...editingItem, results: newResults});
                            setShowResultSubjectPicker(newResults.length - 1);
                          }} className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-emerald-100 transition-colors">
                            <Plus className="w-4 h-4" />
                            إضافة مادة
                          </button>
                        </div>
                        
                        <div className="table-responsive bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                          {(editingItem.results || []).length > 0 ? (
                            <table className="table mb-0">
                              <thead>
                                <tr>
                                  <th className="text-right whitespace-nowrap">اسم المادة</th>
                                  <th className="text-center whitespace-nowrap">الدرجة</th>
                                  <th className="text-center whitespace-nowrap">المجموع</th>
                                  <th className="text-center whitespace-nowrap">النسبة</th>
                                  <th className="text-center whitespace-nowrap">إجراءات</th>
                                </tr>
                              </thead>
                              <tbody>
                                 {(editingItem.results || []).map((res: any, idx: number) => (
                                  <tr key={idx}>
                                    <td className="min-w-[150px]">
                                      <button 
                                        type="button"
                                        onClick={() => setShowResultSubjectPicker(idx)}
                                        className="w-full text-right px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm hover:border-emerald-500 transition-colors font-bold text-slate-700 flex items-center justify-between group/btn"
                                      >
                                        <span>{res.subject || 'اضغط لاختيار المادة'}</span>
                                        <Edit2 className="w-3 h-3 opacity-0 group-hover/btn:opacity-100 transition-opacity text-emerald-500" />
                                      </button>
                                    </td>
                                    <td className="w-24">
                                      <input type="number" value={res.score} onChange={(e) => {
                                        const newResults = [...(editingItem.results || [])];
                                        newResults[idx].score = Number(e.target.value);
                                        setEditingItem({...editingItem, results: newResults});
                                      }} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 text-center" />
                                    </td>
                                    <td className="w-24">
                                      <input type="number" value={res.total} onChange={(e) => {
                                        const newResults = [...(editingItem.results || [])];
                                        newResults[idx].total = Number(e.target.value);
                                        setEditingItem({...editingItem, results: newResults});
                                      }} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 text-center" />
                                    </td>
                                    <td className="text-center align-middle">
                                      <span className="text-xs font-bold text-slate-500">{Math.round((res.score / res.total) * 100)}%</span>
                                    </td>
                                    <td className="text-center align-middle">
                                      <button type="button" onClick={() => triggerDelete(idx, 'portal-result')} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                              <p className="text-slate-400 text-sm">لا توجد مواد مضافة حالياً</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Attendance Tab */}
                    {modalSubTab === 'attendance' && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-slate-900">سجل الغياب الشهري</h4>
                          <button type="button" onClick={() => {
                            const newDetails = [...(editingItem.attendanceDetails || []), { month: new Date().toISOString().slice(0, 7), present: 0, absent: 0 }];
                            setEditingItem({...editingItem, attendanceDetails: newDetails});
                            setShowAttendanceMonthPicker(newDetails.length - 1);
                          }} className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-emerald-100 transition-colors">
                            <Plus className="w-4 h-4" />
                            إضافة شهر
                          </button>
                        </div>

                        <div className="table-responsive bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                          {(editingItem.attendanceDetails || []).length > 0 ? (
                            <table className="table mb-0">
                              <thead>
                                <tr>
                                  <th className="text-right whitespace-nowrap">الشهر</th>
                                  <th className="text-center whitespace-nowrap">أيام الحضور</th>
                                  <th className="text-center whitespace-nowrap">أيام الغياب</th>
                                  <th className="text-center whitespace-nowrap">إجراءات</th>
                                </tr>
                              </thead>
                              <tbody>
                                 {(editingItem.attendanceDetails || []).map((att: any, idx: number) => (
                                  <tr key={idx}>
                                    <td className="min-w-[120px]">
                                      <button 
                                        type="button"
                                        onClick={() => setShowAttendanceMonthPicker(idx)}
                                        className="w-full text-right px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm hover:border-emerald-500 transition-colors font-bold text-slate-700 flex items-center justify-between group/btn"
                                      >
                                        <span>
                                          {att.month ? (() => {
                                            const [year, month] = att.month.split('-');
                                            const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
                                            return `${monthNames[parseInt(month) - 1]} ${year}`;
                                          })() : 'اضغط لاختيار الشهر'}
                                        </span>
                                        <Calendar className="w-3 h-3 opacity-0 group-hover/btn:opacity-100 transition-opacity text-emerald-500" />
                                      </button>
                                    </td>
                                    <td className="w-32">
                                      <input type="number" value={att.present} onChange={(e) => {
                                        const newDetails = [...(editingItem.attendanceDetails || [])];
                                        newDetails[idx].present = Number(e.target.value);
                                        setEditingItem({...editingItem, attendanceDetails: newDetails});
                                      }} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 text-center" />
                                    </td>
                                    <td className="w-32">
                                      <input type="number" value={att.absent} onChange={(e) => {
                                        const newDetails = [...(editingItem.attendanceDetails || [])];
                                        newDetails[idx].absent = Number(e.target.value);
                                        setEditingItem({...editingItem, attendanceDetails: newDetails});
                                      }} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 text-center" />
                                    </td>
                                    <td className="text-center align-middle">
                                      <button type="button" onClick={() => triggerDelete(idx, 'portal-attendance')} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                              <p className="text-slate-400 text-sm">لا توجد بيانات غياب مضافة</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'social' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">اسم المنصة</label>
                      <input type="text" value={editingItem.name} onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="مثلاً: Facebook, Twitter" required />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">الرابط (URL)</label>
                      <input type="text" value={editingItem.url} onChange={(e) => setEditingItem({...editingItem, url: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="https://..." required />
                    </div>
                  </>
                )}
                <div className="pt-6 flex gap-4">
                  <button type="submit" className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                    <Save className="w-5 h-5" />
                    حفظ التغييرات
                  </button>
                  <button type="button" onClick={() => setEditingItem(null)} className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all">
                    تراجع
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Result Subject Picker Modal */}
      {showResultSubjectPicker !== null && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-slate-900">اختر المادة</h3>
              <button onClick={() => setShowResultSubjectPicker(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
                  <div className="p-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                    {(subjects || []).map((subject) => (
                      <button
                        key={subject}
                        onClick={() => {
                          const newResults = [...(editingItem.results || [])];
                          if (showResultSubjectPicker !== null && newResults[showResultSubjectPicker]) {
                            newResults[showResultSubjectPicker].subject = subject;
                            setEditingItem({...editingItem, results: newResults});
                          }
                          setShowResultSubjectPicker(null);
                        }}
                        className="p-4 rounded-2xl border border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 font-bold transition-all text-center"
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
          </motion.div>
        </div>
      )}

      {/* Attendance Month Picker Modal */}
      {showAttendanceMonthPicker !== null && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-slate-900">اختر الشهر</h3>
              <button onClick={() => setShowAttendanceMonthPicker(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            <div className="p-8 space-y-4">
              <input 
                type="month" 
                value={showAttendanceMonthPicker !== null && editingItem.attendanceDetails[showAttendanceMonthPicker] ? editingItem.attendanceDetails[showAttendanceMonthPicker].month : ''}
                onChange={(e) => {
                  if (showAttendanceMonthPicker !== null) {
                    const newDetails = [...(editingItem.attendanceDetails || [])];
                    if (newDetails[showAttendanceMonthPicker]) {
                      newDetails[showAttendanceMonthPicker].month = e.target.value;
                      setEditingItem({...editingItem, attendanceDetails: newDetails});
                    }
                  }
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-center text-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
              <button 
                onClick={() => setShowAttendanceMonthPicker(null)}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all"
              >
                تأكيد الاختيار
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const ParentPortal = ({ 
  studentId, 
  setStudentId, 
  result, 
  setResult,
  parentPortalData
}: { 
  studentId: string, 
  setStudentId: (s: string) => void, 
  result: any, 
  setResult: (r: any) => void,
  parentPortalData: any
}) => {
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!studentId) {
      setError('يرجى إدخال رقم الطالب.');
      return;
    }

    if (parentPortalData[studentId]) {
      setResult(parentPortalData[studentId]);
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
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full"
            >
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-600 p-3 rounded-2xl">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{result.name}</h3>
                        <p className="text-slate-400 text-sm">{result.grade}</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="text-slate-400 hover:text-red-400 transition-colors p-2"
                      title="تسجيل الخروج"
                    >
                      <X className="w-5 h-5" />
                    </button>
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
                <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-3">
                    <Award className="text-emerald-500" />
                    نتائج الاختبارات الفصلية
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {(result.results || []).map((item: any, idx: number) => (
                      <div key={idx} className="p-4 sm:p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group overflow-hidden">
                        <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                          <span className="font-bold text-base sm:text-lg truncate max-w-[150px] sm:max-w-none" title={item.subject}>{item.subject}</span>
                          <span className="text-emerald-500 font-black text-lg sm:text-xl shrink-0">{item.score} / {item.total}</span>
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
                            <LineChart data={(item.trend || []).map((val: number, i: number) => ({ val, i }))}>
                              <Line type="monotone" dataKey="val" stroke="#10b981" strokeWidth={2} dot={false} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 text-center">اتجاه الأداء في آخر 4 اختبارات</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monthly Tests and Term Exams */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-3">
                      <Calendar className="text-emerald-500" />
                      نتائج الاختبارات الشهرية
                    </h3>
                    <div className="space-y-4">
                      {(result.monthlyTests || []).map((test: any, idx: number) => (
                        <div key={idx} className="flex flex-wrap justify-between items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                          <span className="text-slate-300 font-bold truncate max-w-[100px] sm:max-w-none" title={test.month}>{test.month}</span>
                          <div className="flex items-center gap-3 shrink-0">
                            <div className="w-16 sm:w-24 bg-white/10 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full" style={{ width: `${test.score}%` }}></div>
                            </div>
                            <span className="text-emerald-400 font-black text-sm sm:text-base">{test.score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-3">
                      <Trophy className="text-emerald-500" />
                      الامتحانات النصفية والنهائية
                    </h3>
                    <div className="space-y-6">
                      <div className="p-4 sm:p-6 bg-emerald-600/10 border border-emerald-500/20 rounded-3xl text-center">
                        <span className="text-slate-400 text-sm block mb-2">الامتحان النصفي</span>
                        <span className="text-2xl sm:text-4xl font-black text-emerald-500">{(result.termExams?.midterm) || 0}%</span>
                      </div>
                      <div className="p-4 sm:p-6 bg-blue-600/10 border border-blue-500/20 rounded-3xl text-center">
                        <span className="text-slate-400 text-sm block mb-2">الامتحان النهائي</span>
                        <span className="text-2xl sm:text-4xl font-black text-blue-500">{(result.termExams?.final) || 0}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monthly Attendance Details */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-3">
                    <Clock className="text-emerald-500" />
                    سجل الحضور والغياب الشهري
                  </h3>
                  <div className="table-responsive">
                    <table className="table w-full text-right border-collapse min-w-[700px]">
                      <thead>
                        <tr className="text-slate-400 text-sm border-b border-white/10">
                          <th className="pb-4 font-bold">الشهر</th>
                          <th className="pb-4 font-bold text-center">أيام الحضور</th>
                          <th className="pb-4 font-bold text-center">أيام الغياب</th>
                          <th className="pb-4 font-bold text-center">الحالة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(result.attendanceDetails || []).map((item: any, idx: number) => (
                          <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 font-bold text-slate-200">{item.month}</td>
                            <td className="py-4 text-center text-emerald-400 font-bold">{item.present} يوم</td>
                            <td className="py-4 text-center text-red-400 font-bold">{item.absent} يوم</td>
                            <td className="py-4 text-center">
                              {item.absent === 0 ? (
                                <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-bold">مثالي</span>
                              ) : item.absent <= 2 ? (
                                <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-[10px] font-bold">جيد جداً</span>
                              ) : (
                                <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-[10px] font-bold">تنبيه</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Teacher Feedback */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-3">
                    <MessageSquare className="text-emerald-500" />
                    ملاحظات المعلمين
                  </h3>
                  <div className="space-y-6">
                    {(result.feedback || []).map((f: any, idx: number) => (
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
        <div className="bg-white rounded-3xl lg:rounded-[3rem] shadow-2xl overflow-hidden grid lg:grid-cols-5">
          <div className="lg:col-span-2 bg-slate-900 p-6 sm:p-12 text-white flex flex-col justify-center">
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

          <div className="lg:col-span-3 p-6 sm:p-12">
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

const Contact = ({ contactInfo }: { contactInfo: { address: string, phone: string, email: string } }) => {
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
                  <p className="text-slate-400">{contactInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Phone className="text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">الهاتف</h4>
                  <p className="text-slate-400" dir="ltr">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Mail className="text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">البريد الإلكتروني</h4>
                  <p className="text-slate-400">{contactInfo.email}</p>
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

const Footer = ({ socialLinks = [] }: { socialLinks?: any[] }) => {
  const ensureAbsoluteUrl = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <footer className="bg-slate-950 text-white py-12 border-t border-white/5" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <School className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold">مدرسة 22 مايو</span>
        </div>
        <div className="flex justify-center gap-6 mb-8">
          {(socialLinks || []).map((social) => (
            <a 
              key={social.id} 
              href={ensureAbsoluteUrl(social.url)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-emerald-500 transition-colors"
            >
              {social.name}
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
  const [parentPortalStudentId, setParentPortalStudentId] = useState('');
  const [parentPortalResult, setParentPortalResult] = useState<any>(null);

  // Application State
  const [showHonorRoll, setShowHonorRoll] = useState(true);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [examSchedule, setExamSchedule] = useState(INITIAL_EXAM_SCHEDULE);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [seatingData, setSeatingData] = useState(INITIAL_SEATING_DATA);
  const [parentPortalData, setParentPortalData] = useState(PARENT_PORTAL_MOCK_DATA);
  const [grades, setGrades] = useState(['الصف الخامس', 'الصف السادس', 'الصف السابع']);
  const [academicYears, setAcademicYears] = useState(['2024', '2023', '2022']);
  const [categories, setCategories] = useState(['إنجازات', 'فعاليات', 'تطوير']);
  const [sections, setSections] = useState(['أ', 'ب', 'ج']);
  const [socialLinks, setSocialLinks] = useState(INITIAL_SOCIAL_LINKS);
  const [contactInfo, setContactInfo] = useState({
    address: 'حي النرجس، الرياض، المملكة العربية السعودية',
    phone: '+966 11 123 4567',
    email: 'info@excellence-school.edu.sa'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        const savedId = localStorage.getItem('parentPortalStudentId');
        if (savedId) {
          setParentPortalStudentId(savedId);
          if (parentPortalData[savedId]) {
            setParentPortalResult(parentPortalData[savedId]);
          }
        }
      }
    } catch (e) {
      console.warn('LocalStorage access failed:', e);
    }
  }, [parentPortalData]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar setView={setView} currentView={view} />
      <main>
        {view === 'home' && (
          <>
            <Hero />
            <AboutSection />
            {showHonorRoll && <TopStudents students={students} academicYears={academicYears} grades={grades} />}
            <BlogSection posts={posts} />
            <VisionMission />
            <Services />
            <Contact contactInfo={contactInfo} />
          </>
        )}
        {view === 'schedule' && <AcademicSchedule events={events} schedule={schedule} examSchedule={examSchedule} grades={grades} sections={sections} />}
        {view === 'seating' && <SeatingNumbers seatingData={seatingData} grades={grades} sections={sections} />}
        {view === 'parent-portal' && (
          <ParentPortal 
            studentId={parentPortalStudentId}
            setStudentId={setParentPortalStudentId}
            result={parentPortalResult}
            setResult={setParentPortalResult}
            parentPortalData={parentPortalData}
          />
        )}
        {view === 'admin' && (
          <AdminDashboard 
            students={students} setStudents={setStudents}
            events={events} setEvents={setEvents}
            schedule={schedule} setSchedule={setSchedule}
            subjects={subjects} setSubjects={setSubjects}
            examSchedule={examSchedule} setExamSchedule={setExamSchedule}
            posts={posts} setPosts={setPosts}
            seatingData={seatingData} setSeatingData={setSeatingData}
            parentPortalData={parentPortalData} setParentPortalData={setParentPortalData}
            grades={grades} setGrades={setGrades}
            academicYears={academicYears} setAcademicYears={setAcademicYears}
            categories={categories} setCategories={setCategories}
            sections={sections} setSections={setSections}
            contactInfo={contactInfo} setContactInfo={setContactInfo}
            socialLinks={socialLinks} setSocialLinks={setSocialLinks}
            showHonorRoll={showHonorRoll} setShowHonorRoll={setShowHonorRoll}
          />
        )}
      </main>
      <Footer socialLinks={socialLinks} />
    </div>
  );
}
