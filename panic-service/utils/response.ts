import { corsHeaders } from '../constants/headers'

export type responseType = {
  statusCode: number;
  body: string;
  headers: {
    [header: string]: string
  }
}

export function response(body: any | string, status?: number): responseType {
  return {
    statusCode: status || 200,
    headers: corsHeaders,
    body: typeof body === 'object' ? JSON.stringify(body, null, 2) : body,
  }
}