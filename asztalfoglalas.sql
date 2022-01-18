-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Gép: localhost:3306
-- Létrehozás ideje: 2022. Jan 18. 10:45
-- Kiszolgáló verziója: 5.7.35-38
-- PHP verzió: 7.2.34-28+ubuntu18.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `asztalfoglalas`
--
CREATE DATABASE IF NOT EXISTS `asztalfoglalas` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `asztalfoglalas`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `asztalok`
--

CREATE TABLE `asztalok` (
  `asztalok_id` int(11) NOT NULL,
  `etterem_id` int(11) NOT NULL,
  `asztal_megnevezes` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `fo` int(11) NOT NULL,
  `foglalt` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `asztalok`
--

INSERT INTO `asztalok` (`asztalok_id`, `etterem_id`, `asztal_megnevezes`, `fo`, `foglalt`) VALUES
(1, 1, '1', 3, 1),
(2, 1, '2', 2, 0),
(3, 1, '3', 4, 0),
(4, 1, '4', 3, 0),
(5, 1, '5', 2, 0),
(6, 2, '1', 4, 0),
(7, 2, '2', 4, 1),
(8, 2, '3', 3, 0),
(9, 2, '4', 2, 0),
(10, 2, '5', 2, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ertek`
--

CREATE TABLE `ertek` (
  `ertek_id` int(11) NOT NULL,
  `ertek_etterem_id` int(11) NOT NULL,
  `ertek_szam` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `ertek`
--

INSERT INTO `ertek` (`ertek_id`, `ertek_etterem_id`, `ertek_szam`) VALUES
(1, 1, 4),
(2, 1, 5),
(3, 1, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ertekeles`
--

CREATE TABLE `ertekeles` (
  `ert_id` int(11) NOT NULL,
  `Etterem_id` int(11) NOT NULL,
  `ert` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `ertekeles`
--

INSERT INTO `ertekeles` (`ert_id`, `Etterem_id`, `ert`) VALUES
(19, 0, 5),
(20, 0, 4),
(21, 0, 5),
(22, 0, 4),
(36, 0, 4),
(39, 0, 5),
(40, 0, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `etlapok`
--

CREATE TABLE `etlapok` (
  `id` int(11) NOT NULL,
  `etterem_id` int(11) NOT NULL,
  `nev` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `tipus_id` int(11) NOT NULL,
  `ar` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `etlapok`
--

INSERT INTO `etlapok` (`id`, `etterem_id`, `nev`, `tipus_id`, `ar`) VALUES
(1, 1, 'Paradicsom leves', 1, '1500'),
(2, 2, 'Cézár saláta', 5, '800'),
(3, 2, 'Karalábé', 1, '1100'),
(4, 2, 'Rántott sajt, rizzsel, tartármártás', 6, '900'),
(5, 1, 'Sült krumpli', 5, '600');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `etterem`
--

CREATE TABLE `etterem` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `lakcim` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `telefon` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `nyitas` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `kep` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `etterem`
--

INSERT INTO `etterem` (`id`, `nev`, `lakcim`, `telefon`, `nyitas`, `kep`) VALUES
(1, 'Csokonai Étterem', 'Debrecen, Kossuth u. 21, 4024', '(06 52) 410 802', 'hétfő-péntek	12:00–22:30', '1.jpg'),
(2, 'Blaháné Étterem', 'Debrecen, Blaháné u. 13, 4024', '(06 52) 315 318', 'hétfő-péntek	11:00–13:00', '2.jpg'),
(3, 'Hajdúsági Étterem (Gödör)', 'Debrecen, Kossuth u. 12-14, 4024', '(06 52) 322 223', 'Hétfő-péntek 11:00–15:00', '3.jpg'),
(4, 'Melange Étterem', 'Debrecen, Csapó u. 24, 4024', '06 20 290 9211', 'Hétfő-péntek	10:00–24:00', '4.jpg'),
(5, 'Sparhelt Vendéglő', 'Debrecen, Sas u. 4, 4024', '06 30 989 4554', 'Hétfő-péntek	10:00–15:00', '5.jpg'),
(6, 'Barabás Étterem', ' Debrecen, Vár u. 11, 4024', '(06 52) 502 231', 'Hétfő-péntek	11:00–22:00', '6.jpg'),
(7, 'Flaska Vendéglő', 'Debrecen, Miklós u. 4, 4025', '(06 52) 414 582', 'Hétfő-péntek	11:00–22:00', '7.jpg'),
(8, 'Belga Étterem és Söröző', 'Debrecen, Piac u. 29, 4025', '(06 52) 536 373', 'Hétfő-péntek	10:00–24:00', '8.jpg'),
(9, 'Leroy Cafe', 'Debrecen, Fórum Bevásárlóközpont, Csapó u. 30, 4029', '06 30 204 0600', 'Hétfő-péntek	11:00–23:00', '9.jpg'),
(10, 'IKON Restaurant', ' Debrecen, Piac u. 23, 4025', ' 06 30 555 7766', 'Hétfő-péntek	11:30–23:00', '10.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `foglalas`
--

CREATE TABLE `foglalas` (
  `foglalas_id` int(11) NOT NULL,
  `asztalok_id` int(11) DEFAULT NULL,
  `datum` date DEFAULT NULL,
  `ora` int(11) DEFAULT NULL,
  `nev` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `telefon` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `foglalas`
--

INSERT INTO `foglalas` (`foglalas_id`, `asztalok_id`, `datum`, `ora`, `nev`, `telefon`) VALUES
(1, 1, '2022-01-10', 13, 'Sanyi', '11111111'),
(2, 1, '2022-01-10', 14, 'Béla', '111111111'),
(3, 2, '2022-01-11', 15, 'Réka', '111111');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'user', '2020-08-02 14:57:31', '2020-08-02 14:57:31'),
(2, 'moderator', '2020-08-02 14:57:31', '2020-08-02 14:57:31'),
(3, 'admin', '2020-08-02 14:57:31', '2020-08-02 14:57:31');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tipus`
--

CREATE TABLE `tipus` (
  `id` int(11) NOT NULL,
  `tipus` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `tipus`
--

INSERT INTO `tipus` (`id`, `tipus`) VALUES
(1, 'leves'),
(2, 'főétel'),
(3, 'desszert'),
(4, 'ital'),
(5, 'köret'),
(6, 'egytálétel');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'user', 'user', '$2a$08$gXM4pyuhZFlC72PeAwxrUOR0uA31/d2PdgnHP35JGV.0bQNiZBatS', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'mod', 'mod', '$2a$08$gXM4pyuhZFlC72PeAwxrUOR0uA31/d2PdgnHP35JGV.0bQNiZBatS', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'admin', 'admin', '$2a$08$97Ze1/hXfOX44WdC62Rq8uRkog9HYC1HukRX8eld2ZEKPyenM5v.G', '2020-08-02 15:03:59', '2020-08-02 15:03:59');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_roles`
--

CREATE TABLE `user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `user_roles`
--

INSERT INTO `user_roles` (`createdAt`, `updatedAt`, `roleId`, `userId`) VALUES
('0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 1),
('2020-08-02 15:04:00', '2020-08-02 15:04:00', 1, 3),
('0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 2),
('0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 3),
('2020-08-02 15:04:00', '2020-08-02 15:04:00', 3, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `velemenyek`
--

CREATE TABLE `velemenyek` (
  `velemenyid` int(11) NOT NULL,
  `Etteremid` int(11) NOT NULL,
  `velemeny_nev` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `velemeny` varchar(500) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `velemenyek`
--

INSERT INTO `velemenyek` (`velemenyid`, `Etteremid`, `velemeny_nev`, `velemeny`) VALUES
(1, 1, 'Fanni', 'Nagyon fincsi nagyon jó'),
(2, 2, 'Béla', 'Fasza'),
(3, 3, 'Ádám', 'Egy élmény volt'),
(4, 4, 'Pisti', 'nagyon jó'),
(5, 5, 'Dani', 'Nagyon tetszett a hely finomak voltak az ételek'),
(6, 6, 'Dóri', 'Alig várom már hogy legközelebb is itt ebédeljünk'),
(7, 7, 'Fütty Imre', 'Első randi helynek tökéletes'),
(8, 8, 'Beviz Elek', 'Holnap is jövünk a családdal'),
(9, 9, 'Feri', 'Csótány volt az ételben'),
(10, 10, 'Oszkár', 'Dögös a pincérnő');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `asztalok`
--
ALTER TABLE `asztalok`
  ADD PRIMARY KEY (`asztalok_id`),
  ADD KEY `etterem_id` (`etterem_id`);

--
-- A tábla indexei `ertek`
--
ALTER TABLE `ertek`
  ADD PRIMARY KEY (`ertek_id`),
  ADD KEY `ertek_etterem_id` (`ertek_etterem_id`);

--
-- A tábla indexei `ertekeles`
--
ALTER TABLE `ertekeles`
  ADD PRIMARY KEY (`ert_id`);

--
-- A tábla indexei `etlapok`
--
ALTER TABLE `etlapok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etterem_id` (`etterem_id`,`tipus_id`),
  ADD KEY `tipus_id` (`tipus_id`);

--
-- A tábla indexei `etterem`
--
ALTER TABLE `etterem`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `foglalas`
--
ALTER TABLE `foglalas`
  ADD PRIMARY KEY (`foglalas_id`);

--
-- A tábla indexei `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `tipus`
--
ALTER TABLE `tipus`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`roleId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- A tábla indexei `velemenyek`
--
ALTER TABLE `velemenyek`
  ADD PRIMARY KEY (`velemenyid`),
  ADD UNIQUE KEY `etterem_id` (`Etteremid`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `asztalok`
--
ALTER TABLE `asztalok`
  MODIFY `asztalok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT a táblához `ertek`
--
ALTER TABLE `ertek`
  MODIFY `ertek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT a táblához `ertekeles`
--
ALTER TABLE `ertekeles`
  MODIFY `ert_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT a táblához `etlapok`
--
ALTER TABLE `etlapok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT a táblához `etterem`
--
ALTER TABLE `etterem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT a táblához `foglalas`
--
ALTER TABLE `foglalas`
  MODIFY `foglalas_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT a táblához `tipus`
--
ALTER TABLE `tipus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT a táblához `velemenyek`
--
ALTER TABLE `velemenyek`
  MODIFY `velemenyid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `asztalok`
--
ALTER TABLE `asztalok`
  ADD CONSTRAINT `asztalok_ibfk_1` FOREIGN KEY (`etterem_id`) REFERENCES `etterem` (`id`);

--
-- Megkötések a táblához `ertek`
--
ALTER TABLE `ertek`
  ADD CONSTRAINT `ertek_ibfk_1` FOREIGN KEY (`ertek_etterem_id`) REFERENCES `etterem` (`id`);

--
-- Megkötések a táblához `etlapok`
--
ALTER TABLE `etlapok`
  ADD CONSTRAINT `etlapok_ibfk_1` FOREIGN KEY (`etterem_id`) REFERENCES `etterem` (`id`),
  ADD CONSTRAINT `etlapok_ibfk_2` FOREIGN KEY (`tipus_id`) REFERENCES `tipus` (`id`);

--
-- Megkötések a táblához `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `velemenyek`
--
ALTER TABLE `velemenyek`
  ADD CONSTRAINT `velemenyek_ibfk_1` FOREIGN KEY (`Etteremid`) REFERENCES `etterem` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
