const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const config = require('config');
const passport = require('passport');
const helmet = require('helmet');
const compression = require('compression');

const routes = require('./routes');
const logger = require('./utils/logger');
const error = require('./middlewares/error');

// Middlewares
// app.use(bodyParser.urlencoded({ extended: false })); 
// app.use(bodyParser.json());
app.use(express.json());
app.use(compression())
app.use(helmet())
app.disable('x-powered-by');
    
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
app.use('/api/auth',routes.auth);
app.use('/api/country', routes.country);
app.use('/api/function', routes.fn);
app.use('/api/product', routes.product);
app.use('/api/ping', (req,res) => {
    res.json({ message:"pong" })
});
app.use(error);

const PORT = config.get('settings.port') || 5000;

app.listen(PORT, () => {
    logger.info(`Server listening at port ${PORT}`)
});