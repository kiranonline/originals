-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 17, 2018 at 07:14 PM
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
  `password` varchar(100) NOT NULL,
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
  `poster_name` varchar(100) NOT NULL,
  `poster_image_link` varchar(100) NOT NULL,
  `poster_link` varchar(100) NOT NULL,
  `created_on` varchar(100) NOT NULL,
  `created_by` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `carousel_main`
--

INSERT INTO `carousel_main` (`poster_name`, `poster_image_link`, `poster_link`, `created_on`, `created_by`) VALUES
('slide1', '/carousel_images/slide1.jpg', '#', '2018-07-15 22:53:34.296', 'Kiran Kumar Das'),
('slider1', '/carousel_images/slider1.jpg', '#', '2018-07-15 22:53:47.193', 'Kiran Kumar Das'),
('slider3', '/carousel_images/slider3.jpg', '#', '2018-07-15 22:53:58.985', 'Kiran Kumar Das');

-- --------------------------------------------------------

--
-- Table structure for table `item_category_level1`
--

CREATE TABLE `item_category_level1` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `size` text NOT NULL,
  `for_item` varchar(100) NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `created_on` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item_category_level1`
--

INSERT INTO `item_category_level1` (`id`, `name`, `size`, `for_item`, `created_by`, `created_on`) VALUES
('cat-level1-1tqqnaqhjjpvu7cw', 'T-shirt size 1', '{"cat_item_1":"s","cat_item_2":"m","cat_item_3":"l","cat_item_4":"x","cat_item_5":"xl","cat_item_6":"xxl"}', 'cat-level4-1tqqnaqhjjpvstlk', 'Kiran Kumar Das', '2018-07-17 21:28:33.921');

-- --------------------------------------------------------

--
-- Table structure for table `item_category_level2`
--

CREATE TABLE `item_category_level2` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `created_on` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item_category_level2`
--

INSERT INTO `item_category_level2` (`id`, `name`, `created_by`, `created_on`) VALUES
('cat-level2-1tqqn8hkjjpv0xhr', 'Male', 'Kiran Kumar Das', '2018-07-17 21:08:21.695'),
('cat-level2-1tqqn8hkjjpv62fp', 'Femail', 'Kiran Kumar Das', '2018-07-17 21:08:21.695'),
('cat-level2-1tqqn8hkjjpv7kpq', 'Both Male and Female', 'Kiran Kumar Das', '2018-07-17 21:08:21.695');

-- --------------------------------------------------------

--
-- Table structure for table `item_category_level3`
--

CREATE TABLE `item_category_level3` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_on` varchar(100) NOT NULL,
  `created_by` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item_category_level3`
--

INSERT INTO `item_category_level3` (`id`, `name`, `created_on`, `created_by`) VALUES
('cat-level3-1tqqnaqhjjpvt8h9', 'Durga puja', '2018-07-17 21:27:48.719', 'Kiran Kumar Das');

-- --------------------------------------------------------

--
-- Table structure for table `item_category_level4`
--

CREATE TABLE `item_category_level4` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_on` varchar(100) NOT NULL,
  `created_by` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item_category_level4`
--

INSERT INTO `item_category_level4` (`id`, `name`, `created_on`, `created_by`) VALUES
('cat-level4-1tqqnaqhjjpvstlk', 'T-shirt', '2018-07-17 21:27:29.434', 'Kiran Kumar Das'),
('cat-level4-1tqqnaqhjjpvsxi2', 'card', '2018-07-17 21:27:34.492', 'Kiran Kumar Das');

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
('_0cnBFj0xsN7I6rgCB6ExowSOnGUXCmN', 1531849268, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"flash":{},"admin":{"name":"Kiran Kumar Das","categoryname":"SUPER USER","phone":"9563152391","password":"7e7fc4f8169a251ca2f4dac9e08186af","email":"kirankumardas224@gmail.com","address":"kolkata","dob":"18/09/1997","gender":"MALE"}}');

-- --------------------------------------------------------

--
-- Table structure for table `tempadmins`
--

CREATE TABLE `tempadmins` (
  `name` varchar(255) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `dob` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `requested` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `tempadmins`
--
ALTER TABLE `tempadmins`
  ADD PRIMARY KEY (`phone`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
