import pg from 'pg';
import Sequelize from 'sequelize';

const dbUrl = process.env.DATABASE_URL || `postgres://alavery:''@localhost:5432/codified-spanish`;
const isHeroku = !!process.env.DATABASE_URL;

console.log({dbUrl});
console.log({isHeroku});

// const pgClient = new pg.Client({
//     connectionString: dbUrl,
//     ssl: isHeroku,
// });
//
// pgClient
//     .connect()
//     .then(() => {
//         console.log(`pg client successfully connected to database`);
//     })
//     .catch(err => {
//         console.log(`pg client could not connect to database:`, err);
//     });

// const sequelize = new Sequelize(dbUrl, {
//     define: {
//         // camelCase -> snake_case
//         underscored: true,
//         // don't add an "s" to table name
//         freezeTableName: true,
//     },
//     ssl: isHeroku,
//     dialectOptions: {
//         ssl: isHeroku,
//     }
// });
const sequelize = new Sequelize('postgres://juwfhddomnoezp:f9db989b90cbefb145aff0dbc50f7ec243de9f4b7eb2756061d56aa762ed5b2c@ec2-54-83-9-36.compute-1.amazonaws.com:5432/dd3am2e2dguhs1', {
    dialect:  'postgres',
    protocol: 'postgres',
    define: {
        // camelCase -> snake_case
        underscored: true,
        // don't add an "s" to table name
        freezeTableName: true,
    },
    "ssl": true,
    "dialectOptions": { "ssl": true }
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