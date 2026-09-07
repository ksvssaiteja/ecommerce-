import React, { useEffect, useState } from 'react';
import { Shoe, CartItem, TabType, NotificationItem, AuthUser } from './types';
import { SHOES, NOTIFICATIONS } from './data/shoes';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { CatalogScreen } from './components/CatalogScreen';
import { CartScreen } from './components/CartScreen';
import { WishlistScreen } from './components/WishlistScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ProductModal } from './components/ProductModal';
import { NotificationsModal } from './components/NotificationsModal';
import { LoginScreen } from './components/LoginScreen';
import { AdminScreen } from './components/AdminScreen';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const savedUser = localStorage.getItem('shoemart-user');
      const parsedUser = savedUser ? (JSON.parse(savedUser) as AuthUser) : null;
      return parsedUser?.email && parsedUser.role && parsedUser.token ? parsedUser : null;
    } catch {
      localStorage.removeItem('shoemart-user');
      return null;
    }
  });
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [shoes] = useState<Shoe[]>(SHOES);
  const [catalogShoes, setCatalogShoes] = useState<Shoe[]>(SHOES);

  // Initial cart state with 2 items matching the screenshot badge count "2"
  const [cart, setCart] = useState<CartItem[]>([
    {
      shoe: SHOES[0], // AeroGlide Pro Runner
      selectedSize: 9,
      selectedColor: SHOES[0].colors[0],
      quantity: 1,
    },
    {
      shoe: SHOES[2], // Air Cloud Strider
      selectedSize: 8,
      selectedColor: SHOES[2].colors[0],
      quantity: 1,
    },
  ]);

  const [wishlistIds, setWishlistIds] = useState<string[]>(['urban-monarch-high']);
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleLogin = (loggedInUser: AuthUser) => {
    localStorage.setItem('shoemart-user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setActiveTab('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('shoemart-user');
    setUser(null);
  };

  useEffect(() => {
    let isCurrent = true;

    fetch('/api/shoes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load catalog');
        }
        return response.json() as Promise<Shoe[]>;
      })
      .then((loadedShoes) => {
        if (isCurrent && Array.isArray(loadedShoes)) {
          setCatalogShoes(loadedShoes);
        }
      })
      .catch(() => {
        // The bundled catalog remains available when the API is offline.
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleWishlist = (shoeId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(shoeId);
      if (exists) {
        showToast('Removed from Wishlist');
        return prev.filter((id) => id !== shoeId);
      } else {
        showToast('Added to Wishlist ❤️');
        return [...prev, shoeId];
      }
    });
  };

  const handleAddToCart = (shoe: Shoe, size: number, color: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.shoe.id === shoe.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            shoe,
            selectedSize: size,
            selectedColor: color,
            quantity: 1,
          },
        ];
      }
    });
    showToast(`${shoe.name} (UK ${size}) added to Cart!`);
  };

  const handleQuickAdd = (shoe: Shoe) => {
    const defaultSize = shoe.sizes[0] || 8;
    const defaultColor = shoe.colors[0] || 'Standard';
    handleAddToCart(shoe, defaultSize, defaultColor);
  };

  const handleClaimDeal = (shoe: Shoe) => {
    setSelectedShoe(shoe);
  };

  const handleInstantBuy = (shoe: Shoe, size: number, color: string) => {
    handleAddToCart(shoe, size, color);
    setSelectedShoe(null);
    setActiveTab('cart');
  };

  const handleUpdateQuantity = (shoeId: string, size: number, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.shoe.id === shoeId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (shoeId: string, size: number) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.shoe.id === shoeId && item.selectedSize === size)
      )
    );
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistShoes = catalogShoes.filter((s) => wishlistIds.includes(s.id));

  const handleShoeAdded = (shoe: Shoe) => {
    setCatalogShoes((currentShoes) => [...currentShoes, shoe]);
    setActiveTab('catalog');
    showToast(`${shoe.name} added to catalog`);
  };

  const handleShoeRemoved = (shoeId: string) => {
    setCatalogShoes((currentShoes) => currentShoes.filter((shoe) => shoe.id !== shoeId));
    setWishlistIds((currentIds) => currentIds.filter((id) => id !== shoeId));
    setSelectedShoe((currentShoe) => (currentShoe?.id === shoeId ? null : currentShoe));
    showToast('Product removed from catalog');
  };

  return (
    <div className="min-h-screen w-full bg-[#f1f4f8] text-[#191c1e] font-body selection:bg-[#ffdada] selection:text-[#920028]">
      <div className="w-full max-w-4xl min-h-screen mx-auto bg-[#f7f9fb] relative flex flex-col shadow-md">
        {/* Fixed Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          notifications={notifications}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          isAdmin={user.role === 'admin'}
          onLogout={handleLogout}
        />

        {/* Dynamic Screen View */}
        <main className="flex-1 w-full pb-20">
          {activeTab === 'home' && (
            <HomeScreen
              shoes={catalogShoes}
              onSelectShoe={(shoe) => setSelectedShoe(shoe)}
              onQuickAdd={handleQuickAdd}
              onClaimDeal={handleClaimDeal}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              setActiveTab={setActiveTab}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}

          {activeTab === 'catalog' && (
            <CatalogScreen
              shoes={catalogShoes}
              onSelectShoe={(shoe) => setSelectedShoe(shoe)}
              onQuickAdd={handleQuickAdd}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}

          {activeTab === 'cart' && (
            <CartScreen
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              setActiveTab={setActiveTab}
              onSelectShoe={(shoe) => setSelectedShoe(shoe)}
            />
          )}

          {activeTab === 'wishlist' && (
            <WishlistScreen
              wishlistShoes={wishlistShoes}
              onToggleWishlist={handleToggleWishlist}
              onSelectShoe={(shoe) => setSelectedShoe(shoe)}
              onAddToCart={handleQuickAdd}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'profile' && <ProfileScreen />}

          {activeTab === 'admin' && user.role === 'admin' && (
            <AdminScreen
              shoes={catalogShoes}
              authToken={user.token}
              onShoeAdded={handleShoeAdded}
              onShoeRemoved={handleShoeRemoved}
              onSessionExpired={handleLogout}
            />
          )}
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cartCount={totalCartCount}
          wishlistCount={wishlistIds.length}
          isAdmin={user.role === 'admin'}
        />

        {/* Product Modal Drawer */}
        <ProductModal
          shoe={selectedShoe}
          onClose={() => setSelectedShoe(null)}
          onAddToCart={(shoe, size, color) => handleAddToCart(shoe, size, color)}
          onInstantBuy={handleInstantBuy}
          isWishlisted={selectedShoe ? wishlistIds.includes(selectedShoe.id) : false}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* Notifications Modal */}
        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onMarkAllRead={handleMarkAllNotificationsRead}
        />

        {/* Global Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl backdrop-blur flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
