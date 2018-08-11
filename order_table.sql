-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 11, 2018 at 12:07 PM
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
-- Table structure for table `order_table`
--

CREATE TABLE `order_table` (
  `order_id` varchar(30) NOT NULL,
  `user_phone` varchar(10) NOT NULL,
  `items` text NOT NULL,
  `total_price` int(10) NOT NULL,
  `promocode` varchar(10) NOT NULL,
  `discount` int(10) NOT NULL,
  `cashback` int(10) NOT NULL,
  `used_wallet_point` int(11) NOT NULL,
  `cashback_for_items` int(11) NOT NULL,
  `net_amount` int(10) NOT NULL,
  `delivery_charge` int(10) NOT NULL,
  `net_amount_with_delivery_charge` int(10) NOT NULL,
  `address` text NOT NULL,
  `address_contact` varchar(10) NOT NULL,
  `date` text NOT NULL,
  `order_status` varchar(20) NOT NULL,
  `payment_status` varchar(20) NOT NULL,
  `payment_id` varchar(30) NOT NULL,
  `longurl` text NOT NULL,
  `amount_paid` int(10) NOT NULL,
  `instamojo_fees` decimal(10,0) NOT NULL,
  `mac` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_table`
--

INSERT INTO `order_table` (`order_id`, `user_phone`, `items`, `total_price`, `promocode`, `discount`, `cashback`, `used_wallet_point`, `cashback_for_items`, `net_amount`, `delivery_charge`, `net_amount_with_delivery_charge`, `address`, `address_contact`, `date`, `order_status`, `payment_status`, `payment_id`, `longurl`, `amount_paid`, `instamojo_fees`, `mac`) VALUES
('order-u3tgntp6jkp8lw4h', '1234567890', '{"items":[{"id":"cart-u3tgn10lnjkoi42ba","item_id":"item-1tqqnjsgjkcs1avh","item_name":"sloth T","item_type":"T-shirt","no_of_items":23,"size":"xl","color":"#1d2de0","price":"300","total":6900,"image":"uploads/T-shirt/item-1tqqnjsgjkcs1avh/a.jpeg","cashback":30,"delivery_charge":30,"total_delivery_charge":690}]}', 6900, 'NEW50', 0, 300, 0, 690, 6900, 690, 7590, 'room no 206,treebo house inn,noida, sector 71,', '9563152391', '2018-08-11 11:48:21.238', 'placed', 'Credit', 'MOJO8811005A82086559', 'https://test.instamojo.com/@kirankumardas224/2ebbf504152e43209f765e692d547325', 7590, '144', '1821b18a040861892e9f0ece4043f5966a54769a'),
('order-u3tgntp6jkp8qyam', '1234567890', '{"items":[{"id":"cart-u3tgn10lnjkoi42ba","item_id":"item-1tqqnjsgjkcs1avh","item_name":"sloth T","item_type":"T-shirt","no_of_items":23,"size":"xl","color":"#1d2de0","price":"300","total":6900,"image":"uploads/T-shirt/item-1tqqnjsgjkcs1avh/a.jpeg","cashback":30,"delivery_charge":30,"total_delivery_charge":690}]}', 6900, '', 0, 0, 0, 690, 6900, 690, 7590, 'room no 206,treebo house inn,noida, sector 71,', '9563152391', '2018-08-11 11:57:14.307', 'placed', 'Credit', 'MOJO8811005A82086567', 'https://test.instamojo.com/@kirankumardas224/56b6a03eeecd4f0593cd0f2a952fd9f3', 7590, '144', 'e2a24bc069bae39b09a969583c0720c6cf2e745e'),
('order-u3tgnxe5jkpamrh9', '1234567890', '{"items":[{"id":"cart-u3tgn10lnjkoi42ba","item_id":"item-1tqqnjsgjkcs1avh","item_name":"sloth T","item_type":"T-shirt","no_of_items":23,"size":"xl","color":"#1d2de0","price":"300","total":6900,"image":"uploads/T-shirt/item-1tqqnjsgjkcs1avh/a.jpeg","cashback":30,"delivery_charge":30,"total_delivery_charge":690}]}', 6900, '', 0, 0, 0, 690, 6900, 690, 7590, 'room no 206,treebo house inn,noida, sector 71,', '9563152391', '2018-08-11 12:45:04.962', 'placed', 'Credit', 'MOJO8811005A82086604', 'https://test.instamojo.com/@kirankumardas224/73eefda123d040579ca6c4160677174b', 7590, '144', '486da741373dc3be171386461f8e9ffc1f1840cb'),
('order-u3tgny02jkpaydyx', '1234567890', '{"items":[{"id":"cart-u3tgn10lnjkoi42ba","item_id":"item-1tqqnjsgjkcs1avh","item_name":"sloth T","item_type":"T-shirt","no_of_items":23,"size":"xl","color":"#1d2de0","price":"300","total":6900,"image":"uploads/T-shirt/item-1tqqnjsgjkcs1avh/a.jpeg","cashback":30,"delivery_charge":30,"total_delivery_charge":690}]}', 6900, '', 0, 0, 0, 690, 6900, 690, 7590, 'room no 206,treebo house inn,noida, sector 71,', '9563152391', '2018-08-11 12:53:58.872', 'placed', 'Credit', 'MOJO8811005A82086619', 'https://test.instamojo.com/@kirankumardas224/cd447c73dabb40d2a7da330c0c7a820a', 7590, '144', '47960e2d1d4c9864d50c20d3f5c6df7884c858ee'),
('order-u3tgny2ujkpb01jo', '1234567890', '{"items":[{"id":"cart-u3tgn10lnjkoi42ba","item_id":"item-1tqqnjsgjkcs1avh","item_name":"sloth T","item_type":"T-shirt","no_of_items":23,"size":"xl","color":"#1d2de0","price":"300","total":6900,"image":"uploads/T-shirt/item-1tqqnjsgjkcs1avh/a.jpeg","cashback":30,"delivery_charge":30,"total_delivery_charge":690}]}', 6900, '', 0, 0, 0, 690, 6900, 690, 7590, 'room no 206,treebo house inn,noida, sector 71,', '9563152391', '2018-08-11 12:55:14.724', 'placed', 'Credit', 'MOJO8811005A82086622', 'https://test.instamojo.com/@kirankumardas224/7c1698bd04fb4eb0829a7e0454e0a352', 7590, '144', '228d661c476dfea69c8ff7a9dd4a637634477905'),
('order-u3tgnyfijkpb3von', '1234567890', '{"items":[{"id":"cart-u3tgn10lnjkoi42ba","item_id":"item-1tqqnjsgjkcs1avh","item_name":"sloth T","item_type":"T-shirt","no_of_items":23,"size":"xl","color":"#1d2de0","price":"300","total":6900,"image":"uploads/T-shirt/item-1tqqnjsgjkcs1avh/a.jpeg","cashback":30,"delivery_charge":30,"total_delivery_charge":690}]}', 6900, '', 0, 0, 0, 690, 6900, 690, 7590, 'room no 206,treebo house inn,noida, sector 71,', '9563152391', '2018-08-11 12:58:18.750', 'placed', 'Credit', 'MOJO8811005A82086624', 'https://test.instamojo.com/@kirankumardas224/18a3309661da421c9fc22c7073e97bed', 7590, '144', 'd620c4b6eab37471fe51ec1467a95bb9873397eb'),
('order-u3tgnyhtjkpb6kqm', '1234567890', '{"items":[{"id":"cart-u3tgn10lnjkoi42ba","item_id":"item-1tqqnjsgjkcs1avh","item_name":"sloth T","item_type":"T-shirt","no_of_items":23,"size":"xl","color":"#1d2de0","price":"300","total":6900,"image":"uploads/T-shirt/item-1tqqnjsgjkcs1avh/a.jpeg","cashback":30,"delivery_charge":30,"total_delivery_charge":690}]}', 6900, '', 0, 0, 0, 690, 6900, 690, 7590, 'room no 206,treebo house inn,noida, sector 71,', '9563152391', '2018-08-11 13:00:22.552', 'placed', 'Credit', 'MOJO8811005A82086625', 'https://test.instamojo.com/@kirankumardas224/c969eacc87c746f9ab619fb5b18c1a34', 7590, '144', '45faa5acabd17fb783340fd69bf3b616524c93c8'),
('order-u3tgnyqyjkpb8vau', '1234567890', '{"items":[{"id":"cart-u3tgn10lnjkoi42ba","item_id":"item-1tqqnjsgjkcs1avh","item_name":"sloth T","item_type":"T-shirt","no_of_items":23,"size":"xl","color":"#1d2de0","price":"300","total":6900,"image":"uploads/T-shirt/item-1tqqnjsgjkcs1avh/a.jpeg","cashback":30,"delivery_charge":30,"total_delivery_charge":690}]}', 6900, '', 0, 0, 0, 690, 6900, 690, 7590, 'room no 206,treebo house inn,noida, sector 71,', '9563152391', '2018-08-11 13:02:14.912', 'placed', 'Credit', 'MOJO8811005A82086628', 'https://test.instamojo.com/@kirankumardas224/7e26e09225d34326ba4b4ec715e5f11d', 7590, '144', '71be3e6c21b65e1e640316da684474c92ef7fc8c');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order_table`
--
ALTER TABLE `order_table`
  ADD PRIMARY KEY (`order_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
