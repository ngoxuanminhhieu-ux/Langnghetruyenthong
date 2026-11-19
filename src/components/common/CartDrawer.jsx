import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, cartTotal, navigateTo } = useApp();

  if (!isCartOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  const deposit55 = Math.round(cartTotal * 0.55);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF7] shadow-2xl flex flex-col border-l border-[#B69A68]">
          
          {/* Header */}
          <div className="p-5 bg-[#17382D] text-[#FFFDF7] flex items-center justify-between border-b border-[#294638]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B69A68]" />
              <h3 className="font-serif font-bold text-base text-[#FFFDF7]">
                Giỏ hàng của bạn ({cart.length})
              </h3>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-[#294638] text-[#FFFDF7] hover:bg-[#3d6b53] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-gray-400 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-gray-300" />
                <p className="text-sm">Giỏ hàng của bạn đang trống</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-5 py-2 rounded-full bg-[#17382D] text-[#FFFDF7] text-xs font-semibold"
                >
                  Khám phá tác phẩm
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#E8DEC8] shadow-sm"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-gray-100 border border-[#E8DEC8] shrink-0"
                  />

                  <div className="flex-grow space-y-0.5">
                    <h4 className="font-serif text-xs font-bold text-[#17382D] line-clamp-1">
                      {item.product.name}
                    </h4>
                    <div className="text-xs font-bold text-[#17382D]">
                      {formatPrice(item.product.price)}
                    </div>
                    {item.customization?.note && (
                      <span className="text-[10px] text-[#B69A68] italic block line-clamp-1">
                        {item.customization.note}
                      </span>
                    )}

                    {/* Quantity Modifier */}
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex items-center border border-[#E8DEC8] rounded-md bg-[#F5F0E5]/60 text-xs">
                        <button
                          onClick={() => updateQuantity(idx, -1)}
                          className="px-2 py-0.5 font-bold hover:bg-white rounded"
                        >
                          -
                        </button>
                        <span className="px-2 font-bold text-[#17382D]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(idx, 1)}
                          className="px-2 py-0.5 font-bold hover:bg-white rounded"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(idx)}
                        className="text-gray-400 hover:text-red-500 p-1 text-[11px]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with SV Startup Deposit Info */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#F5F0E5]/60 border-t border-[#E8DEC8] space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Tổng tiền sản phẩm:</span>
                  <span className="font-medium text-gray-900">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-[#17382D] font-bold">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#B69A68]" />
                    Chỉ cần cọc trước 55%:
                  </span>
                  <span className="font-mono text-sm text-[#17382D]">{formatPrice(deposit55)}</span>
                </div>
                <div className="text-[10px] text-gray-500">
                  45% còn lại thanh toán khi nhận hàng & quét tem QR.
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('cart');
                }}
                className="w-full py-3.5 rounded-full bg-[#17382D] hover:bg-[#294638] text-[#FFFDF7] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Tiến hành thanh toán</span>
                <ArrowRight className="w-4 h-4 text-[#D8C29D]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

