import Sequelize from 'sequelize';

const sequelize = new Sequelize('codified-spanish', 'alavery', '', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        // camelCase -> snake_case
        underscored: true,
        // don't add an "s" to table name
        freezeTableName: true,
    },
});
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    define: {
        // camelCase -> snake_case
        underscored: true,
        // don't add an "s" to table name
        freezeTableName: true,
    },
    // "ssl": true,
    // "dialectOptions": { "ssl": true }
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