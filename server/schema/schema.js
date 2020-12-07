const graphq = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphq;
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

    })

});
