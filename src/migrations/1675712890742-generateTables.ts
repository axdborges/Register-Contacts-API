import { MigrationInterface, QueryRunner } from "typeorm";

export class generateTables1675712890742 implements MigrationInterface {
    name = 'generateTables1675712890742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "telefone" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "telefone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_68782cec65c8eef577c62958273" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Contacts" ADD CONSTRAINT "FK_3559708e3492b03b67d9a35a9d4" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contacts" DROP CONSTRAINT "FK_3559708e3492b03b67d9a35a9d4"`);
        await queryRunner.query(`DROP TABLE "Contacts"`);
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
