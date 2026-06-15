const BasePage = require('./basePage');

class DashboardPage extends BasePage {
    get dashboardTitle() { return $('//android.widget.TextView[@text="Farm Command Center"]'); }
    get bottomNavHome() { return $('~Home'); }
    get bottomNavMarket() { return $('~Market'); }
    get bottomNavScan() { return $('~Scan'); }
    get bottomNavAssistant() { return $('~Assistant'); }
    get bottomNavProfile() { return $('~Profile'); }
    
    get totalFarmArea() { return $('//android.widget.TextView[contains(@text, "ha")]'); }

    async isDashboardLoaded() {
        return await this.isDisplayed(await this.dashboardTitle, 'Dashboard Title');
    }

    async navigateTo(tabName) {
        switch(tabName.toLowerCase()) {
            case 'market':
                await this.click(await this.bottomNavMarket, 'Market Tab');
                break;
            case 'scan':
                await this.click(await this.bottomNavScan, 'Scan Tab');
                break;
            case 'assistant':
                await this.click(await this.bottomNavAssistant, 'Assistant Tab');
                break;
            case 'profile':
                await this.click(await this.bottomNavProfile, 'Profile Tab');
                break;
            default:
                await this.click(await this.bottomNavHome, 'Home Tab');
        }
    }
}

module.exports = new DashboardPage();
