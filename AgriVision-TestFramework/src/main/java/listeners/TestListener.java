package listeners;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import reports.ExtentManager;
import utilities.ExcelUtil;

public class TestListener implements ITestListener {
    private static ExtentReports extent = ExtentManager.getInstance();
    private static ThreadLocal<ExtentTest> test = new ThreadLocal<>();

    @Override
    public void onTestStart(ITestResult result) {
        ExtentTest extentTest = extent.createTest(result.getMethod().getMethodName(), result.getMethod().getDescription());
        test.set(extentTest);
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        test.get().log(Status.PASS, "Test Passed");
        ExcelUtil.addTestResult(result.getMethod().getMethodName(), "Module", "PASS", result.getEndMillis() - result.getStartMillis());
        System.out.println("PASSED  " + result.getMethod().getMethodName());
    }

    @Override
    public void onTestFailure(ITestResult result) {
        test.get().log(Status.FAIL, "Test Failed: " + result.getThrowable());
        // For demonstration, simulating a screenshot attachment
        test.get().addScreenCaptureFromPath("screenshots/dummy_screenshot.png", "Error Screenshot");
        ExcelUtil.addTestResult(result.getMethod().getMethodName(), "Module", "FAIL", result.getEndMillis() - result.getStartMillis());
        System.out.println("FAILED  " + result.getMethod().getMethodName());
        System.out.println("Screenshot Attached");
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        test.get().log(Status.SKIP, "Test Skipped");
    }

    @Override
    public void onFinish(ITestContext context) {
        extent.flush();
        ExcelUtil.saveExcel();
    }
}
