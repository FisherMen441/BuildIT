CREATE TABLE Users (
	UID int NOT NULL AUTO_INCREMENT,
	User_name VARCHAR(255) NOT NULL,
	Pass_word VARCHAR(255) NOT NULL,
	PRIMARY KEY (UID)
);

CREATE TABLE Furniture (
    FID int NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    Description  varchar(255),
    Total_steps int NOT NULL,
    PRIMARY KEY (FID)
);

CREATE TABLE Steps (
    SID int NOT NULL AUTO_INCREMENT,
    Description  varchar(255),
    FID int NOT NULL,
    Step_num int NOT NULL,
    Video_loc varchar(255),
    PRIMARY KEY (SID),
    FOREIGN KEY (FID) REFERENCES Furniture(FID)
);

CREATE TABLE Comments (
    SID int NOT NULL,
    UID int NOT NULL,
    Content varchar(255) NOT NULL,
    FOREIGN KEY (SID) REFERENCES Steps(SID),
    FOREIGN KEY (UID) REFERENCES USERS(UID)
);

CREATE TABLE Components (
    CID int NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    Description  varchar(255),
    PRIMARY KEY (CID)
);

CREATE TABLE Components_needed (
    SID int NOT NULL,
    CID int NOT NULL,
    FOREIGN KEY (SID) REFERENCES Steps(SID),
    FOREIGN KEY (CID) REFERENCES Components(CID)
);

CREATE TABLE Tools (
    TID int NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    Description  varchar(255),
    PRIMARY KEY (TID)
);

CREATE TABLE Tools_needed (
    SID int NOT NULL,
    TID int NOT NULL,
    FOREIGN KEY (SID) REFERENCES Steps(SID),
    FOREIGN KEY (TID) REFERENCES Tools(TID)
);