import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Stores extends BaseSchema {
  protected tableName = 'stores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('storeID').primary()
      table.integer('productCount').notNullable()
      table.string('storeName',255).notNullable()
      table.string('ownerName',255)
      table.string('ownerLastName',255)
      table.string('telNo')
      table.string('address')
      table.integer('employee_id').unsigned().notNullable().references('employeeID').inTable('employees').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
