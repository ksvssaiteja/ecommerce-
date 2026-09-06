import React, { useState, useEffect } from 'react';
import {
  Search,
  Camera,
  Mic,
  Clock,
  ArrowRight,
  ChevronRight,
  Heart,
  Star,
  Bolt,
  Plus,
  SlidersHorizontal,
  ShieldCheck,
  RefreshCw,
  Truck,
  Check
} from 'lucide-react';
import { Shoe, TabType } from '../types';
import { BRAND_ASSETS } from '../data/shoes';

interface HomeScreenProps {
  shoes: Shoe[];
  onSelectShoe: (shoe: Shoe) => void;
  onQuickAdd: (shoe: Shoe) => void;
  onClaimDeal: (shoe: Shoe) => void;
  wishlistIds: string[];
  onToggleWishlist: (shoeId: string) => void;
  setActiveTab: (tab: TabType) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  shoes,
  onSelectShoe,
  onQuickAdd,
  onClaimDeal,
  wishlistIds,
  onToggleWishlist,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
}) => {
  // Countdown Timer: 08h : 24m : 15s as seen in the screenshot
  const [secondsTotal, setSecondsTotal] = useState<number>(8 * 3600 + 24 * 60 + 15);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchNotification, setSearchNotification] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsTotal((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSecs % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSecs % 60).toString().padStart(2, '0');
    return `${hrs}h : ${mins}m : ${secs}s`;
  };

  const handleMicClick = () => {
    setSearchNotification('Listening for footwear voice search...');
    setTimeout(() => setSearchNotification(null), 2500);
  };

  const handleCameraClick = () => {
    setSearchNotification('Visual sneaker scanner activated');
    setTimeout(() => setSearchNotification(null), 2500);
  };

  const categories = [
    { label: 'All', value: 'All' },
    { label: '👟 Sneakers', value: 'Sneakers' },
    { label: '🏃 Running & Sports', value: 'Running & Sports' },
    { label: '👞 Formal', value: 'Formal' },
    { label: '🩴 Chappals', value: 'Chappals' },
    { label: "👠 Women's Heels", value: "Women's Heels" },
    { label: '🧒 Kids Kicks', value: 'Kids Kicks' },
  ];

  // Flash Steals
  const flashSteals = shoes.filter((s) => s.isFlashDeal);

  // Filtered shoes according to search query and category
  const filteredShoes = shoes.filter((shoe) => {
    const matchesCategory =
      selectedCategory === 'All' || shoe.category === selectedCategory;
    const matchesSearch =
      shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shoe.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (shoe.tag && shoe.tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Trending Kicks for home display (excluding or including regular items)
  const trendingKicks = filteredShoes.filter(s => !s.isFlashDeal).slice(0, 4);

  return (
    <div className="flex flex-col w-full pb-6">
      {/* Voice / Camera Toast Notification */}
      {searchNotification && (
        <div className="mx-4 mt-2 p-2.5 bg-slate-900 text-white text-xs font-medium rounded-xl flex items-center justify-between shadow-lg animate-in fade-in">
          <span>{searchNotification}</span>
          <Check className="w-4 h-4 text-emerald-400" />
        </div>
      )}

      {/* Search Module */}
      <section className="px-4 pt-3 pb-2">
        <div className="relative flex items-center bg-white rounded-full shadow-sm border border-slate-100 px-4 py-2.5">
          <Search className="w-5 h-5 text-[#e11d48] shrink-0 mr-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sneakers, formal, sports shoes..."
            className="w-full bg-transparent font-body text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 mr-2 font-medium"
            >
              Clear
            </button>
          )}
          <div className="flex items-center gap-1.5 shrink-0 text-slate-500">
            <button
              aria-label="Visual camera search"
              onClick={handleCameraClick}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
            >
              <Camera className="w-[18px] h-[18px]" />
            </button>
            <button
              aria-label="Voice search"
              onClick={handleMicClick}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
            >
              <Mic className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </section>

      {/* Hero Promo Banner */}
      <section className="px-4 py-2">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#e11d48] via-[#b80035] to-[#fd761a] text-white shadow-md">
          {/* Decorative background wing vector echo */}
          <div className="absolute -right-8 -top-8 w-44 h-44 opacity-15 pointer-events-none">
            <svg
              className="w-full h-full text-white"
              fill="currentColor"
              viewBox="0 0 100 100"
            >
              <path d="M10,80 Q30,20 85,15 Q65,40 50,50 Q75,35 90,45 Q50,70 30,75 Z" />
            </svg>
          </div>

          <div className="p-4 flex flex-col justify-between relative z-10">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="bg-white/20 backdrop-blur-md text-white font-body text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold">
                Limited Drop
              </span>
              {/* Dynamic Countdown Chip */}
              <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                <Clock className="w-3.5 h-3.5 text-white" />
                <span
                  id="promo-timer"
                  className="font-body text-[11px] font-bold text-white tracking-tight"
                >
                  {formatCountdown(secondsTotal)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0 pr-1">
                <h2 className="font-display text-[26px] font-extrabold leading-tight text-white drop-shadow-sm">
                  SPRING KICK FEST
                </h2>
                <p className="font-body text-[14px] text-white/95 font-medium mt-0.5">
                  Up to <span className="font-bold text-[#ffdbca]">40% OFF</span> on speedrunners
                </p>
                <div className="mt-4">
                  <button
                    id="shop-collection-banner-btn"
                    onClick={() => {
                      setSelectedCategory('Running & Sports');
                      setActiveTab('catalog');
                    }}
                    className="bg-white text-[#b80035] hover:bg-slate-50 font-body text-xs px-4 py-2 rounded-lg font-bold shadow-sm active:scale-95 transition-transform flex items-center gap-1.5"
                  >
                    <span>Shop Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                onClick={() => {
                  const heroShoe = shoes.find((s) => s.id === 'spring-kick-fest-drop') || shoes[0];
                  onSelectShoe(heroShoe);
                }}
                className="relative w-32 h-28 shrink-0 cursor-pointer"
              >
                <img
                  alt="Spring Kick Fest limited drop speedrunner"
                  className="w-full h-full object-contain filter drop-shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-300"
                  src={BRAND_ASSETS.heroShoe}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Category Pills */}
      <section className="py-2.5">
        <div className="flex items-center gap-2 overflow-x-auto px-4 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`shrink-0 px-4 py-2 rounded-full font-body text-xs font-semibold shadow-sm transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Flash Deal Carousel Section */}
      <section className="pt-2 pb-4">
        <div className="px-4 flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-[#e11d48]"></span>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Flash Steals
            </h3>
            <span className="bg-[#ffdada] text-[#920028] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              ⚡ 2h Left
            </span>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('Running & Sports');
              setActiveTab('catalog');
            }}
            className="font-body text-xs text-[#b80035] hover:text-[#920028] font-bold flex items-center"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto px-4 no-scrollbar snap-x">
          {flashSteals.map((shoe) => {
            const isWish = wishlistIds.includes(shoe.id);
            return (
              <div
                key={shoe.id}
                className="snap-start shrink-0 w-[240px] bg-white rounded-2xl border border-slate-100 shadow-sm p-3 flex flex-col justify-between relative group hover:shadow-md transition-shadow"
              >
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 z-10 bg-[#e11d48] text-white font-body text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                  {shoe.discountPercentage}% OFF
                </div>

                {/* Wishlist Button */}
                <button
                  aria-label="Add to wishlist"
                  onClick={() => onToggleWishlist(shoe.id)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm text-slate-500 flex items-center justify-center hover:text-[#e11d48] transition-colors shadow-xs"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWish ? 'fill-[#e11d48] text-[#e11d48]' : ''
                    }`}
                  />
                </button>

                {/* Image Stage */}
                <div
                  onClick={() => onSelectShoe(shoe)}
                  className="relative w-full h-36 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden mb-2.5 cursor-pointer"
                >
                  <img
                    alt={shoe.alt}
                    src={shoe.image}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info Block */}
                <div>
                  <span className="font-body text-[11px] uppercase tracking-wide text-[#b80035] font-bold block mb-0.5">
                    {shoe.brand}
                  </span>
                  <h4
                    onClick={() => onSelectShoe(shoe)}
                    className="font-body text-sm font-semibold text-slate-900 truncate cursor-pointer hover:text-[#b80035]"
                  >
                    {shoe.name}
                  </h4>

                  <div className="flex items-center gap-1.5 my-1">
                    <div className="flex items-center gap-0.5 bg-[#ffdbca] text-[#341100] text-[11px] font-bold px-1.5 py-0.5 rounded">
                      <Star className="w-3 h-3 fill-[#fd761a] text-[#fd761a]" />
                      <span>{shoe.rating}</span>
                    </div>

                    {shoe.stockAlert && (
                      <span className="text-[11px] text-rose-600 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                        {shoe.stockAlert}
                      </span>
                    )}

                    {shoe.soldCount && (
                      <span className="text-[11px] text-slate-500 font-medium">
                        {shoe.soldCount}
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-display text-base font-bold text-slate-900">
                      ₹{shoe.price.toLocaleString('en-IN')}
                    </span>
                    {shoe.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{shoe.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Claim Deal Button */}
                <button
                  id={`claim-deal-${shoe.id}`}
                  onClick={() => onClaimDeal(shoe)}
                  className="mt-3 w-full bg-[#b80035] hover:bg-[#920028] text-white py-2 rounded-xl font-body text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-[0_4px_12px_-2px_rgba(225,29,72,0.3)]"
                >
                  <Bolt className="w-4 h-4" />
                  <span>Claim Deal</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trending Kicks Grid */}
      <section className="px-4 pt-2 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900">
              Trending Kicks
            </h3>
            <p className="font-body text-xs text-slate-500">
              Curated must-haves for your daily stride
            </p>
          </div>
          <button
            onClick={() => setActiveTab('catalog')}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-slate-100 text-slate-600 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {trendingKicks.map((shoe) => {
            const isWish = wishlistIds.includes(shoe.id);
            return (
              <div
                key={shoe.id}
                className="bg-white rounded-2xl border border-slate-100 p-2.5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative group"
              >
                {/* Optional Tag badge */}
                {shoe.tag && (
                  <div
                    className={`absolute top-3 left-3 z-10 text-[11px] font-bold px-2 py-0.5 rounded ${
                      shoe.tag === 'Leather'
                        ? 'bg-[#ffdbca] text-[#341100]'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {shoe.tag}
                  </div>
                )}

                {/* Wishlist toggle */}
                <button
                  aria-label="Favorite item"
                  onClick={() => onToggleWishlist(shoe.id)}
                  className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm text-slate-400 flex items-center justify-center hover:text-[#e11d48] transition-colors shadow-xs"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWish ? 'fill-[#e11d48] text-[#e11d48]' : ''
                    }`}
                  />
                </button>

                {/* Square Product Canvas */}
                <div
                  onClick={() => onSelectShoe(shoe)}
                  className="w-full aspect-square bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center mb-2 cursor-pointer"
                >
                  <img
                    alt={shoe.alt}
                    src={shoe.image}
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
                    <span className="font-body text-[11px] text-slate-400">
                      ({shoe.reviewCount})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2.5 pt-1 border-t border-slate-50">
                    <div>
                      <span className="font-display text-sm font-bold text-slate-900">
                        ₹{shoe.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      id={`quick-add-${shoe.id}`}
                      aria-label="Quick add size"
                      onClick={() => onQuickAdd(shoe)}
                      className="w-8 h-8 rounded-lg bg-[#e11d48] hover:bg-[#b80035] text-white flex items-center justify-center active:scale-90 transition-transform shadow-[0_3px_10px_-1px_rgba(225,29,72,0.4)]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Value Props Banner */}
      <section className="px-4 py-2 mb-2">
        <div className="bg-slate-100/80 rounded-2xl p-4 flex flex-col gap-3.5 border border-slate-200/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ffdada] flex items-center justify-center shrink-0 text-[#b80035]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-body text-xs font-bold text-slate-900">
                100% Authentic Guaranteed
              </h4>
              <p className="font-body text-[11px] text-slate-500">
                Sourced directly from verified master craftsmen & brands
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ffdbca] flex items-center justify-center shrink-0 text-[#9d4300]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-body text-xs font-bold text-slate-900">
                7-Day Easy Exchange
              </h4>
              <p className="font-body text-[11px] text-slate-500">
                Hassle-free doorstep pickup & instantaneous size swap
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0 text-slate-700">
              <Truck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-body text-xs font-bold text-slate-900">
                Free Fast Shipping
              </h4>
              <p className="font-body text-[11px] text-slate-500">
                Complimentary express shipping on all orders over ₹1,499
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
