import {MigrationInterface, QueryRunner} from "typeorm";

export class fixOnetoOnev11602810880680 implements MigrationInterface {
    name = 'fixOnetoOnev11602810880680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "ownerId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "UQ_2cb7f7a1dc3b84c8cde2b930944" UNIQUE ("ownerId")`, undefined);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_2cb7f7a1dc3b84c8cde2b930944" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_2cb7f7a1dc3b84c8cde2b930944"`, undefined);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "UQ_2cb7f7a1dc3b84c8cde2b930944"`, undefined);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "ownerId"`, undefined);
    }

}
