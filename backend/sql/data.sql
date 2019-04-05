INSERT INTO Furniture VALUES(1, 'Accent Table', 'Three drawers on wood slides open to reveal plenty of room to tuck away small-scale must-haves, while the top offers space to place a lamp, books, and more.', 'Accent_table.jpg', 7);
INSERT INTO Furniture VALUES(2, 'Lamp', 'A nice white lamp.', 'lamp.png', 1);

INSERT INTO Steps VALUES(1, 0, NULL, '', '');
INSERT INTO Steps VALUES(2, 0, NULL, '', '');
INSERT INTO Steps VALUES(2, 1, NULL, 'lamp_step1.png', 'https://www.youtube.com/embed/bkyo5lpLQMY');
INSERT INTO Steps VALUES(1, 1, NULL, 'table_step1.png', 'https://www.youtube.com/embed/MHp-UEC9tQ4');
INSERT INTO Steps VALUES(1, 2, NULL, 'table_step2.png', 'https://www.youtube.com/embed/yVdLjqTq7sY');
INSERT INTO Steps VALUES(1, 3, NULL, 'table_step3.png', 'https://www.youtube.com/embed/ImvDnnRtoTY');
INSERT INTO Steps VALUES(1, 4, NULL, 'table_step4.png', 'https://www.youtube.com/embed/IEKfTD5-eLs');
INSERT INTO Steps VALUES(1, 5, NULL, 'table_step5.png', 'https://www.youtube.com/embed/5467aFq7yHY');
INSERT INTO Steps VALUES(1, 6, NULL, 'table_step6.png', 'https://www.youtube.com/embed/HBZauC7ZY14');
INSERT INTO Steps VALUES(1, 7, NULL, 'table_step7.png', 'https://www.youtube.com/embed/Tdo_KB6QV54');
INSERT INTO Components VALUES(1, "Top Panel", "A.png", "A_.jpg", NULL);
INSERT INTO Components VALUES(2, "Middle Panel", "B.png", "B_.jpg", NULL);
INSERT INTO Components VALUES(3, "Bottom Panel", "C.png", "C_.jpg", NULL);
INSERT INTO Components VALUES(4, "Back Panel", "D.png", "D_.jpg", NULL);
INSERT INTO Components VALUES(5, "Left Panel", "E.png", "E_.jpg", NULL);
INSERT INTO Components VALUES(6, "Right Panel", "F.png", "F_.jpg", NULL);
INSERT INTO Components VALUES(7, "Foot", "G.png", "G_.jpg", NULL);
INSERT INTO Components VALUES(8, "Wood Dowel", "H.png", "H_.jpg", NULL);
INSERT INTO Components VALUES(9, "Front Panel(Darwer)", "I.png", "I_.jpg", NULL);
INSERT INTO Components VALUES(10, "Left Panel(Darwer)", "J.png", "J_.jpg", NULL);
INSERT INTO Components VALUES(11, "Right Panel(Darwer)", "K.png", "K_.jpg", NULL);
INSERT INTO Components VALUES(12, "Back Panel(Darwer)", "L.png", "L_.jpg", NULL);
INSERT INTO Components VALUES(13, "Bottom Panel(Darwer)", "M.png", "M_.jpg", NULL);
INSERT INTO Components VALUES(14, "Knob", "N.png", "N_.jpg", NULL);
INSERT INTO Components VALUES(15, "Cam Lock", "O.png", "O_.jpg", NULL);
INSERT INTO Components VALUES(16, "Cam Lock Screwer", "P.png", "P_.jpg", NULL);
INSERT INTO Components VALUES(17, "Small Screwer(Foot)", "Q.png", "Q_.jpg", NULL);
INSERT INTO Components VALUES(18, "Screwer(Draer)", "R.png", "R_.jpg", NULL);
INSERT INTO Components VALUES(19, "Bolt (Knob)", "S.png", "S_.jpg", NULL);

INSERT INTO Tools VALUES(1, 'Cross Screwdriver', 'cross_screwdriver.png', NULL);
INSERT INTO Tools_needed VALUES(1, 1, 1);
INSERT INTO Tools_needed VALUES(1, 2, 1);
INSERT INTO Tools_needed VALUES(1, 3, 1);
INSERT INTO Tools_needed VALUES(1, 4, 1);
INSERT INTO Tools_needed VALUES(1, 5, 1);
INSERT INTO Tools_needed VALUES(1, 6, 1);
INSERT INTO Tools_needed VALUES(1, 7, 1);

INSERT INTO Users VALUES(1, "Xiaoyu", "password");
INSERT INTO Users VALUES(2, "Jingyuan", "password");

INSERT INTO Comments VALUES(1, 1, 1, "This is an easy step" );
INSERT INTO Comments VALUES(1, 2, 1, "This is a hard step" );
INSERT INTO Comments VALUES(1, 1, 2, "I think this step is ok" );
