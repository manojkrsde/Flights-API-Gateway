const express = require("express");
const bodyParser = require('body-parser')

const { ServerConfig } = require("./config");

const apiRoutes = require("./routes");
const errorHandler = require("./utils/error.handler");
const { sequelize } = require('./models');
const { IdentityReset } = require("./utils/helpers/");

const rateLimit = require('express-rate-limit');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');

const { UserMiddlewares } = require('./middlewares');


const app = express();


/**
 * adding body parser middlewares
 */


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());




/**
 * Rate Limiter
 */
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).  
})

app.use(limiter);

/**
 * Main Api Calls
 */


app.use('/flightService',
    UserMiddlewares.checkAuth,
    UserMiddlewares.isAdmin,
    createProxyMiddleware({
        target: ServerConfig.FLIGHT_SERVICE,
        changeOrigin: true,
        pathRewrite: { '^/flightService': '/' },
        on: {
            proxyReq: fixRequestBody,
        }
    })
);

app.use('/bookingService',

    UserMiddlewares.checkAuth
    ,
    createProxyMiddleware({
        target: ServerConfig.BOOKING_SERVICE,
        changeOrigin: true,
        pathRewrite: { '^/bookingService': '/' },

        on: {

            proxyReq: (proxyReq, req, res) => {

                if (req.user) {
                    proxyReq.setHeader('x-user-data', JSON.stringify(req.user));
                }

                if (req.body) {

                    let body = new Object();
                    body = req.body;

                    // URI encode JSON object
                    body = Object.keys(body)
                        .map(function (key) {
                            return encodeURIComponent(key) + '=' + encodeURIComponent(body[key]);
                        })
                        .join('&');

                    proxyReq.write(body);
                }

                fixRequestBody;
            }
        }
    })
);


app.use('/api', apiRoutes);


//last middleware for handling errors
app.use(errorHandler);

app.listen(ServerConfig.PORT, () => {
    console.log(`Started server at PORT: ${ServerConfig.PORT}`);

    /**
     * Resetting Identity column
     */
    sequelize.authenticate()
        .then(() => {
            return IdentityReset();
        })
        .then(() => {
            console.log("Succes: Identity seed reset successfull");
        })
        .catch(error => {
            console.log('Identity seed reset -- failed -- for all models');
            console.error('Database is not connected:', error);
            Logger.error({ message: "Database is not Connected!!!", error: error });
        });
})