const XLSX = require("xlsx");
const workbook = XLSX.readFile("../exceldata/bossbot.xlsx");
const worksheet = workbook.Sheets["Sheet1"];

const arrSuits = XLSX.utils.sheet_to_json(worksheet);

console.log(arrSuits);
