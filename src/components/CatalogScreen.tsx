import React, { useState } from 'react';
import { Search, Star, Heart, Plus, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Shoe } from '../types';

interface CatalogScreenProps {
  shoes: Shoe[];
  onSelectShoe: (shoe: Shoe) => void;
  onQuickAdd: (shoe: Shoe) => void;
  wishlistIds: string[];
  onToggleWishlist: (shoeId: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  shoes,
  onSelectShoe,
  onQuickAdd,
  wishlistIds,
  onToggleWishlist,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  const categories = ['All', 'Sneakers', 'Running & Sports', 'Formal', 'Chappals'];
  const brands = ['All', 'Sunitha SpeedLab', 'Sunitha Original'];

  // Filter and sort
  const filteredShoes = shoes
    .filter((shoe) => {
      const matchCat = selectedCategory === 'All' || shoe.category === selectedCategory;
      const matchBrand = selectedBrand === 'All' || shoe.brand === selectedBrand;
      const matchSize = selectedSize === null || shoe.sizes.includes(selectedSize);
      const matchSearch =
        shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shoe.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shoe.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchBrand && matchSize && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Search Header */}
      <div className="px-4 pt-3 pb-2 sticky top-16 bg-[#f7f9fb]/95 backdrop-blur z-20 border-b border-slate-100">
        <div className="relative flex items-center bg-white rounded-full border border-slate-200 px-3.5 py-2 shadow-sm">
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search catalog by silhouette, spec, or craft..."
            className="w-full bg-transparent font-body text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 font-medium"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Bar: Sizes and Sort */}
        <div className="flex items-center justify-between gap-2 pt-1 pb-1">
          {/* Size Pills */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[11px] font-bold text-slate-400 mr-1 shrink-0">SIZE:</span>
            {[6, 7, 8, 9, 10, 11].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                className={`w-7 h-7 rounded-lg text-[11px] font-bold shrink-0 transition-all ${
                  selectedSize === size
                    ? 'bg-[#e11d48] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 pt-3">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-500 font-medium">
          <span>Showing {filteredShoes.length} kicks</span>
          {selectedSize && (
            <span className="bg-rose-50 text-[#b80035] px-2 py-0.5 rounded-full font-bold">
              Filtered for UK {selectedSize}
            </span>
          )}
        </div>

        {filteredShoes.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm my-6">
            <SlidersHorizontal className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <h4 className="font-display font-bold text-base text-slate-800">
              No matching kicks found
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your category or size filter to see more styles.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSize(null);
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredShoes.map((shoe) => {
              const isWish = wishlistIds.includes(shoe.id);
              return (
                <div
                  key={shoe.id}
                  className="bg-white rounded-2xl border border-slate-100 p-2.5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative group"
                >
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                    {shoe.discountPercentage && (
                      <span className="bg-[#e11d48] text-white text-[10px] font-bold px-1.5 py-0.2 rounded shadow-xs">
                        {shoe.discountPercentage}% OFF
                      </span>
                    )}
                    {shoe.tag && (
                      <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                        {shoe.tag}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    aria-label="Wishlist"
                    onClick={() => onToggleWishlist(shoe.id)}
                    className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm text-slate-400 flex items-center justify-center hover:text-[#e11d48] transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWish ? 'fill-[#e11d48] text-[#e11d48]' : ''
                      }`}
                    />
                  </button>

                  {/* Image */}
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

                  {/* Info */}
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
                        {shoe.originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through block">
                            ₹{shoe.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <button
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
        )}
      </div>
    </div>
  );
};
