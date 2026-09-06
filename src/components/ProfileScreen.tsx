import React, { useState } from 'react';
import { BRAND_ASSETS } from '../data/shoes';
import {
  Package,
  RefreshCw,
  MapPin,
  CreditCard,
  Headphones,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Award
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const [exchangeModalOpen, setExchangeModalOpen] = useState(false);
  const [exchangeSubmitted, setExchangeSubmitted] = useState(false);
  const [exchangeReason, setExchangeReason] = useState('Need one size larger (Size 10)');

  const handleRequestExchange = (e: React.FormEvent) => {
    e.preventDefault();
    setExchangeSubmitted(true);
    setTimeout(() => {
      setExchangeSubmitted(false);
      setExchangeModalOpen(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Profile Header Card */}
      <div className="px-4 pt-4 pb-2">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-[#e11d48]/20 blur-2xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="relative">
              <img
                src={BRAND_ASSETS.avatar}
                alt="Sai Teja Profile"
                className="w-16 h-16 rounded-full object-cover ring-4 ring-[#e11d48]"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-bold text-lg text-white truncate">
                  K. S. V. Sai Teja
                </h3>
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
              </div>
              <p className="text-xs text-slate-300">ksvssaiteja@gmail.com</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="bg-[#e11d48] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  VIP Elite Tier
                </span>
                <span className="text-[11px] font-semibold text-amber-300">
                  1,420 Kinetic Pts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Tracking */}
      <div className="px-4 mt-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-500">
            Recent Footwear Orders
          </h4>
          <span className="text-xs font-bold text-[#b80035] cursor-pointer">
            View All (4)
          </span>
        </div>

        <div className="space-y-2.5">
          {/* Active Order */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-[#e11d48]">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">
                    AeroGlide Pro Runner (UK 9)
                  </h5>
                  <p className="text-[11px] text-slate-500">Order #SSM-84920 • ₹3,499</p>
                </div>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                In Transit
              </span>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">
                Arriving <strong>Tomorrow by 2:00 PM</strong>
              </span>
              <button
                onClick={() => setExchangeModalOpen(true)}
                className="text-xs font-bold text-[#b80035] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Exchange Size</span>
              </button>
            </div>
          </div>

          {/* Past Order */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">
                    Classic Oxford Derby (UK 8)
                  </h5>
                  <p className="text-[11px] text-slate-500">Order #SSM-77180 • ₹3,899</p>
                </div>
              </div>
              <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Delivered
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings / Quick Links */}
      <div className="px-4 mt-4">
        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
          Account & Logistics
        </h4>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100 overflow-hidden">
          <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-4 h-4 text-[#e11d48]" />
              <div>
                <h5 className="text-xs font-bold text-slate-800">7-Day Instant Doorstep Exchange</h5>
                <p className="text-[11px] text-slate-400">Swap size or fit in 1 tap</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-slate-600" />
              <div>
                <h5 className="text-xs font-bold text-slate-800">Saved Addresses</h5>
                <p className="text-[11px] text-slate-400">High-Tech City, Madhapur, Hyderabad</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-slate-600" />
              <div>
                <h5 className="text-xs font-bold text-slate-800">Payment Modes & UPI</h5>
                <p className="text-[11px] text-slate-400">Google Pay •••• 9823</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Headphones className="w-4 h-4 text-slate-600" />
              <div>
                <h5 className="text-xs font-bold text-slate-800">24/7 Footwear Concierge</h5>
                <p className="text-[11px] text-slate-400">Chat with Sunitha ShoeMart fit specialists</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Trust Footer */}
      <div className="px-6 py-4 mt-3 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#b80035]" />
          <span>Sunitha ShoeMart Official Brand Certified</span>
        </div>
      </div>

      {/* Doorstep Exchange Modal */}
      {exchangeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl animate-in zoom-in-95">
            <h4 className="font-display font-bold text-base text-slate-900">
              Doorstep Size Exchange Request
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Order #SSM-84920: AeroGlide Pro Runner
            </p>

            {exchangeSubmitted ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <h5 className="font-bold text-sm text-slate-900">Pickup Scheduled!</h5>
                <p className="text-xs text-slate-500 mt-1">
                  Our delivery executive will arrive tomorrow to swap your pair with size UK 10.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestExchange} className="mt-3 space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Select Exchange Reason:
                  </label>
                  <select
                    value={exchangeReason}
                    onChange={(e) => setExchangeReason(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#e11d48]"
                  >
                    <option>Need one size larger (Size 10)</option>
                    <option>Need one size smaller (Size 8)</option>
                    <option>Fit too tight on instep</option>
                    <option>Want different colorway</option>
                  </select>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl text-[11px] text-slate-600">
                  📍 Pickup address: Flat 402, High-Tech City, Hyderabad
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setExchangeModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#b80035] text-white text-xs font-bold shadow-md hover:bg-[#920028]"
                  >
                    Schedule Swap
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
