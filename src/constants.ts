import { Student, Event, ScheduleItem, ExamScheduleItem, Post, SeatingItem, SocialLink } from './types';

export const DAYS = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
export const PERIODS = ['الحصة الأولى', 'الحصة الثانية', 'الحصة الثالثة', 'الحصة الرابعة', 'الحصة الخامسة', 'الحصة السادسة', 'الحصة السابعة'];

export const INITIAL_SUBJECTS = [
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

export const INITIAL_SOCIAL_LINKS: SocialLink[] = [
  { id: '1', name: 'Twitter', url: 'https://twitter.com' },
  { id: '2', name: 'Instagram', url: 'https://instagram.com' },
  { id: '3', name: 'Facebook', url: 'https://facebook.com' },
  { id: '4', name: 'LinkedIn', url: 'https://linkedin.com' }
];

export const INITIAL_GRADE_SUBJECTS: Record<string, string[]> = {
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

export const INITIAL_STUDENTS: Student[] = [
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

export const INITIAL_EVENTS: Event[] = [
  { id: '1', date: '2026-03-15', title: 'بداية اختبارات منتصف الفصل', type: 'academic' },
  { id: '2', date: '2026-03-22', title: 'يوم النشاط الطلابي المفتوح', type: 'activity' },
  { id: '3', date: '2026-04-01', title: 'إجازة عيد الفطر المبارك', type: 'holiday' },
  { id: '4', date: '2026-04-10', title: 'عودة الدراسة بعد الإجازة', type: 'academic' },
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  { id: '1', day: 'السبت', p1: 'رياضيات', p2: 'علوم', p3: 'لغة عربية', p4: 'إنجليزي', p5: 'تربية إسلامية', p6: '-', p7: '-', grade: 'الصف السادس الابتدائي', section: 'أ' },
  { id: '2', day: 'الأحد', p1: 'لغة عربية', p2: 'رياضيات', p3: 'إنجليزي', p4: 'علوم', p5: 'اجتماعيات', p6: '-', p7: '-', grade: 'الصف السادس الابتدائي', section: 'أ' },
  { id: '3', day: 'الاثنين', p1: 'علوم', p2: 'إنجليزي', p3: 'رياضيات', p4: 'لغة عربية', p5: 'حاسب آلي', p6: '-', p7: '-', grade: 'الصف السادس الابتدائي', section: 'أ' },
  { id: '4', day: 'الثلاثاء', p1: 'رياضيات', p2: 'لغة عربية', p3: 'علوم', p4: 'تربية إسلامية', p5: 'إنجليزي', p6: '-', p7: '-', grade: 'الصف السادس الابتدائي', section: 'أ' },
  { id: '5', day: 'الأربعاء', p1: 'لغة عربية', p2: 'علوم', p3: 'رياضيات', p4: 'اجتماعيات', p5: 'إنجليزي', p6: '-', p7: '-', grade: 'الصف السادس الابتدائي', section: 'أ' },
  { id: '6', day: 'الخميس', p1: 'علوم', p2: 'إنجليزي', p3: 'رياضيات', p4: 'لغة عربية', p5: 'حاسب آلي', p6: '-', p7: '-', grade: 'الصف السادس الابتدائي', section: 'أ' },
];

export const INITIAL_EXAM_SCHEDULE: ExamScheduleItem[] = [
  { id: '1', type: 'monthly', subject: 'الرياضيات', time: '09:00 - 10:30', date: '2026-04-05', day: 'الأحد', grade: 'الصف السادس الابتدائي', section: 'أ' },
  { id: '2', type: 'midterm', subject: 'اللغة العربية', time: '08:30 - 10:30', date: '2026-05-10', day: 'الاثنين', grade: 'الصف السادس الابتدائي', section: 'أ' },
  { id: '3', type: 'final', subject: 'العلوم', time: '08:00 - 11:00', date: '2026-06-15', day: 'الثلاثاء', grade: 'الصف السادس الابتدائي', section: 'أ' },
];

export const EXAM_TYPES = [
  { id: 'monthly', name: 'شهرية' },
  { id: 'midterm', name: 'نصف العام' },
  { id: 'final', name: 'نهاية العام' }
];

export const INITIAL_POSTS: Post[] = [
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

export const INITIAL_SEATING_DATA: SeatingItem[] = [
  { id: '101', name: 'أحمد محمد علي', grade: 'الصف السادس', section: 'أ', seatNumber: '601' },
  { id: '102', name: 'سارة خالد حسن', grade: 'الصف السادس', section: 'أ', seatNumber: '602' },
  { id: '103', name: 'عمر ياسين', grade: 'الصف السادس', section: 'أ', seatNumber: '603' },
  { id: '104', name: 'ياسر عمار', grade: 'الصف السادس', section: 'ب', seatNumber: '621' },
  { id: '105', name: 'نورة السبيعي', grade: 'الصف السادس', section: 'ب', seatNumber: '622' },
  { id: '106', name: 'يوسف إبراهيم', grade: 'الصف الخامس', section: 'أ', seatNumber: '501' },
  { id: '107', name: 'مريم عبدالله', grade: 'الصف الخامس', section: 'أ', seatNumber: '502' },
];

export const PARENT_PORTAL_MOCK_DATA: any = {
  '12345': {
    name: 'أحمد محمد علي',
    grade: 'الصف السادس',
    section: 'أ',
    attendance: '98%',
    behavior: 'ممتاز',
    exams: [
      {
        id: 'e1',
        semester: 1,
        type: 'monthly',
        month: 'أكتوبر',
        present: 20,
        absent: 1,
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
        present: 19,
        absent: 2,
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
        present: 21,
        absent: 0,
        results: [
          { subject: 'رياضيات', score: 96, total: 100 },
          { subject: 'لغة عربية', score: 94, total: 100 },
          { subject: 'علوم', score: 95, total: 100 },
          { subject: 'لغة إنجليزية', score: 92, total: 100 },
        ]
      }
    ],
    feedback: [
      { teacher: 'أ. محمد (الرياضيات)', comment: 'أحمد طالب متميز جداً، لديه قدرة استثنائية على حل المسائل المعقدة بسرعة.' },
      { teacher: 'أ. سارة (اللغة العربية)', comment: 'تحسن ملحوظ في مهارات الكتابة الإبداعية، يحتاج فقط للتركيز أكثر على قواعد النحو.' },
      { teacher: 'أ. خالد (العلوم)', comment: 'مشارك فعال في التجارب المخبرية، يظهر شغفاً كبيراً بالاكتشاف.' }
    ]
  }
};
