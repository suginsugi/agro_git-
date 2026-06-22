package appium;

import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class AppiumSimulationTest {

    @DataProvider(name = "appiumData")
    public Object[][] getTestData() {
        Object[][] data = new Object[291][1];
        for (int i = 0; i < 291; i++) {
            data[i][0] = "AGV-APP-" + String.format("%03d", i + 1);
        }
        return data;
    }

    @Test(dataProvider = "appiumData")
    public void executeAppiumTest(String testId) {
        // Simulate execution
        try { Thread.sleep(8); } catch (InterruptedException e) {}

        // 1 intentional failure
        if (testId.equals("AGV-APP-199")) {
            Assert.fail("Intentional Appium Failure (e.g., Element not visible on scroll) for Demonstration: " + testId);
        }

        Assert.assertTrue(true, "Appium test case executed successfully.");
    }
}
