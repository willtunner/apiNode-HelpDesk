-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.10-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para helpdeskapi
CREATE DATABASE IF NOT EXISTS `helpdeskapi` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `helpdeskapi`;

-- Copiando estrutura para tabela helpdeskapi.empresas
CREATE TABLE IF NOT EXISTS `empresas` (
  `id_emp` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `phone` varchar(50) NOT NULL DEFAULT '0',
  `cnpj` varchar(50) NOT NULL DEFAULT '0',
  `obs` varchar(700) NOT NULL DEFAULT '0',
  `ip_scef` varchar(50) NOT NULL DEFAULT '0',
  `mac_scef` varchar(50) NOT NULL DEFAULT '0',
  `conexao_scef` varchar(50) NOT NULL DEFAULT '0',
  `ip_nfce` varchar(50) NOT NULL DEFAULT '0',
  `mac_nfce` varchar(50) NOT NULL DEFAULT '0',
  `conexao_nfce` varchar(50) NOT NULL DEFAULT '0',
  `ip_nfe` varchar(50) NOT NULL DEFAULT '0',
  `mac_nfe` varchar(50) NOT NULL DEFAULT '0',
  `conexao_nfe` varchar(50) NOT NULL DEFAULT '0',
  `ip_mobile` varchar(50) NOT NULL DEFAULT '0',
  `ip_coletor` varchar(50) NOT NULL DEFAULT '0',
  `version_estoque` int(11) NOT NULL DEFAULT 0,
  `version_nfce` int(11) NOT NULL DEFAULT 0,
  `version_nfe` int(11) NOT NULL DEFAULT 0,
  `version_checkout` int(11) NOT NULL DEFAULT 0,
  `version_sisseg` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_emp`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela helpdeskapi.empresas: 2 rows
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` (`id_emp`, `name`, `phone`, `cnpj`, `obs`, `ip_scef`, `mac_scef`, `conexao_scef`, `ip_nfce`, `mac_nfce`, `conexao_nfce`, `ip_nfe`, `mac_nfe`, `conexao_nfe`, `ip_mobile`, `ip_coletor`, `version_estoque`, `version_nfce`, `version_nfe`, `version_checkout`, `version_sisseg`) VALUES
	(4, 'Economico will', '(91) xxxx-xxxx', '14.660.263/0001-31', 'Empresa do jurunas', '192.168.0.100', '192.168.0.100', '123456789', '192.168.0.100', '192.168.0.100', '192.168.0.100', '192.168.0.100', '192.168.0.100', '192.168.0.100', '192.168.0.100', '192.168.0.100', 1009, 486, 116, 17, 9),
	(5, 'Economico', '(91) xxxx-xxxx', '14.660.263/0001-31', 'Empresa do jurunas', '192.168.0.100', '192.168.0.100', '123456789', '192.168.0.100', '192.168.0.100', '192.168.0.100', '192.168.0.100', '192.168.0.100', '192.168.0.100', '192.168.0.100', '192.168.0.100', 1009, 486, 116, 17, 9);
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;

-- Copiando estrutura para tabela helpdeskapi.funcionarios
CREATE TABLE IF NOT EXISTS `funcionarios` (
  `id_func` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `genero` varchar(50) NOT NULL,
  `id_emp` int(11) NOT NULL,
  `conexao` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id_func`),
  KEY `FK_funcionarios_empresas` (`id_emp`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela helpdeskapi.funcionarios: 0 rows
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;

-- Copiando estrutura para tabela helpdeskapi.pedidos
CREATE TABLE IF NOT EXISTS `pedidos` (
  `id_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `quantidade` varchar(50) NOT NULL DEFAULT '0',
  `id_produto` int(11) NOT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `id_produto` (`id_produto`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela helpdeskapi.pedidos: 1 rows
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` (`id_pedido`, `quantidade`, `id_produto`) VALUES
	(1, '12', 1);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;

-- Copiando estrutura para tabela helpdeskapi.produtos
CREATE TABLE IF NOT EXISTS `produtos` (
  `id_produto` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `preco` float DEFAULT NULL,
  PRIMARY KEY (`id_produto`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela helpdeskapi.produtos: 6 rows
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` (`id_produto`, `nome`, `preco`) VALUES
	(1, 'Vingadores ultimato', 1000),
	(2, 'Produto Editado', 10),
	(3, 'O labirinto do Fauno', 250.15),
	(5, 'O labirinto do Fauno', 250.15),
	(6, 'O labirinto do Fauno', 250.15),
	(7, 'Final Fantasy 7R', 250.25);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
