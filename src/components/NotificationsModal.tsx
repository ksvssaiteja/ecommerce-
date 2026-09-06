import React from 'react';
import { X, Bell, Check, Sparkles, AlertCircle, Truck } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'deal':
        return <AlertCircle className="w-4 h-4 text-[#e11d48]" />;
      case 'drop':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'shipping':
        return <Truck className="w-4 h-4 text-emerald-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden mt-16 z-10 animate-in slide-in-from-top-4 border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#b80035]" />
            <h3 className="font-display font-bold text-sm text-slate-900">
              ShoeMart Alerts
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-[11px] font-bold text-[#b80035] hover:underline flex items-center gap-0.5"
            >
              <Check className="w-3 h-3" />
              <span>Mark Read</span>
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 p-1">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3 rounded-xl transition-colors flex gap-3 ${
                notif.unread ? 'bg-rose-50/40' : 'hover:bg-slate-50'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-xs border border-slate-100 flex items-center justify-center shrink-0">
                {getIcon(notif.type)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {notif.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                  {notif.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
