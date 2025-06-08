import { readFile, utils } from 'xlsx';

export class CommonFunction {

  async ReadExcelFile(filename, sheetname) 
  {
    var workbook = readFile(filename);
    var sheet_name_list = workbook.SheetNames;
    var records = utils.sheet_to_json(workbook.Sheets[sheet_name_list[sheetname]]);
    return records;
  }
}