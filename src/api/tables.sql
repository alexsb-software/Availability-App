-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2017 at 10:51 PM
-- Server version: 5.7.14
-- PHP Version: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hr`
--

-- --------------------------------------------------------

--
-- Table structure for table `committee`
--

CREATE TABLE `committee` (
  `committee_id` int(3) NOT NULL,
  `committee_name` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `day`
--

CREATE TABLE `day` (
  `id` int(5) NOT NULL,
  `dayDate` varchar(100) NOT NULL,
  `event_id` int(5) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `day`
--

INSERT INTO `day` (`id`, `dayDate`, `event_id`) VALUES
(1, '2017-02-11', 1),
(2, '2017-08-01', 1),
(9, '2017-2-1', 16),
(8, '2017-2-1', 15),
(10, '2017-2-1', 17),
(11, 'Thu Jan 01 1970 02:00:00 GMT+0200', 18);

-- --------------------------------------------------------

--
-- Table structure for table `eventt`
--

CREATE TABLE `eventt` (
  `event_id` int(3) NOT NULL,
  `event_name` varchar(20) NOT NULL,
  `event_date` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `eventt`
--

INSERT INTO `eventt` (`event_id`, `event_name`, `event_date`) VALUES
(1, 'EDM', '2017-02-11'),
(18, 'EDM', NULL),
(17, 'EDM', NULL),
(16, 'EDM', NULL),
(15, 'EDM', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `name` varchar(155) NOT NULL,
  `email` varchar(155) NOT NULL,
  `password` varchar(20) NOT NULL,
  `auth_token` varchar(300) DEFAULT NULL,
  `committees` varchar(300) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `name`, `email`, `password`, `auth_token`, `committees`) VALUES
(1, 'mahmoud', 'test@test.com', '12345', '07a897ec0fea6c23fd691e2ef2f1e543fd2d74b5f540cca850349ba67fa9', 'Activities, Marketing');

-- --------------------------------------------------------

--
-- Table structure for table `member_shift_committee`
--

CREATE TABLE `member_shift_committee` (
  `member_id` int(5) NOT NULL,
  `shift_id` int(3) NOT NULL,
  `event_id` int(5) NOT NULL,
  `day_id` int(5) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member_shift_committee`
--

INSERT INTO `member_shift_committee` (`member_id`, `shift_id`, `event_id`, `day_id`) VALUES
(1, 3, 1, 2),
(1, 2, 1, 1),
(1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `notes` text NOT NULL,
  `reporting` int(5) NOT NULL,
  `pr` int(5) NOT NULL,
  `shift_id` int(5) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`id`, `name`, `notes`, `reporting`, `pr`, `shift_id`) VALUES
(1, 'First session', 'some notes', 1, 1, 1),
(2, 'Second sessions', 'SOME notes', 1, 1, 1),
(3, 'third session', 'nooooootes', 1, 1, 2),
(4, 'session sup', 'for the love of god work', 1, 2, 5),
(5, 'session sup', 'for the love of god work', 1, 2, 6),
(6, 'session sup', 'for the love of god work', 1, 2, 7),
(7, 'session sup', 'for the love of god work', 1, 2, 8);

-- --------------------------------------------------------

--
-- Table structure for table `shift`
--

CREATE TABLE `shift` (
  `shift_id` int(3) NOT NULL,
  `shift_start` varchar(150) DEFAULT NULL,
  `shift_end` varchar(150) DEFAULT NULL,
  `shift_number` int(5) NOT NULL,
  `day_id` int(5) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shift`
--

INSERT INTO `shift` (`shift_id`, `shift_start`, `shift_end`, `shift_number`, `day_id`) VALUES
(1, '2017-02-14 00:00:00', '2017-02-14 00:00:00', 1, 1),
(2, '2017-02-14 00:00:00', '2017-02-14 00:00:00', 1, 1),
(3, '2017-02-14 00:00:00', '2017-02-14 00:00:00', 1, 2),
(6, '2017-02-14 12:00:00', '2017-02-14 13:00:00', 2, 8),
(7, '2017-02-01 12:00:00', '2017-02-02 13:00:00', 2, 10),
(8, 'Thu Jan 01 1970 02:00:00 GMT+0200', 'Thu Jan 01 1970 02:00:00 GMT+0200', 2, 11);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `committee`
--
ALTER TABLE `committee`
  ADD PRIMARY KEY (`committee_id`);

--
-- Indexes for table `day`
--
ALTER TABLE `day`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `eventt`
--
ALTER TABLE `eventt`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member_shift_committee`
--
ALTER TABLE `member_shift_committee`
  ADD PRIMARY KEY (`member_id`,`shift_id`,`event_id`),
  ADD KEY `shift_id` (`shift_id`),
  ADD KEY `event_date` (`event_id`),
  ADD KEY `day_id` (`day_id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reporting` (`reporting`),
  ADD KEY `pr` (`pr`),
  ADD KEY `shift_id` (`shift_id`);

--
-- Indexes for table `shift`
--
ALTER TABLE `shift`
  ADD PRIMARY KEY (`shift_id`),
  ADD KEY `day_id` (`day_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `day`
--
ALTER TABLE `day`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `eventt`
--
ALTER TABLE `eventt`
  MODIFY `event_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `shift`
--
ALTER TABLE `shift`
  MODIFY `shift_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
