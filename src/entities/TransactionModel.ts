import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import Account from "./AccountModel";

/**
 * FIXME
 */
@Entity({name: "transactions" /* Relation name in database */})
class Transaction {

  @PrimaryColumn("uuid")
  public id: string;

  @Column() // no need to set nullable as "by default column is nullable: false."
  public amount: number;  // TS has no specific float type only number

  @Column() // Date type supports timezone
  public transactionDate: Date;

  @Column({
    nullable: true
  }) // provided schema does NOT include NOT NULL
  public description: string;
  
  @ManyToOne(() => Account, account => account.id, {onDelete:'CASCADE'})
  public account: Account;



}
export default Transaction;
