CREATE DATABASE IF NOT EXISTS fosa_database;

USE fosa_database;

CREATE TABLE IF NOT EXISTS Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    preferences TEXT,
    status int default 0,
    primary key(userId)
);

CREATE TABLE IF NOT EXISTS codes
    (
    userId int not null,
    code varchar(80) not null,
    foreign key(userId) references users(userId)
);

CREATE TABLE IF NOT EXISTS Footwear (
    FootwearID INT PRIMARY KEY AUTO_INCREMENT,
    personal_style VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    gender VARCHAR(10),
    age VARCHAR(10),
    color VARCHAR(50) NOT NULL,
    pattern VARCHAR(50),
    season VARCHAR(20) NOT NULL,
    weather VARCHAR(20) NOT NULL,
    special_traits TEXT,
    image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Reviews (
    RecommendationID INT PRIMARY KEY AUTO_INCREMENT,
    FootwearID INT,
    recommendation_description TEXT,
    review TEXT,
    rating INT,
    FOREIGN KEY (FootwearID) REFERENCES Footwear(FootwearID)
);

CREATE TABLE IF NOT EXISTS Statistics (
    StatisticID INT PRIMARY KEY AUTO_INCREMENT,
    metric VARCHAR(50) NOT NULL,
    value INT
);