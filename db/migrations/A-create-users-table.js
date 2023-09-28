const Sequelize = require("sequelize");
module.exports = {
  /**
   * 
   * @param {Sequelize.QueryInterface} queryInterface 
   * @param {Sequelize} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "用户id",
        primaryKey: true,
      },
      open_id: {
        type: Sequelize.STRING,
        comment: "微信openid"
      },
      gender: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
        comment: "联系方式"
      },
      email: {
        type: Sequelize.STRING,
        comment: "邮箱"
      },
      user_status: {
        type: Sequelize.TINYINT,
        defaultValue: 1,
        comment: "状态"
      },
      user_name: {
        type: Sequelize.STRING,
        comment: "用户名"
      },
      password: {
        type: Sequelize.STRING,
      },
      birthday: {
        type: Sequelize.DATE
      },
      create_at: {
        type: Sequelize.DATE,
        comment: "创建时间"
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  }
};