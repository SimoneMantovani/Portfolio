package com.simoneTotalInvoice.project;

import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Objects;

@Controller
public class ExcelFileInput {

    @CrossOrigin
    @PostMapping("/upload")
    @ResponseBody
    public double xlsxUpload(@RequestParam("file") @NotNull MultipartFile file,
                                    @RequestParam("customer_id") int customerId) throws Exception {
    if (file.isEmpty() == true){
        throw new FileNotFoundException();
    }

    if (Objects.equals(checkExtension(file.getOriginalFilename()), "xlsx")){
        InputStream inputStream = file.getInputStream();
        double totalInvoice = ExcelReader.reader((FileInputStream) inputStream, customerId);
        if(totalInvoice==0) throw new Exception("This customer has no invoice");
        return totalInvoice;
    }
    return 0;
    }

    private String checkExtension(String fileName){
        if (fileName.contains(".")){
            System.out.println(fileName.lastIndexOf(".")+1);
            return fileName.substring(fileName.lastIndexOf(".")+1);
        }
        return null;
    }
}
