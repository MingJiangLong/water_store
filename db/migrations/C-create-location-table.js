const Sequelize = require("sequelize");

module.exports = {
  /**
   * 
   * @param {Sequelize.QueryInterface} queryInterface 
   * @param {Sequelize} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('location', {
      location_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      latitude: {
        type: Sequelize.STRING,
        comment: "经纬度信息"
      },
      longitude: {
        type: Sequelize.STRING,
        comment: "经纬度信息"
      },
      location_desc: {
        type: Sequelize.STRING,
        comment: "定位信息描述"
      },
      location_status: {
        type: Sequelize.TINYINT,
        defaultValue: 1,
        comment: "0 删除; 1启用; 2 可用"
      },
      user_id: {
        type: Sequelize.STRING,
        references: {
          model: "user",
          key: "user_id"
        },
        onDelete: 'CASCADE',
        onUpdate: "CASCADE",
        comment: "用户",
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('location');
  }
};

