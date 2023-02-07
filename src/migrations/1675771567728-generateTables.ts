import { MigrationInterface, QueryRunner } from "typeorm";

export class generateTables1675771567728 implements MigrationInterface {
    name = 'generateTables1675771567728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contacts" DROP COLUMN "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contacts" ADD "password" character varying NOT NULL`);
    }

}
