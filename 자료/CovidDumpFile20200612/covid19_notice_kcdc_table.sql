-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: covid19
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `notice_kcdc_table`
--

DROP TABLE IF EXISTS `notice_kcdc_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice_kcdc_table` (
  `id` int(11) NOT NULL,
  `title` longtext NOT NULL,
  `comment` longtext NOT NULL,
  `writer` longtext NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice_kcdc_table`
--

LOCK TABLES `notice_kcdc_table` WRITE;
/*!40000 ALTER TABLE `notice_kcdc_table` DISABLE KEYS */;
INSERT INTO `notice_kcdc_table` VALUES (0,'코로나19 양성 잔여검체 분양 안내','질병관리본부 국립보건연구원 국립중앙인체자원은행은 감염병예방법에 따라 수집·활용된 잔여검체에 대해 코로나19 방역을 위한<br><br>연구, 진단기기 개발 등을 지원하고자 아래와 같이 분양신청을 안내드립니다. 관심 있는 기관의 많은 신청 바랍니다.<br><br> <br><br>ㅇ 분양대상자원 : 코로나19 양성 잔여검체 1,703건<br><br>- 인후도말(NPS/OPS) 검체 1,184건, 객담 검체 519건<br><br>- 검체관련정보 : 연령대, 성별, 검사키트 제조사, 검체종류(인후도말, 객담), 검체 Ct값 (3가지 유전자: E, RdRp, N)<br><br>- 검체량 : 0.2~1ml/vial (-70℃ 초저온냉동고 보관)<br><br> <br><br>ㅇ 활용분야<br><br>- 코로나19 방역을 위한 진단기기 개발, 연구, 실험실 정도관리 등<br><br>※ 인간의 유전체 등의 분석에 사용할 수 없음<br><br>※ 체외진단의료기기 허가를 위한 임상적 성능시험 목적으로 이용시 관련기관에 사전확인 필요(FAQ참조)<br><br> <br><br>ㅇ 신청대상기관<br><br>- 체외진단 의료기기 개발업체, 의료기관, 임상검사기관, 국공립 연구기관 등<br><br>※ 검체이용 목적에 적합한 연구시설(BL2, BL3) 보유 필요<br><br> <br><br>ㅇ 신청기간 : 2020. 6. 12(금) ~ 2020. 6. 19(금) 18시까지<br><br> <br><br>ㅇ 신청방법 : 온라인 또는 이메일 신청<br><br>1. 온라인 분양신청<br><br>- 질병관리본부 통합관리시스템(is.cdc.go.kr) 회원가입 및 권한신청(매뉴얼, 문의: 043-719-6534) → 온라인 분양데스크 신청서 작성<br><br> <br><br>2. 이메일 분양신청<br><br>- 신청양식 다운로드 → 이메일 제출(biobank@korea.kr)<br><br> <br><br>ㅇ 분양절차 : 국립중앙인체자원은행 분양위원회 심의를 거쳐 검체자원 분양<br><br>※ 신청 수요에 따라 신청기관별 분양 가능한 검체 수량이 조정될 수 있음<br><br> <br><br>ㅇ 분양수수료 : 면제<br><br> <br><br>ㅇ 신청양식<br><br>1. 인체자원이용계획서(서식)<br><br>2. 서약서(서식)<br><br>3. 개인정보수집이용동의서(서식)<br><br>4. IRB심의결과서(분양승인 후 제출가능)<br><br>5. IRB심의용 연구계획서 또는 식약처 허가신청 임상계획서<br><br>6. 분양신청공문<br><br> <br><br>※ 코로나19 양성 잔여검체 분양 관련 FAQ<br><br> <br><br>기타 문의사항이 있으실 경우 아래 연락처로 문의주시기 바랍니다.<br><br><br><br>담당 : 국립중앙인체자원은행 김남희 (043-719-6534, biobank@korea.kr)','바이오뱅크과 ','2020-06-11 00:00:00'),(1,'코로나19 혈장치료제 개발을 위한 혈액공여자 모집 안내','질병관리본부 국립보건연구원에서는 GC녹십자와 협력하여 코로나19 혈장치료제 개발을 진행하고 있으며, 이를 위해 완치되신 분들의 헌혈참여가 필요한 상황입니다.<br><br><br><br>이와 관련하여 코로나바이러스감염증으로부터 완치되신 국민들께서는 아래의 혈액모집 안내에 따라 적극적인 참여를 해 주시기를 당부드립니다.<br><br><br><br><br><br><혈액(혈장) 모집 안내><br><br><br><br>○ (대상자) 만 18세 이상 ~ 만 65세 미만(동의취득 시점), 완치 및 격리 해제 후 14일 이상 경과한 자<br><br><br><br>○ (참여시기) 2020년 6월 30일까지, 월요일~금요일(오전 9시 ~ 오후 6시)<br><br><br><br>○ (참여장소) 계명대 동산병원, 고대안산병원, 경북대병원, 대구파티마병원<br><br><br><br>○ (참여방법) 1차 방문 - 코로나19 검사, 코로나19 중화항체 검사, 타 감염성질환 검사(B/C 간염, HIV, 매독)<br><br>                     2차 방문 - 1차 검사 결과 확인 후 7일 이내 재방문하여 혈장성분헌혈(약 500ml) 실시<br><br><br><br>○ (참여문의) 콜센터 1522-6487, GC녹십자 031-260-1943<br><br><br><br>○ (참여혜택) 코로나19 중화항체 검사, 타 감염성질환 검사, 소정의 <br>','신종감염병매개체연구과 ','2020-06-01 00:00:00'),(2,'코로나19 유전자검출검사 긴급사용승인 제품 정보','코로나19 유전자검출검사 긴급사용승인 제품 정보를 붙임과 같이 공지합니다.<br><br><br><br>* 6월 5일 수정(2개 제품 추가)','감염병진단관리과 ','2020-06-05 00:00:00'),(3,'코로나바이러스감염증-19 시신에 대한 장사방법 및 절차 고시 제정(안) 공지','코로나바이러스감염증-19 시신에 대한 장사방법 및 절차 고시 제정(안) 공지합니다. (2020. 2. 24.(월))<br><br>첨부파일 참고하시기 바랍니다.','위기대응생물테러총괄과 ','2020-02-25 00:00:00'),(4,'\'코로나바이러스감염증-19 대응 실험실 생물안전 가이드 제2판\' 개정 안내','<br>주요 개정사항<br><br>- SARS-CoV-2 생물정보 추가<br>- 감염성물질 포장 예시 추가<br>- 생물안전 Q&A 추가','생물안전평가과 ','2020-03-04 00:00:00'),(5,'중동호흡기증후군 코로나바이러스(MERS-CoV) 생물안전정보','현재 중동호흡기증후군 코로나바이러스(MERS-CoV)로 인한 인체감염이 사우디아라비아를 중심으로 국제적으로 발생하고 있습니다. 국내 연구기관에서 이 바이러스를 반입하여 시험 및 연구 수행하고자 하는 경우, 바이러스의 취급 등에 대한 생물안전관리가 필요합니다.<br> <br>이에 따라 질병관리본부는 첨부와 같이「중동호흡기증후군 코로나바이러스(MERS-CoV)」에 대한 생물안전정보를 마련하여 제공하오니 관련 연구기관에서는 참고하시기 바랍니다.','생물안전평가과','2013-06-17 00:00:00'),(6,'국외 신종 코로나바이러스 발생에 따른 감시 강화','■ 최근 WHO(\'12.9.23)가 사우디아라비아, 카타르 지역을 여행한 2명의 환자에게서 ‘신종 코로나바이러스’ 감염을 확인하고 각국에 감시강화 를 권고함에 따라,<br><br>■ ‘신종 코로나바이러스 신고 방법 및 진단기준’을 붙임과 같이 공지하여 드리오니, 최근 발병 10일 이내에 감염 위험지역 방문력이 있는 의심환자 발견 즉시 관할지역 보건소에 신고하여 주시기 바랍니다.','감염병감시과 ','2012-09-27 00:00:00');
/*!40000 ALTER TABLE `notice_kcdc_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-12 14:34:58
