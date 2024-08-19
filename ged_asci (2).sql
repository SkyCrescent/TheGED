-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 19 août 2024 à 20:14
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ged_asci`
--

-- --------------------------------------------------------

--
-- Structure de la table `agent`
--

CREATE TABLE `agent` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `num_phone` varchar(255) NOT NULL,
  `situation` varchar(255) NOT NULL,
  `actif` varchar(255) NOT NULL,
  `poste_agent` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_structure` int(255) NOT NULL,
  `service` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `agent`
--

INSERT INTO `agent` (`id`, `nom`, `prenom`, `adresse`, `photo`, `num_phone`, `situation`, `actif`, `poste_agent`, `username`, `password`, `id_structure`, `service`) VALUES
(32, 'Nounga', 'Sky', '25 Re Lor', 'ressources/UsersPicture/4f48818ad634cf55653f21f7e67ba744.jpg', '06 555 52 41', 'Célibataire', 'oui', 'Administrateur', 'Orion', '$2y$10$aJYw5Ykl1J0n0AOj87eph.IksampoggyWGXqN7b0GnPbyu3.oXDES', 3, 'Service du Personnel'),
(34, 'Nounga', 'Crescent', 'Kpg Kalimalang No 517', 'ressources/UsersPicture/gettyimages-1396132687-612x612.jpg', '45 445 45 45', 'Marié(e)', 'oui', 'Secrétaire', 'Nfc014', '$2y$10$x0D3XuhLVmI/1mXBfVsQbOpUqqZ9g1.ZZH6fgFDnnxRg0I0NHjot.', 2, 'Service etdude'),
(35, 'Nounga', 'Crescent', 'Kpg No 517', 'ressources/UsersPicture/63f5a07a50bf6b4c325db4e731133dcc.jpg', '54 415 44 34', 'Célibataire', 'oui', 'Directeur Général', 'Lord', '$2y$10$pyrcEY9asi0C2cB.HkKhK.wXiEf3KeTpggg1oZr.Q7P0o5k1kTZRe', 2, ''),
(36, 'Sky', 'Freze', '4545 Gg', 'ressources/UsersPicture/gettyimages-1396132687-612x612.jpg', '56 464 54 45', 'Divorcé', 'oui', 'Secrétaire', 'Logan7', '$2y$10$kUNPBHw.g/CInH6MxetXd.jl9bLbQxvMok/TNMftsQEVnLym.nhIi', 2, ''),
(37, 'Sky', 'Crescent', 'Kpg Kalimalang No 517', 'ressources/UsersPicture/cancer-logo-png-design-11659348079ipiby3pqgs.png', '46 465 43 46', 'Célibataire', 'oui', 'Chef de Service', 'Lira', '$2y$10$/g4AUxPjJkENgHX1ylupeu5jNI2As3P6CtqlQMiv.OtBGESAbTeaS', 2, ''),
(38, 'Daff', 'Dfdfd', 'Kpg Kalimalang No 517', 'ressources/UsersPicture/HD-wallpaper-spider-man-into-the-spider-verse-miles-morales-jumping-falling-down-animation-movies.jpg', '45 454 53 45', 'Marié(e)', 'oui', 'Chef de Service', 'Orion3', '$2y$10$erjdqchhiAOYqg/yVY3NAevdc42IETwSYiyry5VDIVf4DS1QKXBgy', 3, 'Service du Personnel'),
(40, 'Nounga', 'Crescent', 'Kpg Kalimalang No 517', 'ressources/UsersPicture/FB_IMG_16266300784531208_092558.jpg', '54 545 44 54', 'Célibataire', 'oui', 'Chef de Service', 'Lorian', '$2y$10$AcZKK5g3u9E8sdMUX.9DnONR4El3UQ10rGeR.CKbXdljJp8w7qj7G', 3, 'Service du Personnel'),
(48, 'Nounga', 'Crescent', 'Kpg Kalimalang No 517', 'ressources/UsersPicture/4k-spider-man-homecoming-iron-man-vulture-wallpaper-preview.jpg', '21 224 24 24', 'Marié(e)', 'oui', 'Secrétaire', 'Sky', '$2y$10$JJNWf3nFpp.j9paL00yYveh2FVOQVr4B0Y5mOyR0nSZH6OldOallm', 1, ''),
(51, 'Gohou', 'Michel', 'Kpg Kalimalang No 517', 'ressources/UsersPicture/6a23080bb7b3e4eb6959a564ea78f995.jpg', '45 412 42 45', 'Marié(e)', 'oui', 'Particulie(re)', 'Booba', '$2y$10$kRz.dAKa1aLZ/Rhifzaz0O6UkmG9qiJaPVbjohD7PFErPDMUxAg4.', 5, 'dad'),
(52, 'Walker', 'Laure', '21 Rue Mana', 'ressources/UsersPicture/63f5a07a50bf6b4c325db4e731133dcc.jpg', '05 457 44 24', 'Marié(e)', 'oui', 'Secrétaire', 'Mavi', '$2y$10$.cjXQdntABkYK8AQq/F0xuf9PruvURs2vyUCOc26.yke42tK98z36', 5, 'dad'),
(53, 'LaKnight', 'Crescent', 'Kpg Kalimalang No 857', 'ressources/UsersPicture/1-10.jpg', '85 558 86 56', 'Célibataire', 'oui', 'Secrétaire', 'LaKnight', '$2y$10$HYYwMZuLj0GW1x6OWEI1/O0kxUWepN.lGJHXi1gNZzxwvLs/idjh6', 2, 'Service Etude'),
(54, 'Nfc', 'Crescent', 'Kpg Kalimalang No 517', 'ressources/UsersPicture/1-10.jpg', '24 545 85 24', 'Marié(e)', 'oui', 'Secrétaire', 'NFC', '$2y$10$MZ6ybWHyaRGgQorQCi1.B.jMqR.RqRKVFlefsMUY6B/xn9xi6cFKu', 3, 'Secretariat'),
(55, 'Nounga', 'Crescent', 'Kpg Kalimalang No 517', 'ressources/UsersPicture/1137946.jpg', '65 456 43 6', 'Divorcé', 'oui', 'Secrétaire', 'Lord6', '$2y$10$NBFB8Vv6P2yUHsB6fp51oesKm18a.W5wTirhVlKNAxSn2USMXIIDK', 4, 'Service Financiere'),
(56, 'Sky', 'Crescent', 'Kpg Kalimalang No 517', 'ressources/UsersPicture/63f5a07a50bf6b4c325db4e731133dcc.jpg', '55 644 46 65', 'Marié(e)', 'oui', 'Secrétaire', 'Orion4', '$2y$10$UjdcWtH02eaF7/2EYyyfuunuAVkXfRSvsPI0aFDuMwM0iOzYI99J6', 5, 'dad'),
(57, 'Nounga', 'Crescent', 'Kpg Kalimalang No 517', 'ressources/UsersPicture/Big-Hero-6-presskit-000.jpg', '55 454 45 45', 'Célibataire', 'oui', 'Directeur Général', 'Acsi', '$2y$10$GKRoz.D2.2Wg0vk54qLsRepGm3lx/8btzpUmUPv1PD4FIBzk1cniW', 1, 'serivce'),
(58, 'Nounga', 'Crescent', 'Kpg Kalimalang No 517', 'ressources/UsersPicture/raw.jpeg', '55 454 56 54', 'Marié(e)', 'oui', 'Chef de Service', 'Lord5', '$2y$10$uxswMuYWNp9covOiIqltuekR0GMGg7Y36wYiRDVl7B98d3zX4IqX.', 2, 'Service Etude'),
(59, 'Nounga', 'Crescent', 'Kpg Kalimalang No 517', 'ressources/UsersPicture/IMG_2240.JPG', '45 454 54 54', 'Marié(e)', 'oui', 'Chef de Service', 'Nfc0146', '$2y$10$/QRe3YG86K/I9FlIN5xJxeF1S2raSbg20Gt6T6CyNqafrfakj97Y2', 4, 'Service Financiere');

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `id_sousStructure` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `nom`, `id_sousStructure`) VALUES
(1, 'archive', 2),
(2, 'Certificat', 2),
(3, 'Demande', 2),
(4, '', 2),
(5, 'Demandeesd', 2),
(6, 'Nouveau', 5),
(7, 'C', 5),
(8, 'Cc', 5),
(9, 'Dd', 5),
(10, 'Fdfd', 2),
(11, 'Lettre', 2),
(12, 'Doc Word', 3),
(13, 'Pdf', 4),
(14, 'Demande', 1),
(15, 'Nouveau', 1);

-- --------------------------------------------------------

--
-- Structure de la table `courier`
--

CREATE TABLE `courier` (
  `id` int(11) NOT NULL,
  `objet` varchar(255) NOT NULL,
  `expediteur` varchar(255) NOT NULL,
  `recepteur` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `note` varchar(255) NOT NULL,
  `Type_transmission` varchar(255) NOT NULL,
  `transmission_interne` varchar(255) NOT NULL,
  `parafeux` varchar(200) NOT NULL,
  `id_structure` int(11) NOT NULL,
  `sous_structure` varchar(255) NOT NULL,
  `Niveau` varchar(255) NOT NULL,
  `accuse` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `courier`
--

INSERT INTO `courier` (`id`, `objet`, `expediteur`, `recepteur`, `date`, `note`, `Type_transmission`, `transmission_interne`, `parafeux`, `id_structure`, `sous_structure`, `Niveau`, `accuse`) VALUES
(1, 'nfc', '3', '4', '06/08/2024', 'recevr', 'depart-arrive', 'deja', 'non', 3, 'Service Financiere', 'Prioritaire', 'oui'),
(2, 'ssx', '3', '4', '06/08/2024', 'fdfdf', 'depart-arrive', 'deja', 'non', 3, 'Secrétariat', 'Prioritaire', 'oui'),
(3, 'sxscsc', '3', '4', '06/08/2024', 'dvdv', 'depart-arrive', 'non', 'non', 3, 'Secrétariat', 'Prioritaire', 'oui'),
(4, 'sxscsc', '3', '2', '06/08/2024', 'dvdv', 'depart-arrive', 'non', 'non', 3, 'Secrétariat', 'Prioritaire', 'oui'),
(5, 'dvxc', '4', '3', '08/08/2024', 'efdsf', 'depart-arrive', 'non', 'non', 4, 'Secrétariat', 'Urgent', 'oui'),
(6, 'dvxc', '4', '2', '08/08/2024', 'efdsf', 'depart-arrive', 'non', 'non', 4, 'Secrétariat', 'Urgent', 'oui'),
(7, 'dfdfdf', '3', '2', '08/08/2024', 'dfdfdf', 'depart-arrive', 'non', 'non', 3, 'Secrétariat', 'Urgent', 'oui'),
(8, 'dfdfdf', '3', '4', '08/08/2024', 'dfdfdf', 'depart-arrive', 'non', 'non', 3, 'Secrétariat', 'Urgent', 'oui'),
(9, 'dfdfdf', '3', '5', '08/08/2024', 'dfdfdf', 'depart-arrive', 'non', 'non', 3, 'Secrétariat', 'Urgent', 'oui'),
(10, 'Instructions du DG suite a la demande de stage de Mr Nounga Freze', '1', '2', '09/08/2024', 'Une reponse est attendue', 'depart-arrive', 'deja', 'deja', 1, 'Secrétariat', 'Prioritaire', 'oui'),
(11, 'Demande de courrier', 'Mr Nounga', '1', '11/08/2024', 'ngf', 'depart-arrive', 'non', 'non', 1, 'Secrétariat', 'Prioritaire', 'non'),
(12, 'Demande de courrier', 'Mr Nounga', '4', '11/08/2024', 'NFC', 'depart-arrive', 'deja', 'non', 4, 'Secrétariat', 'Urgent', 'oui');

-- --------------------------------------------------------

--
-- Structure de la table `data_transfere`
--

CREATE TABLE `data_transfere` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `nom_fichier` varchar(255) NOT NULL,
  `url_fichier` varchar(255) NOT NULL,
  `extension` varchar(255) NOT NULL,
  `id_transfert` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `data_transfere`
--

INSERT INTO `data_transfere` (`id`, `nom`, `nom_fichier`, `url_fichier`, `extension`, `id_transfert`) VALUES
(1, 'Demande d\'audience', 'Demande d\'audience.docx', 'ressources/1/strucutre/Demande d\'audience.docx', 'Word', 33),
(2, 'CHRIST ALOUNA', 'CHRIST ALOUNA.docx', 'ressources/3/strucutre/CHRIST ALOUNA.docx', 'Word', 34);

-- --------------------------------------------------------

--
-- Structure de la table `doc`
--

CREATE TABLE `doc` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `nom_fichier` varchar(255) NOT NULL,
  `url_fichier` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `extension` varchar(255) NOT NULL,
  `archive` varchar(255) NOT NULL,
  `id_agent` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `doc`
--

INSERT INTO `doc` (`id`, `nom`, `nom_fichier`, `url_fichier`, `date`, `extension`, `archive`, `id_agent`) VALUES
(1, 'Doc1', 'Doc1.docx', 'ressources/1/doc/Doc1.docx', '09/08/2024', 'Word', 'oui', '57');

-- --------------------------------------------------------

--
-- Structure de la table `document_user`
--

CREATE TABLE `document_user` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `nom_fichier` varchar(255) NOT NULL,
  `url_fichier` varchar(255) NOT NULL,
  `extension` varchar(255) NOT NULL,
  `id_courier` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `document_user`
--

INSERT INTO `document_user` (`id`, `nom`, `nom_fichier`, `url_fichier`, `extension`, `id_courier`) VALUES
(2, 'CHRIST ALOUNA', 'CHRIST ALOUNA.docx', 'ressources/3/strucutre/CHRIST ALOUNA.docx', 'Word', 0),
(4, 'CHRIST ALOUNA', 'CHRIST ALOUNA.docx', 'ressources/3/strucutre/CHRIST ALOUNA.docx', 'Word', 2),
(5, 'CHRIST ALOUNA', 'CHRIST ALOUNA.docx', 'ressources/3/strucutre/CHRIST ALOUNA.docx', 'Word', 3),
(7, 'Final', 'Final.pdf', 'ressources/4/strucutre/Final.pdf', 'PDF', 5),
(8, 'Final', 'Final.pdf', 'ressources/4/strucutre/Final.pdf', 'PDF', 6),
(9, 'CHRIST ALOUNA', 'CHRIST ALOUNA.docx', 'ressources/3/strucutre/CHRIST ALOUNA.docx', 'Word', 7),
(10, 'CHRIST ALOUNA', 'CHRIST ALOUNA.docx', 'ressources/3/strucutre/CHRIST ALOUNA.docx', 'Word', 8),
(11, 'CHRIST ALOUNA', 'CHRIST ALOUNA.docx', 'ressources/3/strucutre/CHRIST ALOUNA.docx', 'Word', 9),
(12, 'Doc1', 'Doc1.docx', 'ressources/1/strucutre/Doc1.docx', 'Word', 10),
(13, 'Demande d\'audience', 'Demande d\'audience.docx', 'ressources/1/strucutre/Demande d\'audience.docx', 'Word', 10),
(22, 'confirmation-Crescent Nounga Nounga', 'confirmation-Crescent Nounga Nounga.pdf', 'ressources/1/strucutre/confirmation-Crescent Nounga Nounga.pdf', 'PDF', 11),
(23, 'Final', 'Final.pdf', 'ressources/4/strucutre/Final.pdf', 'PDF', 12);

-- --------------------------------------------------------

--
-- Structure de la table `doc_strucutre`
--

CREATE TABLE `doc_strucutre` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `nom_fichier` varchar(255) NOT NULL,
  `url_fichier` varchar(255) NOT NULL,
  `categorie` varchar(255) NOT NULL,
  `extension` varchar(255) NOT NULL,
  `archive` varchar(255) NOT NULL,
  `id_agent` int(255) NOT NULL,
  `nom_agent` varchar(255) NOT NULL,
  `date_ajout` varchar(255) NOT NULL,
  `id_structure` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `doc_strucutre`
--

INSERT INTO `doc_strucutre` (`id`, `nom`, `nom_fichier`, `url_fichier`, `categorie`, `extension`, `archive`, `id_agent`, `nom_agent`, `date_ajout`, `id_structure`) VALUES
(1, 'CHRIST ALOUNA', 'CHRIST ALOUNA.docx', 'ressources/3/strucutre/CHRIST ALOUNA.docx', 'Doc Word', 'Word', 'non', 54, 'Nfc', '06/08/2024', 3),
(2, 'Final', 'Final.pdf', 'ressources/4/strucutre/Final.pdf', 'Pdf', 'PDF', 'non', 55, 'Nounga', '08/08/2024', 4),
(3, 'La Liste des Enfants', 'La Liste des Enfants.docx', 'ressources/5/strucutre/La Liste des Enfants.docx', 'C', 'Word', 'non', 56, 'Sky', '08/08/2024', 5),
(4, 'Demande d\'audience', 'Demande d\'audience.docx', 'ressources/1/strucutre/Demande d\'audience.docx', 'Demande', 'Word', 'non', 48, 'Nounga', '09/08/2024', 1),
(6, 'CHRIST ALOUNA', 'CHRIST ALOUNA.docx', 'ressources/2/strucutre/CHRIST ALOUNA.docx', 'Demande', 'Word', 'oui', 34, 'Nounga', '09/08/2024', 2),
(8, 'Doc1', 'Doc1.docx', 'ressources/2/strucutre/Doc1.docx', 'Certificat', 'Word', 'non', 34, 'Nounga', '09/08/2024', 2),
(9, 'confirmation-Crescent Nounga Nounga', 'confirmation-Crescent Nounga Nounga.pdf', 'ressources/1/strucutre/confirmation-Crescent Nounga Nounga.pdf', 'Demande', 'PDF', 'non', 48, 'Nounga', '09/08/2024', 1),
(10, 'Final', 'Final.pdf', 'ressources/1/strucutre/Final.pdf', 'Nouveau', 'PDF', 'non', 48, 'Nounga', '09/08/2024', 1);

-- --------------------------------------------------------

--
-- Structure de la table `fichier_personnel`
--

CREATE TABLE `fichier_personnel` (
  `id` int(11) NOT NULL,
  `id_agent` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `extension` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `historic`
--

CREATE TABLE `historic` (
  `id` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `id_agent` int(11) NOT NULL,
  `contenu` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `historic`
--

INSERT INTO `historic` (`id`, `date`, `id_agent`, `contenu`, `action`) VALUES
(1, '26/05/2024', 39, 'ajouter un document PDF', 'ajout PDF'),
(2, '26/05/2024', 39, 'ajouter un document PDF', 'ajout PDF'),
(3, '26/05/2024', 3, 'ajouter un document PDF', 'ajout PDF'),
(4, '26/05/2024', 3, 'ajouter un document Word', 'ajout Word'),
(5, '26/05/2024', 3, 'ajouter un document PDF', 'ajout PDF'),
(6, '26/05/2024', 32, 'ajouter un document Word', 'ajout Word'),
(7, '26/05/2024', 32, 'ajouter un document PDF', 'ajout PDF'),
(8, '26/05/2024', 32, 'ajouter un document Excel', 'ajout Excel'),
(9, '26/05/2024', 32, 'ajouter un document PowerPoint', 'ajout PowerPoint'),
(12, '26/05/2024', 38, 'ajouter un document PowerPoint', 'ajout PowerPoint'),
(17, '', 32, 'null', 'null'),
(18, '26/05/2024', 32, 'archiver un document PowerPoint', 'ajout PowerPoint'),
(19, '26/05/2024', 32, 'archiver un document Excel', 'ajout Excel'),
(20, '26/05/2024', 32, 'vous avez partage un document vers un utilisateur de votre service', 'transfet'),
(21, '26/05/2024', 32, 'vous avez partage un document vers un utilisateur de votre service', 'transfert'),
(22, '26/05/2024', 38, 'vous avez partage un document vers un utilisateur de votre service', 'transfert'),
(23, '26/05/2024', 38, 'vous avez partage un document vers un utilisateur de votre service', 'transfert'),
(24, '27/05/2024', 40, 'ajouter un document Word', 'ajout Word'),
(25, '09/06/2024', 38, 'ajouter un document PDF', 'ajout PDF'),
(26, '09/06/2024', 39, 'ajouter un document PDF', 'ajout PDF'),
(27, '13/06/2024', 48, 'ajouter un document PDF', 'ajout PDF'),
(28, '13/06/2024', 34, 'vous avez partage un document vers un utilisateur de votre service', 'transfert'),
(29, '13/06/2024', 32, 'vous avez partage un document vers un utilisateur de votre service', 'transfert'),
(30, '13/06/2024', 32, 'ajouter un document Excel', 'ajout Excel'),
(31, '13/06/2024', 32, ' partage un document vers un utilisateur de votre service', 'transfert'),
(32, '13/06/2024', 32, 'archiver un document PowerPoint', 'ajout PowerPoint'),
(33, '13/06/2024', 35, 'ajouter un document PDF', 'ajout PDF'),
(34, '13/06/2024', 34, 'ajouter un document PDF', 'ajout PDF'),
(35, '14/06/2024', 34, ' partage un document vers un utilisateur de votre service', 'transfert'),
(36, '14/06/2024', 34, 'archiver un document PDF', 'ajout PDF'),
(37, '19/06/2024', 32, 'archiver un document PowerPoint', 'ajout PowerPoint'),
(38, '19/06/2024', 32, 'archiver un document PDF', 'ajout PDF'),
(39, '19/06/2024', 32, 'archiver un document Word', 'ajout Word'),
(40, '19/06/2024', 32, 'archiver un document Excel', 'ajout Excel'),
(41, '24/06/2024', 32, 'archiver un document PDF', 'ajout PDF'),
(42, '24/06/2024', 32, 'ajouter un document PDF', 'ajout PDF'),
(43, '24/06/2024', 32, 'ajouter un document Word', 'ajout Word'),
(44, '24/06/2024', 39, 'ajouter un document Word', 'ajout Word'),
(45, '24/06/2024', 39, ' partage un document vers un utilisateur de votre service', 'transfert'),
(46, '26/07/2024', 34, 'ajouter un document Word', 'ajout Word'),
(47, '06/08/2024', 54, 'ajouter un document Word', 'ajout Word'),
(48, '08/08/2024', 55, 'ajouter un document PDF', 'ajout PDF'),
(49, '08/08/2024', 56, 'ajouter un document Word', 'ajout Word'),
(50, '09/08/2024', 48, 'ajouter un document Word', 'ajout Word'),
(51, '09/08/2024', 48, ' partage un document vers un utilisateur de votre service', 'transfert'),
(52, '09/08/2024', 57, 'ajouter un document Word', 'ajout Word'),
(53, '09/08/2024', 57, ' partage un document vers un utilisateur de votre service', 'transfert'),
(54, '09/08/2024', 48, 'ajouter un document Word', 'ajout Word'),
(55, '09/08/2024', 34, 'ajouter un document Word', 'ajout Word'),
(56, '09/08/2024', 34, 'archiver un document Word', 'ajout Word'),
(57, '09/08/2024', 34, 'ajouter un document PDF', 'ajout PDF'),
(58, '09/08/2024', 34, 'ajouter un document Word', 'ajout Word'),
(59, '09/08/2024', 48, 'archiver un document Word', 'ajout Word'),
(60, '09/08/2024', 48, 'archiver un document Word', 'ajout Word'),
(61, '09/08/2024', 48, 'archiver un document Word', 'ajout Word'),
(62, '09/08/2024', 48, 'archiver un document Word', 'ajout Word'),
(63, '09/08/2024', 48, 'archiver un document Word', 'ajout Word'),
(64, '09/08/2024', 48, 'archiver un document Word', 'ajout Word'),
(65, '09/08/2024', 48, 'archiver un document Word', 'ajout Word'),
(66, '09/08/2024', 48, 'archiver un document Word', 'ajout Word'),
(67, '09/08/2024', 48, 'ajouter un document PDF', 'ajout PDF'),
(68, '09/08/2024', 48, 'archiver un document PDF', 'ajout PDF'),
(69, '09/08/2024', 48, 'ajouter un document PDF', 'ajout PDF');

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `contenu` varchar(255) NOT NULL,
  `id_expediteur` int(11) NOT NULL,
  `id_recepteur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `contenu` varchar(255) NOT NULL,
  `idCourrier` int(11) NOT NULL,
  `etat` varchar(255) NOT NULL,
  `idStructure` int(11) NOT NULL,
  `poste` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notes`
--

INSERT INTO `notes` (`id`, `contenu`, `idCourrier`, `etat`, `idStructure`, `poste`) VALUES
(1, 'Demande Valide A Transmettre Au Service Etudes', 10, 'attente', 2, 'Directeur Général'),
(2, 'Lue Et Approuve ', 10, 'attente', 2, 'Secrétaire'),
(3, 'Recu', 12, 'attente', 4, 'Secrétaire'),
(4, 'Stark', 1, 'attente', 4, 'Secrétaire'),
(5, 'Cc', 1, 'attente', 4, 'Secrétaire'),
(6, 'Repart', 2, 'attente', 4, 'Secrétaire');

-- --------------------------------------------------------

--
-- Structure de la table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `contenu` varchar(255) NOT NULL,
  `expediteur` varchar(255) NOT NULL,
  `destinataire` varchar(255) NOT NULL,
  `Type_transmission` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `poste` varchar(255) NOT NULL,
  `lue` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notification`
--

INSERT INTO `notification` (`id`, `contenu`, `expediteur`, `destinataire`, `Type_transmission`, `date`, `poste`, `lue`) VALUES
(1, 'Vous avez recu un Courrier provenant de la ', '1', '2', 'Courrier-arrive', '08/05/2024', '', 'non'),
(2, 'Vous avez recu un fichier provenant de la Particulie(re) de la', '1', '1', 'fichier', '08/05/2024', '', 'non'),
(3, 'Vous avez recu un fichier provenant de la Particulie(re) de la', '1', '1', 'fichier', '08/05/2024', '', 'non'),
(4, 'Vous avez recu un fichier provenant de la Particulie(re) de la', '1', '1', 'fichier', '08/05/2024', '', 'non'),
(5, 'Vous avez recu un fichier provenant de la Particulie(re) de la', '1', '1', 'fichier', '08/05/2024', '', 'non'),
(6, 'Vous avez recu un fichier provenant de la Particulie(re) de la', '1', '1', 'fichier', '08/05/2024', '', 'non'),
(7, 'Vous avez recu un fichier provenant de la Particulie(re) de la', '1', '1', 'fichier', '08/05/2024', '', 'non'),
(8, 'Vous avez recu un Courrier provenant de la ', '2', '1', 'Courrier-arrive', '08/05/2024', 'Sécretaire', 'non'),
(9, 'Vous avez recu un fichier provenant de la Particulie(re) de la', '1', '1', 'fichier', '08/05/2024', 'Sécretaire', 'oui'),
(10, 'Vous avez recu un fichier provenant de la Sécretaire de la', '1', '1', 'fichier', '08/05/2024', 'Particulie(re)', 'non'),
(11, 'Vous avez recu un Courrier provenant de la ', '1', '2', 'Courrier-arrive', '08/05/2024', 'Sécretaire', 'oui'),
(12, 'Vous avez recu un fichier provenant de la Particulie(re) de la', '1', '1', 'fichier', '08/05/2024', 'Sécretaire', 'non'),
(13, 'Vous avez recu un fichier provenant de la Sécretaire de la', '1', '1', 'fichier', '08/05/2024', 'Particulie(re)', 'non'),
(14, 'Vous avez recu un fichier provenant de la Sécretaire de la', '1', '1', 'fichier', '08/05/2024', 'Particulie(re)', 'non'),
(15, 'Vous avez recu un fichier provenant de la Sécretaire de la', '4', '4', 'fichier', '13/05/2024', 'Directeur Général', 'non'),
(16, 'Vous avez recu un fichier provenant de la Directeur Général de la', '2', '2', 'fichier', '17/05/2024', 'Sécretaire', 'oui'),
(17, 'Vous avez recu un fichier provenant de la Sécretaire de la', '3', '3', 'fichier', '17/05/2024', 'Directeur Général', 'oui'),
(18, 'Vous avez recu un fichier provenant de la Sécretaire de la', '2', '2', 'fichier', '17/05/2024', 'Directeur Général', 'non'),
(19, 'Vous avez recu un fichier provenant de la Sécretaire de la', '2', '2', 'fichier', '17/05/2024', 'Chef de Service', 'non'),
(20, 'Vous avez recu un fichier provenant de la Directeur Général de la', '2', '2', 'fichier', '17/05/2024', 'Sécretaire', 'oui'),
(21, 'Vous avez recu un fichier provenant de la Sécretaire de la', '2', '2', 'fichier', '17/05/2024', 'Directeur Général', 'non'),
(22, 'Vous avez recu un fichier provenant de la Directeur Général de la', '2', '2', 'fichier', '17/05/2024', 'Sécretaire', 'oui'),
(23, 'Vous avez recu un fichier provenant de la Directeur Général de la', '2', '2', 'fichier', '17/05/2024', 'Sécretaire', 'oui'),
(24, 'Vous avez recu un fichier provenant de la Directeur Général de la', '2', '2', 'fichier', '17/05/2024', 'Sécretaire', 'oui'),
(25, 'Vous avez recu un fichier provenant de la Directeur Général de la', '2', '2', 'fichier', '17/05/2024', 'Sécretaire', 'oui'),
(26, 'Vous avez recu un fichier provenant de la Directeur Général de la', '2', '2', 'fichier', '17/05/2024', 'Sécretaire', 'oui'),
(27, 'Vous avez recu un fichier provenant de la Sécretaire de la', '2', '2', 'fichier', '17/05/2024', 'Directeur Général', 'non'),
(28, 'Vous avez recu un Courrier provenant de la ', '3', '2', 'Courrier-arrive', '21/05/2024', 'Sécretaire', 'oui'),
(29, 'Vous avez recu un Courrier provenant de la ', '2', '3', 'Courrier-arrive', '21/05/2024', 'Sécretaire', 'oui'),
(30, 'Vous avez recu un Courrier provenant de la ', '2', '3', 'Courrier-arrive', '21/05/2024', 'Sécretaire', 'oui'),
(31, 'Vous avez recu un Courrier provenant de la ', '2', '1', 'Courrier-arrive', '21/05/2024', 'Sécretaire', 'non'),
(32, 'Vous avez recu un Courrier provenant de la ', '2', '4', 'Courrier-arrive', '21/05/2024', 'Sécretaire', 'oui'),
(33, 'Vous avez recu un Courrier provenant de la ', '2', '5', 'Courrier-arrive', '21/05/2024', 'Sécretaire', 'non'),
(34, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'fichier', '', 'Chef de Service', 'oui'),
(35, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'fichier', '', 'Chef de Service', 'oui'),
(36, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '23/05/2024', 'Particulie(re)', 'non'),
(37, 'Vous avez recu un Courrier provenant de la ', '3', '2', 'Courrier-arrive', '23/05/2024', 'Sécretaire', 'oui'),
(38, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '23/05/2024', 'Chef de Service', 'oui'),
(39, 'Un courrier provenant du Chef de Service vous a ete renvoyer', '3', '3', 'courrier', '', 'Sécretaire', 'oui'),
(40, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '23/05/2024', 'Chef de Service', 'oui'),
(41, 'Un courrier provenant du Chef de Service vous a ete renvoyer', '3', '3', 'courrier', '', 'Sécretaire', 'oui'),
(42, 'Un courrier provenant du Chef de Service vous a ete renvoyer', '3', '3', 'courrier', '', 'Sécretaire', 'oui'),
(43, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '23/05/2024', 'Chef de Service', 'oui'),
(44, 'Un courrier provenant du Chef de Service vous a ete renvoyer', '3', '3', 'courrier', '', 'Sécretaire', 'oui'),
(45, 'Un courrier provenant du Chef de Service vous a ete renvoyer', '3', '3', 'courrier', '23/05/2024', 'Sécretaire', 'oui'),
(46, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '23/05/2024', 'Chef de Service', 'oui'),
(47, 'Un courrier provenant du secretariat vous a ete renvoyer', '3', '3', 'courrier', '23/05/2024', 'Directeur Général', 'non'),
(48, 'Vous avez recu un fichier provenant de la Sécretaire de la', '3', '3', 'fichier', '23/05/2024', 'Directeur Général', 'non'),
(49, 'Vous avez recu un fichier provenant de la Sécretaire de la', '3', '3', 'fichier', '23/05/2024', 'Directeur Général', 'non'),
(50, 'Un courrier provenant du Directeur Général vous a ete renvoyer', '3', '3', 'courrier', '24/05/2024', 'Sécretaire', 'oui'),
(51, 'Un courrier provenant du Directeur Général vous a ete renvoyer', '3', '3', 'courrier', '24/05/2024', 'Sécretaire', 'oui'),
(52, 'Vous avez recu un Courrier provenant de la ', '2', '3', 'Courrier-arrive', '24/05/2024', 'Sécretaire', 'oui'),
(53, 'Un courrier provenant du secretariat vous a ete transferer', '3', '3', 'courrier', '24/05/2024', 'Directeur Général', 'oui'),
(54, 'Un courrier provenant du Directeur Général vous a ete renvoyer', '3', '3', 'courrier', '24/05/2024', 'Sécretaire', 'oui'),
(55, 'Un courrier provenant du Directeur Général vous a ete renvoyer', '3', '3', 'courrier', '24/05/2024', 'Sécretaire', 'oui'),
(56, 'Un courrier provenant du secretariat vous a ete transferer', '3', '3', 'courrier', '24/05/2024', 'Directeur Général', 'oui'),
(57, 'Un courrier provenant du secretariat vous a ete transferer', '3', '3', 'courrier', '24/05/2024', 'Directeur Général', 'oui'),
(58, 'Un courrier provenant du secretariat vous a ete transferer', '3', '3', 'courrier', '24/05/2024', 'Directeur Général', 'oui'),
(59, 'Un courrier provenant du Directeur Général vous a ete renvoyer', '3', '3', 'courrier', '24/05/2024', 'Sécretaire', 'oui'),
(60, 'Un courrier provenant du Directeur Général vous a ete renvoyer', '3', '3', 'courrier', '24/05/2024', 'Sécretaire', 'oui'),
(61, 'Vous avez recu un Courrier provenant de la ', '2', '3', 'Courrier-arrive', '24/05/2024', 'Sécretaire', 'oui'),
(62, 'Un courrier provenant du secretariat vous a ete transferer', '3', '3', 'courrier', '24/05/2024', 'Directeur Général', 'non'),
(63, 'Un courrier provenant du Chef de Service vous a ete renvoyer', '3', '3', 'courrier', '24/05/2024', 'Sécretaire', 'oui'),
(64, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '24/05/2024', 'Chef de Service', 'oui'),
(65, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '24/05/2024', 'Chef de Service', 'oui'),
(66, 'Vous avez recu un Courrier provenant de la ', '2', '3', 'Courrier-arrive', '25/05/2024', 'Sécretaire', 'oui'),
(67, 'Un courrier provenant du secretariat vous a ete transferer', '3', '3', 'courrier', '25/05/2024', 'Directeur Général', 'non'),
(68, 'Un courrier provenant du Directeur Général vous a ete renvoyer', '3', '3', 'courrier', '25/05/2024', 'Sécretaire', 'oui'),
(69, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '25/05/2024', 'Chef de Service', 'non'),
(70, 'Un courrier provenant du Chef de Service vous a ete renvoyer', '3', '3', 'courrier', '25/05/2024', 'Sécretaire', 'oui'),
(71, 'Vous avez recu un Courrier provenant de la ', '2', '3', 'Courrier-arrive', '25/05/2024', 'Sécretaire', 'oui'),
(72, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '25/05/2024', 'Chef de Service', 'non'),
(73, 'Un courrier provenant du Chef de Service vous a ete renvoyer', '3', '3', 'courrier', '25/05/2024', 'Sécretaire', 'oui'),
(74, 'Vous avez recu un Courrier provenant de la ', '2', '3', 'Courrier-arrive', '25/05/2024', 'Sécretaire', 'oui'),
(75, 'Un courrier provenant du secretariat vous a ete transferer', '3', '3', 'courrier', '25/05/2024', 'Directeur Général', 'non'),
(76, 'Un courrier provenant du Directeur Général vous a ete renvoyer', '3', '3', 'courrier', '25/05/2024', 'Sécretaire', 'oui'),
(77, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '25/05/2024', 'Chef de Service', 'non'),
(78, 'Un courrier provenant du Chef de Service vous a ete renvoyer', '3', '3', 'courrier', '25/05/2024', 'Sécretaire', 'oui'),
(79, 'Un courrier provenant du Chef de Service vous a ete renvoyer', '3', '3', 'courrier', '25/05/2024', 'Sécretaire', 'oui'),
(80, 'Vous avez recu un fichier provenant de la Directeur Général de la', '3', '3', 'fichier', '25/05/2024', 'Sécretaire', 'oui'),
(81, 'Vous avez recu un fichier provenant de la Directeur Général de la', '3', '3', 'fichier', '25/05/2024', 'Sécretaire', 'oui'),
(82, 'Vous avez recu un fichier provenant de la Directeur Général de la', '3', '3', 'fichier', '25/05/2024', 'Sécretaire', 'oui'),
(83, 'Vous avez recu un fichier provenant de la Chef de Service de la', '3', '3', 'fichier', '25/05/2024', 'Directeur Général', 'non'),
(84, 'Vous avez recu un fichier provenant de la Sécretaire de la', '3', '3', 'fichier', '26/05/2024', 'Directeur Général', 'non'),
(85, 'Vous avez recu un fichier provenant de la Chef de Service de la', '3', '3', 'fichier', '26/05/2024', 'Sécretaire', 'non'),
(86, 'Vous avez recu un fichier provenant de la Sécretaire de la', '3', '3', 'fichier', '26/05/2024', 'Particulie(re)', 'non'),
(87, 'Vous avez recu un fichier provenant de la Chef de Service de la', '3', '3', 'fichier', '26/05/2024', 'Sécretaire', 'oui'),
(88, 'Vous avez recu un fichier provenant de la Chef de Service de la', '3', '3', 'fichier', '26/05/2024', 'Sécretaire', 'non'),
(89, 'Vous avez recu un fichier provenant de la Chef de Service de la', '3', '3', 'fichier', '26/05/2024', 'Particulie(re)', 'non'),
(90, 'Vous avez recu un fichier provenant de la Chef de Service de la', '3', '3', 'fichier', '26/05/2024', 'Particulie(re)', 'non'),
(91, 'Un courrier provenant du Chef de Service vous a ete renvoyer', '3', '3', 'courrier', '27/05/2024', 'Sécretaire', 'non'),
(92, 'Vous avez recu un fichier provenant de la Secrétaire de la', '2', '2', 'fichier', '13/06/2024', 'Chef de Service', 'non'),
(93, 'Vous avez recu un Courrier provenant de la ', '2', '3', 'Courrier-arrive', '13/06/2024', 'Secrétaire', 'non'),
(94, 'Vous avez recu un fichier provenant de la Secrétaire de la', '3', '3', 'fichier', '13/06/2024', 'Chef de Service', 'non'),
(95, 'Vous avez reçu un fichier provenant de la Secrétaire de la', '3', '3', 'fichier', '13/06/2024', 'Directeur Général', 'non'),
(96, 'Un courrier provenant du secretariat vous a ete transferé', '2', '2', 'courrier', '13/06/2024', 'Chef de Service', 'non'),
(97, 'Un courrier provenant du Chef de Service vous a ete renvoyer', '2', '2', 'courrier', '13/06/2024', 'Secrétaire', 'oui'),
(98, 'Un courrier vous a été transférer provenant du secrétariat de la', '2', '2', 'courrier', '13/06/2024', 'Directeur Général', 'non'),
(99, 'Un courrier vous a été renvoyer provenant du Directeur Général de la ', '2', '2', 'courrier', '13/06/2024', 'Secrétaire', 'oui'),
(100, 'Vous avez reçu un fichier provenant de la Secrétaire de la', '2', '2', 'fichier', '14/06/2024', 'Directeur Général', 'non'),
(101, 'Vous avez reçu un Courrier provenant de la ', '2', '3', 'Courrier-arrive', '24/06/2024', 'Secrétaire', 'oui'),
(102, 'Un courrier vous a été transférer provenant du secrétariat de la', '3', '3', 'courrier', '24/06/2024', 'Directeur Général', 'non'),
(103, 'Un courrier vous a été transférer provenant du secrétariat de la', '3', '3', 'courrier', '24/06/2024', 'Directeur Général', 'non'),
(104, 'Vous avez reçu un fichier provenant de la Directeur Général de la', '3', '3', 'fichier', '24/06/2024', 'Secrétaire', 'oui'),
(105, 'Un courrier vous a été renvoyer provenant du Directeur Général de la ', '3', '3', 'courrier', '24/06/2024', 'Secrétaire', 'oui'),
(106, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '24/06/2024', 'Chef de Service', 'non'),
(107, 'Un courrier vous a été renvoyer provenant du Chef de Service de la ', '3', '3', 'courrier', '24/06/2024', 'Secrétaire', 'oui'),
(108, 'Vous avez reçu un Courrier provenant de la ', '2', '1', 'Courrier-arrive', '27/06/2024', 'Secrétaire', 'non'),
(109, 'Vous avez reçu un Courrier provenant de la ', '2', '3', 'Courrier-arrive', '27/06/2024', 'Secrétaire', 'oui'),
(110, 'Vous avez reçu un Courrier provenant de la ', '2', '1', 'Courrier-arrive', '27/06/2024', 'Secrétaire', 'non'),
(111, 'Vous avez reçu un Courrier provenant de la ', '2', '3', 'Courrier-arrive', '27/06/2024', 'Secrétaire', 'oui'),
(112, 'Vous avez reçu un Courrier provenant de la ', '2', '5', 'Courrier-arrive', '27/06/2024', 'Secrétaire', 'non'),
(113, 'Vous avez reçu un Courrier provenant de la ', '2', '1', 'Courrier-arrive', '26/07/2024', 'Secrétaire', 'non'),
(114, 'Vous avez reçu un Courrier provenant de la ', '2', '3', 'Courrier-arrive', '26/07/2024', 'Secrétaire', 'oui'),
(115, 'Vous avez reçu un Courrier provenant de la ', '2', '4', 'Courrier-arrive', '26/07/2024', 'Secrétaire', 'oui'),
(116, 'Le courrier que vous avez envoye vers ', '2', '3', 'courrier', '29/07/2024', 'Secrétaire', 'oui'),
(117, 'Le courrier que vous avez envoye vers ', '2', '3', 'courrier', '29/07/2024 a bien ete consulter', 'Secrétaire', 'non'),
(118, 'Le courrier que vous avez envoye vers ', '2', '3', 'courrier', '29/07/2024 a bien ete consulter', 'Secrétaire', 'non'),
(119, 'Le courrier que vous avez envoye vers ', '2', '1', 'courrier', '29/07/2024 a bien ete consulter', 'Secrétaire', 'non'),
(120, 'Le courrier que vous avez envoye vers ', '2', '1', 'courrier', '29/07/2024 a bien ete consulter', 'Secrétaire', 'non'),
(121, 'Le courrier que vous avez envoye vers ', '2', '1', 'courrier', '29/07/2024 a bien ete consulter', 'Secrétaire', 'non'),
(122, 'Le courrier que vous avez envoye vers ', '2', '1', 'courrier', '29/07/2024 a bien ete consulter', 'Secrétaire', 'non'),
(123, 'Le courrier que vous avez envoye vers ', '2', '1', 'courrier', '29/07/2024 a bien ete consulter', 'Secrétaire', 'non'),
(124, 'Le courrier que vous avez envoye vers ', '2', '1', 'courrier', '29/07/2024 a bien ete consulter', 'Secrétaire', 'non'),
(125, 'Le courrier que vous avez envoye vers ', '2', '1', 'courrier', '29/07/2024 a bien ete consulter', 'Secrétaire', 'non'),
(126, 'Le courrier que vous avez envoye vers ', '2', '1', 'courrier', '29/07/2024 a bien ete consulter', 'Secrétaire', 'non'),
(127, 'Le courrier que vous avez envoye vers ', '2', '1', 'courrier', '29/07/2024 a bien ete consulter', 'Secrétaire', 'non'),
(128, 'Le courrier que vous avez envoye vers ', '2', '1', 'courrier', '08/05/2024 a bien ete consulter', 'Secrétaire', 'non'),
(129, 'Le courrier que vous avez envoye vers ', '3', '2', 'courrier', '26/07/2024 a bien ete consulter', 'Secrétaire', 'oui'),
(130, 'Le courrier que vous avez envoye vers ', '3', '2', 'courrier', '27/06/2024 a bien ete consulter', 'Secrétaire', 'oui'),
(131, 'Le courrier que vous avez envoye vers ', '3', '2', 'courrier', '13/06/2024 a bien ete consulter', 'Secrétaire', 'oui'),
(132, 'Le courrier que vous avez envoye vers ', '3', '2', 'courrier', '25/05/2024 a bien ete consulter', 'Secrétaire', 'oui'),
(133, 'Vous avez reçu un Courrier provenant de la ', '2', '4', 'Courrier-arrive', '29/07/2024', 'Secrétaire', 'oui'),
(134, 'Vous avez reçu un Courrier provenant de la ', '2', '5', 'Courrier-arrive', '29/07/2024', 'Secrétaire', 'non'),
(135, 'Le courrier que vous avez envoye vers ', '4', '2', 'courrier', '26/07/2024 a bien ete consulter', 'Secrétaire', 'oui'),
(136, 'Le courrier que vous avez envoye vers ', '4', '2', 'courrier', '21/05/2024 a bien ete consulter', 'Secrétaire', 'oui'),
(137, 'Le courrier que vous avez envoye vers ', '4', '2', 'courrier', '29/07/2024 a bien ete consulter', 'Secrétaire', 'non'),
(138, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '05/08/2024', 'Secretariat', 'non'),
(139, 'Vous avez reçu un Courrier provenant de la ', '3', '1', 'Courrier-arrive', '05/08/2024', 'Secrétaire', 'non'),
(140, 'Vous avez reçu un Courrier provenant de la ', '3', '4', 'Courrier-arrive', '05/08/2024', 'Secrétaire', 'oui'),
(141, 'Le courrier que vous avez envoye vers ', '4', '3', 'courrier', '05/08/2024 a bien ete consulter', 'Secrétaire', 'oui'),
(142, 'Vous avez reçu un Courrier provenant de la ', '3', '4', 'Courrier-arrive', '05/08/2024', 'Secrétaire', 'oui'),
(143, 'Le courrier que vous avez envoye vers ', '4', '3', 'courrier', '05/08/2024 a bien ete consulter', 'Secrétaire', 'oui'),
(144, 'Vous avez reçu un Courrier provenant de la ', '3', '2', 'Courrier-arrive', '05/08/2024', 'Secrétaire', 'non'),
(145, 'Vous avez reçu un Courrier provenant de la ', '3', '5', 'Courrier-arrive', '05/08/2024', 'Secrétaire', 'non'),
(146, 'Le courrier que vous avez envoye vers ', '2', '3', 'courrier', '05/08/2024 a bien ete consulter', 'Secrétaire', 'non'),
(147, 'Le courrier que vous avez envoye vers ', '5', '3', 'courrier', '05/08/2024 a bien ete consulter', 'Secrétaire', 'non'),
(148, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '05/08/2024', 'Service du Personnel', 'non'),
(149, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '05/08/2024', 'Service du Personnel', 'non'),
(150, 'Un courrier provenant du secretariat vous a ete transferé', '4', '4', 'courrier', '05/08/2024', 'Chef de Service', 'non'),
(151, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '05/08/2024', 'Chef de Service', 'non'),
(152, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '05/08/2024', 'Chef de Service', 'non'),
(153, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '05/08/2024', 'Chef de Service', 'non'),
(154, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '05/08/2024', 'Chef de Service', 'non'),
(155, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '05/08/2024', 'Chef de Service', 'non'),
(156, 'Le courrier que vous avez envoye vers ', '3', '2', 'courrier', '24/06/2024 a bien ete consulter', 'Secrétaire', 'non'),
(157, 'Un courrier provenant du secretariat vous a ete transferé', '3', '3', 'courrier', '06/08/2024', 'Chef de Service', 'non'),
(158, 'Vous avez reçu un Courrier provenant de la ', '3', '4', 'Courrier-arrive', '06/08/2024', 'Secrétaire', 'oui'),
(159, 'Le courrier que vous avez envoye vers ', '4', '3', 'courrier', '06/08/2024 a bien ete consulter', 'Secrétaire', 'non'),
(160, 'Vous avez reçu un Courrier provenant de la ', '3', '4', 'Courrier-arrive', '06/08/2024', 'Secrétaire', 'oui'),
(161, 'Le courrier que vous avez envoye vers ', '4', '3', 'courrier', '06/08/2024 a bien ete consulter', 'Secrétaire', 'non'),
(162, 'Vous avez reçu un Courrier provenant de la ', '3', '4', 'Courrier-arrive', '06/08/2024', 'Secrétaire', 'oui'),
(163, 'Vous avez reçu un Courrier provenant de la ', '3', '2', 'Courrier-arrive', '06/08/2024', 'Secrétaire', 'non'),
(164, 'Le courrier que vous avez envoye vers ', '4', '3', 'courrier', '06/08/2024 a bien ete consulter', 'Secrétaire', 'non'),
(165, 'Le courrier que vous avez envoye vers ', '2', '3', 'courrier', '06/08/2024 a bien ete consulter', 'Secrétaire', 'non'),
(166, 'Vous avez reçu un Courrier provenant de la ', '4', '3', 'Courrier-arrive', '08/08/2024', 'Secrétaire', 'non'),
(167, 'Vous avez reçu un Courrier provenant de la ', '4', '2', 'Courrier-arrive', '08/08/2024', 'Secrétaire', 'non'),
(168, 'Le courrier que vous avez envoye vers ', '2', '4', 'courrier', '08/08/2024 a bien ete consulter', 'Secrétaire', 'oui'),
(169, 'Le courrier que vous avez envoye vers ', '3', '4', 'courrier', '08/08/2024 a bien ete consulter', 'Secrétaire', 'oui'),
(170, 'Vous avez reçu un Courrier provenant de la ', '3', '2', 'Courrier-arrive', '08/08/2024', 'Secrétaire', 'non'),
(171, 'Vous avez reçu un Courrier provenant de la ', '3', '4', 'Courrier-arrive', '08/08/2024', 'Secrétaire', 'oui'),
(172, 'Vous avez reçu un Courrier provenant de la ', '3', '5', 'Courrier-arrive', '08/08/2024', 'Secrétaire', 'non'),
(173, 'Le courrier que vous avez envoye vers ', '4', '3', 'courrier', '08/08/2024 a bien ete consulter', 'Secrétaire', 'non'),
(174, 'Le courrier que vous avez envoye vers ', '5', '3', 'courrier', '08/08/2024 a bien ete consulter', 'Secrétaire', 'non'),
(175, 'Le courrier que vous avez envoye vers ', '2', '3', 'courrier', '08/08/2024 a bien ete consulter', 'Secrétaire', 'non'),
(176, 'Vous avez reçu un fichier provenant de la Secrétaire de la', '1', '1', 'fichier', '09/08/2024', 'Directeur Général', 'non'),
(177, 'Vous avez reçu un fichier provenant de la Directeur Général de la', '1', '1', 'fichier', '09/08/2024', 'Secrétaire', 'non'),
(178, 'Vous avez reçu un Courrier provenant de la ', '1', '2', 'Courrier-arrive', '09/08/2024', 'Secrétaire', 'non'),
(179, 'Le courrier que vous avez envoye vers ', '2', '1', 'courrier', '09/08/2024 a bien ete consulter', 'Secrétaire', 'non'),
(180, 'Un courrier vous a été transférer provenant du secrétariat de la', '2', '2', 'courrier', '09/08/2024', 'Directeur Général', 'non'),
(181, 'Un courrier vous a été renvoyer provenant du Directeur Général de la ', '2', '2', 'courrier', '09/08/2024', 'Secrétaire', 'non'),
(182, 'Un courrier provenant du secretariat vous a ete transferé', '2', '2', 'courrier', '09/08/2024', 'Chef de Service', 'non'),
(183, 'Un courrier vous a été renvoyer provenant du Chef de Service de la ', '2', '2', 'courrier', '09/08/2024', 'Secrétaire', 'non'),
(184, 'Le courrier que vous avez envoye vers ', '4', 'Mr Nounga', 'courrier', '11/08/2024 a bien ete consulter', 'Secrétaire', 'non'),
(185, 'Un courrier provenant du secretariat vous a ete transferé', '4', '4', 'courrier', '11/08/2024', 'Chef de Service', 'non'),
(186, 'Un courrier vous a été renvoyer provenant du Chef de Service de la ', '4', '4', 'courrier', '11/08/2024', 'Secrétaire', 'oui'),
(187, 'Un courrier provenant du secretariat vous a ete transferé', '4', '4', 'courrier', '12/08/2024', 'Chef de Service', 'non'),
(188, 'Un courrier vous a été renvoyer provenant du Chef de Service de la ', '4', '4', 'courrier', '12/08/2024', 'Secrétaire', 'oui'),
(189, 'Un courrier vous a été renvoyer provenant du Chef de Service de la ', '4', '4', 'courrier', '12/08/2024', 'Secrétaire', 'oui'),
(190, 'Un courrier vous a été transférer provenant du secrétariat de la', '4', '4', 'courrier', '11/08/2024', 'Directeur Général', 'non'),
(191, 'Un courrier provenant du secretariat vous a ete transferé', '4', '4', 'courrier', '12/08/2024', 'Chef de Service', 'non'),
(192, 'Un courrier vous a été renvoyer provenant du Chef de Service de la ', '4', '4', 'courrier', '12/08/2024', 'Secrétaire', 'oui');

-- --------------------------------------------------------

--
-- Structure de la table `registre`
--

CREATE TABLE `registre` (
  `id` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `objet` varchar(255) NOT NULL,
  `expediteur` varchar(255) NOT NULL,
  `recpetionnaire` varchar(255) NOT NULL,
  `type_transmission` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sous_structure`
--

CREATE TABLE `sous_structure` (
  `id` int(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `id_structure` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sous_structure`
--

INSERT INTO `sous_structure` (`id`, `nom`, `id_structure`) VALUES
(1, 'serivce', 1),
(2, 'monais', 1),
(4, 'Service Etude', 2),
(5, 'dd', 1),
(6, 'dad', 5),
(7, 'dd', 5),
(8, 'Service du Personnel', 3),
(9, 'Service Financiere', 4),
(10, 'sdsds', 1),
(11, 'dsfdfds', 1),
(12, 'nfc', 1),
(13, 'NFFC', 1),
(14, 'Secretariat', 3);

-- --------------------------------------------------------

--
-- Structure de la table `structure`
--

CREATE TABLE `structure` (
  `id` int(11) NOT NULL,
  `Description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `transfert`
--

CREATE TABLE `transfert` (
  `id` int(11) NOT NULL,
  `recepteur` varchar(255) NOT NULL,
  `expediteur` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `note` varchar(255) NOT NULL,
  `structure` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `transfert`
--

INSERT INTO `transfert` (`id`, `recepteur`, `expediteur`, `date`, `note`, `structure`) VALUES
(1, 'Particulie(re)', 'Sécretaire', '08/05/2024', 'recevez ceci', '1'),
(2, 'Directeur Général', 'Sécretaire', '13/05/2024', 'rece', '4'),
(3, 'Sécretaire', 'Directeur Général', '17/05/2024', 'edsqdef', '2'),
(4, 'Directeur Général', 'Sécretaire', '17/05/2024', 'Recevez ceci', '3'),
(5, 'Directeur Général', 'Sécretaire', '17/05/2024', 'recevez', '2'),
(6, 'Chef de Service', 'Sécretaire', '17/05/2024', 'cxcx', '2'),
(7, 'Sécretaire', 'Directeur Général', '17/05/2024', 'xvcv', '2'),
(8, 'Directeur Général', 'Sécretaire', '17/05/2024', 'sfsd', '2'),
(9, 'Sécretaire', 'Directeur Général', '17/05/2024', 'recois ca', '2'),
(10, 'Sécretaire', 'Directeur Général', '17/05/2024', 'recoit ca', '2'),
(11, 'Sécretaire', 'Directeur Général', '17/05/2024', 'jkj', '2'),
(12, 'Sécretaire', 'Directeur Général', '17/05/2024', 'jjj', '2'),
(13, 'Sécretaire', 'Directeur Général', '17/05/2024', 'sdsdsd', '2'),
(14, 'Directeur Général', 'Sécretaire', '17/05/2024', 'voyez', '2'),
(15, 'Directeur Général', 'Sécretaire', '23/05/2024', 'recevez ce fichier concernant un courrier', '3'),
(16, 'Directeur Général', 'Sécretaire', '23/05/2024', 'idem', '3'),
(17, 'Sécretaire', 'Directeur Général', '25/05/2024', 'voyez ce que voiu ss', '3'),
(18, 'Sécretaire', 'Directeur Général', '25/05/2024', 'cxc', '3'),
(19, 'Sécretaire', 'Directeur Général', '25/05/2024', 'freze', '3'),
(20, 'Directeur Général', 'Chef de Service', '25/05/2024', 'sky', '3'),
(21, 'Directeur Général', 'Sécretaire', '26/05/2024', 'dd', '3'),
(22, 'Sécretaire', 'Chef de Service', '26/05/2024', 'fdff', '3'),
(23, 'Particulie(re)', 'Sécretaire', '26/05/2024', 'cc', '3'),
(24, 'Sécretaire', 'Chef de Service', '26/05/2024', 'ddd', '3'),
(25, 'Sécretaire', 'Chef de Service', '26/05/2024', 'xcx', '3'),
(26, 'Particulie(re)', 'Chef de Service', '26/05/2024', 'dd', '3'),
(27, 'Particulie(re)', 'Chef de Service', '26/05/2024', 'xxv', '3'),
(28, 'Chef de Service', 'Secrétaire', '13/06/2024', 'ffff', '2'),
(29, 'Chef de Service', 'Secrétaire', '13/06/2024', 'cc', '3'),
(30, 'Directeur Général', 'Secrétaire', '13/06/2024', 'dff', '3'),
(31, 'Directeur Général', 'Secrétaire', '14/06/2024', 'dfd', '2'),
(32, 'Secrétaire', 'Directeur Général', '24/06/2024', 'Transférez ce fichier vers le Directeur de la DAP', '3'),
(33, 'Directeur Général', 'Secrétaire', '09/08/2024', 'Demande de stage de Mr Nounga Freze ', '1'),
(34, 'Secrétaire', 'Directeur Général', '09/08/2024', 'Instructions pour la demande de stage de Mr Nounga', '1');

-- --------------------------------------------------------

--
-- Structure de la table `transmission`
--

CREATE TABLE `transmission` (
  `id` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `destinataire` varchar(255) NOT NULL,
  `expediteur` varchar(255) NOT NULL,
  `transmis` varchar(255) NOT NULL,
  `id_courier` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `transmission`
--

INSERT INTO `transmission` (`id`, `date`, `destinataire`, `expediteur`, `transmis`, `id_courier`) VALUES
(1, '09/08/2024', 'Chef de Service', '2', 'oui', 10),
(2, '11/08/2024', 'Chef de Service', '4', 'oui', 12),
(3, '12/08/2024', 'Chef de Service', '4', 'oui', 1),
(4, '12/08/2024', 'Chef de Service', '4', 'oui', 2);

-- --------------------------------------------------------

--
-- Structure de la table `type_structure`
--

CREATE TABLE `type_structure` (
  `id` int(11) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `dar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `type_structure`
--

INSERT INTO `type_structure` (`id`, `Description`, `dar`) VALUES
(1, 'La Direction Générale', ''),
(2, 'La Direction Technique', ''),
(3, 'La Direction Administrative et du Personnel', ''),
(4, 'La Direction Financière et Comptable', ''),
(5, 'La Direction Commerciale', ''),
(6, '46', '11/08/2024');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `agent`
--
ALTER TABLE `agent`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `courier`
--
ALTER TABLE `courier`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `data_transfere`
--
ALTER TABLE `data_transfere`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `doc`
--
ALTER TABLE `doc`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `document_user`
--
ALTER TABLE `document_user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `doc_strucutre`
--
ALTER TABLE `doc_strucutre`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `fichier_personnel`
--
ALTER TABLE `fichier_personnel`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `historic`
--
ALTER TABLE `historic`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `registre`
--
ALTER TABLE `registre`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `sous_structure`
--
ALTER TABLE `sous_structure`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `structure`
--
ALTER TABLE `structure`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `transfert`
--
ALTER TABLE `transfert`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `transmission`
--
ALTER TABLE `transmission`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `type_structure`
--
ALTER TABLE `type_structure`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `agent`
--
ALTER TABLE `agent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `courier`
--
ALTER TABLE `courier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `data_transfere`
--
ALTER TABLE `data_transfere`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `doc`
--
ALTER TABLE `doc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `document_user`
--
ALTER TABLE `document_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `doc_strucutre`
--
ALTER TABLE `doc_strucutre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `fichier_personnel`
--
ALTER TABLE `fichier_personnel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `historic`
--
ALTER TABLE `historic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- AUTO_INCREMENT pour la table `registre`
--
ALTER TABLE `registre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `sous_structure`
--
ALTER TABLE `sous_structure`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `structure`
--
ALTER TABLE `structure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `transfert`
--
ALTER TABLE `transfert`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT pour la table `transmission`
--
ALTER TABLE `transmission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `type_structure`
--
ALTER TABLE `type_structure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
