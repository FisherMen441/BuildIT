CREATE TABLE Components_needed (
    SID int NOT NULL,
    CID int NOT NULL,
    FOREIGN KEY (SID) REFERENCES Steps(SID),
    FOREIGN KEY (CID) REFERENCES Components(CID)
);

