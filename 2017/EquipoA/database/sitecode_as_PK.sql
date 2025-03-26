select distinct * into zonas2 from zonas

alter table zonas2 add primary key (sitecode);

select * from zonas2

drop table zonas

alter table zonas2 rename to zonas
