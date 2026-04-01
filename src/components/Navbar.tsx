import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { School, Menu, X, Home, Calendar, ClipboardList, UserCheck, Settings } from 'lucide-react';

const navLinks = [
  { name: 'الرئيسية', id: 'home', icon: Home },
  { name: 'التقويم والجدول', id: 'schedule', icon: Calendar },
  { name: 'أرقام الجلوس', id: 'seating', icon: ClipboardList },
  { name: 'بوابة الأهالي', id: 'parent-portal', icon: UserCheck },
  { name: 'لوحة التحكم', id: 'admin', icon: Settings },
];

interface NavbarProps {
  setView: (v: string) => void;
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ setView, currentView }) => {
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

export default Navbar;
