export interface Student {
  id: string;
  name: string;
  grade: string;
  year: string;
  rank: number;
  image: string;
  score: string;
  achievements: string[];
}

export interface Event {
  id: string;
  date: string;
  title: string;
  type: string;
}

export interface ScheduleItem {
  id: string;
  day: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5: string;
  p6: string;
  p7: string;
  grade: string;
  section: string;
}

export interface ExamScheduleItem {
  id: string;
  type: string;
  subject: string;
  time: string;
  date: string;
  day: string;
  grade: string;
  section: string;
}

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export interface SeatingItem {
  id: string;
  name: string;
  grade: string;
  section: string;
  seatNumber: string;
}

export interface ExamResult {
  subject: string;
  score: number;
  total: number;
}

export interface StudentExam {
  id: string;
  semester: number;
  type: string;
  month?: string;
  present: number;
  absent: number;
  results: ExamResult[];
}

export interface TeacherFeedback {
  teacher: string;
  comment: string;
}

export interface ParentPortalStudentData {
  name: string;
  grade: string;
  section: string;
  attendance: string;
  behavior: string;
  exams: StudentExam[];
  feedback: TeacherFeedback[];
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}
