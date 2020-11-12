
select 
pid.id,
pid.user_id,
pid.guard_id,
(select st_astext(pid.geolocation)) as gelocation,
pid.created_at,
pid.resolved_at,
u."name" as user_name,
u.surname as user_surname,
u.organization as user_organization,
guard.user_id as guard_user_id,
u2."name" as guard_name,
u2.surname as guard_surname,
u2.organization as guard_organization

from 
(
(select * from panics p where p.id = '6731cd44-0c45-48e2-b21a-73bd76236056') as pid 
left join users u on pid.user_id = u.id
)
left join 
((select * from guards g) as guard
 left join users u2 on guard.user_id = u2.id
)
on guard.id = pid.guard_id;