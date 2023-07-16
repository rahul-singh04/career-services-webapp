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
    doc.moveDown(0.2);
    doc.fontSize(10)
    doc.text(location, { align: "left" })
    doc.moveDown(1.0)
    doc.fontSize(16)
    doc.text(email, { align: "left" })
    doc.text(phoneNumber, { align: "left" })
    doc.moveDown(0.5)
    doc.text(linkedInProfile, { align: "left" })
    doc.moveDown(0.5)
    doc.text(githubProfile, { align: "left" })
    doc.text("-----------------------------------------------------------------------")

    //professional summary
    doc.moveDown(1.0)
    doc.fontSize(20)
    doc.text("Experience")
    doc.moveDown(0.5)
    professionalSummary.forEach(experience => {
        doc.fontSize(16);
        doc.text(experience?.companyName, { align: "left" })
        doc.fontSize(12);
        doc.text(experience?.title, { align: "left" })
        doc.text(experience?.startDate?.toISOString().slice(0, 10) + "  -  " + experience?.endDate?.toISOString().slice(0, 10), { align: "left" })
    })
    doc.text("-----------------------------------------------------------------------")

    //skills
    doc.moveDown(1.0)
    doc.fontSize(20)
    doc.text("Skills")
    doc.moveDown(0.5)
    skills.forEach(skill => {
        doc.fontSize(16);
        doc.text(skill, { align: "left" })
    })


    doc.end();
    return new Promise((resolve, reject) => {
        fileStream.on('finish', () => {
            logger.info('Resume generated successfully:', filePath);
            resolve(filePath);
        });

        fileStream.on('error', (err) => {
            logger.error('Error generating resume:', err);
            reject(err);
        });
    });

}

module.exports = { writeToPdf }