const path = require('path');
const fs = require('fs');

const { createLogger, transports, format } = require('winston');
require('winston-daily-rotate-file');

const config = require('config');

const { combine, timestamp, colorize, label, printf } = format;
const myFormat = printf(
    info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
)

// get the root directory
const rootPath = path.dirname(process.mainModule.filename);
const logDir = path.join(rootPath, config.get('logging.dirname') || 'logs');

// check if the directory exists, if not create it
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}

const logger = createLogger({
    format: combine(
        label({label:path.basename(process.mainModule.filename)}),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS'} ),
        myFormat
    ),
    transports: [
        new transports.Console({
            level: config.get('logging.level.console') || 'info',
            format: combine(
                colorize(),
                myFormat
            )
        }),
        new (transports.DailyRotateFile)({
            level: 'error',
            datePattern: 'YYYY-MM-DD-HH',
            maxFiles: '30d',
            filename: `${logDir}/%DATE%-errors.log`,
            format: combine(
                myFormat
            )
        }),
        new (transports.DailyRotateFile)({
            level: config.get('logging.level.file') || 'info',
            datePattern: 'YYYY-MM-DD-HH',
            maxFiles: '14d',
            filename: `${logDir}/%DATE%-server.log`,
            format: combine(
                myFormat
            )
        })
    ],
    exceptionHandlers: [
        new transports.File ({
            filename: `${logDir}/exceptions.log`,
            format: combine(
                myFormat
            )
        })
    ],
    exitOnError: false
});

module.exports = logger;