import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, CheckCircle2, Info, MessageSquare } from 'lucide-react';

interface ElegantConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'success' | 'warning' | 'info';
}

const ElegantConfirmModal: React.FC<ElegantConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'تأكيد',
  cancelText = 'إلغاء',
  type = 'info'
}) => {
  const colors = {
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-red-200',
    success: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200',
    warning: 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200',
    info: 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-200'
  };

  const icons = {
    danger: <Trash2 className="w-8 h-8 text-red-500" />,
    success: <CheckCircle2 className="w-8 h-8 text-emerald-500" />,
    warning: <Info className="w-8 h-8 text-amber-500" />,
    info: <MessageSquare className="w-8 h-8 text-blue-500" />
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[2.5rem] shadow-2xl max-w-sm w-full p-8 text-center"
          >
            <div className="flex justify-center mb-6">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${
                type === 'danger' ? 'bg-red-50' : 
                type === 'success' ? 'bg-emerald-50' : 
                type === 'warning' ? 'bg-amber-50' : 'bg-blue-50'
              }`}>
                {icons[type]}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">{message}</p>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-4 rounded-2xl font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 transition-all duration-300"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`flex-1 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg ${colors[type]}`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ElegantConfirmModal;
