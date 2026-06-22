package utilities;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class ExcelUtil {
    private static final String EXCEL_PATH = System.getProperty("user.dir") + "/excel/Master_Report.xlsx";
    private static Workbook workbook;
    private static Sheet sheet;
    private static int rowCount = 0;

    public static void initializeExcel() {
        workbook = new XSSFWorkbook();
        sheet = workbook.createSheet("Test Results");
        
        Row header = sheet.createRow(rowCount++);
        header.createCell(0).setCellValue("Test Case ID");
        header.createCell(1).setCellValue("Module");
        header.createCell(2).setCellValue("Status");
        header.createCell(3).setCellValue("Execution Time (ms)");
    }

    public static void addTestResult(String testId, String module, String status, long duration) {
        if (workbook == null) {
            initializeExcel();
        }
        Row row = sheet.createRow(rowCount++);
        row.createCell(0).setCellValue(testId);
        row.createCell(1).setCellValue(module);
        row.createCell(2).setCellValue(status);
        row.createCell(3).setCellValue(duration);
    }

    public static void saveExcel() {
        try {
            File dir = new File(System.getProperty("user.dir") + "/excel");
            if (!dir.exists()) dir.mkdirs();
            
            FileOutputStream out = new FileOutputStream(EXCEL_PATH);
            workbook.write(out);
            out.close();
            workbook.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
