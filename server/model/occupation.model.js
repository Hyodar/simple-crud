
module.exports = (sequelize, DataTypes) => {
    const Occupation = sequelize.define('Occupation', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    });

    return Occupation;
};
