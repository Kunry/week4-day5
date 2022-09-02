// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "cinema";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

/**
 * Recordamos que siempre que creemos un archivo de rutas tenemos que requerirlo para poder utilizarlo
 * Los archivos que estamos utilizando se encuentran en la carpeta `routes/*`
 * Cada vez que requiramos un archivo tendremos que configurar express para que lo use
 * Para ello lo que hacemos es utilizar el método `app.use` en el cual le tendremos
 * que pasar como primer parámetro el raíz de todas las rutas y como segundo
 * el archivo donde se encuentran configuradas.
 * 
 * Ej: Todas las rutas del archivo './routes/user.routes' empezarán por `/user`
 */

const user = require('./routes/user.routes');
app.use('/user', user);
const post = require('./routes/post.routes');
app.use('/post', post);
const comment = require('./routes/comment.routes');
app.use('/comment', comment);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
