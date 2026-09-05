-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.42 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for ecommerce_db
CREATE DATABASE IF NOT EXISTS `ecommerce_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ecommerce_db`;

-- Dumping structure for table ecommerce_db.carts
CREATE TABLE IF NOT EXISTS `carts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `carts_user_id_unique` (`user_id`),
  CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table ecommerce_db.carts: ~0 rows (approximately)
INSERT INTO `carts` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
	(1, 2, '2026-08-28 09:42:12', '2026-08-28 09:42:12'),
	(2, 3, '2026-08-29 11:30:18', '2026-08-29 11:30:18'),
	(3, 5, '2026-09-04 10:08:57', '2026-09-04 10:08:57');

-- Dumping structure for table ecommerce_db.cart_items
CREATE TABLE IF NOT EXISTS `cart_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `quantity` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_items_cart_id_product_id_unique` (`cart_id`,`product_id`),
  KEY `cart_items_product_id_foreign` (`product_id`),
  CONSTRAINT `cart_items_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table ecommerce_db.cart_items: ~0 rows (approximately)

-- Dumping structure for table ecommerce_db.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table ecommerce_db.categories: ~3 rows (approximately)
INSERT INTO `categories` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
	(1, 'Laptop', 'Laptop computers', '2026-08-28 09:35:49', '2026-08-28 09:35:49'),
	(2, 'Accessories', 'Computer accessories', '2026-09-03 08:37:31', '2026-09-03 08:37:31'),
	(4, 'Phone', 'Smart phone', '2026-09-04 20:34:54', '2026-09-04 20:34:54');

-- Dumping structure for table ecommerce_db.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table ecommerce_db.failed_jobs: ~0 rows (approximately)

-- Dumping structure for table ecommerce_db.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table ecommerce_db.migrations: ~11 rows (approximately)
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '2014_10_12_000000_create_users_table', 1),
	(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
	(3, '2019_08_19_000000_create_failed_jobs_table', 1),
	(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
	(5, '2026_08_18_045147_create_categories_table', 1),
	(6, '2026_08_18_045520_create_products_table', 1),
	(7, '2026_08_18_050412_create_carts_table', 1),
	(8, '2026_08_18_050639_create_cart_items_table', 1),
	(9, '2026_08_18_051307_create_orders_table', 1),
	(10, '2026_08_18_051759_create_order_items_table', 1),
	(11, '2026_08_18_162703_add_role_to_users_table', 1);

-- Dumping structure for table ecommerce_db.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','processing','shipped','delivered','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table ecommerce_db.orders: ~4 rows (approximately)
INSERT INTO `orders` (`id`, `user_id`, `total_amount`, `status`, `created_at`, `updated_at`) VALUES
	(1, 2, 2399.98, 'cancelled', '2026-08-28 09:43:01', '2026-08-29 11:22:29'),
	(2, 3, 5999.95, 'cancelled', '2026-08-29 11:31:29', '2026-09-02 00:17:43'),
	(3, 3, 1199.99, 'cancelled', '2026-09-01 22:16:17', '2026-09-02 00:17:24'),
	(4, 3, 2399.98, 'cancelled', '2026-09-01 22:22:56', '2026-09-02 00:01:27'),
	(5, 3, 2399.98, 'cancelled', '2026-09-01 23:30:33', '2026-09-02 00:18:50'),
	(6, 3, 1199.99, 'delivered', '2026-09-02 23:58:18', '2026-09-03 23:44:41'),
	(7, 2, 40.00, 'delivered', '2026-09-03 23:07:45', '2026-09-03 23:44:21'),
	(8, 5, 24.00, 'delivered', '2026-09-04 10:09:18', '2026-09-04 20:51:18'),
	(9, 3, 24.00, 'cancelled', '2026-09-04 20:30:11', '2026-09-04 20:32:24');

-- Dumping structure for table ecommerce_db.order_items
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `quantity` int unsigned NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_product_id_foreign` (`product_id`),
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table ecommerce_db.order_items: ~4 rows (approximately)
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `created_at`, `updated_at`) VALUES
	(1, 1, 1, 2, 1199.99, '2026-08-28 09:43:01', '2026-08-28 09:43:01'),
	(2, 2, 1, 5, 1199.99, '2026-08-29 11:31:29', '2026-08-29 11:31:29'),
	(3, 3, 1, 1, 1199.99, '2026-09-01 22:16:17', '2026-09-01 22:16:17'),
	(4, 4, 1, 2, 1199.99, '2026-09-01 22:22:56', '2026-09-01 22:22:56'),
	(5, 5, 1, 2, 1199.99, '2026-09-01 23:30:33', '2026-09-01 23:30:33'),
	(6, 6, 1, 1, 1199.99, '2026-09-02 23:58:18', '2026-09-02 23:58:18'),
	(7, 7, 6, 5, 8.00, '2026-09-03 23:07:45', '2026-09-03 23:07:45'),
	(8, 8, 6, 3, 8.00, '2026-09-04 10:09:18', '2026-09-04 10:09:18'),
	(9, 9, 6, 3, 8.00, '2026-09-04 20:30:11', '2026-09-04 20:30:11');

-- Dumping structure for table ecommerce_db.password_reset_tokens
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table ecommerce_db.password_reset_tokens: ~0 rows (approximately)

-- Dumping structure for table ecommerce_db.personal_access_tokens
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table ecommerce_db.personal_access_tokens: ~32 rows (approximately)
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
	(1, 'App\\Models\\User', 2, 'auth-token', 'afaf553ed9be92dd6a1d2474566b942420d6591ec5c091d2ead4ad2441e80b16', '["*"]', NULL, NULL, '2026-08-28 09:33:07', '2026-08-28 09:33:07'),
	(2, 'App\\Models\\User', 1, 'auth-token', 'deb8df2c020b76fbb02cb59f54db009b62ea8370f8d4ce9a8dc48f007eb3136a', '["*"]', '2026-08-28 09:38:48', NULL, '2026-08-28 09:34:21', '2026-08-28 09:38:48'),
	(3, 'App\\Models\\User', 2, 'auth-token', 'c48aee3ad5e0e37c177d911f2306efdf0565bd87194ded9dfa14b6433ca5d928', '["*"]', '2026-08-28 21:29:44', NULL, '2026-08-28 09:41:01', '2026-08-28 21:29:44'),
	(4, 'App\\Models\\User', 3, 'auth-token', '981a3b433625f150c0f06a69060ab8f754e31fed3f7b81fb852e50ec4681ff83', '["*"]', NULL, NULL, '2026-08-28 21:39:23', '2026-08-28 21:39:23'),
	(5, 'App\\Models\\User', 3, 'auth-token', '1870174ef1a98d51afeef7194e5c41467b6baf0e04236e8e606389357f2a8c04', '["*"]', '2026-08-28 21:41:40', NULL, '2026-08-28 21:40:59', '2026-08-28 21:41:40'),
	(6, 'App\\Models\\User', 1, 'auth-token', 'cccac425ed8ca65dcb57fbe19e20a63998dc93d438aec050da9a0ab2a0485e92', '["*"]', '2026-08-28 22:12:33', NULL, '2026-08-28 21:54:20', '2026-08-28 22:12:33'),
	(7, 'App\\Models\\User', 2, 'auth-token', 'eeada62f37d229fb9bcb8adbd326f4b89b226b7f2f8a159f0891351f4bd412bc', '["*"]', '2026-08-29 10:31:26', NULL, '2026-08-28 22:13:21', '2026-08-29 10:31:26'),
	(8, 'App\\Models\\User', 1, 'auth-token', '05c2ea430699f61ebde4623688e3aa3e06670251fda2ccaf88673195170e3b9d', '["*"]', '2026-08-29 11:19:39', NULL, '2026-08-29 10:31:51', '2026-08-29 11:19:39'),
	(9, 'App\\Models\\User', 2, 'auth-token', '2c8e61133e965a504f6f7ae753649c49f35be359f8c02cd5c225e6bb7f967c3a', '["*"]', '2026-08-29 11:25:25', NULL, '2026-08-29 11:20:26', '2026-08-29 11:25:25'),
	(10, 'App\\Models\\User', 3, 'auth-token', '29c8b156ff2875606416eee7740bbe0b185f91c24aecd7e2b634fbabd230f903', '["*"]', '2026-08-29 11:33:18', NULL, '2026-08-29 11:28:50', '2026-08-29 11:33:18'),
	(11, 'App\\Models\\User', 1, 'auth-token', 'f816c51751def68a1587bc7214b9ef6e50d4e1d19e77bda2ad03d4e9114156f4', '["*"]', '2026-08-29 11:36:51', NULL, '2026-08-29 11:35:44', '2026-08-29 11:36:51'),
	(12, 'App\\Models\\User', 3, 'auth-token', '96f383c959892b3a39896f8ef5670ce10e75a1386abe709f1b1351e8f937f0ae', '["*"]', '2026-08-29 20:01:27', NULL, '2026-08-29 11:37:20', '2026-08-29 20:01:27'),
	(13, 'App\\Models\\User', 1, 'auth-token', 'a8252b8d84ced90f89e1fa34e42820d6e5ae37d88695195e26414480b2c080e8', '["*"]', '2026-08-29 20:26:13', NULL, '2026-08-29 20:24:21', '2026-08-29 20:26:13'),
	(14, 'App\\Models\\User', 2, 'auth-token', '36564b7bb1c92abaa03b945b62fff8bb454eb4ddcb03927d0a057f6392faec9a', '["*"]', '2026-08-29 20:30:40', NULL, '2026-08-29 20:29:58', '2026-08-29 20:30:40'),
	(15, 'App\\Models\\User', 1, 'auth-token', 'f75d2cfe463ef9f6a18cf30f247cf5eccecf67eb3fad1c6ed3b98153b1ff4543', '["*"]', '2026-08-29 21:05:57', NULL, '2026-08-29 20:54:04', '2026-08-29 21:05:57'),
	(16, 'App\\Models\\User', 3, 'auth-token', '717909145f395460b09b2106717ddac0d4187a64b0718f7661b9c5730c8ba61c', '["*"]', '2026-08-29 21:38:07', NULL, '2026-08-29 21:07:02', '2026-08-29 21:38:07'),
	(17, 'App\\Models\\User', 1, 'auth-token', '7ce18f314309d478bca64de8b52901005d3aef016010ac70f2b453beaaaca6cd', '["*"]', '2026-08-29 21:39:15', NULL, '2026-08-29 21:38:38', '2026-08-29 21:39:15'),
	(18, 'App\\Models\\User', 2, 'auth-token', '8b427ae5b2022d5b102cc9afcabd92e5b3cdc7b09b017f24b140d1a03ef2db3d', '["*"]', '2026-08-30 22:59:54', NULL, '2026-08-29 21:41:12', '2026-08-30 22:59:54'),
	(19, 'App\\Models\\User', 4, 'auth-token', '018569616bd35e21d22db2788bbe5a5c44aae1a26024863471978c53c9648c05', '["*"]', NULL, NULL, '2026-09-01 00:33:15', '2026-09-01 00:33:15'),
	(20, 'App\\Models\\User', 4, 'auth-token', '13cc902f919a581d1e257484ec9df7f6223321eaa9117cbaa17c28373353b3e6', '["*"]', NULL, NULL, '2026-09-01 00:34:44', '2026-09-01 00:34:44'),
	(21, 'App\\Models\\User', 2, 'auth-token', 'd1a02fcb6fd4e7b9ed99502151de2e284de699e326e64d1937d53510088f6343', '["*"]', NULL, NULL, '2026-09-01 00:48:08', '2026-09-01 00:48:08'),
	(22, 'App\\Models\\User', 2, 'auth-token', 'b3fb1879b81ef89a58ae9685359e6ba2976a9015d0907223871d813985e6a70c', '["*"]', NULL, NULL, '2026-09-01 00:48:09', '2026-09-01 00:48:09'),
	(23, 'App\\Models\\User', 2, 'auth-token', 'dda1a5e69d9cbfbc5e26df61ace3d36da3db871389971ef0a1977bf6238125f0', '["*"]', NULL, NULL, '2026-09-01 00:48:09', '2026-09-01 00:48:09'),
	(24, 'App\\Models\\User', 1, 'auth-token', '79c3af5222796ad81381ddda8d8d66cee4d94493abc328253e9ad940c7136e9f', '["*"]', NULL, NULL, '2026-09-01 00:53:14', '2026-09-01 00:53:14'),
	(25, 'App\\Models\\User', 2, 'auth-token', '92e0f8199d543dbe0409a89fda355e69b5aab6e4c752628a5887af1292534f27', '["*"]', NULL, NULL, '2026-09-01 00:59:26', '2026-09-01 00:59:26'),
	(26, 'App\\Models\\User', 1, 'auth-token', '4b17d709274e09fc2841267f83f966b411fd9bc325fc9c3a9643f2d37fd838d3', '["*"]', NULL, NULL, '2026-09-01 01:03:22', '2026-09-01 01:03:22'),
	(27, 'App\\Models\\User', 3, 'auth-token', '2ce5e667b6fe423e5de3f0758855f3347be4969ff01ff3ebaf4c160df26db08a', '["*"]', NULL, NULL, '2026-09-01 01:09:38', '2026-09-01 01:09:38'),
	(28, 'App\\Models\\User', 2, 'auth-token', '6f66c03d716c451014f45a013130c83809d6d6a726129f54078d367922cf9687', '["*"]', NULL, NULL, '2026-09-01 01:20:48', '2026-09-01 01:20:48'),
	(29, 'App\\Models\\User', 1, 'auth-token', '973393f0a50086091a5c32c789e5d8b8e360a2f84890762eab289e62baa8911e', '["*"]', NULL, NULL, '2026-09-01 01:27:22', '2026-09-01 01:27:22'),
	(34, 'App\\Models\\User', 1, 'auth-token', '22b058cc8dada6562528641fefa1a8b95e2ffeec269a6e1d535f14ec558f3702', '["*"]', '2026-09-01 21:57:55', NULL, '2026-09-01 10:06:26', '2026-09-01 21:57:55'),
	(35, 'App\\Models\\User', 2, 'auth-token', '1ab47ab5e360c9bd06c5a305ada3b9dc7bd6056eaaf4858ad20f8fc1a0768169', '["*"]', '2026-09-01 22:02:30', NULL, '2026-09-01 21:58:44', '2026-09-01 22:02:30'),
	(36, 'App\\Models\\User', 3, 'auth-token', '32c9d2d11f1694f696fee27b57f6e1425772afcfe39aef68d27b921365086fd7', '["*"]', '2026-09-02 09:53:37', NULL, '2026-09-01 22:03:03', '2026-09-02 09:53:37'),
	(39, 'App\\Models\\User', 1, 'auth-token', 'b61c0bf0535bd2f553da3d1345d609869561db10e41cf944808a600d2833cc91', '["*"]', '2026-09-04 03:33:23', NULL, '2026-09-02 09:54:07', '2026-09-04 03:33:23'),
	(53, 'App\\Models\\User', 1, 'auth-token', '16558a8abb6ed05725937a5305befb8412f398d7914faacf9c527ea2bff8897a', '["*"]', '2026-09-03 23:33:50', NULL, '2026-09-03 23:11:55', '2026-09-03 23:33:50'),
	(55, 'App\\Models\\User', 1, 'auth-token', '111a452a09def41afe0dc715e3ed56bb203727da9fdf670c7cac49450df5aff5', '["*"]', '2026-09-04 03:11:22', NULL, '2026-09-03 23:43:18', '2026-09-04 03:11:22'),
	(56, 'App\\Models\\User', 3, 'auth-token', 'e29cba2e053d09b4a37ebfca9bb91e1faa008dc204dad6cb3de5e921d0641a0b', '["*"]', '2026-09-04 03:57:50', NULL, '2026-09-04 03:36:35', '2026-09-04 03:57:50'),
	(57, 'App\\Models\\User', 3, 'auth-token', '2f73a004666488a495634b3ff916707594f3dc3327912eb3b5dfa15171c521d4', '["*"]', '2026-09-04 10:03:53', NULL, '2026-09-04 04:12:17', '2026-09-04 10:03:53'),
	(58, 'App\\Models\\User', 1, 'auth-token', '5b0381eb34d6978abe54f40ad244b68c43c7f21a3c51e159a47782f8112d3f1e', '["*"]', '2026-09-04 10:04:25', NULL, '2026-09-04 10:04:24', '2026-09-04 10:04:25'),
	(59, 'App\\Models\\User', 5, 'auth-token', '26f1bb7904c5c980a2ebfd2f9278f614eefc6b39077b389ff2145bd70574ecd5', '["*"]', NULL, NULL, '2026-09-04 10:07:23', '2026-09-04 10:07:23'),
	(60, 'App\\Models\\User', 5, 'auth-token', '015a2756488ad991c2ad76099573746d83639cc68c1e9fa488c0408589cc4269', '["*"]', '2026-09-04 20:26:41', NULL, '2026-09-04 10:07:40', '2026-09-04 20:26:41'),
	(61, 'App\\Models\\User', 1, 'auth-token', 'fc2cc4f34c607b18272aa96757b5da6f4d747f9ca7b478028242423b2847be97', '["*"]', '2026-09-04 20:28:18', NULL, '2026-09-04 20:27:03', '2026-09-04 20:28:18'),
	(62, 'App\\Models\\User', 3, 'auth-token', 'd41780012d799f7f6bf120d505cebfff0aed78ad21d2876547079014554c07c3', '["*"]', '2026-09-04 20:30:14', NULL, '2026-09-04 20:29:41', '2026-09-04 20:30:14'),
	(63, 'App\\Models\\User', 1, 'auth-token', 'd98a60725d75e6ba0dc6ec6c12adb7bd8553aa0c2429c8bf6fbe6b3f887fdf0f', '["*"]', '2026-09-04 20:31:47', NULL, '2026-09-04 20:31:05', '2026-09-04 20:31:47'),
	(64, 'App\\Models\\User', 3, 'auth-token', '234c8d17667c5af7426964b3912ca39430ba769788ac49db7702ac48869b0680', '["*"]', '2026-09-04 20:32:28', NULL, '2026-09-04 20:32:11', '2026-09-04 20:32:28'),
	(65, 'App\\Models\\User', 1, 'auth-token', '1888a6c2ce66c324b6fa7cb629158a3bd5e21a4fa051f4591f21e7d181ce6df0', '["*"]', '2026-09-04 20:53:45', NULL, '2026-09-04 20:34:12', '2026-09-04 20:53:45'),
	(66, 'App\\Models\\User', 3, 'auth-token', 'faa1f3f64ee8c735f62994b598587ed277c9af6765c076eb5f3da205ee1d3736', '["*"]', '2026-09-04 21:04:28', NULL, '2026-09-04 20:54:04', '2026-09-04 21:04:28');

-- Dumping structure for table ecommerce_db.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint unsigned NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL,
  `stock` int unsigned NOT NULL DEFAULT '0',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table ecommerce_db.products: ~5 rows (approximately)
INSERT INTO `products` (`id`, `category_id`, `name`, `description`, `price`, `stock`, `image`, `created_at`, `updated_at`) VALUES
	(1, 1, 'MSI', 'Laptop gamming', 1199.99, 21, 'products/8eqQrBIxr2t5XyWfSVHJuNZ3VktTr6hQPzh05v8H.jpg', '2026-08-28 09:37:30', '2026-09-03 22:14:11'),
	(2, 2, 'Apple Watch SE (2nd Gen)', 'Apple Watch SE (2nd Gen) [GPS 44mm] Smart Watch w/Silver Aluminum Case & White Sport Band - M/L. Fitness & Sleep Tracker, Crash Detection, Heart Rate Monitor, Retina Display, Water Resistant #applewatch “As an Amazon Associate, I earn from qualifying purchases.”', 289.00, 50, 'products/H3ukRCIXUc98sOddv3jWVYPxF5yPguRvt7PEGqs4.jpg', '2026-09-03 00:17:10', '2026-09-04 20:45:07'),
	(5, 2, 'Apple Airpods Pro', 'Apple AirPods Pro (2nd Generation) Wireless Earbuds, Up to 2X More Active Noise Cancelling, Adaptive Transparency, Personalized Spatial Audio, MagSafe Charging Case, Bluetooth Headphones for iPhone', 99.00, 70, 'products/RZHFI4CIcvqXnFbSLc3oLVL5Wkp07Xwqw5GUYsid.jpg', '2026-09-03 08:59:38', '2026-09-04 20:47:03'),
	(6, 1, 'Asus TUF15', 'ASUS - TUF 15.6" Gaming Laptop - Intel Core i7 with 16GB Memory - NVIDIA GeFo.', 799.00, 50, 'products/cIrhjaAA80v4cPmGjuYnKU8mslSKbo5s0bT8Ef6W.jpg', '2026-09-03 18:21:27', '2026-09-04 20:39:35'),
	(7, 4, 'iPhone 16 Plus', 'iPhone 16 Plus. Built for Apple Intelligence. ¹ Featuring Camera Control. 48MP Fusion camera. Five vibrant colors. And A18 chip. What’s in the Box iPhone 16 Plus USC-C Charge Cable Legal ¹ Apple Intelligence is available in beta on all iPhone 16 models, iPhone 15 Pro, and iPhone 15 Pro Max, with Siri and device language set to U.S. English, as an iOS 18 update. English (Australia, Canada, Ireland, New Zealand, South Africa, UK) language support available this December. Some features and support for additional languages, like Chinese, English (India, Singapore), French, German, Italian, Japanese, Korean, Portuguese, Spanish, Vietnamese, and others, will be coming over the course of the next year. ² Battery life varies by use and configuration. See apple.com/batteries for more information.', 1189.00, 10, 'products/obqayvFCXeLmAf7475AeBXKAMoMC4heFsAw65gZV.jpg', '2026-09-04 20:42:02', '2026-09-04 20:42:02');

-- Dumping structure for table ecommerce_db.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','customer') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'customer',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table ecommerce_db.users: ~0 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'Admin', 'admin@gmail.com', NULL, '$2y$12$BLRcRlQxMcSq50MiifguKe3lmLdZlkriIMGN6sxz0NssVWumOBRs2', 'admin', NULL, '2026-08-27 23:47:14', '2026-08-27 23:47:14'),
	(2, 'Customer', 'customer@gmail.com', NULL, '$2y$12$6XZWJsWFiZ4KuRBf8Wi/EOAh0iYrMGfWZfg5SLa.87K9ww.ylYQJi', 'customer', NULL, '2026-08-28 09:33:06', '2026-08-28 09:33:06'),
	(3, 'Sakada', 'sakada@gmail.com', NULL, '$2y$12$QSB0ZdayvjeqZj31Ut/jRumibIdso/.CuLOYA30iQmoedcp6zFIvi', 'customer', NULL, '2026-08-28 21:39:23', '2026-08-28 21:39:23'),
	(4, 'Dara', 'dara@gmail.com', NULL, '$2y$12$VnPCKVc3qZGBzrqFuDAWce7wYm.4AHhmGarPzFhKlhoXINRTcNYem', 'customer', NULL, '2026-09-01 00:33:15', '2026-09-01 00:33:15'),
	(5, 'Sok Reaksa', 'sokreaksa@gmail.com', NULL, '$2y$12$fvi89r.p9BNbZ0ZpraSdTuTgpH7ipvvWHPxL6Z7jsCCsnRHROZF1W', 'customer', NULL, '2026-09-04 10:07:23', '2026-09-04 10:07:23');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
