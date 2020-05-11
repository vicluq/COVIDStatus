const countrySelect = document.querySelector('#country')

// old link: https://api.quarantine.country/api/v1/summary/region?region=${countrySelect[countrySelect.selectedIndex].value}

countrySelect.onchange = function ()
{   
    document.querySelector('#title1 span').innerText = `${countrySelect[countrySelect.selectedIndex].innerText}`
    console.log(countrySelect[countrySelect.selectedIndex].value)

    if (countrySelect[countrySelect.selectedIndex].innerText === 'Mundo') {
      fetch("https://corona.lmao.ninja/v2/all?yesterday=true")
      .then(function (response2) {
         return response2.json()
      })
      .then(function (data2) {
        usingData(data2)
      })

    } else {

    fetch(`https://disease.sh/v2/countries/${countrySelect[countrySelect.selectedIndex].value}?yesterday=true&strict=true`)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
          console.log(data)
            let CoronaData = data;
            usingData(CoronaData);
        })

        .catch((erro) => console.log("could not proceed: ", erro));

    }

    if (countrySelect[countrySelect.selectedIndex].innerText === 'Mundo') {
    
      fetch("https://corona.lmao.ninja/v2/historical/all?lastdays=90")
      .then(function (response3) {
          return response3.json()
      }).then (function (data3) {
          console.log(data3)
          buildChart(data3)
      
      
      }).catch (function (err) {
          console.log("you got an error: ", err)
      })

    } else {

      fetch(
          `https://corona.lmao.ninja/v2/historical/${
              countrySelect[countrySelect.selectedIndex].value
          }?lastdays=40`
        )
          .then(function (response) {
            return response.json(); //retorna num formato que consigo usar
          })
          .then(function (data) {
            document.getElementById('Chart').style.display = ""
            retrieveData(data);
          })
          .catch(function (error) {
            console.log("Failed to catch the covid status: ", error);
            document.getElementById('Chart').style.display = "none"
          });
    }
}

function usingData(data) {

    let Corona = data;

    // let coronaUpdates = Object.values(Corona.data.spots) //eu criei um array com os atributos que tem objetos dos dados atualizados e o array aumenta a cada 10 min 
    // let casosTotal = coronaUpdates[0].total_cases;
    // let mortesTotais = coronaUpdates[0].deaths;
    // let recuperados = coronaUpdates[0].recovered;
    // let casosAtivos = Corona.data.summary.active_cases;


    document.getElementById("totalcases").innerHTML = `${numberFormat(Corona.cases)}`
    document.getElementById("activecases").innerHTML = `${numberFormat(Corona.active)}`
    document.getElementById("casestoday").innerHTML = `${numberFormat(Corona.todayCases)}`
    document.getElementById("totaldeaths").innerHTML = `${numberFormat(Corona.deaths)}`
    document.getElementById("todaydeaths").innerHTML = `${numberFormat(Corona.todayDeaths)}`
    document.getElementById("recover").innerHTML = `${numberFormat(Corona.recovered)}`


}


function retrieveData(dataRetrieved) {
  let coronaBrasil = dataRetrieved;

  let deaths = Object.values(coronaBrasil.timeline.deaths);
  let Num_cases = Object.values(coronaBrasil.timeline.cases);
  let Date_cases = Object.keys(coronaBrasil.timeline.cases);

  function givePointsColor(bckgrndColor) {
    bckgrndColor = [];
    for (let i = 0; i < 40; ++i) {
      bckgrndColor[i] = "rgba(255, 99, 132, 0.2)";

      if (bckgrndColor[i] == bckgrndColor[i - 1]) {
        bckgrndColor[i] = "rgba(54, 162, 235, 0.2)";
      }
      if (bckgrndColor[i] == bckgrndColor[i - 2]) {
        bckgrndColor[i] = "rgba(255, 206, 86, 0.2)";
      }
      if (bckgrndColor[i] == bckgrndColor[i - 3]) {
        bckgrndColor[i] = "rgba(75, 192, 192, 0.2)";
      }
      if (bckgrndColor[i] == bckgrndColor[i - 4]) {
        bckgrndColor[i] = "rgba(153, 102, 255, 0.2)";
      }
      if (bckgrndColor[i] == bckgrndColor[i - 5]) {
        bckgrndColor[i] = "rgba(255, 159, 64, 0.2)";
      }
    }

    return bckgrndColor;
  }

  let backgroundCol = givePointsColor();

  function giveBordColor(bordColor) {
    bordColor = [];
    for (let i = 0; i < 40; ++i) {
      bordColor[i] = "rgba(255, 99, 132, 1)";

      if (bordColor[i] == bordColor[i - 1]) {
        bordColor[i] = "rgba(54, 162, 235, 1)";
      }
      if (bordColor[i] == bordColor[i - 2]) {
        bordColor[i] = "rgba(255, 206, 86, 1)";
      }
      if (bordColor[i] == bordColor[i - 3]) {
        bordColor[i] = "rgba(75, 192, 192, 1)";
      }
      if (bordColor[i] == bordColor[i - 4]) {
        bordColor[i] = "rgba(153, 102, 255, 1)";
      }
      if (bordColor[i] == bordColor[i - 5]) {
        bordColor[i] = "rgba(255, 159, 64, 1)";
      }
    }

    return bordColor;
  }

  let bordcolors = giveBordColor();
  ///My chart configs
  let ctx = document.getElementById("Chart").getContext("2d");
  let myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Date_cases,
      datasets: [
        {
          label: "Cases Evolution",
          data: Num_cases,
          pointBackgroundColor: backgroundCol,
          pointBorderColor: bordcolors,
          pointBorderWidth: 1,
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },

        {
          label: "Death Evolution",
          data: deaths,
          pointBackgroundColor: backgroundCol,
          pointBorderColor: bordcolors,
          pointBorderWidth: 1,
          backgroundColor: "rgba(244, 247, 76, 0.3)",
        },
      ],
    },
    options: {
      legend: {
        display: true,
        labels: {
          fontColor: "#68c8c2",
          fontStyle: "bold",
        },
      },
    },
  });
}

// if it is world

function buildChart (data3) {

  let worldEvol = data3
  
  let casesDays = Object.keys(worldEvol.cases); console.log(casesDays)
  let casesNum = Object.values(worldEvol.cases); console.log(casesNum)
  
  
  let ctx = document.getElementById('Chart').getContext('2d');
  let chartWorld = new Chart(ctx, {
      type: 'line',
      data: {
          labels: casesDays,
          datasets: [ {
              label: 'Casos',
              data: casesNum,
              pointBackgroundColor: 'rgba(244, 247, 76, 0.5)',
              pointBorderColor: 'rgba(244, 247, 76, 1)',
              pointBorderWidth: 1,
              backgroundColor: 'rgba(244, 247, 76, 0.6)'
              
              
          }]
  
      },
      options: {
  
          legend: {
              display: true,
              labels: {
                  fontColor: '#3f3e3e',
                  fontStyle: 'bold'
              }
      }
  }
  })}


  function numberFormat(num) {

    const number = num.toString()
  
    if (number.length === 6) {
      let numArr = [...number];
      console.log(numArr)
      const parsed = numArr
      
      numArr.forEach((num, index) => {
          if (index == 3) {
            console.log(num, index)
            parsed.splice(index, 0, '.')
          }
      })
    
      return parsed.join('')
    }

    else if (number.length === 5) {
        
        let numArr = [...number];
        console.log(numArr)
        const parsed = numArr
        
        numArr.forEach((num, index) => {
            if (index == 2) {
              parsed.splice(index, 0, '.')
            }
        })
      
        return parsed.join('')
    } 
    
    else if (number.length === 4) {
        
        let numArr = [...number];
        console.log(numArr)
        const parsed = numArr
        
        numArr.forEach((num, index) => {
            if (index == 1) {
              parsed.splice(index, 0, '.')
            }
        })
      
        return parsed.join('')
    }

    else if (number.length === 7) {
        
        let numArr = [...number];
        console.log(numArr)
        const parsed = numArr
        
        numArr.forEach((num, index) => {
            if (index == 1 || index == 5) {
              parsed.splice(index, 0, '.')
            }
        })
      
        return parsed.join('')
    }

    else if (number.length === 8) {
        
        let numArr = [...number];
        console.log(numArr)
        const parsed = numArr
        
        numArr.forEach((num, index) => {
            if (index == 2 || index == 6) {
              parsed.splice(index, 0, '.')
            }
        })
      
        return parsed.join('')
    }

    else if (number.length === 9) {
        
        let numArr = [...number];
        console.log(numArr)
        const parsed = numArr
        
        numArr.forEach((num, index) => {
            if (index == 3 || index == 7) {
              parsed.splice(index, 0, '.')
            }
        })
      
        return parsed.join('')
    }

    else if (number.length <= 3) {
      return num
    }
}
