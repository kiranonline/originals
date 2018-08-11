-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 11, 2018 at 12:14 PM
-- Server version: 5.7.23-0ubuntu0.16.04.1
-- PHP Version: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `theoriginals_db1`
--

-- --------------------------------------------------------

--
-- Table structure for table `temp_order`
--

CREATE TABLE `temp_order` (
  `id` varchar(30) NOT NULL,
  `user_phone` varchar(10) NOT NULL,
  `items` text NOT NULL,
  `total_price` int(11) NOT NULL,
  `promocode` varchar(10) NOT NULL,
  `discount` int(11) NOT NULL,
  `cashback` int(11) NOT NULL,
  `used_wallet_point` int(11) NOT NULL,
  `cashback_for_items` int(11) NOT NULL,
  `net_amount` int(11) NOT NULL,
  `delivery_charge` int(11) NOT NULL,
  `net_amount_with_delivery_charge` int(11) NOT NULL,
  `address` text NOT NULL,
  `address_contact` varchar(10) NOT NULL,
  `date` text NOT NULL,
  `order_status` text NOT NULL,
  `payment_status` text NOT NULL,
  `payment_status_from_instamojo` varchar(20) NOT NULL DEFAULT 'not_checked'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `temp_order`
--

INSERT INTO `temp_order` (`id`, `user_phone`, `items`, `total_price`, `promocode`, `discount`, `cashback`, `used_wallet_point`, `cashback_for_items`, `net_amount`, `delivery_charge`, `net_amount_with_delivery_charge`, `address`, `address_contact`, `date`, `order_status`, `payment_status`, `payment_status_from_instamojo`) VALUES
('order-u3tgntp6jkp8qgdf', '1234567890', '{"items":[{"id":"cart-u3tgn10lnjkoi42ba","item_id":"item-1tqqnjsgjkcs1avh","item_name":"sloth T","item_type":"T-shirt","no_of_items":23,"size":"xl","color":"#1d2de0","price":"300","total":6900,"image":"uploads/T-shirt/item-1tqqnjsgjkcs1avh/a.jpeg","cashback":30,"delivery_charge":30,"total_delivery_charge":690}]}', 6900, '', 0, 0, 0, 690, 6900, 690, 7590, 'room no 206,treebo house inn,noida, sector 71,', '9563152391', '2018-08-11 11:51:30.147', 'pending', 'pending', 'not_checked'),
('order-u3tgnxe5jkpamnu5', '1234567890', '{"items":[{"id":"cart-u3tgn10lnjkoi42ba","item_id":"item-1tqqnjsgjkcs1avh","item_name":"sloth T","item_type":"T-shirt","no_of_items":23,"size":"xl","color":"#1d2de0","price":"300","total":6900,"image":"uploads/T-shirt/item-1tqqnjsgjkcs1avh/a.jpeg","cashback":30,"delivery_charge":30,"total_delivery_charge":690}]}', 6900, '', 0, 0, 0, 690, 6900, 690, 7590, 'room no 206,treebo house inn,noida, sector 71,', '9563152391', '2018-08-11 12:44:32.428', 'pending', 'pending', 'not_checked'),
('order-u3tgnxe5jkpamnwg', '1234567890', '{"items":[{"id":"cart-u3tgn10lnjkoi42ba","item_id":"item-1tqqnjsgjkcs1avh","item_name":"sloth T","item_type":"T-shirt","no_of_items":23,"size":"xl","color":"#1d2de0","price":"300","total":6900,"image":"uploads/T-shirt/item-1tqqnjsgjkcs1avh/a.jpeg","cashback":30,"delivery_charge":30,"total_delivery_charge":690}]}', 6900, '', 0, 0, 0, 690, 6900, 690, 7590, 'room no 206,treebo house inn,noida, sector 71,', '9563152391', '2018-08-11 12:44:32.512', 'pending', 'pending', 'not_checked');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `temp_order`
--
ALTER TABLE `temp_order`
  ADD PRIMARY KEY (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
