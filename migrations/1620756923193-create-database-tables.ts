import { MigrationInterface, QueryRunner } from 'typeorm'

export class createDatabaseTables1620756923193 implements MigrationInterface {
  name = 'createDatabaseTables1620756923193'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."sales_items" ("id" SERIAL NOT NULL, "customer_name" text NOT NULL, "item_price" money NOT NULL, "quantity" integer NOT NULL, "book_id" integer, CONSTRAINT "PK_bb2a96927330fef39b28977c055" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "public"."books" ("id" SERIAL NOT NULL, "isbn" text NOT NULL, "author_id" integer, CONSTRAINT "PK_f3f6925f444530b906b67edf63e" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "public"."authors" ("id" SERIAL NOT NULL, "name" text NOT NULL, "date_of_birth" TIMESTAMP NOT NULL, CONSTRAINT "PK_d40c793159ff60993c821631ec9" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."sales_items" ADD CONSTRAINT "FK_32904008975a2fcbaaf4122d493" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."books" ADD CONSTRAINT "FK_0406b29708b2979ce516d192c40" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."books" DROP CONSTRAINT "FK_0406b29708b2979ce516d192c40"`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."sales_items" DROP CONSTRAINT "FK_32904008975a2fcbaaf4122d493"`,
    )
    await queryRunner.query(`DROP TABLE "public"."authors"`)
    await queryRunner.query(`DROP TABLE "public"."books"`)
    await queryRunner.query(`DROP TABLE "public"."sales_items"`)
  }
}
