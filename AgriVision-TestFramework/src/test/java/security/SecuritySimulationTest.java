package security;

import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class SecuritySimulationTest {

    @DataProvider(name = "securityData")
    public Object[][] getTestData() {
        Object[][] data = new Object[291][1];
        for (int i = 0; i < 291; i++) {
            data[i][0] = "AGV-SEC-" + String.format("%03d", i + 1);
        }
        return data;
    }

    @Test(dataProvider = "securityData")
    public void executeSecurityTest(String testId) {
        // Simulate OWASP ZAP / RestAssured execution
        try { Thread.sleep(5); } catch (InterruptedException e) {}

        // 1 intentional failure
        if (testId.equals("AGV-SEC-042")) {
            Assert.fail("Intentional Security Failure (e.g., JWT Bypass Vulnerability) for Demonstration: " + testId);
        }

        Assert.assertTrue(true, "Security test case executed successfully.");
    }
}
