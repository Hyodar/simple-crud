
const bcrypt = require("bcrypt");

async function initializeUser(db) {
    const users = await db['User'].bulkCreate([
        { name: "Laudelino Bastos", password: bcrypt.hashSync("abc", 1) },
    ]);

    const occupations = await db['Occupation'].bulkCreate([
        { name: "Professor" },
        { name: "Garota Mágica" },
    ]);

    const companies = await db['Company'].bulkCreate([
        { name: "UTFPR" },
        { name: "Mitakihara" },
    ]);

    const presentations = await db['Presentation'].bulkCreate([
        { title: "Uma história de verão" },
        { title: "Walpurgisnacht" },
    ]);

    const participants = await db['Participant'].bulkCreate([
        { firstName: "Hermes Irineu", lastName: ""},
        { firstName: "Madoka", lastName: ""},
        { firstName: "Honoka", lastName: ""},
    ]);

    participants[0].setOccupation(occupations[1]);
    participants[1].setOccupation(occupations[1]);
    participants[2].setOccupation(occupations[1]);

    participants[0].setCompany(companies[0]);
    participants[1].setCompany(companies[1]);
    participants[2].setCompany(companies[1]);

    participants[0].setPresentations(presentations);
    participants[1].setPresentations(presentations);
    participants[2].setPresentations(presentations);
}

module.exports = async (db) => {
    await initializeUser(db);
};
