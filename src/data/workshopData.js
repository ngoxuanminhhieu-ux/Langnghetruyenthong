// Dữ liệu và dịch vụ lưu trữ cho Phân hệ Workshop Chuôn Ngọ Heritage
import { ARTISANS } from './heritageData';

// 1. QUY TRÌNH 6 BƯỚC KHẢM TRAI CHUÔN NGỌ
export const WORKSHOP_STEPS = [
  {
    step: '01',
    title: 'Khám Phá Lịch Sử & Thưởng Trà Sen Cổ',
    shortTitle: 'Khám phá lịch sử',
    desc: 'Lắng nghe nghệ nhân chia sẻ tích xưa về Tổ nghề Trương Công Thành thời Lý (thế kỷ XI), nguồn gốc nghìn năm của làng Chuôn Ngọ và chiêm ngưỡng các bảo vật khảm ốc cung đình truyền đời.',
    icon: 'BookOpen',
    duration: '25 phút',
    highlight: 'Hiểu cội nguồn tinh hoa di sản'
  },
  {
    step: '02',
    title: 'Phân Biệt Nguyên Liệu Ốc Xà Cừ & Gỗ Quý',
    shortTitle: 'Tìm hiểu nguyên liệu',
    desc: 'Cầm trên tay và phân biệt các dòng xà cừ quý hiếm: Ốc đỏ Singapore ngũ sắc hoàng gia, ốc xác New Zealand Paua, trai môi vàng cửu khổng cùng các thớ gỗ trắc, mun hoa, hương đá nguyên khối.',
    icon: 'Sparkles',
    duration: '20 phút',
    highlight: 'Cảm nhận ánh quang phổ đất trời'
  },
  {
    step: '03',
    title: 'Quan Sát Nghệ Nhân Thị Phạm Cưa Lọng',
    shortTitle: 'Thị phạm cưa lọng',
    desc: 'Chiêm ngưỡng nghệ nhân lão thành thao tác lưỡi cưa chỉ mỏng như sợi tóc. Từng đường lượn cánh sen, râu tôm, lông hạc uốn lượn sắc bén trên phiến ốc giòn mà không hề nứt vỡ.',
    icon: 'Eye',
    duration: '25 phút',
    highlight: 'Học hỏi bí quyết cầm cưa chuẩn xác'
  },
  {
    step: '04',
    title: 'Thực Hành Cưa Lọng & Đục Chạm Khảm Ốc',
    shortTitle: 'Thực hành chế tác',
    desc: 'Học viên tự tay ngồi vào bàn thợ mini an toàn, phác thảo hoa văn hoặc chữ khắc riêng, cưa lọng chi tiết ốc và tiến hành đục rãnh định hình chuẩn xác trên phôi gỗ của mình dưới sự kèm cặp 1-1.',
    icon: 'Wrench',
    duration: '70 phút',
    highlight: 'Tự tay sáng tạo tác phẩm độc bản'
  },
  {
    step: '05',
    title: 'Gắn Sơn Ta & Mài Bóng Bằng Lá Chuối Khô',
    shortTitle: 'Mài bóng & hoàn thiện',
    desc: 'Gắn mảnh ốc bằng sơn ta tự nhiên Phú Thọ nhào mùn gỗ mịn. Học kỹ thuật mài nước phân tầng 4 cấp độ và đánh bóng truyền thống bằng bẹ lá chuối khô giúp ánh xà cừ bật sáng rực rỡ.',
    icon: 'Palette',
    duration: '40 phút',
    highlight: 'Bí quyết truyền đời làng nghề'
  },
  {
    step: '06',
    title: 'Cấp Tem QR Di Sản Số & Nhận Thành Phẩm',
    shortTitle: 'Nhận tác phẩm mang về',
    desc: 'Đóng dấu triện son lưu niệm, dán tem QR Digital Passport định danh tác phẩm cá nhân, nhận chứng chỉ hoàn thành khóa học và đóng gói trong hộp quà lót nhung sang trọng mang về.',
    icon: 'Award',
    duration: '20 phút',
    highlight: '100% đem tác phẩm hoàn thiện về nhà'
  }
];

// 2. DANH SÁCH WORKSHOP ĐẶC SẮC (ĐỒNG BỘ 5 SẢN PHẨM THỦ CÔNG CHUÔN NGỌ)
export const INITIAL_WORKSHOPS = [
  {
    id: 'WS-01',
    title: 'Masterclass: Chế Tác Bút Ký Doanh Nhân Khảm Ốc Xà Cừ & Khắc Tên Mạ Vàng',
    shortDesc: 'Tự tay cưa lọng vỏ ốc xà cừ ngũ sắc, nạm khảm thân bút kim loại và khắc tên laser lên hộp gỗ mun sơn mài sang trọng.',
    fullDesc: 'Trải nghiệm đỉnh cao của nghệ thuật cưa lọng vỏ ốc xà cừ Chuôn Ngọ. Dưới sự chỉ dẫn 1-1 của Nghệ nhân Ưu tú Trương Kim Thành, học viên sẽ được tự tay cưa tách từng mảnh ốc đỏ Singapore ngũ sắc li ti, mài ghép chuẩn xác lên thân bút ký kim loại cao cấp mạ vàng 18K. Tác phẩm đi kèm hộp gỗ Mun sơn mài lót nhung và dịch vụ khắc laser tên riêng / chữ ký mạ vàng độc bản.',
    category: 'offline-village',
    categoryLabel: 'Làng nghề Chuôn Ngọ',
    level: 'Chuyên sâu & Nghệ nhân 1-1',
    duration: '1 ngày (08:30 - 16:30)',
    price: 1450000,
    originalPrice: 1850000,
    artisanId: 'ART-CHUONNGO-001',
    artisanName: 'Nghệ nhân Ưu tú Trương Kim Thành',
    location: 'Xưởng Mộc Cổ Gia Truyền họ Trương, Thôn Chuôn Ngọ, Xã Chuyên Mỹ, Phú Xuyên, Hà Nội',
    maxCapacity: 8,
    image: '/images/product_but_ky_kham_trai.jpg',
    gallery: [
      '/images/product_but_ky_kham_trai.jpg',
      '/images/product_vong_tay_ban_kham_trai.jpg',
      '/images/product_bat_can_trung.jpg',
      '/images/dinh_chuon_ngo.jpg'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PmIe2AV2WqQ',
    featured: true,
    rating: 5.0,
    reviewsCount: 74,
    includes: [
      'Xe Limousine đưa đón 2 chiều (Nhà hát Lớn Hà Nội ↔ Làng Chuôn Ngọ)',
      '1 Bút ký cao cấp phôi kim loại nạm vỏ ốc xà cừ đỏ Singapore ngũ sắc',
      '1 Hộp đựng bút bằng gỗ Mun sơn mài cẩn hoa sen có đệm nhung êm ái',
      'Khắc laser tên riêng / chữ ký mạ vàng theo yêu cầu lên thân bút & nắp hộp',
      'Bữa trưa cơm quê làng nghề đậm đà bản sắc và tiệc trà sen Tây Hồ',
      'Chứng chỉ hoàn thành khóa học và cấp Tem QR Định danh Di sản số độc bản'
    ],
    requirements: 'Dành cho doanh nhân, người yêu mỹ nghệ cao cấp và du khách muốn sở hữu kỷ vật danh giá mang dấu ấn cá nhân.',
    learningOutcomes: [
      'Nắm bắt kỹ thuật cưa lọng chỉ và nghệ thuật ghép ốc xà cừ ngũ sắc quanh thân tròn',
      'Hiểu bí quyết phủ bóng nano và bảo tồn ánh kim quang ngọc bích',
      'Sở hữu chiếc bút ký độc bản dùng cho ký kết hợp đồng và ngoại giao'
    ]
  },
  {
    id: 'WS-02',
    title: 'Khóa Cẩn Vỏ Trứng & Khảm Xà Cừ Bát Trà Sơn Mài "Hoàng Kim Rạn Sắc"',
    shortDesc: 'Học kỹ thuật nung rang vỏ trứng tạo sắc vàng son độc bản, cẩn xà cừ và mài phân tầng trên cốt gỗ mít nguyên khối.',
    fullDesc: 'Một ngày đắm chìm trong di sản nghệ thuật cẩn vỏ trứng và khảm trai độc nhất vô nhị của Chuôn Ngọ. Dưới sự chỉ dẫn của Nghệ nhân Bàn tay Vàng Trần Bá Dinh, bạn sẽ học cách nung rang vỏ trứng để tạo các sắc độ từ vàng cam, đỏ son đến trắng ngà, sau đó xếp cẩn lên bát gỗ mít tiện nguyên khối và mài bóng phân tầng bằng lá chuối khô truyền thống.',
    category: 'offline-village',
    categoryLabel: 'Làng nghề Chuôn Ngọ',
    level: 'Nâng cao & Trà đạo Tao nhã',
    duration: '4.5 giờ',
    price: 850000,
    originalPrice: 1100000,
    artisanId: 'ART-CHUONNGO-002',
    artisanName: 'Nghệ nhân Bàn tay Vàng Trần Bá Dinh',
    location: 'Xưởng Khảm Bá Dinh, Cổng Đông Làng Nghề Chuôn Ngọ, Hà Nội',
    maxCapacity: 10,
    image: '/images/product_bat_can_trung.jpg',
    gallery: [
      '/images/product_bat_can_trung.jpg',
      '/images/product_but_ky_kham_trai.jpg',
      '/images/product_chuoi_hat_xa_cu.jpg',
      '/images/clean_village_scene.jpg'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=-e4nc64W7-g',
    featured: true,
    rating: 4.9,
    reviewsCount: 58,
    includes: [
      '1 Bát tiện gỗ mít nguyên khối phủ sơn mài ta cổ truyền',
      'Khay nguyên liệu vỏ trứng tự nhiên nung các sắc độ hổ phách độc bản',
      'Bộ phiến xà cừ ngũ sắc đại dương mài điểm xuyết hoa văn',
      'Thực hành mài bóng bằng lá chuối khô và bột than xoan',
      'Thưởng thức tiệc trà Shan Tuyết cổ thụ trong không gian mộc truyền thống',
      'Tem QR Digital Passport xác thực tác phẩm chính gốc Chuôn Ngọ'
    ],
    requirements: 'Học viên từ 14 tuổi trở lên, tính kiên nhẫn và yêu thích không gian trà đạo thanh tao.',
    learningOutcomes: [
      'Kỹ thuật phân tầng màu vỏ trứng và tạo vân rạn nứt tự nhiên',
      'Phương pháp mài nước bóng phẳng mịn phân tầng độc nhất Việt Nam',
      'Mang về chiếc bát trà nghệ thuật decor sang trọng cho gia đình'
    ]
  },
  {
    id: 'WS-03',
    title: 'Thiết Kế Vòng Tay Bản Liền & Chuỗi Hạt Xà Cừ (Contemporary Heritage)',
    shortDesc: 'Đưa xà cừ ngọc trai vào phụ kiện thời trang quý cô: khảm vòng tay bản liền viền kim loại và tiện chuỗi hạt phong thủy.',
    fullDesc: 'Khóa trải nghiệm thời trang di sản đương đại tại Studio trung tâm Hà Nội. Bạn sẽ tự tay ghép các phiến xà cừ ngọc trai môi trắng tự nhiên lên vòng tay hợp kim titan mạ bạc sáng bóng, đồng thời xâu chuỗi hạt ngọc xà cừ tròn bóng mát lành. Tặng kèm hộp trưng bày màng phim mica cao cấp chống ẩm để mang tác phẩm về.',
    category: 'offline-studio',
    categoryLabel: 'Studio Hà Nội',
    level: 'Cơ bản (Dễ thực hiện)',
    duration: '3.5 giờ',
    price: 650000,
    originalPrice: 850000,
    artisanId: 'ART-CHUONNGO-003',
    artisanName: 'Nghệ nhân Trương Công Hùng',
    location: 'Không Gian Văn Hóa Chuôn Ngọ Heritage, 36 Tràng Tiền, Hoàn Kiếm, Hà Nội',
    maxCapacity: 12,
    image: '/images/product_vong_tay_ban_kham_trai.jpg',
    gallery: [
      '/images/product_vong_tay_ban_kham_trai.jpg',
      '/images/product_chuoi_hat_xa_cu.jpg',
      '/images/product_trang_suc_xa_cu.jpg',
      '/images/product_but_ky_kham_trai.jpg'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PmIe2AV2WqQ',
    featured: true,
    rating: 5.0,
    reviewsCount: 63,
    includes: [
      '1 Cốt vòng tay hợp kim titan mạ bạc chống gỉ cao cấp chuẩn size tay của bạn',
      'Bộ phiến xà cừ ngọc trai môi trắng vịnh Vân Phong tuyển chọn',
      '1 Chuỗi hạt xà cừ tự nhiên (19-21 hạt) tiện bóng mịn kèm dây co giãn kép',
      '1 Hộp trưng bày khung mica chống bụi màng phim co giãn',
      'Đồ uống thảo mộc và bánh hạt truyền thống miễn phí',
      'Khắc laser tên hoặc lời nhắn nhủ bên trong lòng vòng tay'
    ],
    requirements: 'Dành cho mọi quý cô, người trẻ yêu trang sức thủ công và quà tặng kỷ niệm tinh tế.',
    learningOutcomes: [
      'Hiểu cấu tạo vỏ trai ngọc và khúc xạ ánh ngũ sắc dưới ánh nắng',
      'Làm chủ thao tác dán ghép phiến xà cừ liền mạch không tì vết',
      'Tự tay hoàn thiện 2 món trang sức quý phái mang về nhà'
    ]
  },
  {
    id: 'WS-04',
    title: 'Trải Nghiệm Gia Đình & Trẻ Em: Cắt Lọng Charm Trang Sức Xà Cừ "Mộc Bản Ngũ Sắc"',
    shortDesc: 'Buổi sáng cuối tuần cho bố mẹ và bé tự tay cắt lọng charm hoa mai 5 cánh, giọt lệ xà cừ và gắn khuyên tai bạc 925.',
    fullDesc: 'Một hoạt động giáo dục di sản trực quan và gắn kết tình cảm gia đình. Trẻ em và phụ huynh sẽ được trang bị những mảnh ốc xà cừ tự nhiên đã được mài nhẵn các góc sắc an toàn. Các bé được tự do sáng tạo cắt lọng hình hoa mai ngũ phúc, khuyên tròn hay giọt nước lấp lánh, gắn khoen bạc 925 làm khuyên tai hoặc mặt dây chuyền tặng mẹ và người thân.',
    category: 'family',
    categoryLabel: 'Gia đình & Trẻ em',
    level: 'Mọi lứa tuổi (Từ 6 tuổi trở lên)',
    duration: '2.5 giờ',
    price: 420000,
    originalPrice: 550000,
    artisanId: 'ART-CHUONNGO-003',
    artisanName: 'Nghệ nhân Trương Công Hùng',
    location: 'Không Gian Văn Hóa Chuôn Ngọ Heritage, 36 Tràng Tiền, Hoàn Kiếm, Hà Nội',
    maxCapacity: 16,
    image: '/images/product_trang_suc_xa_cu.jpg',
    gallery: [
      '/images/product_trang_suc_xa_cu.jpg',
      '/images/product_vong_tay_ban_kham_trai.jpg',
      '/images/product_chuoi_hat_xa_cu.jpg'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PmIe2AV2WqQ',
    featured: false,
    rating: 4.9,
    reviewsCount: 48,
    includes: [
      'Khay nguyên liệu xà cừ đại dương nhiều màu sắc đã bo tròn góc an toàn cho bé',
      'Set móc khuyên tai và khoen nối bằng bạc 925 chống dị ứng',
      'Hộp quà giấy mỹ thuật đựng set charm sau khi hoàn thiện',
      'Tạp dề mini và găng tay thủ công cho bé',
      'Giấy chứng nhận "Đại Sứ Nhí Di Sản Chuôn Ngọ"',
      'Chụp ảnh gia đình lưu niệm phong cách cổ truyền'
    ],
    requirements: 'Bé từ 6 - 15 tuổi đi kèm phụ huynh (Phụ huynh đi kèm hỗ trợ không tính thêm vé).',
    learningOutcomes: [
      'Nuôi dưỡng tình yêu di sản văn hóa Việt Nam ngay từ nhỏ',
      'Phát triển tư duy tạo hình, đôi bàn tay khéo léo và tính kiên nhẫn',
      'Mang về bộ trang sức charm xà cừ độc nhất tặng người thân'
    ]
  },
  {
    id: 'WS-05',
    title: 'Online Masterclass & DIY Kit: Tự Tay Chế Tác Bút Ký / Chuỗi Vòng Tại Nhà',
    shortDesc: 'Nhận hộp DIY Craft Kit tận nhà với đầy đủ phôi bút, vỏ ốc xà cừ và kết nối trực tuyến 1-1 cùng nghệ nhân qua Zoom.',
    fullDesc: 'Dành cho bạn bè ở mọi tỉnh thành trên cả nước và các kiều bào xa quê hương. Chúng tôi đóng gói trọn bộ DIY Kit chuẩn nghệ nhân Chuôn Ngọ với đầy đủ phôi bút ký / phôi vòng tay, vỏ ốc xà cừ ngũ sắc, cưa lọng mini chuyên dụng, keo dán sinh học, giấy nhám các số và video 4K hướng dẫn. Vào tối cuối tuần, bạn sẽ kết nối cùng nghệ nhân qua Zoom để được chỉ dẫn từng thao tác và hoàn thiện tác phẩm tại bàn làm việc của mình.',
    category: 'online-diy',
    categoryLabel: 'Trực tuyến & DIY Kit',
    level: 'Linh hoạt tại nhà',
    duration: '2 giờ trực tuyến + Video lưu trữ trọn đời',
    price: 490000,
    originalPrice: 650000,
    artisanId: 'ART-CHUONNGO-003',
    artisanName: 'Nghệ nhân Trương Công Hùng',
    location: 'Phòng Zoom Trực Tuyến (Ship trọn gói DIY Kit tận nhà toàn quốc)',
    maxCapacity: 35,
    image: '/images/product_chuoi_hat_xa_cu.jpg',
    gallery: [
      '/images/product_chuoi_hat_xa_cu.jpg',
      '/images/product_but_ky_kham_trai.jpg',
      '/images/product_trang_suc_xa_cu.jpg'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PmIe2AV2WqQ',
    featured: false,
    rating: 4.8,
    reviewsCount: 84,
    includes: [
      '1 Hộp DIY Craft Kit chuẩn nghệ nhân gửi chuyển phát nhanh tận nhà',
      '1 Phôi bút ký nạm ngọc hoặc phôi vòng xà cừ tùy chọn',
      'Bộ phiến xà cừ ngũ sắc đại dương tuyển chọn',
      'Khung cưa lọng mini gia đình, keo dán sinh học, giấy nhám 4 số',
      'Link phòng Zoom tương tác trực tiếp giải đáp 1-1 cùng nghệ nhân',
      'Tài khoản xem video bài giảng 4K chuẩn HD không giới hạn thời gian'
    ],
    requirements: 'Máy tính hoặc điện thoại có kết nối internet để vào Zoom, không gian bàn làm việc nhỏ tại nhà.',
    learningOutcomes: [
      'Trải nghiệm liệu pháp thư giãn sáng tạo nghệ thuật (Art Therapy)',
      'Tự làm quà tặng thủ công ý nghĩa cho đối tác hoặc người thân',
      'Gia nhập cộng đồng người trẻ bảo tồn làng nghề Chuôn Ngọ'
    ]
  }
];

// 3. LỊCH CÁC CA HỌC CHI TIẾT (WORKSHOP SCHEDULES)
// Cung cấp các ca học thực tế với ngày, khung giờ, địa điểm, sức chứa tối đa và số chỗ đã đặt
export const INITIAL_SCHEDULES = [
  {
    id: 'SCH-01',
    workshopId: 'WS-01',
    date: '2026-11-21',
    dateDisplay: 'Thứ Bảy, 21/11/2026',
    timeSlot: '09:00 - 12:30',
    shift: 'morning',
    artisanId: 'ART-CHUONNGO-003',
    artisanName: 'Nghệ nhân Trương Công Hùng',
    location: '36 Tràng Tiền, Hoàn Kiếm, Hà Nội',
    maxSeats: 12,
    bookedSeats: 8,
    status: 'open' // 'open' (còn chỗ), 'filling' (sắp hết), 'full' (hết chỗ)
  },
  {
    id: 'SCH-02',
    workshopId: 'WS-01',
    date: '2026-11-21',
    dateDisplay: 'Thứ Bảy, 21/11/2026',
    timeSlot: '14:00 - 17:30',
    shift: 'afternoon',
    artisanId: 'ART-CHUONNGO-003',
    artisanName: 'Nghệ nhân Trương Công Hùng',
    location: '36 Tràng Tiền, Hoàn Kiếm, Hà Nội',
    maxSeats: 12,
    bookedSeats: 11,
    status: 'filling'
  },
  {
    id: 'SCH-03',
    workshopId: 'WS-01',
    date: '2026-11-28',
    dateDisplay: 'Thứ Bảy, 28/11/2026',
    timeSlot: '09:00 - 12:30',
    shift: 'morning',
    artisanId: 'ART-CHUONNGO-003',
    artisanName: 'Nghệ nhân Trương Công Hùng',
    location: '36 Tràng Tiền, Hoàn Kiếm, Hà Nội',
    maxSeats: 12,
    bookedSeats: 12,
    status: 'full'
  },
  {
    id: 'SCH-04',
    workshopId: 'WS-02',
    date: '2026-11-22',
    dateDisplay: 'Chủ Nhật, 22/11/2026',
    timeSlot: '08:30 - 16:30',
    shift: 'allday',
    artisanId: 'ART-CHUONNGO-001',
    artisanName: 'Nghệ nhân Ưu tú Trương Kim Thành',
    location: 'Làng nghề Chuôn Ngọ, Phú Xuyên, Hà Nội',
    maxSeats: 8,
    bookedSeats: 5,
    status: 'open'
  },
  {
    id: 'SCH-05',
    workshopId: 'WS-02',
    date: '2026-11-29',
    dateDisplay: 'Chủ Nhật, 29/11/2026',
    timeSlot: '08:30 - 16:30',
    shift: 'allday',
    artisanId: 'ART-CHUONNGO-001',
    artisanName: 'Nghệ nhân Ưu tú Trương Kim Thành',
    location: 'Làng nghề Chuôn Ngọ, Phú Xuyên, Hà Nội',
    maxSeats: 8,
    bookedSeats: 7,
    status: 'filling'
  },
  {
    id: 'SCH-06',
    workshopId: 'WS-03',
    date: '2026-11-22',
    dateDisplay: 'Chủ Nhật, 22/11/2026',
    timeSlot: '13:30 - 18:00',
    shift: 'afternoon',
    artisanId: 'ART-CHUONNGO-002',
    artisanName: 'Nghệ nhân Bàn tay Vàng Trần Bá Dinh',
    location: 'Cổng Đông Làng Nghề Chuôn Ngọ',
    maxSeats: 10,
    bookedSeats: 6,
    status: 'open'
  },
  {
    id: 'SCH-07',
    workshopId: 'WS-04',
    date: '2026-11-22',
    dateDisplay: 'Chủ Nhật, 22/11/2026',
    timeSlot: '09:00 - 11:30',
    shift: 'morning',
    artisanId: 'ART-CHUONNGO-003',
    artisanName: 'Nghệ nhân Trương Công Hùng',
    location: '36 Tràng Tiền, Hoàn Kiếm, Hà Nội',
    maxSeats: 16,
    bookedSeats: 9,
    status: 'open'
  },
  {
    id: 'SCH-08',
    workshopId: 'WS-04',
    date: '2026-11-29',
    dateDisplay: 'Chủ Nhật, 29/11/2026',
    timeSlot: '09:00 - 11:30',
    shift: 'morning',
    artisanId: 'ART-CHUONNGO-003',
    artisanName: 'Nghệ nhân Trương Công Hùng',
    location: '36 Tràng Tiền, Hoàn Kiếm, Hà Nội',
    maxSeats: 16,
    bookedSeats: 15,
    status: 'filling'
  },
  {
    id: 'SCH-09',
    workshopId: 'WS-05',
    date: '2026-11-20',
    dateDisplay: 'Tối Thứ Sáu, 20/11/2026',
    timeSlot: '19:30 - 21:30',
    shift: 'evening',
    artisanId: 'ART-CHUONNGO-003',
    artisanName: 'Nghệ nhân Trương Công Hùng',
    location: 'Trực tuyến Zoom (Ship Kit toàn quốc)',
    maxSeats: 35,
    bookedSeats: 18,
    status: 'open'
  },
  {
    id: 'SCH-10',
    workshopId: 'WS-05',
    date: '2026-11-27',
    dateDisplay: 'Tối Thứ Sáu, 27/11/2026',
    timeSlot: '19:30 - 21:30',
    shift: 'evening',
    artisanId: 'ART-CHUONNGO-003',
    artisanName: 'Nghệ nhân Trương Công Hùng',
    location: 'Trực tuyến Zoom (Ship Kit toàn quốc)',
    maxSeats: 35,
    bookedSeats: 35,
    status: 'full'
  }
];

// 4. DANH SÁCH ĐĂNG KÝ MẪU (INITIAL BOOKINGS)
export const INITIAL_BOOKINGS = [
  {
    id: 'WBK-89210',
    workshopId: 'WS-01',
    workshopTitle: 'Masterclass: Chế Tác Bút Ký Doanh Nhân Khảm Ốc Xà Cừ & Khắc Tên Mạ Vàng',
    scheduleId: 'SCH-01',
    sessionDate: 'Thứ Bảy, 21/11/2026 (09:00 - 12:30)',
    customerName: 'Nguyễn Minh Anh',
    customerPhone: '0988 123 456',
    customerEmail: 'minhanh.heritage@gmail.com',
    participants: 1,
    unitPrice: 650000,
    totalPrice: 650000,
    paidAmount: 650000,
    customNote: 'Dòng máy iPhone 16 Pro Max - Khắc chữ thư pháp "Minh Anh"',
    qrCode: 'CNH-WS-TICKET-89210-2026',
    status: 'confirmed', // 'confirmed', 'attended', 'completed', 'cancelled'
    paymentStatus: 'paid',
    createdAt: '15/11/2026 14:30'
  },
  {
    id: 'WBK-51928',
    workshopId: 'WS-02',
    workshopTitle: 'Masterclass: Bí Mật Khảm Ốc Ngũ Sắc & Đầm Sen Thượng Uyển',
    scheduleId: 'SCH-04',
    sessionDate: 'Chủ Nhật, 22/11/2026 (08:30 - 16:30)',
    customerName: 'Trần Hoàng Long',
    customerPhone: '0912 345 678',
    customerEmail: 'hoanglong.design@gmail.com',
    participants: 2,
    unitPrice: 1450000,
    totalPrice: 2900000,
    paidAmount: 1450000,
    customNote: 'Đi cùng bạn gái nhân dịp kỷ niệm, đón tại Nhà hát Lớn',
    qrCode: 'CNH-WS-TICKET-51928-2026',
    status: 'confirmed',
    paymentStatus: 'deposit50',
    createdAt: '14/11/2026 10:15'
  },
  {
    id: 'WBK-33419',
    workshopId: 'WS-04',
    workshopTitle: 'Trải Nghiệm Gia Đình & Trẻ Em: Khảm Tranh Treo Tường Mini "Sen Vàng"',
    scheduleId: 'SCH-07',
    sessionDate: 'Chủ Nhật, 22/11/2026 (09:00 - 11:30)',
    customerName: 'Lê Thu Trang',
    customerPhone: '0977 888 999',
    customerEmail: 'thutrang.mom@gmail.com',
    participants: 2,
    unitPrice: 480000,
    totalPrice: 960000,
    paidAmount: 960000,
    customNote: 'Hai mẹ con và bé Bắp 8 tuổi',
    qrCode: 'CNH-WS-TICKET-33419-2026',
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '16/11/2026 09:00'
  }
];

// 5. ĐÁNH GIÁ CỦA HỌC VIÊN (REVIEWS)
export const INITIAL_REVIEWS = [
  {
    id: 'REV-01',
    workshopId: 'WS-01',
    workshopTitle: 'Masterclass: Chế Tác Bút Ký Doanh Nhân Khảm Ốc Xà Cừ & Khắc Tên Mạ Vàng',
    studentName: 'Hoàng Thùy Linh',
    studentRole: 'Doanh nhân khởi nghiệp, Hà Nội',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '15/11/2026',
    comment: 'Trải nghiệm vượt xa kỳ vọng! Nghệ nhân Trương Kim Thành hướng dẫn siêu nhiệt tình, từ cách cưa lọng ốc đỏ Singapore không bị mẻ đến cách ghép từng phiến xà cừ ôm sát thân bút tròn. Chiếc bút khắc tên mạ vàng cầm đầm tay, viết siêu êm, để trên bàn làm việc ai cũng trầm trồ.',
    projectImage: '/images/product_but_ky_kham_trai.jpg',
    likesCount: 38,
    tags: ['Nghệ nhân 1-1', 'Bút ký sang trọng', 'Khắc tên độc bản']
  },
  {
    id: 'REV-02',
    workshopId: 'WS-02',
    workshopTitle: 'Khóa Cẩn Vỏ Trứng & Khảm Xà Cừ Bát Trà Sơn Mài "Hoàng Kim Rạn Sắc"',
    studentName: 'Đặng Tuấn Kiệt',
    studentRole: 'Kiến trúc sư Nội thất',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '12/11/2026',
    comment: 'Chuyến đi làng Chuôn Ngọ rất giàu cảm xúc. Thầy Bá Dinh chỉ bảo tận tình bí quyết nung vỏ trứng tạo sắc hổ phách và mài nước bằng lá chuối khô. Chiếc bát sau khi hoàn thiện óng ánh rạn băng tuyết tuyệt mỹ.',
    projectImage: '/images/product_bat_can_trung.jpg',
    likesCount: 52,
    tags: ['Nghệ nhân đại thụ', 'Vân rạn độc bản', 'Cốt gỗ mít chuẩn']
  },
  {
    id: 'REV-03',
    workshopId: 'WS-03',
    workshopTitle: 'Thiết Kế Vòng Tay Bản Liền & Chuỗi Hạt Xà Cừ (Contemporary Heritage)',
    studentName: 'Vũ Minh Hằng',
    studentRole: 'Stylist & Giám đốc Sáng tạo',
    studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '09/11/2026',
    comment: 'Mình mê trang sức xà cừ từ lâu. Khóa học tại Tràng Tiền rất tiện, vòng tay bản liền viền kim loại tôn da và chuỗi hạt xà cừ cầm mát lạnh. Đem về có hộp mica chống ẩm để bàn xinh xắn.',
    projectImage: '/images/product_vong_tay_ban_kham_trai.jpg',
    likesCount: 41,
    tags: ['Thời trang hiện đại', 'Xà cừ ngọc biển', 'Hộp trưng bày đẹp']
  },
  {
    id: 'REV-04',
    workshopId: 'WS-05',
    workshopTitle: 'Online Masterclass & DIY Kit: Tự Tay Chế Tác Bút Ký / Chuỗi Vòng Tại Nhà',
    studentName: 'Nguyễn Bảo Trâm',
    studentRole: 'Du học sinh tại Melbourne, Úc',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '04/11/2026',
    comment: 'Hộp DIY Kit đóng gói cẩn thận, từng phiến xà cừ biển sâu phản quang lấp lánh. Học qua Zoom được nghệ nhân chỉ dẫn từng ly từng tí. Tự tay hoàn thiện chiếc vòng và bút ký mang đi tặng bạn bè quốc tế ai cũng thán phục nét tinh xảo của thủ công Việt Nam.',
    projectImage: '/images/product_chuoi_hat_xa_cu.jpg',
    likesCount: 35,
    tags: ['Ship kit chu đáo', 'Kết nối kiều bào', 'Di sản tự hào']
  }
];

// 6. BỘ SƯU TẬP TÁC PHẨM HỌC VIÊN HOÀN THÀNH (SHOWCASE GALLERY)
export const STUDENT_SHOWCASE = [
  {
    id: 'SC-01',
    title: 'Bút Ký Doanh Nhân Khảm Ốc Ngũ Sắc Khắc Tên',
    student: 'Minh Anh (Doanh nhân trẻ Hà Nội)',
    workshopTitle: 'Masterclass Bút Ký Làng Chuôn Ngọ',
    image: '/images/product_but_ky_kham_trai.jpg',
    badge: 'Tác phẩm xuất sắc'
  },
  {
    id: 'SC-02',
    title: 'Bát Sơn Mài Cẩn Vỏ Trứng Rạn Hoàng Kim',
    student: 'Thái An (Hải Phòng)',
    workshopTitle: 'Khóa Cẩn Vỏ Trứng & Khảm Xà Cừ',
    image: '/images/product_bat_can_trung.jpg',
    badge: 'Giải Nhất Khéo Tay'
  },
  {
    id: 'SC-03',
    title: 'Vòng Tay Bản Liền Bạch Ngọc Liên Hoa',
    student: 'Bảo Ngọc (TP. Hồ Chí Minh)',
    workshopTitle: 'Thiết Kế Trang Sức Xà Cừ Quý Cô',
    image: '/images/product_vong_tay_ban_kham_trai.jpg',
    badge: 'Thời trang di sản'
  },
  {
    id: 'SC-04',
    title: 'Chuỗi Vòng Tay Hạt Xà Cừ Tự Nhiên & Hộp Mica',
    student: 'Quốc Bảo (Đà Nẵng)',
    workshopTitle: 'Khóa Tiện Hạt & Phong Thủy Tâm An',
    image: '/images/product_chuoi_hat_xa_cu.jpg',
    badge: 'Độc bản tao nhã'
  },
  {
    id: 'SC-05',
    title: 'Set Charm Hoa Mai & Khuyên Tai Xà Cừ Mộc Bản',
    student: 'Thanh Vân & Bé Sam',
    workshopTitle: 'Workshop Trẻ Em & Gia Đình',
    image: '/images/product_trang_suc_xa_cu.jpg',
    badge: 'Đại sứ nhí di sản'
  }
];

// 7. HÀM SERVICE TIỆN ÍCH LƯU TRỮ VÀO LOCALSTORAGE
const STORAGE_KEYS = {
  WORKSHOPS: 'chuonngo_workshops_list',
  SCHEDULES: 'chuonngo_workshop_schedules',
  BOOKINGS: 'chuonngo_workshop_bookings',
  REVIEWS: 'chuonngo_workshop_reviews',
  ARTISANS: 'chuonngo_workshop_artisans'
};

export const getStoredWorkshops = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.WORKSHOPS);
    if (!saved) return INITIAL_WORKSHOPS;
    const parsed = JSON.parse(saved);
    // Tự động kiểm tra và xóa cache nếu tồn tại dữ liệu cũ (ốp lưng điện thoại / hộp cũ)
    const isStale = !Array.isArray(parsed) || parsed.some(w => 
      !w.image || 
      w.image.includes('cat_phone') || 
      w.image.includes('hd_cat_phone') || 
      w.image.includes('hd_cat_box') || 
      w.image.includes('hd_cat_tray') ||
      w.title.includes('Ốp Lưng')
    );
    if (isStale) {
      localStorage.setItem(STORAGE_KEYS.WORKSHOPS, JSON.stringify(INITIAL_WORKSHOPS));
      return INITIAL_WORKSHOPS;
    }
    return parsed;
  } catch {
    return INITIAL_WORKSHOPS;
  }
};

export const saveStoredWorkshops = (workshops) => {
  localStorage.setItem(STORAGE_KEYS.WORKSHOPS, JSON.stringify(workshops));
};

export const getStoredSchedules = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SCHEDULES);
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULES;
  } catch {
    return INITIAL_SCHEDULES;
  }
};

export const saveStoredSchedules = (schedules) => {
  localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(schedules));
};

export const getStoredBookings = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  } catch {
    return INITIAL_BOOKINGS;
  }
};

export const saveStoredBookings = (bookings) => {
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
};

export const getStoredReviews = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (!saved) return INITIAL_REVIEWS;
    const parsed = JSON.parse(saved);
    const isStale = !Array.isArray(parsed) || parsed.some(r => r.projectImage?.includes('hd_cat_phone') || r.workshopTitle?.includes('Ốp Lưng'));
    if (isStale) {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    return parsed;
  } catch {
    return INITIAL_REVIEWS;
  }
};

export const saveStoredReviews = (reviews) => {
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
};

export const getStoredArtisans = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.ARTISANS);
    return saved ? JSON.parse(saved) : ARTISANS;
  } catch {
    return ARTISANS;
  }
};

export const saveStoredArtisans = (artisans) => {
  localStorage.setItem(STORAGE_KEYS.ARTISANS, JSON.stringify(artisans));
};
