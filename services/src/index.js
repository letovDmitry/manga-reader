import { ApolloServer } from 'apollo-server-express'
import typeDefs from './graphql/typeDefs'

import bodyParser from 'body-parser'
import express from 'express'
import 'dotenv/config'

import './db/connect'
import Manga from './db/models/Manga'

const manga = new Manga({
    "_id" : "5d742c6e719a1606d9325c29",
    "alias" : "ouji-no-hakoniwa",
    "categories" : [],
    "hits" : 0,
    "image" : null,
    "status" : 1,
    "title" : "Ouji no Hakoniwa"
})

manga.save((err, manga) => {
    if (err) return console.error(err)
    console.log('saved') 
})

const port = process.env.PORT || 3000

const app = express()
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: {},
})

apolloServer.applyMiddleware({ app, path: '/graphql' })

app.all('*', (req, res) => {
    res.status(404).json({ status: "endpoint is missing" })
})

app.listen(port, '0.0.0.0', () => console.log(`listenin on ${port}`))