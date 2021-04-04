SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `BlossomHana`
--

CREATE DATABASE BlossomHana;
USE BlossomHana;

-- --------------------------------------------------------

--
-- Structure de la table `bouquets`
--

CREATE TABLE `bouquets` (
  `idBouquet` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text NOT NULL,
  `price` int NOT NULL,
  `isPredefined` tinyint(1) NOT NULL,
  `isCompleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `bouquets`
--

INSERT INTO `bouquets` (`idBouquet`, `name`, `image`, `description`, `price`, `isPredefined`, `isCompleted`) VALUES
(1, 'Purple Rain', '/images/fleur1.jpg', 'Named in reference to the famous song \"Purple Rain\" from Prince. This beautiful combination of white and purple will surely please the one with whom you want to dance in the purple rain', 30, 1, 1),
(2, 'Bloody rose', '/images/fleur2.jpg', 'Red roses are timeless, classic and iconic. Whether it\'s a romantic gesture or a meaningful gift to share how much you care, this bouquet of a dozen roses is bound to make your loved one swoon.\r\n\r\n', 50, 1, 1),
(3, 'Moonlight white rose', '/images/fleur3.jpg', 'Uplifting, bright, and fit for any phase of life. A farm-fresh selection of a dozen white roses fills a clear glass vase to dazzle everyone you love.\r\n\r\n', 100, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `flowers`
--

CREATE TABLE `flowers` (
  `idFlower` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` text NOT NULL,
  `price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `flowers`
--

INSERT INTO `flowers` (`idFlower`, `name`, `image`, `price`) VALUES
(1, 'rose', '/images/rose.jpg', 5),
(2, 'tulip', '/images/tulipe.jpg', 3),
(3, 'daisy', '/images/marguerite.jpg', 1);

-- --------------------------------------------------------

--
-- Structure de la table `ordered`
--

CREATE TABLE `ordered` (
  `idOrder` int NOT NULL,
  `idUser` int NOT NULL,
  `idBouquet` int NOT NULL,
  `date` date NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `password`, `type`) VALUES
(1, 'client@mail.fr', 'Client', '$2a$10$eKMk2eHIZa1TR3qZNs4jduCau1AG7F0YM9wMFHqQr30fHTFrSD08u', 'client'),
(2, 'admin@mail.fr', 'Admin', '$2a$10$wwTdQsZqtwNx5NX7UZRc.eS2G49G8G6hl.HExSVNvhO3cv07PiUJS', 'employee');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `bouquets`
--
ALTER TABLE `bouquets`
  ADD PRIMARY KEY (`idBouquet`);

--
-- Index pour la table `flowers`
--
ALTER TABLE `flowers`
  ADD PRIMARY KEY (`idFlower`);

--
-- Index pour la table `ordered`
--
ALTER TABLE `ordered`
  ADD PRIMARY KEY (`idOrder`),
  ADD KEY `idBouquet` (`idBouquet`),
  ADD KEY `idUser` (`idUser`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `bouquets`
--
ALTER TABLE `bouquets`
  MODIFY `idBouquet` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `flowers`
--
ALTER TABLE `flowers`
  MODIFY `idFlower` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `ordered`
--
ALTER TABLE `ordered`
  MODIFY `idOrder` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ordered`
--
ALTER TABLE `ordered`
  ADD CONSTRAINT `ordered_ibfk_1` FOREIGN KEY (`idBouquet`) REFERENCES `bouquets` (`idBouquet`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `ordered_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
