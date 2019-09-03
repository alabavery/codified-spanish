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

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


sequelize.sync();

const Word = sequelize.define('word', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
    string: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    partOfSpeech: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    person: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    mood: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    tense: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    isPlural: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

const Lemma = sequelize.define('lemma', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
    string: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    partOfSpeech: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    meanings: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
    },
});

Lemma.hasMany(Word);
Word.belongsTo(Lemma);

export { Word, Lemma };