const Sequelize = require("sequelize");
module.exports = {
  /**
   * 
   * @param {Sequelize.QueryInterface} queryInterface 
   * @param {Sequelize} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('product', [
      {
        product_id: "p_aaa",
        product_name: "农夫山泉",
        product_pic: '',
        product_weight: 3,
        product_size: 3,
        product_price: 9.1,
        product_stock: 20,
        product_status: "ABLE",
        update_at: new Date(),
        create_at: new Date(),
      },
      {
        product_id: "p_bbb",
        product_name: "茉莉乌龙",
        product_pic: '',
        product_weight: 2,
        product_size: 2,
        product_price: 2.1,
        product_stock: 10,
        product_status: "ABLE",
        update_at: new Date(),
        create_at: new Date(),
      },
      {
        product_id: "p_ccc",
        product_name: "怡宝",
        product_pic: '',
        product_weight: 3,
        product_size: 3,
        product_price: 4,
        product_stock: 15,
        product_status: "ABLE",
        update_at: new Date(),
        create_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product', null, {});
  }
};