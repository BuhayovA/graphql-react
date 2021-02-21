const graphql = require('graphql');
const {GraphQLSchema} = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = graphql;

//mock
const movies = [
    {id: "1", name: 'One Flew Over the Cuckoo\'s Nest', genre: 'Drama', directorId: "2"},
    {id: "2", name: 'Zodiac', genre: 'Detective', directorId: "1"},
    {id: "3", name: 'The Girl with the Dragon Tattoo', genre: 'Detective', directorId: "1"},
    {id: "4", name: 'The Curious Case of Benjamin Button', genre: 'Drama', directorId: "1"},
    {id: "5", name: 'Fight Club', genre: 'Crime', directorId: "1"},
    {id: "6", name: 'The Invisible Guest', genre: 'Crime', directorId: "3"},
]

const directors = [
    {id: "1", name: 'David Fincher', age: 59},
    {id: "2", name: 'Miloš Forman', age: 89},
    {id: "3", name: 'Oriol Paulo', age: 46},
];

//Objects type
const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve (parent, args){
                return directors.find(director => parent.directorId == director.id)
            }
        }
    })
})

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return movies.filter(movie => movie.directorId == parent.id);
            },
        },
    }),
});

//root request
const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                return movies.find(movie => args.id == movie.id)
            }
        },
        director: {
            type: DirectorType,
            args:{id: {type: GraphQLID}},
            resolve(parent, args) {
                return directors.find(director => args.id == director.id)
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return movies
            },
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args){
                return directors;
            },
        },
    }
})

//export
module.exports = new GraphQLSchema({
    query: Query,
})