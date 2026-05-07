const characters = [
  {
    id: "chi-pheo",
    name: "Chí Phèo",
    work: "Chí Phèo",
    author: "Nam Cao",
    initial: "C",
    artA: "#2c1f1b",
    artB: "#8a3d22",
    artTitle: "Làng Vũ Đại",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwtes59noXJn0ueuoo3KTimSDM0Ny4Tu_sIMVMFYCpK4O0cMBTNzorNrvgztQ-ve8ROj0cSubCTzVoQ17f5jwSbT-ufDAxxC0gdq9VEAvTAdDs3cBGEeISo37PLpkwt3d-VMBEO7cmA5dKi8WF7kyWxFGJ5dlO1LqIiZeM14ouVYlR7roPwNE3cU3W662ngNF8JDhwhyFcZJrnMiRpkmP4_0Wo1Vw2I8mBvt79h06BvSy7HtstRP0DUUFxvS-3d5iSMLvV1N2uwkMf",
    imageBrief: "Người đàn ông gầy gò, mặt đầy sẹo, áo nâu sờn rách, tay cầm chai rượu, lảo đảo giữa làng quê.",
    bio: "Trai làng Vũ Đại. Bề ngoài hổ báo nhưng bên trong đầy vết xước. Khao khát lớn nhất là được làm người lương thiện.",
    quote: "Tao muốn làm người lương thiện! Ai cho tao lương thiện?",
    personality: "Hung hãn, liều lĩnh sau khi bị tha hóa; nhưng khi được yêu thương thì nhạy cảm, yếu đuối và khao khát bình yên.",
    conflict: "Giằng xé giữa bản ngã bị xã hội biến dạng và phần lương thiện bừng tỉnh sau bát cháo hành.",
    context: "Làng quê Việt Nam trước Cách mạng tháng Tám, nơi cường hào ác bá đẩy người nông dân vào bần cùng hóa và lưu manh hóa.",
    sources: [
      "Tiếng chửi mở đầu cho thấy Chí Phèo bị cả làng Vũ Đại gạt khỏi cộng đồng người.",
      "Bát cháo hành của Thị Nở đánh thức khát vọng sống lương thiện và được yêu thương.",
      "Cái lò gạch cũ gợi vòng luẩn quẩn của những kiếp người bị xã hội bỏ rơi."
    ],
    voice: "thô ráp, đau đớn, có lúc bừng lên mong muốn được công nhận là con người",
    challenge: [
      q("Nguyên nhân sâu xa nào đẩy Chí Phèo vào con đường lưu manh hóa?", ["Bản chất Chí vốn ác độc từ nhỏ", "Nhà tù thực dân và cường hào làng Vũ Đại đã tha hóa người nông dân", "Chí không thích lao động", "Thị Nở ruồng bỏ Chí ngay từ đầu"], 1, "Bi kịch của Chí bắt nguồn từ xã hội phi nhân đạo: Bá Kiến đẩy Chí vào tù, nhà tù biến anh canh điền hiền lành thành kẻ lưu manh."),
      q("Bát cháo hành có ý nghĩa biểu tượng gì?", ["Một món ăn lạ của làng Vũ Đại", "Tình người giản dị đánh thức phần lương thiện", "Sự giàu có của Thị Nở", "Lý do Chí ghét Bá Kiến"], 1, "Bát cháo hành là biểu tượng của tình thương mộc mạc, làm Chí lần đầu cảm nhận được chăm sóc và muốn trở lại làm người."),
      q("Vì sao Chí đến nhà Bá Kiến trong đoạn cuối?", ["Chí nhận ra kẻ đã cướp quyền làm người của mình", "Chí muốn xin tiền uống rượu", "Chí đi tìm Thị Nở", "Chí muốn rời làng"], 0, "Sau khi bị từ chối đường về với cộng đồng, Chí hướng tới Bá Kiến như nguồn gốc trực tiếp của bi kịch đời mình."),
      q("Tiếng chửi đầu tác phẩm phản ánh tâm trạng gì?", ["Niềm vui hội làng", "Nỗi cô độc cùng cực và khát khao được đáp lời", "Sự bình thản của một người say", "Thái độ khinh thường Thị Nở"], 1, "Chí chửi để tìm một mối liên hệ với đời, nhưng không ai đáp lại, nên tiếng chửi phơi bày sự cô độc tuyệt đối."),
      q("Cái lò gạch cũ xuất hiện đầu và cuối tác phẩm gợi điều gì?", ["Một nơi làm ăn phát đạt", "Vòng lặp bi kịch có thể tiếp diễn với những đứa trẻ bị bỏ rơi", "Ký ức đẹp của Chí và Thị Nở", "Nơi Bá Kiến giấu của"], 1, "Hình ảnh này mở ra khả năng bi kịch Chí Phèo chưa chấm dứt khi xã hội cũ vẫn còn nguyên cơ chế áp bức.")
    ]
  },
  {
    id: "mi",
    name: "Mị",
    work: "Vợ chồng A Phủ",
    author: "Tô Hoài",
    initial: "M",
    artA: "#1f2930",
    artB: "#6c7b58",
    artTitle: "Căn buồng Hồng Ngài",
    imageBrief: "Thiếu nữ người Mông ngồi quay sợi bên cửa sổ nhỏ, ánh mắt hướng ra núi rừng Tây Bắc.",
    bio: "Từng thổi sáo rất hay, nay mắc kẹt trong kiếp con dâu gạt nợ. Bên trong vẻ lặng câm là sức sống đang hồi sinh.",
    quote: "Mị trẻ lắm. Mị vẫn còn trẻ. Mị muốn đi chơi.",
    personality: "Bề ngoài cam chịu, nhẫn nhục; bên trong có sức sống tiềm tàng, lòng thương người và khát vọng tự do.",
    conflict: "Tê liệt cảm xúc vì áp bức đối lập với tuổi trẻ, tiếng sáo mùa xuân và lòng thương A Phủ.",
    context: "Tây Bắc trước giải phóng, đồng bào dân tộc thiểu số bị áp bức bởi cường quyền chúa đất và thần quyền cúng trình ma.",
    sources: [
      "Căn buồng có ô cửa nhỏ như nhà tù tinh thần của Mị.",
      "Tiếng sáo đêm xuân khơi lại ký ức tuổi trẻ và khát vọng đi chơi.",
      "Dòng nước mắt của A Phủ khiến Mị nhận ra nỗi đau chung của người bị áp bức."
    ],
    voice: "ít lời, nén đau, nhưng khi nói về tự do thì sáng và quyết liệt",
    challenge: [
      q("Vì sao Mị trở thành con dâu gạt nợ?", ["Vì món nợ truyền đời của cha mẹ với nhà thống lý", "Vì Mị tự nguyện vào nhà Pá Tra", "Vì Mị muốn giàu có", "Vì A Phủ ép Mị"], 0, "Mị bị bắt làm con dâu gạt nợ để trả món nợ của gia đình, cho thấy sự áp bức bằng cả tiền bạc và hủ tục."),
      q("Căn buồng của Mị tượng trưng cho điều gì?", ["Không gian tự do", "Nhà tù tinh thần giam hãm tuổi trẻ", "Nơi học chữ", "Căn phòng hạnh phúc"], 1, "Ô cửa nhỏ, tối tăm làm nổi bật kiếp sống bị vùi lấp và mất cảm giác thời gian của Mị."),
      q("Yếu tố nào đánh thức Mị trong đêm tình mùa xuân?", ["Tiếng sáo, men rượu và không khí mùa xuân", "Một lá thư từ cha", "Lời khen của A Sử", "Lệnh của thống lý"], 0, "Không khí mùa xuân cùng tiếng sáo và men rượu kéo Mị trở về ký ức tuổi trẻ, làm khát vọng sống trỗi dậy."),
      q("Dòng nước mắt của A Phủ tạo bước ngoặt gì?", ["Mị thấy mình và A Phủ cùng thân phận bị áp bức", "Mị sợ A Phủ trách mình", "Mị muốn báo thù A Phủ", "Mị quyết định ở lại"], 0, "Dòng nước mắt giúp Mị chuyển từ tê liệt sang thương người, rồi thành hành động cứu A Phủ và tự cứu mình."),
      q("Hành động cắt dây cởi trói cho A Phủ có ý nghĩa gì?", ["Khẳng định sức phản kháng và giá trị nhân đạo", "Chỉ là hành động bốc đồng", "Làm Mị mất hết hy vọng", "Chứng minh Mị vô cảm"], 0, "Đây là bước giải phóng: Mị cứu người khác đồng thời thoát khỏi nhà thống lý.")
    ]
  },
  {
    id: "xuan-toc-do",
    name: "Xuân Tóc Đỏ",
    work: "Số đỏ",
    author: "Vũ Trọng Phụng",
    initial: "X",
    artA: "#78341d",
    artB: "#0d2b45",
    artTitle: "Hà Nội Âu hóa",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqK7d3Ww0zpC4mg8eZGJ5rmnd0s9gNWibZHNYDDHlHiI-J_mXeoPtJtYmKSBylq-LbLnlyVnKvin6R1i5NzNoHP5Kkm4zerB8P_EkpVdV7aBTIKWBAkhF9Vys3eiOx5SiCPC_GBF1Rwzs1uGCwpI4R-1_RyIlRJp0rX5gBOKCay-h8hr9uWp9LncnuoYJM8Sd9q6IQX_OH-ywZgTUNDRBfLBhrgfwTZuyF7FjAOIU_vVTpDBrGvCmLONNhdjEprKwdYraxdf9gLlxf",
    imageBrief: "Thanh niên tóc đỏ, vest tây lố lăng, cầm vợt tennis trước phố Hà Nội thời Pháp thuộc.",
    bio: "Từ nhặt bóng quần vợt và bán thuốc lậu, Xuân leo lên thành đốc tờ, vĩ nhân, anh hùng nhờ xã hội thượng lưu kệch cỡm.",
    quote: "Thưa các ngài! Mẹ kiếp! Nước mẹ gì!",
    personality: "Tinh ranh, cơ hội, mặt dày, giỏi học mót và đọc vị sự đạo đức giả của giới thượng lưu.",
    conflict: "Không có bi kịch nội tâm sâu; mâu thuẫn nằm ở xã hội tôn vinh một kẻ vô lại thành vĩ nhân.",
    context: "Đô thị Việt Nam thời Pháp thuộc thập niên 1930, nơi phong trào Âu hóa rởm đảo lộn giá trị thật giả.",
    sources: [
      "Xuân thành công vì xã hội thượng lưu cần những nhãn hiệu văn minh giả.",
      "Hạnh phúc của một tang gia phơi bày niềm vui lố bịch trước cái chết.",
      "Tiếng cười trào phúng nhắm vào cả Xuân lẫn môi trường đã tạo ra Xuân."
    ],
    voice: "láu cá, tự mãn, nói năng bốc đồng nhưng lộ bản chất châm biếm",
    challenge: [
      q("Vì sao Xuân có thể leo lên đỉnh danh vọng?", ["Vì tài học uyên bác", "Vì xã hội thượng lưu giả dối dễ tôn vinh hình thức", "Vì Xuân là quý tộc", "Vì Xuân làm cách mạng"], 1, "Sự thăng tiến của Xuân tố cáo xã hội chạy theo danh hão và Âu hóa rởm."),
      q("Hạnh phúc của một tang gia trào phúng ở điểm nào?", ["Mọi người đau buồn thật lòng", "Cái chết trở thành dịp khoe mẽ và mưu lợi", "Đám tang diễn ra giản dị", "Xuân bị trừng phạt"], 1, "Tiếng cười bật ra từ nghịch lý: tang gia mà ai cũng có lý do để sung sướng."),
      q("Xuân Tóc Đỏ là sản phẩm hay thủ phạm của xã hội?", ["Chỉ là nạn nhân vô tội", "Vừa là sản phẩm vừa góp phần phơi bày sự suy đồi", "Là anh hùng đạo đức", "Không liên quan xã hội"], 1, "Xuân cơ hội, nhưng chính môi trường thượng lưu giả trá đã nâng đỡ và hợp thức hóa hắn."),
      q("Vì sao tác giả để Xuân thắng liên tục?", ["Để ca ngợi Xuân", "Để mỉa mai xã hội đảo lộn giá trị", "Để kết thúc cổ tích", "Để tránh xung đột"], 1, "Càng thắng, Xuân càng làm lộ sự phi lý của xã hội đang tôn thờ vỏ bọc văn minh."),
      q("Danh xưng đốc tờ Xuân, vĩ nhân Xuân mỉa mai điều gì?", ["Nền học thuật nghiêm túc", "Phong trào Âu hóa hình thức và danh hão", "Tình yêu quê hương", "Đạo hiếu truyền thống"], 1, "Các danh xưng phóng đại nhắm vào sự kệch cỡm của xã hội sính Tây, sính danh.")
    ]
  },
  {
    id: "luc-van-tien",
    name: "Lục Vân Tiên",
    work: "Lục Vân Tiên",
    author: "Nguyễn Đình Chiểu",
    initial: "L",
    artA: "#183b32",
    artB: "#b78a3a",
    artTitle: "Chính khí Nam Bộ",
    imageBrief: "Nho sinh trẻ mặc áo dài, vung gậy đánh cướp Phong Lai, phía xa có kiệu Kiều Nguyệt Nga.",
    bio: "Nho sinh văn võ song toàn, trọng nghĩa khinh tài. Dù bị mù, bị phản bội, vẫn giữ vững khí tiết trung hiếu tiết nghĩa.",
    quote: "Nhớ câu kiến nghĩa bất vi / Làm người thế ấy cũng phi anh hùng.",
    personality: "Trượng nghĩa, dũng cảm, hiếu thảo, thủy chung, giữ lễ nghiêm cẩn và có phần dễ tin người.",
    conflict: "Giữa chữ hiếu và chí công danh, giữa lòng tin vào con người và những lần bị phản bội.",
    context: "Xã hội phong kiến Việt Nam thế kỷ 19, truyền thống nói thơ Nam Bộ và đạo lý trung-hiếu-tiết-nghĩa.",
    sources: [
      "Đánh cướp cứu Kiều Nguyệt Nga thể hiện quan niệm thấy việc nghĩa phải làm.",
      "Từ chối lạy tạ cho thấy lễ giáo và sự trong sạch trong ứng xử.",
      "Tác phẩm được truyền tụng rộng rãi qua nói thơ Vân Tiên ở Nam Bộ."
    ],
    voice: "chính trực, trang trọng, giàu đạo nghĩa và niềm tin vào điều thiện",
    challenge: [
      q("Đánh cướp cứu Kiều Nguyệt Nga thể hiện quan niệm gì?", ["Kiến nghĩa bất vi là phi anh hùng", "Danh lợi là trên hết", "Tránh mọi nguy hiểm", "Thù riêng cá nhân"], 0, "Hành động này kết tinh lý tưởng nghĩa hiệp của Nguyễn Đình Chiểu."),
      q("Vì sao Vân Tiên từ chối cho Nguyệt Nga lạy tạ?", ["Vì ghét nàng", "Vì giữ lễ giáo nam nữ và không cầu báo đáp", "Vì đang vội dự tiệc", "Vì muốn che giấu thân phận"], 1, "Chi tiết phản ánh lễ nghĩa và phẩm chất làm việc nghĩa không mong đền ơn."),
      q("Hình tượng Vân Tiên kết hợp những nguồn nào?", ["Lý tưởng nho gia và anh hùng dân gian Nam Bộ", "Lãng mạn phương Tây và khoa học viễn tưởng", "Trào phúng đô thị", "Chủ nghĩa hiện sinh"], 0, "Nhân vật vừa mang chuẩn mực Nho giáo vừa gần với mẫu anh hùng nghĩa hiệp trong tâm thức dân gian."),
      q("Bi kịch bị mù và phụ bạc có ý nghĩa gì?", ["Thử thách khí tiết của người quân tử", "Chấm dứt mọi giá trị của nhân vật", "Làm tác phẩm thành hài kịch", "Không có ý nghĩa"], 0, "Nghịch cảnh giúp làm nổi bật sự kiên định đạo lý của Vân Tiên."),
      q("Vì sao tác phẩm được người Nam Bộ yêu thích?", ["Vì ngôn ngữ gần truyền thống kể thơ và đề cao nghĩa khí", "Vì chỉ viết bằng chữ Pháp", "Vì toàn chuyện cung đình", "Vì phủ nhận đạo lý dân gian"], 0, "Tác phẩm phù hợp truyền thống nói thơ và khát vọng giữ đạo nghĩa trong thời loạn.")
    ]
  },
  {
    id: "thuy-kieu",
    name: "Thúy Kiều",
    work: "Truyện Kiều",
    author: "Nguyễn Du",
    initial: "K",
    artA: "#0d2b45",
    artB: "#6c2d35",
    artTitle: "Lầu Ngưng Bích",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIqfrmZRgVoag61VAEyP6Q-Mb-yG8Euwt6DfrmCT9itzl363JyePkjYmThUq25l7XM85yR9_bd_HDkPZmKJZEu7RiOwHKm-bpVpM8iEESgAWOzUlgmF7ma6p3H8vVg3IY8knRyKBrXxnHducwh7A6PgE2n05ZpO-Q3nWcmV5DVvHSrsvAOxhiS7TH0bZMEZlPxoDbo-2-As2mCIiS_Bkx1wK-ZmBIEUy7mFe9UZtKrFCCAzo6vh6pGNgV47VLhAt88OK1oS97RPrIQ",
    portrait: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPbJy1LhWB1iD9GidcpCRpCqCWW9uxSBQK45dxugW8r9heFyMyYGSnS5uFWc0AoNRnkkaTtNpLA6zzke4baa1Ye7IrH4h82HxvtlYa7T5gq082q8SM_NJYlici3sRbNNuiwCQkJlNJ_ymbGGVOmNSLAtW_xFoL_Hg9tVpwllf26eXTGpkuoyr3SaijAENF7_6nzPsP0ZczLaJCagw0-qDmrgkUgLvkMh7uEgkjlbbZIkt012Gu8wMiMNbSqIMytAfSzs4u2Uk38yU7",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4kct87omL-rYA-idsraW4imGjPB-D90yruxgX-caQX3Zo78y8taEWM_GWnBGxMnLcynvLtRM5YDBRc6Ey7F5UrWviyS1kuMwR1mOnLZjtMw5sf4RG5Dax2yfBW4HHoPTJDVVJrsaLa4eVyoKQQf8BTnsPvtPFlWYREMf_-q_PPqGLmwyf4_lHoVb-ZrZCFQmrasbNB39ZpBeikG2oQiAvO8kOtpK6c4HRMyFvAw33swjkVNY-cS312HuXcIjUNq6p__UxviQIZ9xW",
    imageBrief: "Thiếu nữ tài sắc gảy đàn nguyệt, ánh mắt u buồn, khung cảnh lầu Ngưng Bích và sông Tiền Đường.",
    bio: "Tiểu thư họ Vương tài sắc vẹn toàn, bán mình chuộc cha rồi lưu lạc mười lăm năm giữa chữ hiếu, chữ tình và số phận.",
    quote: "Trăm năm trong cõi người ta / Chữ tài chữ mệnh khéo là ghét nhau.",
    personality: "Tài sắc, đa cảm, hiếu thảo, thủy chung, sắc sảo, tự trọng và giàu lòng vị tha.",
    conflict: "Hiếu với cha mẹ đối lập tình yêu Kim Trọng; khát vọng tự do đối lập thân phận tài hoa bạc mệnh.",
    context: "Bối cảnh phong kiến Trung Hoa thời Minh nhưng phản chiếu xã hội Việt Nam cuối Lê đầu Nguyễn, nơi tiền và quyền chà đạp người phụ nữ.",
    sources: [
      "Trao duyên cho Thúy Vân là bi kịch tinh thần của người phải hy sinh tình yêu.",
      "Lầu Ngưng Bích dùng thiên nhiên để gửi nỗi cô đơn, nhớ nhà và dự cảm bất an.",
      "Tài mệnh tương đố đi cùng cảm hứng nhân đạo sâu sắc của Nguyễn Du."
    ],
    voice: "trầm, giàu tự ý thức, nhiều hình ảnh thơ và luôn phân biệt nỗi riêng với đạo lý",
    challenge: [
      q("Vì sao Kiều bán mình chuộc cha?", ["Vì hiếu đạo và muốn cứu gia đình khỏi tai biến", "Vì muốn rời Kim Trọng", "Vì thích cuộc sống lưu lạc", "Vì bị Thúy Vân ép"], 0, "Quyết định bán mình đặt chữ hiếu lên trên tình riêng, mở ra bi kịch lớn của Kiều."),
      q("Đoạn Trao duyên thể hiện điều gì?", ["Niềm vui trọn vẹn", "Bi kịch tinh thần khi phải nhờ em thay mình nối duyên", "Sự vô tâm của Kiều", "Một nghi lễ cưới"], 1, "Kiều còn yêu Kim Trọng nhưng buộc phải trao duyên, nên lời nói vừa lý trí vừa đau đớn."),
      q("Lầu Ngưng Bích nổi bật với bút pháp nào?", ["Tả cảnh ngụ tình", "Liệt kê hành chính", "Trào phúng giễu nhại", "Kịch nói hiện đại"], 0, "Cảnh thiên nhiên ở lầu Ngưng Bích phản chiếu cô đơn, nhớ thương và dự cảm sóng gió của Kiều."),
      q("Kiều khuyên Từ Hải hàng triều đình cho thấy gì?", ["Mong cầu yên ổn nhưng cũng dẫn đến dằn vặt bi kịch", "Kiều hoàn toàn vô cảm", "Kiều muốn hại Từ Hải từ đầu", "Kiều không hiểu gì về quyền lực"], 0, "Đây là nút tâm lý phức tạp: Kiều mong bình yên nhưng lựa chọn ấy góp phần gây bi kịch cho Từ Hải."),
      q("Ngoài tài mệnh tương đố, yếu tố nào chi phối số phận Kiều?", ["Xã hội phong kiến, đồng tiền, quyền lực và thân phận phụ nữ", "May mắn trong thể thao", "Công nghệ hiện đại", "Nghề buôn của Kim Trọng"], 0, "Nguyễn Du không chỉ nói định mệnh mà còn tố cáo những thế lực xã hội chà đạp con người.")
    ]
  }
];

const demoLeaders = [
  { name: "Minh Trần", points: 1450, unlocked: 5 },
  { name: "Lan Ngọc", points: 1280, unlocked: 5 },
  { name: "Anh Nguyễn", points: 1185, unlocked: 4 },
  { name: "Tú Uyên", points: 920, unlocked: 4 }
];

const defaultState = {
  profile: { username: "Bạn", grade: 10 },
  points: 0,
  streak: 1,
  currentIndex: 0,
  matches: [],
  skipped: [],
  completed: {},
  chats: {}
};

let state = loadState();

function q(text, options, answer, explanation) {
  return { text, options, answer, explanation };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("litmatch-state") || "{}");
    return { ...defaultState, ...saved, profile: saved.profile || defaultState.profile };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem("litmatch-state", JSON.stringify(state));
}

function route() {
  const hash = window.location.hash.replace("#", "") || "/discover";
  if (hash === "/onboarding") {
    navigate("/discover");
    return;
  }
  render(hash);
}

function navigate(path) {
  window.location.hash = path;
}

function render(path) {
  const app = document.querySelector("#app");
  app.innerHTML = shell(path, view(path));
  bind(path);
}

function shell(path, content) {
  const active = path.split("/")[1] || "discover";
  const profile = state.profile;
  return `
    <div class="app-shell">
      <aside class="side-nav">
        <div class="brand">
          <h1 class="brand-title">LitMatch</h1>
          <p class="brand-subtitle">Vietnamese Classics</p>
        </div>
        <nav class="nav-links">${navLinks(active)}</nav>
      </aside>
      <header class="topbar">
        <div>
          <strong style="color:var(--cinnabar);font-family:'Noto Serif',serif;font-size:24px">LitMatch</strong>
          ${profile ? `<span style="margin-left:10px;color:var(--muted);font-size:13px">Lớp ${profile.grade}</span>` : ""}
        </div>
        <div class="topbar-metrics">
          <span class="metric"><span class="material-symbols-outlined">local_fire_department</span>${active === "leaderboard" ? "Thành tích: " : ""}${state.streak} Ngày</span>
          <span class="metric"><span class="material-symbols-outlined">military_tech</span>${active === "leaderboard" ? "Điểm: " : ""}${state.points.toLocaleString("vi-VN")} Điểm</span>
        </div>
      </header>
      <main class="main">${content}</main>
      ${profile ? `<nav class="mobile-nav">${navLinks(active, true)}</nav>` : ""}
    </div>`;
}

function navLinks(active, mobile = false) {
  const items = [
    ["discover", "/discover", "Khám phá", "explore"],
    ["collection", "/collection", "Nhân vật đã chọn", "book_2"],
    ["leaderboard", "/leaderboard", "Bảng xếp hạng", "emoji_events"],
    ["profile", "/profile", "Hồ sơ", "account_circle"]
  ];
  return items.map(([key, href, label, icon]) => {
    if (mobile && key === "profile") return "";
    return `<a class="nav-link ${active === key ? "active" : ""}" href="#${href}"><span class="material-symbols-outlined">${icon}</span><span>${label}</span></a>`;
  }).join("");
}

function view(path) {
  if (path === "/collection") return collectionView();
  if (path === "/leaderboard") return leaderboardView();
  if (path === "/profile") return profileView();
  if (path.includes("/chat")) return chatView(path.split("/")[2]);
  if (path.includes("/challenge")) return challengeView(path.split("/")[2]);
  return discoverView();
}

function discoverView() {
  const available = characters.filter((character) => !state.matches.includes(character.id) && !state.skipped.includes(character.id));
  const character = available[0];
  if (!character) {
    return `
      <section class="page narrow">
        <div class="card empty-state">
          <p class="kicker">Hoàn tất bộ thẻ</p>
          <h1 class="headline-lg">Bạn đã xem hết đợt nội dung đầu tiên.</h1>
          <p class="lead">Mở bộ sưu tập để trò chuyện, làm thử thách và hoàn thành trạng thái mở khóa.</p>
          <div class="actions-row" style="justify-content:center">
            <a class="btn primary" href="#/collection">Xem nhân vật đã chọn</a>
            <button class="btn ghost" id="resetDeck">Mở lại thẻ đã bỏ qua</button>
          </div>
        </div>
      </section>`;
  }
  return `
    <section class="page deck-layout reference-discover">
      <div>
        ${characterCard(character)}
      </div>
      <aside class="deck-side">
        <div class="stat-grid">
          <div class="panel stat"><strong>${state.matches.length}</strong><span>Đã chọn</span></div>
          <div class="panel stat"><strong>${state.points}</strong><span>Điểm</span></div>
          <div class="panel stat"><strong>${Object.keys(state.completed).length}</strong><span>Hoàn thành</span></div>
        </div>
        <div class="panel source-panel">
          <p class="kicker">Gợi ý học tập</p>
          <h2 style="font-size:24px">Chọn để mở trò chuyện</h2>
          <p class="lead" style="font-size:15px">Mỗi nhân vật được chọn cộng 10 điểm và mở phòng trò chuyện. Làm thử thách đạt 4/5 để mở khóa hoàn toàn.</p>
        </div>
      </aside>
    </section>`;
}

function characterCard(character) {
  return `
    <article class="card deck-card" id="deckCard" data-swipe-card>
      <div class="swipe-stamp swipe-stamp-left">Bỏ qua</div>
      <div class="swipe-stamp swipe-stamp-right">Chọn</div>
      ${art(character)}
      <div class="deck-body">
        <div class="deck-title">
          <h1 class="headline-lg">${character.name}</h1>
          <p>${character.work} · ${character.author}</p>
        </div>
        <blockquote class="quote">"${character.quote}"</blockquote>
        <p class="deck-bio">${character.bio}</p>
        <div class="conflict-tile">
          <span>Xung đột</span>
          <strong><span class="material-symbols-outlined">balance</span>${character.conflict.split(";")[0]}</strong>
        </div>
        <div class="trait-row">
          ${character.personality.split(",").slice(0, 3).map((trait) => `<span>${trait.trim()}</span>`).join("")}
        </div>
      </div>
      <div class="swipe-actions">
        <button class="btn circle ghost" id="skipCharacter" aria-label="Bỏ qua"><span class="material-symbols-outlined">close</span></button>
        <button class="btn circle primary" id="matchCharacter" aria-label="Chọn nhân vật"><span class="material-symbols-outlined">favorite</span></button>
      </div>
    </article>`;
}

function art(character) {
  if (character.image) {
    return `
      <div class="art image-art">
        <img src="${character.image}" alt="${character.name}" />
        <span class="tag">Kinh điển</span>
      </div>`;
  }
  return `
    <div class="art" data-initial="${character.initial}" style="--art-a:${character.artA};--art-b:${character.artB}">
      <span class="tag">Kinh điển</span>
      <div class="art-scene">
        <strong>${character.artTitle}</strong>
        <span>${character.imageBrief}</span>
      </div>
    </div>`;
}

function collectionView() {
  const matched = characters.filter((character) => state.matches.includes(character.id));
  return `
    <section class="page reference-collection">
      <div class="collection-head">
        <div>
          <h1 class="headline-lg">Vòng tròn văn chương</h1>
          <p class="lead">Những nhân vật bạn đã khám phá trong hành trình học tập.</p>
        </div>
        <div class="sort-control"><span>Sắp xếp:</span><button class="btn ghost">Mới thêm gần đây <span class="material-symbols-outlined">keyboard_arrow_down</span></button></div>
      </div>
      ${matched.length ? `<div class="grid collection-grid">${matched.map(collectionCard).join("")}</div>` : `
        <div class="card empty-state">
          <h2>Chưa có nhân vật nào</h2>
          <p class="lead">Hãy vào Khám phá và chọn một nhân vật để mở trò chuyện.</p>
          <a class="btn primary" href="#/discover">Đi khám phá</a>
        </div>`}
    </section>`;
}

function collectionCard(character) {
  const result = state.completed[character.id];
  const status = result?.passed ? "Đã mở khóa hoàn toàn" : "Chưa hoàn thành thử thách";
  const progress = result?.passed ? 100 : result ? Math.round((result.score / 5) * 100) : 33;
  const image = character.portrait || character.image;
  return `
    <article class="card collection-card">
      <div class="collection-image">
        ${image ? `<img src="${image}" alt="${character.name}" />` : art(character)}
        <span class="collection-status"><span class="material-symbols-outlined">${result?.passed ? "verified" : "lock_open"}</span>${result?.passed ? "Đã mở khóa" : "Chờ thử thách"}</span>
      </div>
      <div class="collection-body">
        <h2>${character.name}</h2>
        <p>${character.work}</p>
        <div class="collection-progress"><span style="width:${progress}%"></span></div>
        <small>${progress}% khám phá</small>
        <span class="badge ${result?.passed ? "done" : "pending"}">${status}</span>
        <div class="actions-row">
          <a class="btn secondary" href="#/characters/${character.id}/chat">Trò chuyện</a>
          <a class="btn ghost" href="#/characters/${character.id}/challenge">Làm thử thách</a>
        </div>
      </div>
    </article>`;
}

function chatView(id) {
  const character = characters.find((item) => item.id === id);
  if (!character || !state.matches.includes(id)) return lockedView();
  const messages = state.chats[id] || [
    { from: "bot", text: `Chào bạn. Tôi là ${character.name}. Bạn có thể hỏi về động cơ, mâu thuẫn, bối cảnh xã hội hoặc một chi tiết trong tác phẩm.` }
  ];
  return `
    <section class="page chat-layout reference-chat">
      <div class="chat-card">
        <header class="chat-header">
          <div style="display:flex;align-items:center;gap:12px">
            ${character.avatar ? `<img class="avatar image-avatar" src="${character.avatar}" alt="${character.name}" />` : `<div class="avatar" style="--art-a:${character.artA};--art-b:${character.artB}">${character.initial}</div>`}
            <div>
              <h1 style="font-size:28px">${character.name}</h1>
              <p style="margin:4px 0 0;color:var(--muted)"><span class="online-dot"></span>Đang trò chuyện</p>
            </div>
          </div>
          <span class="work-pill"><span class="material-symbols-outlined">local_library</span>${character.work}</span>
        </header>
        <div class="chat-thread" id="chatThread">
          <div class="chapter-pill">Chapter I: The Encounter</div>
          ${messages.map((message) => messageView(message, character)).join("")}
          <div class="typing-line"><span class="material-symbols-outlined">edit</span>${character.name} đang suy ngẫm...</div>
        </div>
        <form class="chat-form" id="chatForm">
          <div class="quick-row">${["Hỏi về Thơ ca", "Hỏi về Gia đình"].map((prompt) => `<button class="chip quickPrompt" type="button">${prompt}</button>`).join("")}</div>
          <input id="chatInput" autocomplete="off" placeholder="Hỏi về động cơ, biểu tượng, bối cảnh..." />
          <a class="btn secondary" href="#/characters/${id}/challenge"><span class="material-symbols-outlined">swords</span>Thử thách tôi</a>
          <button class="btn primary" type="submit">Gửi</button>
        </form>
      </div>
      <aside class="panel source-panel">
        <h2 style="font-size:24px">Nội dung trọng tâm</h2>
        <p class="lead" style="font-size:15px;margin-top:6px">${character.conflict.split(";")[0]}</p>
        <div class="understanding"><span>Mức độ thấu hiểu</span><strong>Level 2</strong><i style="width:35%"></i></div>
        <p class="kicker">Bối cảnh văn học</p>
        <div class="source-book"><span class="material-symbols-outlined">menu_book</span><div><strong>${character.work}</strong><small>${character.author}</small></div></div>
        <p class="kicker">Ghi chú đã duyệt</p>
        <div class="source-list">${character.sources.map((source) => `<div class="source-item">${source}</div>`).join("")}</div>
      </aside>
    </section>`;
}

function messageView(message, character) {
  const avatar = character?.avatar ? `<img class="message-avatar" src="${character.avatar}" alt="${character.name}" />` : `<span class="message-avatar fallback">${character?.initial || "L"}</span>`;
  if (message.from === "user") {
    return `<div class="message-row user"><div class="message user">${message.text}</div><small>Read</small></div>`;
  }
  return `<div class="message-row bot">${avatar}<div class="message bot">${message.text}</div></div>`;
}

function lockedView() {
  return `
    <section class="page narrow">
      <div class="card empty-state">
        <h1 class="headline-lg">Chưa mở khóa trò chuyện</h1>
        <p class="lead">Bạn cần chọn nhân vật trong màn Khám phá trước khi vào trò chuyện hoặc thử thách.</p>
        <a class="btn primary" href="#/discover">Quay lại Khám phá</a>
      </div>
    </section>`;
}

let activeQuestion = 0;
let selectedAnswers = [];
let activeChallengeId = null;

function challengeView(id) {
  const character = characters.find((item) => item.id === id);
  if (!character || !state.matches.includes(id)) return lockedView();
  if (activeChallengeId !== id) {
    activeChallengeId = id;
    activeQuestion = 0;
    selectedAnswers = [];
  }
  const complete = state.completed[id];
  if (complete) return resultView(character, complete);
  const question = character.challenge[activeQuestion] || character.challenge[0];
  return `
    <section class="page narrow reference-challenge">
      <div class="challenge-progress-top"><span style="width:${((activeQuestion + 1) / 5) * 100}%"></span></div>
      <p class="kicker">Câu hỏi ${activeQuestion + 1} / 5</p>
      <h1 class="headline-lg">Thử thách nhân vật: ${character.name}</h1>
      <div class="challenge-card card">
        <p class="question">${question.text}</p>
        <div class="info-stack" id="options">
          ${question.options.map((option, index) => `<button class="option ${selectedAnswers[activeQuestion] === index ? "active" : ""}" data-answer="${index}"><strong>${String.fromCharCode(65 + index)}</strong><span>${option}</span>${selectedAnswers[activeQuestion] === index ? `<span class="material-symbols-outlined">check_circle</span>` : ""}</button>`).join("")}
        </div>
      </div>
      <div class="challenge-actions">
        <button class="btn ghost" id="prevQuestion" ${activeQuestion === 0 ? "disabled" : ""}><span class="material-symbols-outlined">menu_book</span>Cần gợi ý? Xem lại văn bản</button>
        <button class="btn primary" id="nextQuestion" ${selectedAnswers[activeQuestion] === undefined ? "disabled" : ""}>${activeQuestion === 4 ? "Nộp bài" : "Câu tiếp theo"}</button>
      </div>
    </section>`;
}

function resultView(character, result) {
  return `
    <section class="page narrow">
      <div class="challenge-card card">
        <p class="kicker">Kết quả thử thách</p>
        <h1 class="headline-lg">${character.name}: ${result.score}/5 câu đúng</h1>
        <p class="lead">${result.passed ? "Đã mở khóa hoàn toàn. Bạn hiểu được các lớp động cơ và bối cảnh chính của nhân vật." : "Chưa đạt mốc 4/5. Hãy đọc giải thích rồi làm lại để củng cố kiến thức."}</p>
        <div class="stat-grid" style="margin-top:18px">
          <div class="panel stat"><strong>+${result.awarded}</strong><span>Điểm nhận được</span></div>
          <div class="panel stat"><strong>${result.passed ? "Đạt" : "Chưa đạt"}</strong><span>Trạng thái</span></div>
          <div class="panel stat"><strong>${result.perfect ? "5/5" : "4/5"}</strong><span>Mốc mở khóa</span></div>
        </div>
        <div class="result-list">
          ${character.challenge.map((question, index) => {
            const picked = result.answers[index];
            const isCorrect = picked === question.answer;
            return `<div class="info-block">
              <h3>${isCorrect ? "Đúng" : "Cần xem lại"} - Câu ${index + 1}</h3>
              <p><strong>${question.text}</strong></p>
              <p>Đáp án đúng: ${question.options[question.answer]}</p>
              <p>${question.explanation}</p>
            </div>`;
          }).join("")}
        </div>
        <div class="actions-row">
          <a class="btn primary" href="#/leaderboard">Xem bảng xếp hạng</a>
          <a class="btn secondary" href="#/characters/${character.id}/chat">Quay lại trò chuyện</a>
          <button class="btn ghost" id="retryChallenge">Làm lại</button>
        </div>
      </div>
    </section>`;
}

function leaderboardView() {
  const current = {
    name: state.profile?.username || "Bạn",
    points: state.points,
    unlocked: Object.values(state.completed).filter((result) => result.passed).length
  };
  const rows = [...demoLeaders, current].sort((a, b) => b.points - a.points);
  return `
    <section class="page reference-leaderboard">
      <h1 class="headline-lg">Hào kiệt văn chương</h1>
      <p class="lead">Nơi vinh danh những học giả uyên bác trên hành trình khám phá văn học Việt Nam.</p>
      <div class="leader-tabs"><button class="active">Toàn cầu</button><button>Lớp học</button><button>Hằng tuần</button></div>
      <div class="card leaderboard">
        <div class="leader-row header"><span>Hạng</span><span>Tên học giả</span><span>Nhân vật đã mở khóa</span><span>Tổng điểm</span></div>
        ${rows.map((row, index) => `
          <div class="leader-row ${row.name === current.name ? "current" : ""}">
            <span class="rank">${index + 1}</span>
            <span class="leader-name"><span class="leader-avatar">${row.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><strong>${row.name === current.name ? "Bạn" : row.name}</strong></span>
            <span>${row.unlocked}</span>
            <strong>${row.points.toLocaleString("vi-VN")}</strong>
          </div>`).join("")}
      </div>
    </section>`;
}

function profileView() {
  return `
    <section class="page narrow">
      <div class="profile-card card">
        <p class="kicker">Hồ sơ</p>
        <h1 class="headline-lg">${state.profile?.username}</h1>
        <p class="lead">Lớp ${state.profile?.grade}. Dữ liệu thử nghiệm đang được lưu cục bộ trong trình duyệt.</p>
        <div class="profile-meta">
          <div class="panel stat"><strong>${state.points}</strong><span>Điểm</span></div>
          <div class="panel stat"><strong>${state.matches.length}</strong><span>Nhân vật đã chọn</span></div>
          <div class="panel stat"><strong>${Object.keys(state.completed).length}</strong><span>Thử thách đã làm</span></div>
        </div>
        <div class="actions-row">
          <button class="btn ghost" id="resetAll">Đặt lại dữ liệu thử nghiệm</button>
        </div>
      </div>
    </section>`;
}

function bind(path) {
  bindSwipeCard();
  document.querySelector("#skipCharacter")?.addEventListener("click", skipCharacter);
  document.querySelector("#matchCharacter")?.addEventListener("click", matchCharacter);
  document.querySelector("#resetDeck")?.addEventListener("click", () => {
    state.skipped = [];
    state.currentIndex = 0;
    saveState();
    route();
  });
  document.querySelector("#resetAll")?.addEventListener("click", () => {
    state = { ...defaultState };
    activeChallengeId = null;
    activeQuestion = 0;
    selectedAnswers = [];
    saveState();
    navigate("/discover");
  });

  const chatForm = document.querySelector("#chatForm");
  if (chatForm) bindChat(chatForm, path.split("/")[2]);

  document.querySelectorAll(".quickPrompt").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.querySelector("#chatInput");
      input.value = button.textContent;
      input.focus();
    });
  });

  document.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", () => {
      selectedAnswers[activeQuestion] = Number(button.dataset.answer);
      route();
    });
  });
  document.querySelector("#prevQuestion")?.addEventListener("click", () => {
    activeQuestion = Math.max(0, activeQuestion - 1);
    route();
  });
  document.querySelector("#nextQuestion")?.addEventListener("click", () => nextQuestion(path.split("/")[2]));
  document.querySelector("#retryChallenge")?.addEventListener("click", () => {
    const id = path.split("/")[2];
    if (state.completed[id]?.awarded) {
      state.points = Math.max(0, state.points - state.completed[id].awarded);
    }
    delete state.completed[id];
    activeChallengeId = id;
    activeQuestion = 0;
    selectedAnswers = [];
    saveState();
    route();
  });
}

function currentDeckCharacter() {
  return characters.filter((character) => !state.matches.includes(character.id) && !state.skipped.includes(character.id))[0];
}

function skipCharacter() {
  const character = currentDeckCharacter();
  if (!character) return;
  state.skipped = Array.from(new Set([...(state.skipped || []), character.id]));
  saveState();
  route();
}

function bindSwipeCard() {
  const card = document.querySelector("[data-swipe-card]");
  if (!card) return;

  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let isDragging = false;

  const resetCard = () => {
    card.classList.remove("is-dragging", "swipe-left", "swipe-right");
    card.style.transform = "";
  };

  card.addEventListener("pointerdown", (event) => {
    if (event.target.closest("a, button, input, textarea")) return;
    startX = event.clientX;
    startY = event.clientY;
    currentX = 0;
    isDragging = true;
    card.classList.add("is-dragging");
    card.setPointerCapture(event.pointerId);
  });

  card.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    if (Math.abs(deltaY) > Math.abs(deltaX) * 1.4) return;
    event.preventDefault();
    currentX = deltaX;
    const rotation = Math.max(-10, Math.min(10, deltaX / 18));
    card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
    card.classList.toggle("swipe-right", deltaX > 42);
    card.classList.toggle("swipe-left", deltaX < -42);
  });

  const finish = () => {
    if (!isDragging) return;
    isDragging = false;
    if (currentX > 110) {
      card.classList.add("throw-right");
      window.setTimeout(matchCharacter, 140);
      return;
    }
    if (currentX < -110) {
      card.classList.add("throw-left");
      window.setTimeout(skipCharacter, 140);
      return;
    }
    resetCard();
  };

  card.addEventListener("pointerup", finish);
  card.addEventListener("pointercancel", finish);
  card.addEventListener("lostpointercapture", finish);
}

function matchCharacter() {
  const character = currentDeckCharacter();
  if (!character) return;
  state.matches = Array.from(new Set([...state.matches, character.id]));
  state.points += 10;
  saveState();
  route();
}

function bindChat(form, id) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#chatInput");
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    const character = characters.find((item) => item.id === id);
    state.chats[id] = state.chats[id] || [];
    state.chats[id].push({ from: "user", text });
    state.chats[id].push({ from: "bot", text: mockReply(character, text) });
    saveState();
    route();
    const thread = document.querySelector("#chatThread");
    thread?.scrollTo({ top: thread.scrollHeight, behavior: "smooth" });
  });
}

function mockReply(character, text) {
  const lower = text.toLowerCase();
  const source = character.sources.find((item) => lower.split(/\s+/).some((word) => word.length > 3 && item.toLowerCase().includes(word))) || character.sources[0];
  if (lower.includes("essay") || lower.includes("bài văn mẫu") || lower.includes("viết bài")) {
    return "Mình không tạo bài văn mẫu hoàn chỉnh. Mình có thể giúp bạn lập dàn ý, tìm luận điểm và dẫn chứng để bạn tự viết bằng giọng của mình.";
  }
  if (lower.includes("không rõ") || lower.includes("ngoài tác phẩm")) {
    return "Phần này chưa có đủ nguồn trong bộ ghi chú hiện có, nên mình không khẳng định như sự thật văn bản. Ta có thể quay lại các chi tiết đã duyệt trước.";
  }
  return `Theo giọng của ${character.name}, câu trả lời nên xuất phát từ mâu thuẫn cốt lõi: ${character.conflict} Ghi chú nguồn liên quan: ${source} Đây là diễn giải học tập, không phải trích dẫn nguyên văn toàn bộ tác phẩm.`;
}

function nextQuestion(id) {
  if (activeQuestion < 4) {
    activeQuestion += 1;
    route();
    return;
  }
  const character = characters.find((item) => item.id === id);
  const score = character.challenge.reduce((total, question, index) => total + (selectedAnswers[index] === question.answer ? 1 : 0), 0);
  const passed = score >= 4;
  const perfect = score === 5;
  let awarded = 50 + (passed ? 40 : 0) + (perfect ? 25 : 0);
  state.points += awarded;
  state.completed[id] = { score, passed, perfect, awarded, answers: [...selectedAnswers] };
  activeQuestion = 0;
  selectedAnswers = [];
  saveState();
  route();
}

window.addEventListener("hashchange", route);
route();
