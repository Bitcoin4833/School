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
  Check,
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
const INITIAL_SUBJECTS = [
  "قرآن",                    
  "تربية إسلامية",            
  "الايمان",            
  "الفقه والحديث",  
  "السيرة النبوية", 
  "لغة عربية",          
  "النحو والصرف",
  "القراءة",               
  "الأدب والنصوص والبلاغة",
  "رياضيات",          
  "التفاضل والتكامل",      
  "الجبر والهندسة",    
  "علوم",            
  "فيزياء",        
  "كيمياء",             
  "أحياء",              
  "لغة إنجليزية",         
  "اجتماعيات",             
  "تاريخ",                
  "جغرافيا",           
  "تربية وطنية",          
  "علم الاقتصاد",        
  "علم الاجتماع",   
  "منطق",            
  "فلسفة",                 
  "علم النفس",         
  "مجتمع يمني"
];
const INITIAL_SOCIAL_LINKS = [
  { id: '1', name: 'Twitter', url: 'https://twitter.com' },
  { id: '2', name: 'Instagram', url: 'https://instagram.com' },
  { id: '3', name: 'Facebook', url: 'https://facebook.com' },
  { id: '4', name: 'LinkedIn', url: 'https://linkedin.com' }
];

const INITIAL_GRADE_SUBJECTS: Record<string, string[]> = {
  'الصف الأول': ["قرآن", "تربية إسلامية", "لغة عربية", "رياضيات", "علوم"],
  'الصف الثاني': ["قرآن", "تربية إسلامية", "لغة عربية", "رياضيات", "علوم"],
  'الصف الثالث': ["قرآن", "لغة عربية", "رياضيات", "تربية إسلامية", "علوم", "اجتماعيات"],
  'الصف الرابع': ["قرآن", "لغة عربية", "رياضيات", "تربية إسلامية", "علوم", "اجتماعيات"],
  'الصف الخامس': ["قرآن", "لغة عربية", "رياضيات", "تربية إسلامية", "علوم", "تاريخ", "جغرافيا", "تربية وطنية", "لغة إنجليزية"],
  'الصف السادس': ["قرآن", "لغة عربية", "رياضيات", "تربية إسلامية", "علوم", "تاريخ", "جغرافيا", "تربية وطنية", "لغة إنجليزية"],
  'الصف السابع': ["قرآن", "لغة عربية", "رياضيات", "تربية إسلامية", "علوم", "تاريخ", "جغرافيا", "تربية وطنية", "لغة إنجليزية"],
  'الصف الثامن': ["قرآن", "لغة عربية", "رياضيات", "تربية إسلامية", "علوم", "تاريخ", "جغرافيا", "تربية وطنية", "لغة إنجليزية"],
  'الصف التاسع': ["قرآن", "لغة عربية", "رياضيات", "تربية إسلامية", "علوم", "تاريخ", "جغرافيا", "تربية وطنية", "لغة إنجليزية"],
  'الأول ثانوي': [],
  'الثاني ثانوي': [],
  'الثالث ثانوي': []
};

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
  { id: 'monthly', name: 'شهرية' },
  { id: 'midterm', name: 'نصف العام' },
  { id: 'final', name: 'نهاية العام' }
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
    attendance: '98%',
    behavior: 'ممتاز',
    exams: [
      {
        id: 'e1',
        semester: 1,
        type: 'monthly',
        month: 'أكتوبر',
        results: [
          { subject: 'رياضيات', score: 92, total: 100 },
          { subject: 'لغة عربية', score: 90, total: 100 },
          { subject: 'علوم', score: 88, total: 100 },
          { subject: 'لغة إنجليزية', score: 85, total: 100 },
        ]
      },
      {
        id: 'e2',
        semester: 1,
        type: 'monthly',
        month: 'نوفمبر',
        results: [
          { subject: 'رياضيات', score: 88, total: 100 },
          { subject: 'لغة عربية', score: 92, total: 100 },
          { subject: 'علوم', score: 94, total: 100 },
          { subject: 'لغة إنجليزية', score: 85, total: 100 },
        ]
      },
      {
        id: 'e3',
        semester: 1,
        type: 'final',
        results: [
          { subject: 'رياضيات', score: 96, total: 100 },
          { subject: 'لغة عربية', score: 94, total: 100 },
          { subject: 'علوم', score: 95, total: 100 },
          { subject: 'لغة إنجليزية', score: 92, total: 100 },
        ]
      }
    ],
    attendanceDetails: [
      { month: 'أكتوبر', present: 20, absent: 1, semester: 1 },
      { month: 'نوفمبر', present: 19, absent: 2, semester: 1 },
      { month: 'ديسمبر', present: 21, absent: 0, semester: 1 },
      { month: 'يناير', present: 18, absent: 3, semester: 1 },
      { month: 'فبراير', present: 22, absent: 0, semester: 2 },
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
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
          
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 h-fit w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex-1 lg:flex-none px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'calendar' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Calendar className="w-5 h-5" />
              التقويم الدراسي
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex-1 lg:flex-none px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'schedule' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Clock className="w-5 h-5" />
              جدول الحصص
            </button>
            <button
              onClick={() => setActiveTab('exams')}
              className={`flex-1 lg:flex-none px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'exams' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <ClipboardList className="w-5 h-5" />
              جدول الامتحانات
            </button>
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
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
  gradeSubjects, setGradeSubjects,
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
  const [managementSelectedGrade, setManagementSelectedGrade] = useState(grades[0]);
  const [showGradeSubjectModal, setShowGradeSubjectModal] = useState(false);
  const [tempModalSubjects, setTempModalSubjects] = useState<string[]>([]);
  
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
  const [localExamSchedule, setLocalExamSchedule] = useState<any[]>([]);
  const [showSubjectPicker, setShowSubjectPicker] = useState<{ day: string, period: string } | null>(null);
  const [showExamCellPicker, setShowExamCellPicker] = useState<{ examId: string, field: string } | null>(null);
  const [showResultSubjectPicker, setShowResultSubjectPicker] = useState<{ examIdx: number, resultIdx: number } | null>(null);
  const [showAttendanceMonthPicker, setShowAttendanceMonthPicker] = useState<number | null>(null);
  const [showMonthlyTestMonthPicker, setShowMonthlyTestMonthPicker] = useState<number | null>(null);
  const [editingExamIdx, setEditingExamIdx] = useState<number | null>(null);
  const [selectedSemester, setSelectedSemester] = useState(1);

  useEffect(() => {
    // Initialize local schedule for the selected grade/section
    const filtered = schedule.filter((s: any) => s.grade === selectedGradeFilter && s.section === selectedSectionFilter);
    const fullSchedule = DAYS.map(day => {
      const existing = filtered.find((s: any) => s.day === day);
      return existing || { day, p1: '-', p2: '-', p3: '-', p4: '-', p5: '-', p6: '-', p7: '-', grade: selectedGradeFilter, section: selectedSectionFilter };
    });
    setLocalSchedule(fullSchedule);
  }, [selectedGradeFilter, selectedSectionFilter, schedule]);

  useEffect(() => {
    const filtered = (examSchedule || []).filter((s: any) => 
      s.grade === selectedGradeFilter && 
      s.section === selectedSectionFilter && 
      s.type === selectedExamTypeFilter
    );
    setLocalExamSchedule(filtered);
  }, [selectedGradeFilter, selectedSectionFilter, selectedExamTypeFilter, examSchedule]);

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
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                  <ElegantDropdown 
                    label="تصفية حسب الصف"
                    options={grades}
                    value={selectedGradeFilter}
                    onChange={(val) => setSelectedGradeFilter(val)}
                    widthClass="w-full"
                  />
                  <ElegantDropdown 
                    label="تصفية حسب الشعبة"
                    options={sections}
                    value={selectedSectionFilter}
                    onChange={(val) => setSelectedSectionFilter(val)}
                    widthClass="w-full"
                  />
                  <div className="col-span-2 lg:col-span-2 flex items-end">
                    <button 
                      onClick={handleSaveSchedule}
                      className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all w-full justify-center shadow-lg shadow-emerald-600/20 h-[52px]"
                    >
                      <Save className="w-5 h-5" />
                      حفظ الجدول
                    </button>
                  </div>
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
                    {['-', ...(gradeSubjects[selectedGradeFilter] || subjects || [])].map((subject) => (
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
                <div className="flex flex-col md:flex-row items-end gap-4 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                    <ElegantDropdown 
                      label="نوع الامتحان"
                      options={EXAM_TYPES.map(t => t.name)}
                      value={EXAM_TYPES.find(t => t.id === selectedExamTypeFilter)?.name || EXAM_TYPES[0].name}
                      onChange={(val) => {
                        const typeId = EXAM_TYPES.find(t => t.name === val)?.id;
                        setSelectedExamTypeFilter(typeId || EXAM_TYPES[0].id);
                      }}
                      widthClass="w-full"
                    />
                    <ElegantDropdown 
                      label="الصف"
                      options={grades}
                      value={selectedGradeFilter}
                      onChange={setSelectedGradeFilter}
                      widthClass="w-full"
                    />
                    <ElegantDropdown 
                      label="الشعبة"
                      options={sections}
                      value={selectedSectionFilter}
                      onChange={setSelectedSectionFilter}
                      widthClass="w-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-10">
                {EXAM_TYPES.filter(t => t.id === selectedExamTypeFilter).map((type) => {
                  if (localExamSchedule.length === 0) {
                    return (
                      <div key={type.id} className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                        <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                          <Calendar className="w-10 h-10 text-slate-300" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">لا يوجد جدول {type.name}</h4>
                        <p className="text-slate-500 mb-6">لم يتم إضافة أي امتحانات لهذا الصف والشعبة بعد.</p>
                        <button 
                          onClick={() => {
                            const gradeSubs = gradeSubjects[selectedGradeFilter] || [];
                            if (gradeSubs.length === 0) {
                              MySwal.fire({
                                title: 'لا توجد مواد',
                                text: 'يرجى ربط المواد بهذا الصف أولاً من الإعدادات',
                                icon: 'info',
                                confirmButtonText: 'حسناً',
                                customClass: { popup: 'rounded-[2rem]', confirmButton: 'rounded-xl px-6 py-3 font-bold' }
                              });
                              return;
                            }

                            const newRows = gradeSubs.map((subject, index) => {
                              const dayIndex = index % DAYS.length;
                              const date = new Date();
                              date.setDate(date.getDate() + index); // Increment date for each subject
                              
                              return { 
                                id: (Date.now() + index).toString() + Math.random(), 
                                type: selectedExamTypeFilter, 
                                subject: subject, 
                                time: selectedExamTypeFilter === 'monthly' ? PERIODS[0] : '08:00 - 10:00', 
                                date: date.toISOString().split('T')[0], 
                                day: DAYS[dayIndex], 
                                grade: selectedGradeFilter, 
                                section: selectedSectionFilter 
                              };
                            });
                            setLocalExamSchedule(newRows);
                          }}
                          className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all mx-auto shadow-lg shadow-emerald-600/20"
                        >
                          <Plus className="w-5 h-5" />
                          بدء إنشاء الجدول تلقائياً
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div key={type.id} className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-6 w-1 bg-emerald-500 rounded-full"></div>
                          <h4 className="text-lg font-bold text-slate-700">{type.name}</h4>
                        </div>
                        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                          انقر على أي خلية لتعديل بياناتها
                        </span>
                      </div>
                      
                      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-right border-collapse">
                            <thead>
                              <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-5 font-black text-slate-500 text-sm uppercase tracking-wider">اليوم</th>
                                <th className="p-5 font-black text-slate-500 text-sm uppercase tracking-wider">المادة</th>
                                <th className="p-5 font-black text-slate-500 text-sm uppercase tracking-wider">التاريخ</th>
                                <th className="p-5 font-black text-slate-500 text-sm uppercase tracking-wider">الموعد / الوقت</th>
                                <th className="p-5 font-black text-slate-500 text-sm uppercase tracking-wider w-20"></th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                              {localExamSchedule.map((row) => (
                                <tr key={row.id} className="group hover:bg-emerald-50/30 transition-all">
                                  <td 
                                    onClick={() => setShowExamCellPicker({ examId: row.id, field: 'day' })}
                                    className="p-5 font-bold text-slate-700 cursor-pointer hover:text-emerald-600 transition-colors"
                                  >
                                    <div className="flex items-center gap-2">
                                      {row.day}
                                      <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-40" />
                                    </div>
                                  </td>
                                  <td 
                                    onClick={() => setShowExamCellPicker({ examId: row.id, field: 'subject' })}
                                    className="p-5 font-bold text-emerald-600 cursor-pointer hover:scale-105 origin-right transition-all"
                                  >
                                    <div className="flex items-center gap-2">
                                      {row.subject}
                                      <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-40 text-slate-400" />
                                    </div>
                                  </td>
                                  <td 
                                    onClick={() => setShowExamCellPicker({ examId: row.id, field: 'date' })}
                                    className="p-5 font-bold text-slate-500 cursor-pointer hover:text-emerald-600 transition-colors"
                                  >
                                    <div className="flex items-center gap-2">
                                      {row.date}
                                      <Calendar className="w-3 h-3 opacity-0 group-hover:opacity-40" />
                                    </div>
                                  </td>
                                  <td 
                                    onClick={() => setShowExamCellPicker({ examId: row.id, field: 'time' })}
                                    className="p-5 font-bold text-slate-600 cursor-pointer hover:text-emerald-600 transition-colors"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="bg-slate-100 px-3 py-1 rounded-lg text-xs font-black text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                                        {row.time}
                                      </span>
                                      <Clock className="w-3 h-3 opacity-0 group-hover:opacity-40" />
                                    </div>
                                  </td>
                                  <td className="p-5">
                                    <button 
                                      onClick={() => {
                                        MySwal.fire({
                                          title: 'حذف السطر؟',
                                          text: 'هل أنت متأكد من حذف هذا الامتحان من الجدول؟',
                                          icon: 'warning',
                                          showCancelButton: true,
                                          confirmButtonText: 'نعم، احذف',
                                          cancelButtonText: 'تراجع',
                                          confirmButtonColor: '#ef4444',
                                          cancelButtonColor: '#64748b',
                                          customClass: { popup: 'rounded-[2rem]', confirmButton: 'rounded-xl px-6 py-3 font-bold', cancelButton: 'rounded-xl px-6 py-3 font-bold' }
                                        }).then((result) => {
                                          if (result.isConfirmed) {
                                            setLocalExamSchedule(localExamSchedule.filter(r => r.id !== row.id));
                                          }
                                        });
                                      }}
                                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button 
                          onClick={() => {
                            const gradeSubs = gradeSubjects[selectedGradeFilter] || [];
                            const nextIndex = localExamSchedule.length;
                            const nextSubject = gradeSubs[nextIndex % gradeSubs.length] || subjects[0];
                            const nextDay = DAYS[nextIndex % DAYS.length];
                            const nextDate = new Date();
                            nextDate.setDate(nextDate.getDate() + nextIndex);

                            const newRow = { 
                              id: Date.now().toString() + Math.random(), 
                              type: selectedExamTypeFilter, 
                              subject: nextSubject, 
                              time: selectedExamTypeFilter === 'monthly' ? PERIODS[0] : '08:00 - 10:00', 
                              date: nextDate.toISOString().split('T')[0], 
                              day: nextDay, 
                              grade: selectedGradeFilter, 
                              section: selectedSectionFilter 
                            };
                            setLocalExamSchedule([...localExamSchedule, newRow]);
                          }}
                          className="flex-1 bg-white text-emerald-600 border-2 border-emerald-100 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all shadow-sm"
                        >
                          <Plus className="w-5 h-5" />
                          إضافة سطر جديد
                        </button>
                        <button 
                          onClick={() => {
                            MySwal.fire({
                              title: 'تأكيد الحفظ',
                              text: `هل أنت متأكد من حفظ جدول امتحانات ${type.name} لـ ${selectedGradeFilter}؟`,
                              icon: 'question',
                              showCancelButton: true,
                              confirmButtonText: 'نعم، احفظ',
                              cancelButtonText: 'تراجع',
                              confirmButtonColor: '#10b981',
                              cancelButtonColor: '#64748b',
                              customClass: { popup: 'rounded-[2rem]', confirmButton: 'rounded-xl px-6 py-3 font-bold', cancelButton: 'rounded-xl px-6 py-3 font-bold' }
                            }).then((result) => {
                              if (result.isConfirmed) {
                                const otherExams = examSchedule.filter((s: any) => !(s.grade === selectedGradeFilter && s.section === selectedSectionFilter && s.type === selectedExamTypeFilter));
                                setExamSchedule([...otherExams, ...localExamSchedule]);
                                MySwal.fire({
                                  title: 'تم الحفظ!',
                                  text: 'تم تحديث جدول الامتحانات بنجاح',
                                  icon: 'success',
                                  timer: 2000,
                                  showConfirmButton: false
                                });
                              }
                            });
                          }}
                          className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                        >
                          <Save className="w-5 h-5" />
                          حفظ الجدول بالكامل
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Exam Cell Picker Modal */}
                {showExamCellPicker && (
                  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden"
                    >
                      <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="text-xl font-bold text-slate-900">تعديل البيانات</h3>
                        <button onClick={() => setShowExamCellPicker(null)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm border border-slate-100">
                          <X className="w-5 h-5 text-slate-400" />
                        </button>
                      </div>
                      
                      <div className="p-8 space-y-6">
                        {showExamCellPicker.field === 'day' && (
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500">اختر اليوم</label>
                            <div className="grid grid-cols-2 gap-2">
                              {DAYS.map(day => (
                                <button
                                  key={day}
                                  onClick={() => {
                                    setLocalExamSchedule(prev => prev.map(r => r.id === showExamCellPicker.examId ? { ...r, day } : r));
                                    setShowExamCellPicker(null);
                                  }}
                                  className={`p-3 rounded-xl border font-bold transition-all ${
                                    localExamSchedule.find(r => r.id === showExamCellPicker.examId)?.day === day
                                      ? 'bg-emerald-600 text-white border-emerald-600'
                                      : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                                  }`}
                                >
                                  {day}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {showExamCellPicker.field === 'subject' && (
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500">اختر المادة</label>
                            <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                              {(gradeSubjects[selectedGradeFilter] || subjects).map(subject => (
                                <button
                                  key={subject}
                                  onClick={() => {
                                    setLocalExamSchedule(prev => prev.map(r => r.id === showExamCellPicker.examId ? { ...r, subject } : r));
                                    setShowExamCellPicker(null);
                                  }}
                                  className={`p-3 rounded-xl border font-bold transition-all text-sm ${
                                    localExamSchedule.find(r => r.id === showExamCellPicker.examId)?.subject === subject
                                      ? 'bg-emerald-600 text-white border-emerald-600'
                                      : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                                  }`}
                                >
                                  {subject}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {showExamCellPicker.field === 'date' && (
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500">تاريخ الامتحان</label>
                            <input 
                              type="date"
                              value={localExamSchedule.find(r => r.id === showExamCellPicker.examId)?.date || ''}
                              onChange={(e) => {
                                setLocalExamSchedule(prev => prev.map(r => r.id === showExamCellPicker.examId ? { ...r, date: e.target.value } : r));
                              }}
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            />
                            <button 
                              onClick={() => setShowExamCellPicker(null)}
                              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold mt-4"
                            >
                              حفظ التاريخ
                            </button>
                          </div>
                        )}

                        {showExamCellPicker.field === 'time' && (
                          <div className="space-y-4">
                            {selectedExamTypeFilter === 'monthly' ? (
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">اختر الحصة</label>
                                <div className="grid grid-cols-2 gap-2">
                                  {PERIODS.map(p => (
                                    <button
                                      key={p}
                                      onClick={() => {
                                        setLocalExamSchedule(prev => prev.map(r => r.id === showExamCellPicker.examId ? { ...r, time: p } : r));
                                        setShowExamCellPicker(null);
                                      }}
                                      className={`p-3 rounded-xl border font-bold transition-all text-xs ${
                                        localExamSchedule.find(r => r.id === showExamCellPicker.examId)?.time === p
                                          ? 'bg-emerald-600 text-white border-emerald-600'
                                          : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                                      }`}
                                    >
                                      {p}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400">وقت البدء</label>
                                    <input 
                                      type="time"
                                      value={localExamSchedule.find(r => r.id === showExamCellPicker.examId)?.time?.split(' - ')[0] || '08:00'}
                                      onChange={(e) => {
                                        const row = localExamSchedule.find(r => r.id === showExamCellPicker.examId);
                                        const end = row?.time?.split(' - ')[1] || '10:00';
                                        setLocalExamSchedule(prev => prev.map(r => r.id === showExamCellPicker.examId ? { ...r, time: `${e.target.value} - ${end}` } : r));
                                      }}
                                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400">وقت الانتهاء</label>
                                    <input 
                                      type="time"
                                      value={localExamSchedule.find(r => r.id === showExamCellPicker.examId)?.time?.split(' - ')[1] || '10:00'}
                                      onChange={(e) => {
                                        const row = localExamSchedule.find(r => r.id === showExamCellPicker.examId);
                                        const start = row?.time?.split(' - ')[0] || '08:00';
                                        setLocalExamSchedule(prev => prev.map(r => r.id === showExamCellPicker.examId ? { ...r, time: `${start} - ${e.target.value}` } : r));
                                      }}
                                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700"
                                    />
                                  </div>
                                </div>
                                <button 
                                  onClick={() => setShowExamCellPicker(null)}
                                  className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold mt-2 shadow-lg shadow-emerald-600/20"
                                >
                                  حفظ الوقت
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
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
                          MySwal.fire({
                            title: 'تأكيد الإضافة',
                            text: `هل أنت متأكد من إضافة "${newGrade.trim()}"؟`,
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: 'نعم، أضف',
                            cancelButtonText: 'تراجع',
                            confirmButtonColor: '#10b981',
                            cancelButtonColor: '#64748b',
                            customClass: { popup: 'rounded-[2rem]', confirmButton: 'rounded-xl px-6 py-3 font-bold', cancelButton: 'rounded-xl px-6 py-3 font-bold' }
                          }).then((result) => {
                            if (result.isConfirmed) {
                              setGrades([...grades, newGrade.trim()]);
                              setNewGrade('');
                              MySwal.fire({
                                title: 'تمت الإضافة!',
                                text: 'تم إضافة المرحلة الدراسية بنجاح',
                                icon: 'success',
                                confirmButtonText: 'حسناً',
                                timer: 2000
                              });
                            }
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
                          MySwal.fire({
                            title: 'تأكيد الإضافة',
                            text: `هل أنت متأكد من إضافة "${newYear.trim()}"؟`,
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: 'نعم، أضف',
                            cancelButtonText: 'تراجع',
                            confirmButtonColor: '#10b981',
                            cancelButtonColor: '#64748b',
                            customClass: { popup: 'rounded-[2rem]', confirmButton: 'rounded-xl px-6 py-3 font-bold', cancelButton: 'rounded-xl px-6 py-3 font-bold' }
                          }).then((result) => {
                            if (result.isConfirmed) {
                              setAcademicYears([...academicYears, newYear.trim()]);
                              setNewYear('');
                              MySwal.fire({
                                title: 'تمت الإضافة!',
                                text: 'تم إضافة العام الدراسي بنجاح',
                                icon: 'success',
                                confirmButtonText: 'حسناً',
                                timer: 2000
                              });
                            }
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
                          MySwal.fire({
                            title: 'تأكيد الإضافة',
                            text: `هل أنت متأكد من إضافة "${newCategory.trim()}"؟`,
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: 'نعم، أضف',
                            cancelButtonText: 'تراجع',
                            confirmButtonColor: '#10b981',
                            cancelButtonColor: '#64748b',
                            customClass: { popup: 'rounded-[2rem]', confirmButton: 'rounded-xl px-6 py-3 font-bold', cancelButton: 'rounded-xl px-6 py-3 font-bold' }
                          }).then((result) => {
                            if (result.isConfirmed) {
                              setCategories([...categories, newCategory.trim()]);
                              setNewCategory('');
                              MySwal.fire({
                                title: 'تمت الإضافة!',
                                text: 'تم إضافة التصنيف بنجاح',
                                icon: 'success',
                                confirmButtonText: 'حسناً',
                                timer: 2000
                              });
                            }
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
                          MySwal.fire({
                            title: 'تأكيد الإضافة',
                            text: `هل أنت متأكد من إضافة "${newSection.trim()}"؟`,
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: 'نعم، أضف',
                            cancelButtonText: 'تراجع',
                            confirmButtonColor: '#10b981',
                            cancelButtonColor: '#64748b',
                            customClass: { popup: 'rounded-[2rem]', confirmButton: 'rounded-xl px-6 py-3 font-bold', cancelButton: 'rounded-xl px-6 py-3 font-bold' }
                          }).then((result) => {
                            if (result.isConfirmed) {
                              setSections([...sections, newSection.trim()]);
                              setNewSection('');
                              MySwal.fire({
                                title: 'تمت الإضافة!',
                                text: 'تم إضافة الشعبة بنجاح',
                                icon: 'success',
                                confirmButtonText: 'حسناً',
                                timer: 2000
                              });
                            }
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
                          MySwal.fire({
                            title: 'تأكيد الإضافة',
                            text: `هل أنت متأكد من إضافة "${newSubject.trim()}"؟`,
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: 'نعم، أضف',
                            cancelButtonText: 'تراجع',
                            confirmButtonColor: '#10b981',
                            cancelButtonColor: '#64748b',
                            customClass: { popup: 'rounded-[2rem]', confirmButton: 'rounded-xl px-6 py-3 font-bold', cancelButton: 'rounded-xl px-6 py-3 font-bold' }
                          }).then((result) => {
                            if (result.isConfirmed) {
                              setSubjects([...subjects, newSubject.trim()]);
                              setNewSubject('');
                              MySwal.fire({
                                title: 'تمت الإضافة!',
                                text: 'تم إضافة المادة الدراسية بنجاح',
                                icon: 'success',
                                confirmButtonText: 'حسناً',
                                timer: 2000
                              });
                            }
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

                {/* Grade-Subject Mapping Redesign */}
                <div className="md:col-span-2 pt-10 border-t border-slate-100 mt-10">
                  <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-emerald-500 rounded-full"></div>
                    ربط المواد بالصفوف الدراسية
                  </h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 mr-1">الصف الدراسي</label>
                      <ElegantDropdown 
                        options={grades}
                        value={managementSelectedGrade}
                        onChange={setManagementSelectedGrade}
                        widthClass="w-full"
                        noLabel
                      />
                    </div>
                    <div className="flex items-end">
                      <button 
                        onClick={() => {
                          setTempModalSubjects(gradeSubjects[managementSelectedGrade] || []);
                          setShowGradeSubjectModal(true);
                        }}
                        className="w-full bg-emerald-600 text-white px-4 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 h-[52px]"
                      >
                        <Plus className="w-5 h-5" />
                        إضافة مواد
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 border border-slate-100 rounded-[2rem] p-6 min-h-[120px]">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-bold text-slate-700">المواد المرتبطة بـ {managementSelectedGrade}</h5>
                      <span className="text-xs font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100">
                        {(gradeSubjects[managementSelectedGrade] || []).length} مواد
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {(gradeSubjects[managementSelectedGrade] || []).length > 0 ? (
                        (gradeSubjects[managementSelectedGrade] || []).map((s: string) => (
                          <div key={s} className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm group">
                            <span className="font-bold text-slate-600 text-sm">{s}</span>
                            <button 
                              onClick={() => {
                                MySwal.fire({
                                  title: 'تأكيد الحذف',
                                  text: `هل أنت متأكد من حذف مادة "${s}" من ${managementSelectedGrade}؟`,
                                  icon: 'warning',
                                  showCancelButton: true,
                                  confirmButtonText: 'نعم، احذف',
                                  cancelButtonText: 'تراجع',
                                  confirmButtonColor: '#ef4444',
                                  cancelButtonColor: '#64748b',
                                  customClass: { popup: 'rounded-[2rem]', confirmButton: 'rounded-xl px-6 py-3 font-bold', cancelButton: 'rounded-xl px-6 py-3 font-bold' }
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    const newSubjects = gradeSubjects[managementSelectedGrade].filter((sub: string) => sub !== s);
                                    setGradeSubjects({ ...gradeSubjects, [managementSelectedGrade]: newSubjects });
                                    MySwal.fire({
                                      title: 'تم الحذف!',
                                      text: 'تم حذف المادة بنجاح',
                                      icon: 'success',
                                      timer: 1500,
                                      showConfirmButton: false
                                    });
                                  }
                                });
                              }}
                              className="text-slate-300 hover:text-red-500 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="w-full py-8 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
                          <BookOpen className="w-8 h-8 mb-2 opacity-20" />
                          <p className="text-sm font-bold">لا توجد مواد مرتبطة بهذا الصف حالياً</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subject Selection Modal */}
                {showGradeSubjectModal && (
                  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden"
                    >
                      <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900">اختيار المواد</h3>
                          <p className="text-sm text-slate-500 font-bold mt-1">تحديد المواد الدراسية لـ {managementSelectedGrade}</p>
                        </div>
                        <button onClick={() => setShowGradeSubjectModal(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm border border-slate-100">
                          <X className="w-6 h-6 text-slate-400" />
                        </button>
                      </div>
                      
                      <div className="p-8">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                          {subjects.map((s: string) => {
                            const isSelected = tempModalSubjects.includes(s);
                            return (
                              <button
                                key={s}
                                onClick={() => {
                                  if (isSelected) {
                                    setTempModalSubjects(tempModalSubjects.filter(item => item !== s));
                                  } else {
                                    setTempModalSubjects([...tempModalSubjects, s]);
                                  }
                                }}
                                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-sm font-bold text-right ${
                                  isSelected 
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-2 ring-emerald-500/20' 
                                    : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                                }`}
                              >
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
                                  isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-200'
                                }`}>
                                  {isSelected && <Check className="w-4 h-4" />}
                                </div>
                                <span className="truncate">{s}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                      <button 
                        onClick={() => {
                          MySwal.fire({
                            title: 'تأكيد الحفظ',
                            text: `هل أنت متأكد من تحديث مواد ${managementSelectedGrade}؟`,
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: 'نعم، احفظ',
                            cancelButtonText: 'تراجع',
                            confirmButtonColor: '#10b981',
                            cancelButtonColor: '#64748b',
                            customClass: { popup: 'rounded-[2rem]', confirmButton: 'rounded-xl px-6 py-3 font-bold', cancelButton: 'rounded-xl px-6 py-3 font-bold' }
                          }).then((result) => {
                            if (result.isConfirmed) {
                              setGradeSubjects({
                                ...gradeSubjects,
                                [managementSelectedGrade]: tempModalSubjects
                              });
                              setShowGradeSubjectModal(false);
                              MySwal.fire({
                                title: 'تم الحفظ!',
                                text: `تم تحديث مواد ${managementSelectedGrade} بنجاح`,
                                icon: 'success',
                                confirmButtonText: 'حسناً',
                                timer: 2000
                              });
                            }
                          });
                        }}
                        className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                      >
                        تأكيد الاختيار
                      </button>
                        <button 
                          onClick={() => setShowGradeSubjectModal(false)}
                          className="flex-1 bg-white text-slate-600 py-4 rounded-2xl font-bold border border-slate-200 hover:bg-slate-50 transition-all"
                        >
                          إلغاء
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'seating':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h3 className="text-2xl font-bold text-slate-900">إدارة أرقام الجلوس</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <div className="relative w-full col-span-2 lg:col-span-1">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="بحث عن طالب..." 
                    value={seatingSearch}
                    onChange={(e) => setSeatingSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-12 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 text-sm h-[52px]"
                  />
                </div>
                <ElegantDropdown 
                  label="الصف"
                  options={grades}
                  value={selectedGradeFilter}
                  onChange={(val) => setSelectedGradeFilter(val)}
                  widthClass="w-full"
                />
                <ElegantDropdown 
                  label="الشعبة"
                  options={sections}
                  value={selectedSectionFilter}
                  onChange={(val) => setSelectedSectionFilter(val)}
                  widthClass="w-full"
                />
                <div className="flex items-end col-span-2 lg:col-span-1">
                  <button 
                    onClick={() => { setEditingItem({ name: '', grade: selectedGradeFilter, section: selectedSectionFilter, seatNumber: '' }); setIsAdding(true); setModalSubTab('basic'); }}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all w-full justify-center h-[52px] shadow-lg shadow-emerald-600/20"
                  >
                    <Plus className="w-5 h-5" />
                    إضافة رقم جلوس
                  </button>
                </div>
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
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <div className="relative w-full col-span-2 lg:col-span-1">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="بحث باسم الطالب أو الرقم..." 
                    value={parentPortalSearch}
                    onChange={(e) => setParentPortalSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-12 pl-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 text-sm h-[52px]"
                  />
                </div>
                <ElegantDropdown 
                  label="الصف"
                  options={grades}
                  value={selectedGradeFilter}
                  onChange={setSelectedGradeFilter}
                  widthClass="w-full"
                />
                <ElegantDropdown 
                  label="الشعبة"
                  options={sections}
                  value={selectedSectionFilter}
                  onChange={setSelectedSectionFilter}
                  widthClass="w-full"
                />
                <div className="flex items-end col-span-2 lg:col-span-1">
                  <button 
                    onClick={() => { setEditingItem({ id: '', name: '', grade: selectedGradeFilter, section: selectedSectionFilter, attendance: '0%', behavior: 'ممتاز', exams: [], attendanceDetails: [], feedback: [] }); setIsAdding(true); setModalSubTab('basic'); }}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all w-full justify-center h-[52px] shadow-lg shadow-emerald-600/20"
                  >
                    <Plus className="w-5 h-5" />
                    إضافة طالب
                  </button>
                </div>
              </div>
            </div>

            {/* Semester Selection Dropdown */}
            <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${selectedSemester === 1 ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">الفصل الدراسي المختار</p>
                  <p className="text-lg font-bold text-slate-700">إدارة بيانات {selectedSemester === 1 ? 'الفصل الدراسي الأول' : 'الفصل الدراسي الثاني'}</p>
                </div>
              </div>
              <div className="flex p-1 bg-slate-100 rounded-2xl">
                {[
                  { id: 1, name: 'الفصل الأول' },
                  { id: 2, name: 'الفصل الثاني' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSemester(s.id)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedSemester === s.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {Object.entries(parentPortalData).filter(([id, data]: any) => 
                (data.name.toLowerCase().includes(parentPortalSearch.toLowerCase()) || id.includes(parentPortalSearch)) &&
                (!data.grade || data.grade === selectedGradeFilter) &&
                (!data.section || data.section === selectedSectionFilter)
              ).map(([id, data]: any) => (
                <div key={id} className="bg-white p-6 rounded-3xl border border-slate-100 flex justify-between items-center group hover:shadow-md transition-all">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-600">
                      {data.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{data.name}</h4>
                      <p className="text-sm text-slate-500">رقم الطالب: {id} • {data.grade} ({data.section})</p>
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
        exams: data.exams || [],
        attendanceDetails: data.attendanceDetails || [],
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
                            options={gradeSubjects[editingItem.grade] || subjects}
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
                    <div className="grid md:grid-cols-1 gap-6">
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
                    <div className="flex flex-col gap-4">
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
                          <div>
                            <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">نسبة الحضور الإجمالية</label>
                            <input type="text" value={editingItem.attendance} onChange={(e) => setEditingItem({...editingItem, attendance: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="95%" required />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">تقييم السلوك</label>
                            <input type="text" value={editingItem.behavior} onChange={(e) => setEditingItem({...editingItem, behavior: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="ممتاز" required />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Results Tab */}
                    {modalSubTab === 'results' && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                          <div>
                            <h4 className="font-bold text-slate-900">نتائج {selectedSemester === 1 ? 'الفصل الأول' : 'الفصل الثاني'}</h4>
                            <p className="text-xs text-slate-400 font-bold mt-1">إدارة نتائج الامتحانات</p>
                          </div>
                          <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm border border-slate-100">
                            {[1, 2].map(s => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setSelectedSemester(s)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedSemester === s ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                              >
                                الفصل {s === 1 ? 'الأول' : 'الثاني'}
                              </button>
                            ))}
                          </div>
                          <button type="button" onClick={() => {
                            // Initialize results with filtered subjects
                            const initialResults = (gradeSubjects[editingItem.grade] || subjects).map((s: string) => ({ subject: s, score: 0, total: 100 }));
                            const newExams = [...(editingItem.exams || []), { 
                              id: Date.now().toString(), 
                              semester: selectedSemester, 
                              type: 'monthly', 
                              month: 'أكتوبر', 
                              results: initialResults 
                            }];
                            setEditingItem({...editingItem, exams: newExams});
                            setEditingExamIdx(newExams.length - 1);
                          }} className="bg-emerald-600 text-white px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20">
                            <Plus className="w-4 h-4" />
                            إضافة امتحان جديد
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {(editingItem.exams || [])
                            .map((exam: any, originalIdx: number) => ({ ...exam, originalIdx }))
                            .filter((exam: any) => exam.semester === selectedSemester)
                            .map((exam: any) => (
                            <div key={exam.id} className="bg-slate-50 rounded-[2rem] border border-slate-100 overflow-hidden">
                              <div className="p-6 flex flex-wrap items-center justify-between gap-4 bg-white border-b border-slate-100">
                                <div className="flex items-center gap-4">
                                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${exam.semester === 1 ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                    {exam.semester}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-slate-900 text-lg">
                                        {exam.type === 'monthly' ? `امتحان شهر ${exam.month}` : `امتحان نهاية الفصل ${exam.semester === 1 ? 'الأول' : 'الثاني'}`}
                                      </span>
                                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${exam.type === 'monthly' ? 'bg-amber-50 text-amber-600' : 'bg-purple-50 text-purple-600'}`}>
                                        {exam.type === 'monthly' ? 'شهري' : 'نهائي'}
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-400 font-bold">{exam.results.length} مواد مضافة لهذا الامتحان</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button type="button" onClick={() => setEditingExamIdx(editingExamIdx === exam.originalIdx ? null : exam.originalIdx)} className={`p-3 rounded-xl transition-all ${editingExamIdx === exam.originalIdx ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                                    <Edit2 className="w-5 h-5" />
                                  </button>
                                  <button type="button" onClick={() => {
                                    const newExams = (editingItem.exams || []).filter((_: any, i: number) => i !== exam.originalIdx);
                                    setEditingItem({...editingItem, exams: newExams});
                                    if (editingExamIdx === exam.originalIdx) setEditingExamIdx(null);
                                  }} className="p-3 bg-red-50 text-red-400 hover:bg-red-100 rounded-xl transition-all">
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>

                              {editingExamIdx === exam.originalIdx && (
                                <div className="p-6 space-y-8 animate-in slide-in-from-top-4 duration-500">
                                  <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">نوع الامتحان</label>
                                      <div className="flex p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                                        {[
                                          { id: 'monthly', name: 'شهري' },
                                          { id: 'final', name: 'نهائي' }
                                        ].map(t => (
                                          <button 
                                            key={t.id} 
                                            type="button" 
                                            onClick={() => {
                                              const newExams = [...editingItem.exams];
                                              newExams[exam.originalIdx].type = t.id;
                                              setEditingItem({...editingItem, exams: newExams});
                                            }} 
                                            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${exam.type === t.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
                                          >
                                            {t.name}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    {exam.type === 'monthly' && (
                                      <div className="space-y-3">
                                        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">اختيار الشهر</label>
                                        <button 
                                          type="button" 
                                          onClick={() => setShowMonthlyTestMonthPicker(exam.originalIdx)} 
                                          className="w-full text-right px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 flex items-center justify-between hover:border-emerald-500 transition-all group shadow-sm"
                                        >
                                          <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                              <Calendar className="w-4 h-4 text-emerald-600" />
                                            </div>
                                            <span>{exam.month}</span>
                                          </div>
                                          <ChevronLeft className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                                        </button>
                                      </div>
                                    )}
                                  </div>

                                  <div className="space-y-4">
                                    <div>
                                      <h5 className="text-lg font-bold text-slate-900">نتائج المواد الدراسية</h5>
                                      <p className="text-xs text-slate-400 font-bold">أدخل درجات الطالب لكل مادة في هذا الامتحان</p>
                                    </div>
                                    
                                    <div className="bg-white rounded-3xl border border-slate-100 overflow-x-auto shadow-sm">
                                      <table className="w-full text-right min-w-[600px]">
                                        <thead className="bg-slate-50 border-b border-slate-100">
                                          <tr>
                                            <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">المادة الدراسية</th>
                                            <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">الدرجة</th>
                                            <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">المجموع</th>
                                            <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">الإجراءات</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                          {exam.results.map((res: any, resIdx: number) => (
                                            <tr key={resIdx} className="hover:bg-slate-50/50 transition-colors">
                                              <td className="p-4">
                                                <button type="button" onClick={() => setShowResultSubjectPicker({ examIdx: exam.originalIdx, resultIdx: resIdx })} className="flex items-center justify-between w-full text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors">
                                                  <span>{res.subject || 'اختر المادة'}</span>
                                                  <Edit2 className="w-3 h-3 opacity-30" />
                                                </button>
                                              </td>
                                              <td className="p-4">
                                                <input 
                                                  type="number" 
                                                  value={res.score} 
                                                  onChange={(e) => {
                                                    const newExams = [...editingItem.exams];
                                                    newExams[exam.originalIdx].results[resIdx].score = Number(e.target.value);
                                                    setEditingItem({...editingItem, exams: newExams});
                                                  }} 
                                                  className="w-20 mx-auto bg-slate-100 border-none rounded-xl px-3 py-2 text-sm font-black text-center outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-600" 
                                                />
                                              </td>
                                              <td className="p-4">
                                                <input 
                                                  type="number" 
                                                  value={res.total} 
                                                  onChange={(e) => {
                                                    const newExams = [...editingItem.exams];
                                                    newExams[exam.originalIdx].results[resIdx].total = Number(e.target.value);
                                                    setEditingItem({...editingItem, exams: newExams});
                                                  }} 
                                                  className="w-20 mx-auto bg-slate-100 border-none rounded-xl px-3 py-2 text-sm font-black text-center outline-none focus:ring-2 focus:ring-emerald-500 text-slate-400" 
                                                />
                                              </td>
                                              <td className="p-4 text-center">
                                                <button type="button" onClick={() => {
                                                  const newExams = [...editingItem.exams];
                                                  newExams[exam.originalIdx].results = newExams[exam.originalIdx].results.filter((_: any, i: number) => i !== resIdx);
                                                  setEditingItem({...editingItem, exams: newExams});
                                                }} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all">
                                                  <Trash2 className="w-4 h-4" />
                                                </button>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                      <button 
                                        type="button" 
                                        onClick={() => {
                                          const newExams = [...editingItem.exams];
                                          newExams[exam.originalIdx].results = [...newExams[exam.originalIdx].results, { subject: '', score: 0, total: 100 }];
                                          setEditingItem({...editingItem, exams: newExams});
                                          setShowResultSubjectPicker({ examIdx: exam.originalIdx, resultIdx: newExams[exam.originalIdx].results.length - 1 });
                                        }} 
                                        className="w-full py-4 bg-slate-50 text-slate-500 text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-all border-t border-slate-100"
                                      >
                                        <Plus className="w-4 h-4" /> إضافة مادة إضافية
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                          
                          {(editingItem.exams || []).filter((e: any) => e.semester === selectedSemester).length === 0 && (
                            <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-slate-200/50">
                                <Trophy className="w-10 h-10 text-slate-200" />
                              </div>
                              <h5 className="text-xl font-bold text-slate-800 mb-2">لا توجد نتائج لهذا الفصل</h5>
                              <p className="text-slate-400 max-w-xs mx-auto text-sm">ابدأ بإضافة نتائج الامتحانات الشهرية أو النهائية للفصل الدراسي {selectedSemester === 1 ? 'الأول' : 'الثاني'}</p>
                              <button type="button" onClick={() => {
                                const initialResults = subjects.map((s: string) => ({ subject: s, score: 0, total: 100 }));
                                const newExams = [...(editingItem.exams || []), { 
                                  id: Date.now().toString(), 
                                  semester: selectedSemester, 
                                  type: 'monthly', 
                                  month: 'أكتوبر', 
                                  results: initialResults 
                                }];
                                setEditingItem({...editingItem, exams: newExams});
                                setEditingExamIdx(newExams.length - 1);
                              }} className="mt-8 bg-white text-emerald-600 border-2 border-emerald-100 px-8 py-3 rounded-2xl font-bold text-sm hover:bg-emerald-50 transition-all">
                                إضافة أول امتحان
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Attendance Tab */}
                    {modalSubTab === 'attendance' && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-slate-900">سجل الغياب لـ {selectedSemester === 1 ? 'الفصل الأول' : 'الفصل الثاني'}</h4>
                          <button type="button" onClick={() => {
                            const newDetails = [...(editingItem.attendanceDetails || []), { month: 'أكتوبر', present: 0, absent: 0, semester: selectedSemester }];
                            setEditingItem({...editingItem, attendanceDetails: newDetails});
                            setShowAttendanceMonthPicker(newDetails.length - 1);
                          }} className="bg-emerald-600 text-white px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20">
                            <Plus className="w-4 h-4" />
                            إضافة شهر جديد
                          </button>
                        </div>

                        <div className="space-y-4">
                          {(editingItem.attendanceDetails || [])
                            .map((att: any, originalIdx: number) => ({ ...att, originalIdx }))
                            .filter((att: any) => att.semester === selectedSemester)
                            .map((att: any) => (
                              <div key={att.originalIdx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-slate-400" />
                                  </div>
                                  <div>
                                    <h5 className="font-bold text-slate-900">{att.month}</h5>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">سجل حضور {selectedSemester === 1 ? 'الفصل الأول' : 'الفصل الثاني'}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-8">
                                  <div className="space-y-1">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase text-center">أيام الحضور</label>
                                    <input type="number" value={att.present} onChange={(e) => {
                                      const newDetails = [...editingItem.attendanceDetails];
                                      newDetails[att.originalIdx].present = Number(e.target.value);
                                      setEditingItem({...editingItem, attendanceDetails: newDetails});
                                    }} className="w-20 bg-emerald-50 border-none rounded-xl px-3 py-2 text-sm font-black text-center outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-600" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase text-center">أيام الغياب</label>
                                    <input type="number" value={att.absent} onChange={(e) => {
                                      const newDetails = [...editingItem.attendanceDetails];
                                      newDetails[att.originalIdx].absent = Number(e.target.value);
                                      setEditingItem({...editingItem, attendanceDetails: newDetails});
                                    }} className="w-20 bg-red-50 border-none rounded-xl px-3 py-2 text-sm font-black text-center outline-none focus:ring-2 focus:ring-red-500 text-red-600" />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button type="button" onClick={() => setShowAttendanceMonthPicker(att.originalIdx)} className="p-3 bg-slate-50 text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
                                      <Edit2 className="w-5 h-5" />
                                    </button>
                                    <button type="button" onClick={() => {
                                      const newDetails = (editingItem.attendanceDetails || []).filter((_: any, i: number) => i !== att.originalIdx);
                                      setEditingItem({...editingItem, attendanceDetails: newDetails});
                                    }} className="p-3 bg-red-50 text-red-400 hover:bg-red-100 rounded-xl transition-all">
                                      <Trash2 className="w-5 h-5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}

                          {(editingItem.attendanceDetails || []).filter((att: any) => att.semester === selectedSemester).length === 0 && (
                            <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-slate-200/50">
                                <ClipboardList className="w-10 h-10 text-slate-200" />
                              </div>
                              <h5 className="text-xl font-bold text-slate-800 mb-2">لا يوجد سجل حضور لهذا الفصل</h5>
                              <p className="text-slate-400 max-w-xs mx-auto text-sm">ابدأ بإضافة سجل الحضور والغياب الشهري للفصل الدراسي {selectedSemester === 1 ? 'الأول' : 'الثاني'}</p>
                              <button type="button" onClick={() => {
                                const newDetails = [...(editingItem.attendanceDetails || []), { month: 'أكتوبر', present: 0, absent: 0, semester: selectedSemester }];
                                setEditingItem({...editingItem, attendanceDetails: newDetails});
                                setShowAttendanceMonthPicker(newDetails.length - 1);
                              }} className="mt-8 bg-white text-emerald-600 border-2 border-emerald-100 px-8 py-3 rounded-2xl font-bold text-sm hover:bg-emerald-50 transition-all">
                                إضافة سجل حضور
                              </button>
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

      {/* Monthly Test Month Picker Modal */}
      {showMonthlyTestMonthPicker !== null && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">اختر الشهر</h3>
            <div className="grid grid-cols-3 gap-3">
              {['أكتوبر', 'نوفمبر', 'ديسمبر', 'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'].map((month) => (
                <button
                  key={month}
                  onClick={() => {
                    const newExams = [...(editingItem.exams || [])];
                    if (newExams[showMonthlyTestMonthPicker]) {
                      newExams[showMonthlyTestMonthPicker].month = month;
                      setEditingItem({...editingItem, exams: newExams});
                    }
                    setShowMonthlyTestMonthPicker(null);
                  }}
                  className="p-3 rounded-xl border border-slate-100 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all font-bold text-sm text-slate-600"
                >
                  {month}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowMonthlyTestMonthPicker(null)}
              className="w-full mt-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
            >
              إلغاء
            </button>
          </motion.div>
        </div>
      )}

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
                    {(gradeSubjects[editingItem.grade] || subjects || []).map((subject) => (
                      <button
                        key={subject}
                        onClick={() => {
                          const { examIdx, resultIdx } = showResultSubjectPicker;
                          const newExams = [...(editingItem.exams || [])];
                          if (newExams[examIdx] && newExams[examIdx].results[resultIdx]) {
                            newExams[examIdx].results[resultIdx].subject = subject;
                            setEditingItem({...editingItem, exams: newExams});
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

  const getExamTotal = (exam: any) => (exam.results || []).reduce((acc: number, r: any) => acc + (r.score || 0), 0);
  
  const semester1Exams = result ? (result.exams || []).filter((e: any) => e.semester === 1) : [];
  const semester2Exams = result ? (result.exams || []).filter((e: any) => e.semester === 2) : [];

  const semester1MonthlyTotal = semester1Exams.filter((e: any) => e.type === 'monthly').reduce((acc, e) => acc + getExamTotal(e), 0);
  const semester1FinalScore = semester1Exams.find((e: any) => e.type === 'final') ? getExamTotal(semester1Exams.find((e: any) => e.type === 'final')) : 0;

  const semester2MonthlyTotal = semester2Exams.filter((e: any) => e.type === 'monthly').reduce((acc, e) => acc + getExamTotal(e), 0);
  const semester2FinalScore = semester2Exams.find((e: any) => e.type === 'final') ? getExamTotal(semester2Exams.find((e: any) => e.type === 'final')) : 0;

  const finalTotal = semester1MonthlyTotal + semester1FinalScore + semester2MonthlyTotal + semester2FinalScore;

  const hasSemester1Final = semester1Exams.some((e: any) => e.type === 'final');

  const [expandedMonths, setExpandedMonths] = useState<string[]>([]);
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
                      <span className="text-emerald-400 font-black">{result.attendance}</span>
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
                      const attendance = (result.attendanceDetails || []).find((a: any) => a.month === monthName && a.semester === 1);
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
                                <span className="block text-[10px] text-slate-500 mb-1">الغياب</span>
                                <span className={`font-black text-2xl ${attendance?.absent > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                                  {attendance?.absent || 0}
                                </span>
                              </div>
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5">
                                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                              </div>
                            </div>
                          </div>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                {/* Subjects List for this month */}
                                <div className="p-6 bg-black/20">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {(exam.results || []).map((res: any, idx: number) => (
                                      <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 shadow-sm">
                                        <div className="flex items-center gap-3">
                                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                          <span className="text-sm font-bold text-slate-200">{res.subject}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <div className="text-right">
                                            <span className="text-lg font-black text-white block leading-none">{res.score}</span>
                                            <span className="text-[10px] text-slate-500 font-bold uppercase">من {res.total}</span>
                                          </div>
                                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                            <span className="text-[10px] font-black text-emerald-500">
                                              {Math.round((res.score / res.total) * 100)}%
                                            </span>
                                          </div>
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

                  {hasSemester1Final && (
                    <div className="p-8 bg-gradient-to-br from-emerald-600/20 to-emerald-900/20 border border-emerald-500/30 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="text-center sm:text-right">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-500 text-[10px] font-bold uppercase mb-3">
                          <Trophy className="w-3 h-3" />
                          امتحان نصف العام
                        </div>
                        <h4 className="text-2xl font-black text-white">نتيجة الفصل الأول</h4>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-5xl font-black text-emerald-500 drop-shadow-lg">
                          {semester1FinalScore}
                        </div>
                        <div className="h-12 w-px bg-white/10 hidden sm:block"></div>
                        <div className="text-slate-400 text-xs font-bold leading-tight hidden sm:block">
                          درجة <br /> الفصل الأول
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Semester 2 Section - Only visible after midterm is added */}
                {hasSemester1Final && (
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
                        const attendance = (result.attendanceDetails || []).find((a: any) => a.month === monthName && a.semester === 2);
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
                                  <span className="block text-[10px] text-slate-500 mb-1">الغياب</span>
                                  <span className={`font-black text-2xl ${attendance?.absent > 0 ? 'text-red-400' : 'text-blue-400'}`}>
                                    {attendance?.absent || 0}
                                  </span>
                                </div>
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5">
                                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                </div>
                              </div>
                            </div>
                            
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  {/* Subjects List for this month */}
                                  <div className="p-6 bg-black/20">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      {(exam.results || []).map((res: any, idx: number) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                          <span className="text-sm text-slate-300">{res.subject}</span>
                                          <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-white">{res.score}</span>
                                            <span className="text-[10px] text-slate-500">/ {res.total}</span>
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
                      
                      {/* Placeholder if no data for semester 2 yet */}
                      {semester2Exams.length === 0 && (
                        <div className="p-10 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                          <p className="text-slate-500 text-sm">بانتظار بدء تقييمات الفصل الدراسي الثاني</p>
                        </div>
                      )}
                    </div>

                    {semester2Exams.find((e: any) => e.type === 'final') && (
                      <div className="p-8 bg-gradient-to-br from-blue-600/20 to-blue-900/20 border border-blue-500/30 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-center sm:text-right">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full text-blue-500 text-[10px] font-bold uppercase mb-3">
                            <Trophy className="w-3 h-3" />
                            امتحان نهاية العام
                          </div>
                          <h4 className="text-2xl font-black text-white">نتيجة الفصل الثاني</h4>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-5xl font-black text-blue-500 drop-shadow-lg">
                            {semester2FinalScore}
                          </div>
                          <div className="h-12 w-px bg-white/10 hidden sm:block"></div>
                          <div className="text-slate-400 text-xs font-bold leading-tight hidden sm:block">
                            درجة <br /> الفصل الثاني
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Final Total Calculation Section - Only visible after midterm is added */}
                {hasSemester1Final && (
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 sm:p-10">
                    <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                      <Trophy className="text-emerald-500" />
                      المجموع النهائي للسنة الدراسية
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-center">
                        <span className="text-slate-500 text-xs block mb-2 uppercase tracking-wider">الفصل الأول (شهري + نهائي)</span>
                        <span className="text-3xl font-black text-emerald-500">{semester1MonthlyTotal + semester1FinalScore}</span>
                      </div>
                      <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-center">
                        <span className="text-slate-500 text-xs block mb-2 uppercase tracking-wider">الفصل الثاني (شهري + نهائي)</span>
                        <span className="text-3xl font-black text-blue-500">{semester2MonthlyTotal + semester2FinalScore}</span>
                      </div>
                      <div className="p-6 bg-gradient-to-br from-emerald-600/20 to-blue-600/20 rounded-3xl border border-emerald-500/30 text-center">
                        <span className="text-white/80 text-xs block mb-2 uppercase tracking-wider font-bold">المجموع الكلي</span>
                        <span className="text-4xl font-black text-white">{finalTotal}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Teacher Feedback */}
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 sm:p-10">
                  <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                    <MessageSquare className="text-emerald-500" />
                    ملاحظات الهيئة التدريسية
                  </h3>
                  <div className="space-y-4">
                    {(result.feedback || []).map((f: any, idx: number) => (
                      <div key={idx} className="bg-white/5 p-6 rounded-2xl border-r-4 border-emerald-500">
                        <h4 className="font-bold text-emerald-400 mb-2 text-sm">{f.teacher}</h4>
                        <p className="text-slate-300 text-sm leading-relaxed italic">"{f.comment}"</p>
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
    'الصف الأول',
    'الصف الثاني',
    'الصف الثالث',
    'الصف الرابع',
    'الصف الخامس',
    'الصف السادس',
    'الصف السابع',
    'الصف الثامن',
    'الصف التاسع',
    'الأول ثانوي',
    'الثاني ثانوي',
    'الثالث ثانوي'
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
  const [gradeSubjects, setGradeSubjects] = useState(INITIAL_GRADE_SUBJECTS);
  const [grades, setGrades] = useState([
    'الصف الأول',
    'الصف الثاني',
    'الصف الثالث',
    'الصف الرابع',
    'الصف الخامس',
    'الصف السادس',
    'الصف السابع',
    'الصف الثامن',
    'الصف التاسع',
    'الأول ثانوي',
    'الثاني ثانوي',
    'الثالث ثانوي'
  ]);
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
            gradeSubjects={gradeSubjects} setGradeSubjects={setGradeSubjects}
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
