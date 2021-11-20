
const bcrypt = require("bcrypt");

async function initializeUser(db) {
    const users = await db['User'].bulkCreate([
        { name: "user", password: bcrypt.hashSync("pwd", 1) },
    ]);

    const occupations = await db['Occupation'].bulkCreate([
        { name: "Professor" },
        { name: "Duelista" },
    ]);

    const companies = await db['Company'].bulkCreate([
        { name: "UTFPR" },
        { name: "Corporações Kaiba" },
    ]);

    const presentations = await db['Presentation'].bulkCreate([
        { title: "Monstros de Duelo" },
        { title: "Formação de Decks" },
    ]);

    const participants = await db['Participant'].bulkCreate([
        { firstName: "Seto Kaiba", lastName: ""},
        { firstName: "Joey Wheeler", lastName: ""},
        { firstName: "Yugi Muto", lastName: ""},
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
