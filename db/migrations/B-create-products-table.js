const Sequelize = require("sequelize");
module.exports = {
  /**
   * 
   * @param {Sequelize.QueryInterface} queryInterface 
   * @param {Sequelize} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product', {
      product_id: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "商品id",
        primaryKey: true
      },
      product_name: {
        type: Sequelize.STRING,
        comment: "商品名"
      },
      product_pic: {
        type: Sequelize.STRING,
        comment: "图片"
      },
      product_weight: {
        type: Sequelize.DECIMAL,
        comment: "重量"
      },
      product_size: {
        type: Sequelize.DECIMAL,
        comment: "体积"
      },
      product_price: {
        type: Sequelize.DECIMAL,
        comment: "价格"
      },
      product_stock: {
        type: Sequelize.INTEGER,
        comment: "库存"
      },
      product_status: {
        type: Sequelize.STRING,
        comment: "状态"
      },
      update_at: {
        type: Sequelize.DATE,
        comment: "更新时间"
      },
      create_at: {
        type: Sequelize.DATE,
        comment: "创建时间"
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product');
  }
};