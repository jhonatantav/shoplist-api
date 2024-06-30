const { MigrationInterface, QueryRunner } = require('typeorm');

const bcrypt = require('bcryptjs');

module.exports = class InitialData1625061924935 {
  async up(queryRunner) {
    const passwordHash = await bcrypt.hash('password', 6);
    await queryRunner.query(
      `INSERT INTO "user" ("name", "email", "address", "password") VALUES ('John Doe', 'john@example.com', '123 Main St', '${passwordHash}');`,
    );

    await queryRunner.query(
      `INSERT INTO "shopping_list" ("item", "quantity", "userId") VALUES ('Milk', 2, 1), ('Bread', 3, 1), ('Eggs', 12, 1)`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DELETE FROM "shopping_list" WHERE "userId" = 1`);

    await queryRunner.query(
      `DELETE FROM "user" WHERE "email" = 'john@example.com'`,
    );
  }
};
