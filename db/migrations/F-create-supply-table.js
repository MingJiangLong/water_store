const Sequelize = require("sequelize");
module.exports = {
  /**
   * 
   * @param {Sequelize.QueryInterface} queryInterface 
   * @param {Sequelize} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('supply', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      supply_time: {
        type: Sequelize.DATE,
        comment: "补货时间"
      },
      supply_count: {
        type: Sequelize.INTEGER,
        comment: "补货数量"
      },

      product_id: {
        type: Sequelize.STRING,
        references: {
          model: "product",
          key: "product_id"
        },
        onDelete: 'CASCADE',
        onUpdate: "CASCADE",
        comment: "所属商品",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('supply');
  }
};