
export const NEW_PANIC='new_panic'
export const NEW_USER='new_user'
export const DELETE_USER='delete_user'
export const UPDATE_USER='update_user'
export const GUARD_ATTACHED='guard_attached'
export const PANIC_RESOLVED='panic_resolved'
export const GUARD_GEOLOCATION_UPDATE='guard_geolocation_update'
export const GUARD_AVAILABILITY_UPDATE='guard_availability_update'
export const PANIC_ACTIONS = [NEW_PANIC, PANIC_RESOLVED, GUARD_ATTACHED]
export const USER_ACTIONS = [NEW_USER, DELETE_USER, UPDATE_USER]
export const GUARD_ACTIONS = [GUARD_GEOLOCATION_UPDATE, GUARD_AVAILABILITY_UPDATE]

const socketActions = {
  NEW_PANIC,
  NEW_USER,
  DELETE_USER,
  UPDATE_USER,
  GUARD_ATTACHED,
  PANIC_RESOLVED,
  GUARD_GEOLOCATION_UPDATE,
  GUARD_AVAILABILITY_UPDATE,
  PANIC_ACTIONS,
  USER_ACTIONS,
  GUARD_ACTIONS
}

export default socketActions