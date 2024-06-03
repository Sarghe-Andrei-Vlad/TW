DELIMITER //

CREATE PROCEDURE populate_footwear()
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE personal_style TEXT;
    DECLARE type TEXT;
    DECLARE gender CHAR(50);
    DECLARE age CHAR(50);
    DECLARE color TEXT;
    DECLARE pattern TEXT;
    DECLARE season CHAR(50);
    DECLARE weather CHAR(50);

    WHILE i < 40 DO
        SET personal_style = ELT(FLOOR(1 + RAND() * 17), 'sportswear','smart casual','formal','grunge','elegant','hipster','bohemian','vintage','casual','gothic','punk','minimalist','artsy','glam','rock','retro','chic');
        SET type = ELT(FLOOR(1 + RAND() * 24), 'flats','high heels','boots','sneakers','sandals','slippers','loafers','oxfords','wedges','mules','espadrilles','ankle boots','platform shoes','derby shoes','chelsea boots','flip-flops','brogues','clogs','hiking boots','combat boots','rain boots','knee-high boots','kitten heels','moccasins');
        SET gender = ELT(FLOOR(1 + RAND() * 3), 'female','male','unisex');
        SET age = ELT(FLOOR(1 + RAND() * 3), 'child','teen','adult');
        SET color = ELT(FLOOR(1 + RAND() * 11), 'black','brown','white','grey','beige','navy','pink','purple','red','green','light blue');
        SET pattern = ELT(FLOOR(1 + RAND() * 10), 'plain','dots','stripes','paisley','floral','geometric','animal print','plaid','houndstooth','camouflage');
        SET season = ELT(FLOOR(1 + RAND() * 4), 'spring','summer','winter','autumn');
        SET weather = ELT(FLOOR(1 + RAND() * 5), 'sunny','rainy','cold','windy','snowy');

        INSERT INTO Footwear (personal_style, type, gender, age, color, pattern, season, weather, image_url)
        VALUES (
            personal_style,
            type,
            gender,
            age,
            color,
            pattern,
            season,
            weather,
            CONCAT('images/image', i + 1, '.jpg')
        );

        SET i = i + 1;
    END WHILE;
END//

DELIMITER ;

CALL populate_footwear();

-- drop procedure populate_footwear;

SELECT * from Footwear;