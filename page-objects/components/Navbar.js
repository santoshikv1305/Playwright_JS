//import { Locator, Page } from '@playwright/test'
import { test, expect, Locator, Page } from '@playwright/test';
export class Navbar {
  page = Page
  accountSummary = Locator
  accountActivity = Locator
  transferFunds = Locator
  payBills = Locator
  myMoneyApp = Locator
  onlineStatements = Locator



  constructor(page = Page) {

    this.page = page
    this.accountSummary = page.locator('#account_summary_tab')
    this.accountActivity = page.locator('#account_activity_tab')
    this.transferFunds = page.locator('#transfer_funds_tab')
    this.payBills = page.locator('#pay_bills_tab')
    this.myMoneyApp = page.locator('#money_map_tab')
    this.onlineStatements = page.locator('#online_statements_tab')
  }


  async clickOnTab(tabName) {
    switch (tabName) {
      case 'Account Summary':
        await this.accountSummary.click()
        break
      case 'Account Activity':
        await this.accountActivity.click()
        break
      case 'Transfer Funds':
        await this.transferFunds.click()
        break
      case 'Pay Bills':
        await this.payBills.click()
        break
      case 'My Money App':
        await this.myMoneyApp.click()
        break
      case 'Online Statements':
        await this.onlineStatements.click()
        break
      default:
        throw new Error('This tab does not exist..')
    }
  }
}