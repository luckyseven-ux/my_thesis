-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 19 Jun 2024 pada 20.06
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `percobaan`
--

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
('b5180', 'bunciet', 'bunciet@gmail.com', '$2b$10$i2Jfw9Y4aXtw4qXTXcXfteg2qDvNbYfhKdAb8v9qYG0C3RPwLCRcG', '', '2024-06-19 10:55:40', NULL, NULL),
('ee118', 'rizky', 'rizkykomplek@gmail.com', '$2b$10$7aCvu0Wl7yvxAs5BY9GRsO9wC..NMZKVwGZGSERZQvpzAmVlwhAw6', 'rizky12345', '2024-06-19 16:08:45', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `record`
--

CREATE TABLE `record` (
  `id_record` int(8) NOT NULL,
  `user_id` varchar(5) NOT NULL,
  `name` varchar(50) NOT NULL,
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
(1, 'admin', '2024-06-19 08:26:50', '2024-06-19 08:35:19'),
(2, 'admin', '2024-06-19 08:41:09', '2024-06-19 08:43:44'),
(3, 'admin', '2024-06-19 13:51:51', '2024-06-19 13:55:29'),
(4, 'rizky', '2024-06-19 14:00:12', '2024-06-19 14:00:14');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`);

--
-- Indeks untuk tabel `record`
--
ALTER TABLE `record`
  ADD PRIMARY KEY (`id_record`),
  ADD UNIQUE KEY `user_id` (`user_id`);

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
-- AUTO_INCREMENT untuk tabel `record`
--
ALTER TABLE `record`
  MODIFY `id_record` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `user_sessions`
--
ALTER TABLE `user_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `record`
--
ALTER TABLE `record`
  ADD CONSTRAINT `record_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `login` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `user_sessions`
--
ALTER TABLE `user_sessions`
  ADD CONSTRAINT `user_sessions_ibfk_1` FOREIGN KEY (`username`) REFERENCES `login` (`username`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
