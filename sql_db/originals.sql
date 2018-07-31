-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 31, 2018 at 06:30 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `originals`
--

-- --------------------------------------------------------

--
-- Table structure for table `admincategory`
--

CREATE TABLE `admincategory` (
  `categoryname` varchar(50) NOT NULL,
  `adminnumber` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admincategory`
--

INSERT INTO `admincategory` (`categoryname`, `adminnumber`) VALUES
('SUPER USER', 1);

-- --------------------------------------------------------

--
-- Table structure for table `adminlist`
--

CREATE TABLE `adminlist` (
  `name` varchar(50) NOT NULL,
  `categoryname` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `dob` varchar(10) NOT NULL,
  `gender` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `adminlist`
--

INSERT INTO `adminlist` (`name`, `categoryname`, `phone`, `password`, `email`, `address`, `dob`, `gender`) VALUES
('Kiran Kumar Das', 'SUPER USER', '9563152391', '7e7fc4f8169a251ca2f4dac9e08186af', 'kirankumardas224@gmail.com', 'kolkata', '18/09/1997', 'MALE');

-- --------------------------------------------------------

--
-- Table structure for table `carousel_main`
--

CREATE TABLE `carousel_main` (
  `poster_name` varchar(50) NOT NULL,
  `poster_image_link` varchar(100) NOT NULL,
  `poster_link` varchar(50) NOT NULL,
  `created_on` varchar(50) NOT NULL,
  `created_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `carousel_main`
--

INSERT INTO `carousel_main` (`poster_name`, `poster_image_link`, `poster_link`, `created_on`, `created_by`) VALUES
('kanakkumar', '/carousel_images/kanakkumar.jpg', 'gmail.com', '2018-07-30 23:09:43.817', 'Kiran Kumar Das'),
('slider3', '/carousel_images/slider3.jpg', '#', '2018-07-15 22:53:58.985', 'Kiran Kumar Das');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` varchar(4) NOT NULL,
  `size_id` varchar(50) DEFAULT NULL,
  `size_name` varchar(50) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `event_id` varchar(50) DEFAULT NULL,
  `event_name` varchar(50) NOT NULL,
  `type_id` varchar(50) NOT NULL,
  `type_name` varchar(50) NOT NULL,
  `tags` text NOT NULL,
  `images` text NOT NULL,
  `added_by` varchar(50) NOT NULL,
  `added_on` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `price`, `size_id`, `size_name`, `gender`, `event_id`, `event_name`, `type_id`, `type_name`, `tags`, `images`, `added_by`, `added_on`) VALUES
('item-1tqqnmonjk8p66vs', 'kiran', '100', 'cat-level1-1tqqnc1gjk8kdter', 'T-shirt', 'No', 'cat-level3-1tqqnaqhjjpvt8h9', 'Durga puja', 'cat-level4-1tqqnbd9jjyik1zl', 'T-shirt', 'kar,lo ', '{"1":"uploads/T-shirt/item-1tqqnmonjk8p66vs/1_jjYC9tuf4C3HkHCP5PcKTA.jpeg","2":"uploads/T-shirt/item-1tqqnmonjk8p66vs/cyclist_starry_sky_silhouette_118161_3840x2400.jpg","3":"uploads/T-shirt/item-1tqqnmonjk8p66vs/live_like_you_are_dying_beautiful_quote_hd_wallpapers.jpg","4":"uploads/T-shirt/item-1tqqnmonjk8p66vs/WHDQ-513071895.jpg"}', 'Kiran Kumar Das', '2018-07-31 01:29:33.207'),
('item-1tqqnmonjk8p7hk5', 'kanak', '100', 'cat-level1-1tqqndhrjjyja25c', 'card-size', 'Both', 'cat-level3-1tqqnkv5jk5d4rhm', 'e-id', 'cat-level4-1tqqna3yjjyiarar', 'cards', 'yo,yo ', '{"1":"uploads/cards/item-1tqqnmonjk8p7hk5/1_jjYC9tuf4C3HkHCP5PcKTA.jpeg","2":"uploads/cards/item-1tqqnmonjk8p7hk5/cyclist_starry_sky_silhouette_118161_3840x2400.jpg","3":"uploads/cards/item-1tqqnmonjk8p7hk5/live_like_you_are_dying_beautiful_quote_hd_wallpapers.jpg","4":"uploads/cards/item-1tqqnmonjk8p7hk5/WHDQ-513071895.jpg"}', 'Kiran Kumar Das', '2018-07-31 01:30:33.701');

-- --------------------------------------------------------

--
-- Table structure for table `item_category_level1`
--

CREATE TABLE `item_category_level1` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `size` text NOT NULL,
  `for_item` varchar(50) NOT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_on` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item_category_level1`
--

INSERT INTO `item_category_level1` (`id`, `name`, `size`, `for_item`, `created_by`, `created_on`) VALUES
('cat-level1-1tqqnbwujjyirdye', 'T-shirt sizes', '{"cat_item_1":"s","cat_item_2":"m","cat_item_3":"l","cat_item_4":"x","cat_item_5":"xl"}', 'cat-level4-1tqqnbd9jjyik1zl', 'Kiran Kumar Das', '2018-07-23 22:32:23.080'),
('cat-level1-1tqqnc1gjk8kdter', 'T-shirt', '{"cat_item_1":"smallll","cat_item_2":"largeee"}', 'cat-level4-1tqqnbd9jjyik1zl', 'Kiran Kumar Das', '2018-07-30 23:15:30.916'),
('cat-level1-1tqqncgkjk8kgxu5', 'T-shirt', '{"cat_item_1":"smallll","cat_item_2":"largeee"}', 'cat-level4-1tqqnbd9jjyik1zl', 'Kiran Kumar Das', '2018-07-30 23:17:56.622'),
('cat-level1-1tqqncgkjk8kh11f', 'T-shirt', '{"cat_item_1":"smallll","cat_item_2":"largeee"}', 'cat-level4-1tqqnbd9jjyik1zl', 'Kiran Kumar Das', '2018-07-30 23:18:00.773'),
('cat-level1-1tqqndhrjjyja25c', 'card-size', '{"cat_item_1":"small","cat_item_2":"big"}', 'cat-level4-1tqqna3yjjyiarar', 'Kiran Kumar Das', '2018-07-23 22:46:54.242'),
('cat-level1-1tqqnfv5jjyk76t1', 'card2', '{"cat_item_1":"sasta","cat_item_2":"premium"}', 'cat-level4-1tqqna3yjjyiarar', 'Kiran Kumar Das', '2018-07-23 23:12:39.931'),
('cat-level1-1tqqnlaejk5d9ebj', 't-sizes', '{"cat_item_1":"6","cat_item_2":"8"}', 'cat-level4-1tqqnbd9jjyik1zl', 'Kiran Kumar Das', '2018-07-28 17:32:48.897');

-- --------------------------------------------------------

--
-- Table structure for table `item_category_level2`
--

CREATE TABLE `item_category_level2` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_on` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item_category_level2`
--

INSERT INTO `item_category_level2` (`id`, `name`, `created_by`, `created_on`) VALUES
('cat-level2-1tqqn8hkjjpv0xhr', 'Male', 'Kiran Kumar Das', '2018-07-17 21:08:21.695'),
('cat-level2-1tqqn8hkjjpv0xjj', 'Female', 'Kiran Kumar Das', '2018-07-17 21:08:21.695'),
('cat-level2-1tqqn8hkjjpv7kpq', 'Both Male and Female', 'Kiran Kumar Das', '2018-07-17 21:08:21.695');

-- --------------------------------------------------------

--
-- Table structure for table `item_category_level3`
--

CREATE TABLE `item_category_level3` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_on` varchar(50) NOT NULL,
  `created_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item_category_level3`
--

INSERT INTO `item_category_level3` (`id`, `name`, `created_on`, `created_by`) VALUES
('cat-level3-1tqqnaqhjjpvt8h9', 'Durga puja', '2018-07-17 21:27:48.719', 'Kiran Kumar Das'),
('cat-level3-1tqqnkv5jk5d4rhm', 'e-id', '2018-07-28 17:29:12.685', 'Kiran Kumar Das');

-- --------------------------------------------------------

--
-- Table structure for table `item_category_level4`
--

CREATE TABLE `item_category_level4` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_on` varchar(50) NOT NULL,
  `created_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item_category_level4`
--

INSERT INTO `item_category_level4` (`id`, `name`, `created_on`, `created_by`) VALUES
('cat-level4-1tqqna3yjjyiarar', 'cards', '2018-07-23 22:19:27.229', 'Kiran Kumar Das'),
('cat-level4-1tqqnbd9jjyik1zl', 'T-shirt', '2018-07-23 22:26:40.997', 'Kiran Kumar Das'),
('cat-level4-1tqqnctejk8kjlpr', 'Coca cola', '2018-07-30 23:20:00.902', 'Kiran Kumar Das'),
('cat-level4-1tqqnkv5jk5d6s1b', 'Chocolate', '2018-07-28 17:30:46.728', 'Kiran Kumar Das');

-- --------------------------------------------------------

--
-- Table structure for table `promocode`
--

CREATE TABLE `promocode` (
  `id` varchar(50) NOT NULL,
  `type` varchar(15) NOT NULL,
  `promocode` varchar(8) NOT NULL,
  `percentage` varchar(3) NOT NULL,
  `upto` varchar(5) NOT NULL,
  `no_of_times_used` int(11) NOT NULL,
  `created_by` varchar(20) NOT NULL,
  `created_on` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `promocode`
--

INSERT INTO `promocode` (`id`, `type`, `promocode`, `percentage`, `upto`, `no_of_times_used`, `created_by`, `created_on`) VALUES
('promo-1tqqn87kjk5sss31', 'cashback', 'NEW50', '50', '300', 0, 'Kiran Kumar Das', '2018-07-29 00:47:47.436'),
('promo-1tqqn87kjk5st6zm', 'cashback', 'GRUB50', '50', '500', 0, 'Kiran Kumar Das', '2018-07-29 00:48:06.754');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('fDYtcUskGW_bFU3QIKYZrNUyyoJQoipS', 1533014129, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"flash":{},"admin":{"name":"Kiran Kumar Das","categoryname":"SUPER USER","phone":"9563152391","password":"7e7fc4f8169a251ca2f4dac9e08186af","email":"kirankumardas224@gmail.com","address":"kolkata","dob":"18/09/1997","gender":"MALE"}}');

-- --------------------------------------------------------

--
-- Table structure for table `tempuserlist`
--

CREATE TABLE `tempuserlist` (
  `name` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `age` varchar(3) NOT NULL,
  `timeofquery` varchar(50) NOT NULL,
  `otp` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `userlist`
--

CREATE TABLE `userlist` (
  `name` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `age` varchar(3) NOT NULL,
  `timeofquery` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userlist`
--

INSERT INTO `userlist` (`name`, `phone`, `password`, `email`, `gender`, `age`, `timeofquery`) VALUES
('kanak das', '8293349079', '7e7fc4f8169a251ca2f4dac9e08186af', 'kirankumardas18091997@gmail.com', 'male', '11', '2018-07-25 00:20:35'),
('kanak das', '9563152391', '7e7fc4f8169a251ca2f4dac9e08186af', 'kirankumardas224@gmail.com', 'female', '55', '2018-07-27 22:31:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admincategory`
--
ALTER TABLE `admincategory`
  ADD PRIMARY KEY (`categoryname`);

--
-- Indexes for table `adminlist`
--
ALTER TABLE `adminlist`
  ADD PRIMARY KEY (`phone`);

--
-- Indexes for table `carousel_main`
--
ALTER TABLE `carousel_main`
  ADD PRIMARY KEY (`poster_name`),
  ADD UNIQUE KEY `poster_name` (`poster_name`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gender` (`gender`),
  ADD KEY `item_type` (`type_name`),
  ADD KEY `event_type` (`event_id`);

--
-- Indexes for table `item_category_level1`
--
ALTER TABLE `item_category_level1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_category_level2`
--
ALTER TABLE `item_category_level2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_category_level3`
--
ALTER TABLE `item_category_level3`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_category_level4`
--
ALTER TABLE `item_category_level4`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `promocode`
--
ALTER TABLE `promocode`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `tempuserlist`
--
ALTER TABLE `tempuserlist`
  ADD PRIMARY KEY (`phone`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `userlist`
--
ALTER TABLE `userlist`
  ADD PRIMARY KEY (`phone`),
  ADD UNIQUE KEY `email` (`email`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
