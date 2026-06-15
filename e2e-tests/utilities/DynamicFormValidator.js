const { By } = require('selenium-webdriver');
const driverWrapper = require('./DriverWrapper');
const logger = require('./Logger');
const { expect } = require('chai');

class DynamicFormValidator {
  
  /**
   * Discovers all forms on the current page and validates them automatically.
   */
  async validateFormsOnPage() {
    logger.info('Starting dynamic form discovery and validation');
    
    // Find all forms on the page
    const forms = await driverWrapper.findElements(By.css('form'), 5000).catch(() => []);
    
    if (forms.length === 0) {
      logger.info('No forms found on the current page.');
      return;
    }
    
    logger.info(`Found ${forms.length} form(s) on the page.`);
    
    for (let i = 0; i < forms.length; i++) {
      await this.validateForm(forms[i], i);
    }
  }

  async validateForm(formElement, index) {
    logger.info(`Validating Form #${index + 1}`);
    
    const inputs = await formElement.findElements(By.css('input, textarea, select'));
    const submitBtn = await formElement.findElement(By.css('button[type="submit"], input[type="submit"]')).catch(() => null);

    if (!submitBtn) {
      logger.warn(`Form #${index + 1} does not have a standard submit button. Skipping dynamic validation.`);
      return;
    }

    // 1. Test empty submission (Required Fields Validation)
    await driverWrapper.executeScript("arguments[0].scrollIntoView(true);", submitBtn);
    await submitBtn.click();
    
    // Check required fields logic
    for (let input of inputs) {
      const isRequired = await input.getAttribute('required');
      if (isRequired) {
        const validationMessage = await input.getAttribute('validationMessage');
        expect(validationMessage).to.not.be.empty;
        logger.info(`Required field validation caught properly. Message: "${validationMessage}"`);
      }
    }
    
    // 2. Test format validations (e.g., email/tel)
    for (let input of inputs) {
      const type = await input.getAttribute('type');
      const name = await input.getAttribute('name') || await input.getAttribute('id') || 'unknown';
      
      if (type === 'email') {
        logger.info(`Testing invalid email format on field: ${name}`);
        await input.clear();
        await input.sendKeys('invalid-email-format');
        await submitBtn.click();
        
        const validationMessage = await input.getAttribute('validationMessage');
        expect(validationMessage).to.include('@');
        logger.info(`Email validation passed. Message: "${validationMessage}"`);
      }
      
      if (type === 'tel') {
        logger.info(`Testing invalid tel format on field: ${name}`);
        await input.clear();
        await input.sendKeys('abc'); // send letters to tel field
        
        // Custom app validation might restrict to numbers, or HTML5 pattern validation
        const pattern = await input.getAttribute('pattern');
        if (pattern) {
          await submitBtn.click();
          const validationMessage = await input.getAttribute('validationMessage');
          expect(validationMessage).to.not.be.empty;
        }
      }
    }
    
    logger.info(`Form #${index + 1} dynamic validation completed successfully.`);
  }
}

module.exports = new DynamicFormValidator();
