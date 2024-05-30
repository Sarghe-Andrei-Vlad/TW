create database fosa_database;

use fosa_database;

CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    preferences TEXT,
    status int default 0,
    primary key(userId)
);

create table codes
    (
    userId int not null,
    code varchar(80) not null,
    foreign key(userId) references users(userId)
);

CREATE TABLE Footwear (
    FootwearID INT PRIMARY KEY AUTO_INCREMENT,
    brand VARCHAR(50) NOT NULL,
    style VARCHAR(50) NOT NULL,
    gender VARCHAR(10),
    color VARCHAR(50) NOT NULL,
    season VARCHAR(20) NOT NULL,
    special_traits TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255)
);

CREATE TABLE Recommendations (
    RecommendationID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    FootwearID INT,
    occasion VARCHAR(50) NOT NULL,
    recommendation_description TEXT,
    rating INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (FootwearID) REFERENCES Footwear(FootwearID)
);

CREATE TABLE Statistics (
    StatisticID INT PRIMARY KEY AUTO_INCREMENT,
    metric VARCHAR(50) NOT NULL,
    value INT
);