// Dữ liệu di sản làng nghề Chuôn Ngọ và danh mục sản phẩm cao cấp
export const CATEGORIES = [
  {
    id: 'phu-kien-van-phong',
    name: 'Bút ký & Văn phòng',
    description: 'Bút ký cao cấp khảm xà cừ ngũ sắc, khay danh thiếp, phụ kiện bàn làm việc đẳng cấp',
    image: '/images/product_but_ky_kham_trai.jpg',
    count: 8
  },
  {
    id: 'do-decor',
    name: 'Sơn mài & Đồ Decor',
    description: 'Bát sơn mài cẩn trứng, khay trà, đĩa sơn mài khảm ốc nâng tầm phong cách sống',
    image: '/images/product_bat_can_trung.jpg',
    count: 12
  },
  {
    id: 'phu-kien-ca-nhan',
    name: 'Trang sức & Phụ kiện',
    description: 'Vòng tay bản liền cẩn xà cừ, chuỗi hạt vỏ trai ngọc, khuyên tai & mặt dây chuyền',
    image: '/images/product_vong_tay_ban_kham_trai.jpg',
    count: 16
  },
  {
    id: 'qua-tang-dac-biet',
    name: 'Quà tặng di sản',
    description: 'Bộ quà tặng đối tác ngoại giao, bút ký nạm vàng & tác phẩm đóng dấu ấn tri ân',
    image: '/images/product_but_ky_kham_trai.jpg',
    count: 10
  },
  {
    id: 'hop-trang-suc',
    name: 'Hộp trang sức',
    description: 'Tuyệt tác bảo quản trang sức bằng gỗ quý khảm trai ngũ sắc hoa sen tinh xảo',
    image: '/images/hd_cat_box.jpg',
    count: 6
  }
];

export const PRODUCTS = [
  {
    id: 'CNH-001',
    name: 'Bút Ký Doanh Nhân Khảm Ốc Xà Cừ "Cửu Long Vọng Nguyệt"',
    category: 'phu-kien-van-phong',
    price: 1650000,
    originalPrice: 2100000,
    rating: 5.0,
    reviewsCount: 58,
    isFeatured: true,
    isNew: true,
    image: '/images/product_but_ky_kham_trai.jpg',
    gallery: [
      '/images/product_but_ky_kham_trai.jpg',
      '/images/product_vong_tay_ban_kham_trai.jpg',
      '/images/product_bat_can_trung.jpg',
      '/images/product_trang_suc_xa_cu.jpg'
    ],
    woodType: 'Hộp gỗ Mun sơn mài cẩn hoa sen, thân bút nạm kim loại mạ vàng 18K',
    shellType: 'Ốc xà cừ ngũ sắc biển sâu (Paua shell & Ốc đỏ Singapore)',
    artisan: 'Nghệ nhân Ưu tú Trương Kim Thành',
    artisanExperience: '45 năm kinh nghiệm',
    dimensions: 'Bút dài 14.2cm, Hộp 18 × 6.5 × 4 cm',
    weight: '320g (cả hộp gỗ)',
    story: 'Tuyệt tác bút ký doanh nhân khảm xà cừ thủ công 100%. Từng mảnh ốc xà cừ ngũ sắc li ti được người nghệ nhân cưa lọng nét tơ tóc, mài ghép liền khít quanh thân bút tròn. Thân bút tỏa ánh kim quang ngũ sắc rực rỡ dưới ánh nắng. Đi kèm hộp gỗ sơn mài đen khảm họa tiết sen truyền thống, lót nhung nhung êm ái. Món quà ngoại giao và tri ân đẳng cấp dành cho đối tác, lãnh đạo.',
    features: [
      'Thân bút cẩn ốc xà cừ tự nhiên nguyên bản, đổi màu lấp lánh theo góc nhìn',
      'Ngòi bút dạ bi mực gel 0.5mm nhập khẩu từ Đức, nét viết êm mượt',
      'Đi kèm hộp gỗ sơn mài khảm sen cao cấp có đệm nhung bảo quản',
      'Dịch vụ khắc laser tên / logo mạ vàng theo yêu cầu'
    ],
    digitalPassport: {
      serialNumber: 'CNH-2026-PEN-00101',
      artisanId: 'ART-CHUONNGO-001',
      batch: 'BST Doanh Nhân Bản Lĩnh 2026',
      provenanceShell: 'Ốc xà cừ đỏ Singapore & Ốc xác xà cừ New Zealand',
      lacquerType: 'Sơn mài truyền thống phủ bóng nano bảo vệ vĩnh cửu',
      inspectionDate: '16/11/2026',
      certifiedBy: 'Hiệp hội Làng nghề Khảm trai Chuôn Ngọ'
    }
  },
  {
    id: 'CNH-002',
    name: 'Bát Sơn Mài Cẩn Vỏ Trứng & Khảm Xà Cừ "Hoàng Kim Rạn Sắc"',
    category: 'do-decor',
    price: 850000,
    originalPrice: 1050000,
    rating: 4.9,
    reviewsCount: 42,
    isFeatured: true,
    isNew: true,
    image: '/images/product_bat_can_trung.jpg',
    gallery: [
      '/images/product_bat_can_trung.jpg',
      '/images/product_but_ky_kham_trai.jpg',
      '/images/product_chuoi_hat_xa_cu.jpg',
      '/images/product_trang_suc_xa_cu.jpg'
    ],
    woodType: 'Cốt gỗ mít tiện nguyên khối phủ sơn ta cổ truyền',
    shellType: 'Vỏ trứng tự nhiên rang màu hổ phách kết hợp xà cừ ngũ sắc',
    artisan: 'Nghệ nhân Bàn tay Vàng Trần Bá Dinh',
    artisanExperience: '38 năm kinh nghiệm',
    dimensions: 'Đường kính 11.5cm × cao 6.5cm',
    weight: '180g',
    story: 'Đỉnh cao của nghệ thuật cẩn trứng kết hợp khảm xà cừ độc bản của làng nghề Chuôn Ngọ. Từng mảnh vỏ trứng nhỏ li ti được xếp khéo léo thủ công, sau đó nung rang để tạo sắc độ từ vàng cam, đỏ son đến trắng ngà. Bề mặt được mài phẳng phân tầng dưới lớp sơn mài trong veo, tạo hiệu ứng rạn nứt tự nhiên như hoa băng tuyết.',
    features: [
      'Kỹ thuật cẩn trứng truyền thống kết hợp khảm xà cừ ngũ sắc hiếm có',
      'Bề mặt mài bóng phẳng mịn tuyệt đối bằng lá chuối khô và bột than xoan',
      'Chịu nhiệt tốt, phù hợp bày biện trà đạo, decor phòng khách sang trọng',
      'Mỗi chiếc bát mang hoa văn rạn độc bản, không chiếc nào trùng lặp'
    ],
    digitalPassport: {
      serialNumber: 'CNH-2026-BOWL-00202',
      artisanId: 'ART-CHUONNGO-002',
      batch: 'Lô Mỹ Nghệ Trà Đạo Cung Đình 2026',
      provenanceShell: 'Vỏ trứng vịt tẩy sạch & Trai ngọc nước ngọt sông Đáy',
      lacquerType: 'Sơn ta tự nhiên Phú Thọ 9 lớp truyền thống',
      inspectionDate: '12/11/2026',
      certifiedBy: 'Chuôn Ngọ Heritage Innovation Lab'
    }
  },
  {
    id: 'CNH-003',
    name: 'Vòng Tay Bản Liền Khảm Xà Cừ "Bạch Ngọc Liên Hoa" (Viền Kim Loại)',
    category: 'phu-kien-ca-nhan',
    price: 780000,
    originalPrice: 950000,
    rating: 5.0,
    reviewsCount: 76,
    isFeatured: true,
    isNew: true,
    image: '/images/product_vong_tay_ban_kham_trai.jpg',
    gallery: [
      '/images/product_vong_tay_ban_kham_trai.jpg',
      '/images/product_chuoi_hat_xa_cu.jpg',
      '/images/product_trang_suc_xa_cu.jpg',
      '/images/product_but_ky_kham_trai.jpg'
    ],
    woodType: 'Cốt hợp kim titan mạ bạc sáng bóng chống oxy hóa',
    shellType: 'Phiến vỏ trai ngọc môi trắng tự nhiên (Silver-lip Pearl Shell)',
    artisan: 'Nghệ nhân trẻ Trương Công Hùng',
    artisanExperience: '14 năm kinh nghiệm',
    dimensions: 'Đường kính trong 5.8cm - 6.2cm, bản rộng 1.4cm',
    weight: '42g',
    story: 'Chiếc vòng tay mang tinh thần Contemporary Heritage - đưa nghệ thuật mài khảm vỏ trai vào phụ kiện thời trang quý cô hiện đại. Mặt ngoài được ghép liền mạch các phiến xà cừ trắng ngà vân mây óng ánh, ôm trọn cổ tay với viền kim loại sáng bóng thanh thoát.',
    features: [
      'Xà cừ ngọc trai biển tuyển chọn, ánh cầu vồng dịu dàng khi cử động',
      'Cốt hợp kim không gỉ, đầm tay, chống trầy xước và bền bỉ',
      'Tôn nét quý phái, dễ phối trang phục áo dài, váy dạ hội lẫn thường nhật',
      'Tặng kèm hộp nhung bảo quản và khăn lau chuyên dụng'
    ],
    digitalPassport: {
      serialNumber: 'CNH-2026-BRAC-00303',
      artisanId: 'ART-CHUONNGO-003',
      batch: 'BST Trang Sức Quý Cô Tân Khảm 2026',
      provenanceShell: 'Trai biển ngọc môi trắng vịnh Vân Phong',
      lacquerType: 'Keo hữu cơ tự nhiên & lớp phủ bảo vệ quang học',
      inspectionDate: '10/11/2026',
      certifiedBy: 'Hiệp hội Làng nghề Khảm trai Chuôn Ngọ'
    }
  },
  {
    id: 'CNH-004',
    name: 'Chuỗi Vòng Tay Hạt Xà Cừ Tự Nhiên "Tâm An Tịnh Độ" (Kèm Hộp Trưng Bày)',
    category: 'phu-kien-ca-nhan',
    price: 590000,
    originalPrice: 720000,
    rating: 4.9,
    reviewsCount: 89,
    isFeatured: true,
    isNew: true,
    image: '/images/product_chuoi_hat_xa_cu.jpg',
    gallery: [
      '/images/product_chuoi_hat_xa_cu.jpg',
      '/images/product_vong_tay_ban_kham_trai.jpg',
      '/images/product_trang_suc_xa_cu.jpg',
      '/images/product_bat_can_trung.jpg'
    ],
    woodType: 'Hộp trưng bày khung mica viền trắng màng phim chống ẩm cao cấp',
    shellType: '100% hạt mài từ tâm vỏ trai xà cừ dày tự nhiên',
    artisan: 'Nghệ nhân trẻ Trương Công Hùng',
    artisanExperience: '14 năm kinh nghiệm',
    dimensions: 'Hạt tròn 8mm / 10mm (19-21 hạt), Hộp 9 × 9 × 2 cm',
    weight: '35g',
    story: 'Chuỗi vòng tay được tiện mài thủ công từ phần cùi dày nhất của vỏ trai tự nhiên. Sắc trắng ngà ánh xà cừ phản chiếu năng lượng thanh khiết của biển cả. Mang ý nghĩa bình an, may mắn và điều hòa tâm trí. Được đặt trang trọng trong hộp trưng bày màng phim mica cao cấp.',
    features: [
      '100% xà cừ tự nhiên không pha tạp, mát lạnh khi đeo vào tay',
      'Hạt tiện tròn đều, bóng mượt không gây cấn rát da tay',
      'Dây xâu co giãn sợi đôi chịu lực cao, vừa vặn mọi kích cỡ cổ tay',
      'Kèm hộp trưng bày chống bụi cao cấp làm quà tặng tinh tế'
    ],
    digitalPassport: {
      serialNumber: 'CNH-2026-BEAD-00404',
      artisanId: 'ART-CHUONNGO-003',
      batch: 'BST Phong Thủy & Tĩnh Tại 2026',
      provenanceShell: 'Vỏ trai ngọc môi vàng Côn Đảo & Phú Quốc',
      lacquerType: 'Đánh bóng tự nhiên bằng da hươu và bột ngọc',
      inspectionDate: '08/11/2026',
      certifiedBy: 'Chuôn Ngọ Heritage Innovation Lab'
    }
  },
  {
    id: 'CNH-005',
    name: 'Bộ Khuyên Tai & Mặt Dây Chuyền Xà Cừ Tự Nhiên "Mộc Bản Ngũ Sắc"',
    category: 'phu-kien-ca-nhan',
    price: 420000,
    originalPrice: 550000,
    rating: 4.8,
    reviewsCount: 64,
    isFeatured: true,
    isNew: true,
    image: '/images/product_trang_suc_xa_cu.jpg',
    gallery: [
      '/images/product_trang_suc_xa_cu.jpg',
      '/images/product_vong_tay_ban_kham_trai.jpg',
      '/images/product_chuoi_hat_xa_cu.jpg',
      '/images/product_but_ky_kham_trai.jpg'
    ],
    woodType: 'Khay gỗ mộc tự nhiên đựng set sản phẩm',
    shellType: 'Vỏ ốc xà cừ cửu khổng, vỏ điệp biển và trai ngọc',
    artisan: 'Nghệ nhân Ưu tú Trương Kim Thành',
    artisanExperience: '45 năm kinh nghiệm',
    dimensions: 'Charm 2.5cm - 4.5cm, móc đeo bạc 925',
    weight: '18g',
    story: 'Bộ sưu tập charm trang sức mộc bản Chuôn Ngọ gìn giữ vẻ đẹp mộc mạc nguyên sơ của xà cừ đại dương. Từng tạo hình hoa mai 5 cánh, hình khuyên tròn khuyết, giọt sương được cắt lọng thủ công mỏng nhẹ, giữ nguyên ánh ngũ sắc lấp lánh tự nhiên dưới ánh sáng mặt trời.',
    features: [
      'Đa dạng kiểu dáng: Hoa mai, Khuyên tròn, Giọt lệ, Cánh lá',
      'Móc khuyên và khoen nối bạc 925 cao cấp không gây dị ứng',
      'Trọng lượng siêu nhẹ, thoải mái đeo suốt cả ngày dài',
      'Món quà lưu niệm thủ công ý nghĩa từ làng nghề nghìn năm'
    ],
    digitalPassport: {
      serialNumber: 'CNH-2026-JEWL-00505',
      artisanId: 'ART-CHUONNGO-001',
      batch: 'BST Trang Sức Mộc Bản Làng Nghề',
      provenanceShell: 'Ốc cửu khổng Nha Trang & Điệp biển Bình Thuận',
      lacquerType: 'Mài nước thủ công 5 cấp độ hạt mịn',
      inspectionDate: '05/11/2026',
      certifiedBy: 'Hiệp hội Làng nghề Khảm trai Chuôn Ngọ'
    }
  },
  {
    id: 'CNH-006',
    name: 'Hộp Trang Sức Khảm Trai "Bách Liên Khởi Sắc"',
    category: 'hop-trang-suc',
    price: 1850000,
    originalPrice: 2200000,
    rating: 5.0,
    reviewsCount: 38,
    isFeatured: false,
    isNew: false,
    image: '/images/hd_cat_box.jpg',
    gallery: [
      '/images/hd_cat_box.jpg',
      '/images/product_vong_tay_ban_kham_trai.jpg',
      '/images/product_but_ky_kham_trai.jpg'
    ],
    woodType: 'Gỗ Trắc đỏ đen tự nhiên',
    shellType: 'Ốc xà cừ đỏ Singapore cao cấp',
    artisan: 'Nghệ nhân Ưu tú Trương Kim Thành',
    artisanExperience: '45 năm kinh nghiệm',
    dimensions: '22cm × 15cm × 9cm',
    weight: '950g',
    story: 'Tác phẩm lấy cảm hứng từ đầm sen Tây Hồ mùa nở rộ. Từng cánh sen được cưa lọng từ mảnh ốc xà cừ đỏ Singapore có sắc tím ánh kim quang hiếm có. Khung hộp làm từ gỗ trắc tự nhiên tuyển chọn, lót nhung đỏ ruby bên trong.',
    features: [
      'Gỗ trắc đỏ nguyên khối tuyển chọn kỹ lưỡng',
      'Xà cừ tự nhiên phản chiếu ngũ sắc dưới ánh sáng mặt trời',
      'Khóa đồng đúc thủ công phong cách cổ điển',
      'Tích hợp tem QR định danh di sản Chuôn Ngọ'
    ],
    digitalPassport: {
      serialNumber: 'CNH-2026-XACU-00189',
      artisanId: 'ART-CHUONNGO-001',
      batch: 'Lô di sản Mùa Thu 2026',
      provenanceShell: 'Ốc xà cừ đảo Raja Ampat & Nam Đảo Singapore',
      lacquerType: 'Sơn ta tự nhiên Phú Thọ 7 lớp truyền thống',
      inspectionDate: '24/10/2026',
      certifiedBy: 'Hiệp hội Làng nghề Khảm trai Chuôn Ngọ - Chuyên Mỹ'
    }
  },
  {
    id: 'CNH-007',
    name: 'Dây Chuyền Mặt Xà Cừ Tròn Tự Nhiên "Bạch Nguyệt Giao Hòa" (Dây Dù Đan Tay)',
    category: 'phu-kien-ca-nhan',
    price: 480000,
    originalPrice: 650000,
    rating: 4.9,
    reviewsCount: 52,
    isFeatured: true,
    isNew: true,
    image: '/images/product_day_chuyen_xa_cu.jpg',
    gallery: [
      '/images/product_day_chuyen_xa_cu.jpg',
      '/images/product_day_chuyen_xa_cu_studio.jpg',
      '/images/product_vong_tay_ban_kham_trai.jpg',
      '/images/product_chuoi_hat_xa_cu.jpg'
    ],
    woodType: 'Chốt khoen gỗ mun sừng đen mun tự nhiên',
    shellType: 'Vỏ trai ngọc Pinctada maxima xà cừ tự nhiên dày nguyên khối',
    artisan: 'Nghệ nhân Ưu tú Trương Kim Thành',
    artisanExperience: '45 năm kinh nghiệm',
    dimensions: 'Mặt tròn đường kính 4.8cm, dày 3.5mm; Dây dài 50 - 65cm tùy chỉnh',
    weight: '24g',
    story: 'Tuyệt tác trang sức mộc mạc mang hơi thở đương đại của làng nghề Chuôn Ngọ. Mặt dây chuyền được tiện và mài nhẵn từ phần vỏ trai ngọc dày nhất, giữ trọn ánh xà cừ trắng ngà lấp lánh phản chiếu ngũ sắc dưới ánh sáng tự nhiên. Điểm nhấn khuyên móc gỗ mun đen mun huyền bí cùng dây đan dù thủ công bền bỉ, tôn lên nét thanh lịch, phóng khoáng và tinh tế cho người đeo.',
    features: [
      '100% vỏ trai ngọc tự nhiên nguyên tấm mài nhẵn bóng hai mặt',
      'Ánh xà cừ trắng ngà tỏa sắc hồng, lục, lam tự nhiên theo góc nhìn',
      'Khuyên móc gỗ mun đen sừng kết hợp dây dù sáp đan tay siêu bền, chống nước',
      'Khóa cài hạt xà cừ tròn tiện lợi, dễ dàng điều chỉnh độ dài dây theo ý muốn'
    ],
    digitalPassport: {
      serialNumber: 'CNH-2026-NECK-00707',
      artisanId: 'ART-CHUONNGO-001',
      batch: 'BST Trang Sức Mộc Bản Chuôn Ngọ 2026',
      provenanceShell: 'Vỏ trai ngọc môi vàng Phú Quốc & Côn Đảo',
      lacquerType: 'Mài bóng cơ học nước và bột than xoan truyền thống',
      inspectionDate: '18/11/2026',
      certifiedBy: 'Hiệp hội Làng nghề Khảm trai Chuôn Ngọ - Chuyên Mỹ'
    }
  }
];

export const ARTISANS = [
  {
    id: 'ART-CHUONNGO-001',
    name: 'Nghệ nhân Ưu tú Trương Kim Thành',
    role: 'Truyền nhân đời thứ 5 dòng họ Trương Chuôn Ngọ',
    experience: '45 năm tuổi nghề',
    specialty: 'Khảm đại cảnh cung đình, cưa lọng nét tơ tóc & cẩn ốc đỏ Singapore',
    bio: 'Sinh ra trong nôi nghề khảm trai nghìn năm Chuôn Ngọ, ông Trương Kim Thành gắn bó với lưỡi cưa lọng từ năm 12 tuổi. Nhiều tác phẩm của ông đã được trưng bày tại Bảo tàng Lịch sử Quốc gia và đại diện cho Việt Nam tại các triển lãm thủ công quốc tế.',
    quote: 'Nghề khảm trai không chỉ là mài vỏ ốc gắn vào gỗ, mà là thổi hồn của đất trời, biến những mảnh xà cừ thô ráp thành những ánh hào quang bất tử cùng thời gian.',
    image: '/images/artisan_truong_kim_thanh.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=PmIe2AV2WqQ',
    worksCount: 180,
    awards: ['Nghệ nhân Ưu tú cấp Quốc gia', 'Huy chương Bàn tay Vàng Đông Nam Á', 'Kỷ niệm chương Bảo tồn Di sản Văn hóa']
  },
  {
    id: 'ART-CHUONNGO-002',
    name: 'Nghệ nhân Bàn tay Vàng Trần Bá Dinh',
    role: 'Bậc thầy chạm khảm chân dung & sơn then cổ truyền',
    experience: '38 năm tuổi nghề',
    specialty: 'Kỹ thuật tách lớp vỏ ốc cửu khổng & phối sắc chuyển màu 3D',
    bio: 'Nổi tiếng khắp xứ Đoài với đôi mắt tinh tường thẩm âm vân ốc và đôi tay điêu luyện gọt đục gỗ trắc không sai lệch một li. Ông là người lưu giữ bí quyết phối trộn sơn ta Phú Thọ không phai màu qua hàng thế kỷ.',
    quote: 'Mỗi vỏ ốc biển sâu mang một sắc độ khác nhau khi nắng rọi vào. Người thợ giỏi phải nhìn ra được đâu là cánh hoa, đâu là lông hạc trong một mảnh vỏ xù xì.',
    image: '/images/artisan_tran_ba_dinh.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=-e4nc64W7-g',
    worksCount: 140,
    awards: ['Bàn tay Vàng Làng nghề Việt Nam', 'Nghệ nhân Hà Nội Tiêu Biểu']
  },
  {
    id: 'ART-CHUONNGO-003',
    name: 'Nghệ nhân Trẻ Trương Công Hùng',
    role: 'Người tiên phong Re-design số hóa & sáng lập Innovation Lab',
    experience: '14 năm tuổi nghề & Thạc sĩ Mỹ thuật Ứng dụng',
    specialty: 'Thiết kế sản phẩm Lifestyle Gen Z, tích hợp WebAR & Tem định danh số',
    bio: 'Là thế hệ trẻ sinh ra tại làng Chuôn Ngọ, Hùng chọn con đường kết hợp mỹ thuật tạo hình đương đại với kỹ thuật chạm khảm gia truyền. Anh chính là người khởi xướng dòng trang sức xà cừ và phụ kiện cá nhân khảm trai cho giới trẻ Việt Nam.',
    quote: 'Di sản chỉ thực sự sống khi nó hiện diện trong túi áo, trên bàn làm việc và trong đời sống hằng ngày của người trẻ hôm nay.',
    image: '/images/artisan_truong_cong_hung.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=PmIe2AV2WqQ',
    worksCount: 65,
    awards: ['Giải Nhất Sáng tạo Khởi nghiệp Di sản Trẻ 2024', 'Top 30 Innovators Dưới 30 Tuổi']
  }
];

export const WORKSHOPS = [
  {
    id: 'WS-01',
    title: 'Masterclass: Chế Tác Bút Ký Doanh Nhân Khảm Ốc Xà Cừ & Khắc Tên Mạ Vàng',
    type: 'Offline tại Xưởng Cổ Chuôn Ngọ (Đưa đón Limousine)',
    date: 'Chủ Nhật hằng tuần (08:30 - 16:30, Kèm cơm quê làng nghề)',
    price: 1450000,
    artisan: 'Nghệ nhân Ưu tú Trương Kim Thành',
    location: 'Xưởng Mộc Cổ Gia Truyền họ Trương, Thôn Chuôn Ngọ, Xã Chuyên Mỹ, Phú Xuyên, Hà Nội',
    capacity: '8 người / khóa (Đảm bảo kèm 1-1)',
    includes: [
      'Xe Limousine đưa đón 2 chiều từ trung tâm Hà Nội về làng Chuôn Ngọ',
      '1 bút ký kim loại nạm vỏ ốc xà cừ ngũ sắc tự nhiên',
      '1 hộp gỗ Mun sơn mài cẩn hoa sen có đệm nhung sang trọng',
      'Khắc laser tên riêng / chữ ký mạ vàng độc bản lên thân bút & nắp hộp',
      'Thưởng thức bữa trưa cơm quê truyền thống và tiệc trà sen Tây Hồ',
      'Cấp Tem QR Định danh Di sản số độc bản lưu trữ trọn đời'
    ],
    image: '/images/product_but_ky_kham_trai.jpg',
    description: 'Trải nghiệm đỉnh cao của nghệ thuật cưa lọng vỏ ốc xà cừ Chuôn Ngọ. Tự tay cưa tách mảnh ốc đỏ ngũ sắc, nạm khảm thân bút tròn và sở hữu kỷ vật doanh nhân danh giá.'
  },
  {
    id: 'WS-02',
    title: 'Khóa Cẩn Vỏ Trứng & Khảm Xà Cừ Bát Trà Sơn Mài "Hoàng Kim Rạn Sắc"',
    type: 'Offline tại Làng Chuôn Ngọ',
    date: 'Thứ Bảy hằng tuần (08:30 - 13:00)',
    price: 850000,
    artisan: 'Nghệ nhân Bàn tay Vàng Trần Bá Dinh',
    location: 'Xưởng Khảm Bá Dinh, Cổng Đông Làng Nghề Chuôn Ngọ, Hà Nội',
    capacity: '10 người / khóa',
    includes: [
      '1 bát tiện gỗ mít nguyên khối chuẩn cốt sơn mài cổ truyền',
      'Khay vỏ trứng tự nhiên nung các sắc độ hổ phách độc bản',
      'Phiến xà cừ ngũ sắc đại dương mài điểm xuyết hoa văn',
      'Thực hành mài nước bóng phẳng mịn bằng lá chuối khô và bột than xoan',
      'Thưởng trà Shan Tuyết cổ thụ cùng bậc thầy Trần Bá Dinh'
    ],
    image: '/images/product_bat_can_trung.jpg',
    description: 'Học kỹ thuật nung rang vỏ trứng tạo sắc vàng son rạn nứt tự nhiên độc bản, kết hợp khảm xà cừ và mài phân tầng trên bát gỗ sơn mài truyền thống.'
  },
  {
    id: 'WS-03',
    title: 'Thiết Kế Vòng Tay Bản Liền & Chuỗi Hạt Xà Cừ (Contemporary Heritage)',
    type: 'Offline tại Studio Hà Nội',
    date: 'Thứ Bảy & Chủ Nhật (09:00 - 12:30 & 14:00 - 17:30)',
    price: 650000,
    artisan: 'Nghệ nhân Trương Công Hùng',
    location: 'Studio Không Gian Di Sản, 36 Tràng Tiền, Hoàn Kiếm, Hà Nội',
    capacity: '12 người / lớp',
    includes: [
      '1 cốt vòng tay hợp kim titan không gỉ mạ bạc chuẩn size cá nhân',
      'Bộ phiến xà cừ ngọc trai môi trắng vịnh Vân Phong tuyển chọn',
      '1 chuỗi hạt xà cừ tự nhiên (19-21 hạt) tiện tròn bóng mát',
      '1 hộp trưng bày khung mica chống bụi màng phim co giãn cao cấp',
      'Khắc laser tên hoặc lời nhắn nhủ bên trong lòng vòng tay'
    ],
    image: '/images/product_vong_tay_ban_kham_trai.jpg',
    description: 'Đưa xà cừ ngọc trai vào phụ kiện thời trang quý cô hiện đại: tự tay khảm vòng tay bản liền viền kim loại và tiện chuỗi hạt phong thủy mang về.'
  }
];

export const CRAFTING_STEPS = [
  {
    step: '01',
    title: 'Chọn & Xử Lý Vỏ Trai Tự Nhiên',
    desc: 'Tuyển chọn vỏ trai cửu khổng, vỏ ốc đỏ tự nhiên ngũ sắc, ngâm và tẩy làm sạch lớp biểu bì thô, xử lý nhiệt và ép phẳng thớ ốc.',
    icon: 'Feather',
    image: '/images/craft_step_1.jpg'
  },
  {
    step: '02',
    title: 'Vẽ Mẫu & Cưa Lọng Tách Ốc Xà Cừ',
    desc: 'Nghệ nhân dùng lưỡi cưa chỉ mỏng như sợi tóc cưa theo từng đường nét hoa văn. Kỹ thuật cưa lọng đòi hỏi sự chính xác tuyệt đối không sứt mẻ.',
    icon: 'Scissors',
    image: '/images/craft_step_2.jpg'
  },
  {
    step: '03',
    title: 'Đục Chạm Gỗ & Khảm Gắn Họa Tiết',
    desc: 'Đặt mảnh ốc xà cừ lên mặt gỗ quý (mun, trắc), dùng ve đục rãnh gỗ vừa khít độ dày mảnh xà cừ, gắn chặt bằng sơn ta tự nhiên và ép phẳng.',
    icon: 'Wrench',
    image: '/images/craft_step_3.jpg'
  },
  {
    step: '04',
    title: 'Mài Phẳng & Hoàn Thiện Bề Mặt Nước',
    desc: 'Mài phẳng bằng cát mịn phù sa sông Hồng và nước suối, sau đó đánh bóng bằng lá chuối khô để xà cừ phát ánh ngũ sắc rực rỡ.',
    icon: 'Layers',
    image: '/images/craft_step_4.jpg'
  },
  {
    step: '05',
    title: 'Sơn Phủ Bảo Vệ & Kiểm Tra Chất Lượng',
    desc: 'Phủ các lớp sơn ta tự nhiên bảo vệ bề mặt bóng gương, kiểm định chất lượng làng nghề và dán tem QR Hộ chiếu di sản số.',
    icon: 'Sparkles',
    image: '/images/craft_step_5.jpg'
  }
];

export const HERITAGE_TIMELINE = [
  {
    year: 'Thế kỷ XI (Thời Lý)',
    title: 'Khởi nguồn nghề khảm trai Chuôn Ngọ',
    desc: 'Tướng quân Trương Công Thành – vị quan dưới triều Lý sau khi dẹp giặc ngoại xâm đã truyền dạy cho nhân dân thôn Chuôn Ngọ nghề chạm khảm vỏ ốc, được tôn xưng là Thánh tổ nghề.'
  },
  {
    year: 'Thế kỷ XVIII - XIX (Triều Nguyễn)',
    title: 'Đỉnh cao đồ ngự dụng Cung đình Huế',
    desc: 'Các nghệ nhân Chuôn Ngọ được triều đình triệu tập về kinh đô Huế để chế tác ngai vàng, sập gụ, tủ chè, hộp sắc phong phục vụ Hoàng gia và triều đình phong kiến.'
  },
  {
    year: '1900 - 1930 (Thuộc địa & Triển lãm Paris)',
    title: 'Vươn tầm thế giới tại các Hội chợ Quốc tế',
    desc: 'Sản phẩm khảm ốc xà cừ Chuôn Ngọ tham gia Đấu xảo Quốc tế Paris (Exposition Universelle) và giành được nhiều huy chương vàng, được giới quý tộc Pháp vô cùng mến chuộng.'
  },
  {
    year: '2020 - Nay (Thời đại Số & SV Startup)',
    title: 'Kỷ nguyên Di sản số: Chuôn Ngọ Heritage',
    desc: 'Nhóm sáng lập sinh viên kết hợp với các nghệ nhân trẻ thực hiện chiến lược Re-design, số hóa sản phẩm bằng WebAR, định danh mã QR Passport và đưa di sản sống động vào phong cách sống của Gen Z.'
  }
];

