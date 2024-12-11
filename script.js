console.log("hello world");

// creating variables

const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;

// adding sheet names as variables

let salesMap;
let totalSales;
let salesByProduct;
let salesBySegment;

// button variables

const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");

// creating a function to log workbook info

function logWorkbookInformation() {
  // get workbook

  workbook = viz.workbook;
  console.log(`The workbook name is: "${workbook.name}"`);

  // get array of dashboards within our workbook

  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    index = element.index;
    console.log("The sheet with index [" + index + "] is : " + element.name);
  });

  // get active sheet

  vizActiveSheet = workbook.activeSheet;
  console.log("The active sheet is " + vizActiveSheet.name);

  // list all worksheets within the active sheet

  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    index = element.index;
    WorksheetName = element.name;
    console.log("The worksheet with [" + index + "] is named " + WorksheetName);
  });

  // assigning sheets to the variables created

  salesMap = listSheets.find((ws) => ws.name == "SaleMap");
  totalSales = listSheets.find((ws) => ws.name == "Total Sales");
  salesByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  salesBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}

// log workbook information once the viz has become interactive
viz.addEventListener("firstinteractive", logWorkbookInformation);

// enacting filter for oregon and washington

function oregonWashingtonEnact() {
  console.log(oregonWashingtonButton.value);

  // apply filter to sheets

  salesMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}

// enacting filter for clear filter

function clearFilterEnact() {
  console.log(clearButton.value);

  // apply filter to sheets

  salesMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");
  salesBySegment.clearFilterAsync("State");
}

// enacting filter for undo filter

function undoFilterEnact() {
  console.log(undoButton.value);

  // apply filter to sheets

  viz.undoAsync();
}

// event listener for buttons
oregonWashingtonButton.addEventListener("click", oregonWashingtonEnact);
clearButton.addEventListener("click", clearFilterEnact);
undoButton.addEventListener("click", undoFilterEnact);
