import React, { useState } from 'react';
import { CheckCircle2, ImagePlus, PackagePlus, ShieldCheck, Trash2 } from 'lucide-react';
import { Shoe } from '../types';

interface AdminScreenProps {
  shoes: Shoe[];
  authToken: string;
  onShoeAdded: (shoe: Shoe) => void;
  onShoeRemoved: (shoeId: string) => void;
  onSessionExpired: () => void;
}

type Category = Shoe['category'];

const categories: Category[] = ['Sneakers', 'Running & Sports', 'Formal', "Women's Heels", 'Kids Kicks', 'Chappals'];

export const AdminScreen: React.FC<AdminScreenProps> = ({ shoes, authToken, onShoeAdded, onShoeRemoved, onSessionExpired }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Sunitha Original');
  const [category, setCategory] = useState<Category>('Chappals');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [image, setImage] = useState('');
  const [sizes, setSizes] = useState('6, 7, 8, 9, 10');
  const [colors, setColors] = useState('Black, Brown');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setName('');
    setPrice('');
    setOriginalPrice('');
    setImage('');
    setDescription('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsSaving(true);
    const id = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const numericPrice = Number(price);
    const numericOriginalPrice = originalPrice ? Number(originalPrice) : undefined;

    const newShoe: Shoe = {
      id,
      name: name.trim(),
      brand: brand.trim(),
      category,
      price: numericPrice,
      originalPrice: numericOriginalPrice,
      rating: 0,
      reviewCount: 0,
      image: image.trim(),
      alt: `${name.trim()} product image`,
      description: description.trim() || `New ${category.toLowerCase()} from ${brand.trim()}.`,
      sizes: sizes.split(',').map((size) => Number(size.trim())).filter((size) => Number.isFinite(size)),
      colors: colors.split(',').map((color) => color.trim()).filter(Boolean),
      specs: {
        cushioning: 'Everyday comfort footbed',
        upper: 'Durable crafted material',
        sole: 'Flexible non-slip outsole',
        weight: 'Standard fit',
      },
    };

    if (!newShoe.id || !newShoe.name || !Number.isFinite(numericPrice) || numericPrice <= 0 || !newShoe.image || !newShoe.sizes.length || !newShoe.colors.length) {
      setError('Enter a valid product name, selling price, image, sizes, and colors.');
      setIsSaving(false);
      return;
    }

    if (numericOriginalPrice !== undefined && (!Number.isFinite(numericOriginalPrice) || numericOriginalPrice <= 0 || numericOriginalPrice < numericPrice)) {
      setError('Original price must be greater than or equal to selling price.');
      setIsSaving(false);
      return;
    }

    try {
      const response = await fetch('/api/shoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        body: JSON.stringify(newShoe),
      });
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 403) {
          onSessionExpired();
          return;
        }
        throw new Error(result.error || 'Unable to save product');
      }
      onShoeAdded(result as Shoe);
      setMessage(`${newShoe.name} was added to the catalog.`);
      resetForm();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save product');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemove = async (shoe: Shoe) => {
    if (!window.confirm(`Remove ${shoe.name} from the catalog?`)) {
      return;
    }

    setError('');
    setMessage('');
    try {
      const response = await fetch(`/api/shoes/${encodeURIComponent(shoe.id)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!response.ok) {
        if (response.status === 403) {
          onSessionExpired();
          return;
        }
        const result = await response.json();
        throw new Error(result.error || 'Unable to remove product');
      }
      onShoeRemoved(shoe.id);
      setMessage(`${shoe.name} was removed from the catalog.`);
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : 'Unable to remove product');
    }
  };

  return (
    <div className="w-full px-4 py-5 pb-10 space-y-5">
      <section className="rounded-3xl bg-slate-900 p-5 text-white shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-rose-300">Admin workspace</p>
            <h1 className="font-display mt-1 text-2xl font-bold">Manage catalog</h1>
            <p className="mt-1 text-sm text-slate-300">Add shoes, chappals, and new footwear to the live store.</p>
          </div>
          <ShieldCheck className="h-7 w-7 shrink-0 text-emerald-400" />
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-300">
          <PackagePlus className="h-4 w-4 text-rose-300" />
          {shoes.length} products currently in catalog
        </div>
      </section>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <ImagePlus className="h-5 w-5 text-[#b80035]" />
          <h2 className="font-display text-lg font-bold text-slate-900">Add product</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block"><span className="field-label">Product name</span><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Classic Leather Chappal" className="field-input" /></label>
          <label className="block"><span className="field-label">Brand</span><input required value={brand} onChange={(event) => setBrand(event.target.value)} className="field-input" /></label>
          <label className="block"><span className="field-label">Category</span><select value={category} onChange={(event) => setCategory(event.target.value as Category)} className="field-input">{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="block"><span className="field-label">Selling price (₹)</span><input required type="number" min="1" step="1" inputMode="numeric" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="1299" className="field-input" /></label>
          <label className="block"><span className="field-label">Original price (₹)</span><input type="number" min={price || '1'} step="1" inputMode="numeric" value={originalPrice} onChange={(event) => setOriginalPrice(event.target.value)} placeholder="1999" className="field-input" /><span className="mt-1 block text-[11px] text-slate-400">Must be equal to or higher than selling price.</span></label>
          <label className="block"><span className="field-label">Image URL</span><input required type="url" value={image} onChange={(event) => setImage(event.target.value)} placeholder="https://..." className="field-input" /></label>
        </div>

        <label className="block"><span className="field-label">Sizes, comma separated</span><input required value={sizes} onChange={(event) => setSizes(event.target.value)} className="field-input" /></label>
        <label className="block"><span className="field-label">Colors, comma separated</span><input required value={colors} onChange={(event) => setColors(event.target.value)} className="field-input" /></label>
        <label className="block"><span className="field-label">Description</span><textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} placeholder="Comfortable everyday footwear..." className="field-input resize-none" /></label>

        {error && <p className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">{error}</p>}
        {message && <p className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700"><CheckCircle2 className="h-4 w-4" />{message}</p>}

        <button type="submit" disabled={isSaving} className="w-full rounded-xl bg-[#b80035] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#920028] disabled:opacity-60">
          {isSaving ? 'Saving product...' : 'Add to catalog'}
        </button>
      </form>

      <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-bold text-slate-900">Current products</h2>
          <span className="text-xs font-semibold text-slate-500">{shoes.length} total</span>
        </div>
        <div className="space-y-2">
          {shoes.map((shoe) => (
            <div key={shoe.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-2.5">
              <img src={shoe.image} alt={shoe.alt} className="h-12 w-12 rounded-xl bg-slate-50 object-contain p-1" referrerPolicy="no-referrer" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-slate-900">{shoe.name}</p>
                <p className="text-[11px] text-slate-500">{shoe.category} · ₹{shoe.price.toLocaleString('en-IN')}</p>
              </div>
              <button type="button" onClick={() => handleRemove(shoe)} aria-label={`Remove ${shoe.name}`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-rose-600 transition hover:bg-rose-50" title="Remove product">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
