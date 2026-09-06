import React, { useState } from 'react';
import { X, Heart, Star, ShieldCheck, RefreshCw, Truck, Bolt, ShoppingBag } from 'lucide-react';
import { Shoe } from '../types';

interface ProductModalProps {
  shoe: Shoe | null;
  onClose: () => void;
  onAddToCart: (shoe: Shoe, size: number, color: string) => void;
  onInstantBuy: (shoe: Shoe, size: number, color: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (shoeId: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  shoe,
  onClose,
  onAddToCart,
  onInstantBuy,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!shoe) return null;

  const [selectedSize, setSelectedSize] = useState<number>(shoe.sizes[0] || 8);
  const [selectedColor, setSelectedColor] = useState<string>(shoe.colors[0] || 'Original');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = () => {
    setAddedAnimation(true);
    onAddToCart(shoe, selectedSize, selectedColor);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  const handleInstantBuy = () => {
    onInstantBuy(shoe, selectedSize, selectedColor);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10 animate-in slide-in-from-bottom-6 duration-300">
        {/* Header Bar with Close & Wishlist */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-slate-100 bg-white/80 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="font-body text-[11px] font-bold uppercase tracking-wider text-[#b80035] bg-[#ffdada] px-2.5 py-0.5 rounded-full">
              {shoe.brand}
            </span>
            {shoe.tag && (
              <span className="font-body text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                {shoe.tag}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              aria-label="Toggle wishlist"
              onClick={() => onToggleWishlist(shoe.id)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-[#e11d48] transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? 'fill-[#e11d48] text-[#e11d48]' : ''
                }`}
              />
            </button>
            <button
              aria-label="Close modal"
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-5 py-4 space-y-4">
          {/* Image Stage */}
          <div className="relative w-full h-56 bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center p-4 overflow-hidden shadow-inner">
            {shoe.discountPercentage && (
              <div className="absolute top-3 left-3 bg-[#e11d48] text-white font-body text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                {shoe.discountPercentage}% OFF
              </div>
            )}
            <img
              src={shoe.image}
              alt={shoe.alt}
              className="w-full h-full object-contain filter drop-shadow-lg transition-transform hover:scale-105 duration-300"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Title, Rating & Price */}
          <div>
            <h3 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
              {shoe.name}
            </h3>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <div className="flex items-center gap-1 bg-amber-50 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{shoe.rating}</span>
                <span className="text-slate-400">({shoe.reviewCount})</span>
              </div>
              {shoe.stockAlert && (
                <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                  {shoe.stockAlert}
                </span>
              )}
              {shoe.soldCount && (
                <span className="text-xs font-medium text-slate-500">
                  {shoe.soldCount}
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-2.5 mt-3">
              <span className="font-display text-2xl font-extrabold text-slate-900">
                ₹{shoe.price.toLocaleString('en-IN')}
              </span>
              {shoe.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ₹{shoe.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {shoe.originalPrice && (
                <span className="text-xs font-bold text-[#b80035] bg-rose-50 px-2 py-0.5 rounded">
                  Save ₹{(shoe.originalPrice - shoe.price).toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {shoe.description}
          </p>

          {/* Colorway Options */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Colorway: <span className="text-slate-900 normal-case font-semibold">{selectedColor}</span>
            </label>
            <div className="flex gap-2 flex-wrap">
              {shoe.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                    selectedColor === color
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Shoe Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Select Size (UK / India)
              </label>
              <span className="text-[11px] font-semibold text-[#b80035] cursor-pointer hover:underline">
                Size Guide
              </span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {[6, 7, 8, 9, 10, 11].map((size) => {
                const isAvailable = shoe.sizes.includes(size);
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    disabled={!isAvailable}
                    onClick={() => setSelectedSize(size)}
                    className={`h-11 rounded-xl text-sm font-bold flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-md scale-105 ring-2 ring-slate-900 ring-offset-1'
                        : isAvailable
                        ? 'bg-white border border-slate-200 text-slate-800 hover:border-slate-400'
                        : 'bg-slate-100 border border-slate-100 text-slate-300 cursor-not-allowed line-through'
                    }`}
                  >
                    <span>UK {size}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tech Specs Bento */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
              Kinetic Engineering Specs
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Cushioning</span>
                <span className="font-semibold text-slate-800">{shoe.specs.cushioning}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Upper Material</span>
                <span className="font-semibold text-slate-800">{shoe.specs.upper}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Traction Sole</span>
                <span className="font-semibold text-slate-800">{shoe.specs.sole}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Shoe Weight</span>
                <span className="font-semibold text-slate-800">{shoe.specs.weight}</span>
              </div>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 py-1 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-[#b80035] mb-1" />
              <span className="text-[10px] font-bold text-slate-700">100% Genuine</span>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="w-5 h-5 text-amber-600 mb-1" />
              <span className="text-[10px] font-bold text-slate-700">7-Day Swap</span>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="w-5 h-5 text-slate-600 mb-1" />
              <span className="text-[10px] font-bold text-slate-700">Express Free Ship</span>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 border-t border-slate-100 bg-white/95 backdrop-blur flex items-center gap-3">
          <button
            id="modal-add-to-cart-btn"
            onClick={handleAddToCart}
            className="flex-1 bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-50 py-3 rounded-xl font-body text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{addedAnimation ? 'Added to Bag!' : 'Add to Bag'}</span>
          </button>

          <button
            id="modal-instant-buy-btn"
            onClick={handleInstantBuy}
            className="flex-1 bg-[#e11d48] hover:bg-[#b80035] text-white py-3 rounded-xl font-body text-sm font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-[0_4px_16px_-2px_rgba(225,29,72,0.4)]"
          >
            <Bolt className="w-4 h-4" />
            <span>Instant Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
};
