const { DataTypes } = require("sequelize");

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define("video", {
        video_id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            type: DataTypes.STRING,
        },
        video_title: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        video_url:{
            allowNull: true,
            type: DataTypes.STRING,
        },
        channel: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        published: {
            allowNull: true,
            type: DataTypes.DATE
        }
        
    });
};
