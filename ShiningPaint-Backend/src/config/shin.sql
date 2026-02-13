-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2026 at 10:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shin`
--

-- --------------------------------------------------------

--
-- Table structure for table `careers`
--

CREATE TABLE `careers` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT 'Addis Ababa',
  `type` enum('full-time','part-time','contract','internship') DEFAULT 'full-time',
  `description` text NOT NULL,
  `requirements` text DEFAULT NULL,
  `application_start_date` date DEFAULT NULL,
  `application_deadline` date DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `posted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `careers`
--

INSERT INTO `careers` (`id`, `title`, `department`, `location`, `type`, `description`, `requirements`, `application_start_date`, `application_deadline`, `is_active`, `posted_at`, `created_at`, `updated_at`) VALUES
(1, 'test', 'Engineering', 'Addis Ababa', 'part-time', 'terst a', 'sdhlasdkj.a', '2025-12-12', '2026-01-11', 0, '2025-12-12 14:12:14', '2025-12-12 14:12:14', '2026-01-31 20:04:05'),
(2, 'position 1', 'Sales', 'Remote', 'full-time', 'What is Lorem Ipsum?\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nWhy do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n\n', 'Why do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', '2025-12-11', '2025-12-27', 1, '2025-12-12 14:25:58', '2025-12-12 14:25:58', '2025-12-12 18:53:48'),
(4, 'Test Date Posting', 'Engineering', 'Test City', 'full-time', 'Testing date persistence', 'None', '2024-12-31', '2025-01-30', 0, '2025-12-12 18:57:35', '2025-12-12 18:57:35', '2026-01-31 20:03:58'),
(5, 'Human  ', 'General', 'Addis Ababa', 'full-time', 'readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', 'readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', NULL, NULL, 1, '2025-12-12 19:03:35', '2025-12-12 19:03:35', '2025-12-12 19:09:09'),
(6, 'API Test Job', 'Engineering', 'Test Lab', 'full-time', 'Testing API date handling', 'Node.js', NULL, NULL, 0, '2025-12-12 19:15:01', '2025-12-12 19:15:01', '2026-01-31 20:03:39'),
(7, 'Update Test Job (Updated)', 'Engineering', 'Addis Ababa', 'full-time', 'Updated description', '', NULL, NULL, 0, '2025-12-12 19:21:50', '2025-12-12 19:21:50', '2026-01-31 20:03:34'),
(8, 'Update Test Job (Updated)', 'Engineering', 'Addis Ababa', 'full-time', 'Updated description', '', NULL, NULL, 0, '2025-12-12 19:22:05', '2025-12-12 19:22:05', '2026-01-31 20:03:27'),
(9, 'Debug Update Job (Updated)', 'Engineering', 'Addis Ababa', 'full-time', 'Updated', '', '2025-12-12', '2025-12-17', 0, '2025-12-12 19:24:43', '2025-12-12 19:24:43', '2026-01-31 20:03:19'),
(10, 'job 1', 'General', 'Addis Ababa', 'full-time', 'sJHASKAJ', 'Dand,A', '2025-12-12', '2025-12-11', 0, '2025-12-12 19:52:30', '2025-12-12 19:52:30', '2026-01-31 20:03:11');

-- --------------------------------------------------------

--
-- Table structure for table `contact_submissions`
--

CREATE TABLE `contact_submissions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `inquiry_type` enum('general','technical','sales','support') DEFAULT 'general',
  `status` enum('new','in_progress','resolved','closed') DEFAULT 'new',
  `priority` enum('low','medium','high') DEFAULT 'medium',
  `assigned_to` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `resolved_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_submissions`
--

INSERT INTO `contact_submissions` (`id`, `name`, `email`, `company`, `phone`, `subject`, `message`, `inquiry_type`, `status`, `priority`, `assigned_to`, `notes`, `ip_address`, `user_agent`, `created_at`, `updated_at`, `resolved_at`) VALUES
(1, 'Bereket Tamrat', 'berekettamrat2015@gmail.com', 'personal', '0913566735', 'product', 'something to do having request', 'general', 'in_progress', 'medium', NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2025-12-12 09:28:13', '2025-12-12 09:28:46', NULL),
(2, 'test', 'admin@shiningpaint.com', 'personal', '092888282', 'quote', 'somethig about your product I wantd to know...', 'general', 'new', 'medium', NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2025-12-12 16:46:35', '2025-12-12 16:46:35', NULL),
(3, 'test', 'admin@shiningpaint.com', 'personal', '098776684', 'quote', 'Why do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', 'general', 'resolved', 'medium', NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2025-12-12 17:43:50', '2025-12-12 17:44:43', '2025-12-12 17:44:43');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `contact_person` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT 'USA',
  `customer_type` enum('retail','wholesale','contractor') DEFAULT 'retail',
  `credit_limit` decimal(12,2) DEFAULT 0.00,
  `payment_terms` varchar(50) DEFAULT 'net_30',
  `tax_id` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `company_name`, `contact_person`, `email`, `phone`, `address`, `city`, `state`, `postal_code`, `country`, `customer_type`, `credit_limit`, `payment_terms`, `tax_id`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'ABC Construction Co.', 'John Smith', 'john@abcconstruction.com', '+1-555-1001', '123 Main St', 'New York', 'NY', '10001', 'USA', 'contractor', 10000.00, 'net_30', NULL, 1, '2025-08-17 16:47:59', '2025-08-17 16:47:59'),
(2, 'Home Depot Store #1234', 'Sarah Johnson', 'sarah@homedepot.com', '+1-555-1002', '456 Oak Ave', 'Los Angeles', 'CA', '90001', 'USA', 'wholesale', 50000.00, 'net_30', NULL, 1, '2025-08-17 16:47:59', '2025-08-17 16:47:59'),
(3, NULL, 'Mike Wilson', 'mike.wilson@email.com', '+1-555-1003', '789 Pine St', 'Chicago', 'IL', '60601', 'USA', 'retail', 1000.00, 'net_30', NULL, 1, '2025-08-17 16:47:59', '2025-08-17 16:47:59');

-- --------------------------------------------------------

--
-- Table structure for table `hero_sections`
--

CREATE TABLE `hero_sections` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` text DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `cta_primary_text` varchar(100) DEFAULT NULL,
  `cta_primary_link` varchar(255) DEFAULT NULL,
  `cta_secondary_text` varchar(100) DEFAULT NULL,
  `cta_secondary_link` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hero_sections`
--

INSERT INTO `hero_sections` (`id`, `title`, `subtitle`, `images`, `cta_primary_text`, `cta_primary_link`, `cta_secondary_text`, `cta_secondary_link`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Verified Local Update', 'Testing backend controller logic via API', '[\"/test.jpg\"]', 'Test', '/', 'Test2', '/', 1, '2026-01-31 16:42:22', '2026-02-01 15:44:15');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_transactions`
--

CREATE TABLE `inventory_transactions` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `transaction_type` enum('in','out','adjustment') NOT NULL,
  `quantity` int(11) NOT NULL,
  `reference_type` enum('purchase','sale','adjustment','return') NOT NULL,
  `reference_id` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_transactions`
--

INSERT INTO `inventory_transactions` (`id`, `product_id`, `transaction_type`, `quantity`, `reference_type`, `reference_id`, `notes`, `user_id`, `created_at`) VALUES
(1, 156, 'in', 1, 'adjustment', NULL, 'Initial stock', 1, '2025-12-12 08:51:07');

-- --------------------------------------------------------

--
-- Table structure for table `job_applications`
--

CREATE TABLE `job_applications` (
  `id` int(11) NOT NULL,
  `career_id` int(11) DEFAULT NULL,
  `job_title` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `cover_letter` text DEFAULT NULL,
  `cv_path` varchar(255) DEFAULT NULL,
  `applied_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_applications`
--

INSERT INTO `job_applications` (`id`, `career_id`, `job_title`, `name`, `email`, `phone`, `cover_letter`, `cv_path`, `applied_at`) VALUES
(1, 5, 'Human  ', 'Bereket Tamrat', 'berekettamrat2015@gmail.com', '0913566735', 'berekettamrat2015@gmail.com', 'cv_6f544672-98ea-478a-9e11-11c7bb7aeed1.pdf', '2026-02-01 10:56:37');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `summary` text DEFAULT NULL,
  `content` text NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `category` varchar(100) DEFAULT 'general',
  `author` varchar(100) DEFAULT NULL,
  `is_published` tinyint(1) DEFAULT 1,
  `published_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `summary`, `content`, `images`, `category`, `author`, `is_published`, `published_at`, `created_at`, `updated_at`) VALUES
(3, 'Shin gallery', '', 'Shin gallery', '[\"/uploads/news/news_b143be31-8278-4538-9a5c-a20c656a2c5e.jpg\",\"/uploads/news/news_a410eacd-0ce5-40bc-94e1-7b18cfcb3ac5.jpg\",\"/uploads/news/news_6df411a6-4c9d-4869-be41-07d46cbc6faf.jpg\",\"/uploads/news/news_6b0410f0-8372-44b6-8e62-58c0a5f25c73.jpg\"]', 'general', 'Admin', 1, '2025-12-12 16:32:30', '2025-12-12 16:32:30', '2026-01-06 05:30:00'),
(4, 'Work space and our products', NULL, 'Work space and our products', '[\"/uploads/news/news_942d579f-5115-4f01-b46e-016b3c833081.jpg\",\"/uploads/news/news_e734fa6f-db91-4179-b15c-5b91f0da939b.jpg\",\"/uploads/news/news_5089a941-454c-4ae0-8973-464df1725055.jpg\",\"/uploads/news/news_2e10c57d-3612-4042-92f4-1ce0b04c8097.jpg\",\"/uploads/news/news_b2387686-ad40-42b4-b468-0bc09c3d3618.jpg\"]', 'company', 'Admin', 1, '2026-01-06 05:33:09', '2026-01-06 05:33:09', '2026-01-06 05:33:09'),
(5, 'Recomendetion and testimony', NULL, 'Recomendetion and testimony', '[\"/uploads/news/news_5b535bbe-e18a-4fa9-b811-a8cada1a08ee.jpg\",\"/uploads/news/news_689735a1-9e85-4d4e-809a-51400040c9ef.jpg\",\"/uploads/news/news_8b477e11-eee1-4450-a88f-a3e173f47fca.jpg\",\"/uploads/news/news_7393e7d1-49d5-437c-99c2-f924327d9915.jpg\",\"/uploads/news/news_fbac504c-fbf2-41c9-8f32-a3b98eb7a57b.jpg\"]', 'general', 'Admin', 1, '2026-01-06 05:34:33', '2026-01-06 05:34:33', '2026-01-06 05:34:33');

-- --------------------------------------------------------

--
-- Table structure for table `offices`
--

CREATE TABLE `offices` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `hours_mon_fri` varchar(255) DEFAULT NULL,
  `hours_sat` varchar(255) DEFAULT NULL,
  `hours_sun` varchar(255) DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT 0,
  `order_index` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offices`
--

INSERT INTO `offices` (`id`, `name`, `address`, `phone`, `email`, `hours_mon_fri`, `hours_sat`, `hours_sun`, `is_primary`, `order_index`, `created_at`, `updated_at`) VALUES
(1, 'Headquarters', 'Addis Ababa, Ethiopia', ' +251963877777', '420884970@qq.com', '8:00 AM - 6:00 PM', '9:00 AM - 4:00 PM', 'Closed', 1, 0, '2026-01-31 19:42:39', '2026-02-01 10:04:38'),
(2, 'sales', 'AA', '0916048977', 'sales@gmail.com', '8:00 AM - 6:00 PM', '9:00 AM - 4:00 PM', 'Closed', 0, 0, '2026-01-31 19:47:14', '2026-02-01 10:04:38');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` enum('pending','confirmed','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `required_date` date DEFAULT NULL,
  `shipped_date` timestamp NULL DEFAULT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `tax_amount` decimal(12,2) DEFAULT 0.00,
  `shipping_amount` decimal(12,2) DEFAULT 0.00,
  `discount_amount` decimal(12,2) DEFAULT 0.00,
  `total_amount` decimal(12,2) NOT NULL,
  `payment_status` enum('pending','partial','paid','refunded') DEFAULT 'pending',
  `payment_method` varchar(50) DEFAULT NULL,
  `shipping_address` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`shipping_address`)),
  `billing_address` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`billing_address`)),
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `user_id`, `status`, `order_date`, `required_date`, `shipped_date`, `subtotal`, `tax_amount`, `shipping_amount`, `discount_amount`, `total_amount`, `payment_status`, `payment_method`, `shipping_address`, `billing_address`, `notes`, `created_at`, `updated_at`) VALUES
(1, 'ORD-2023-1001', 2, 1, 'delivered', '2025-11-27 12:13:45', NULL, NULL, 5000.00, 0.00, 0.00, 0.00, 5000.00, 'paid', NULL, NULL, NULL, NULL, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(2, 'ORD-2023-1002', 3, 1, 'processing', '2025-11-23 12:13:45', NULL, NULL, 25378.91, 0.00, 0.00, 0.00, 25378.91, 'paid', NULL, NULL, NULL, NULL, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(3, 'ORD-2023-1003', 2, 1, 'processing', '2025-12-03 12:13:45', NULL, NULL, 20074.97, 0.00, 0.00, 0.00, 20074.97, 'paid', NULL, NULL, NULL, NULL, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(4, 'ORD-2023-1004', 2, 1, 'pending', '2025-12-09 12:13:45', NULL, NULL, 77.98, 0.00, 0.00, 0.00, 77.98, 'paid', NULL, NULL, NULL, NULL, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(5, 'ORD-2023-1005', 2, 1, 'delivered', '2025-11-24 12:13:45', NULL, NULL, 399.91, 0.00, 0.00, 0.00, 399.91, 'paid', NULL, NULL, NULL, NULL, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(6, 'ORD-2023-1006', 2, 1, 'pending', '2025-11-18 12:13:45', NULL, NULL, 15229.95, 0.00, 0.00, 0.00, 15229.95, 'paid', NULL, NULL, NULL, NULL, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(7, 'ORD-2023-1007', 2, 1, 'shipped', '2025-11-13 12:13:45', NULL, NULL, 38.99, 0.00, 0.00, 0.00, 38.99, 'paid', NULL, NULL, NULL, NULL, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(8, 'ORD-2023-1008', 3, 1, 'pending', '2025-12-01 12:13:45', NULL, NULL, 116.97, 0.00, 0.00, 0.00, 116.97, 'paid', NULL, NULL, NULL, NULL, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(9, 'ORD-2023-1009', 1, 1, 'processing', '2025-12-11 12:13:45', NULL, NULL, 444.91, 0.00, 0.00, 0.00, 444.91, 'paid', NULL, NULL, NULL, NULL, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(10, 'ORD-2023-1010', 1, 1, 'shipped', '2025-12-07 12:13:45', NULL, NULL, 304.92, 0.00, 0.00, 0.00, 304.92, 'paid', NULL, NULL, NULL, NULL, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(11, 'ORD-2023-1011', 2, 1, 'delivered', '2025-11-18 12:13:45', NULL, NULL, 45.99, 0.00, 0.00, 0.00, 45.99, 'paid', NULL, NULL, NULL, NULL, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(12, 'ORD-2023-1012', 3, 1, 'delivered', '2025-11-22 12:13:45', NULL, NULL, 10000.00, 0.00, 0.00, 0.00, 10000.00, 'paid', NULL, NULL, NULL, NULL, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(13, 'ORD-2023-1013', 1, 1, 'delivered', '2025-11-28 12:13:45', NULL, NULL, 194.95, 0.00, 0.00, 0.00, 194.95, 'paid', NULL, NULL, NULL, NULL, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(14, 'ORD-2023-1014', 2, 1, 'processing', '2025-11-19 12:13:45', NULL, NULL, 10049.98, 0.00, 0.00, 0.00, 10049.98, 'paid', NULL, NULL, NULL, NULL, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(15, 'ORD-2023-1015', 3, 1, 'pending', '2025-11-22 12:13:45', NULL, NULL, 255.92, 0.00, 0.00, 0.00, 255.92, 'paid', NULL, NULL, NULL, NULL, '2025-12-12 12:13:45', '2025-12-12 12:13:45');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_price` decimal(12,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `unit_price`, `total_price`, `created_at`) VALUES
(1, 1, 156, 1, 5000.00, 5000.00, '2025-12-12 12:13:45'),
(2, 2, 1, 4, 45.99, 183.96, '2025-12-12 12:13:45'),
(3, 2, 3, 5, 38.99, 194.95, '2025-12-12 12:13:45'),
(4, 2, 156, 5, 5000.00, 25000.00, '2025-12-12 12:13:45'),
(5, 3, 5, 2, 24.99, 49.98, '2025-12-12 12:13:45'),
(6, 3, 5, 1, 24.99, 24.99, '2025-12-12 12:13:45'),
(7, 3, 156, 4, 5000.00, 20000.00, '2025-12-12 12:13:45'),
(8, 4, 3, 2, 38.99, 77.98, '2025-12-12 12:13:45'),
(9, 5, 3, 2, 38.99, 77.98, '2025-12-12 12:13:45'),
(10, 5, 1, 2, 45.99, 91.98, '2025-12-12 12:13:45'),
(11, 5, 1, 5, 45.99, 229.95, '2025-12-12 12:13:45'),
(12, 6, 1, 2, 45.99, 91.98, '2025-12-12 12:13:45'),
(13, 6, 156, 3, 5000.00, 15000.00, '2025-12-12 12:13:45'),
(14, 6, 1, 3, 45.99, 137.97, '2025-12-12 12:13:45'),
(15, 7, 3, 1, 38.99, 38.99, '2025-12-12 12:13:45'),
(16, 8, 3, 3, 38.99, 116.97, '2025-12-12 12:13:45'),
(17, 9, 5, 4, 24.99, 99.96, '2025-12-12 12:13:45'),
(18, 9, 4, 5, 68.99, 344.95, '2025-12-12 12:13:45'),
(19, 10, 1, 5, 45.99, 229.95, '2025-12-12 12:13:45'),
(20, 10, 5, 3, 24.99, 74.97, '2025-12-12 12:13:45'),
(21, 11, 1, 1, 45.99, 45.99, '2025-12-12 12:13:45'),
(22, 12, 156, 2, 5000.00, 10000.00, '2025-12-12 12:13:45'),
(23, 13, 3, 5, 38.99, 194.95, '2025-12-12 12:13:45'),
(24, 14, 156, 2, 5000.00, 10000.00, '2025-12-12 12:13:45'),
(25, 14, 5, 2, 24.99, 49.98, '2025-12-12 12:13:45'),
(26, 15, 5, 4, 24.99, 99.96, '2025-12-12 12:13:45'),
(27, 15, 3, 1, 38.99, 38.99, '2025-12-12 12:13:45'),
(28, 15, 3, 3, 38.99, 116.97, '2025-12-12 12:13:45');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `sku` varchar(100) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `cost_price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT 0,
  `min_stock_level` int(11) DEFAULT 10,
  `max_stock_level` int(11) DEFAULT 1000,
  `unit` varchar(50) DEFAULT 'liters',
  `color_code` varchar(7) DEFAULT NULL,
  `finish_type` varchar(50) DEFAULT NULL,
  `coverage_area` decimal(8,2) DEFAULT NULL,
  `drying_time` varchar(100) DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `specifications` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`specifications`)),
  `is_active` tinyint(1) DEFAULT 1,
  `is_featured` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `sku`, `category_id`, `price`, `cost_price`, `stock_quantity`, `min_stock_level`, `max_stock_level`, `unit`, `color_code`, `finish_type`, `coverage_area`, `drying_time`, `images`, `specifications`, `is_active`, `is_featured`, `created_at`, `updated_at`) VALUES
(1, 'Premium Interior Latex Paint - White', 'High-quality latex paint perfect for interior walls', 'PIL-WHT-001', 1, 45.99, 28.50, 150, 10, 1000, 'gallons', '#FFFFFF', 'Satin', 400.00, '2-4 hours', '[]', '{}', 0, 1, '2025-08-17 16:47:59', '2025-12-12 08:52:16'),
(2, 'Exterior Acrylic Paint - Blue', 'Weather-resistant acrylic paint for exterior surfaces', 'EAP-BLU-002', 2, 52.99, 32.00, 85, 10, 1000, 'gallons', '#0066CC', 'Semi-gloss', 350.00, '4-6 hours', '[]', '{}', 1, 1, '2025-08-17 16:47:59', '2025-12-13 07:58:38'),
(3, 'Multi-Surface Primer', 'Universal primer for various surfaces', 'MSP-WHT-003', 3, 38.99, 24.00, 120, 10, 1000, 'gallons', '#F5F5F5', 'Flat', 450.00, '1-2 hours', '[]', '{}', 0, 0, '2025-08-17 16:47:59', '2025-12-12 08:52:30'),
(4, 'Metallic Finish Paint - Gold', 'Decorative metallic finish paint', 'MFP-GLD-004', 4, 68.99, 42.00, 45, 10, 1000, 'quarts', '#FFD700', 'Metallic', 100.00, '6-8 hours', '[]', '{}', 0, 0, '2025-08-17 16:47:59', '2025-12-12 08:26:12'),
(5, 'Professional Paint Brush Set', 'Set of 5 professional-grade paint brushes', 'PBS-PRO-005', 5, 24.99, 15.00, 200, 10, 1000, 'sets', NULL, NULL, NULL, NULL, '[]', '{}', 0, 1, '2025-08-17 16:47:59', '2025-12-12 08:52:35'),
(156, 'test', 'test product', 'test', NULL, 5000.00, NULL, 1, 10, 1000, 'quarts', '#262aa6', 'test', 400.00, '2-4', '[]', '{}', 0, 1, '2025-12-12 08:51:07', '2025-12-12 17:46:42');

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`id`, `name`, `description`, `parent_id`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-17 16:47:59', '2025-08-17 16:47:59'),
(2, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-17 16:47:59', '2025-08-17 16:47:59'),
(3, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-17 16:47:59', '2025-08-17 16:47:59'),
(4, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-17 16:47:59', '2025-08-17 16:47:59'),
(5, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-17 16:47:59', '2025-08-17 16:47:59'),
(6, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-17 16:48:25', '2025-08-17 16:48:25'),
(7, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-17 16:48:25', '2025-08-17 16:48:25'),
(8, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-17 16:48:25', '2025-08-17 16:48:25'),
(9, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-17 16:48:25', '2025-08-17 16:48:25'),
(10, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-17 16:48:25', '2025-08-17 16:48:25'),
(11, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-17 16:48:34', '2025-08-17 16:48:34'),
(12, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-17 16:48:34', '2025-08-17 16:48:34'),
(13, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-17 16:48:34', '2025-08-17 16:48:34'),
(14, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-17 16:48:34', '2025-08-17 16:48:34'),
(15, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-17 16:48:34', '2025-08-17 16:48:34'),
(16, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-17 17:41:43', '2025-08-17 17:41:43'),
(17, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-17 17:41:43', '2025-08-17 17:41:43'),
(18, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-17 17:41:43', '2025-08-17 17:41:43'),
(19, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-17 17:41:43', '2025-08-17 17:41:43'),
(20, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-17 17:41:43', '2025-08-17 17:41:43'),
(21, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 07:00:40', '2025-08-18 07:00:40'),
(22, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 07:00:40', '2025-08-18 07:00:40'),
(23, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 07:00:40', '2025-08-18 07:00:40'),
(24, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 07:00:41', '2025-08-18 07:00:41'),
(25, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 07:00:41', '2025-08-18 07:00:41'),
(26, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 07:12:07', '2025-08-18 07:12:07'),
(27, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 07:12:07', '2025-08-18 07:12:07'),
(28, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 07:12:07', '2025-08-18 07:12:07'),
(29, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 07:12:07', '2025-08-18 07:12:07'),
(30, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 07:12:07', '2025-08-18 07:12:07'),
(31, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 07:19:15', '2025-08-18 07:19:15'),
(32, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 07:19:15', '2025-08-18 07:19:15'),
(33, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 07:19:15', '2025-08-18 07:19:15'),
(34, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 07:19:15', '2025-08-18 07:19:15'),
(35, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 07:19:15', '2025-08-18 07:19:15'),
(36, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 07:21:27', '2025-08-18 07:21:27'),
(37, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 07:21:27', '2025-08-18 07:21:27'),
(38, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 07:21:27', '2025-08-18 07:21:27'),
(39, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 07:21:27', '2025-08-18 07:21:27'),
(40, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 07:21:27', '2025-08-18 07:21:27'),
(41, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 07:49:24', '2025-08-18 07:49:24'),
(42, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 07:49:24', '2025-08-18 07:49:24'),
(43, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 07:49:24', '2025-08-18 07:49:24'),
(44, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 07:49:24', '2025-08-18 07:49:24'),
(45, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 07:49:24', '2025-08-18 07:49:24'),
(46, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 09:35:31', '2025-08-18 09:35:31'),
(47, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 09:35:31', '2025-08-18 09:35:31'),
(48, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 09:35:32', '2025-08-18 09:35:32'),
(49, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 09:35:33', '2025-08-18 09:35:33'),
(50, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 09:35:34', '2025-08-18 09:35:34'),
(51, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 10:59:54', '2025-08-18 10:59:54'),
(52, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 10:59:54', '2025-08-18 10:59:54'),
(53, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 10:59:54', '2025-08-18 10:59:54'),
(54, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 10:59:54', '2025-08-18 10:59:54'),
(55, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 10:59:54', '2025-08-18 10:59:54'),
(56, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 11:00:57', '2025-08-18 11:00:57'),
(57, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 11:00:57', '2025-08-18 11:00:57'),
(58, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 11:00:57', '2025-08-18 11:00:57'),
(59, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 11:00:57', '2025-08-18 11:00:57'),
(60, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 11:00:57', '2025-08-18 11:00:57'),
(61, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 11:04:06', '2025-08-18 11:04:06'),
(62, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 11:04:06', '2025-08-18 11:04:06'),
(63, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 11:04:06', '2025-08-18 11:04:06'),
(64, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 11:04:06', '2025-08-18 11:04:06'),
(65, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 11:04:06', '2025-08-18 11:04:06'),
(66, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 11:05:21', '2025-08-18 11:05:21'),
(67, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 11:05:21', '2025-08-18 11:05:21'),
(68, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 11:05:21', '2025-08-18 11:05:21'),
(69, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 11:05:21', '2025-08-18 11:05:21'),
(70, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 11:05:21', '2025-08-18 11:05:21'),
(71, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 11:07:12', '2025-08-18 11:07:12'),
(72, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 11:07:12', '2025-08-18 11:07:12'),
(73, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 11:07:12', '2025-08-18 11:07:12'),
(74, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 11:07:12', '2025-08-18 11:07:12'),
(75, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 11:07:12', '2025-08-18 11:07:12'),
(76, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 11:09:30', '2025-08-18 11:09:30'),
(77, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 11:09:30', '2025-08-18 11:09:30'),
(78, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 11:09:30', '2025-08-18 11:09:30'),
(79, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 11:09:30', '2025-08-18 11:09:30'),
(80, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 11:09:30', '2025-08-18 11:09:30'),
(81, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 11:31:05', '2025-08-18 11:31:05'),
(82, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 11:31:05', '2025-08-18 11:31:05'),
(83, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 11:31:05', '2025-08-18 11:31:05'),
(84, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 11:31:05', '2025-08-18 11:31:05'),
(85, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 11:31:05', '2025-08-18 11:31:05'),
(86, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 11:49:50', '2025-08-18 11:49:50'),
(87, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 11:49:51', '2025-08-18 11:49:51'),
(88, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 11:49:51', '2025-08-18 11:49:51'),
(89, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 11:49:51', '2025-08-18 11:49:51'),
(90, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 11:49:51', '2025-08-18 11:49:51'),
(91, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 11:52:35', '2025-08-18 11:52:35'),
(92, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 11:52:36', '2025-08-18 11:52:36'),
(93, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 11:52:36', '2025-08-18 11:52:36'),
(94, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 11:52:36', '2025-08-18 11:52:36'),
(95, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 11:52:36', '2025-08-18 11:52:36'),
(96, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 11:54:25', '2025-08-18 11:54:25'),
(97, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 11:54:25', '2025-08-18 11:54:25'),
(98, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 11:54:25', '2025-08-18 11:54:25'),
(99, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 11:54:25', '2025-08-18 11:54:25'),
(100, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 11:54:25', '2025-08-18 11:54:25'),
(101, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 11:56:35', '2025-08-18 11:56:35'),
(102, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 11:56:35', '2025-08-18 11:56:35'),
(103, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 11:56:35', '2025-08-18 11:56:35'),
(104, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 11:56:35', '2025-08-18 11:56:35'),
(105, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 11:56:35', '2025-08-18 11:56:35'),
(106, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 11:58:50', '2025-08-18 11:58:50'),
(107, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 11:58:50', '2025-08-18 11:58:50'),
(108, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 11:58:50', '2025-08-18 11:58:50'),
(109, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 11:58:50', '2025-08-18 11:58:50'),
(110, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 11:58:50', '2025-08-18 11:58:50'),
(111, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-18 12:02:01', '2025-08-18 12:02:01'),
(112, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-18 12:02:01', '2025-08-18 12:02:01'),
(113, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-18 12:02:01', '2025-08-18 12:02:01'),
(114, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-18 12:02:01', '2025-08-18 12:02:01'),
(115, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-18 12:02:01', '2025-08-18 12:02:01'),
(116, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-21 07:42:37', '2025-08-21 07:42:37'),
(117, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-21 07:42:37', '2025-08-21 07:42:37'),
(118, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-21 07:42:37', '2025-08-21 07:42:37'),
(119, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-21 07:42:37', '2025-08-21 07:42:37'),
(120, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-21 07:42:37', '2025-08-21 07:42:37'),
(121, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-08-21 13:45:36', '2025-08-21 13:45:36'),
(122, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-08-21 13:45:36', '2025-08-21 13:45:36'),
(123, 'Primer', 'Base coats and primers', NULL, 1, '2025-08-21 13:45:36', '2025-08-21 13:45:36'),
(124, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-08-21 13:45:36', '2025-08-21 13:45:36'),
(125, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-08-21 13:45:36', '2025-08-21 13:45:36'),
(126, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-04 16:36:58', '2025-12-04 16:36:58'),
(127, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-04 16:36:58', '2025-12-04 16:36:58'),
(128, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-04 16:36:58', '2025-12-04 16:36:58'),
(129, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-04 16:36:58', '2025-12-04 16:36:58'),
(130, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-04 16:36:58', '2025-12-04 16:36:58'),
(131, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 07:00:28', '2025-12-12 07:00:28'),
(132, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 07:00:28', '2025-12-12 07:00:28'),
(133, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 07:00:28', '2025-12-12 07:00:28'),
(134, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 07:00:28', '2025-12-12 07:00:28'),
(135, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 07:00:28', '2025-12-12 07:00:28'),
(136, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 08:13:12', '2025-12-12 08:13:12'),
(137, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 08:13:12', '2025-12-12 08:13:12'),
(138, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 08:13:12', '2025-12-12 08:13:12'),
(139, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 08:13:12', '2025-12-12 08:13:12'),
(140, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 08:13:12', '2025-12-12 08:13:12'),
(141, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 08:24:27', '2025-12-12 08:24:27'),
(142, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 08:24:27', '2025-12-12 08:24:27'),
(143, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 08:24:27', '2025-12-12 08:24:27'),
(144, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 08:24:27', '2025-12-12 08:24:27'),
(145, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 08:24:27', '2025-12-12 08:24:27'),
(146, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 08:48:54', '2025-12-12 08:48:54'),
(147, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 08:48:54', '2025-12-12 08:48:54'),
(148, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 08:48:54', '2025-12-12 08:48:54'),
(149, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 08:48:54', '2025-12-12 08:48:54'),
(150, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 08:48:54', '2025-12-12 08:48:54'),
(151, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 08:50:56', '2025-12-12 08:50:56'),
(152, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 08:50:56', '2025-12-12 08:50:56'),
(153, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 08:50:56', '2025-12-12 08:50:56'),
(154, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 08:50:56', '2025-12-12 08:50:56'),
(155, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 08:50:56', '2025-12-12 08:50:56'),
(156, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 09:20:01', '2025-12-12 09:20:01'),
(157, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 09:20:01', '2025-12-12 09:20:01'),
(158, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 09:20:01', '2025-12-12 09:20:01'),
(159, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 09:20:01', '2025-12-12 09:20:01'),
(160, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 09:20:01', '2025-12-12 09:20:01'),
(161, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 09:22:13', '2025-12-12 09:22:13'),
(162, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 09:22:13', '2025-12-12 09:22:13'),
(163, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 09:22:13', '2025-12-12 09:22:13'),
(164, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 09:22:13', '2025-12-12 09:22:13'),
(165, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 09:22:13', '2025-12-12 09:22:13'),
(166, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 09:26:19', '2025-12-12 09:26:19'),
(167, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 09:26:19', '2025-12-12 09:26:19'),
(168, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 09:26:19', '2025-12-12 09:26:19'),
(169, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 09:26:19', '2025-12-12 09:26:19'),
(170, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 09:26:19', '2025-12-12 09:26:19'),
(171, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 09:27:52', '2025-12-12 09:27:52'),
(172, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 09:27:52', '2025-12-12 09:27:52'),
(173, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 09:27:52', '2025-12-12 09:27:52'),
(174, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 09:27:52', '2025-12-12 09:27:52'),
(175, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 09:27:52', '2025-12-12 09:27:52'),
(176, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 09:38:49', '2025-12-12 09:38:49'),
(177, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 09:38:49', '2025-12-12 09:38:49'),
(178, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 09:38:49', '2025-12-12 09:38:49'),
(179, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 09:38:49', '2025-12-12 09:38:49'),
(180, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 09:38:49', '2025-12-12 09:38:49'),
(181, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 09:39:46', '2025-12-12 09:39:46'),
(182, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 09:39:46', '2025-12-12 09:39:46'),
(183, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 09:39:46', '2025-12-12 09:39:46'),
(184, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 09:39:46', '2025-12-12 09:39:46'),
(185, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 09:39:46', '2025-12-12 09:39:46'),
(186, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 09:43:54', '2025-12-12 09:43:54'),
(187, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 09:43:54', '2025-12-12 09:43:54'),
(188, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 09:43:54', '2025-12-12 09:43:54'),
(189, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 09:43:54', '2025-12-12 09:43:54'),
(190, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 09:43:54', '2025-12-12 09:43:54'),
(191, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 11:33:56', '2025-12-12 11:33:56'),
(192, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 11:33:56', '2025-12-12 11:33:56'),
(193, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 11:33:56', '2025-12-12 11:33:56'),
(194, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 11:33:56', '2025-12-12 11:33:56'),
(195, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 11:33:56', '2025-12-12 11:33:56'),
(196, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 11:45:50', '2025-12-12 11:45:50'),
(197, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 11:45:50', '2025-12-12 11:45:50'),
(198, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 11:45:50', '2025-12-12 11:45:50'),
(199, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 11:45:50', '2025-12-12 11:45:50'),
(200, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 11:45:50', '2025-12-12 11:45:50'),
(201, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 11:54:16', '2025-12-12 11:54:16'),
(202, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 11:54:16', '2025-12-12 11:54:16'),
(203, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 11:54:16', '2025-12-12 11:54:16'),
(204, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 11:54:16', '2025-12-12 11:54:16'),
(205, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 11:54:16', '2025-12-12 11:54:16'),
(206, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 12:01:15', '2025-12-12 12:01:15'),
(207, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 12:01:15', '2025-12-12 12:01:15'),
(208, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 12:01:15', '2025-12-12 12:01:15'),
(209, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 12:01:15', '2025-12-12 12:01:15'),
(210, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 12:01:15', '2025-12-12 12:01:15'),
(211, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(212, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(213, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(214, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(215, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 12:13:45', '2025-12-12 12:13:45'),
(216, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 12:24:21', '2025-12-12 12:24:21'),
(217, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 12:24:21', '2025-12-12 12:24:21'),
(218, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 12:24:21', '2025-12-12 12:24:21'),
(219, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 12:24:21', '2025-12-12 12:24:21'),
(220, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 12:24:21', '2025-12-12 12:24:21'),
(221, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 12:29:00', '2025-12-12 12:29:00'),
(222, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 12:29:00', '2025-12-12 12:29:00'),
(223, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 12:29:00', '2025-12-12 12:29:00'),
(224, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 12:29:00', '2025-12-12 12:29:00'),
(225, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 12:29:00', '2025-12-12 12:29:00'),
(226, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 12:37:58', '2025-12-12 12:37:58'),
(227, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 12:37:59', '2025-12-12 12:37:59'),
(228, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 12:37:59', '2025-12-12 12:37:59'),
(229, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 12:37:59', '2025-12-12 12:37:59'),
(230, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 12:37:59', '2025-12-12 12:37:59'),
(231, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 12:39:59', '2025-12-12 12:39:59'),
(232, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 12:39:59', '2025-12-12 12:39:59'),
(233, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 12:39:59', '2025-12-12 12:39:59'),
(234, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 12:39:59', '2025-12-12 12:39:59'),
(235, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 12:39:59', '2025-12-12 12:39:59'),
(236, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 12:46:23', '2025-12-12 12:46:23'),
(237, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 12:46:23', '2025-12-12 12:46:23'),
(238, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 12:46:23', '2025-12-12 12:46:23'),
(239, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 12:46:23', '2025-12-12 12:46:23'),
(240, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 12:46:23', '2025-12-12 12:46:23'),
(241, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 13:51:00', '2025-12-12 13:51:00'),
(242, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 13:51:00', '2025-12-12 13:51:00'),
(243, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 13:51:00', '2025-12-12 13:51:00'),
(244, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 13:51:00', '2025-12-12 13:51:00'),
(245, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 13:51:00', '2025-12-12 13:51:00'),
(246, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 13:54:08', '2025-12-12 13:54:08'),
(247, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 13:54:08', '2025-12-12 13:54:08'),
(248, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 13:54:08', '2025-12-12 13:54:08'),
(249, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 13:54:08', '2025-12-12 13:54:08'),
(250, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 13:54:08', '2025-12-12 13:54:08'),
(251, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 14:09:02', '2025-12-12 14:09:02'),
(252, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 14:09:02', '2025-12-12 14:09:02'),
(253, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 14:09:02', '2025-12-12 14:09:02'),
(254, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 14:09:02', '2025-12-12 14:09:02'),
(255, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 14:09:02', '2025-12-12 14:09:02'),
(256, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 14:11:58', '2025-12-12 14:11:58'),
(257, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 14:11:58', '2025-12-12 14:11:58'),
(258, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 14:11:58', '2025-12-12 14:11:58'),
(259, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 14:11:58', '2025-12-12 14:11:58'),
(260, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 14:11:58', '2025-12-12 14:11:58'),
(261, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 14:25:29', '2025-12-12 14:25:29'),
(262, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 14:25:29', '2025-12-12 14:25:29'),
(263, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 14:25:29', '2025-12-12 14:25:29'),
(264, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 14:25:29', '2025-12-12 14:25:29'),
(265, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 14:25:29', '2025-12-12 14:25:29'),
(266, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 14:32:11', '2025-12-12 14:32:11'),
(267, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 14:32:11', '2025-12-12 14:32:11'),
(268, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 14:32:11', '2025-12-12 14:32:11'),
(269, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 14:32:11', '2025-12-12 14:32:11'),
(270, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 14:32:11', '2025-12-12 14:32:11'),
(271, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 14:36:59', '2025-12-12 14:36:59'),
(272, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 14:36:59', '2025-12-12 14:36:59'),
(273, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 14:36:59', '2025-12-12 14:36:59'),
(274, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 14:36:59', '2025-12-12 14:36:59'),
(275, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 14:36:59', '2025-12-12 14:36:59'),
(276, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 14:42:06', '2025-12-12 14:42:06'),
(277, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 14:42:06', '2025-12-12 14:42:06'),
(278, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 14:42:06', '2025-12-12 14:42:06'),
(279, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 14:42:06', '2025-12-12 14:42:06'),
(280, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 14:42:06', '2025-12-12 14:42:06'),
(281, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 14:42:32', '2025-12-12 14:42:32'),
(282, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 14:42:32', '2025-12-12 14:42:32'),
(283, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 14:42:32', '2025-12-12 14:42:32'),
(284, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 14:42:32', '2025-12-12 14:42:32'),
(285, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 14:42:32', '2025-12-12 14:42:32'),
(286, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 14:45:04', '2025-12-12 14:45:04'),
(287, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 14:45:04', '2025-12-12 14:45:04'),
(288, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 14:45:04', '2025-12-12 14:45:04'),
(289, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 14:45:04', '2025-12-12 14:45:04'),
(290, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 14:45:04', '2025-12-12 14:45:04'),
(291, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 14:45:30', '2025-12-12 14:45:30'),
(292, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 14:45:30', '2025-12-12 14:45:30'),
(293, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 14:45:30', '2025-12-12 14:45:30'),
(294, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 14:45:30', '2025-12-12 14:45:30'),
(295, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 14:45:30', '2025-12-12 14:45:30'),
(296, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 14:48:45', '2025-12-12 14:48:45'),
(297, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 14:48:45', '2025-12-12 14:48:45'),
(298, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 14:48:45', '2025-12-12 14:48:45'),
(299, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 14:48:45', '2025-12-12 14:48:45'),
(300, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 14:48:45', '2025-12-12 14:48:45'),
(301, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 14:53:11', '2025-12-12 14:53:11'),
(302, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 14:53:11', '2025-12-12 14:53:11'),
(303, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 14:53:11', '2025-12-12 14:53:11'),
(304, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 14:53:11', '2025-12-12 14:53:11'),
(305, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 14:53:11', '2025-12-12 14:53:11'),
(306, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 15:35:29', '2025-12-12 15:35:29'),
(307, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 15:35:29', '2025-12-12 15:35:29'),
(308, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 15:35:29', '2025-12-12 15:35:29'),
(309, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 15:35:29', '2025-12-12 15:35:29'),
(310, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 15:35:29', '2025-12-12 15:35:29'),
(311, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 15:58:36', '2025-12-12 15:58:36'),
(312, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 15:58:36', '2025-12-12 15:58:36'),
(313, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 15:58:36', '2025-12-12 15:58:36'),
(314, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 15:58:36', '2025-12-12 15:58:36'),
(315, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 15:58:36', '2025-12-12 15:58:36'),
(316, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 16:02:35', '2025-12-12 16:02:35'),
(317, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 16:02:35', '2025-12-12 16:02:35'),
(318, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 16:02:35', '2025-12-12 16:02:35'),
(319, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 16:02:35', '2025-12-12 16:02:35'),
(320, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 16:02:35', '2025-12-12 16:02:35'),
(321, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 16:20:26', '2025-12-12 16:20:26'),
(322, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 16:20:26', '2025-12-12 16:20:26'),
(323, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 16:20:26', '2025-12-12 16:20:26'),
(324, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 16:20:26', '2025-12-12 16:20:26'),
(325, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 16:20:26', '2025-12-12 16:20:26'),
(326, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 16:27:34', '2025-12-12 16:27:34'),
(327, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 16:27:34', '2025-12-12 16:27:34'),
(328, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 16:27:34', '2025-12-12 16:27:34'),
(329, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 16:27:34', '2025-12-12 16:27:34'),
(330, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 16:27:34', '2025-12-12 16:27:34'),
(331, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 16:29:39', '2025-12-12 16:29:39'),
(332, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 16:29:39', '2025-12-12 16:29:39'),
(333, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 16:29:39', '2025-12-12 16:29:39'),
(334, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 16:29:39', '2025-12-12 16:29:39'),
(335, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 16:29:39', '2025-12-12 16:29:39'),
(336, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 16:34:14', '2025-12-12 16:34:14'),
(337, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 16:34:14', '2025-12-12 16:34:14'),
(338, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 16:34:14', '2025-12-12 16:34:14'),
(339, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 16:34:14', '2025-12-12 16:34:14'),
(340, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 16:34:14', '2025-12-12 16:34:14'),
(341, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 16:36:31', '2025-12-12 16:36:31'),
(342, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 16:36:31', '2025-12-12 16:36:31'),
(343, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 16:36:31', '2025-12-12 16:36:31'),
(344, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 16:36:31', '2025-12-12 16:36:31'),
(345, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 16:36:31', '2025-12-12 16:36:31'),
(346, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 16:42:28', '2025-12-12 16:42:28'),
(347, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 16:42:28', '2025-12-12 16:42:28'),
(348, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 16:42:28', '2025-12-12 16:42:28'),
(349, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 16:42:28', '2025-12-12 16:42:28'),
(350, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 16:42:28', '2025-12-12 16:42:28'),
(351, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 16:54:17', '2025-12-12 16:54:17'),
(352, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 16:54:17', '2025-12-12 16:54:17'),
(353, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 16:54:17', '2025-12-12 16:54:17'),
(354, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 16:54:17', '2025-12-12 16:54:17'),
(355, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 16:54:17', '2025-12-12 16:54:17'),
(356, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 17:51:15', '2025-12-12 17:51:15'),
(357, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 17:51:15', '2025-12-12 17:51:15'),
(358, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 17:51:15', '2025-12-12 17:51:15'),
(359, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 17:51:15', '2025-12-12 17:51:15'),
(360, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 17:51:15', '2025-12-12 17:51:15'),
(361, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 17:52:42', '2025-12-12 17:52:42'),
(362, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 17:52:42', '2025-12-12 17:52:42'),
(363, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 17:52:42', '2025-12-12 17:52:42'),
(364, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 17:52:42', '2025-12-12 17:52:42'),
(365, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 17:52:42', '2025-12-12 17:52:42'),
(366, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 18:03:02', '2025-12-12 18:03:02'),
(367, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 18:03:02', '2025-12-12 18:03:02'),
(368, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 18:03:02', '2025-12-12 18:03:02'),
(369, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 18:03:02', '2025-12-12 18:03:02'),
(370, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 18:03:02', '2025-12-12 18:03:02'),
(371, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 18:03:51', '2025-12-12 18:03:51'),
(372, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 18:03:51', '2025-12-12 18:03:51'),
(373, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 18:03:51', '2025-12-12 18:03:51'),
(374, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 18:03:51', '2025-12-12 18:03:51'),
(375, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 18:03:51', '2025-12-12 18:03:51'),
(376, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 18:04:54', '2025-12-12 18:04:54'),
(377, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 18:04:54', '2025-12-12 18:04:54'),
(378, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 18:04:54', '2025-12-12 18:04:54'),
(379, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 18:04:54', '2025-12-12 18:04:54'),
(380, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 18:04:54', '2025-12-12 18:04:54'),
(381, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 18:07:45', '2025-12-12 18:07:45'),
(382, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 18:07:45', '2025-12-12 18:07:45'),
(383, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 18:07:45', '2025-12-12 18:07:45'),
(384, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 18:07:45', '2025-12-12 18:07:45'),
(385, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 18:07:45', '2025-12-12 18:07:45'),
(386, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 18:08:29', '2025-12-12 18:08:29'),
(387, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 18:08:29', '2025-12-12 18:08:29'),
(388, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 18:08:29', '2025-12-12 18:08:29'),
(389, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 18:08:29', '2025-12-12 18:08:29'),
(390, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 18:08:29', '2025-12-12 18:08:29'),
(391, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 18:28:09', '2025-12-12 18:28:09'),
(392, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 18:28:09', '2025-12-12 18:28:09'),
(393, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 18:28:09', '2025-12-12 18:28:09'),
(394, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 18:28:09', '2025-12-12 18:28:09'),
(395, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 18:28:09', '2025-12-12 18:28:09'),
(396, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 18:35:23', '2025-12-12 18:35:23'),
(397, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 18:35:23', '2025-12-12 18:35:23'),
(398, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 18:35:23', '2025-12-12 18:35:23'),
(399, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 18:35:23', '2025-12-12 18:35:23'),
(400, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 18:35:23', '2025-12-12 18:35:23'),
(401, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 18:46:18', '2025-12-12 18:46:18'),
(402, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 18:46:18', '2025-12-12 18:46:18'),
(403, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 18:46:18', '2025-12-12 18:46:18'),
(404, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 18:46:18', '2025-12-12 18:46:18'),
(405, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 18:46:18', '2025-12-12 18:46:18'),
(406, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 18:46:45', '2025-12-12 18:46:45'),
(407, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 18:46:45', '2025-12-12 18:46:45'),
(408, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 18:46:45', '2025-12-12 18:46:45'),
(409, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 18:46:45', '2025-12-12 18:46:45'),
(410, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 18:46:45', '2025-12-12 18:46:45'),
(411, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 18:49:27', '2025-12-12 18:49:27'),
(412, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 18:49:27', '2025-12-12 18:49:27'),
(413, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 18:49:27', '2025-12-12 18:49:27'),
(414, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 18:49:27', '2025-12-12 18:49:27'),
(415, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 18:49:27', '2025-12-12 18:49:27'),
(416, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 18:51:04', '2025-12-12 18:51:04'),
(417, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 18:51:04', '2025-12-12 18:51:04'),
(418, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 18:51:04', '2025-12-12 18:51:04'),
(419, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 18:51:04', '2025-12-12 18:51:04'),
(420, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 18:51:04', '2025-12-12 18:51:04'),
(421, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 18:51:47', '2025-12-12 18:51:47'),
(422, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 18:51:47', '2025-12-12 18:51:47'),
(423, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 18:51:47', '2025-12-12 18:51:47'),
(424, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 18:51:47', '2025-12-12 18:51:47'),
(425, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 18:51:47', '2025-12-12 18:51:47'),
(426, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 18:53:14', '2025-12-12 18:53:14'),
(427, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 18:53:14', '2025-12-12 18:53:14'),
(428, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 18:53:14', '2025-12-12 18:53:14'),
(429, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 18:53:14', '2025-12-12 18:53:14'),
(430, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 18:53:14', '2025-12-12 18:53:14'),
(431, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 18:53:29', '2025-12-12 18:53:29'),
(432, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 18:53:29', '2025-12-12 18:53:29'),
(433, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 18:53:29', '2025-12-12 18:53:29'),
(434, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 18:53:29', '2025-12-12 18:53:29'),
(435, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 18:53:29', '2025-12-12 18:53:29');
INSERT INTO `product_categories` (`id`, `name`, `description`, `parent_id`, `is_active`, `created_at`, `updated_at`) VALUES
(436, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 18:56:35', '2025-12-12 18:56:35'),
(437, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 18:56:35', '2025-12-12 18:56:35'),
(438, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 18:56:35', '2025-12-12 18:56:35'),
(439, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 18:56:35', '2025-12-12 18:56:35'),
(440, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 18:56:35', '2025-12-12 18:56:35'),
(441, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 18:57:14', '2025-12-12 18:57:14'),
(442, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 18:57:14', '2025-12-12 18:57:14'),
(443, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 18:57:14', '2025-12-12 18:57:14'),
(444, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 18:57:14', '2025-12-12 18:57:14'),
(445, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 18:57:14', '2025-12-12 18:57:14'),
(446, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:00:21', '2025-12-12 19:00:21'),
(447, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:00:21', '2025-12-12 19:00:21'),
(448, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:00:21', '2025-12-12 19:00:21'),
(449, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:00:21', '2025-12-12 19:00:21'),
(450, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:00:21', '2025-12-12 19:00:21'),
(451, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:01:34', '2025-12-12 19:01:34'),
(452, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:01:34', '2025-12-12 19:01:34'),
(453, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:01:34', '2025-12-12 19:01:34'),
(454, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:01:34', '2025-12-12 19:01:34'),
(455, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:01:34', '2025-12-12 19:01:34'),
(456, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:02:37', '2025-12-12 19:02:37'),
(457, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:02:37', '2025-12-12 19:02:37'),
(458, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:02:37', '2025-12-12 19:02:37'),
(459, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:02:37', '2025-12-12 19:02:37'),
(460, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:02:37', '2025-12-12 19:02:37'),
(461, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:03:51', '2025-12-12 19:03:51'),
(462, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:03:51', '2025-12-12 19:03:51'),
(463, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:03:51', '2025-12-12 19:03:51'),
(464, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:03:51', '2025-12-12 19:03:51'),
(465, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:03:51', '2025-12-12 19:03:51'),
(466, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:07:14', '2025-12-12 19:07:14'),
(467, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:07:14', '2025-12-12 19:07:14'),
(468, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:07:14', '2025-12-12 19:07:14'),
(469, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:07:14', '2025-12-12 19:07:14'),
(470, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:07:14', '2025-12-12 19:07:14'),
(471, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:09:28', '2025-12-12 19:09:28'),
(472, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:09:28', '2025-12-12 19:09:28'),
(473, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:09:28', '2025-12-12 19:09:28'),
(474, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:09:28', '2025-12-12 19:09:28'),
(475, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:09:28', '2025-12-12 19:09:28'),
(476, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:14:22', '2025-12-12 19:14:22'),
(477, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:14:22', '2025-12-12 19:14:22'),
(478, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:14:22', '2025-12-12 19:14:22'),
(479, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:14:22', '2025-12-12 19:14:22'),
(480, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:14:22', '2025-12-12 19:14:22'),
(481, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:19:12', '2025-12-12 19:19:12'),
(482, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:19:12', '2025-12-12 19:19:12'),
(483, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:19:12', '2025-12-12 19:19:12'),
(484, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:19:12', '2025-12-12 19:19:12'),
(485, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:19:12', '2025-12-12 19:19:12'),
(486, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:21:17', '2025-12-12 19:21:17'),
(487, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:21:17', '2025-12-12 19:21:17'),
(488, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:21:17', '2025-12-12 19:21:17'),
(489, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:21:17', '2025-12-12 19:21:17'),
(490, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:21:17', '2025-12-12 19:21:17'),
(491, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:24:06', '2025-12-12 19:24:06'),
(492, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:24:06', '2025-12-12 19:24:06'),
(493, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:24:06', '2025-12-12 19:24:06'),
(494, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:24:06', '2025-12-12 19:24:06'),
(495, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:24:07', '2025-12-12 19:24:07'),
(496, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:26:07', '2025-12-12 19:26:07'),
(497, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:26:07', '2025-12-12 19:26:07'),
(498, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:26:07', '2025-12-12 19:26:07'),
(499, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:26:07', '2025-12-12 19:26:07'),
(500, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:26:07', '2025-12-12 19:26:07'),
(501, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:26:59', '2025-12-12 19:26:59'),
(502, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:26:59', '2025-12-12 19:26:59'),
(503, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:26:59', '2025-12-12 19:26:59'),
(504, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:26:59', '2025-12-12 19:26:59'),
(505, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:26:59', '2025-12-12 19:26:59'),
(506, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:31:45', '2025-12-12 19:31:45'),
(507, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:31:45', '2025-12-12 19:31:45'),
(508, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:31:45', '2025-12-12 19:31:45'),
(509, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:31:45', '2025-12-12 19:31:45'),
(510, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:31:45', '2025-12-12 19:31:45'),
(511, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:34:18', '2025-12-12 19:34:18'),
(512, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:34:18', '2025-12-12 19:34:18'),
(513, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:34:18', '2025-12-12 19:34:18'),
(514, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:34:18', '2025-12-12 19:34:18'),
(515, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:34:18', '2025-12-12 19:34:18'),
(516, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:39:28', '2025-12-12 19:39:28'),
(517, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:39:28', '2025-12-12 19:39:28'),
(518, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:39:28', '2025-12-12 19:39:28'),
(519, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:39:28', '2025-12-12 19:39:28'),
(520, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:39:28', '2025-12-12 19:39:28'),
(521, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:39:28', '2025-12-12 19:39:28'),
(522, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:39:28', '2025-12-12 19:39:28'),
(523, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:39:28', '2025-12-12 19:39:28'),
(524, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:39:28', '2025-12-12 19:39:28'),
(525, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:39:28', '2025-12-12 19:39:28'),
(526, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:39:42', '2025-12-12 19:39:42'),
(527, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:39:42', '2025-12-12 19:39:42'),
(528, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:39:42', '2025-12-12 19:39:42'),
(529, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:39:42', '2025-12-12 19:39:42'),
(530, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:39:42', '2025-12-12 19:39:42'),
(531, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:40:35', '2025-12-12 19:40:35'),
(532, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:40:35', '2025-12-12 19:40:35'),
(533, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:40:35', '2025-12-12 19:40:35'),
(534, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:40:35', '2025-12-12 19:40:35'),
(535, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:40:35', '2025-12-12 19:40:35'),
(536, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 19:49:21', '2025-12-12 19:49:21'),
(537, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 19:49:21', '2025-12-12 19:49:21'),
(538, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 19:49:21', '2025-12-12 19:49:21'),
(539, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 19:49:21', '2025-12-12 19:49:21'),
(540, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 19:49:21', '2025-12-12 19:49:21'),
(541, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 20:09:52', '2025-12-12 20:09:52'),
(542, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 20:09:52', '2025-12-12 20:09:52'),
(543, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 20:09:52', '2025-12-12 20:09:52'),
(544, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 20:09:52', '2025-12-12 20:09:52'),
(545, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 20:09:52', '2025-12-12 20:09:52'),
(546, 'Interior Paint', 'Paint for interior walls and surfaces', NULL, 1, '2025-12-12 20:11:43', '2025-12-12 20:11:43'),
(547, 'Exterior Paint', 'Weather-resistant paint for outdoor use', NULL, 1, '2025-12-12 20:11:43', '2025-12-12 20:11:43'),
(548, 'Primer', 'Base coats and primers', NULL, 1, '2025-12-12 20:11:43', '2025-12-12 20:11:43'),
(549, 'Specialty Paint', 'Specialty and decorative paints', NULL, 1, '2025-12-12 20:11:43', '2025-12-12 20:11:43'),
(550, 'Paint Supplies', 'Brushes, rollers, and painting accessories', NULL, 1, '2025-12-12 20:11:43', '2025-12-12 20:11:43');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `group` varchar(100) DEFAULT 'general',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `group`, `updated_at`) VALUES
(1, 'contact_address', 'Addis Ababa', 'contact', '2026-01-31 19:37:55'),
(2, 'contact_city', 'Addis Ababa', 'contact', '2026-01-31 19:37:55'),
(3, 'contact_state', 'Addis Ababa', 'contact', '2026-01-31 19:37:55'),
(4, 'contact_country', 'Ethiopia', 'contact', '2026-01-31 19:37:55'),
(5, 'contact_phone', ' +251963877777', 'contact', '2026-01-31 19:37:55'),
(6, 'contact_email', '420884970@qq.com', 'contact', '2026-01-31 19:37:55'),
(7, 'contact_hours_mon_fri', '8:00 AM - 6:00 PM', 'contact', '2026-01-31 19:37:55'),
(8, 'contact_hours_sat', '9:00 AM - 4:00 PM', 'contact', '2026-01-31 19:37:55'),
(9, 'contact_hours_sun', 'Closed', 'contact', '2026-01-31 19:37:55'),
(10, 'contact_sales_email', '420884970@qq.com', 'contact', '2026-01-31 19:37:55'),
(11, 'contact_sales_phone', ' +251963877777', 'contact', '2026-01-31 19:37:55'),
(12, 'contact_tech_email', 'technical@shinningpaint.com', 'contact', '2026-01-31 19:37:55'),
(13, 'contact_tech_phone', ' +251963877777', 'contact', '2026-01-31 19:37:55'),
(14, 'contact_support_email', '420884970@qq.com', 'contact', '2026-01-31 19:37:55'),
(15, 'contact_support_phone', ' +251963877777', 'contact', '2026-01-31 19:37:55'),
(16, 'social_linkedin', 'https://linkedin.com/company/Shinningpaint', 'social', '2026-01-31 19:37:55'),
(17, 'social_twitter', 'https://twitter.com/Shinningpaint', 'social', '2026-01-31 19:37:55'),
(18, 'social_facebook', 'https://facebook.com/Shinningpaint', 'social', '2026-01-31 19:37:55'),
(19, 'social_instagram', 'https://instagram.com/Shinningpaint', 'social', '2026-01-31 19:37:55');

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` enum('active','unsubscribed') DEFAULT 'active',
  `subscribed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `email`, `status`, `subscribed_at`) VALUES
(1, 'hayaltamrat@gmail.com', 'active', '2025-12-12 13:51:16'),
(2, 'kidoastu1993@gmail.com', 'active', '2025-12-12 13:55:25'),
(3, 'hayaltamrat1@gmail.com', 'active', '2025-12-12 20:15:05'),
(4, 'berekettamrat2015@gmail.com', 'active', '2026-01-06 05:40:22'),
(5, 'berekettamrat20215@gmail.com', 'active', '2026-01-06 05:54:03');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `role` enum('owner','admin','hr','contet-manager') DEFAULT 'hr',
  `phone` varchar(20) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`, `role`, `phone`, `avatar`, `is_active`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 'admin@shiningpaint.com', '$2b$12$eD9j1ci/iCQT1SUqhA8fzOz3vvqAnlVrrUepdQ/8uxeBYIz7tDcMu', 'Admin', 'User', 'admin', '+1-555-0001', NULL, 1, '2025-12-13 07:57:22', '2025-08-17 16:47:58', '2025-12-13 07:57:22'),
(2, 'manager@shiningpaint.com', '$2b$12$4BFXsmzF/2cDvFevEUNlwOYEzj03fYaUP6x9R7sNye9Y8n4JDoLwy', 'Manager', 'User', 'hr', '+1-555-0002', NULL, 1, '2026-02-01 11:10:39', '2025-08-17 16:47:58', '2026-02-01 11:11:21'),
(3, 'employee@shiningpaint.com', '$2b$12$yR0NR8Vn8Vz9QWx0En3w9Ov03p6MmOsXi9klr4Htqdsz7e4BDRiHi', 'Employee', 'User', 'admin', '+1-555-0003', NULL, 1, NULL, '2025-08-17 16:47:59', '2026-01-31 19:54:45'),
(118, 'hayaltamrat@gmail.com', '$2b$12$zE1HT9C5MNEeTcuRCPE87eDcMKqvWRXaKFTPaMEYHcFMGHzBQ3pby', 'hayal', 'tamrat', 'admin', '0913566735', NULL, 1, NULL, '2025-12-12 11:41:01', '2025-12-12 11:41:01'),
(119, 'test@shiningpaint.com', '$2b$12$rdvSL60k0dqntNW1E8CgiuwCqJDpUPDT4y4Qb64tEsCbsWMxKo7Xi', 'Bereket', 'Tamrat', 'admin', '0913566735', NULL, 1, NULL, '2025-12-12 11:45:17', '2025-12-12 11:45:17'),
(123, 'test1@shiningpaint.com', '$2b$12$meu9YOz8YlNpUjKC8PYFIukERJxjPBLEkcWwIC8bMNdvhLElnTOmS', 'Bereket', 'Tamrat', 'admin', '0913566735', NULL, 1, '2026-02-01 11:41:43', '2025-12-12 11:46:10', '2026-02-01 11:41:43'),
(328, 'admin@ Shinningpaint.com', '$2b$12$4D3xE1968V6C5rhWfuuKuuNDU.czhr0htSnEi0fwCmu3Uw14I5yB.', 'Admin', 'User', 'admin', '+1-555-0001', NULL, 1, NULL, '2025-12-12 20:09:51', '2025-12-12 20:09:51'),
(329, 'manager@ Shinningpaint.com', '$2b$12$XctyQQd1KDEHZHfxz.4ai.souoNrSaBqkq8unR8K5lOVC6cSeAx7W', 'Manager', 'User', '', '+1-555-0002', NULL, 1, NULL, '2025-12-12 20:09:51', '2025-12-12 20:09:51'),
(330, 'employee@shinningpaint.com', '$2b$12$j5C1aa9Znw7/bwIy7fDkjO9QfZL2YnJh5.YQeA00QyFx4eLz1SaYa', 'Employee', 'User', '', '+1-555-0003', NULL, 1, NULL, '2025-12-12 20:09:52', '2026-01-31 19:54:35'),
(334, 'hr@gmail.com', '$2b$12$WTO9ar2RbslCKgAfC2LggeHxXFBfZkN5Y3O/KE.FP1.gMlRO9i.Gu', 'nathay', 'tamrat', 'hr', '+251916048977', NULL, 1, '2026-02-01 11:04:26', '2026-01-31 20:09:23', '2026-02-01 11:04:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `careers`
--
ALTER TABLE `careers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assigned_to` (`assigned_to`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_type` (`customer_type`),
  ADD KEY `idx_active` (`is_active`);

--
-- Indexes for table `hero_sections`
--
ALTER TABLE `hero_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `idx_product` (`product_id`),
  ADD KEY `idx_type` (`transaction_type`),
  ADD KEY `idx_date` (`created_at`);

--
-- Indexes for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `career_id` (`career_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_published` (`is_published`);

--
-- Indexes for table `offices`
--
ALTER TABLE `offices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_number` (`order_number`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `idx_order_number` (`order_number`),
  ADD KEY `idx_customer` (`customer_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_date` (`order_date`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_order` (`order_id`),
  ADD KEY `idx_product` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `idx_sku` (`sku`),
  ADD KEY `idx_category` (`category_id`),
  ADD KEY `idx_active` (`is_active`),
  ADD KEY `idx_stock` (`stock_quantity`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_parent` (`parent_id`),
  ADD KEY `idx_active` (`is_active`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key` (`key`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_role` (`role`),
  ADD KEY `idx_active` (`is_active`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `careers`
--
ALTER TABLE `careers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=331;

--
-- AUTO_INCREMENT for table `hero_sections`
--
ALTER TABLE `hero_sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `job_applications`
--
ALTER TABLE `job_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `offices`
--
ALTER TABLE `offices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=552;

--
-- AUTO_INCREMENT for table `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=551;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=335;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  ADD CONSTRAINT `contact_submissions_ibfk_1` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
  ADD CONSTRAINT `inventory_transactions_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inventory_transactions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD CONSTRAINT `job_applications_ibfk_1` FOREIGN KEY (`career_id`) REFERENCES `careers` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD CONSTRAINT `product_categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `product_categories` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
