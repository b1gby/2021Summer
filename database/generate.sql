/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2021/7/22 22:52:36                           */
/*==============================================================*/


drop table if exists CAMPUS;

drop table if exists EXERCISE;

drop table if exists LEARNSITUATION;

drop table if exists STUDENT;

drop table if exists TEACHAREA;

drop table if exists TEACHER;

drop table if exists WRONGPROBLEM;

/*==============================================================*/
/* Table: CAMPUS                                                */
/*==============================================================*/
create table CAMPUS
(
   Cid                  int not null auto_increment,
   Cname                varchar(16) character set gbk not null,
   primary key (Cid)
);

/*==============================================================*/
/* Table: EXERCISE                                              */
/*==============================================================*/
create table EXERCISE
(
   Eid                  int not null auto_increment,
   EnameTxt             varchar(500) character set gbk,
   EnameImg             varchar(500),
   EanswerTxt           varchar(500) character set gbk,
   EanswerImg           varchar(500),
   Egrade               varchar(10) character set gbk,
   Esubject             varchar(10) character set gbk not null,
   primary key (Eid)
);

/*==============================================================*/
/* Table: LEARNSITUATION                                        */
/*==============================================================*/
create table LEARNSITUATION
(
   LSid                 int not null auto_increment,
   Sid                  int not null,
   LSattendence         varchar(100) character set gbk,
   LSperform            varchar(100) character set gbk,
   LShomework           varchar(100) character set gbk,
   primary key (LSid)
);

/*==============================================================*/
/* Table: STUDENT                                               */
/*==============================================================*/
create table STUDENT
(
   Sid                  int not null auto_increment,
   Sname                varchar(16) not null,
   Snickname            varchar(16) character set gbk,
   Spassword            char(16) not null,
   Sphone               char(20) not null,
   Sicon                varchar(500),
   Sgrade               varchar(10) character set gbk not null,
   Cid                  int,
   primary key (Sid)
);

/*==============================================================*/
/* Table: TEACHAREA                                             */
/*==============================================================*/
create table TEACHAREA
(
   TCid                 int not null auto_increment,
   Tid                  int not null,
   Cid                  int not null,
   primary key (TCid)
);

/*==============================================================*/
/* Table: TEACHER                                               */
/*==============================================================*/
create table TEACHER
(
   Tid                  int not null auto_increment,
   Tname                varchar(16) not null,
   Tnickname            varchar(16) character set gbk,
   Tpassword            char(16) not null,
   Tphone               char(20) not null,
   Ticon                varchar(500),
   primary key (Tid)
);

/*==============================================================*/
/* Table: WRONGPROBLEM                                          */
/*==============================================================*/
create table WRONGPROBLEM
(
   Wid                  int not null auto_increment,
   Eid                  int not null,
   Sid                  int not null,
   WmyAnswerTxt         varchar(500),
   WmyAnswerImg         varchar(500),
   primary key (Wid)
);

alter table LEARNSITUATION add constraint FK_Reference_7 foreign key (Sid)
      references STUDENT (Sid) on delete restrict on update restrict;

alter table STUDENT add constraint FK_Reference_8 foreign key (Cid)
      references CAMPUS (Cid) on delete restrict on update restrict;

alter table TEACHAREA add constraint FK_Reference_1 foreign key (Tid)
      references TEACHER (Tid) on delete restrict on update restrict;

alter table TEACHAREA add constraint FK_Reference_2 foreign key (Cid)
      references CAMPUS (Cid) on delete restrict on update restrict;

alter table WRONGPROBLEM add constraint FK_Reference_4 foreign key (Sid)
      references STUDENT (Sid) on delete restrict on update restrict;

alter table WRONGPROBLEM add constraint FK_Reference_5 foreign key (Eid)
      references EXERCISE (Eid) on delete restrict on update restrict;

