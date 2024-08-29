import Sequelize from 'sequelize'

const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 32768,
  database: 'postgres',
  username: 'postgres',
  password: 'mysecretpassword',
  logging: true
})

export default db