INSERT INTO Furniture(FID, Name, Description, Img_url, Total_steps)
VALUES
(1, 'Accent Table', 'Three drawers on wood slides open to reveal plenty of room to tuck away small-scale must-haves, while the top offers space to place a lamp, books, and more.', 'Accent Table.png', 7);

INSERT INTO Steps(FID, SID, Description, Img_url, Video_loc)
VALUES
(1, 1, '', 'step1.png', 'IMG_7185.MOV');

INSERT INTO Tools(TID, Name, Img_url, Description)
VALUES
(1, 'Cross Screwdriver', 'cross screwdriver.png', '');

INSERT INTO Tools_needed(FID, SID, TID)
VALUES
(1, 1, 1);


INSERT INTO Furniture(FID, Name, Description, Img_url, Total_steps)
VALUES
(2, 'Lamp', 'A nice white lamp.', 'lamp.png', 1);
INSERT INTO Steps(FID, SID, Description, Img_url, Video_loc)
VALUES
(2, 2, '', '', 'step1.mp4');
