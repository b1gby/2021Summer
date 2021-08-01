insert into STUDENT values(100001, "zhangsan", "张三", "123456", "13800000000","null","七年级","300001");

insert into TEACHER values(200001, "TeacherWang", "王老师", "123456", "15800000000", "null");

insert into CAMPUS values(300001, "思明");

insert into TEACHAREA values(400001, 200001, 300001);

insert into EXERCISE values(500001, "________，禅房花木深", "null", "曲径通幽处", "null", "七年级", "语文");
insert into EXERCISE values(500002, "________，乾坤日夜浮", "null", "吴楚东南坼", "null", "七年级", "语文");
insert into EXERCISE values(500003, "万籁此俱寂，________", "null", "但余钟磬音", "null", "七年级", "语文");
insert into EXERCISE values(500004, "戎马关山北，________", "null", "凭轩涕泗流", "null", "七年级", "语文");

insert into WRONGPROBLEM values(600001, 500001, 100001, "123", "null");

insert into LEARNSITUATION values(700001, 100001, "123", "123", "123");