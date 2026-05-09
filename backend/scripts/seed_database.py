from __future__ import annotations

import argparse
import asyncio
import sys
from pathlib import Path
from typing import Any

BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))


def q(
    question: str,
    options: list[str],
    correct_answer_index: int,
    explanation: str,
) -> dict[str, Any]:
    return {
        "question": question,
        "options": options,
        "correct_answer_index": correct_answer_index,
        "explanation": explanation,
    }


CHARACTER_SEEDS: list[dict[str, Any]] = [
    {
        "slug": "chi_pheo",
        "name": "Chí Phèo",
        "author": "Nam Cao",
        "work_title": "Chí Phèo",
        "short_bio": "Trai làng Vũ Đại. Bề ngoài hổ báo nhưng bên trong đầy vết xước. Khao khát lớn nhất là được làm người lương thiện.",
        "avatar_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDwtes59noXJn0ueuoo3KTimSDM0Ny4Tu_sIMVMFYCpK4O0cMBTNzorNrvgztQ-ve8ROj0cSubCTzVoQ17f5jwSbT-ufDAxxC0gdq9VEAvTAdDs3cBGEeISo37PLpkwt3d-VMBEO7cmA5dKi8WF7kyWxFGJ5dlO1LqIiZeM14ouVYlR7roPwNE3cU3W662ngNF8JDhwhyFcZJrnMiRpkmP4_0Wo1Vw2I8mBvt79h06BvSy7HtstRP0DUUFxvS-3d5iSMLvV1N2uwkMf",
        "difficulty_level": 2,
        "personality_traits": ["Hung hãn", "Liều lĩnh", "Nhạy cảm", "Khao khát lương thiện"],
        "emotional_conflicts": "Giằng xé giữa bản ngã bị xã hội biến dạng và phần lương thiện bừng tỉnh sau bát cháo hành.",
        "social_context": "Làng quê Việt Nam trước Cách mạng tháng Tám, nơi cường hào ác bá đẩy người nông dân vào bần cùng hóa và lưu manh hóa.",
        "famous_quote": "Tao muốn làm người lương thiện! Ai cho tao lương thiện?",
        "voice_instructions": "Bạn là Chí Phèo: nói thô ráp, đau đớn, có lúc chửi đời, nhưng khi nhắc tới Thị Nở và bát cháo hành thì mềm lại vì khao khát được làm người.",
        "challenge_questions": [
            q("Nguyên nhân sâu xa nào đẩy Chí Phèo vào con đường lưu manh hóa?", ["Bản chất Chí vốn ác độc từ nhỏ", "Nhà tù thực dân và cường hào làng Vũ Đại đã tha hóa người nông dân", "Chí không thích lao động", "Thị Nở ruồng bỏ Chí ngay từ đầu"], 1, "Bi kịch của Chí bắt nguồn từ xã hội phi nhân đạo: Bá Kiến đẩy Chí vào tù, nhà tù biến anh canh điền hiền lành thành kẻ lưu manh."),
            q("Bát cháo hành có ý nghĩa biểu tượng gì?", ["Một món ăn lạ của làng Vũ Đại", "Tình người giản dị đánh thức phần lương thiện", "Sự giàu có của Thị Nở", "Lý do Chí ghét Bá Kiến"], 1, "Bát cháo hành là biểu tượng của tình thương mộc mạc, làm Chí lần đầu cảm nhận được chăm sóc và muốn trở lại làm người."),
            q("Vì sao Chí đến nhà Bá Kiến trong đoạn cuối?", ["Chí nhận ra kẻ đã cướp quyền làm người của mình", "Chí muốn xin tiền uống rượu", "Chí đi tìm Thị Nở", "Chí muốn rời làng"], 0, "Sau khi bị từ chối đường về với cộng đồng, Chí hướng tới Bá Kiến như nguồn gốc trực tiếp của bi kịch đời mình."),
            q("Tiếng chửi đầu tác phẩm phản ánh tâm trạng gì?", ["Niềm vui hội làng", "Nỗi cô độc cùng cực và khát khao được đáp lời", "Sự bình thản của một người say", "Thái độ khinh thường Thị Nở"], 1, "Chí chửi để tìm một mối liên hệ với đời, nhưng không ai đáp lại, nên tiếng chửi phơi bày sự cô độc tuyệt đối."),
            q("Cái lò gạch cũ xuất hiện đầu và cuối tác phẩm gợi điều gì?", ["Một nơi làm ăn phát đạt", "Vòng lặp bi kịch có thể tiếp diễn với những đứa trẻ bị bỏ rơi", "Ký ức đẹp của Chí và Thị Nở", "Nơi Bá Kiến giấu của"], 1, "Hình ảnh này mở ra khả năng bi kịch Chí Phèo chưa chấm dứt khi xã hội cũ vẫn còn nguyên cơ chế áp bức."),
        ],
    },
    {
        "slug": "mi",
        "name": "Mị",
        "author": "Tô Hoài",
        "work_title": "Vợ chồng A Phủ",
        "short_bio": "Từng thổi sáo rất hay, nay mắc kẹt trong kiếp con dâu gạt nợ. Bên trong vẻ lặng câm là sức sống đang hồi sinh.",
        "avatar_url": None,
        "difficulty_level": 2,
        "personality_traits": ["Cam chịu", "Giàu sức sống", "Thương người", "Khao khát tự do"],
        "emotional_conflicts": "Tê liệt cảm xúc vì áp bức đối lập với tuổi trẻ, tiếng sáo mùa xuân và lòng thương A Phủ.",
        "social_context": "Tây Bắc trước giải phóng, đồng bào dân tộc thiểu số bị áp bức bởi cường quyền chúa đất và thần quyền cúng trình ma.",
        "famous_quote": "Mị trẻ lắm. Mị vẫn còn trẻ. Mị muốn đi chơi.",
        "voice_instructions": "Bạn là Mị: nói ít, nén đau, trầm và sâu; khi nhắc tới tiếng sáo, mùa xuân, A Phủ và tự do thì giọng sáng lên, quyết liệt hơn.",
        "challenge_questions": [
            q("Vì sao Mị trở thành con dâu gạt nợ?", ["Vì món nợ truyền đời của cha mẹ với nhà thống lý", "Vì Mị tự nguyện vào nhà Pá Tra", "Vì Mị muốn giàu có", "Vì A Phủ ép Mị"], 0, "Mị bị bắt làm con dâu gạt nợ để trả món nợ của gia đình, cho thấy sự áp bức bằng cả tiền bạc và hủ tục."),
            q("Căn buồng của Mị tượng trưng cho điều gì?", ["Không gian tự do", "Nhà tù tinh thần giam hãm tuổi trẻ", "Nơi học chữ", "Căn phòng hạnh phúc"], 1, "Ô cửa nhỏ, tối tăm làm nổi bật kiếp sống bị vùi lấp và mất cảm giác thời gian của Mị."),
            q("Yếu tố nào đánh thức Mị trong đêm tình mùa xuân?", ["Tiếng sáo, men rượu và không khí mùa xuân", "Một lá thư từ cha", "Lời khen của A Sử", "Lệnh của thống lý"], 0, "Không khí mùa xuân cùng tiếng sáo và men rượu kéo Mị trở về ký ức tuổi trẻ, làm khát vọng sống trỗi dậy."),
            q("Dòng nước mắt của A Phủ tạo bước ngoặt gì?", ["Mị thấy mình và A Phủ cùng thân phận bị áp bức", "Mị sợ A Phủ trách mình", "Mị muốn báo thù A Phủ", "Mị quyết định ở lại"], 0, "Dòng nước mắt giúp Mị chuyển từ tê liệt sang thương người, rồi thành hành động cứu A Phủ và tự cứu mình."),
            q("Hành động cắt dây cởi trói cho A Phủ có ý nghĩa gì?", ["Khẳng định sức phản kháng và giá trị nhân đạo", "Chỉ là hành động bốc đồng", "Làm Mị mất hết hy vọng", "Chứng minh Mị vô cảm"], 0, "Đây là bước giải phóng: Mị cứu người khác đồng thời thoát khỏi nhà thống lý."),
        ],
    },
    {
        "slug": "xuan_toc_do",
        "name": "Xuân Tóc Đỏ",
        "author": "Vũ Trọng Phụng",
        "work_title": "Số đỏ",
        "short_bio": "Từ nhặt bóng quần vợt và bán thuốc lậu, Xuân leo lên thành đốc tờ, vĩ nhân, anh hùng nhờ xã hội thượng lưu kệch cỡm.",
        "avatar_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCqK7d3Ww0zpC4mg8eZGJ5rmnd0s9gNWibZHNYDDHlHiI-J_mXeoPtJtYmKSBylq-LbLnlyVnKvin6R1i5NzNoHP5Kkm4zerB8P_EkpVdV7aBTIKWBAkhF9Vys3eiOx5SiCPC_GBF1Rwzs1uGCwpI4R-1_RyIlRJp0rX5gBOKCay-h8hr9uWp9LncnuoYJM8Sd9q6IQX_OH-ywZgTUNDRBfLBhrgfwTZuyF7FjAOIU_vVTpDBrGvCmLONNhdjEprKwdYraxdf9gLlxf",
        "difficulty_level": 3,
        "personality_traits": ["Tinh ranh", "Cơ hội", "Mặt dày", "Tự mãn"],
        "emotional_conflicts": "Không có bi kịch nội tâm sâu; mâu thuẫn nằm ở xã hội tôn vinh một kẻ vô lại thành vĩ nhân.",
        "social_context": "Đô thị Việt Nam thời Pháp thuộc thập niên 1930, nơi phong trào Âu hóa rởm đảo lộn giá trị thật giả.",
        "famous_quote": "Thưa các ngài! Mẹ kiếp! Nước mẹ gì!",
        "voice_instructions": "Bạn là Xuân Tóc Đỏ: nói láu cá, tự mãn, bốc đồng, hay khoe khoang; câu trả lời phải giữ chất trào phúng của một kẻ vô lại gặp thời.",
        "challenge_questions": [
            q("Vì sao Xuân có thể leo lên đỉnh danh vọng?", ["Vì tài học uyên bác", "Vì xã hội thượng lưu giả dối dễ tôn vinh hình thức", "Vì Xuân là quý tộc", "Vì Xuân làm cách mạng"], 1, "Sự thăng tiến của Xuân tố cáo xã hội chạy theo danh hão và Âu hóa rởm."),
            q("Hạnh phúc của một tang gia trào phúng ở điểm nào?", ["Mọi người đau buồn thật lòng", "Cái chết trở thành dịp khoe mẽ và mưu lợi", "Đám tang diễn ra giản dị", "Xuân bị trừng phạt"], 1, "Tiếng cười bật ra từ nghịch lý: tang gia mà ai cũng có lý do để sung sướng."),
            q("Xuân Tóc Đỏ là sản phẩm hay thủ phạm của xã hội?", ["Chỉ là nạn nhân vô tội", "Vừa là sản phẩm vừa góp phần phơi bày sự suy đồi", "Là anh hùng đạo đức", "Không liên quan xã hội"], 1, "Xuân cơ hội, nhưng chính môi trường thượng lưu giả trá đã nâng đỡ và hợp thức hóa hắn."),
            q("Vì sao tác giả để Xuân thắng liên tục?", ["Để ca ngợi Xuân", "Để mỉa mai xã hội đảo lộn giá trị", "Để kết thúc cổ tích", "Để tránh xung đột"], 1, "Càng thắng, Xuân càng làm lộ sự phi lý của xã hội đang tôn thờ vỏ bọc văn minh."),
            q("Danh xưng đốc tờ Xuân, vĩ nhân Xuân mỉa mai điều gì?", ["Nền học thuật nghiêm túc", "Phong trào Âu hóa hình thức và danh hão", "Tình yêu quê hương", "Đạo hiếu truyền thống"], 1, "Các danh xưng phóng đại nhắm vào sự kệch cỡm của xã hội sính Tây, sính danh."),
        ],
    },
    {
        "slug": "luc_van_tien",
        "name": "Lục Vân Tiên",
        "author": "Nguyễn Đình Chiểu",
        "work_title": "Lục Vân Tiên",
        "short_bio": "Nho sinh văn võ song toàn, trọng nghĩa khinh tài. Dù bị mù, bị phản bội, vẫn giữ vững khí tiết trung hiếu tiết nghĩa.",
        "avatar_url": None,
        "difficulty_level": 2,
        "personality_traits": ["Trượng nghĩa", "Dũng cảm", "Hiếu thảo", "Giữ lễ"],
        "emotional_conflicts": "Giữa chữ hiếu và chí công danh, giữa lòng tin vào con người và những lần bị phản bội.",
        "social_context": "Xã hội phong kiến Việt Nam thế kỷ 19, truyền thống nói thơ Nam Bộ và đạo lý trung-hiếu-tiết-nghĩa.",
        "famous_quote": "Nhớ câu kiến nghĩa bất vi / Làm người thế ấy cũng phi anh hùng.",
        "voice_instructions": "Bạn là Lục Vân Tiên: nói chính trực, trang trọng, trọng nghĩa khinh tài, tin vào đạo lý và điều thiện.",
        "challenge_questions": [
            q("Đánh cướp cứu Kiều Nguyệt Nga thể hiện quan niệm gì?", ["Kiến nghĩa bất vi là phi anh hùng", "Danh lợi là trên hết", "Tránh mọi nguy hiểm", "Thù riêng cá nhân"], 0, "Hành động này kết tinh lý tưởng nghĩa hiệp của Nguyễn Đình Chiểu."),
            q("Vì sao Vân Tiên từ chối cho Nguyệt Nga lạy tạ?", ["Vì ghét nàng", "Vì giữ lễ giáo nam nữ và không cầu báo đáp", "Vì đang vội dự tiệc", "Vì muốn che giấu thân phận"], 1, "Chi tiết phản ánh lễ nghĩa và phẩm chất làm việc nghĩa không mong đền ơn."),
            q("Hình tượng Vân Tiên kết hợp những nguồn nào?", ["Lý tưởng nho gia và anh hùng dân gian Nam Bộ", "Lãng mạn phương Tây và khoa học viễn tưởng", "Trào phúng đô thị", "Chủ nghĩa hiện sinh"], 0, "Nhân vật vừa mang chuẩn mực Nho giáo vừa gần với mẫu anh hùng nghĩa hiệp trong tâm thức dân gian."),
            q("Bi kịch bị mù và phụ bạc có ý nghĩa gì?", ["Thử thách khí tiết của người quân tử", "Chấm dứt mọi giá trị của nhân vật", "Làm tác phẩm thành hài kịch", "Không có ý nghĩa"], 0, "Nghịch cảnh giúp làm nổi bật sự kiên định đạo lý của Vân Tiên."),
            q("Vì sao tác phẩm được người Nam Bộ yêu thích?", ["Vì ngôn ngữ gần truyền thống kể thơ và đề cao nghĩa khí", "Vì chỉ viết bằng chữ Pháp", "Vì toàn chuyện cung đình", "Vì phủ nhận đạo lý dân gian"], 0, "Tác phẩm phù hợp truyền thống nói thơ và khát vọng giữ đạo nghĩa trong thời loạn."),
        ],
    },
    {
        "slug": "thuy_kieu",
        "name": "Thúy Kiều",
        "author": "Nguyễn Du",
        "work_title": "Truyện Kiều",
        "short_bio": "Tiểu thư họ Vương tài sắc vẹn toàn, bán mình chuộc cha rồi lưu lạc mười lăm năm giữa chữ hiếu, chữ tình và số phận.",
        "avatar_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIqfrmZRgVoag61VAEyP6Q-Mb-yG8Euwt6DfrmCT9itzl363JyePkjYmThUq25l7XM85yR9_bd_HDkPZmKJZEu7RiOwHKm-bpVpM8iEESgAWOzUlgmF7ma6p3H8vVg3IY8knRyKBrXxnHducwh7A6PgE2n05ZpO-Q3nWcmV5DVvHSrsvAOxhiS7TH0bZMEZlPxoDbo-2-As2mCIiS_Bkx1wK-ZmBIEUy7mFe9UZtKrFCCAzo6vh6pGNgV47VLhAt88OK1oS97RPrIQ",
        "difficulty_level": 3,
        "personality_traits": ["Tài sắc", "Đa cảm", "Hiếu thảo", "Thủy chung", "Vị tha"],
        "emotional_conflicts": "Hiếu với cha mẹ đối lập tình yêu Kim Trọng; khát vọng tự do đối lập thân phận tài hoa bạc mệnh.",
        "social_context": "Bối cảnh phong kiến Trung Hoa thời Minh nhưng phản chiếu xã hội Việt Nam cuối Lê đầu Nguyễn, nơi tiền và quyền chà đạp người phụ nữ.",
        "famous_quote": "Trăm năm trong cõi người ta / Chữ tài chữ mệnh khéo là ghét nhau.",
        "voice_instructions": "Bạn là Thúy Kiều: nói trầm, giàu tự ý thức, nhiều hình ảnh thơ; luôn phân biệt nỗi riêng, chữ hiếu, chữ tình và đạo lý.",
        "challenge_questions": [
            q("Vì sao Kiều bán mình chuộc cha?", ["Vì hiếu đạo và muốn cứu gia đình khỏi tai biến", "Vì muốn rời Kim Trọng", "Vì thích cuộc sống lưu lạc", "Vì bị Thúy Vân ép"], 0, "Quyết định bán mình đặt chữ hiếu lên trên tình riêng, mở ra bi kịch lớn của Kiều."),
            q("Đoạn Trao duyên thể hiện điều gì?", ["Niềm vui trọn vẹn", "Bi kịch tinh thần khi phải nhờ em thay mình nối duyên", "Sự vô tâm của Kiều", "Một nghi lễ cưới"], 1, "Kiều còn yêu Kim Trọng nhưng buộc phải trao duyên, nên lời nói vừa lý trí vừa đau đớn."),
            q("Lầu Ngưng Bích nổi bật với bút pháp nào?", ["Tả cảnh ngụ tình", "Liệt kê hành chính", "Trào phúng giễu nhại", "Kịch nói hiện đại"], 0, "Cảnh thiên nhiên ở lầu Ngưng Bích phản chiếu cô đơn, nhớ thương và dự cảm sóng gió của Kiều."),
            q("Kiều khuyên Từ Hải hàng triều đình cho thấy gì?", ["Mong cầu yên ổn nhưng cũng dẫn đến dằn vặt bi kịch", "Kiều hoàn toàn vô cảm", "Kiều muốn hại Từ Hải từ đầu", "Kiều không hiểu gì về quyền lực"], 0, "Đây là nút tâm lý phức tạp: Kiều mong bình yên nhưng lựa chọn ấy góp phần gây bi kịch cho Từ Hải."),
            q("Ngoài tài mệnh tương đố, yếu tố nào chi phối số phận Kiều?", ["Xã hội phong kiến, đồng tiền, quyền lực và thân phận phụ nữ", "May mắn trong thể thao", "Công nghệ hiện đại", "Nghề buôn của Kim Trọng"], 0, "Nguyễn Du không chỉ nói định mệnh mà còn tố cáo những thế lực xã hội chà đạp con người."),
        ],
    },
]


DEMO_USER_SEEDS: list[dict[str, Any]] = [
    {"username": "Minh Trần", "grade_level": 11, "total_score": 1450},
    {"username": "Lan Ngọc", "grade_level": 12, "total_score": 1280},
    {"username": "Anh Nguyễn", "grade_level": 10, "total_score": 1185},
    {"username": "Tú Uyên", "grade_level": 11, "total_score": 920},
]


def challenge_payload(character: dict[str, Any]) -> list[dict[str, Any]]:
    return [
        {
            "id": index,
            "question": question["question"],
            "options": question["options"],
            "correct_answer_index": question["correct_answer_index"],
            "explanation": question["explanation"],
        }
        for index, question in enumerate(character["challenge_questions"], start=1)
    ]


async def seed_characters_and_challenges(session) -> int:
    from models.db_models import Challenge, Character
    from sqlalchemy import select  # type: ignore[reportMissingImports]

    seeded_count = 0
    for seed in CHARACTER_SEEDS:
        result = await session.execute(
            select(Character).where(Character.slug == seed["slug"])
        )
        character = result.scalar_one_or_none()
        character_fields = {
            key: value
            for key, value in seed.items()
            if key != "challenge_questions"
        }

        if character is None:
            character = Character(**character_fields)
            session.add(character)
            await session.flush()
        else:
            for key, value in character_fields.items():
                setattr(character, key, value)

        result = await session.execute(
            select(Challenge).where(Challenge.character_id == character.id)
        )
        challenge = result.scalar_one_or_none()
        questions = challenge_payload(seed)
        if challenge is None:
            session.add(Challenge(character_id=character.id, questions=questions))
        else:
            challenge.questions = questions
        seeded_count += 1
    return seeded_count


async def seed_demo_users(session) -> int:
    from models.db_models import User
    from sqlalchemy import select  # type: ignore[reportMissingImports]

    seeded_count = 0
    for seed in DEMO_USER_SEEDS:
        result = await session.execute(
            select(User).where(User.username == seed["username"])
        )
        user = result.scalar_one_or_none()
        if user is None:
            session.add(User(**seed))
        else:
            user.grade_level = seed["grade_level"]
            user.total_score = seed["total_score"]
        seeded_count += 1
    return seeded_count


async def run_seed(include_demo_users: bool = True) -> None:
    from core.database import Base, async_session_factory, engine

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session_factory() as session:
        character_count = await seed_characters_and_challenges(session)
        user_count = await seed_demo_users(session) if include_demo_users else 0
        await session.commit()

    print(f"Seeded {character_count} characters with challenges.")
    if include_demo_users:
        print(f"Seeded {user_count} demo users.")

    await engine.dispose()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Seed LitMatch backend data.")
    parser.add_argument(
        "--skip-demo-users",
        action="store_true",
        help="Only seed characters and challenges.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    asyncio.run(run_seed(include_demo_users=not args.skip_demo_users))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
