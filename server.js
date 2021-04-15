const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

// const { sequelize } = require('./models/User');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//turn on routes
app.use(routes);

//turn on connection to db and server
//force: false   === do not drop and recreate all databases on startup
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});