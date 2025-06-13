//import { expect, Locator, Page } from '@playwright/test'
import { expect, Locator, Page } from '@playwright/test';
export class FeedbackPage {
   page= Page
   nameInput= Locator
   emailInput= Locator
   subjectInput= Locator
   commentInput= Locator
   clearButton= Locator
   submitButton= Locator
   feedbackTitle= Locator

  constructor(page= Page) {
    this.page = page
    this.nameInput = page.locator('#name')
    this.emailInput = page.locator('#email')
    this.subjectInput = page.locator('#subject')
    this.commentInput = page.locator('#comment')
    this.clearButton = page.locator("input[name='clear']")
    this.submitButton = page.locator("input[type='submit']")
    this.feedbackTitle = page.locator('#feedback-title')
  }

  async fillForm(
    name= string,
    email= string,
    subject= string,
    comment= string
  ) {
    await this.nameInput.type(name)
    await this.emailInput.type(email)
    await this.subjectInput.type(subject)
    await this.commentInput.type(comment)
    
  }

  async resetForm() {
    await this.clearButton.click()
  }

  async submitForm() {
    await this.submitButton.click()
  }

  async assertReset() {
    await expect(this.nameInput).toBeEmpty()
    await expect(this.commentInput).toBeEmpty()
  }

  async feedbackFormSent() {
    await expect(this.feedbackTitle).toBeVisible()
  }
}
