const pdfkit = require("pdfkit");
const fs = require("fs");
const { logger } = require("../../config").loggerConfig;

const writeToPdf = async (user) => {
    const doc = new pdfkit();
    const filePath = `${user.fullName}-resume.pdf`
    const fileStream = fs.createWriteStream(filePath);
    doc.pipe(fileStream);
    doc.registerFont("sans-serif")

    const {
        fullName,
        email,
        location,
        phoneNumber,
        githubProfile,
        linkedInProfile,
        professionalSummary,
        skills
    } = user;

    //details section
    doc.fontSize(24);
    doc.text(fullName, { align: "left" })
    doc.moveDown(0.5);
    doc.fontSize(12)
    doc.text(location, { align: "left" })
    doc.moveDown(1.0)
    doc.fontSize(18)
    doc.text(email, { align: "left" })
    doc.moveDown(0.5)
    doc.text(linkedInProfile, { align: "left" })

    doc.end();
    return new Promise((resolve, reject) => {
        fileStream.on('finish', () => {
            logger.info('Resume generated successfully:', filePath);
            resolve(filePath);
        });

        fileStream.on('error', (err) => {
            console.error('Error generating resume:', err);
            reject(err);
        });
    });

}

module.exports = { writeToPdf }