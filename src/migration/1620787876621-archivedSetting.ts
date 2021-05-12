import {MigrationInterface, QueryRunner} from "typeorm";

export class archivedSetting1620787876621 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `
          CREATE TABLE archived_settings (
            id SERIAL,
            name VARCHAR(255) NOT NULL
          );
        `
      );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('archived_settings');
    }
}
