create database geolog;
create user 'geologer'@'localhost' identified by 'sE6Rdfst6E';
grant all privileges on geolog.* TO 'geologer'@'localhost';

CREATE TABLE `geo_log` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `address_id` INT(10) NOT NULL,
    `lat` DECIMAL(10 , 8 ) NOT NULL,
    `lng` DECIMAL(11 , 8 ) NOT NULL,
    `logged_at` TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`),
    KEY ind_address_id (`address_id`)
)  ENGINE=INNODB AUTO_INCREMENT=100 CHARACTER SET UTF8 COLLATE UTF8_GENERAL_CI;

CREATE TABLE `geo_address` (
    `id` INT(10) NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
)  ENGINE=INNODB AUTO_INCREMENT=100 CHARACTER SET UTF8 COLLATE UTF8_GENERAL_CI;

CREATE TABLE `addr_check` (
    `id` INT(10) NOT NULL AUTO_INCREMENT,
    `address_id` INT(10) NOT NULL,
    `status` ENUM('YES', 'NO') NOT NULL,
    `checkdate` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY ind_address_id (`address_id`)
)  ENGINE=INNODB AUTO_INCREMENT=100 CHARACTER SET UTF8 COLLATE UTF8_GENERAL_CI;

