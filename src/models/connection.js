import pg from 'pg';
import Sequelize from 'sequelize';

const dbUrl = process.env.DATABASE_URL || `postgres://alavery:''@localhost:5432/codified-spanish`;
const isHeroku = !!process.env.DATABASE_URL;

const pgClient = new pg.Client({
    connectionString: dbUrl,
    ssl: isHeroku,
});

pgClient
    .connect()
    .then(() => {
        console.log(`pg client successfully connected to database`);
    })
    .catch(err => {
        console.log(`pg client could not connect to database:`, err);
    });

const sequelize = new Sequelize(dbUrl, {
    define: {
        // camelCase -> snake_case
        underscored: true,
        // don't add an "s" to table name
        freezeTableName: true,
    },
    ssl: isHeroku,
    dialectOptions: {
        ssl: isHeroku,
    }
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