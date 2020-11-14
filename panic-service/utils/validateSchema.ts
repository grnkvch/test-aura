type ValidationResult<T> ={ value: T | null, error?: (any | null) }

export async function validateSchema<T, U>(
  cb?: (...any)=>Promise<U>,
  value?: T, 
  schema?: { validate: (...any)=> ValidationResult<T> }, 
): Promise<U|{ error?:any }> {
  if(value || schema){
    const { error = {} } = schema.validate(value, {
      abortEarly: false,
      allowUnknown: false
    }) 
    if (error.isJoi) return { value: null, error: error.annotate() }
  }

  return cb()
}