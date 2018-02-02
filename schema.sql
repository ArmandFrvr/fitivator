create database fit_db;
use fit_db;

create table user
(
id int not null auto_increment,
username varchar(25) not null,
phone int not null,
attributes varchar(50) not null,
fitcoin_balance int not null,
rating int not null,
motivator tinyint default true,
primary key(id)
);