-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 17, 2018 at 09:57 AM
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
('lBAJrE0z03cbaaSyNtUM8brBJINwzF5B', 1529308351, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"admin":{"name":"Kiran Kumar Das","categoryname":"SUPER USER","phone":"9563152391","password":"7e7fc4f8169a251ca2f4dac9e08186af","email":"kirankumardas224@gmail.com","address":"kolkata","dob":"18/09/1997","gender":"MALE"}}'),
('nvyRdpw0KE9FAsBOaP5XvNYw79kdRJ5Z', 1529308312, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"admin":{"name":"Kiran Kumar Das","categoryname":"SUPER USER","phone":"9563152391","password":"7e7fc4f8169a251ca2f4dac9e08186af","email":"kirankumardas224@gmail.com","address":"kolkata","dob":"18/09/1997","gender":"MALE"}}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
