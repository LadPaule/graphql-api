const graphq = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphq;
const product_type = new GraphQLObjectType({
    name: 'Product',
    fields: () =>({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        category: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:()=>({
        product:{
            type: product_type,
            args: {
                id: {type:GraphQLString}
            },
            resolve(parent, args){

            }
        }

    })

});

module.exports = new GraphQLSchema({
    query: RootQuery
})
