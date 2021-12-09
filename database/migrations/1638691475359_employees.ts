import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Employees extends BaseSchema {
  protected tableName = "employees";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("employee_id").primary();
      table.string("username", 255).notNullable().unique();
      table.string("password", 100).notNullable();
      table.string("first_name", 255).notNullable();
      table.string("last_name", 255).notNullable();
      table.string("tel_no");
      table.string("email");
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
