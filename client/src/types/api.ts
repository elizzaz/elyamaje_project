// Types génériques pour l'API
export interface ApiResponse<T> {
  data: T
  message: string
}

export interface ApiError {
  code: string
  message: string
  details?: {
    field?: string
    error?: string
  }
}
