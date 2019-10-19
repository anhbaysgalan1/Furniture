const Env = use('Env');

module.exports = {
  DB_HOST: Env.get("DB_HOST","127.0.0.1"),
  DB_PORT: Env.get("DB_PORT","27017"),
  DB_USER: Env.get("DB_USER", "root"),
  DB_PASS: Env.get("DB_PASS", ""),
  DB_NAME: Env.get("DB_NAME", "root"),
  DB_POOL_SIZE: Env.get("DB_POOL_SIZE", 10),
};
