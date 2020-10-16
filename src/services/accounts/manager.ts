import { Repository, getRepository, DeleteResult } from "typeorm";
import Account from "../../entities/AccountModel";
import { IManager } from "../common/manager";
import Transaction from "../../entities/TransactionModel";

interface AccountWithBalance extends Account {
  balance: number;
}

class AccountManager implements IManager {
  protected accountRepository: Repository<Account>;

  /**
   * FIXME
   * After defining the Account entity,
   * uncomment the lines in the constructor definition
   */
  constructor() {
    this.accountRepository = getRepository(Account);
  }

  /**
   * FIXME
   * Get an account
   *
   * Requirements:
   * - Derive balance (both debit and credit)
   */

  public async getAccount(accountId: string): Promise<AccountWithBalance> {
    // You are free to remove any lines below
    const blankAccount = <AccountWithBalance>new Account();
    const retrieve = await this.accountRepository.findOne(accountId);
    if(!retrieve) return null;

    // TODO FIX BALANCE


    for (let key of Object.keys(retrieve)) blankAccount[key] = retrieve[key]
    let accountBalanceDerived = 0.0;
    blankAccount.balance = accountBalanceDerived;
    return blankAccount;

    
    // FIXME Your should derive account balance by aggregating all the transactions
    // const transactions = await this.accountRepository.createQueryBuilder("transactions")
    // .where("transaction.account.id =" accountId)
    // .getMany();

    // console.log(transactions);
    
  }

  /**
   * FIXME
   * create a new account
   */
  public async createAccount(details: Partial<Account>): Promise<Account> {
    const newAccount = new Account()
    for (let key of Object.keys(details)) newAccount[key] = details[key]
    return await this.accountRepository.save(newAccount);

  }

  /**
   * FIXME
   * update account details
   */
  public async updateAccount(accountId: string, changes: Partial<Account>): Promise<Account> {
    await this.accountRepository.update(accountId, changes);
    return await this.getAccount(accountId);
  }

  /**
   * FIXME
   * delete account
   *
   * Requirements:
   * - Cascade and delete all transactions
   */
  public async deleteAccount(accountId: string): Promise<DeleteResult | void> {
    return await this.accountRepository.delete(accountId);
  }
}

export default AccountManager;
