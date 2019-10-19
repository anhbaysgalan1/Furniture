const Env = use('Env')

module.exports = {
  SECRET_KEY: Env.get("SECRET_KEY","2wsjLSopTjD6WQEztTYIZgCFou8wpLJn"),
  jwt_options: {
    expiresIn:  Env.get("JWT_EXPIRESIN", '7d') // setting ngay xoa token
  }
}
