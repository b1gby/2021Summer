/*
 Navicat MySQL Data Transfer

 Source Server         : huaweiyun
 Source Server Type    : MySQL
 Source Server Version : 80025
 Source Host           : 159.138.3.194:3306
 Source Schema         : 2021Summer

 Target Server Type    : MySQL
 Target Server Version : 80025
 File Encoding         : 65001

 Date: 06/09/2021 16:23:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ADMIN
-- ----------------------------
DROP TABLE IF EXISTS `ADMIN`;
CREATE TABLE `ADMIN`  (
  `Aid` int NOT NULL AUTO_INCREMENT,
  `Aname` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Apassword` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`Aid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ADMIN
-- ----------------------------
INSERT INTO `ADMIN` VALUES (1, 'summer', 'admin');

-- ----------------------------
-- Table structure for CAMPUS
-- ----------------------------
DROP TABLE IF EXISTS `CAMPUS`;
CREATE TABLE `CAMPUS`  (
  `Cid` int NOT NULL AUTO_INCREMENT,
  `Cname` varchar(16) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  PRIMARY KEY (`Cid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 300011 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of CAMPUS
-- ----------------------------
INSERT INTO `CAMPUS` VALUES (300001, '思明');
INSERT INTO `CAMPUS` VALUES (300002, '湖里');
INSERT INTO `CAMPUS` VALUES (300003, '翔安');
INSERT INTO `CAMPUS` VALUES (300004, '集美');
INSERT INTO `CAMPUS` VALUES (300007, '12');
INSERT INTO `CAMPUS` VALUES (300008, '1');
INSERT INTO `CAMPUS` VALUES (300009, '1233');
INSERT INTO `CAMPUS` VALUES (300010, '12345');

-- ----------------------------
-- Table structure for EXERCISE
-- ----------------------------
DROP TABLE IF EXISTS `EXERCISE`;
CREATE TABLE `EXERCISE`  (
  `Eid` int NOT NULL AUTO_INCREMENT,
  `Etitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Edescription` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `EnameTxt` varchar(500) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `EnamePath` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `EanswerTxt` varchar(500) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `EanswerPath` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Egrade` varchar(10) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `Esubject` varchar(10) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `Etype` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Edifficulty` enum('简单','中等','困难','竞赛') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '简单',
  `Eunit` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Eid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 500039 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of EXERCISE
-- ----------------------------
INSERT INTO `EXERCISE` VALUES (500001, '古诗默写-《题破山寺后禅院》', '默写以下诗句', '________，禅房花木深', '', '曲径通幽处', '', '七年级', '语文', '默写', '简单', NULL);
INSERT INTO `EXERCISE` VALUES (500002, '古诗默写-《登岳阳楼》', '默写以下诗句', '________，乾坤日夜浮', '', '吴楚东南坼', '', '七年级', '语文', '默写', '简单', NULL);
INSERT INTO `EXERCISE` VALUES (500003, '古诗默写-《题破山寺后禅院》', '默写以下诗句', '万籁此俱寂，________', '', '但余钟磬音', '', '七年级', '语文', '默写', '简单', NULL);
INSERT INTO `EXERCISE` VALUES (500004, '古诗默写-《登岳阳楼》', '默写以下诗句', '戎马关山北，________', '', '凭轩涕泗流', '', '七年级', '语文', '默写', '简单', NULL);
INSERT INTO `EXERCISE` VALUES (500005, '英语单词默写-牙科医生', '请根据英语释义默写英语单词', 'n.牙科医生', '', 'dentist', '', '八年级', '英语', '默写', '简单', '一单元');
INSERT INTO `EXERCISE` VALUES (500006, '英语短句默写-一天的变化有多大啊！', '请根据英语释义默写英语短句', '一天的变化有多大啊！', '', 'What a difference a day makes!', '', '八年级', '英语', '默写', '中等', '一单元');
INSERT INTO `EXERCISE` VALUES (500007, '英语短句默写-我的腿太累了以至于我都想停下来', '请根据英语释义默写英语短句', '我的腿太累了以至于我都想停下来', '', 'My legs were so tired that I wanted to stop', '', '八年级', '英语', '默写', '中等', '一单元');
INSERT INTO `EXERCISE` VALUES (500008, '数学八年级选择题', '选择题', '', 'exercise/math/eight/500008.png', 'D', '', '八年级', '数学', '选择题', '简单', NULL);
INSERT INTO `EXERCISE` VALUES (500009, '数学八年级填空题', '填空题', '', 'exercise/math/eight/500009.png', '3<m<4', '', '八年级', '数学', '填空题', '中等', NULL);
INSERT INTO `EXERCISE` VALUES (500010, '数学八年级解答题', '解答题', '', 'exercise/math/eight/500010.png', '', 'exercise/math/eight/500010answer.png', '八年级', '数学', '解答题', '中等', NULL);
INSERT INTO `EXERCISE` VALUES (500011, '物理八年级填空题', '填空题', '', 'exercise/physics/eight/500011.png', '0    2N    水平向右', '', '八年级', '物理', '填空题', '困难', NULL);
INSERT INTO `EXERCISE` VALUES (500012, '物理八年级计算题', '计算题', '', 'exercise/physics/eight/500012.png', '275N    27500Pa', '', '八年级', '物理', '计算题', '简单', NULL);
INSERT INTO `EXERCISE` VALUES (500013, '英语单词听写-自信心', '请写出您听到的单词', '', 'english/test/confidence.mp3', 'confidence自信心', '', '九年级', '英语', '听写', '简单', NULL);
INSERT INTO `EXERCISE` VALUES (500014, '英语单词听写-牙科医生', '请写出您听到的单词', '', 'english/test/dentist.mp3', 'dentist牙科医生', '', '九年级', '英语', '听写', '简单', NULL);
INSERT INTO `EXERCISE` VALUES (500015, '英语单词听写-无限', '请写出您听到的单词', '', 'english/test/infinity.mp3', 'infinity无限', '', '九年级', '英语', '听写', '简单', NULL);
INSERT INTO `EXERCISE` VALUES (500016, '英语单词听写-现实', '请写出您听到的单词', '', 'english/test/reality.mp3', 'reality现实', '', '九年级', '英语', '听写', '简单', NULL);
INSERT INTO `EXERCISE` VALUES (500031, 'test1', 'test11', 'test111', 'exercise/AaPqRZfqNgQn4b038c8febd34d7dd2bf9fd34b09561f.jpg;exercise/1DEqa1MxeM8h0d783e2795b4aef0cd60bed69ea54d0b.png', '111tset', 'exercise/N24aYL4UA8fa369bafafc4d0abb77edfba640db47038.png;exercise/SqNyBxIipNyT41b46ea86b4a62c07315e162ed1caf23.jpg', '七年级', '数学', '选择题', '竞赛', '');
INSERT INTO `EXERCISE` VALUES (500032, '123', '1123', '11123', 'exercise/948pp5mjhwE54b038c8febd34d7dd2bf9fd34b09561f.jpg', '111234', 'exercise/JnBqcPFXCrA94b038c8febd34d7dd2bf9fd34b09561f.jpg', '七年级', '语文', '听写', '竞赛', '');
INSERT INTO `EXERCISE` VALUES (500033, '', '', '', '', '', '', '', '语文', '听写', '简单', '');
INSERT INTO `EXERCISE` VALUES (500034, '', '', '', '', '', '', '', '语文', '听写', '简单', '');
INSERT INTO `EXERCISE` VALUES (500035, '', '', '', '', '', '', '', '语文', '听写', '简单', '');
INSERT INTO `EXERCISE` VALUES (500036, '', '', '', '', '', '', '', '语文', '听写', '简单', '');
INSERT INTO `EXERCISE` VALUES (500037, '', '', '', '2xwfZ586qF0Ie6f5406829f9bbaebde086301ebc3c23.durationTime=4369.mp3', '', '', '', '语文', '听写', '竞赛', '');
INSERT INTO `EXERCISE` VALUES (500039, '', '', '', 'exercise/3G5hXanarTz04b038c8febd34d7dd2bf9fd34b09561f.jpg;exercise/oOsul3TGuKdu41b46ea86b4a62c07315e162ed1caf23.jpg', '', 'exercise/Hyu1Vhuuk38K0d783e2795b4aef0cd60bed69ea54d0b.png;exercise/OhxuPv3hzkuE369bafafc4d0abb77edfba640db47038.png', '七年级', '数学', '解答题', '困难', '');

-- ----------------------------
-- Table structure for LEARNSITUATION
-- ----------------------------
DROP TABLE IF EXISTS `LEARNSITUATION`;
CREATE TABLE `LEARNSITUATION`  (
  `LSid` int NOT NULL AUTO_INCREMENT,
  `Sid` int NOT NULL,
  `LSattendence` varchar(100) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `LSperform` varchar(100) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `LShomework` varchar(100) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`LSid`) USING BTREE,
  INDEX `FK_Reference_7`(`Sid`) USING BTREE,
  CONSTRAINT `FK_Reference_7` FOREIGN KEY (`Sid`) REFERENCES `STUDENT` (`Sid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 700001 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of LEARNSITUATION
-- ----------------------------
INSERT INTO `LEARNSITUATION` VALUES (700001, 100001, '迟到', '123', '123');

-- ----------------------------
-- Table structure for STUDENT
-- ----------------------------
DROP TABLE IF EXISTS `STUDENT`;
CREATE TABLE `STUDENT`  (
  `Sid` int NOT NULL AUTO_INCREMENT,
  `Sname` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Snickname` varchar(16) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `Spassword` char(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Sphone` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Sicon` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Sgrade` int NULL DEFAULT NULL,
  `Cid` int NULL DEFAULT NULL,
  PRIMARY KEY (`Sid`) USING BTREE,
  INDEX `FK_Reference_8`(`Cid`) USING BTREE,
  CONSTRAINT `FK_Reference_8` FOREIGN KEY (`Cid`) REFERENCES `CAMPUS` (`Cid`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE = InnoDB AUTO_INCREMENT = 100017 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of STUDENT
-- ----------------------------
INSERT INTO `STUDENT` VALUES (100001, 'zhangsan', '张三', '123456', '13800000000', 'default_boy.png', 8, 300001);
INSERT INTO `STUDENT` VALUES (100002, 'lisi', '李四', '123456', '13822222222', 'default_boy.png', 9, 300002);
INSERT INTO `STUDENT` VALUES (100005, 'bigby', 'bigb', '123', '13777777777', 'user_avatar/91ucXGB2mfxIf3ca7fb51df408b8c0d260a7b4012728.jpg', 11, 300007);
INSERT INTO `STUDENT` VALUES (100013, 'wangwu', '王五', '123456', '13890909090', 'default_boy.png', 8, 300004);
INSERT INTO `STUDENT` VALUES (100016, '12345', '123', '123', '123', 'user_avatar/cGiavPQx7Khff3ca7fb51df408b8c0d260a7b4012728.jpg', 8, 300003);
INSERT INTO `STUDENT` VALUES (100017, '123456', '123', '123', '123', 'default_boy.png', 10, 300003);

-- ----------------------------
-- Table structure for TEACHAREA
-- ----------------------------
DROP TABLE IF EXISTS `TEACHAREA`;
CREATE TABLE `TEACHAREA`  (
  `TAid` int NOT NULL AUTO_INCREMENT,
  `Tid` int NOT NULL,
  `Cid` int NOT NULL,
  PRIMARY KEY (`TAid`) USING BTREE,
  INDEX `FK_Reference_1`(`Tid`) USING BTREE,
  INDEX `FK_Reference_2`(`Cid`) USING BTREE,
  CONSTRAINT `FK_Reference_1` FOREIGN KEY (`Tid`) REFERENCES `TEACHER` (`Tid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Reference_2` FOREIGN KEY (`Cid`) REFERENCES `CAMPUS` (`Cid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 400019 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of TEACHAREA
-- ----------------------------
INSERT INTO `TEACHAREA` VALUES (400001, 200001, 300001);
INSERT INTO `TEACHAREA` VALUES (400014, 200004, 300004);
INSERT INTO `TEACHAREA` VALUES (400016, 200004, 300002);
INSERT INTO `TEACHAREA` VALUES (400017, 200004, 300003);
INSERT INTO `TEACHAREA` VALUES (400018, 200001, 300002);
INSERT INTO `TEACHAREA` VALUES (400019, 200001, 300003);

-- ----------------------------
-- Table structure for TEACHER
-- ----------------------------
DROP TABLE IF EXISTS `TEACHER`;
CREATE TABLE `TEACHER`  (
  `Tid` int NOT NULL AUTO_INCREMENT,
  `Tname` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Tnickname` varchar(16) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `Tpassword` char(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Tphone` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Ticon` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Tid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 200004 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of TEACHER
-- ----------------------------
INSERT INTO `TEACHER` VALUES (200001, 'TeacherWang', '王老师', '123456', '15800000000', 'default_teacher.png');
INSERT INTO `TEACHER` VALUES (200002, '123', '1234', '123', '123', 'default_teacher.png');
INSERT INTO `TEACHER` VALUES (200004, 'TeacherLi', '李老师', '123456', '123', 'user_avatar/adNbhsXknPyqf3ca7fb51df408b8c0d260a7b4012728.jpg');

-- ----------------------------
-- Table structure for TODAYEXERCISE
-- ----------------------------
DROP TABLE IF EXISTS `TODAYEXERCISE`;
CREATE TABLE `TODAYEXERCISE`  (
  `TEid` int NOT NULL AUTO_INCREMENT,
  `Eid` int NULL DEFAULT NULL,
  `Sid` int NULL DEFAULT NULL,
  `TEdate` date NULL DEFAULT NULL,
  `TEanswerTxt` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `TEanswerPath` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`TEid`) USING BTREE,
  UNIQUE INDEX `DISTINCT_Eid_Sid_TEdate`(`Eid`, `Sid`, `TEdate`) USING BTREE,
  INDEX `FK_Reference_10`(`Sid`) USING BTREE,
  INDEX `FK_Reference_11`(`Eid`) USING BTREE,
  CONSTRAINT `FK_Reference_10` FOREIGN KEY (`Sid`) REFERENCES `STUDENT` (`Sid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Reference_9` FOREIGN KEY (`Eid`) REFERENCES `EXERCISE` (`Eid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 800044 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of TODAYEXERCISE
-- ----------------------------
INSERT INTO `TODAYEXERCISE` VALUES (800001, 500001, 100001, '2021-08-19', '123', NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800002, 500002, 100001, '2021-08-19', '1234', NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800003, 500004, 100001, '2021-08-19', '学生未作答', NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800004, 500003, 100002, '2021-08-19', NULL, NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800005, 500005, 100001, '2021-08-19', '学生未作答', NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800006, 500005, 100005, '2021-08-04', NULL, NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800007, 500006, 100013, '2021-08-04', NULL, NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800008, 500005, 100002, '2021-08-04', NULL, NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800009, 500006, 100002, '2021-08-04', NULL, NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800010, 500007, 100005, '2021-08-04', NULL, NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800011, 500007, 100013, '2021-08-04', NULL, NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800012, 500008, 100001, '2021-08-04', NULL, NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800013, 500008, 100013, '2021-08-04', NULL, NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800014, 500013, 100001, '2021-08-16', NULL, NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800015, 500009, 100002, '2021-08-04', NULL, NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800016, 500009, 100005, '2021-08-04', NULL, NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800017, 500010, 100001, '2021-08-19', '123', NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800018, 500010, 100013, '2021-08-04', NULL, NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800019, 500010, 100005, '2021-08-04', NULL, NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800020, 500011, 100005, '2021-08-04', NULL, NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800021, 500011, 100013, '2021-08-04', NULL, NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800022, 500012, 100013, '2021-08-04', NULL, NULL);
INSERT INTO `TODAYEXERCISE` VALUES (800023, 500001, 100005, '2021-08-19', '', '');
INSERT INTO `TODAYEXERCISE` VALUES (800030, 500002, 100005, '2021-08-19', '', '');
INSERT INTO `TODAYEXERCISE` VALUES (800031, 500003, 100005, '2021-08-19', '', '');
INSERT INTO `TODAYEXERCISE` VALUES (800032, 500004, 100005, '2021-08-19', '', '');
INSERT INTO `TODAYEXERCISE` VALUES (800033, 500005, 100005, '2021-08-19', '', '');
INSERT INTO `TODAYEXERCISE` VALUES (800034, 500001, 100013, '2021-08-19', '', '');
INSERT INTO `TODAYEXERCISE` VALUES (800035, 500002, 100013, '2021-08-19', '', '');
INSERT INTO `TODAYEXERCISE` VALUES (800036, 500003, 100013, '2021-08-19', '', '');
INSERT INTO `TODAYEXERCISE` VALUES (800037, 500004, 100013, '2021-08-19', '', '');
INSERT INTO `TODAYEXERCISE` VALUES (800038, 500005, 100013, '2021-08-19', '', '');
INSERT INTO `TODAYEXERCISE` VALUES (800039, 500001, 100001, '2021-08-26', '123', '');
INSERT INTO `TODAYEXERCISE` VALUES (800040, 500002, 100001, '2021-08-26', '1234', '');
INSERT INTO `TODAYEXERCISE` VALUES (800041, 500003, 100001, '2021-08-26', '12345', '');
INSERT INTO `TODAYEXERCISE` VALUES (800042, 500012, 100002, '2021-08-26', '', '');
INSERT INTO `TODAYEXERCISE` VALUES (800043, 500013, 100002, '2021-08-26', '', '');
INSERT INTO `TODAYEXERCISE` VALUES (800044, 500014, 100002, '2021-08-26', '', '');

-- ----------------------------
-- Table structure for WRONGPROBLEM
-- ----------------------------
DROP TABLE IF EXISTS `WRONGPROBLEM`;
CREATE TABLE `WRONGPROBLEM`  (
  `Wid` int NOT NULL AUTO_INCREMENT,
  `Wtitle` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Wdescription` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `WproblemTxt` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `WproblemPath` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `WanswerTxt` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `WanswerPath` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Wgrade` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Wsubject` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Wtype` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Wdifficulty` enum('简单','中等','困难','竞赛') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '简单',
  `Wunit` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Sid` int NOT NULL,
  `WmyAnswerTxt` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `WmyAnswerPath` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `WcreateTime` date NULL DEFAULT NULL,
  PRIMARY KEY (`Wid`) USING BTREE,
  INDEX `FK_Reference_4`(`Sid`) USING BTREE,
  CONSTRAINT `FK_Reference_4` FOREIGN KEY (`Sid`) REFERENCES `STUDENT` (`Sid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 600005 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of WRONGPROBLEM
-- ----------------------------
INSERT INTO `WRONGPROBLEM` VALUES (600001, '古诗默写-《题破山寺后禅院》', '默写以下诗句', '________，禅房花木深', '', '曲径通幽处', '', '七年级', '语文', '默写', '简单', NULL, 100001, '123', '', NULL);
INSERT INTO `WRONGPROBLEM` VALUES (600002, '数学八年级选择题', '选择题', '', 'exercise/math/eight/500008.png', 'D', NULL, '八年级', '数学', '选择题', '简单', NULL, 100002, 'A', NULL, NULL);
INSERT INTO `WRONGPROBLEM` VALUES (600004, '123', '1234', '12345', 'CQA8BS8F5Uz6155aac23b926071636db295b3a14e204.durationTime=2876.mp3', '123456', '', '七年级', '语文', '听写', '困难', '', 100001, '1234567', '', '2021-08-17');

SET FOREIGN_KEY_CHECKS = 1;
