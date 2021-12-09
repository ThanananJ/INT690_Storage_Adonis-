import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Stores extends BaseSchema {
  protected tableName = "stores";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("store_id").primary();
      table.integer("product_count").notNullable();
      table.string("store_name", 255).notNullable();
      table.string("owner_name", 255);
      table.string("owner_last_name", 255);
      table.string("tel_no");
      table.string("address");
      table.integer("employeeid").unsigned().notNullable().references("employee_id").inTable("employees").onDelete("CASCADE");

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
