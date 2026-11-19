// Data for the 3D Interactive Village Experience of Chuon Ngo Heritage
export const VILLAGE_HOTSPOTS = [
  {
    id: 'gate',
    name: 'Cổng Làng Chuôn Ngọ',
    title: 'Cổng Cổ Tam Quan Làng Nghề Chuôn Ngọ',
    tagline: 'Khởi đầu hành trình di sản nghìn năm',
    position: [0, 0, -4.0],
    radius: 5.0,
    icon: 'Gate',
    color: '#D4AF37',
    description: 'Cổng làng cổ kính bằng gạch nung với hoành phi "Đại Cao Hỏa" và biển tên "Làng nghề Chuôn Ngọ", chào đón du khách bước vào không gian cưa đục cẩn ốc truyền thống bên dòng sông Nhuệ.',
    previewImg: '/images/dinh_chuon_ngo.jpg',
    dialogue: 'Chào mừng bạn đến với Làng nghề Khảm trai Chuôn Ngọ! Hãy tiến bước dọc theo con đường gạch đỏ để bắt đầu hành trình khám phá di sản.'
  },
  {
    id: 'artisan',
    name: 'Xưởng Chế Tác Nghệ Nhân',
    title: 'Xưởng Mỹ Nghệ Ưu Tú Chuôn Ngọ',
    tagline: 'Nơi bàn tay vàng thổi hồn vào vỏ trai vỏ ốc',
    position: [-3.8, 0, 3.0],
    radius: 4.5,
    icon: 'UserCheck',
    color: '#E06D53',
    description: 'Nơi lưu giữ những chiếc cưa lọng dây cung truyền thống, bàn đục gỗ lim và kho vỏ trai cửu khổng, ốc đỏ Singapore ngũ sắc hàng trăm năm tuổi.',
    previewImg: '/images/artisan_truong_kim_thanh.jpg',
    artisan: {
      name: 'Nghệ nhân Ưu tú Trương Kim Thành',
      title: 'Bậc thầy Cưa lọng & Phối màu xà cừ ngũ sắc',
      experience: '45 năm tuổi nghề',
      quote: 'Nghề khảm trai không chỉ là mài vỏ ốc gắn vào gỗ, mà là thổi hồn của đất trời, biến những mảnh xà cừ thô ráp thành hào quang trường tồn cùng thời gian.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    dialogue: 'Bác Thành đang cẩn từng cánh sen bằng vỏ ốc đỏ Singapore. Hãy đến gần bàn thờ tổ và trò chuyện cùng bác để nghe bí quyết nghề nghìn năm nhé!'
  },
  {
    id: 'craft',
    name: 'Khu Trải Nghiệm Chế Tác',
    title: 'Xưởng Thử Tài Nghệ Nhân',
    tagline: 'Tự tay cưa lọng & mài bóng cát xà cừ',
    position: [3.8, 0, 3.0],
    radius: 4.5,
    icon: 'Sparkles',
    color: '#28A745',
    description: 'Không gian mở cho du khách trải nghiệm các công đoạn khảm trai: chọn vỏ ốc, cưa lọng hình hoa sen và đánh bóng bằng lá chuối khô.',
    previewImg: '/images/heritage_crafting_hero.jpg',
    dialogue: 'Tại đây bạn có thể thử sức mài bóng xà cừ ngũ sắc và tùy biến chiếc hộp trang sức di sản của riêng mình!'
  },
  {
    id: 'gallery',
    name: 'Nhà Trưng Bày Bách Liên',
    title: 'Không Gian Bảo Tồn Tinh Hoa Khảm Trai',
    tagline: 'Chiêm ngưỡng kiệt tác Thuận Buồm Xuôi Gió & Cung Đình',
    position: [6.0, 0, -18.0],
    radius: 5.5,
    icon: 'Landmark',
    color: '#8E44AD',
    description: 'Nơi trưng bày các tuyệt tác hoành phi câu đối thế kỷ XIX, sập gụ khảm ốc cửu khổng và đại tác phẩm "Thuận Buồm Xuôi Gió" dát ánh xà cừ phát quang.',
    previewImg: '/images/cat_box.jpg',
    dialogue: 'Chiêm ngưỡng bức đại cảnh Thuận Buồm Xuôi Gió và các hiện vật cẩn ốc xà cừ tinh xảo bậc nhất xứ Đoài.'
  },
  {
    id: 'shop',
    name: 'Cửa Hàng Di Sản & Quà Tặng',
    title: 'Không Gian Thương Mại Di Sản Số',
    tagline: 'Sở hữu tác phẩm được nghệ nhân chứng thực',
    position: [-6.0, 0, -18.0],
    radius: 5.5,
    icon: 'ShoppingBag',
    color: '#17A2B8',
    description: 'Điểm dừng chân chọn mua các sản phẩm khảm trai tinh xảo với tem định danh NFC, tích hợp bảo chứng hợp đồng nghệ nhân cọc 55%.',
    previewImg: '/images/cat_tray.jpg',
    dialogue: 'Đã hoàn thành hành trình! Hãy chọn cho mình và người thân những món quà kỷ niệm khảm ốc tinh tế và ý nghĩa nhất.'
  }
];

export const VILLAGE_QUESTS = [
  {
    id: 'quest_1',
    code: 'gate',
    title: 'Tham quan Cổng Làng',
    shortDesc: 'Bước qua cổng làng cổ Chuôn Ngọ nghìn năm tuổi',
    instruction: 'Di chuyển đến khu vực Cổng Làng Chuôn Ngọ (nhấn W/A/S/D hoặc dùng joystick).',
    targetHotspot: 'gate',
    reward: 'Mở khóa Bản đồ Làng nghề',
    badgeId: null
  },
  {
    id: 'quest_2',
    code: 'artisan',
    title: 'Gặp gỡ Nghệ nhân Ưu tú',
    shortDesc: 'Trò chuyện cùng Nghệ nhân Trương Kim Thành tại xưởng',
    instruction: 'Tiến vào xưởng chế tác bên trái đường làng và nhấn [E] để trò chuyện.',
    targetHotspot: 'artisan',
    reward: 'Huy hiệu Tri Kỷ Nghệ Nhân',
    badgeId: 'badge_artisan'
  },
  {
    id: 'quest_3',
    code: 'craft',
    title: 'Trải nghiệm Chế tác Thủ công',
    shortDesc: 'Thử tài cưa lọng & mài bóng bột cát xà cừ ngũ sắc',
    instruction: 'Đến Khu Trải Nghiệm Chế Tác (bên phải) và hoàn thành công đoạn mài bóng.',
    targetHotspot: 'craft',
    reward: 'Huy hiệu Bàn Tay Vàng Xứ Đoài',
    badgeId: 'badge_craftsman'
  },
  {
    id: 'quest_4',
    code: 'customize',
    title: 'Tùy chỉnh Tác phẩm Cá nhân',
    shortDesc: 'Thiết kế hộp khảm trai 3D và khắc tên riêng của bạn',
    instruction: 'Mở Studio 3D AR, chọn họa tiết sen/chuồn chuồn, màu sơn mài và khắc tên.',
    targetHotspot: 'craft',
    reward: 'Tác phẩm lưu vào Bộ sưu tập cá nhân',
    badgeId: 'badge_designer'
  },
  {
    id: 'quest_5',
    code: 'badge',
    title: 'Nhận Huy hiệu Di sản Số',
    shortDesc: 'Ghé thăm Nhà trưng bày & Cửa hàng để hoàn tất hành trình',
    instruction: 'Khám phá Nhà trưng bày Bách Liên và Cửa hàng Di sản để nhận chứng nhận.',
    targetHotspot: 'shop',
    reward: 'Huy hiệu Đại Sứ Di Sản Chuôn Ngọ',
    badgeId: 'badge_master'
  }
];

export const HERITAGE_BADGES = [
  {
    id: 'badge_explorer',
    title: 'Nhà Khám Phá Làng Nghề',
    desc: 'Đã đặt chân đến tất cả 5 địa danh di sản tiêu biểu tại làng Chuôn Ngọ',
    icon: 'Compass',
    color: '#D4AF37'
  },
  {
    id: 'badge_artisan',
    title: 'Tri Kỷ Nghệ Nhân',
    desc: 'Đã lắng nghe câu chuyện truyền nghề của Nghệ nhân Ưu tú Trương Kim Thành',
    icon: 'Award',
    color: '#E06D53'
  },
  {
    id: 'badge_craftsman',
    title: 'Bàn Tay Vàng Xứ Đoài',
    desc: 'Đã hoàn thành xuất sắc thử thách mài bóng xà cừ đạt chuẩn quang phổ ngũ sắc',
    icon: 'Sparkles',
    color: '#28A745'
  },
  {
    id: 'badge_designer',
    title: 'Nhà Thiết Kế Di Sản',
    desc: 'Đã sáng tạo nên tác phẩm khảm trai 3D cá nhân hóa mang dấu ấn bản thân',
    icon: 'Edit3',
    color: '#3498DB'
  },
  {
    id: 'badge_master',
    title: 'Đại Sứ Di Sản Chuôn Ngọ',
    desc: 'Hoàn thành trọn vẹn toàn bộ 5/5 nhiệm vụ trong chuyến du hành không gian 3D',
    icon: 'Crown',
    color: '#F39C12'
  }
];

export const CRAFTING_STEPS = [
  {
    step: 1,
    title: 'Vẽ mẫu & Can nét',
    desc: 'Nghệ nhân phác thảo đồ án hoa văn (hoa sen, rồng phượng, chữ triện) lên giấy dó rồi can mẫu trực tiếp lên bề mặt gỗ trắc, gỗ mun.',
    tool: 'Bút lông, mực nho & giấy dó truyền thống'
  },
  {
    step: 2,
    title: 'Lựa ốc & Cưa lọng',
    desc: 'Tuyển chọn vỏ trai cửu khổng hoặc ốc đỏ Singapore ngũ sắc, dùng cưa lọng dây cung mảnh như sợi tóc để cưa theo từng đường nét uốn lượn.',
    tool: 'Cưa lọng dây kim loại, giũa thép tôi'
  },
  {
    step: 3,
    title: 'Đục gỗ hạ cốt chìm',
    desc: 'Dùng ve, đục thép sắc bén bạt phẳng lòng gỗ vừa khít với độ dày từng mảnh ốc xà cừ đã cưa, đảm bảo không lệch dù chỉ 0.1 mm.',
    tool: 'Bộ đục gỗ 18 chi tiết, búa gõ gỗ'
  },
  {
    step: 4,
    title: 'Cẩn ốc & Gắn sơn ta',
    desc: 'Pha chế sơn ta cổ truyền từ nhựa cây sơn Phú Thọ cùng mùn cưa mịn, gắn chặt các mảnh xà cừ vào lòng gỗ và ép phẳng trong 7 ngày.',
    tool: 'Sơn ta tự nhiên, bàn ép mộc gia truyền'
  },
  {
    step: 5,
    title: 'Giũa phẳng & Mài bóng cát',
    desc: 'Mài mặt tác phẩm bằng giấy ráp mịn cùng nước cát phù sa sông Hồng, sau đó dùng lá chuối khô đánh bóng để bề mặt xà cừ phát ánh ngũ sắc rực rỡ.',
    tool: 'Cát mịn phù sa, lá chuối khô mài bóng'
  }
];
