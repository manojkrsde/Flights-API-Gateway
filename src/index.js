const express = require("express");

const { ServerConfig } = require("./config");

const apiRoutes = require("./routes");
const errorHandler = require("./utils/error.handler");

const app = express();


/**
 * adding body parser middlewares
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use('/api', apiRoutes);

//last middleware for handling errors
app.use(errorHandler);

app.listen(ServerConfig.PORT, () => {
    console.log(`Started server at PORT: ${ServerConfig.PORT}`);
})