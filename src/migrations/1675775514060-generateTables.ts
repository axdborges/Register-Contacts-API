import { MigrationInterface, QueryRunner } from "typeorm";

export class generateTables1675775514060 implements MigrationInterface {
    name = 'generateTables1675775514060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "isAdm" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "isAdm"`);
    }

}
