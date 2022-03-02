create table tamper1(
    DoorChangeCount varchar(255),
    DoorStatus varchar(255),
    BatVoltage varchar(255),
    TamperMoveCount varchar(255),
    TamperBrakeCount varchar(255),
    TamperMove varchar(255),
    TamperBrake varchar(255),
    SignalQuality varchar(255),
    SimCIMI varchar(255),
    fwInstall varchar(255),
    DateTimeStamp varchar(255)
);

миграция 
атамарные операции

орм




create table tamper2(
    PosixTime varchar(255),
    BreakCount varchar(255),
    MoveCount varchar(255),
    DoorCount varchar(255),
    DoorStatus varchar(255),
    DataTime varchar(255),
    BatVoltage varchar(255),
    TamperMove varchar(255),
    TamperBreak varchar(255),
    SignalQuality varchar(255),
    SimIMSI varchar(255),
    SimICCID varchar(255),
    fwInstall varchar(255)
);

SELECT *
  FROM information_schema.columns
 WHERE table_name   = N'tamper1';


select *
from tamper1;

select * 
from Information_schema.columns 
where Table_name like 'tamper1';
