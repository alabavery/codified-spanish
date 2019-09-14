import Sequelize from 'sequelize';
const process = require('process');

const dbUrl = process.env.DATABASE_URL || `postgres://alavery:''@localhost:5432/codified-spanish`;
const isHeroku = !!process.env.DATABASE_URL;

console.log({dbUrl});
console.log({isHeroku});

// 'postgres://juwfhddomnoezp:f9db989b90cbefb145aff0dbc50f7ec243de9f4b7eb2756061d56aa762ed5b2c@ec2-54-83-9-36.compute-1.amazonaws.com:5432/dd3am2e2dguhs1'

const sequelize = new Sequelize(dbUrl, {
    dialect:  'postgres',
    protocol: 'postgres',
    define: {
        // camelCase -> snake_case
        underscored: true,
        // don't add an "s" to table name
        freezeTableName: true,
    },
    "ssl": isHeroku,
    "dialectOptions": { "ssl": isHeroku }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


sequelize.sync();

export default sequelize;