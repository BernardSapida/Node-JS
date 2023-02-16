const fs = require('fs');
const path = require('path');

const deleteFile = filePath => {
    fs.unlink(`${path.dirname(require.main.filename)}/images/${filePath}`, err => {
        if(err) console.log(err);
    });
}

module.exports = {
    deleteFile
}