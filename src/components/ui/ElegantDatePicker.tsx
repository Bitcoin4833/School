import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronLeft, ChevronDown } from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  eachDayOfInterval, 
  parseISO
} from 'date-fns';
import { ar } from 'date-fns/locale';

const ElegantDatePicker = ({ 
  label, 
  value, 
  onChange, 
  events = [], 
  widthClass = "w-full" 
}: { 
  label?: string, 
  value: string, 
  onChange: (v: string) => void, 
  events?: any[], 
  widthClass?: string 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value ? parseISO(value) : new Date());
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

  const selectedDate = value ? parseISO(value) : null;

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-50">
        <button
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-slate-400 rotate-180" />
        </button>
        <span className="font-bold text-slate-700">
          {format(currentMonth, 'MMMM yyyy', { locale: ar })}
        </span>
        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-slate-400" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day, i) => (
          <div key={i} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest py-2">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    return (
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, i) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const dayEvents = events.filter(e => isSameDay(parseISO(e.date), day));
          
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                onChange(format(day, 'yyyy-MM-dd'));
                setIsOpen(false);
              }}
              className={`
                relative h-10 w-full flex flex-col items-center justify-center rounded-xl text-sm font-bold transition-all
                ${!isCurrentMonth ? 'text-slate-300' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'}
                ${isSelected ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white shadow-lg shadow-emerald-600/20' : ''}
              `}
            >
              <span>{format(day, 'd')}</span>
              {dayEvents.length > 0 && !isSelected && (
                <div className="absolute bottom-1.5 flex gap-0.5">
                  {dayEvents.slice(0, 3).map((e, idx) => (
                    <div 
                      key={idx} 
                      className={`w-1 h-1 rounded-full ${
                        e.type === 'holiday' ? 'bg-orange-400' : 
                        e.type === 'activity' ? 'bg-blue-400' : 'bg-emerald-400'
                      }`} 
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div ref={dropdownRef} className={`flex flex-col gap-2 ${widthClass} relative`}>
      {label && <span className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest text-right">{label}</span>}
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3.5 font-bold text-slate-700 hover:bg-slate-100 transition-all"
      >
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <span>{value ? format(parseISO(value), 'dd MMMM yyyy', { locale: ar }) : 'اختر التاريخ'}</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 sm:left-1/2 sm:-translate-x-1/2 w-[calc(100vw-2rem)] sm:w-full max-w-[340px] mt-2 bg-white border border-slate-100 rounded-3xl shadow-2xl z-50 overflow-hidden p-4"
          >
            {renderHeader()}
            <div className="p-2">
              {renderDays()}
              {renderCells()}
            </div>
            {events.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">أحداث قريبة</p>
                <div className="space-y-2">
                  {events
                    .filter(e => isSameMonth(parseISO(e.date), currentMonth))
                    .slice(0, 2)
                    .map((e, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${e.type === 'holiday' ? 'bg-orange-400' : e.type === 'activity' ? 'bg-blue-400' : 'bg-emerald-400'}`} />
                        <span className="text-slate-500 font-bold">{format(parseISO(e.date), 'dd MMM')}:</span>
                        <span className="text-slate-700 font-medium truncate">{e.title}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ElegantDatePicker;
