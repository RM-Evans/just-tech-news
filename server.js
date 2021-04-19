const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const path = require('path');

// set up handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//so I can use my style sheets etc
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//turn on routes
app.use(routes);

//turn on connection to db and server
//force: false   === do not drop and recreate all databases on startup
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});