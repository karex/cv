const chromeBinary = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
const renderPDF = require('chrome-headless-render-pdf');
const fs = require('fs');
const path = require('path');

const currentPath = 'file:///' + path.resolve().replace(/\\/g, '/') + '/';

const htmlFileName = './cv';
const pdfFileName = './cv';
const htmlExt = '.html';
const pdfExt = '.pdf';
let htmlFile = htmlFileName + htmlExt;
let pdfFile = pdfFileName + pdfExt;

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

renderPDF.generateSinglePdf(currentPath + htmlFile, pdfFile, { chromeBinary: chromeBinary, noMargins: true, includeBackground: true});
