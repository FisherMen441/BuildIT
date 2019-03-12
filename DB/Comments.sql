CREATE TABLE Comments (
    SID int NOT NULL,
    Content varchar(255) NOT NULL,
    FOREIGN KEY (SID) REFERENCES Steps(SID),
);

