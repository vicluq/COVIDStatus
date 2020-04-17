
fetch("https://corona.lmao.ninja/v2/all?yesterday=true")
.then(function (response2) {
    return response2.json()
})
.then(function (data2) {
    getData2(data2)
})

function getData2 (data2) {

    let worldStats = data2

    let cases = worldStats.cases
    let todayCases = worldStats.todayCases
    let deaths = worldStats.deaths
    let todayDeaths = worldStats.todayDeaths
    let active = worldStats.active
    let tests = worldStats.tests

    setInterval(function () {

        document.getElementById("casos").innerHTML = cases
        document.getElementById("activeWrld").innerHTML = active
        document.getElementById("casosHJ").innerHTML = todayCases
        document.getElementById("deathsWrld").innerHTML = deaths
        document.getElementById("deathstdy").innerHTML = todayDeaths
        document.getElementById("tests").innerHTML = tests

    } , 2000)

}

//give time
setInterval(function () {

        let date1 = new Date

        let sec = date1.getSeconds(); let min = date1.getMinutes()
        let hour = date1.getHours(); let day = date1.getDate()
        let month = date1.getMonth(); let montArray = ["Janeiro", 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Agosto', 'Setembro']


        if (min < 10 && sec < 10) { document.getElementById("timing2").innerHTML = `Dia ${day} de ${montArray[month]}, ${hour}:0${min}:0${sec}` }
        else if (min < 10) { document.getElementById("timing2").innerHTML = `Dia ${day} de ${montArray[month]}, ${hour}:0${min}:${sec}` }
        else if (sec < 10) { document.getElementById("timing2").innerHTML = `Dia ${day} de ${montArray[month]}, ${hour}:${min}:0${sec}` }
        else { document.getElementById("timing2").innerHTML = `Dia ${day} de ${montArray[month]}, ${hour}:${min}:${sec}` }
    }, 1000)


//NEWS API

fetch("https://corona.lmao.ninja/v2/historical/all?lastdays=90")
.then(function (response3) {
    return response3.json()
}).then (function (data3) {
    console.log(data3)
    buildChart(data3)


}).catch (function (err) {
    console.log("you got an error: ", err)
})

function buildChart (data3) {

let worldEvol = data3

let casesDays = Object.keys(worldEvol.cases); console.log(casesDays)
let casesNum = Object.values(worldEvol.cases); console.log(casesNum)


let canvs = document.getElementById('chartWorld').getContext('2d');
let chartWorld = new Chart(canvs, {
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
