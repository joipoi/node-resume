/**
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <tibor@szasz.hu> wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.
 * Tibor Szász
 * 
 * @joipoi edited this file later
 * ----------------------------------------------------------------------------
 * 
 */
const pdf = require('html-pdf');
const twig = require('twig');
const chalk = require('chalk');
const path = require('path');
const PDFoptions = require('./pdf-options.json');

// Promisify the PDF creation
const createPDF = (html, options, pdfName) => {
    return new Promise((resolve, reject) => {
        pdf.create(html, options).toFile(`./${pdfName}.pdf`, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
};

// Promisify Twig render
const renderTemplate = (templatePath, data) => {
    return new Promise((resolve, reject) => {
        twig.renderFile(templatePath, data, (err, html) => {
            if (err) reject(err);
            else resolve(html);
        });
    });
};
const getFileProtocolPath = () => {
    const segments = __dirname.split(path.sep);
    segments[0] = 'file://';
    return segments.join('/');
};

const getRoot = () => {
    const root = getFileProtocolPath();
    return `${root}/views/`;
};

const meta = {
    root: getRoot()
};

// Main function
//cvName must match between the data file, template file and output file(extension not included)
async function generateCV(cvName) {
    const cvData = require(`./data/${cvName}.json`);
    cvData.meta = meta;
    try {
        // Render template
        const html = await renderTemplate(`views/${cvName}.twig`, cvData);
        console.log(chalk.green('Looks good, just a second...'));

        // Generate PDF
        await createPDF(html, PDFoptions, cvName);
        console.log(chalk.cyan(`SUCCESS: Created the cv: ${cvName}.pdf`));
    } catch (error) {
        console.log(chalk.red('ERROR: ' + error));
    }
}
// Generates swedish cv
generateCV("cv_se");

// Generates english cv
generateCV("cv_en");

