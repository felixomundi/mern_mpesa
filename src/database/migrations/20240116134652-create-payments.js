'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        defaultValue:0,
      },
      CheckoutRequestID: {
        type: Sequelize.STRING,
        allowNull: true,
        unique:true,
      },
      MerchantRequestID: {
        type: Sequelize.STRING,
        allowNull: true,
        unique:true,
      },
      MpesaReceiptNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        unique:true,
      },
      ResultDesc: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};