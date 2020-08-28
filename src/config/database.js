require('dotenv/config');
const Url = require('url-parse');

const DATABASE_URL = new Url(Env.get('DATABASE_URL'));

// PROD
module.exports = {
  dialect: 'postgres',
  host: DATABASE_URL.hostname,
  port: DATABASE_URL.port,
  username: DATABASE_URL.username,
  password: DATABASE_URL.password,
  database: DATABASE_URL.pathname.substr(1),
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

// DEV
// module.exports = {
//   dialect: 'postgres',
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// };
