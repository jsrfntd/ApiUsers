// Logging levels in winston conform to the severity ordering specified by RFC5424: severity of all levels is assumed to be numerically ascending from most important to least important.

// const levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     verbose: 3,
//     debug: 4,
//     silly: 5
// };

//Declate wiston object
const winston = require('winston');

//Create different types of transports
const fileTransportError = new winston.transports.File({filename: 'error.log', level: 'error'})
const fileTransportGeneral = new winston.transports.File({filename: 'combined.log'})
const consoleTransport = new winston.transports.Console()

//Create custom format
const { format} = require('winston');
const { combine, timestamp, label, printf } = format;
const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${label} ${level} ${label} ${message}`;
});



const wistonLogger = {
    transports: [fileTransportError, fileTransportGeneral, consoleTransport],
    format: combine(
        label({ label: '|' }),
        timestamp(),
        customFormat
    )
}
const log = new winston.createLogger(wistonLogger);

export default log;
