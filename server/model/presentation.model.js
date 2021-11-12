
module.exports = (sequelize, DataTypes) => {
    const Presentation = sequelize.define('Presentation', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    });

    return Presentation;
};
