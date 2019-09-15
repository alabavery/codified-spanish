import Sequelize from 'sequelize';
// you must explicitly import process in any file you use it in
// order for heroku to use it correctly.
const process = require('process');

const dbUrl = process.env.HEROKU_POSTGRESQL_WHITE_URL || `postgres://alavery:''@localhost:5432/codified-spanish`;
const isHeroku = !!process.env.HEROKU_POSTGRESQL_WHITE_URL;

if (!isHeroku) {
    console.log(`app did not obtain a environmental variable of DATABASE_URL`);
}


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