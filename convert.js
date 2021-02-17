let fs = require('fs');
let path = require('path');
let pdf = require('html-pdf');

let htmlFileName = './cv';
let pdfFileName = './cv';
const htmlExt = '.html';
const pdfExt = '.pdf';
let htmlFile = htmlFileName + htmlExt;
let pdfFile = pdfFileName + pdfExt;

let html = fs.readFileSync(htmlFile, 'utf8');
let freeFileName = false;
let counter = 0;

while (freeFileName === false) {
    try {
        fs.unlinkSync(pdfFile);
        freeFileName = true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            freeFileName = true;
        } else {
            console.log(pdfFile, ': ', err.code);
            counter++;
            pdfFile = pdfFileName + "-" + counter + pdfExt;
        }
    }
}

let currentPath = 'file:///' + path.resolve('.').replace(/\\/g, '/') + '/';

let options = {
    format: 'A4',
    base: currentPath
};

pdf.create(html, options).toFile(pdfFile, function(err, res) {
    if (err) {
        return console.log(err);
    }
    console.log(res);
});