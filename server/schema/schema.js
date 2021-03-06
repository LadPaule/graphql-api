const graphq = require('graphql');
const Product = require('../modals/product');
const Farm = require('../modals/farm');


const { GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
 } = graphq;

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () =>({
        id: {type: GraphQLID},
        name: {type: GraphQLNonNull(GraphQLString)},
        category: {type:  GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        varriants: {type: GraphQLString},
        farm: {
            type: FarmType,
            resolve(parent, args){
                //retrieving a farm
                return Farm.findById(parent.farmId)
            }
        }
    })
});

const FarmType = new GraphQLObjectType({
    name: 'Farm',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLNonNull(GraphQLString)},
        category:{ type: GraphQLNonNull(GraphQLString) },
        description: {type: GraphQLString},
        address: {type:GraphQLString},
        products: {
            type:  new GraphQLList(ProductType),
            resolve(parent, args){
                //retrieving a product associated with a given farm  from the database
                return Product.find({farmId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:()=>({
        product:{
            type: ProductType,
            args: {
                id: {type:GraphQLID}
            },
            resolve(parent, args){
                //retrieving a product from the database
                return Product.findById(args.id);
            }
        },
        //updating a farm record
        update_farm: {
            type: FarmType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args){
                return Farm.findByIdAndUpdate(args.id);
            }
        },
       //Deleting  a farm record
        delete_farm: {
            type: FarmType,
            args: {
                id: {type: GraphQLID},
                message: {type: GraphQLString}
            },
            resolve(parent, args){
                return Farm.findByIdAndDelete(args.id);
            }
        },
        farm:{
            type: FarmType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //retrieving a farm from the database
                return Farm.findById(args.id);
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args){
                //retrieving all products from the database
                return Product.find({});
            }
        },
        farms: {
            type: new GraphQLList(FarmType),
            resolve(parent, args){
                //retrieving all farms from the database
                return Farm.find({});
            }
        }

    })

});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        add_farm:{type: FarmType,
            args: { name : {type: GraphQLNonNull(GraphQLString) 
                },
                category:{ type: GraphQLNonNull(GraphQLString) 
                },
                description:{type: GraphQLString
                },
                address:{ type: GraphQLNonNull(GraphQLString) 
                }
            },
            
            resolve(parent, args){
                let farm = new Farm({
                    name: args.name,
                    category: args.category,
                    description: args.description,
                    address: args.varriants
                });
                return farm.save()
            }
        },
        update_farm:{type: FarmType,
            args: {
                 id: {type:GraphQLNonNull(GraphQLID) },
                name : {type: GraphQLString },
                category:{ type: GraphQLString },
                description:{type: GraphQLString },
                address:{ type: GraphQLString }
            },
            
            resolve(parent, args){
                let farm = new Farm({
                    name: args.name,
                    category: args.category,
                    description: args.description,
                    address: args.varriants
                });
                var id = args.id
                return farm.save()
            }
        },
        delete_farm:{
            type: FarmType,
            args:{
                id:{type: GraphQLID}
                
            },
            resolve(parent, args){
                return "Farm has been deleted successfully!"
            }
        },

        add_product: {
            type: ProductType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString) },
                category: {type: GraphQLNonNull(GraphQLString) },
                description: {type: GraphQLString},
                varriants: {type: GraphQLString},
                farmId: {type: GraphQLID}
            },
            resolve(parent, args){
                let product = new Product({
                    name: args.name,
                    category: args.category,
                    description: args.description,
                    varriants: args.varriants,
                    farmId: args.farmId
                });
                return product.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
