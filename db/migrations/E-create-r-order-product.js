const Sequelize = require("sequelize");
module.exports = {
  /**
   * 
   * @param {Sequelize.QueryInterface} queryInterface 
   * @param {Sequelize} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('r-order-product', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "交易单号"
      },
      order_id: {
        type: Sequelize.STRING,
        references: {
          model: "order",
          key: "trade_no"
        },
        onDelete: 'CASCADE',
        onUpdate: "CASCADE",
      },
      product_id: {
        type: Sequelize.STRING,
        references: {
          model: "product",
          key: "product_id"
        },
        onDelete: 'CASCADE',
        onUpdate: "CASCADE",
        comment: "订单状态"
      },

      count: {
        type: Sequelize.INTEGER,
        comment: "数量"
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};