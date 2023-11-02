var csv = require("csvtojson");
var fs = require("fs");

const p = './datasets/crime';
var final = [];

fs.readdirSync(p).filter(async (file) => {
  if (fs.statSync(p + '/' + file).isDirectory()) {
    let jsonArrayObj = await csv().fromFile(p + '/' + file + '/' + file + '-northern-ireland-street.csv');

    jsonArrayObj = jsonArrayObj.filter(t => t['Crime type'] === 'Vehicle crime');
    console.log(file, jsonArrayObj.length)
    final.push(...jsonArrayObj);

    fs.writeFileSync('data.json', JSON.stringify(final));
  }
});