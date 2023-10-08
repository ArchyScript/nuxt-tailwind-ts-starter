// THIS FILE HOLDS ALL THE TYPES FOR THE AUTH

// PAYLOADS
// export type RegisterPayloadType = 'hand' | 'heart' | 'emoji'

//
export type RegisterPayloadType = {
  email: String
  password: String
  payback_days: String
  interest_rate: String
}

//
export type LoginPayloadType = {
  email: String
  password: String
}

// PARAMS
// tokens
export type TokenParams = {
  token: String
}
