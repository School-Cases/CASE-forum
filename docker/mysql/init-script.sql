-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema glimradb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema glimradb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `glimradb` DEFAULT CHARACTER SET utf8 ;
USE `glimradb` ;

-- -----------------------------------------------------
-- Table `glimradb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `glimradb`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `type` TINYINT(1) NOT NULL,
  `image` VARCHAR(45) NULL,
  `course` VARCHAR(45) NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `glimradb`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `glimradb`.`post` (
  `post_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `text` VARCHAR(200) NOT NULL,
  `time` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`post_id`, `user_id`),
  INDEX `fk_post_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_post_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `glimradb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `glimradb`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `glimradb`.`comment` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `post_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `text` VARCHAR(200) NULL,
  PRIMARY KEY (`comment_id`, `post_id`, `user_id`),
  INDEX `fk_comment_post1_idx` (`post_id` ASC) VISIBLE,
  INDEX `fk_comment_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `glimradb`.`post` (`post_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `glimradb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `glimradb`.`reaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `glimradb`.`reaction` (
  `reaction_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `type` TINYINT(1) NOT NULL,
  `post_id` INT NOT NULL,
  `comment_id` INT NOT NULL,
  `reaction` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`reaction_id`, `user_id`),
  INDEX `fk_like_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_like_post1_idx` (`post_id` ASC) VISIBLE,
  INDEX `fk_like_comment1_idx` (`comment_id` ASC) VISIBLE,
  CONSTRAINT `fk_like_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `glimradb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_like_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `glimradb`.`post` (`post_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_like_comment1`
    FOREIGN KEY (`comment_id`)
    REFERENCES `glimradb`.`comment` (`comment_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `glimradb`.`hashtag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `glimradb`.`hashtag` (
  `hashtag_id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(200) NOT NULL,
  `interactions` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`hashtag_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `glimradb`.`post_hashtag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `glimradb`.`post_hashtag` (
  `hashtag_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`hashtag_id`, `post_id`),
  INDEX `fk_post_hashtag_post1_idx` (`post_id` ASC) VISIBLE,
  CONSTRAINT `fk_post_hashtag_hashtag1`
    FOREIGN KEY (`hashtag_id`)
    REFERENCES `glimradb`.`hashtag` (`hashtag_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_hashtag_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `glimradb`.`post` (`post_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `glimradb`.`user_hashtag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `glimradb`.`user_hashtag` (
  `user_id` INT NOT NULL,
  `hashtag_id` INT NOT NULL,
  `interactions` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`user_id`, `hashtag_id`),
  INDEX `fk_user_hashtag_hashtag1_idx` (`hashtag_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_hashtag_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `glimradb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_hashtag_hashtag1`
    FOREIGN KEY (`hashtag_id`)
    REFERENCES `glimradb`.`hashtag` (`hashtag_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
