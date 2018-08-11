-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 11, 2018 at 02:07 PM
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
-- Table structure for table `userlist`
--

CREATE TABLE `userlist` (
  `user_id` varchar(50) NOT NULL,
  `googleid` varchar(50) DEFAULT NULL,
  `facebookid` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `age` varchar(3) DEFAULT NULL,
  `cart` text NOT NULL,
  `wallet` int(11) NOT NULL DEFAULT '0',
  `timeofquery` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userlist`
--

INSERT INTO `userlist` (`user_id`, `googleid`, `facebookid`, `name`, `phone`, `email`, `password`, `gender`, `age`, `cart`, `wallet`, `timeofquery`) VALUES
('1tqqn2cxjkpb8kbc', '108225441452472465557', NULL, 'Kiran Kumar', '9563152391', 'kirankumardas224@gmail.com', NULL, 'male', '22', '{"items":[]}', 0, '2018-08-11 16:31:34.299'),
('1tqqn2cxjkpbi5j7', '113004465941437934694', NULL, 'Kiran Kumar Dass', '8293349079', 'kirankumardas18091997@gmail.com', NULL, 'female', '23', '{"items":[{"id":"cart-1tqqnac7jkpd5voo","item_id":"item-1tqqnjsgjkcs1avh","item_name":"sloth T","item_type":"T-shirt","no_of_items":1,"size":"l","color":"#57c81d","price":"300","total":300,"image":"uploads/T-shirt/item-1tqqnjsgjkcs1avh/a.jpeg","cashback":30,"delivery_charge":30,"total_delivery_charge":30}]}', 0, '2018-08-11 16:39:01.701');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `userlist`
--
ALTER TABLE `userlist`
  ADD PRIMARY KEY (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
