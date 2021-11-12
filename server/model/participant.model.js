
module.exports = (sequelize, DataTypes) => {
    const Participant = sequelize.define('Participant', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Participant;
};
