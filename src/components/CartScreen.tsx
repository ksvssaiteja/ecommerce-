import React, { useState } from 'react';
import { Trash2, Plus, Minus, Tag, ShieldCheck, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import { CartItem, Shoe, TabType } from '../types';

interface CartScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (shoeId: string, size: number, delta: number) => void;
  onRemoveItem: (shoeId: string, size: number) => void;
  onClearCart: () => void;
  setActiveTab: (tab: TabType) => void;
  onSelectShoe: (shoe: Shoe) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  setActiveTab,
  onSelectShoe,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.shoe.price * item.quantity, 0);
  const discount = Math.round((subtotal * appliedDiscountPercent) / 100);
  const shippingFee = subtotal > 1499 || subtotal === 0 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'SPRING40') {
      setAppliedDiscountPercent(40);
      setCouponMessage('SPRING40 applied! 40% discount activated.');
    } else if (couponCode.trim().toUpperCase() === 'SUNITHA10') {
      setAppliedDiscountPercent(10);
      setCouponMessage('SUNITHA10 applied! 10% member discount.');
    } else {
      setCouponMessage('Invalid promo code. Try "SPRING40" or "SUNITHA10".');
    }
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      onClearCart();
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 animate-bounce">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="font-display font-bold text-2xl text-slate-900">
          Order Confirmed!
        </h3>
        <p className="text-xs text-slate-500 max-w-xs mt-2">
          Thank you for shopping at Sunitha ShoeMart. Order #SSM-{Math.floor(100000 + Math.random() * 900000)} is preparing for dispatch.
        </p>
        <div className="mt-4 p-3 bg-slate-100 rounded-xl text-left w-full max-w-xs text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-500">Estimated Delivery:</span>
            <span className="font-bold text-slate-800">Tomorrow by 2:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Total Paid:</span>
            <span className="font-bold text-[#b80035]">₹{grandTotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Doorstep Exchange:</span>
            <span className="font-bold text-emerald-600">7 Days Eligible</span>
          </div>
        </div>
        <button
          onClick={() => {
            setOrderPlaced(false);
            setActiveTab('home');
          }}
          className="mt-6 px-6 py-2.5 bg-[#b80035] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#920028] transition-all"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h3 className="font-display font-bold text-xl text-slate-800">
          Your Cart is Empty
        </h3>
        <p className="text-xs text-slate-500 mt-1.5 max-w-xs">
          Explore our flash steals and fresh limited kicks to elevate your daily stride.
        </p>
        <button
          onClick={() => setActiveTab('home')}
          className="mt-5 px-6 py-2.5 bg-[#b80035] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#920028]"
        >
          Discover Kicks
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Top Banner Notice */}
      <div className="bg-[#ffdada]/60 border-b border-[#ffdada] px-4 py-2 text-[11px] text-[#920028] font-bold flex items-center justify-between">
        <span>⚡ Spring Kick Fest 40% OFF code: <strong>SPRING40</strong></span>
        <span>Free Express Delivery</span>
      </div>

      {/* Cart Items List */}
      <div className="px-4 pt-3 space-y-3">
        {cart.map((item) => (
          <div
            key={`${item.shoe.id}-${item.selectedSize}`}
            className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm flex gap-3 relative group"
          >
            {/* Thumbnail */}
            <div
              onClick={() => onSelectShoe(item.shoe)}
              className="w-20 h-20 bg-slate-50 rounded-xl p-1 shrink-0 flex items-center justify-center overflow-hidden cursor-pointer"
            >
              <img
                src={item.shoe.image}
                alt={item.shoe.alt}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Item Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-1">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#b80035]">
                      {item.shoe.brand}
                    </span>
                    <h4
                      onClick={() => onSelectShoe(item.shoe)}
                      className="text-xs font-bold text-slate-900 truncate hover:text-[#b80035] cursor-pointer"
                    >
                      {item.shoe.name}
                    </h4>
                  </div>
                  <button
                    aria-label="Remove item"
                    onClick={() => onRemoveItem(item.shoe.id, item.selectedSize)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                    Size: UK {item.selectedSize}
                  </span>
                  <span className="text-[10px] text-slate-500 truncate">
                    {item.selectedColor}
                  </span>
                </div>
              </div>

              {/* Price and Counter */}
              <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-50">
                <span className="font-display font-bold text-sm text-slate-900">
                  ₹{(item.shoe.price * item.quantity).toLocaleString('en-IN')}
                </span>

                <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-0.5">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => onUpdateQuantity(item.shoe.id, item.selectedSize, -1)}
                    className="w-6 h-6 rounded bg-white text-slate-700 flex items-center justify-center shadow-xs hover:bg-slate-50"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-slate-800 w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => onUpdateQuantity(item.shoe.id, item.selectedSize, 1)}
                    className="w-6 h-6 rounded bg-white text-slate-700 flex items-center justify-center shadow-xs hover:bg-slate-50"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Module */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#e11d48] shrink-0" />
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon (e.g. SPRING40)"
              className="flex-1 uppercase text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              onClick={handleApplyCoupon}
              className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Apply
            </button>
          </div>
          {couponMessage && (
            <p className="text-[11px] text-emerald-600 font-semibold mt-2">
              {couponMessage}
            </p>
          )}
        </div>
      </div>

      {/* Bill Breakdown */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-2.5">
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-500">
            Order Summary
          </h4>
          <div className="flex justify-between text-xs text-slate-600">
            <span>Bag Total ({cart.reduce((a, c) => a + c.quantity, 0)} items)</span>
            <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-xs text-emerald-600 font-semibold">
              <span>Festival Promo Discount</span>
              <span>-₹{discount.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="flex justify-between text-xs text-slate-600">
            <span>Express Doorstep Delivery</span>
            <span className="font-semibold text-emerald-600">
              {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
            </span>
          </div>

          <div className="border-t border-slate-100 pt-2 flex justify-between items-baseline">
            <span className="font-display font-bold text-sm text-slate-900">
              Grand Total
            </span>
            <span className="font-display font-extrabold text-lg text-[#b80035]">
              ₹{grandTotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Checkout Drawer or Action */}
      <div className="px-4 mt-4">
        {!isCheckingOut ? (
          <button
            id="proceed-to-checkout-btn"
            onClick={() => setIsCheckingOut(true)}
            className="w-full bg-[#b80035] hover:bg-[#920028] text-white py-3.5 rounded-xl font-body text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-[0_4px_16px_-2px_rgba(225,29,72,0.4)]"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-lg space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-bold text-sm text-slate-900">Delivery & Payment</h4>
              <button
                onClick={() => setIsCheckingOut(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Back
              </button>
            </div>

            {/* Address */}
            <div className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800 block">Deliver to: Sai Teja</span>
              <span className="text-slate-500 block mt-0.5">
                Flat 402, High-Tech City Road, Madhapur, Hyderabad, 500081
              </span>
              <span className="text-emerald-600 font-semibold block mt-1">
                Estimated Delivery: Tomorrow by 2 PM
              </span>
            </div>

            {/* Payment options */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Select Payment Mode</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2 rounded-xl border text-xs font-bold text-center transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#e11d48] bg-rose-50 text-[#b80035]'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  ⚡ Instant UPI
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2 rounded-xl border text-xs font-bold text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#e11d48] bg-rose-50 text-[#b80035]'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  💳 Card / Net
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-2 rounded-xl border text-xs font-bold text-center transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#e11d48] bg-rose-50 text-[#b80035]'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  💵 Cash on Del
                </button>
              </div>
            </div>

            <button
              id="confirm-pay-order-btn"
              onClick={handlePlaceOrder}
              className="w-full bg-[#b80035] hover:bg-[#920028] text-white py-3 rounded-xl font-body text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <span>Pay ₹{grandTotal.toLocaleString('en-IN')} & Place Order</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
