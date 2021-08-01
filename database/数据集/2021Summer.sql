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

 Date: 28/07/2021 15:42:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for CAMPUS
-- ----------------------------
DROP TABLE IF EXISTS `CAMPUS`;
CREATE TABLE `CAMPUS`  (
  `Cid` int NOT NULL AUTO_INCREMENT,
  `Cname` varchar(16) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  PRIMARY KEY (`Cid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 300005 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of CAMPUS
-- ----------------------------
INSERT INTO `CAMPUS` VALUES (300001, '思明');
INSERT INTO `CAMPUS` VALUES (300002, '湖里');
INSERT INTO `CAMPUS` VALUES (300003, '翔安');
INSERT INTO `CAMPUS` VALUES (300004, '集美');

-- ----------------------------
-- Table structure for EXERCISE
-- ----------------------------
DROP TABLE IF EXISTS `EXERCISE`;
CREATE TABLE `EXERCISE`  (
  `Eid` int NOT NULL AUTO_INCREMENT,
  `EnameTxt` varchar(500) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `EnamePath` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `EanswerTxt` varchar(500) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `EanswerPath` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Egrade` varchar(10) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `Esubject` varchar(10) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `Etype` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Eid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 500008 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of EXERCISE
-- ----------------------------
INSERT INTO `EXERCISE` VALUES (500001, '________，禅房花木深', 'null', '曲径通幽处', 'null', '七年级', '语文', '默写');
INSERT INTO `EXERCISE` VALUES (500002, '________，乾坤日夜浮', 'null', '吴楚东南坼', 'null', '七年级', '语文', '默写');
INSERT INTO `EXERCISE` VALUES (500003, '万籁此俱寂，________', 'null', '但余钟磬音', 'null', '七年级', '语文', '默写');
INSERT INTO `EXERCISE` VALUES (500004, '戎马关山北，________', 'null', '凭轩涕泗流', 'null', '七年级', '语文', '默写');

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
) ENGINE = InnoDB AUTO_INCREMENT = 700002 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of LEARNSITUATION
-- ----------------------------
INSERT INTO `LEARNSITUATION` VALUES (700001, 100001, '123', '123', '123');

-- ----------------------------
-- Table structure for STUDENT
-- ----------------------------
DROP TABLE IF EXISTS `STUDENT`;
CREATE TABLE `STUDENT`  (
  `Sid` int NOT NULL AUTO_INCREMENT,
  `Sname` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Snickname` varchar(16) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `Spassword` char(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Sphone` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Sicon` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Sgrade` varchar(10) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `Cid` int NULL DEFAULT NULL,
  PRIMARY KEY (`Sid`) USING BTREE,
  INDEX `FK_Reference_8`(`Cid`) USING BTREE,
  CONSTRAINT `FK_Reference_8` FOREIGN KEY (`Cid`) REFERENCES `CAMPUS` (`Cid`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE = InnoDB AUTO_INCREMENT = 100011 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of STUDENT
-- ----------------------------
INSERT INTO `STUDENT` VALUES (100001, 'zhangsan', '张三', '123456', '13800000000', 'default_girl.png', '七年级', 300001);
INSERT INTO `STUDENT` VALUES (100002, 'lisi', '李四', '123456', '13822222222', 'default_boy.png', '八年级', 300002);
INSERT INTO `STUDENT` VALUES (100005, 'bigby', 'bigby', '123', '13666666666', 'default_boy.png', '九年级', 300004);
INSERT INTO `STUDENT` VALUES (100013, 'wangwu', '', '123456', '13890909090', '', '八年级', 300004);

-- ----------------------------
-- Table structure for TEACHAREA
-- ----------------------------
DROP TABLE IF EXISTS `TEACHAREA`;
CREATE TABLE `TEACHAREA`  (
  `TCid` int NOT NULL AUTO_INCREMENT,
  `Tid` int NOT NULL,
  `Cid` int NOT NULL,
  PRIMARY KEY (`TCid`) USING BTREE,
  INDEX `FK_Reference_1`(`Tid`) USING BTREE,
  INDEX `FK_Reference_2`(`Cid`) USING BTREE,
  CONSTRAINT `FK_Reference_1` FOREIGN KEY (`Tid`) REFERENCES `TEACHER` (`Tid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Reference_2` FOREIGN KEY (`Cid`) REFERENCES `CAMPUS` (`Cid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 400003 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of TEACHAREA
-- ----------------------------
INSERT INTO `TEACHAREA` VALUES (400001, 200001, 300001);
INSERT INTO `TEACHAREA` VALUES (400002, 200001, 300003);

-- ----------------------------
-- Table structure for TEACHER
-- ----------------------------
DROP TABLE IF EXISTS `TEACHER`;
CREATE TABLE `TEACHER`  (
  `Tid` int NOT NULL AUTO_INCREMENT,
  `Tname` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Tnickname` varchar(16) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `Tpassword` char(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Tphone` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Ticon` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Tid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 200002 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of TEACHER
-- ----------------------------
INSERT INTO `TEACHER` VALUES (200001, 'TeacherWang', '王老师', '123456', '15800000000', 'null');

-- ----------------------------
-- Table structure for WRONGPROBLEM
-- ----------------------------
DROP TABLE IF EXISTS `WRONGPROBLEM`;
CREATE TABLE `WRONGPROBLEM`  (
  `Wid` int NOT NULL AUTO_INCREMENT,
  `WproblemTxt` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `WproblemImg` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `WanswerTxt` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `WanswerImg` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Wgrade` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Wsubject` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Sid` int NOT NULL,
  `WmyAnswerTxt` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `WmyAnswerImg` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Wid`) USING BTREE,
  INDEX `FK_Reference_4`(`Sid`) USING BTREE,
  INDEX `FK_Reference_5`(`WproblemTxt`) USING BTREE,
  CONSTRAINT `FK_Reference_4` FOREIGN KEY (`Sid`) REFERENCES `STUDENT` (`Sid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 600002 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of WRONGPROBLEM
-- ----------------------------
INSERT INTO `WRONGPROBLEM` VALUES (600001, '________，禅房花木深', 'null', '曲径通幽处', 'null', '七年级', '语文', 100001, '123', 'null');

SET FOREIGN_KEY_CHECKS = 1;
