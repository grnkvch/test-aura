
import * as Yup from 'yup'

export const UserSchema = Yup.object().shape({
  name: Yup.string().required(),
  surname: Yup.string(),
  organization: Yup.string(),
})
