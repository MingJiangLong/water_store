const Sequelize = require("sequelize");
module.exports = {
  /**
   * 
   * @param {Sequelize.QueryInterface} queryInterface 
   * @param {Sequelize} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order', {
      trade_no: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        comment: "交易单号"
      },
      order_status: {
        type: Sequelize.TINYINT,
        defaultValue: 1,
        comment: "订单状态"
      },
      create_at: {
        type: Sequelize.DATE,
        comment: "创建时间"
      },
      update_at: {
        type: Sequelize.DATE,
        comment: "更新时间"
      },
      end_at: {
        type: Sequelize.DATE,
        comment: "完成时间"
      },
      buyer_id: {
        type: Sequelize.STRING,
        references: {
          model: "user",
          key: "user_id"
        },
        onDelete: 'CASCADE',
        onUpdate: "CASCADE",
        comment: "购买人",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order');
  }
};