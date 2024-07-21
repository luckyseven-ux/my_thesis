
CREATE DATABASE IF NOT EXISTS `percobaan` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `percobaan`;

-- --------------------------------------------------------

--
-- Struktur dari tabel `feedback`
--

CREATE TABLE `feedback` (
  `id` int(5) NOT NULL,
  `username` varchar(80) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `feedback`
--

INSERT INTO `feedback` (`id`, `username`, `content`) VALUES
(1, 'bunciet', 'asdasdasd'),
(2, 'admin', 'fxcdgvsdf');

-- --------------------------------------------------------

--
-- Struktur dari tabel `login`
--

CREATE TABLE `login` (
  `id` varchar(5) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(33) NOT NULL,
  `password` varchar(70) NOT NULL,
  `retype_password` varchar(30) NOT NULL,
  `created_time` datetime NOT NULL DEFAULT current_timestamp(),
  `reset_password_token` varchar(255) DEFAULT NULL,
  `reset_password_expires` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `login`
--

INSERT INTO `login` (`id`, `username`, `email`, `password`, `retype_password`, `created_time`, `reset_password_token`, `reset_password_expires`) VALUES
('4b0a3', 'admin', 'admin@gmail.com', '$2b$10$l0.GgDQ.ixK7ilXpKfaoqOfwPzTuXU4A4GL86.EjDMChtMAiYh/fG', 'admin', '2024-06-19 10:44:36', NULL, NULL),
('9a61d', 'Rizky Andi', 'rizkyandi26@gmail.com', '', '', '2024-06-20 21:30:15', NULL, NULL),
('b5180', 'bunciet', 'bunciet@gmail.com', '$2b$10$i2Jfw9Y4aXtw4qXTXcXfteg2qDvNbYfhKdAb8v9qYG0C3RPwLCRcG', '', '2024-06-19 10:55:40', NULL, NULL),
('ee118', 'rizky', 'rizkykomplek@gmail.com', '$2b$10$7aCvu0Wl7yvxAs5BY9GRsO9wC..NMZKVwGZGSERZQvpzAmVlwhAw6', 'rizky12345', '2024-06-19 16:08:45', '3047c0ded33c465eb1b138ff758644d76bb507d8', 1720609842561);

-- --------------------------------------------------------

--
-- Struktur dari tabel `record`
--

CREATE TABLE `record` (
  `id_record` int(8) NOT NULL,
  `user_id` varchar(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `record_time` datetime NOT NULL DEFAULT current_timestamp(),
  `pregnancies` int(3) NOT NULL,
  `glucose` int(4) NOT NULL,
  `blood_preasure` int(3) NOT NULL,
  `skin_thickness` int(3) NOT NULL,
  `insulin` int(4) NOT NULL,
  `bmi` float NOT NULL,
  `diabetes_pedigree_function` float NOT NULL,
  `age` int(3) NOT NULL,
  `outcome` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `record`
--

INSERT INTO `record` (`id_record`, `user_id`, `name`, `record_time`, `pregnancies`, `glucose`, `blood_preasure`, `skin_thickness`, `insulin`, `bmi`, `diabetes_pedigree_function`, `age`, `outcome`) VALUES
(5, '4b0a3', 'Moe', '2024-06-27 06:34:31', 2, 148, 80, 25, 10, 31.7, 0.512, 35, '71.4893639087677'),
(6, '4b0a3', 'John Doe', '2024-06-27 06:34:44', 3, 130, 72, 35, 0, 33.6, 0.627, 50, '63.142091035842896'),
(42, '4b0a3', 'Test', '2024-07-03 07:29:32', 3, 120, 80, 20, 100, 25, 0.5, 30, '79.19003367424011'),
(43, '4b0a3', 'indonesia', '2024-07-03 11:11:28', 3, 148, 72, 25, 12, 33.4, 0.325, 25, '69.42925453186035'),
(44, '4b0a3', 'web', '2024-07-03 11:37:31', 3, 149, 69, 25, 12, 33.4, 0.325, 25, '67.44630336761475'),
(45, '4b0a3', 'blablabla', '2024-07-03 11:47:32', 4, 146, 67, 28, 16, 34.2, 0.245, 25, '65.82645773887634'),
(46, 'b5180', 'storage', '2024-07-03 13:01:31', 3, 148, 72, 25, 12, 33.5, 0.325, 22, '69.77277994155884'),
(47, 'ee118', 'harem', '2024-07-03 13:18:38', 3, 148, 72, 25, 14, 31.2, 0.326, 21, '70.49424648284912'),
(48, 'b5180', 'web kain amalia', '2024-07-03 13:24:27', 3, 148, 72, 25, 12, 33.6, 0.422, 21, '69.60657238960266'),
(49, '4b0a3', 'indonesia', '2024-07-06 14:29:39', 3, 148, 72, 25, 12, 33.5, 0.325, 25, '69.40410733222961'),
(50, '4b0a3', 'indonesia', '2024-07-06 14:50:44', 3, 148, 70, 25, 12, 33.5, 0.325, 25, '68.3548092842102'),
(51, 'b5180', 'indonesia', '2024-07-06 14:57:38', 3, 148, 72, 25, 12, 33.5, 0.325, 25, '69.40410733222961'),
(52, '4b0a3', 'indonesia', '2024-07-06 15:01:08', 3, 148, 72, 25, 12, 33.5, 0.325, 25, '69.40410733222961'),
(53, '4b0a3', 'Rizky Andi Wibowo', '2024-07-07 10:51:57', 3, 148, 72, 25, 12, 33.5, 0.325, 25, '69.40410733222961'),
(54, '4b0a3', 'indonesia', '2024-07-10 11:28:04', 3, 148, 71, 25, 12, 33.5, 0.325, 25, '68.88188123703003'),
(55, '4b0a3', 'admin1', '2024-07-10 13:04:00', 3, 148, 72, 25, 12, 33.5, 0.325, 25, '69.40410733222961'),
(56, '4b0a3', 'storage', '2024-07-10 13:46:00', 3, 148, 72, 24, 12, 33.5, 0.325, 25, '69.54359412193298'),
(57, 'b5180', 'storage/opencart', '2024-07-18 10:06:34', 3, 156, 79, 31, 5, 33.4, 0.475, 35, '65.38546085357666'),
(58, 'b5180', 'storage/opencart', '2024-07-18 10:06:58', 4, 200, 79, 31, 0, 33.4, 0.475, 35, '42.36365258693695'),
(59, 'b5180', 'storage/opencart', '2024-07-18 10:07:15', 4, 200, 79, 31, 0, 33.4, 0.475, 21, '43.0659294128418'),
(60, 'b5180', 'storage/opencart', '2024-07-18 10:07:17', 4, 200, 79, 31, 0, 33.4, 0.475, 21, '43.0659294128418'),
(61, 'b5180', 'storage/opencart', '2024-07-18 10:07:40', 0, 200, 89, 37, 2, 34, 0.475, 21, '57.728856801986694');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_sessions`
--

CREATE TABLE `user_sessions` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `login_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `logout_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user_sessions`
--

INSERT INTO `user_sessions` (`id`, `username`, `login_time`, `logout_time`) VALUES
(247, 'admin', '2024-07-10 13:44:19', '2024-07-10 13:48:25'),
(248, 'admin', '2024-07-10 13:50:29', NULL),
(249, 'admin', '2024-07-12 13:03:41', '2024-07-12 13:04:17'),
(250, 'admin', '2024-07-16 09:21:43', '2024-07-16 09:22:53'),
(251, 'admin', '2024-07-16 10:37:14', '2024-07-16 10:38:15'),
(252, 'admin', '2024-07-16 12:49:58', '2024-07-16 12:58:19'),
(253, 'admin', '2024-07-16 12:59:48', '2024-07-16 13:01:10'),
(254, 'admin', '2024-07-16 13:35:35', '2024-07-16 13:36:43'),
(255, 'admin', '2024-07-17 12:51:36', '2024-07-17 12:58:15'),
(256, 'admin', '2024-07-17 13:06:01', '2024-07-17 13:08:27'),
(257, 'admin', '2024-07-17 14:31:28', '2024-07-17 14:33:16'),
(258, 'bunciet', '2024-07-18 10:04:40', '2024-07-18 10:09:26'),
(259, 'bunciet', '2024-07-18 10:17:51', '2024-07-18 10:18:51');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indeks untuk tabel `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

--
-- Indeks untuk tabel `record`
--
ALTER TABLE `record`
  ADD PRIMARY KEY (`id_record`),
  ADD KEY `record_ibfk_1` (`user_id`);

--
-- Indeks untuk tabel `user_sessions`
--
ALTER TABLE `user_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `record`
--
ALTER TABLE `record`
  MODIFY `id_record` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT untuk tabel `user_sessions`
--
ALTER TABLE `user_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=260;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `record`
--
ALTER TABLE `record`
  ADD CONSTRAINT `record_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `login` (`id`);

--
-- Ketidakleluasaan untuk tabel `user_sessions`
--
ALTER TABLE `user_sessions`
  ADD CONSTRAINT `user_sessions_ibfk_1` FOREIGN KEY (`username`) REFERENCES `login` (`username`) ON DELETE CASCADE;
--
-- Database: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pma__bookmark`
--

COMMIT;
