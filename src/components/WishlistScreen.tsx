import React from 'react';
import { Heart, ShoppingBag, Trash2, Star } from 'lucide-react';
import { Shoe, TabType } from '../types';

interface WishlistScreenProps {
  wishlistShoes: Shoe[];
  onToggleWishlist: (shoeId: string) => void;
  onSelectShoe: (shoe: Shoe) => void;
  onAddToCart: (shoe: Shoe) => void;
  setActiveTab: (tab: TabType) => void;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  wishlistShoes,
  onToggleWishlist,
  onSelectShoe,
  onAddToCart,
  setActiveTab,
}) => {
  if (wishlistShoes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h3 className="font-display font-bold text-xl text-slate-800">
          Your Wishlist is Empty
        </h3>
        <p className="text-xs text-slate-500 mt-1.5 max-w-xs">
          Tap the heart icon on any sneakers or formal shoes to save your favorites here.
        </p>
        <button
          onClick={() => setActiveTab('home')}
          className="mt-5 px-6 py-2.5 bg-[#b80035] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#920028]"
        >
          Explore Trending Kicks
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-8">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-display text-base font-bold text-slate-900">
          Saved Favorites ({wishlistShoes.length})
        </h3>
        <button
          onClick={() => setActiveTab('catalog')}
          className="text-xs font-bold text-[#b80035] hover:underline"
        >
          Browse More
        </button>
      </div>

      <div className="px-4 pt-3 grid grid-cols-2 gap-3">
        {wishlistShoes.map((shoe) => (
          <div
            key={shoe.id}
            className="bg-white rounded-2xl border border-slate-100 p-2.5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative group"
          >
            {/* Remove heart */}
            <button
              aria-label="Remove from wishlist"
              onClick={() => onToggleWishlist(shoe.id)}
              className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm text-[#e11d48] flex items-center justify-center hover:bg-rose-50 transition-colors shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            {/* Image Canvas */}
            <div
              onClick={() => onSelectShoe(shoe)}
              className="w-full aspect-square bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center mb-2 cursor-pointer"
            >
              <img
                src={shoe.image}
                alt={shoe.alt}
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="min-w-0">
              <span className="font-body text-[11px] uppercase font-bold text-[#b80035] tracking-tight block truncate">
                {shoe.brand}
              </span>
              <h4
                onClick={() => onSelectShoe(shoe)}
                className="font-body text-xs font-semibold text-slate-900 truncate mt-0.5 cursor-pointer hover:text-[#b80035]"
              >
                {shoe.name}
              </h4>

              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 fill-[#fd761a] text-[#fd761a]" />
                <span className="font-body text-[11px] font-bold text-slate-900">
                  {shoe.rating}
                </span>
              </div>

              <div className="mt-2 pt-1 border-t border-slate-50 flex items-center justify-between">
                <span className="font-display text-sm font-bold text-slate-900">
                  ₹{shoe.price.toLocaleString('en-IN')}
                </span>

                <button
                  id={`wishlist-move-to-bag-${shoe.id}`}
                  onClick={() => onAddToCart(shoe)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#b80035] text-white text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-transform shadow-xs"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>Bag</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
