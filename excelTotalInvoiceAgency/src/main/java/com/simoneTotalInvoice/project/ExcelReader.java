package com.simoneTotalInvoice.project;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Iterator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelReader {

    public static double reader(FileInputStream file, int customer_id) throws IOException {
        double totalInvoiceAmount = 0;
        XSSFWorkbook workbook = new XSSFWorkbook(file);
        XSSFSheet sheet = workbook.getSheetAt(0);
        Iterator<Row> rowIterator = sheet.iterator();
        while (rowIterator.hasNext()) {
            Row row = rowIterator.next();
            if((int)row.getCell(0).getNumericCellValue()==customer_id){
                if(row.getCell(4).getBooleanCellValue()==true){
                    totalInvoiceAmount += row.getCell(3).getNumericCellValue();
                }
            }
        }
        return totalInvoiceAmount;
    }
}