const Sequelize = require("sequelize");
module.exports = {
  /**
   * 
   * @param {Sequelize.QueryInterface} queryInterface 
   * @param {Sequelize} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user', [
      {
        user_id: "aaaaaaaa",
        open_id: "",
        gender: "MALE",
        create_at: new Date(),
        phone: '2755582',
        email: "",
        user_status: 'ABLE',
        user_name: "longjiang",
        password: '2755582'
      },
      {
        user_id: "bbbbbbbbb",
        open_id: "",
        gender: "MALE",
        create_at: new Date(),
        phone: '17378676341',
        email: "",
        user_status: 'ABLE',
        user_name: "longjiang2",
        password: '2755582',
        birthday: ""
      },
      {
        user_id: "cccccccc",
        open_id: "",
        gender: "FEMALE",
        create_at: new Date(),
        phone: '112324233',
        email: "",
        user_status: 'ABLE'
        user_name: "longjiang3",
        password: '2755582',
        birthday: ""
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  }
};