const request = require("request");
const cheerio = require("cheerio");
const { find } = require("cheerio/lib/api/traversing");
// const fs = require("fs");
// const path = require("path");
// const xlsx = require("xlsx");

function getInfoFromScorecard(url) {
   //console.log("from scorecards.js ",url);
    // we have a url of a scorecard, we want to get html of that scorecard
  // console.log("request received "+count);
  request(url, cb);
}


function cb(err,res,body) {
    if (err) {
        console.log(err);
    }
    else if (res.statusCode == 404) {
      console.log("Page not found");
    }
    else {
      // console.log("Page found");
        getMatchDetails(body);
    }
}

function getMatchDetails(html) {
  // selectool contains html of ith scorecrad
  let selecTool = cheerio.load(html);

  //1. get venue
  //2. get date
  let desc = selecTool(".ds-text-tight-m.ds-font-regular.ds-text-ui-typo-mid");
   console.log(desc.text());
   let descArr = desc.text().split(",");
  //Match (N), Abu Dhabi, Oct 25 2020, Indian Premier League
     //console.log(descArr);

    let dateOfMatch = descArr[2];
    let venueOfMatch = descArr[1];
    console.log(dateOfMatch);
    console.log(venueOfMatch);

    //3. get result
      let matchResEle = selecTool(
        ".ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title"
      );
  let matchResult = matchResEle.text();;
      console.log(matchResult);
        
  //4. get team names
  let teamNameArr= selecTool('a[class="ds-text-ui-typo hover:ds-text-ui-typo-primary ds-block"]');
   //console.log(teamNames.text());
  let ownTeam = selecTool(teamNameArr[0]).text();
  let opponentTeam = selecTool(teamNameArr[1]).text();
   console.log(ownTeam);
  console.log(opponentTeam);
      
      
  //5. get innings 

  let allBatsmenTable = selecTool(".ds-w-full.ds-table.ds-table-xs.ds-table-fixed.ci-scorecard-table tbody");
  console.log("number of batsmen tables are -> ",allBatsmenTable.length);
  let htmlString= "";
  //let count = 0;
  //console.log(allBatsmenTable.html());
   for(let i=0;i<allBatsmenTable.length;i++){
     htmlString+=selecTool(allBatsmenTable[i]).html();
  ///* 
  //   let allcolms = selecTool(allBatsmenTable[i].find("td"));
  //console.log(allcolms.text());
    //Shikhar Dhawan  b J Yadav1513-30115.38
  //   break;
  
  //check to see if any of the matched elements have the given className
  //let hasData = selecTool(allcolms[0]).hasClass();
   //*/
   //console.log(htmlString);
   ////get the descendants(table columns) of each element(table row)
   let allRows = selecTool(allBatsmenTable[i]).find("tr");// -> data of batsmen + empty rows
   for(let i=0;i<allRows.length;i++){
  //check to see if any of the matched elements have the given className
  let row = selecTool(allRows[i]);
  let firstColmnOfRow = row.find("td")[0];
  if(selecTool(firstColmnOfRow).hasClass("ds-min-w-max")){ //ds-min-w-max ds-min-w-max
     //valid data will be getting
    //  count++;
    //  console.log("inside" + count);
     //name | run | balls | 4's | 6's | sr
    //  for(let i=0; i<8; i++){
    //    if(i==1 || i==6){
    //      continue
    //    }
    //    else{
    //      console.log(selecTool(row.find("td")[1]).text());
    //    }
    //  }
     let playerName = selecTool(row.find("td")[0]).text();
     let runs = selecTool(row.find("td")[2]).text();
     let balls = selecTool(row.find("td")[3]).text();
     let numberOf4 = selecTool(row.find("td")[5]).text();
     let numberOf6 = selecTool(row.find("td")[6]).text();
     let sr = selecTool(row.find("td")[7]).text();

     console.log(
      `playerName -> ${playerName}, runsScored ->  ${runs}, ballsPlayed ->  ${balls}, numbOfFours -> ${numberOf4}, numbOfSixes -> ${numberOf6},  strikeRate-> ${sr}`
    );

     }
   }

   }
  }
 
//visit every scorecard and get info 
module.exports = {
    gifs:getInfoFromScorecard
    //getInfoFromScorecard: getInfoFromScorecard
}

// playername ki jo html  h usko copy krke ek mini analysis 