import { Entity, OneToMany, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import Transaction from "./TransactionModel";
import User from "./UserModel";

/**
 * FIXME
 */
@Entity({name: "accounts"})
class Account {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public name: string;


  // @OneToOne(type => User, user => user.profile) // specify inverse side as a second parameter

  @OneToOne(type => User, user => user.id)
  public owner: User;
}

export default Account;




// class Account {
//   public id: string;
//   public transactions: Transaction[]; Not in provided schema
//   public name: string;
//   public owner: User;
// }
