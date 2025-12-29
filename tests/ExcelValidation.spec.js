import { test, expect, request } from '@playwright/test';
const ExcelJs = require('exceljs');

async function writeExcel(searchText, replaceText, change, filePath) {
     const wrkbook =new ExcelJs.Workbook;
     await wrkbook.xlsx.readFile('/Users/vivek_ravi/Downloads/download.xlsx')
     const wrksht= wrkbook.getWorksheet('Sheet1')
     const output = readExcel(wrksht, searchText); // not async
 
     const cell = wrksht.getCell(output.row, output.column + change.colChange);
     cell.value = replaceText;
     await wrkbook.xlsx.writeFile(filePath);

}
function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        if (cell.value === searchText) {
          output = { row: rowNumber, column: colNumber };
        }
      });
    });
    return output;
  }



test("Upload Download -Excel Functions",async()=>{
    const textSearch = 'Mango';
    const updateValue = '350';
   
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  const dl = await download;
  const filePath = '/Users/vivek_ravi/Downloads/download.xlsx'; 
  
 
  await writeExcel(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);
 
  await page.locator('#fileinput').setInputFiles(filePath);
 
  const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);





})