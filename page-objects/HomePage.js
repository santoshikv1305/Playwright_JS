//import { Locator, Page } from '@playwright/test'
import { expect, Locator, Page } from '@playwright/test';
export class HomePage {
   page= Page
   signInButton= Locator
   searchBox= Locator
   linkFeedback= Locator
   linkOnlineBanking= Locator
   usernameDropdown=Locator
   logoutButton=Locator

   
  constructor(page= Page) {
    this.page = page
    this.signInButton = page.locator('#signin_button')
    this.searchBox = page.locator('#searchTerm')
    this.linkFeedback = page.locator('#feedback')
    this.linkOnlineBanking = page.locator("//strong[normalize-space()='Online Banking']")
    this.usernameDropdown=page.getByText('username')
    this.logoutButton=page.getByRole('link', { name: 'Logout' })
  }

  async visit() {
    await this.page.goto(process.env.URL_ZeroBank)
  }

  async clickOnSignIn() {
    await this.signInButton.click()
  }

  async clickOnFeedbackLink() {
    await this.linkFeedback.click()
  }

  async clickOnOnlineBankingLink() {
    await this.linkOnlineBanking.click()
  }

  async searchFor(phrase= string) {
    await this.searchBox.type(phrase)
    await this.page.keyboard.press('Enter')
  }

  async logout() {
    await this.usernameDropdown.click({setTimeout:30000})
    await this.logoutButton.click()
}
  
}