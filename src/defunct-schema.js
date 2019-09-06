import {Word} from "./models";

const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
} = graphql;

const wordType = new GraphQLObjectType({
    name: 'word',
    fields: () => ({
        id: {type: GraphQLID},
        string: {type: GraphQLString},
        partOfSpeech: {type: GraphQLString},
        tense: { type: GraphQLString},
        meanings: { type: new GraphQLList(GraphQLString)},
        lemmaId: { type: GraphQLString },
    })
});



const lemmaType = new GraphQLObjectType({
    name: 'lemma',
    fields: {
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        primary: {type: GraphQLBoolean}
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        word: {
            type: wordType,
            args: {id: {type: GraphQLID}},
            resolve(parentValue, args) {
                // const query = `SELECT * FROM "people" WHERE id=${args.id}`;
                // return db.conn.one(query)
                //     .then(data => {
                //         return data;
                //     })
                //     .catch(err => {
                //         return 'The error is', err;
                //     });
                console.log({parentValue: JSON.stringify(parentValue)});
                console.log("\n\nhey you made it here!\n\n");
                console.log(`args ${JSON.stringify(args)}`);
                // return Word.findByPk(args.id);
            },
        },
        byLemma: {
            type: new GraphQLList(wordType),
            args: {lemmaId: { type: GraphQLID }},
            resolve(_, args) {
                    return Word.findAll({
                        where:
                            {lemmaId: args.lemmaId}
                    });
            },
        },
        lemma: {
            type: lemmaType,
            resolve() {
                console.log("fuck you. stay out of here");
            }
        },
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery
});