drop database comprasdb;
create database comprasdb;
use comprasdb;

CREATE TABLE tb_produto (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	codigo VARCHAR(30) NOT NULL,
	cean VARCHAR(30) NOT NULL,
	nome VARCHAR(300) NOT NULL, 
	ncm VARCHAR(30) NOT NULL,
	cest VARCHAR(30) NOT NULL,
	cfop VARCHAR(30) NOT NULL,
	/*unidadeComprada VARCHAR(30) NOT NULL,
	quantidadeComprada int(10) NOT NULL,
	valorUnidade double(10,2) NOT NULL,
	valorProduto double(10,2) NOT NULL,
	ceantrib VARCHAR(30) NOT NULL,
	utrib VARCHAR(20) NOT NULL,
	qtrib int(4) NOT NULL,
	vunTrib VARCHAR(30) NOT NULL,
	indtot int(10) NOT NULL,
    */
	reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE tb_estabelecimento(
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	cnpj VARCHAR(15) NOT NULL,
    nome VARCHAR(200) NOT NULL,
    logradouro VARCHAR(200) NOT NULL,
    numero int(5) NOT NULL,
    bairro VARCHAR(50),
    municipio VARCHAR(50),
    uf VARCHAR(2),
    cep VARCHAR(8),
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
create table tb_compra(
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_mercado int,
    data_compra date,
    hora time,
    numero INT NOT NULL,
    serie INT NOT NULL,
    valor_total double(6,2),
    valor_icms double(6,2),
    valor_icms_desc double(6,2),
    valor_produtos double(6,2),
    valor_nf double(8,2)
);

create table mtm_produto_compra(
	id_produto INT UNSIGNED NOT NULL,
    id_compra INT UNSIGNED NOT NULL,
	unidadeComprada VARCHAR(30) NOT NULL,
	quantidadeComprada int(10) NOT NULL,
	valorUnidade double(10,2) NOT NULL,
	valorProduto double(10,2) NOT NULL,
	ceantrib VARCHAR(30) NOT NULL,
	utrib VARCHAR(20) NOT NULL,
	qtrib int(4) NOT NULL,
	vunTrib VARCHAR(30) NOT NULL,
	indtot int(10) NOT NULL,
    valor_icms double(10,2) DEFAULT 0,
    total_imposto double(10,2) DEFAULT 0,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `Constr_produto_fk`
        FOREIGN KEY `produto_fk` (`id_produto`) REFERENCES `tb_produto` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `Constr_compra_fk`
        FOREIGN KEY `Compra_fk` (`id_compra`) REFERENCES `tb_compra` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE
        
);

create table tb_usuario(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY, 
	id_social varchar(300),
    token varchar(300),
    nome varchar(250),
    email varchar(250),
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table tb_perfil(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nome varchar(300),
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table mtm_usuario_perfil(
	id_usuario INT UNSIGNED NOT NULL,
    id_perfil INT UNSIGNED NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `Constr_usuario_fk`
        FOREIGN KEY `Usuario_perfil_perfil_fk` (`id_usuario`) REFERENCES `tb_usuario` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `Constr_perfil_fk`
        FOREIGN KEY `Usuario_perfil_usuario_fk` (`id_perfil`) REFERENCES `tb_perfil` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE
        
);

create table mtm_perfil_compra(
	id_perfil INT UNSIGNED NOT NULL,
    id_compra INT UNSIGNED NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `Constr_Perfil_Compra_compra_fk`
        FOREIGN KEY `Compra_fk` (`id_compra`) REFERENCES `tb_compra` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `Constr_Perfil_Compra_perfil_fk`
        FOREIGN KEY `Perfil_fk` (`id_perfil`) REFERENCES `tb_perfil` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE
        
);
create table tb_ncm(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    codigo  varchar(255) UNIQUE,
    nome varchar(300),
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table tb_carrinho(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_perfil INT UNSIGNED NOT NULL,
    ncm  varchar(255),
    nome varchar(300),
    preco_anterior double(10,2),
    quantidade INT,
    comprado boolean,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `Constr_Carrinho_Perfil_fk`
        FOREIGN KEY `Perfil_fk` (`id_perfil`) REFERENCES `tb_perfil` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE
);