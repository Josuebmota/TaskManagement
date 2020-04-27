module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'School',
  define: {
    timestamps: true,
    underscored: true,
  },
};