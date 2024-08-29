// POST /users
request: 
  payload: {
    email: String,
    password: String
  }

// POST /login
request: 
  payload: {
    email: String,
    password: String,
  }

response: 
  {
    token: String,
    user: {
      id: Number,
      email: String
    }
  }