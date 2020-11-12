with updated_panic as (
UPDATE panics set resolved_at = NOW()
WHERE id = '6731cd44-0c45-48e2-b21a-73bd76236056' returning *
)
select * from updated_panic;