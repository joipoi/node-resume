/**
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <tibor@szasz.hu> wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.
 * Tibor Szász
 * ----------------------------------------------------------------------------
 */
const pdf = require('html-pdf');
const twig = require('twig');
const chalk = require('chalk');
const path = require('path');
const PDFoptions = require('./pdf-options.json');
const express = require('express'), app = express();

const LANGUAGES = {
    EN: 'en',
    SE: 'se'
};

const CURRENT_LANGUAGE = LANGUAGES.SE;

const getLanguageData = (language) => {
return require(`./data/cv-${language}.json`);
};
const template = "basic_" + CURRENT_LANGUAGE;
const cvData = getLanguageData(CURRENT_LANGUAGE);

// Configure Twig
app.set("twig options", {
    strict_variables: false,
    cache: false,
    auto_reload: true
});

// Helper functions
const getFileProtocolPath = () => {
    const segments = __dirname.split(path.sep);
    segments[0] = 'file://';
    return segments.join('/');
};

const getRoot = () => {
    const root = getFileProtocolPath();
    return `${root}/views/${template}`;
};

// Add metadata to CV data
const meta = {
    template,
    root: getRoot()
};
cvData.meta = meta;

// Promisify the PDF creation
const createPDF = (html, options) => {
    return new Promise((resolve, reject) => {
        pdf.create(html, options).toFile(`./${CURRENT_LANGUAGE}-cv.pdf`, (err, res) => {
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

// Main function
async function generateCV() {
    try {
        // Render template
        const html = await renderTemplate(`views/${template}/cv.twig`, cvData);
        console.log(chalk.green('Looks good, just a second...'));

        // Generate PDF
        await createPDF(html, PDFoptions);
        console.log(chalk.cyan(`SUCCESS: Created the cv: ${CURRENT_LANGUAGE}-cv.pdf`));
    } catch (error) {
        console.log(chalk.red('ERROR: ' + error));
    }
}

// Execute
generateCV();