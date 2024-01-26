const fs = require('fs')
const path = require('path');

const logFilePath = path.join(__dirname, 'app.log');

function logToFile(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp}: ${message}\n`;

    if (!fs.existsSync(logFilePath)) {
        fs.writeFileSync(logFilePath, '')
    }
  
    fs.appendFileSync(logFilePath, logMessage, (err) => {
        if (err) {
            console.log(`Error logging to file: ${err}`)
        }
    });
}

module.exports = logToFile