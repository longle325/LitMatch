import type { Character, ChallengeQuestion } from "@/types";

// Question id is auto-generated below, so the seed data only supplies
// the substantive fields. This mirrors the wire shape from
// docs/API.md §5.2 once the backend ships.
type SeedChallengeQuestion = Omit<ChallengeQuestion, "id">;
type SeedCharacter = Omit<Character, "challenge"> & {
  challenge: SeedChallengeQuestion[];
};

const q = (
  text: string,
  options: string[],
  answer: number,
  explanation: string,
): SeedChallengeQuestion => ({ text, options, answer, explanation });

const rawCharacters: SeedCharacter[] = [
  {
    id: "chi-pheo",
    name: "Chí Phèo",
    work: "Chí Phèo",
    author: "Nam Cao",
    initial: "C",
    artA: "#2c1f1b",
    artB: "#8a3d22",
    artTitle: "Làng Vũ Đại",
    image: "/characters/chi-pheo.png",
    images: [
      "/characters/chi-pheo.png",
      "/characters/chi-pheo-2.png",
      "/characters/chi-pheo-3.png",
    ],
    genre: "truyện ngắn",
    imageBrief:
      "Người đàn ông gầy gò, mặt đầy sẹo, áo nâu sờn rách, tay cầm chai rượu, lảo đảo giữa làng quê.",
    bio: "Trai làng Vũ Đại. Bề ngoài hổ báo nhưng bên trong đầy vết xước. Khao khát lớn nhất là được làm người lương thiện.",
    quote: "Tao muốn làm người lương thiện! Ai cho tao lương thiện?",
    personality:
      "Hung hãn, liều lĩnh sau khi bị tha hóa; nhưng khi được yêu thương thì nhạy cảm, yếu đuối và khao khát bình yên.",
    conflict:
      "Giằng xé giữa bản ngã bị xã hội biến dạng và phần lương thiện bừng tỉnh sau bát cháo hành.",
    context:
      "Làng quê Việt Nam trước Cách mạng tháng Tám, nơi cường hào ác bá đẩy người nông dân vào bần cùng hóa và lưu manh hóa.",
    sources: [
      "Tiếng chửi mở đầu cho thấy Chí Phèo bị cả làng Vũ Đại gạt khỏi cộng đồng người.",
      "Bát cháo hành của Thị Nở đánh thức khát vọng sống lương thiện và được yêu thương.",
      "Cái lò gạch cũ gợi vòng luẩn quẩn của những kiếp người bị xã hội bỏ rơi.",
    ],
    voice:
      "thô ráp, đau đớn, có lúc bừng lên mong muốn được công nhận là con người",
    challenge: [
      q(
        "Nguyên nhân sâu xa nào đẩy Chí Phèo vào con đường lưu manh hóa?",
        [
          "Bản chất Chí vốn ác độc từ nhỏ",
          "Nhà tù thực dân và cường hào làng Vũ Đại đã tha hóa người nông dân",
          "Chí không thích lao động",
          "Thị Nở ruồng bỏ Chí ngay từ đầu",
        ],
        1,
        "Bi kịch của Chí bắt nguồn từ xã hội phi nhân đạo: Bá Kiến đẩy Chí vào tù, nhà tù biến anh canh điền hiền lành thành kẻ lưu manh.",
      ),
      q(
        "Bát cháo hành có ý nghĩa biểu tượng gì?",
        [
          "Một món ăn lạ của làng Vũ Đại",
          "Tình người giản dị đánh thức phần lương thiện",
          "Sự giàu có của Thị Nở",
          "Lý do Chí ghét Bá Kiến",
        ],
        1,
        "Bát cháo hành là biểu tượng của tình thương mộc mạc, làm Chí lần đầu cảm nhận được chăm sóc và muốn trở lại làm người.",
      ),
      q(
        "Vì sao Chí đến nhà Bá Kiến trong đoạn cuối?",
        [
          "Chí nhận ra kẻ đã cướp quyền làm người của mình",
          "Chí muốn xin tiền uống rượu",
          "Chí đi tìm Thị Nở",
          "Chí muốn rời làng",
        ],
        0,
        "Sau khi bị từ chối đường về với cộng đồng, Chí hướng tới Bá Kiến như nguồn gốc trực tiếp của bi kịch đời mình.",
      ),
      q(
        "Tiếng chửi đầu tác phẩm phản ánh tâm trạng gì?",
        [
          "Niềm vui hội làng",
          "Nỗi cô độc cùng cực và khát khao được đáp lời",
          "Sự bình thản của một người say",
          "Thái độ khinh thường Thị Nở",
        ],
        1,
        "Chí chửi để tìm một mối liên hệ với đời, nhưng không ai đáp lại, nên tiếng chửi phơi bày sự cô độc tuyệt đối.",
      ),
      q(
        "Cái lò gạch cũ xuất hiện đầu và cuối tác phẩm gợi điều gì?",
        [
          "Một nơi làm ăn phát đạt",
          "Vòng lặp bi kịch có thể tiếp diễn với những đứa trẻ bị bỏ rơi",
          "Ký ức đẹp của Chí và Thị Nở",
          "Nơi Bá Kiến giấu của",
        ],
        1,
        "Hình ảnh này mở ra khả năng bi kịch Chí Phèo chưa chấm dứt khi xã hội cũ vẫn còn nguyên cơ chế áp bức.",
      ),
    ],
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
    image: "/characters/mi-1.png",
    images: [
      "/characters/mi-1.png",
      "/characters/mi-2.png",
      "/characters/mi-3.png",
    ],
    genre: "Văn học hiện thực",
    imageBrief:
      "Thiếu nữ người Mông ngồi quay sợi bên cửa sổ nhỏ, ánh mắt hướng ra núi rừng Tây Bắc.",
    bio: "Từng thổi sáo rất hay, nay mắc kẹt trong kiếp con dâu gạt nợ. Bên trong vẻ lặng câm là sức sống đang hồi sinh.",
    quote: "Mị trẻ lắm. Mị vẫn còn trẻ. Mị muốn đi chơi.",
    personality:
      "Bề ngoài cam chịu, nhẫn nhục; bên trong có sức sống tiềm tàng, lòng thương người và khát vọng tự do.",
    conflict:
      "Tê liệt cảm xúc vì áp bức đối lập với tuổi trẻ, tiếng sáo mùa xuân và lòng thương A Phủ.",
    context:
      "Tây Bắc trước giải phóng, đồng bào dân tộc thiểu số bị áp bức bởi cường quyền chúa đất và thần quyền cúng trình ma.",
    sources: [
      "Căn buồng có ô cửa nhỏ như nhà tù tinh thần của Mị.",
      "Tiếng sáo đêm xuân khơi lại ký ức tuổi trẻ và khát vọng đi chơi.",
      "Dòng nước mắt của A Phủ khiến Mị nhận ra nỗi đau chung của người bị áp bức.",
    ],
    voice: "ít lời, nén đau, nhưng khi nói về tự do thì sáng và quyết liệt",
    challenge: [
      q(
        "Vì sao Mị trở thành con dâu gạt nợ?",
        [
          "Vì món nợ truyền đời của cha mẹ với nhà thống lý",
          "Vì Mị tự nguyện vào nhà Pá Tra",
          "Vì Mị muốn giàu có",
          "Vì A Phủ ép Mị",
        ],
        0,
        "Mị bị bắt làm con dâu gạt nợ để trả món nợ của gia đình, cho thấy sự áp bức bằng cả tiền bạc và hủ tục.",
      ),
      q(
        "Căn buồng của Mị tượng trưng cho điều gì?",
        [
          "Không gian tự do",
          "Nhà tù tinh thần giam hãm tuổi trẻ",
          "Nơi học chữ",
          "Căn phòng hạnh phúc",
        ],
        1,
        "Ô cửa nhỏ, tối tăm làm nổi bật kiếp sống bị vùi lấp và mất cảm giác thời gian của Mị.",
      ),
      q(
        "Yếu tố nào đánh thức Mị trong đêm tình mùa xuân?",
        [
          "Tiếng sáo, men rượu và không khí mùa xuân",
          "Một lá thư từ cha",
          "Lời khen của A Sử",
          "Lệnh của thống lý",
        ],
        0,
        "Không khí mùa xuân cùng tiếng sáo và men rượu kéo Mị trở về ký ức tuổi trẻ, làm khát vọng sống trỗi dậy.",
      ),
      q(
        "Dòng nước mắt của A Phủ tạo bước ngoặt gì?",
        [
          "Mị thấy mình và A Phủ cùng thân phận bị áp bức",
          "Mị sợ A Phủ trách mình",
          "Mị muốn báo thù A Phủ",
          "Mị quyết định ở lại",
        ],
        0,
        "Dòng nước mắt giúp Mị chuyển từ tê liệt sang thương người, rồi thành hành động cứu A Phủ và tự cứu mình.",
      ),
      q(
        "Hành động cắt dây cởi trói cho A Phủ có ý nghĩa gì?",
        [
          "Khẳng định sức phản kháng và giá trị nhân đạo",
          "Chỉ là hành động bốc đồng",
          "Làm Mị mất hết hy vọng",
          "Chứng minh Mị vô cảm",
        ],
        0,
        "Đây là bước giải phóng: Mị cứu người khác đồng thời thoát khỏi nhà thống lý.",
      ),
    ],
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
    image: "/characters/xuan-toc-do-1.png",
    images: [
      "/characters/xuan-toc-do-1.png",
      "/characters/xuan-toc-do-2.png",
      "/characters/xuan-toc-do-3.png",
    ],
    genre: "Tiểu thuyết trào phúng",
    imageBrief:
      "Thanh niên tóc đỏ, vest tây lố lăng, cầm vợt tennis trước phố Hà Nội thời Pháp thuộc.",
    bio: "Từ nhặt bóng quần vợt và bán thuốc lậu, Xuân leo lên thành đốc tờ, vĩ nhân, anh hùng nhờ xã hội thượng lưu kệch cỡm.",
    quote: "Thưa các ngài! Mẹ kiếp! Nước mẹ gì!",
    personality:
      "Tinh ranh, cơ hội, mặt dày, giỏi học mót và đọc vị sự đạo đức giả của giới thượng lưu.",
    conflict:
      "Không có bi kịch nội tâm sâu; mâu thuẫn nằm ở xã hội tôn vinh một kẻ vô lại thành vĩ nhân.",
    context:
      "Đô thị Việt Nam thời Pháp thuộc thập niên 1930, nơi phong trào Âu hóa rởm đảo lộn giá trị thật giả.",
    sources: [
      "Xuân thành công vì xã hội thượng lưu cần những nhãn hiệu văn minh giả.",
      "Hạnh phúc của một tang gia phơi bày niềm vui lố bịch trước cái chết.",
      "Tiếng cười trào phúng nhắm vào cả Xuân lẫn môi trường đã tạo ra Xuân.",
    ],
    voice: "láu cá, tự mãn, nói năng bốc đồng nhưng lộ bản chất châm biếm",
    challenge: [
      q(
        "Vì sao Xuân có thể leo lên đỉnh danh vọng?",
        [
          "Vì tài học uyên bác",
          "Vì xã hội thượng lưu giả dối dễ tôn vinh hình thức",
          "Vì Xuân là quý tộc",
          "Vì Xuân làm cách mạng",
        ],
        1,
        "Sự thăng tiến của Xuân tố cáo xã hội chạy theo danh hão và Âu hóa rởm.",
      ),
      q(
        "Hạnh phúc của một tang gia trào phúng ở điểm nào?",
        [
          "Mọi người đau buồn thật lòng",
          "Cái chết trở thành dịp khoe mẽ và mưu lợi",
          "Đám tang diễn ra giản dị",
          "Xuân bị trừng phạt",
        ],
        1,
        "Tiếng cười bật ra từ nghịch lý: tang gia mà ai cũng có lý do để sung sướng.",
      ),
      q(
        "Xuân Tóc Đỏ là sản phẩm hay thủ phạm của xã hội?",
        [
          "Chỉ là nạn nhân vô tội",
          "Vừa là sản phẩm vừa góp phần phơi bày sự suy đồi",
          "Là anh hùng đạo đức",
          "Không liên quan xã hội",
        ],
        1,
        "Xuân cơ hội, nhưng chính môi trường thượng lưu giả trá đã nâng đỡ và hợp thức hóa hắn.",
      ),
      q(
        "Vì sao tác giả để Xuân thắng liên tục?",
        [
          "Để ca ngợi Xuân",
          "Để mỉa mai xã hội đảo lộn giá trị",
          "Để kết thúc cổ tích",
          "Để tránh xung đột",
        ],
        1,
        "Càng thắng, Xuân càng làm lộ sự phi lý của xã hội đang tôn thờ vỏ bọc văn minh.",
      ),
      q(
        "Danh xưng đốc tờ Xuân, vĩ nhân Xuân mỉa mai điều gì?",
        [
          "Nền học thuật nghiêm túc",
          "Phong trào Âu hóa hình thức và danh hão",
          "Tình yêu quê hương",
          "Đạo hiếu truyền thống",
        ],
        1,
        "Các danh xưng phóng đại nhắm vào sự kệch cỡm của xã hội sính Tây, sính danh.",
      ),
    ],
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
    image: "/characters/luc-van-tien.png",
    images: [
      "/characters/luc-van-tien.png",
      "/characters/luc-van-tien-2.png",
      "/characters/luc-van-tien-3.png",
    ],
    genre: "Truyện Thơ Nôm",
    imageBrief:
      "Nho sinh trẻ mặc áo dài, vung gậy đánh cướp Phong Lai, phía xa có kiệu Kiều Nguyệt Nga.",
    bio: "Nho sinh văn võ song toàn, trọng nghĩa khinh tài. Dù bị mù, bị phản bội, vẫn giữ vững khí tiết trung hiếu tiết nghĩa.",
    quote: "Nhớ câu kiến nghĩa bất vi / Làm người thế ấy cũng phi anh hùng.",
    personality:
      "Trượng nghĩa, dũng cảm, hiếu thảo, thủy chung, giữ lễ nghiêm cẩn và có phần dễ tin người.",
    conflict:
      "Giữa chữ hiếu và chí công danh, giữa lòng tin vào con người và những lần bị phản bội.",
    context:
      "Xã hội phong kiến Việt Nam thế kỷ 19, truyền thống nói thơ Nam Bộ và đạo lý trung-hiếu-tiết-nghĩa.",
    sources: [
      "Đánh cướp cứu Kiều Nguyệt Nga thể hiện quan niệm thấy việc nghĩa phải làm.",
      "Từ chối lạy tạ cho thấy lễ giáo và sự trong sạch trong ứng xử.",
      "Tác phẩm được truyền tụng rộng rãi qua nói thơ Vân Tiên ở Nam Bộ.",
    ],
    voice: "chính trực, trang trọng, giàu đạo nghĩa và niềm tin vào điều thiện",
    challenge: [
      q(
        "Đánh cướp cứu Kiều Nguyệt Nga thể hiện quan niệm gì?",
        [
          "Kiến nghĩa bất vi là phi anh hùng",
          "Danh lợi là trên hết",
          "Tránh mọi nguy hiểm",
          "Thù riêng cá nhân",
        ],
        0,
        "Hành động này kết tinh lý tưởng nghĩa hiệp của Nguyễn Đình Chiểu.",
      ),
      q(
        "Vì sao Vân Tiên từ chối cho Nguyệt Nga lạy tạ?",
        [
          "Vì ghét nàng",
          "Vì giữ lễ giáo nam nữ và không cầu báo đáp",
          "Vì đang vội dự tiệc",
          "Vì muốn che giấu thân phận",
        ],
        1,
        "Chi tiết phản ánh lễ nghĩa và phẩm chất làm việc nghĩa không mong đền ơn.",
      ),
      q(
        "Hình tượng Vân Tiên kết hợp những nguồn nào?",
        [
          "Lý tưởng nho gia và anh hùng dân gian Nam Bộ",
          "Lãng mạn phương Tây và khoa học viễn tưởng",
          "Trào phúng đô thị",
          "Chủ nghĩa hiện sinh",
        ],
        0,
        "Nhân vật vừa mang chuẩn mực Nho giáo vừa gần với mẫu anh hùng nghĩa hiệp trong tâm thức dân gian.",
      ),
      q(
        "Bi kịch bị mù và phụ bạc có ý nghĩa gì?",
        [
          "Thử thách khí tiết của người quân tử",
          "Chấm dứt mọi giá trị của nhân vật",
          "Làm tác phẩm thành hài kịch",
          "Không có ý nghĩa",
        ],
        0,
        "Nghịch cảnh giúp làm nổi bật sự kiên định đạo lý của Vân Tiên.",
      ),
      q(
        "Vì sao tác phẩm được người Nam Bộ yêu thích?",
        [
          "Vì ngôn ngữ gần truyền thống kể thơ và đề cao nghĩa khí",
          "Vì chỉ viết bằng chữ Pháp",
          "Vì toàn chuyện cung đình",
          "Vì phủ nhận đạo lý dân gian",
        ],
        0,
        "Tác phẩm phù hợp truyền thống nói thơ và khát vọng giữ đạo nghĩa trong thời loạn.",
      ),
    ],
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
    image: "/characters/thuy-kieu-1.png",
    images: [
      "/characters/thuy-kieu-1.png",
      "/characters/thuy-kieu-2.png",
      "/characters/thuy-kieu-3.png",
    ],
    genre: "Truyện Thơ Nôm",
    imageBrief:
      "Thiếu nữ tài sắc gảy đàn nguyệt, ánh mắt u buồn, khung cảnh lầu Ngưng Bích và sông Tiền Đường.",
    bio: "Tiểu thư họ Vương tài sắc vẹn toàn, bán mình chuộc cha rồi lưu lạc mười lăm năm giữa chữ hiếu, chữ tình và số phận.",
    quote: "Trăm năm trong cõi người ta / Chữ tài chữ mệnh khéo là ghét nhau.",
    personality:
      "Tài sắc, đa cảm, hiếu thảo, thủy chung, sắc sảo, tự trọng và giàu lòng vị tha.",
    conflict:
      "Hiếu với cha mẹ đối lập tình yêu Kim Trọng; khát vọng tự do đối lập thân phận tài hoa bạc mệnh.",
    context:
      "Bối cảnh phong kiến Trung Hoa thời Minh nhưng phản chiếu xã hội Việt Nam cuối Lê đầu Nguyễn, nơi tiền và quyền chà đạp người phụ nữ.",
    sources: [
      "Trao duyên cho Thúy Vân là bi kịch tinh thần của người phải hy sinh tình yêu.",
      "Lầu Ngưng Bích dùng thiên nhiên để gửi nỗi cô đơn, nhớ nhà và dự cảm bất an.",
      "Tài mệnh tương đố đi cùng cảm hứng nhân đạo sâu sắc của Nguyễn Du.",
    ],
    voice:
      "trầm, giàu tự ý thức, nhiều hình ảnh thơ và luôn phân biệt nỗi riêng với đạo lý",
    challenge: [
      q(
        "Vì sao Kiều bán mình chuộc cha?",
        [
          "Vì hiếu đạo và muốn cứu gia đình khỏi tai biến",
          "Vì muốn rời Kim Trọng",
          "Vì thích cuộc sống lưu lạc",
          "Vì bị Thúy Vân ép",
        ],
        0,
        "Quyết định bán mình đặt chữ hiếu lên trên tình riêng, mở ra bi kịch lớn của Kiều.",
      ),
      q(
        "Đoạn Trao duyên thể hiện điều gì?",
        [
          "Niềm vui trọn vẹn",
          "Bi kịch tinh thần khi phải nhờ em thay mình nối duyên",
          "Sự vô tâm của Kiều",
          "Một nghi lễ cưới",
        ],
        1,
        "Kiều còn yêu Kim Trọng nhưng buộc phải trao duyên, nên lời nói vừa lý trí vừa đau đớn.",
      ),
      q(
        "Lầu Ngưng Bích nổi bật với bút pháp nào?",
        [
          "Tả cảnh ngụ tình",
          "Liệt kê hành chính",
          "Trào phúng giễu nhại",
          "Kịch nói hiện đại",
        ],
        0,
        "Cảnh thiên nhiên ở lầu Ngưng Bích phản chiếu cô đơn, nhớ thương và dự cảm sóng gió của Kiều.",
      ),
      q(
        "Kiều khuyên Từ Hải hàng triều đình cho thấy gì?",
        [
          "Mong cầu yên ổn nhưng cũng dẫn đến dằn vặt bi kịch",
          "Kiều hoàn toàn vô cảm",
          "Kiều muốn hại Từ Hải từ đầu",
          "Kiều không hiểu gì về quyền lực",
        ],
        0,
        "Đây là nút tâm lý phức tạp: Kiều mong bình yên nhưng lựa chọn ấy góp phần gây bi kịch cho Từ Hải.",
      ),
      q(
        "Ngoài tài mệnh tương đố, yếu tố nào chi phối số phận Kiều?",
        [
          "Xã hội phong kiến, đồng tiền, quyền lực và thân phận phụ nữ",
          "May mắn trong thể thao",
          "Công nghệ hiện đại",
          "Nghề buôn của Kim Trọng",
        ],
        0,
        "Nguyễn Du không chỉ nói định mệnh mà còn tố cáo những thế lực xã hội chà đạp con người.",
      ),
    ],
  },
];

// Inject question ids of the form `${characterId}-q${1-based index}`.
// Keeps seed data terse and guarantees stable, predictable ids without
// any handwritten boilerplate.
export const characters: Character[] = rawCharacters.map((character) => ({
  ...character,
  challenge: character.challenge.map((question, index) => ({
    ...question,
    id: `${character.id}-q${index + 1}`,
  })),
}));

export const getCharacter = (id: string): Character | undefined =>
  characters.find((character) => character.id === id);
