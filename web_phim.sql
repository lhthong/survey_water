-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2024 at 12:15 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web_phim`
--

-- --------------------------------------------------------

--
-- Table structure for table `duocyeuthich`
--

CREATE TABLE `duocyeuthich` (
  `idphim_yeuthich` int(11) NOT NULL,
  `idphim` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `duocyeuthich`
--

INSERT INTO `duocyeuthich` (`idphim_yeuthich`, `idphim`) VALUES
(16, 62),
(15, 79),
(14, 80),
(13, 82),
(12, 83),
(11, 84),
(10, 85),
(9, 86);

-- --------------------------------------------------------

--
-- Table structure for table `nguoidung`
--

CREATE TABLE `nguoidung` (
  `idnguoidung` int(11) NOT NULL,
  `tennguoidung` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `mk` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `phim`
--

CREATE TABLE `phim` (
  `idphim` int(11) NOT NULL,
  `tenphim` varchar(500) NOT NULL,
  `idtheloai` int(11) NOT NULL,
  `sotap` double NOT NULL,
  `tinhtrang` varchar(100) NOT NULL,
  `anh` varchar(500) NOT NULL,
  `noidung` varchar(500) NOT NULL,
  `idquocgia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `phim`
--

INSERT INTO `phim` (`idphim`, `tenphim`, `idtheloai`, `sotap`, `tinhtrang`, `anh`, `noidung`, `idquocgia`) VALUES
(62, 'RẤT NHỚ, RẤT NHỚ ANH', 5, 33, 'hoàn thành', 'rat-nho-rat-nho-anh.jpg', 'Rất Nhớ, Rất Nhớ Anh kể về hành trình kiên trì theo đuổi ước mơ của cô sinh viên năm tư đam mê âm nhạc, Cố Thanh. Cô âm thầm che giấu thân phận \"Thanh Thanh Mạn\", ca sĩ vô danh trong làng nhạc cổ phong của mình, đồng thời khao khát được hợp tác một lần với cao thủ \"Thương Thanh Từ\" trong giới lồng tiếng mà cô luôn thầm thương trộm nhớ.', 2),
(65, 'THẬP PHƯƠNG VÕ THÁNH', 6, 50, 'Phim đang chiếu', 'thap-phuong-vo-thanh.jpg', 'Thập Phương Võ Thánh kể lại câ chuyện về Mạt thế hoang thổ, năm Thế Tông thứ ba, thiên hạ đại loạn, dân chúng lầm than. Ma môn yêu đảng ẩn mình trong bóng tối làm loạn, bang phái chinh phạt lẫn nhau, hỗn loạn không chịu nổi. Giữa đại loạn, các môn phái thi nhau xuất thế, tranh đoạt tài nguyên và địa bàn, thành lập ách thống trị của mình. Có người dã tâm muốn cuốn sạch thiên hạ, thành lập vương triều, cũng có người vì đại nghĩa, làm mọi cách để cứu chúng sinh.', 2),
(66, 'NGẠO THẾ CỬU TRỌNG THIÊN', 6, 12, 'Hoàn thành', 'ngao-the-cuu-trong-thien.jpg', 'Ngạo Thế Cửu Trọng Thiên kể về câu chuyện chỉ vì nắm giữ thần vật Cửu Kiếp kiếm của đại lục Cửu Trọng Thiên trong tay mà Sở Dương gặp họa sát thân, bị mọi người treo cổ ép chết, một nhát kiếm xuyên tim lại vô tình khiến Cửu Kiếp kiếm thức tỉnh, trùng sinh về thời niên thiếu, trải nghiệm cuộc đời thêm một lần nữa. Kiếp này, hắn đi lên con đường khác với kiếp trước, bảo vệ người mình yêu và huynh đệ, tìm kiếm Cửu Kiếp kiếm.', 2),
(67, 'TU LA VÕ THẦN', 6, 16, 'Hoàn thành', 'tu-la-vo-than.jpg', 'Tu La Võ Thần là một bộ phim chuyển thể từ tiểu thuyết cùng tên, đem lại cho khán giả một câu chuyện đầy kỳ vị về hành trình trở thành một thần võ tối cao. Ở một thế giới nơi luận ngộ tính và tư chất tưởng chừng như quá kém cỏi, mọi người coi thường, nhưng điều đặc biệt ở đây là công pháp và bí kíp võ học có thể tự học và hiểu bằng sự kiên nhẫn và nỗ lực.', 2),
(68, 'CHIẾN TRANH GORYEO-KHITAN', 1, 34, 'Hoàn thành', 'chien-tranh-goryeo-khitan.jpg', 'Chiến Tranh Goryeo-Khitan là một bộ phim cổ Trang Hàn Quốc với sự tham gia chính của các diễn viên Choi Soo Jong, Kim Dong Jun và Ji Seung Hyun. Bộ phim xoay quanh cuộc chiến của Goryeo và Khitan khi 2 thế lực này nảy ra nhiều tranh chấp và bất đồng.', 3),
(69, 'THANH GƯƠM CỦA ARAMUN', 1, 12, 'Hoàn thành', 'arthdal-nien-su-ky.jpg', 'Arthdal Niên Sử Ký: Thanh Gươm Của Aramun kể về bối cảnh diễn ra mười năm sau những biến động tại vùng Arthdal. Sau hơn tám năm, Arthdal đã đàn áp cuộc nổi dậy của các bộ tộc bị thảm sát bởi Ta Gon trong Mùa 1, và Agos cuối cùng đã thống nhất 30 bộ tộc sau 200 năm dưới sự lãnh đạo của Eun Seom. ', 3),
(70, 'THẾ GIỚI HOÀN MỸ', 6, 142, 'Đang cập nhật', 'the-gioi-hoan-my.jpg', 'Thế Giới Hoàn Mỹ kể về quá trình trưởng thành của một đứa trẻ trời sinh Chí Tôn cốt (đứa bé này tương lai có thể sánh vai cùng hung Thái cổ được trời ưu ái, có thể chinh chiến với Chân Hống, Kim Sí Đại Bàng có huyết mạnh tinh thuần đến hoàn mỹ, Nguyên thủy bảo thuật của nó sẽ danh chấn thiên hạ, được ghi khắc vào lịch sử của Nhân tộc).', 2),
(71, 'DR. STONE: NEW WORLD', 6, 21, 'Đang cập nhật', 'anh12.jpg', 'Tiến Sĩ Đá (Phần 3) Chuyển thể từ manga cùng tên của tác giả Riichiro Inagaki. Lấy bối cảnh tương lai, ngày định mệnh của nhân loại đã đến, một tia sáng kì dị xuất hiện trên địa cầu khiến toàn bộ loài người hóa thành đá. Mấy ngàn năm trôi qua, ngày nọ cậu thiếu niên Senkuu bỗng nhiên phá đá thức tỉnh, trước mắt cậu là những pho tượng hóa đá của nhân loại.', 8),
(72, 'PHÁP SƯ TIỄN TÁNG', 6, 28, 'Phim đang chiếu', 'phap-su-tien-tang.jpg', 'Pháp Sư Tiễn Táng kể về tổ đội anh hùng đã đánh bại được quỷ vương và kết thúc cuộc hành trình của họ. Nhưng thế chưa phải là hết, cuộc đời của cô nàng pháp sư Elf này sẽ còn rất dài, hơn cả những người đồng đội cũ của cô, một cuộc phiêu lưu mới để cô trải qua nhiều cung bậc cảm xúc, cũng như là học hỏi thêm về con người.', 8),
(73, 'GIA ĐÌNH ĐIỆP VIÊN', 6, 25, 'Hoàn thành ', 'gia-dinh-diep-vien.jpg', 'Gia Đình Điệp Viên kể về vì những lý do riêng, một điệp viên, một sát thủ và một nhà ngoại cảm bắt tay đóng giả làm một gia đình trong khi che giấu danh tính thật của họ với nhau.', 8),
(74, 'THẾ GIỚI PHÉP THUẬT', 6, 170, 'Hoàn thành', 'the-gioi-phep-thuat.jpg', 'Black Clover kể về Asta và Yuno đã bị bỏ rơi cùng nhau tại cùng một nhà thờ và đã không thể tách rời kể từ đó. Khi còn trẻ, họ hứa sẽ cạnh tranh với nhau để xem ai sẽ trở thành Hoàng đế Magus tiếp theo. Tuy nhiên, khi chúng lớn lên, một số khác biệt giữa chúng trở nên đơn giản. ', 8),
(75, '  ĐẤU LA ĐẠI LỤC', 6, 263, 'Hoàn thành ', 'dau-la-dai-luc.jpg', 'Phim Đấu La Đại Lục là một trong những tác phẩm đặc sắc của Đường Gia Tam Thiếu. Tác phẩm thuộc thể loại truyện Huyễn Hiệp, mang đến cho độc giả một cái nhìn, một cảm nhận mới về thế giới hiệp khách huyền ảo. ', 2),
(76, 'CÂU CHUYỆN LÚC NỬA ĐÊM', 1, 10, 'Hoàn thành', 'cau-chuyen-luc-nua-dem.jpg', 'Câu Chuyện Lúc Nửa Đêm kể về một nhóm năm học sinh trung học dấn thân vào một cuộc hành trình đen tối và phức tạp để điều tra về cái chết bi thảm ba thập kỷ trước của một thiếu niên tên Harold Biddle – đồng thời khám phá những bí mật đen tối từ quá khứ của cha mẹ họ.', 5),
(77, '  MẬT MÃ ĐEN TRẮNG', 1, 24, 'Hoàn thành', 'mat-ma-den-trang.jpg', 'Mật Mã Đen Trắng kể về nhóm tội phạm \"Sói Tây Bắc\" đã bị cảnh sát tiêu diệt năm năm trước, nhưng tên thủ lĩnh Cổ Mộc Lam, cốt cán Lão Sang và cảnh sát chìm được phái đi Lâm Kha cùng những người khác đều bị mất tích, không rõ sống chết. Năm năm sau, nhóm \"Sói Tây Bắc\" xuất hiện trở lại, để tìm được mẹ Lâm Kha, cảnh sát Sở Nhất Hàn đã chủ động xin làm cảnh sát chìm và thâm nhập vào tổ chức tội phạm một lần nữa dưới sự hỗ trợ của Trình Phàn, cựu phó đội trưởng đội điều tra tội phạm, đồng thời là ng', 2),
(78, 'TÌNH YÊU VÀ THAM VỌNG', 5, 56, 'Phim đang chiếu', 'tinh-yeu-va-tham-vong.jpg', 'Tình Yêu Tham Vọng là một trong những dự án trọng điểm của VFC trong năm 2020, Tình yêu và tham vọng quy tụ dàn diễn viên trẻ nhiều sức hút, có sự đầu tư về bối cảnh trong và ngoài nước cùng một kịch bản hấp dẫn, nhiều kịch tính.', 1),
(79, '  TRÒ CHƠI TỬ THẦN', 5, 8, 'Phim đang chiếu', 'tro-choi-tu-than.jpg', 'Trò Chơi Tử Thần được chuyển thể từ tiếu thuyết cùng tên của tác giả Lee Wonsik và Ggulchan, kể về Choi Yi Jae, một chàng trai trẻ liên tục gặp những khó khăn trong cuộc sống. Sau khi liên tiếp rơi vào cảnh thất nghiệp, thất bại trong chuyện tình cảm và gặp nhiều nguy cơ tài chính, anh ta quyết định kết liễu sinh mệnh của mình nhưng anh ta không chết và trải qua cái chết nhiều lần trong 13 kiếp khác nhau.', 3),
(80, 'Trang Viên Mê Tình', 5, 24, 'Hoàn thành ', 'Trang-vien-me-tinh.jpg', 'Bộ phim Trang Viên Mê Tình thuộc thể loại phim Tình Cảm của Trung Quốc. Trang Viên Mê Tình (Miss Mystery 2023) là một bộ phim đầy kịch tính kể về cuộc hành trình của Tiết Đồng, một tiểu thư giàu có nhưng gia đình cô đã gặp biến cố đầy bí ẩn từ khi cô còn nhỏ. Sau 18 năm, Tiết Đồng quyết định trở về cố hương dưới bí danh \"Lâm Bảo Nhi\" với mục tiêu trả thù kẻ đã hủy hoại gia đình cô.', 2),
(81, 'Kẻ Nội Gián - Insider 2022', 1, 16, 'Hoàn thành', 'ke-noi-gian.jpg', 'Bộ phim Kẻ Nội Gián - Insider 2022 thuộc thể loại phim Hành Động Hình Sự của Hàn Quốc. Bộ phim Kẻ Nội Gián (Insider 2022) Kể về câu chuyện của một thực tập sinh tư pháp tên là Kim Yo Han. Sau khi bí mật điều tra, Kim Yo Han trải qua một cuộc khủng hoảng và cuối cùng phải vật lộn để cố gắng có được một lá bài có thể thay đổi số phận của mình khi anh ta đánh bạc trong tù.', 3),
(82, 'Gã Tư Hình', 1, 8, 'Hoàn thành', 'Vigilante-Korean-Drama.jpg', 'Bộ phim Gã Tư Hình thuộc thể loại phim Hành Động của Hàn Quốc. Gã Tư Hình (Vigilante) là bộ phim xoay quanh Kim Ji Yong, học viên tại một Học viện Cảnh sát, người đã mất mẹ do bởi bàn tay của bọn xã hội đen gần nhà.', 3),
(83, 'Bài Ca Của Lưỡi Kiếm', 1, 9, 'Hoàn thành', 'bai-ca-cua-luoi-kiem.jpg', 'Bộ phim Bài Ca Của Lưỡi Kiếm thuộc thể loại phim Hành Động của Hàn Quốc. Bộ phim Bài Ca Của Lưỡi Kiếm (Song of the Bandits) nói về cuộc sống và những trận chiến gay cấn của những tên cướp ở vùng đất Gando hoang dã và khắc nghiệt.', 3),
(84, 'Đảo Hải Tặc Live Action', 6, 8, 'Hoàn thành', 'dao-hao-tac-live-action.jpg', 'Bộ phim Đảo Hải Tặc Live Action thuộc thể loại phim Hành Động của Nhiều quốc gia. Phim Đảo Hải Tặc Live Action (One Piece Live Action) xoay quanh hải tặc trẻ Monkey Monkey D. Luffy với chiếc mũ rơm và nhóm bạn đủ thành phần, có hành trình săn kho báu hoành tráng trong bản chuyển thể người đóng của bộ manga nổi tiếng.', 2),
(85, 'Zombieverse - Vũ Trụ Thây Ma', 1, 8, 'Hoàn thành', 'zombieverse-vu-tru-thay-ma.jpg', 'Bộ phim Zombieverse - Vũ Trụ Thây Ma thuộc thể loại phim Hành Động của Hàn Quốc. Phim Zombieverse (Vũ Trụ Thây Ma) nói về khi một đợt bùng phát virus thây ma hoành hành ở Seoul, con người sẽ phải đánh lừa được thây ma trong khi đối mặt với các nhiệm vụ khó nhằn để sống sót.', 3),
(86, 'Sát Thủ John Wick 4', 1, 5, 'Hoàn thành', 'sat-thu-john-wick-4-2023.jpg', 'Bộ phim Sát Thủ John Wick 4 thuộc thể loại phim Hành Động của Mỹ. Sát Thủ John Wick 4 - Keanu Reeves thủ vai đối mặt với những kẻ thù mới và đoàn tụ với những người bạn cũ trong sứ mệnh tiêu diệt kẻ độc ác. Câu chuyện với cái giá phải trả ngày càng tăng, John Wick tham gia cuộc chiến chống lại High Table trên toàn cầu khi tìm kiếm những người chơi quyền lực nhất trong thế giới ngầm, từ New York qua Paris, Osaka đến cả Berlin.', 5),
(87, 'Chim Mồi Phần 2', 1, 6, 'Hoàn thành', 'chim-moi-phan-2.jpg', 'Bộ phim Chim Mồi Phần 2 thuộc thể loại phim Hành Động của Hàn Quốc. Bộ phim Chim Mồi Phần 2 (The Bait: Mồi Nhử Phần 2 - Decoy Season 2) xoay quanh thám tử Gu Do Han, người từng làm luật sư.', 3),
(88, 'Vô Gian 2023 - Infernal Affairs', 1, 40, 'Hoàn thành', 'vo-gian-2023-infernal-affairs.jpg', 'Bộ phim Vô Gian 2023 - Infernal Affairs thuộc thể loại phim Hành Động của Trung Quốc. Bộ phim Vô Gian 2023 (Infernal Affairs) lấy bối cảnh năm 1944, thuật lại cuộc kháng chiến giữa Quốc dân đảng và Đảng Cộng sản Trung Quốc.', 2),
(89, 'Sát Nhân Bắt Chước', 1, 10, 'Hoàn thành', 'sat-nhan-bat-chuoc-copycat-killer.jpg', 'Bộ phim Sát Nhân Bắt Chước thuộc thể loại phim Hành Động của Trung Quốc. Bộ phim Sát Nhân Bắt Chước (Copycat Killer) nói về khi hàng loạt án mạng rùng rợn khiến thành phố hỗn loạn, một công tố viên ngoan cường phải sẵn sàng trước trò mèo vờn chuột với kẻ thao túng nguy hiểm', 2),
(90, 'Hòn Đảo Ma Quái Phần 2', 1, 6, 'Hoàn thành', 'dao-dia-nguc-2-island-2-hon-dao-ma-quai-2.jpg', 'Bộ phim Hòn Đảo Ma Quái Phần 2 - Đảo Địa Ngục 2 thuộc thể loại phim Hành Động của Hàn Quốc. Bộ phim Hòn Đảo Ma Quái Phần 2 - Đảo Địa Ngục 2 (Island Season 2) kể về Won Mi Ho, con con gái duy nhất của người cha điều hành tập đoàn Daehan. Cô ấy kiêu ngạo và ích kỷ, nhưng cô ấy cũng có vẻ buồn. Một ngày nọ, cô ấy gây ra rắc rối lớn. Vì điều này, cha cô đã trục xuất cô đến đảo Jeju.', 3),
(91, 'CUỒNG PHONG - The Knockout', 1, 39, 'Hoàn thành', '360_480_420845_The-Thunder.jpg', 'Bộ phim CUỒNG PHONG - The Knockout thuộc thể loại phim Hành Động của Trung Quốc. Bộ phim Cuồng Phong (The Knockout) là câu chuyện về những thiếu niên anh hùng, 20 năm kiên trì, những thiếu niên máu lửa quật cường cuối cùng đã trở thành những anh hùng dân tộc.', 2),
(92, 'Sòng Bạc Casino', 1, 8, 'Hoàn thành', '360_480_5547_song-bac-casino.jpg', 'Bộ phim Sòng Bạc Casino thuộc thể loại phim Hành Động của Hàn Quốc. Bộ phim Sòng Bạc Casino lấy bối cảnh là một sòng bạc, câu chuyện về cuộc đời đầy sóng gió của một người đàn ông. Cha Mu-Sik (Choi Min-Sik) đã trở thành huyền thoại trong thế giới sòng bạc, sau nhiều lần tréo ngoe.', 3),
(93, 'Công Lý Mù - Tội Ác Vô Hình', 1, 16, 'Hoàn thành', '360_480_443623_blind_1.jpg', 'Bộ phim Công Lý Mù - Tội Ác Vô Hình thuộc thể loại phim Hành Động của Hàn Quốc. Công Lý Mù - Tội Ác Vô Hình (Blind) xoay quanh 3 người trẻ tràn đầy nhiệt huyết. Ryu Sung Joon - một thám tử luôn quyết tâm truy lùng tội phạm nên tỷ lệ phá án luôn nằm trong top đầu. Ryu Sung Hoon - anh trai của Ryu Sung Joon, là một thẩm phán ngay thẳng, thông minh, luôn cố gắng đưa ra phán quyết công bằng. Jo Eun Ki - một nhân viên xã hội có trái tim ấm áp và tràn đầy công lý. Ba người vô tình dính vào một vụ án g', 3),
(94, 'Phi Hổ Cực Chiến 3', 1, 30, 'Hoàn thành', '360_480_204938_phihocucchien3.jpg', 'Bộ phim Phi Hổ Cực Chiến 3 thuộc thể loại phim Hành Động của Hồng Kông. Bộ phim Phi Hổ Cực Chiến 3 tiếp tục câu chuyện chiến đấu với các nhóm tội phạm nguy hiểm của đội Phi Hổ. Một cuộc mua bán vũ khí hoá học diễn ra vô tình khiến mọi thứ rơi vào rắc rối, nghiêm trọng hơn khiến con tin bị bắt, mà các thành viên thuộc đội Phi Hổ 3 là Trương Gia Hiên, Cao Tử Lạc và Dư Hiểu Hân cũng bị cầm chân ở hiện trường.', 2),
(95, 'CUỘC CHIẾN KHÔNG GIAN', 2, 10, 'Hoàn thành', 'cuoc-chien-khong-gian-phan-2.jpg', 'Cuộc Chiến Không Gian (Phần 2) kể về chuyến bay thứ hai của For All Mankind không phải là không có trục trặc, nhưng tác phẩm của nhân vật hấp dẫn và cảm giác ngạc nhiên mới mẻ đã tạo nên cảm giác hồi hộp cho người xem.', 5),
(96, 'THẾ GIỚI DỊ NHÂN', 2, 27, 'Hoàn thành', 'the-gioi-di-nhan.jpg', 'Thế Giới Dị Nhân kể về câu chuyện do thi thể ông nội biến mất một cách ly kỳ, chàng trai bình thường Trương Sở Lam (Bành Dục Sướng thủ vai) bị cuốn vào thế giới \"dị nhân\" xa lạ, phải đối mặt với màn truy sát bất ngờ ập tới từ \"Toàn Tính\". Cô gái thần bí Phùng Bảo Bảo (Vương Ảnh Lộ thủ vai) đột ngột xuất hiện, Trương Sở Lam quyết tâm không che giấu dị năng nữa. Cùng với việc lần theo quá khứ của ông nội, Trương Sở Lam dần dần hòa nhập vào thế giới của dị nhân, và bí ẩn lịch sử cũng từng bước hé m', 2),
(97, 'HOẠ MI', 3, 38, 'Phim đang chiếu', 'hoa-mi.jpg', 'Hoạ Mi kể về năm 1958, “Dự án Thủy Tích” nghiên cứu dựa trên lý thuyết cơ bản của tàu ngầm được triển khai. Sau khi công trình này được khởi động, nó đã trở thành cái gai trong mắt đặc vụ địch, chúng đã vạch ra một kế hoạch phá hoại có biệt hiệu là \"Hành động Bàn Thạch\" để ăn miếng trả miếng.', 2),
(98, 'THIẾU NIÊN MINH LONG', 4, 30, 'Phim đang chiếu', 'thieu-nien-minh-long.jpg', 'Thiếu Niên Minh Long nhằm phát huy tối đa tiềm năng của học sinh, Trường THPT Thực Nghiệm Minh Long, một ngôi trường tư thục tại thành phố Tinh Châu, đã thành lập lớp 12-11 do thầy giáo tiếng Anh xuất sắc Lôi Minh và cô giáo tâm lý Tang Hạ dẫn dắt. Lý Nhiên là một học sinh cấp 3 bình thường tại Trường THPT Minh Long. ', 2);

-- --------------------------------------------------------

--
-- Table structure for table `phimdecu`
--

CREATE TABLE `phimdecu` (
  `idphimdecu` int(11) NOT NULL,
  `idphim` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `phimdecu`
--

INSERT INTO `phimdecu` (`idphimdecu`, `idphim`) VALUES
(15, 62),
(20, 65),
(21, 66),
(17, 76);

-- --------------------------------------------------------

--
-- Table structure for table `phimhot`
--

CREATE TABLE `phimhot` (
  `idphimhot` int(11) NOT NULL,
  `idphim` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `phimhot`
--

INSERT INTO `phimhot` (`idphimhot`, `idphim`) VALUES
(3, 62),
(5, 68),
(4, 69),
(6, 81);

-- --------------------------------------------------------

--
-- Table structure for table `quocgia`
--

CREATE TABLE `quocgia` (
  `idquocgia` int(11) NOT NULL,
  `tenquocgia` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `quocgia`
--

INSERT INTO `quocgia` (`idquocgia`, `tenquocgia`) VALUES
(1, 'Việt Nam'),
(2, 'Trung Quốc'),
(3, 'Hàn Quốc'),
(4, 'Thái Lan'),
(5, 'Âu Mỹ'),
(6, 'Đài Loan'),
(7, 'Ấn Độ'),
(8, 'Nhật Bản');

-- --------------------------------------------------------

--
-- Table structure for table `tapphim`
--

CREATE TABLE `tapphim` (
  `idtapphim` int(11) NOT NULL,
  `linktapphim` int(11) NOT NULL,
  `sotapphim` int(11) NOT NULL,
  `idphim` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `theloai`
--

CREATE TABLE `theloai` (
  `idtheloai` int(11) NOT NULL,
  `tentheloai` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `theloai`
--

INSERT INTO `theloai` (`idtheloai`, `tentheloai`) VALUES
(1, 'Phiêu Lưu-Hành Động'),
(2, 'Khoa Học-Viễn Tưởng'),
(3, 'Hình Sự-Chiến Tranh'),
(4, 'Gia Đình-Học Đường'),
(5, 'Tâm Lý-Tình Cảm'),
(6, 'Hoạt Hình');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Userid` int(5) NOT NULL,
  `UserName` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Userid`, `UserName`, `Email`, `Password`) VALUES
(35, 'thao', 'thongngoc2k3@gmail.com', '345643');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `duocyeuthich`
--
ALTER TABLE `duocyeuthich`
  ADD PRIMARY KEY (`idphim_yeuthich`),
  ADD KEY `idphim` (`idphim`);

--
-- Indexes for table `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`idnguoidung`);

--
-- Indexes for table `phim`
--
ALTER TABLE `phim`
  ADD PRIMARY KEY (`idphim`),
  ADD KEY `idtheloai` (`idtheloai`),
  ADD KEY `phim_ibfk_2` (`idquocgia`);

--
-- Indexes for table `phimdecu`
--
ALTER TABLE `phimdecu`
  ADD PRIMARY KEY (`idphimdecu`),
  ADD KEY `idphim` (`idphim`);

--
-- Indexes for table `phimhot`
--
ALTER TABLE `phimhot`
  ADD PRIMARY KEY (`idphimhot`),
  ADD KEY `idphim` (`idphim`);

--
-- Indexes for table `quocgia`
--
ALTER TABLE `quocgia`
  ADD PRIMARY KEY (`idquocgia`);

--
-- Indexes for table `tapphim`
--
ALTER TABLE `tapphim`
  ADD PRIMARY KEY (`idtapphim`),
  ADD KEY `idphim` (`idphim`);

--
-- Indexes for table `theloai`
--
ALTER TABLE `theloai`
  ADD PRIMARY KEY (`idtheloai`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `duocyeuthich`
--
ALTER TABLE `duocyeuthich`
  MODIFY `idphim_yeuthich` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `nguoidung`
--
ALTER TABLE `nguoidung`
  MODIFY `idnguoidung` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `phim`
--
ALTER TABLE `phim`
  MODIFY `idphim` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `phimdecu`
--
ALTER TABLE `phimdecu`
  MODIFY `idphimdecu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `phimhot`
--
ALTER TABLE `phimhot`
  MODIFY `idphimhot` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `quocgia`
--
ALTER TABLE `quocgia`
  MODIFY `idquocgia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tapphim`
--
ALTER TABLE `tapphim`
  MODIFY `idtapphim` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `theloai`
--
ALTER TABLE `theloai`
  MODIFY `idtheloai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Userid` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `duocyeuthich`
--
ALTER TABLE `duocyeuthich`
  ADD CONSTRAINT `duocyeuthich_ibfk_1` FOREIGN KEY (`idphim`) REFERENCES `phim` (`idphim`);

--
-- Constraints for table `phim`
--
ALTER TABLE `phim`
  ADD CONSTRAINT `phim_ibfk_1` FOREIGN KEY (`idtheloai`) REFERENCES `theloai` (`idtheloai`),
  ADD CONSTRAINT `phim_ibfk_2` FOREIGN KEY (`idquocgia`) REFERENCES `quocgia` (`idquocgia`);

--
-- Constraints for table `phimdecu`
--
ALTER TABLE `phimdecu`
  ADD CONSTRAINT `phimdecu_ibfk_1` FOREIGN KEY (`idphim`) REFERENCES `phim` (`idphim`);

--
-- Constraints for table `phimhot`
--
ALTER TABLE `phimhot`
  ADD CONSTRAINT `phimhot_ibfk_1` FOREIGN KEY (`idphim`) REFERENCES `phim` (`idphim`);

--
-- Constraints for table `tapphim`
--
ALTER TABLE `tapphim`
  ADD CONSTRAINT `tapphim_ibfk_1` FOREIGN KEY (`idphim`) REFERENCES `phim` (`idphim`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
