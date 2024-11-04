-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.39 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- sample 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `sample` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sample`;

-- 테이블 sample.bixiv_comment 구조 내보내기
CREATE TABLE IF NOT EXISTS `bixiv_comment` (
  `illustration_id` int NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `cdatetime` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sample.bixiv_comment:~4 rows (대략적) 내보내기
INSERT INTO `bixiv_comment` (`illustration_id`, `user_id`, `content`, `cdatetime`) VALUES
	(37, 'user2', 'asdfasdf', '2024-10-29'),
	(37, 'user2', 'goooooood', '2024-10-29'),
	(37, 'user2', 'hihihi', '2024-10-29'),
	(40, 'user4', 'hahaha', '2024-10-30');

-- 테이블 sample.bixiv_follow 구조 내보내기
CREATE TABLE IF NOT EXISTS `bixiv_follow` (
  `target_id` varchar(50) NOT NULL DEFAULT '',
  `follower_id` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sample.bixiv_follow:~14 rows (대략적) 내보내기
INSERT INTO `bixiv_follow` (`target_id`, `follower_id`) VALUES
	('user2', 'user1'),
	('user3', 'user1'),
	('user4', 'user1'),
	('user5', 'user1'),
	('user6', 'user1'),
	('user7', 'user1'),
	('user8', 'user1'),
	('user9', 'user1'),
	('user10', 'user1'),
	('user11', 'user1'),
	('user12', 'user1'),
	('user12', 'user2'),
	('user11', 'user2'),
	('user10', 'user2');

-- 테이블 sample.bixiv_heart 구조 내보내기
CREATE TABLE IF NOT EXISTS `bixiv_heart` (
  `illustration_id` int NOT NULL,
  `user_id` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sample.bixiv_heart:~9 rows (대략적) 내보내기
INSERT INTO `bixiv_heart` (`illustration_id`, `user_id`) VALUES
	(37, 'user1'),
	(36, 'user1'),
	(35, 'user1'),
	(34, 'user1'),
	(37, 'user2'),
	(36, 'user2'),
	(38, 'user2'),
	(40, 'user4'),
	(38, 'user4');

-- 테이블 sample.bixiv_illustration 구조 내보내기
CREATE TABLE IF NOT EXISTS `bixiv_illustration` (
  `illustration_id` int NOT NULL AUTO_INCREMENT,
  `author_id` varchar(50) NOT NULL DEFAULT '',
  `title` varchar(50) NOT NULL DEFAULT '',
  `caption` varchar(1000) DEFAULT '',
  `tag` varchar(1000) DEFAULT '',
  `hit` int NOT NULL DEFAULT (0),
  `cdatetime` date NOT NULL,
  PRIMARY KEY (`illustration_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sample.bixiv_illustration:~29 rows (대략적) 내보내기
INSERT INTO `bixiv_illustration` (`illustration_id`, `author_id`, `title`, `caption`, `tag`, `hit`, `cdatetime`) VALUES
	(8, 'user1', 'practice', 'practice man', '#practice', 0, '2024-10-25'),
	(9, 'user1', 'asdfasdf', 'asdfasdf', '#귀찮음', 0, '2024-10-25'),
	(10, 'user1', 'foot', '달토끼', '#moon', 0, '2024-10-25'),
	(11, 'user1', 'moon boy', 'moooooooon boy', '#boy #moon', 0, '2024-10-25'),
	(12, 'user1', 'blade man', 'ninja ga imasu', '#samurai #ninja', 0, '2024-10-25'),
	(13, 'user1', 'persona!!!', 'persona4!', '#persona #persona4', 0, '2024-10-25'),
	(14, 'user1', 'boy and girl', 'cheers', '#boy #girl #cheers', 0, '2024-10-25'),
	(15, 'user1', 'drop', 'drop the book', '#man #book #water', 0, '2024-10-25'),
	(16, 'user1', 'practice', '습작', '#practice', 0, '2024-10-25'),
	(17, 'user1', '모동숲', '튀어나와요 동물의 숲', '#동숲', 0, '2024-10-25'),
	(18, 'user1', 'dark boy', '어둠의 다크에서 죽음의 데스를 느끼며', '#dark', 0, '2024-10-25'),
	(19, 'user1', 'persona remaster', 'persona!', '#persona', 0, '2024-10-25'),
	(20, 'user1', 'digimon!', '디지몬 친구들~', '#digimon', 0, '2024-10-25'),
	(21, 'user1', 'album jacket', 'bms 2024 album jacket', '#bms #jacket #illust', 0, '2024-10-25'),
	(22, 'user1', 'dark theme', 'shadow good', '#shadow', 0, '2024-10-25'),
	(23, 'user1', 'kawai', 'kawai desu', '#kawai', 0, '2024-10-25'),
	(24, 'user1', 'drummer', 'kawaiiiii!~~~~', '#drum #kawai', 1, '2024-10-25'),
	(25, 'user1', 'practice3', '33333', '#practice', 0, '2024-10-25'),
	(26, 'user1', 'bl', 'blblblbl', '#bl', 0, '2024-10-25'),
	(27, 'user2', 'nice student', 'blade boy', '#student #blade', 0, '2024-10-28'),
	(28, 'user3', 'school girl', 'too many shoes!', '#school #girl #shoes #boots', 0, '2024-10-28'),
	(29, 'user4', 'pokemon trainer', 'nice', '#pokemon #trainer', 1, '2024-10-28'),
	(30, 'user5', 'original', 'this is the original character', '#original', 0, '2024-10-28'),
	(31, 'user6', 'persona 3', 'XD', '#persona3 #persona', 1, '2024-10-28'),
	(32, 'user7', 'practice', 'practice police', '#police #practice', 0, '2024-10-28'),
	(33, 'user8', 'nice guy', 'very nice', '#guy #man', 0, '2024-10-28'),
	(34, 'user9', 'speed drawing', 'eeee tsu!', '#speed #drawing', 0, '2024-10-28'),
	(35, 'user10', 'android boy', 'so handsome', '#handsome #boy #android', 2, '2024-10-28'),
	(36, 'user11', 'kawaiiii', 'kawaiiii', '#kawai', 4, '2024-10-28'),
	(37, 'user12', 'film man', 'action!', '#film #man', 8, '2024-10-28'),
	(38, 'user2', 'HBD', 'smile~', '#smile #man #HBD', 9, '2024-10-30'),
	(39, 'user3', 'horse girl', 'hiiiii hing', '#horse #girl', 3, '2024-10-30'),
	(40, 'user4', 'trail girl', '240904 trail girl', '#trail #girl', 6, '2024-10-30');

-- 테이블 sample.bixiv_image 구조 내보내기
CREATE TABLE IF NOT EXISTS `bixiv_image` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `illustration_id` int NOT NULL,
  `image_src` varchar(1000) NOT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sample.bixiv_image:~29 rows (대략적) 내보내기
INSERT INTO `bixiv_image` (`image_id`, `illustration_id`, `image_src`) VALUES
	(5, 8, 'upload\\1729845862645.jpg'),
	(6, 9, 'upload\\1729845920210.jpg'),
	(7, 10, 'upload\\1729845945194.jpg'),
	(8, 11, 'upload\\1729845993603.jpg'),
	(9, 12, 'upload\\1729846217049.jpg'),
	(10, 13, 'upload\\1729846390769.jpg'),
	(11, 14, 'upload\\1729846427073.jpg'),
	(12, 15, 'upload\\1729846458411.jpg'),
	(13, 16, 'upload\\1729846486416.jpg'),
	(14, 17, 'upload\\1729846508918.jpg'),
	(15, 18, 'upload\\1729846547301.jpg'),
	(16, 19, 'upload\\1729846589881.jpg'),
	(17, 20, 'upload\\1729846615852.jpg'),
	(18, 21, 'upload\\1729846675752.jpg'),
	(19, 22, 'upload\\1729846825101.jpg'),
	(20, 23, 'upload\\1729846856179.jpg'),
	(21, 24, 'upload\\1729846906230.jpg'),
	(22, 25, 'upload\\1729846927976.jpg'),
	(23, 26, 'upload\\1729846951543.jpg'),
	(24, 27, 'upload\\1730093778651.jpg'),
	(25, 28, 'upload\\1730093881463.jpg'),
	(26, 29, 'upload\\1730093924989.jpg'),
	(27, 30, 'upload\\1730093969832.jpg'),
	(28, 31, 'upload\\1730094018734.jpg'),
	(29, 32, 'upload\\1730094052760.jpg'),
	(30, 33, 'upload\\1730094124328.jpg'),
	(31, 34, 'upload\\1730094174103.jpg'),
	(32, 35, 'upload\\1730094226103.jpg'),
	(33, 36, 'upload\\1730094259780.jpg'),
	(34, 37, 'upload\\1730094296711.jpg'),
	(35, 38, 'upload\\1730250491969.jpg'),
	(36, 39, 'upload\\1730266371635.jpg'),
	(37, 40, 'upload\\1730270963877.jpg');

-- 테이블 sample.bixiv_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `bixiv_user` (
  `id` varchar(50) NOT NULL DEFAULT '',
  `pwd` varchar(50) NOT NULL DEFAULT '',
  `nickname` varchar(50) NOT NULL DEFAULT '',
  `profileImg` varchar(1000) DEFAULT NULL,
  `introduce` varchar(1000) DEFAULT NULL,
  `cdatetime` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sample.bixiv_user:~11 rows (대략적) 내보내기
INSERT INTO `bixiv_user` (`id`, `pwd`, `nickname`, `profileImg`, `introduce`, `cdatetime`) VALUES
	('user1', '1234', 'user1', 'upload\\1730083088005.png', 'user1입니다.', '2024-10-25'),
	('user10', '1234', 'sanji', 'upload\\1730094526139.png', 'sanji입니다.', '2024-10-28'),
	('user11', '1234', 'koitsu', 'upload\\1730094537437.png', 'koitsu입니다.', '2024-10-28'),
	('user12', '1234', 'moitsu', 'upload\\1730094547414.png', 'moitsu입니다.', '2024-10-28'),
	('user2', '1234', 'ryuJur', 'upload\\1730094439638.png', 'ryu입니다.', '2024-10-28'),
	('user3', '1234', 'js', 'upload\\1730094453386.png', 'js입니다.', '2024-10-28'),
	('user4', '1234', 'okok', 'upload\\1730094466351.png', 'okok입니다', '2024-10-28'),
	('user5', '1234', 'former', 'upload\\1730094477710.png', 'former입니다.', '2024-10-28'),
	('user6', '1234', 'nami', 'upload\\1730094487428.png', 'nami입니다.', '2024-10-28'),
	('user7', '1234', 'zoro', 'upload\\1730094497159.png', 'zoro입니다.', '2024-10-28'),
	('user8', '1234', 'usop', 'upload\\1730094507894.png', 'usop입니다.', '2024-10-28'),
	('user9', '1234', 'rupy', 'upload\\1730094516815.png', 'rupy입니다.', '2024-10-28');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
