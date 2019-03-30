CREATE TABLE Users (
	UID int NOT NULL AUTO_INCREMENT,
	User_name VARCHAR(255) NOT NULL,
	Password VARCHAR(255) NOT NULL,
	PRIMARY KEY (UID)
);

CREATE TABLE Furniture (
    FID int NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    Description varchar(255),
    Img_url varchar(255),
    Total_steps int NOT NULL,
    PRIMARY KEY (FID)
);

CREATE TABLE Steps (
    FID int NOT NULL,
    SID int NOT NULL,
    Description varchar(255),
    Img_url varchar(255),
    Video_loc varchar(255),
    PRIMARY KEY (FID, SID),
    FOREIGN KEY (FID) REFERENCES Furniture(FID)
);

CREATE TABLE Comments (
    FID int NOT NULL,
    SID int NOT NULL,
    UID int NOT NULL,
    Content varchar(255) NOT NULL,
    FOREIGN KEY (FID, SID) REFERENCES Steps(FID, SID),
    FOREIGN KEY (UID) REFERENCES USERS(UID)
);

CREATE TABLE Components (
    CID int NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    Img_url varchar(255),
    Description varchar(255),
    PRIMARY KEY (CID)
);

CREATE TABLE Components_needed (
    FID int NOT NULL,
    SID int NOT NULL,
    CID int NOT NULL,
    FOREIGN KEY (FID, SID) REFERENCES Steps(FID, SID),
    FOREIGN KEY (CID) REFERENCES Components(CID)
);

CREATE TABLE Tools (
    TID int NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    Img_url varchar(255),
    Description varchar(255),
    PRIMARY KEY (TID)
);

CREATE TABLE Tools_needed (
    FID int NOT NULL,
    SID int NOT NULL,
    TID int NOT NULL,
    FOREIGN KEY (FID, SID) REFERENCES Steps(FID, SID),
    FOREIGN KEY (TID) REFERENCES Tools(TID)
);
