const express = require('express');

// Module for establishing connection with Apollo Server
const { ApolloServer } = require('apollo-server-express');

const path = require('path');

// Imports the typeDefs and resolvers from the Schemas folder
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Apollo Server module for using typeDefs and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// No longer using routes since resolvers will handle the data now
// app.use(routes);
// const routes = require('./routes');

// Building front page of site using GET method
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// While the db.once will be needed, it will become part of the 
// Apollo server instance with the GraphQL schema

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({app});
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server reading on port ${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Calls the async function to start the server
startApolloServer(typeDefs, resolvers);



// Original File

// const express = require('express');
// const path = require('path');
// const db = require('./config/connection');
// const routes = require('./routes');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
