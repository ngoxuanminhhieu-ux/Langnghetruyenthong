import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, User, Lock, Mail, Phone, ShieldCheck, ArrowRight } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, setUser, showToast, navigateTo } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: name || (email.includes('admin') ? 'Quản Trị Viên Chuôn Ngọ' : 'Nguyễn Minh Anh'),
      email: email || 'minhanh.heritage@gmail.com',
      phone: phone || '0988 123 456',
      address: 'Số 18 Tràng Tiền, Hoàn Kiếm, Hà Nội',
      role: email.includes('admin') ? 'admin' : 'customer'
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    showToast(`Đăng nhập thành công! Xin chào ${newUser.name}`);
    if (newUser.role === 'admin') {
      navigateTo('admin');
    }
  };

  const handleQuickDemo = (role) => {
    if (role === 'admin') {
      const adminUser = {
        name: 'Quản Trị Viên Chuôn Ngọ',
        email: 'admin@chuonngoheritage.vn',
        phone: '0988 123 456',
        address: 'Thôn Chuôn Ngọ, Chuyên Mỹ, Phú Xuyên, Hà Nội',
        role: 'admin'
      };
      setUser(adminUser);
      setIsAuthModalOpen(false);
      showToast('Đăng nhập thành công với quyền Quản Trị Viên (Admin)');
      navigateTo('admin');
    } else {
      const demoUser = {
        name: 'Nguyễn Minh Anh',
        email: 'minhanh.heritage@gmail.com',
        phone: '0988 123 456',
        address: 'Số 18 Tràng Tiền, Phường Tràng Tiền, Hoàn Kiếm, Hà Nội',
        role: 'customer'
      };
      setUser(demoUser);
      setIsAuthModalOpen(false);
      showToast('Đăng nhập thành công với tài khoản Khách Hàng');
      navigateTo('account');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FFFDF7] rounded-3xl overflow-hidden border border-[#B69A68] shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-[#17382D] text-[#D8C29D] mx-auto flex items-center justify-center border border-[#B69A68] mb-2">
            <User className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl text-[#17382D]">
            {isRegister ? 'Đăng ký tài khoản mới' : 'Đăng nhập Chuôn Ngọ'}
          </h3>
          <p className="text-xs text-gray-500">
            Quản lý đơn hàng, theo dõi nghệ nhân và lưu trữ Tem QR Passport
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {isRegister && (
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Họ và tên *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Minh Anh"
                className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email hoặc Tên đăng nhập *</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Mật khẩu *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-xl focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#17382D] hover:bg-[#294638] text-[#FFFDF7] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all mt-4"
          >
            <span>{isRegister ? 'Tạo tài khoản' : 'Đăng nhập'}</span>
            <ArrowRight className="w-4 h-4 text-[#D8C29D]" />
          </button>
        </form>

        {/* Demo fast-fill buttons */}
        <div className="pt-3 border-t border-[#E8DEC8] space-y-2">
          <span className="text-[11px] text-gray-400 block text-center">Thử nghiệm nhanh với tài khoản mẫu:</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('customer')}
              className="py-2 px-3 rounded-xl bg-[#F5F0E5] hover:bg-[#E8DEC8] text-xs font-semibold text-[#17382D] transition-colors"
            >
              Demo Khách hàng
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="py-2 px-3 rounded-xl bg-[#17382D] hover:bg-[#294638] text-xs font-semibold text-[#D8C29D] transition-colors"
            >
              Demo Quản trị (Admin)
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500">
          {isRegister ? (
            <span>Đã có tài khoản? <button onClick={() => setIsRegister(false)} className="text-[#17382D] font-bold underline">Đăng nhập</button></span>
          ) : (
            <span>Chưa có tài khoản? <button onClick={() => setIsRegister(true)} className="text-[#17382D] font-bold underline">Đăng ký ngay</button></span>
          )}
        </div>

      </div>
    </div>
  );
};

