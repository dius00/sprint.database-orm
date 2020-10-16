import {MigrationInterface, QueryRunner} from "typeorm";

export class TablesareEager1602832511424 implements MigrationInterface {
    name = 'TablesareEager1602832511424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "ownerId" uuid, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "transactionDate" TIMESTAMP NOT NULL, "description" character varying, "accountId" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_2cb7f7a1dc3b84c8cde2b930944" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_26d8aec71ae9efbe468043cd2b9" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_26d8aec71ae9efbe468043cd2b9"`, undefined);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_2cb7f7a1dc3b84c8cde2b930944"`, undefined);
        await queryRunner.query(`DROP TABLE "transactions"`, undefined);
        await queryRunner.query(`DROP TABLE "accounts"`, undefined);
    }

}
