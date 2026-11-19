import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_WORKSHOPS,
  getStoredWorkshops, saveStoredWorkshops,
  getStoredSchedules, saveStoredSchedules,
  getStoredBookings, saveStoredBookings,
  getStoredReviews, saveStoredReviews,
  getStoredArtisans, saveStoredArtisans,
  WORKSHOP_STEPS,
  STUDENT_SHOWCASE
} from '../data/workshopData';
import { useApp } from './AppContext';
import confetti from 'canvas-confetti';

const WorkshopContext = createContext();

export const WorkshopProvider = ({ children }) => {
  const { showToast, user } = useApp();

  // Core Data States
  const [workshops, setWorkshops] = useState(getStoredWorkshops);
  const [schedules, setSchedules] = useState(getStoredSchedules);
  const [bookings, setBookings] = useState(getStoredBookings);
  const [reviews, setReviews] = useState(getStoredReviews);
  const [artisans, setArtisans] = useState(getStoredArtisans);

  // Active Views & Selections
  const [activeWorkshopId, setActiveWorkshopId] = useState(null);
  const [workshopTab, setWorkshopTab] = useState('list'); // 'list', 'calendar', 'artisans', 'reviews'
  
  // Modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingWorkshop, setBookingWorkshop] = useState(null);
  const [preselectedSchedule, setPreselectedSchedule] = useState(null);

  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [isArtisanModalOpen, setIsArtisanModalOpen] = useState(false);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Force reset if legacy stale cache is detected
  useEffect(() => {
    if (workshops.some(w => !w.image || w.title?.includes('Ốp Lưng') || w.image?.includes('cat_phone') || w.image?.includes('hd_cat_box'))) {
      setWorkshops(INITIAL_WORKSHOPS);
    }
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    saveStoredWorkshops(workshops);
  }, [workshops]);

  useEffect(() => {
    saveStoredSchedules(schedules);
  }, [schedules]);

  useEffect(() => {
    saveStoredBookings(bookings);
  }, [bookings]);

  useEffect(() => {
    saveStoredReviews(reviews);
  }, [reviews]);

  useEffect(() => {
    saveStoredArtisans(artisans);
  }, [artisans]);

  // Navigation helpers
  const navigateToWorkshopDetail = (id) => {
    setActiveWorkshopId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToWorkshopList = () => {
    setActiveWorkshopId(null);
  };

  const openBooking = (workshop, schedule = null) => {
    setBookingWorkshop(workshop);
    setPreselectedSchedule(schedule);
    setIsBookingModalOpen(true);
  };

  const closeBooking = () => {
    setIsBookingModalOpen(false);
    setBookingWorkshop(null);
    setPreselectedSchedule(null);
  };

  const openArtisanProfile = (artisan) => {
    setSelectedArtisan(artisan);
    setIsArtisanModalOpen(true);
  };

  const closeArtisanProfile = () => {
    setSelectedArtisan(null);
    setIsArtisanModalOpen(false);
  };

  // Check capacity helper
  const checkCapacity = (scheduleId, requestedSeats = 1) => {
    const sched = schedules.find(s => s.id === scheduleId);
    if (!sched) return { canBook: false, availableSeats: 0, error: 'Không tìm thấy ca học này' };
    
    const available = Math.max(0, sched.maxSeats - sched.bookedSeats);
    if (requestedSeats > available) {
      return { 
        canBook: false, 
        availableSeats: available, 
        error: `Ca học chỉ còn ${available} chỗ trống (bạn chọn ${requestedSeats} người)` 
      };
    }
    return { canBook: true, availableSeats: available, error: null };
  };

  // Submit new booking
  const bookWorkshop = ({
    workshopId,
    scheduleId,
    customerName,
    customerPhone,
    customerEmail,
    participants = 1,
    customNote = '',
    promoCode = '',
    paymentMethod = 'deposit50'
  }) => {
    const targetWorkshop = workshops.find(w => w.id === workshopId);
    const targetSchedule = schedules.find(s => s.id === scheduleId);

    if (!targetWorkshop || !targetSchedule) {
      showToast('Thông tin workshop hoặc ca học không hợp lệ', 'error');
      return { success: false, error: 'Dữ liệu không hợp lệ' };
    }

    // Capacity Check
    const capCheck = checkCapacity(scheduleId, participants);
    if (!capCheck.canBook) {
      showToast(capCheck.error, 'error');
      return { success: false, error: capCheck.error };
    }

    // Compute Price
    let unitPrice = targetWorkshop.price;
    let discount = 0;
    const cleanPromo = promoCode.trim().toUpperCase();
    if (cleanPromo === 'CHUONNGO10' || cleanPromo === 'GENZ2026') {
      discount = 0.1; // 10% discount
    } else if (cleanPromo === 'HERITAGE20') {
      discount = 0.2; // 20% discount
    }

    const subtotal = unitPrice * participants;
    const finalTotal = Math.round(subtotal * (1 - discount));
    const paidAmount = paymentMethod === 'full' ? finalTotal : Math.round(finalTotal * 0.5);

    // Create New Booking Object
    const bookingId = 'WBK-' + Math.floor(10000 + Math.random() * 90000);
    const newBooking = {
      id: bookingId,
      workshopId: targetWorkshop.id,
      workshopTitle: targetWorkshop.title,
      workshopImage: targetWorkshop.image,
      scheduleId: targetSchedule.id,
      sessionDate: `${targetSchedule.dateDisplay} (${targetSchedule.timeSlot})`,
      sessionShift: targetSchedule.shift,
      location: targetSchedule.location || targetWorkshop.location,
      artisanName: targetSchedule.artisanName || targetWorkshop.artisanName,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      participants: Number(participants),
      unitPrice,
      totalPrice: finalTotal,
      paidAmount,
      remainingAmount: finalTotal - paidAmount,
      discountApplied: discount > 0 ? `${discount * 100}% (${cleanPromo})` : null,
      customNote: customNote.trim(),
      paymentMethod,
      paymentStatus: paymentMethod === 'full' ? 'paid' : 'deposit50',
      status: 'confirmed',
      qrCode: `CNH-PASS-${bookingId}-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
      })
    };

    // Update Schedule booked seats & status
    const updatedSchedules = schedules.map(s => {
      if (s.id === scheduleId) {
        const newBooked = s.bookedSeats + Number(participants);
        let newStatus = s.status;
        if (newBooked >= s.maxSeats) {
          newStatus = 'full';
        } else if (newBooked >= s.maxSeats - 2) {
          newStatus = 'filling';
        }
        return {
          ...s,
          bookedSeats: newBooked,
          status: newStatus
        };
      }
      return s;
    });

    // Save
    setBookings(prev => [newBooking, ...prev]);
    setSchedules(updatedSchedules);

    // Trigger celebrations
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}

    showToast(`Đăng ký thành công! Mã vé số của bạn là ${newBooking.id}`);
    return { success: true, booking: newBooking };
  };

  // Cancel booking (with seat refund)
  const cancelBooking = (bookingId) => {
    const target = bookings.find(b => b.id === bookingId);
    if (!target) return;

    // Refund seats to schedule
    const updatedSchedules = schedules.map(s => {
      if (s.id === target.scheduleId) {
        const newBooked = Math.max(0, s.bookedSeats - target.participants);
        let newStatus = 'open';
        if (newBooked >= s.maxSeats) {
          newStatus = 'full';
        } else if (newBooked >= s.maxSeats - 2) {
          newStatus = 'filling';
        }
        return {
          ...s,
          bookedSeats: newBooked,
          status: newStatus
        };
      }
      return s;
    });

    const updatedBookings = bookings.map(b => 
      b.id === bookingId ? { ...b, status: 'cancelled' } : b
    );

    setSchedules(updatedSchedules);
    setBookings(updatedBookings);
    showToast(`Đã hủy vé ${bookingId} và hoàn lại ${target.participants} chỗ trống`, 'info');
  };

  // Submit new review
  const submitReview = ({ workshopId, studentName, studentRole, rating, comment, projectImage, tags = [] }) => {
    const targetWs = workshops.find(w => w.id === workshopId);
    const newRev = {
      id: 'REV-' + Date.now(),
      workshopId,
      workshopTitle: targetWs ? targetWs.title : 'Workshop Khảm Trai Chuôn Ngọ',
      studentName: studentName || (user?.name || 'Học viên Chuôn Ngọ'),
      studentRole: studentRole || 'Học viên trải nghiệm',
      studentAvatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      rating: Number(rating) || 5,
      date: new Date().toLocaleDateString('vi-VN'),
      comment,
      projectImage: projectImage || (targetWs ? targetWs.image : '/images/product_but_ky_kham_trai.jpg'),
      likesCount: 1,
      tags: tags.length ? tags : ['Trải nghiệm tuyệt vời', 'Hài lòng 100%']
    };

    setReviews(prev => [newRev, ...prev]);
    showToast('Cảm ơn bạn đã gửi đánh giá trải nghiệm!');
    setIsReviewModalOpen(false);
  };

  // Admin CRUD Operations
  const addWorkshop = (workshopData) => {
    const id = 'WS-' + String(workshops.length + 1).padStart(2, '0');
    const newWs = {
      ...workshopData,
      id,
      rating: 5.0,
      reviewsCount: 0,
      gallery: workshopData.gallery || [workshopData.image]
    };
    setWorkshops(prev => [newWs, ...prev]);
    showToast(`Đã thêm workshop "${newWs.title}"`);
    return newWs;
  };

  const updateWorkshop = (id, workshopData) => {
    setWorkshops(prev => prev.map(w => w.id === id ? { ...w, ...workshopData } : w));
    showToast(`Đã cập nhật thông tin workshop!`);
  };

  const deleteWorkshop = (id) => {
    setWorkshops(prev => prev.filter(w => w.id !== id));
    showToast(`Đã xóa workshop`, 'info');
  };

  const addSchedule = (schedData) => {
    const id = 'SCH-' + String(schedules.length + 1).padStart(2, '0');
    const newSched = {
      ...schedData,
      id,
      bookedSeats: 0,
      status: 'open'
    };
    setSchedules(prev => [...prev, newSched]);
    showToast(`Đã mở thêm ca học ngày ${newSched.dateDisplay}`);
    return newSched;
  };

  const updateSchedule = (id, schedData) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, ...schedData } : s));
    showToast(`Đã cập nhật ca học!`);
  };

  const deleteSchedule = (id) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
    showToast(`Đã xóa ca học`, 'info');
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    showToast(`Đã đổi trạng thái đăng ký thành "${newStatus}"`);
  };

  const addArtisan = (artisanData) => {
    const id = 'ART-CHUONNGO-' + String(artisans.length + 1).padStart(3, '0');
    const newArt = { ...artisanData, id };
    setArtisans(prev => [...prev, newArt]);
    showToast(`Đã thêm hồ sơ nghệ nhân ${newArt.name}`);
  };

  const updateArtisan = (id, artisanData) => {
    setArtisans(prev => prev.map(a => a.id === id ? { ...a, ...artisanData } : a));
    showToast(`Đã cập nhật hồ sơ nghệ nhân!`);
  };

  const deleteArtisan = (id) => {
    setArtisans(prev => prev.filter(a => a.id !== id));
    showToast(`Đã xóa hồ sơ nghệ nhân`, 'info');
  };

  const deleteReview = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    showToast(`Đã xóa nhận xét`, 'info');
  };

  return (
    <WorkshopContext.Provider
      value={{
        workshops,
        schedules,
        bookings,
        reviews,
        artisans,
        workshopSteps: WORKSHOP_STEPS,
        studentShowcase: STUDENT_SHOWCASE,
        activeWorkshopId,
        navigateToWorkshopDetail,
        backToWorkshopList,
        workshopTab,
        setWorkshopTab,
        isBookingModalOpen,
        bookingWorkshop,
        preselectedSchedule,
        openBooking,
        closeBooking,
        checkCapacity,
        bookWorkshop,
        cancelBooking,
        submitReview,
        isReviewModalOpen,
        setIsReviewModalOpen,
        selectedArtisan,
        isArtisanModalOpen,
        openArtisanProfile,
        closeArtisanProfile,
        addWorkshop,
        updateWorkshop,
        deleteWorkshop,
        addSchedule,
        updateSchedule,
        deleteSchedule,
        updateBookingStatus,
        addArtisan,
        updateArtisan,
        deleteArtisan,
        deleteReview
      }}
    >
      {children}
    </WorkshopContext.Provider>
  );
};

export const useWorkshop = () => useContext(WorkshopContext);
