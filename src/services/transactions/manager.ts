import { Repository, getRepository, DeleteResult, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import Transaction from "../../entities/TransactionModel";
import { IManager } from "../common/manager";
import Account from "../../entities/AccountModel";

interface TransactionWithAccountId extends Transaction {
  accountId: string;
}

/**
 * Entity manager for User model
 * This is where you define logic to access data from database
 *
 * To read more about using a Manager object,
 * refer to UserManager class in `src/service/users/manager.ts`
 */
class TransactionManager implements IManager {
  protected transactionRepository: Repository<Transaction>;

  /**
   * FIXME
   * After defining the Account entity,
   * uncomment the litnes in the constructor definition
   */
  constructor() {
    this.transactionRepository = getRepository(Transaction);

  }

  /**
   * FIXME
   * Get a transaction from database
   */
  public async getTransaction(transactionId: string): Promise<Transaction> {
    return await this.transactionRepository.findOne(transactionId);
  }

  /**
   * FIXME
   * Get a list of transactions with ids from database
   */
  public async listTransactionsByIds(transactionIds: string[]): Promise<Transaction[]> {
    return await this.transactionRepository.findByIds(transactionIds)
  }

  /**
   * FIXME
   * Get a list of transactions of a particular account
   */
  public async listTransactionsInAccount(accountId: string): Promise<Transaction[]> {
    const transactions = await this.transactionRepository.find({
      where: {
        account: accountId
      }
    })
    return transactions;
  }

  /**
   * FIXME
   * Get a list of transactions less than `maximumAmount` in a particular `account`
   */
  public async filterTransactionsByAmountInAccount(accountId: string, maximumAmount: number): Promise<Transaction[]> {
    const transaction = await this.transactionRepository.find({
      where:
        {amount: LessThanOrEqual(-1*maximumAmount), account: accountId},
    })
    
    return transaction;
  }
  
  /**
   * FIXME
   * create a new transaction
   */
  public async createTransaction(details: Partial<TransactionWithAccountId>): Promise<Transaction> {
    const newTransaction = new Transaction()
    for (let key of Object.keys(details)) newTransaction[key] = details[key];
    const acc = await getRepository(Account).findOne(details.accountId);
    newTransaction.account = acc;
    await this.transactionRepository.save(newTransaction);
    return newTransaction;
    }

  /**
   * update a transaction
   *
   * FIXME
   * 1. Remove the return statement
   * 2. Uncomment the remaining lines
   */
  public async updateTransaction(
    transactionId: string,
    changes: Partial<TransactionWithAccountId>,
  ): Promise<Transaction> {
    if ("accountId" in changes) {
        changes = {
            ...changes,
            account: <any>{ id: changes.accountId }
        };
    }
    await this.transactionRepository.update(transactionId, changes);
    return this.transactionRepository.findOne(transactionId);
    
  }

  /**
   * FIXME
   * delete a transaction
   */
  public async deleteTransaction(transactionId): Promise<DeleteResult | void> {
    return await this.transactionRepository.delete(transactionId);
  }
}

export default TransactionManager;
