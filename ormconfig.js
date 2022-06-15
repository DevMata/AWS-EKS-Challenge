// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

module.exports = [
  {
    name: 'default',
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    schema: process.env.DB_SCHEMA,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity.js'],
    migrations: [process.env.DB_MIGRATIONS],
    migrationsTableName: [process.env.DB_MIGRATIONS_TABLE_NAME],
    logging: true,
    migrationsRun: true,
    cli: {
      migrationsDir: process.env.DB_MIGRATIONS_DIR,
    },
    seeds: [__dirname + '/**/seeds/*.js'],
    factories: [__dirname + '/**/factories/*.js'],
  },
]
