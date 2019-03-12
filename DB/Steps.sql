CREATE TABLE Steps (
    SID int NOT NULL AUTO_INCREMENT,
    Description  varchar(255),
    FID int NOT NULL,
    Step_num int NOT NULL,
    Video_loc varchar(255),
    FOREIGN KEY (FID) REFERENCES Furniture(FID)
);

