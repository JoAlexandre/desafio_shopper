import Sequelize from 'sequelize'

const db = new Sequelize({
  dialect: 'postgres',
  host: 'db',//'172.17.0.3',//ip do host do docker //'localhost',
  port: 5432, //conexão pela rede do docker //32768,
  database: 'postgres',
  username: 'postgres',
  password: 'mysecretpassword',
  logging: true
})

export default db