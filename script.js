
fetch("https://corona.lmao.ninja/v2/historical/brazil?lastdays=40")
.then(function (response) {
   return response.json() //retorna num formato que consigo usar
}).then (function (data) {
   console.log(data);

   retrieveData(data);
    
}).catch(function(error) {
    console.log("Failed to catch the covid status: ", error);
})


function retrieveData (dataRetrieved) {

    let coronaBrasil = dataRetrieved;
    
    let deaths = Object.values(coronaBrasil.timeline.deaths);
    let Num_cases = Object.values(coronaBrasil.timeline.cases);
    let Date_cases = Object.keys(coronaBrasil.timeline.cases);

    console.log(Num_cases, Date_cases)

    function givePointsColor (bckgrndColor) {

        bckgrndColor = []
        for (let i = 0; i < 40; ++i) {
            bckgrndColor[i] = 'rgba(255, 99, 132, 0.2)'
            
            if (bckgrndColor[i] == bckgrndColor[i - 1]) {
              bckgrndColor[i] = 'rgba(54, 162, 235, 0.2)'  
            }
            if (bckgrndColor[i] == bckgrndColor[i - 2]) {
                bckgrndColor[i] = 'rgba(255, 206, 86, 0.2)'
            }
            if (bckgrndColor[i] == bckgrndColor[i - 3]) {
                bckgrndColor[i] = 'rgba(75, 192, 192, 0.2)'
            }
            if (bckgrndColor[i] == bckgrndColor[i - 4]) {
                bckgrndColor[i] = 'rgba(153, 102, 255, 0.2)'
            }
            if (bckgrndColor[i] == bckgrndColor[i - 5]) {
                bckgrndColor[i] = 'rgba(255, 159, 64, 0.2)'
            }
        }
    
        return bckgrndColor
    }

    let backgroundCol = givePointsColor()

    function giveBordColor (bordColor) {

        bordColor = []
        for (let i = 0; i < 40; ++i) {
            bordColor[i] = 'rgba(255, 99, 132, 1)'
            
            if (bordColor[i] == bordColor[i - 1]) {
              bordColor[i] = 'rgba(54, 162, 235, 1)'  
            }
            if (bordColor[i] == bordColor[i - 2]) {
                bordColor[i] = 'rgba(255, 206, 86, 1)'
            }
            if (bordColor[i] == bordColor[i - 3]) {
                bordColor[i] = 'rgba(75, 192, 192, 1)'
            }
            if (bordColor[i] == bordColor[i - 4]) {
                bordColor[i] = 'rgba(153, 102, 255, 1)'
            }
            if (bordColor[i] == bordColor[i - 5]) {
                bordColor[i] = 'rgba(255, 159, 64, 1)'
            }
        }
    
        return bordColor
    }

    let bordcolors = giveBordColor()
///My chart configs
let ctx = document.getElementById('Chart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Date_cases,
        datasets: [{
            label: 'Cases Evolution',
            data: Num_cases,
            pointBackgroundColor: backgroundCol,
            pointBorderColor: bordcolors,
            pointBorderWidth: 1,
            backgroundColor: 'rgba(75, 192, 192, 0.3)'
            
            
        }, 
        
        {
            label: 'Death Evolution',
            data: deaths,
            pointBackgroundColor: backgroundCol,
            pointBorderColor: bordcolors,
            pointBorderWidth: 1,
            backgroundColor: 'rgba(244, 247, 76, 0.3)'
            
            
        }]

    },
    options: {

        legend: {
            display: true,
            labels: {
                fontColor: '#a52a2a',
                fontStyle: 'bold'
            }
    }
}})
}
