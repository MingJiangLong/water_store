const Sequelize = require("sequelize");
module.exports = {
  /**
   * 
   * @param {Sequelize.QueryInterface} queryInterface 
   * @param {Sequelize} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('supply_record', {
      record_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'product',
          key: 'product_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      supply_number: {
        type: Sequelize.INTEGER
      },
      create_at: {
        type: Sequelize.DATE,
        comment: "创建时间"
      },
      creator: {
        type: Sequelize.INTEGER,
        comment: "创建人id"
      }
    });

    await queryInterface.addConstraint('product', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'fk_order_product_id',
      references: { // 外键关联的主表信息
        table: 'product',
        field: 'product_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  }
};