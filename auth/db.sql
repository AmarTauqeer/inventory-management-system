CREATE DATABASE  IF NOT EXISTS `inventory_management_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `inventory_management_system`;
-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: inventory_management_system
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add permission',1,'add_permission'),(2,'Can change permission',1,'change_permission'),(3,'Can delete permission',1,'delete_permission'),(4,'Can view permission',1,'view_permission'),(5,'Can add group',2,'add_group'),(6,'Can change group',2,'change_group'),(7,'Can delete group',2,'delete_group'),(8,'Can view group',2,'view_group'),(9,'Can add content type',3,'add_contenttype'),(10,'Can change content type',3,'change_contenttype'),(11,'Can delete content type',3,'delete_contenttype'),(12,'Can view content type',3,'view_contenttype'),(13,'Can add session',4,'add_session'),(14,'Can change session',4,'change_session'),(15,'Can delete session',4,'delete_session'),(16,'Can view session',4,'view_session'),(17,'Can add user',5,'add_user'),(18,'Can change user',5,'change_user'),(19,'Can delete user',5,'delete_user'),(20,'Can view user',5,'view_user'),(21,'Can add category',6,'add_category'),(22,'Can change category',6,'change_category'),(23,'Can delete category',6,'delete_category'),(24,'Can view category',6,'view_category'),(25,'Can add product',7,'add_product'),(26,'Can change product',7,'change_product'),(27,'Can delete product',7,'delete_product'),(28,'Can view product',7,'view_product'),(29,'Can add log entry',8,'add_logentry'),(30,'Can change log entry',8,'change_logentry'),(31,'Can delete log entry',8,'delete_logentry'),(32,'Can view log entry',8,'view_logentry'),(33,'Can add supplier',9,'add_supplier'),(34,'Can change supplier',9,'change_supplier'),(35,'Can delete supplier',9,'delete_supplier'),(36,'Can view supplier',9,'view_supplier'),(37,'Can add customer',10,'add_customer'),(38,'Can change customer',10,'change_customer'),(39,'Can delete customer',10,'delete_customer'),(40,'Can view customer',10,'view_customer'),(41,'Can add sale master',11,'add_salemaster'),(42,'Can change sale master',11,'change_salemaster'),(43,'Can delete sale master',11,'delete_salemaster'),(44,'Can view sale master',11,'view_salemaster'),(45,'Can add sale detail',12,'add_saledetail'),(46,'Can change sale detail',12,'change_saledetail'),(47,'Can delete sale detail',12,'delete_saledetail'),(48,'Can view sale detail',12,'view_saledetail'),(49,'Can add purchase master',13,'add_purchasemaster'),(50,'Can change purchase master',13,'change_purchasemaster'),(51,'Can delete purchase master',13,'delete_purchasemaster'),(52,'Can view purchase master',13,'view_purchasemaster'),(53,'Can add purchase detail',14,'add_purchasedetail'),(54,'Can change purchase detail',14,'change_purchasedetail'),(55,'Can delete purchase detail',14,'delete_purchasedetail'),(56,'Can view purchase detail',14,'view_purchasedetail');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Mobile','Mobile category','2024-03-01 15:24:42.956000'),(2,'Laptop','Laptop category','2024-01-02 15:24:42.956000');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(16) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `country` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Villy','villy@hotmail.com','+920987666778','Gujar khan','Pakistan','Gujar Khan','2024-01-03 17:27:43.065000'),(2,'Tom','tom@gmail.com','+9209765545444','Islamabad','Pakistan','Islamabad','2024-01-03 17:27:43.065000');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2023-12-30 18:59:16.067051','5','asdad',1,'[{\"added\": {}}]',7,1),(2,'2024-01-06 11:26:41.013962','2','amar.tauqeer@hotmail.com',2,'[{\"changed\": {\"fields\": [\"First name\"]}}]',5,1),(3,'2024-01-06 11:27:14.714966','1','amar.tauqeer@gmail.com',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Name\", \"Email\"]}}]',5,1),(4,'2024-01-06 12:46:56.293949','3','amar.tauqeer@hotmail.com',2,'[{\"changed\": {\"fields\": [\"First name\"]}}]',5,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (8,'admin','logentry'),(2,'auth','group'),(1,'auth','permission'),(6,'category','category'),(3,'contenttypes','contenttype'),(10,'customer','customer'),(7,'product','product'),(14,'purchase','purchasedetail'),(13,'purchase','purchasemaster'),(12,'sale','saledetail'),(11,'sale','salemaster'),(4,'sessions','session'),(9,'supplier','supplier'),(5,'users','user');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2023-12-28 17:11:03.619823'),(2,'contenttypes','0002_remove_content_type_name','2023-12-28 17:11:03.690692'),(3,'auth','0001_initial','2023-12-28 17:11:03.938186'),(4,'auth','0002_alter_permission_name_max_length','2023-12-28 17:11:04.009357'),(5,'auth','0003_alter_user_email_max_length','2023-12-28 17:11:04.017586'),(6,'auth','0004_alter_user_username_opts','2023-12-28 17:11:04.024982'),(7,'auth','0005_alter_user_last_login_null','2023-12-28 17:11:04.034656'),(8,'auth','0006_require_contenttypes_0002','2023-12-28 17:11:04.040478'),(9,'auth','0007_alter_validators_add_error_messages','2023-12-28 17:11:04.050569'),(10,'auth','0008_alter_user_username_max_length','2023-12-28 17:11:04.059458'),(11,'auth','0009_alter_user_last_name_max_length','2023-12-28 17:11:04.068088'),(12,'auth','0010_alter_group_name_max_length','2023-12-28 17:11:04.087924'),(13,'auth','0011_update_proxy_permissions','2023-12-28 17:11:04.097489'),(14,'auth','0012_alter_user_first_name_max_length','2023-12-28 17:11:04.105922'),(15,'sessions','0001_initial','2023-12-28 17:11:04.169872'),(18,'users','0001_initial','2023-12-28 17:13:26.806695'),(19,'admin','0001_initial','2023-12-28 17:20:43.246321'),(20,'admin','0002_logentry_remove_auto_add','2023-12-28 17:20:43.255508'),(21,'admin','0003_logentry_add_action_flag_choices','2023-12-28 17:20:43.258854'),(106,'category','0001_initial','2024-01-02 15:23:21.302030'),(107,'customer','0001_initial','2024-01-02 15:23:21.326474'),(108,'product','0001_initial','2024-01-02 15:23:21.410925'),(109,'supplier','0001_initial','2024-01-02 15:23:21.433223'),(110,'purchase','0001_initial','2024-01-02 15:23:21.633008'),(111,'sale','0001_initial','2024-01-02 15:23:21.832978'),(112,'category','0002_alter_category_created_at','2024-01-04 10:17:46.057047'),(113,'customer','0002_alter_customer_created_at','2024-01-04 10:17:46.078226'),(114,'product','0002_alter_product_created_at','2024-01-04 10:17:46.089580'),(115,'purchase','0002_alter_purchasemaster_created_at','2024-01-04 10:17:46.097576'),(116,'sale','0002_alter_salemaster_created_at_alter_saledetail_table_and_more','2024-01-04 10:17:46.235816'),(117,'supplier','0002_alter_supplier_created_at','2024-01-04 10:17:46.241226'),(118,'category','0003_alter_category_created_at','2024-01-04 10:20:21.224131'),(119,'customer','0003_alter_customer_created_at','2024-01-04 10:20:21.231145'),(120,'product','0003_alter_product_created_at','2024-01-04 10:20:21.236407'),(121,'purchase','0003_alter_purchasemaster_created_at','2024-01-04 10:20:21.242769'),(122,'sale','0003_rename_supplier_salemaster_customer_and_more','2024-01-04 10:20:21.413350'),(123,'supplier','0003_alter_supplier_created_at','2024-01-04 10:20:21.418081'),(124,'category','0004_alter_category_created_at','2024-01-04 10:21:46.537690'),(125,'customer','0004_alter_customer_created_at','2024-01-04 10:21:46.542457'),(126,'product','0004_alter_product_created_at','2024-01-04 10:21:46.547085'),(127,'purchase','0004_alter_purchasemaster_created_at','2024-01-04 10:21:46.552211'),(128,'sale','0004_rename_purchase_amount_salemaster_sale_amount_and_more','2024-01-04 10:21:46.579347'),(129,'supplier','0004_alter_supplier_created_at','2024-01-04 10:21:46.584519'),(130,'category','0005_alter_category_created_at','2024-01-06 11:34:57.665221'),(131,'customer','0005_alter_customer_created_at','2024-01-06 11:34:57.677955'),(132,'product','0005_alter_product_created_at_alter_product_description','2024-01-06 11:34:57.880705'),(133,'purchase','0005_alter_purchasemaster_created_at','2024-01-06 11:34:57.887889'),(134,'sale','0005_alter_salemaster_created_at','2024-01-06 11:34:57.892874'),(135,'supplier','0005_alter_supplier_created_at','2024-01-06 11:34:57.897155');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('6hdcubbwz26mzn49abkuljfmudkt3sq1','.eJxVjDsOwjAQRO_iGlle40-Wkp4zWF6vjQPIkeKkQtydREoBzRTz3sxbhLguNaw9z2FkcREgTr8dxfTMbQf8iO0-yTS1ZR5J7oo8aJe3ifPrerh_BzX2uq0NGc2oANEncooVGSSri7cDZF-QQEddKDKAyybbxA6tw8GdAbYE8fkC06M3Ig:1rJfVN:o1nXRHGOmKVkp6YuiOXbTESB5wapK-yunROQZuYp9JY','2024-01-13 20:00:21.021882'),('phs2jbi5blpnk7o1ihha53v2uky50ba0','.eJxVjDsOwjAQRO_iGlle40-Wkp4zWF6vjQPIkeKkQtydREoBzRTz3sxbhLguNaw9z2FkcREgTr8dxfTMbQf8iO0-yTS1ZR5J7oo8aJe3ifPrerh_BzX2uq0NGc2oANEncooVGSSri7cDZF-QQEddKDKAyybbxA6tw8GdAbYE8fkC06M3Ig:1rJgfU:h38WAVzfWSr_exZOamUB8A4mo35NLvjx8dv43DJw-7w','2024-01-13 21:14:52.751653'),('wl4vyb0d32ckd65yf08lhq6lucji0p61','.eJxVjDsOwjAQRO_iGlle40-Wkp4zWF6vjQPIkeKkQtydREoBzRTz3sxbhLguNaw9z2FkcREgTr8dxfTMbQf8iO0-yTS1ZR5J7oo8aJe3ifPrerh_BzX2uq0NGc2oANEncooVGSSri7cDZF-QQEddKDKAyybbxA6tw8GdAbYE8fkC06M3Ig:1rJeI5:doBiN1T8Ls2UpL981PshcovUjXsOkXF8noq7esfxKiE','2024-01-13 18:42:33.541738');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` longtext,
  `purchase_rate` decimal(12,2) DEFAULT NULL,
  `sale_rate` decimal(12,2) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_category_id_640030a0_fk_category_id` (`category_id`),
  CONSTRAINT `product_category_id_640030a0_fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Glaxy 3','The Samsung Galaxy S III (unofficially known as the Samsung Galaxy S3) is an Android smartphone designed, developed, and marketed by Samsung Electronics. Launched in 2012, it had sold more than 80 million units overall, making it the most sold phone in the S series.[5] It is the third smartphone in the Samsung Galaxy S series.',700.00,800.00,'images/galaxy3.jpeg','2024-01-02 15:25:18.264000',1),(2,'Lenovo IdeaPad Pro 5 14','IdeaPad Pro 5 14 (R7-Windows 11 Home-16GB-512GB)',1200.00,1300.00,'images/lenovo.webp','2024-01-02 15:25:18.264000',2),(3,'Iphone 12','Apple iPhone 12 is the bigger version of the regular iPhone 12 mini. The handset\'s hardware include a 6.1-inch OLED display, 5nm Apple A14 Bionic processor, and a dual-camera setup with a large sensor. 5G and Face ID are on board, too. The Apple iPhone 12 starting price is $829.',1200.00,1300.00,'images/iphone12.webp','2024-01-02 17:57:19.803000',1),(5,'ThinkBook 14s Yoga','The flexible, powerful 14\" 2-in-1 ThinkBook 14s Yoga notebook is perfect for small businesses. It\'s thin, light, powerful and easy to use with four different usage modes: Notebook, Tablet, Stand or Tent. Additionally, it offers smart options like modern standby and apps that open automatically when you pull out the built-in pen in a specific mode.',1302.00,1552.00,'images/thinkpad-14_4Km7T08.jpeg','2024-01-06 15:40:11.866000',2);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_detail`
--

DROP TABLE IF EXISTS `purchase_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `qty` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `amount_per_product` decimal(10,2) NOT NULL,
  `product_id` bigint NOT NULL,
  `purchase_id_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `purchase_detail_product_id_8999c7bd_fk_product_id` (`product_id`),
  KEY `purchase_detail_purchase_id_id_9147324f_fk_purchase_master_id` (`purchase_id_id`),
  CONSTRAINT `purchase_detail_product_id_8999c7bd_fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `purchase_detail_purchase_id_id_9147324f_fk_purchase_master_id` FOREIGN KEY (`purchase_id_id`) REFERENCES `purchase_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_detail`
--

LOCK TABLES `purchase_detail` WRITE;
/*!40000 ALTER TABLE `purchase_detail` DISABLE KEYS */;
INSERT INTO `purchase_detail` VALUES (2,1,1200.00,1200.00,2,2),(28,2,300.00,600.00,1,1),(29,4,500.00,2000.00,2,1),(34,2,800.00,1600.00,1,3),(35,1,100.00,100.00,2,3),(39,2,900.00,1800.00,1,7),(40,3,1200.00,3600.00,2,7),(41,10,900.00,9000.00,3,7),(42,2,700.00,1400.00,1,8),(43,3,1200.00,3600.00,2,8),(47,7,1302.00,9114.00,5,10),(48,10,1302.00,13020.00,5,11),(50,6,700.00,4200.00,1,12);
/*!40000 ALTER TABLE `purchase_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_master`
--

DROP TABLE IF EXISTS `purchase_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_master` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `purchase_amount` decimal(10,2) NOT NULL,
  `supplier_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `purchase_master_supplier_id_af769045_fk_supplier_id` (`supplier_id`),
  CONSTRAINT `purchase_master_supplier_id_af769045_fk_supplier_id` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_master`
--

LOCK TABLES `purchase_master` WRITE;
/*!40000 ALTER TABLE `purchase_master` DISABLE KEYS */;
INSERT INTO `purchase_master` VALUES (1,'2024-01-03 16:34:31.931000',2600.00,1),(2,'2024-01-02 15:27:31.861000',1200.00,2),(3,'2024-01-03 17:26:42.395000',1700.00,3),(7,'2024-01-04 15:38:59.393000',14400.00,4),(8,'2024-02-21 11:10:13.317000',5000.00,2),(10,'2024-03-02 15:44:21.450000',9114.00,6),(11,'2024-01-06 15:51:28.593000',13020.00,2),(12,'2024-04-12 15:16:40.718000',4200.00,1);
/*!40000 ALTER TABLE `purchase_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_detail`
--

DROP TABLE IF EXISTS `sale_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `qty` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `amount_per_product` decimal(10,2) NOT NULL,
  `product_id` bigint NOT NULL,
  `sale_id_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sale_saledetail_product_id_2fc6d26f_fk_product_id` (`product_id`),
  KEY `sale_saledetail_sale_id_id_9070fa02_fk_sale_salemaster_id` (`sale_id_id`),
  CONSTRAINT `sale_saledetail_product_id_2fc6d26f_fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `sale_saledetail_sale_id_id_9070fa02_fk_sale_salemaster_id` FOREIGN KEY (`sale_id_id`) REFERENCES `sale_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_detail`
--

LOCK TABLES `sale_detail` WRITE;
/*!40000 ALTER TABLE `sale_detail` DISABLE KEYS */;
INSERT INTO `sale_detail` VALUES (4,1,800.00,800.00,1,1),(5,1,1100.00,1100.00,3,1),(7,1,1200.00,1200.00,2,2),(8,2,1300.00,2600.00,2,4),(10,5,1552.00,7760.00,5,6),(12,2,1300.00,2600.00,3,7);
/*!40000 ALTER TABLE `sale_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_master`
--

DROP TABLE IF EXISTS `sale_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_master` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `sale_amount` decimal(10,2) NOT NULL,
  `customer_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sale_master_customer_id_e602f1ab_fk_customer_id` (`customer_id`),
  CONSTRAINT `sale_master_customer_id_e602f1ab_fk_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_master`
--

LOCK TABLES `sale_master` WRITE;
/*!40000 ALTER TABLE `sale_master` DISABLE KEYS */;
INSERT INTO `sale_master` VALUES (1,'2024-01-04 15:34:30.714000',1900.00,1),(2,'2024-01-05 11:02:41.124000',1200.00,2),(4,'2024-02-10 11:07:30.050000',2600.00,2),(6,'2024-03-01 15:46:23.544000',7760.00,1),(7,'2024-04-07 15:17:39.983000',2600.00,2);
/*!40000 ALTER TABLE `sale_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `sale_purchase_master_data_view`
--

DROP TABLE IF EXISTS `sale_purchase_master_data_view`;
/*!50001 DROP VIEW IF EXISTS `sale_purchase_master_data_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `sale_purchase_master_data_view` AS SELECT 
 1 AS `id`,
 1 AS `date`,
 1 AS `amount`,
 1 AS `name`,
 1 AS `type`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `sale_purchase_view`
--

DROP TABLE IF EXISTS `sale_purchase_view`;
/*!50001 DROP VIEW IF EXISTS `sale_purchase_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `sale_purchase_view` AS SELECT 
 1 AS `id`,
 1 AS `date`,
 1 AS `amount`,
 1 AS `name`,
 1 AS `product_name`,
 1 AS `qty`,
 1 AS `price`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!50001 DROP VIEW IF EXISTS `stock`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `stock` AS SELECT 
 1 AS `product_id`,
 1 AS `product_name`,
 1 AS `sale_id`,
 1 AS `purchase_id`,
 1 AS `sale_qty`,
 1 AS `purchase_qty`,
 1 AS `sale_price`,
 1 AS `purchase_price`,
 1 AS `sale_amount`,
 1 AS `purchase_amount`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(16) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'Amar Tauqeer','Technikerstrasse 7/008','amar.tauqeer@gmail.com','+4368864040449','Austria','Innsbruck','2024-01-02 15:26:39.514000'),(2,'Muhammad Awais','Gujranwala','awais@hotmail.com','+4368864133065','Pakistan','Wazirabad','2024-01-02 15:26:39.514000'),(3,'CompanyABC','wagrammer strasse 107','abc@gmail.com','+4368864133078','Austria','Vienna','2024-01-02 15:30:28.622000'),(4,'Scott','Leopold strasse 34','scott@gmail.com','+4368864133099','Austria','Vienna','2024-01-02 15:54:40.610000'),(6,'Rizwan','Wagrammer strasse 28','rizwan@hotmail.com','+43786756788','Austria','Vienna','2024-01-06 15:41:55.713000');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user`
--

DROP TABLE IF EXISTS `users_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user`
--

LOCK TABLES `users_user` WRITE;
/*!40000 ALTER TABLE `users_user` DISABLE KEYS */;
INSERT INTO `users_user` VALUES (1,'2023-12-30 21:14:52.000000',1,'amar','tauqeer',1,1,'2023-12-28 17:22:41.000000','amar','amar.tauqeer@gmail.com','pbkdf2_sha256$600000$whTDk8hRORUJqY8dt8wk1Q$sKWuBjQaEItuvFjMlyJfkRZA9QKlKlFHsETuJKPWKj8=','amar.tauqeer@gmail.com'),(4,NULL,0,'','',0,1,'2024-01-06 15:36:42.954206','tauqeer','amar.tauqeer@hotmail.com','pbkdf2_sha256$600000$vL4npZ6pU0xaCOxmk6LKdx$7XUKqG+BoiKTZtDdaF6Jqy4WRImDYH7piCJOUtxHd7c=','amar.tauqeer@hotmail.com');
/*!40000 ALTER TABLE `users_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user_groups`
--

DROP TABLE IF EXISTS `users_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_user_groups_user_id_group_id_b88eab82_uniq` (`user_id`,`group_id`),
  KEY `users_user_groups_group_id_9afc8d0e_fk_auth_group_id` (`group_id`),
  CONSTRAINT `users_user_groups_group_id_9afc8d0e_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `users_user_groups_user_id_5f6f5a90_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user_groups`
--

LOCK TABLES `users_user_groups` WRITE;
/*!40000 ALTER TABLE `users_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user_user_permissions`
--

DROP TABLE IF EXISTS `users_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_user_user_permissions_user_id_permission_id_43338c45_uniq` (`user_id`,`permission_id`),
  KEY `users_user_user_perm_permission_id_0b93982e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `users_user_user_perm_permission_id_0b93982e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `users_user_user_permissions_user_id_20aca447_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user_user_permissions`
--

LOCK TABLES `users_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `users_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `sale_purchase_master_data_view`
--

/*!50001 DROP VIEW IF EXISTS `sale_purchase_master_data_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `sale_purchase_master_data_view` AS select `sm`.`id` AS `id`,`sm`.`created_at` AS `date`,`sm`.`sale_amount` AS `amount`,`c`.`name` AS `name`,'sale' AS `type` from (`sale_master` `sm` join `customer` `c`) where (`sm`.`customer_id` = `c`.`id`) union select `pm`.`id` AS `id`,`pm`.`created_at` AS `date`,`pm`.`purchase_amount` AS `amount`,`s`.`name` AS `name`,'purchase' AS `type` from (`purchase_master` `pm` join `supplier` `s`) where (`pm`.`supplier_id` = `s`.`id`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `sale_purchase_view`
--

/*!50001 DROP VIEW IF EXISTS `sale_purchase_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `sale_purchase_view` AS select `sm`.`id` AS `id`,`sm`.`created_at` AS `date`,`sm`.`sale_amount` AS `amount`,`c`.`name` AS `name`,`p`.`name` AS `product_name`,`sd`.`qty` AS `qty`,`sd`.`price` AS `price` from (((`sale_master` `sm` join `customer` `c`) join `sale_detail` `sd`) join `product` `p`) where ((`sm`.`customer_id` = `c`.`id`) and (`sm`.`id` = `sd`.`sale_id_id`) and (`sd`.`product_id` = `p`.`id`)) union select `pm`.`id` AS `id`,`pm`.`created_at` AS `date`,`pm`.`purchase_amount` AS `amount`,`s`.`name` AS `name`,`p2`.`name` AS `product_name`,`pd`.`qty` AS `qty`,`pd`.`price` AS `price` from (((`purchase_master` `pm` join `purchase_detail` `pd`) join `supplier` `s`) join `product` `p2`) where ((`pm`.`supplier_id` = `s`.`id`) and (`pm`.`id` = `pd`.`purchase_id_id`) and (`pd`.`product_id` = `p2`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `stock`
--

/*!50001 DROP VIEW IF EXISTS `stock`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `stock` AS select distinct `p`.`id` AS `product_id`,`p`.`name` AS `product_name`,`sm`.`id` AS `sale_id`,0 AS `purchase_id`,`sd`.`qty` AS `sale_qty`,0 AS `purchase_qty`,`sd`.`price` AS `sale_price`,0 AS `purchase_price`,`sm`.`sale_amount` AS `sale_amount`,0 AS `purchase_amount` from ((`sale_master` `sm` join `sale_detail` `sd`) join `product` `p`) where ((`sm`.`id` = `sd`.`sale_id_id`) and (`sd`.`product_id` = `p`.`id`)) union select distinct `p`.`id` AS `product_id`,`p`.`name` AS `product_name`,0 AS `sale_id`,`pm`.`id` AS `purchase_id`,0 AS `sale_qty`,`pd`.`qty` AS `purchase_qty`,0 AS `sale_price`,`pd`.`price` AS `price`,0 AS `sale_amount`,`pm`.`purchase_amount` AS `purchase_amount` from ((`purchase_master` `pm` join `purchase_detail` `pd`) join `product` `p`) where ((`pm`.`id` = `pd`.`purchase_id_id`) and (`pd`.`product_id` = `p`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-06 17:54:48
