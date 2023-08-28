
var test1
var browseHistory = []
var mapObj = {' ft. ':"</a>&nbspft.&nbsp<a>",' / ':"</a>&nbsp/&nbsp<a>",', ':"</a>,&nbsp<a>"};
var mapObj1 = {' ft. ':"separator",' / ':"separator",', ':"separator"};
var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
var genrePool = ['#de7eea','#a16fd9','#9a82c8','#c295c8','#d700ff','#854d76','#ba2c8e','#ba3d3d','#b65f5f','#603232','#1a1a1a','#413630','#935b4a','#3ca33f','#308532','#638559','#6a9d32','#8eb371','#4aca4e','#97be9d','#a4d685','#c4c800','#a7ab00','#d5eb20','#ddf3a8','#c6ccae','#ceb8ae','#7085ef','#5666b8','#4d95b8','#623aff','#73e6e0','#3eadef','#ff6900','#f6b26b','#b3997a','#d49875','#c7cc86','#ffe381','#f5d8d8']

homeInitialize()
function homeInitialize() {
  test1 = false
  document.querySelector("#main-content").innerHTML = ''

  const yeah = document.createElement("div")
  yeah.innerHTML = "Hello and welcome!"
  document.querySelector("#main-content").appendChild(yeah);
}



async function browse() {
  const api_url = 'https://opensheet.elk.sh/1oxsWP57qoaxOZFUpPmwQ-Dkagv0o87qurp92_-VKITQ/allYears';
  const response = await fetch(api_url);
  const data = await response.json();

  const decades = []
  const years = []
  const months = []
  const weeks = []
  for (var i = 0; i < data.length; i++) {
    decades.push(data[i].week.slice(0,3) + "0")
    years.push(data[i].week.slice(0,4))
    months.push(data[i].week.slice(0,7))
    weeks.push(data[i].week)
  }
  var uniqueDecades = decades.filter(function(item, pos){
    return decades.indexOf(item)== pos
  })
  var uniqueYears = years.filter(function(item, pos){
    return years.indexOf(item)== pos
  })
  var uniqueMonths = months.filter(function(item, pos){
    return months.indexOf(item)== pos
  })
  var uniqueWeeks = weeks.filter(function(item, pos){
    return weeks.indexOf(item)== pos
  })

  function testHistory(term) {
    const history = document.querySelector("#history")
    browseHistory.push(term)
    var date = browseHistory[browseHistory.length - 1][0].replaceAll('/','-')
    var request = browseHistory[browseHistory.length - 1][1]
  
    const historyItem = document.createElement("li")
    // historyItem.setAttribute("date", date)
    // historyItem.setAttribute("request", request)
    if (request == 'decade') {
      historyItem.innerHTML = date.slice(0,3) + "0s"
      historyItem.addEventListener("click", function() { testfml(date.slice(0,3) + "0",request,'navigate');updateHistory(historyItem) })
    } else if (request == 'year') {
      historyItem.innerHTML = date.slice(0,4)
      historyItem.addEventListener("click", function() { testfml(date.slice(0,4),request,'navigate');updateHistory(historyItem) })
    } else if (request == 'month') {
      historyItem.innerHTML = date.slice(0,7)
      historyItem.addEventListener("click", function() { testfml(date.slice(0,7),request,'navigate');updateHistory(historyItem) })
    } else if (request == 'week') {
      historyItem.innerHTML = date
      historyItem.addEventListener("click", function() { document.querySelector('#top10').innerHTML = '';testfml(date,request,'navigate');updateHistory(historyItem) })
    }
    history.appendChild(historyItem)
  
  }

  

  browseInitialize()
  function browseInitialize() {
    document.querySelector("#main-content").innerHTML = ''

    const navContainer = document.createElement("div")
    navContainer.setAttribute("id", 'nav-container')
    document.querySelector("#main-content").appendChild(navContainer)

    const buttonContainer = document.createElement("div")
    buttonContainer.setAttribute("id", 'button-container')
    document.querySelector("#nav-container").appendChild(buttonContainer)

    const decadeContainer = document.createElement("div")
    decadeContainer.classList.add('button-container')
    decadeContainer.setAttribute("id", 'decade-container')
    decadeContainer.style.gridTemplateColumns = 'repeat('+uniqueDecades.length+', 1fr)'
    document.querySelector("#button-container").appendChild(decadeContainer)

    const yearContainer = document.createElement("div")
    yearContainer.classList.add('button-container')
    yearContainer.setAttribute("id", 'year-container')
    yearContainer.style.gridTemplateColumns = 'repeat(10, 1fr)'
    document.querySelector("#button-container").appendChild(yearContainer)

    const monthContainer = document.createElement("div")
    monthContainer.classList.add('button-container')
    monthContainer.setAttribute("id", 'month-container')
    monthContainer.style.gridTemplateColumns = 'repeat(12, 1fr)'
    document.querySelector("#button-container").appendChild(monthContainer)
    
    const weekContainer = document.createElement("div")
    weekContainer.classList.add('button-container')
    weekContainer.setAttribute("id", 'week-container')
    weekContainer.style.gridTemplateColumns = 'repeat(53, 1fr)'
    document.querySelector("#button-container").appendChild(weekContainer)

    const chartWrapper = document.createElement("div")
    chartWrapper.setAttribute("id", 'chart-wrapper')
    document.querySelector("#main-content").appendChild(chartWrapper)

    const videoPic = document.createElement("div")
    videoPic.setAttribute("id", 'videos')
    document.querySelector("#chart-wrapper").appendChild(videoPic)

    const chartTitle = document.createElement("div")
    chartTitle.classList.add('chart-title')
    document.querySelector("#chart-wrapper").appendChild(chartTitle)

    const topgenres = document.createElement("div")
    topgenres.setAttribute("id", 'genres')
    topgenres.classList.add('genres')
    document.querySelector("#chart-wrapper").appendChild(topgenres)

    genrePool.forEach((item, i) => {
      const li = document.createElement("li");
      li.setAttribute("id", 'id' + item.slice(-6));
      li.style.order = i + 1;
      // li.innerHTML = '<div style="display:inline-block;background: ' + item + ';"></div>'
      // li.innerHTML = '<div style="display:inline-block;width:16px;height:16px;background: ' + item + ';"></div>'
      document.querySelector("#genres").appendChild(li);
    })

    const childrenContainer = document.createElement("div")
    childrenContainer.setAttribute("id", 'children-container')
    document.querySelector("#chart-wrapper").appendChild(childrenContainer)

    uniqueDecades.forEach((item, i) => {
      drawCalendar(item,'decade')
    })

    if (browseHistory.length !== 0) {
      // chartInitialize()
      // findWeek(browseHistory[browseHistory.length - 1])
    }
  }

  

  function drawCalendar(input,request) {
    
    const token = document.createElement("button")
    const childrenContainer = document.querySelector("#children-container")
    const token1 = document.createElement("button")
    if (request == 'decade') {
      input = input.slice(0,3)
      token.innerHTML = input + "0s"
      token1.innerHTML = input + "0s"
    } else {
      token.innerHTML = input
      token1.innerHTML = input
    }
    token.setAttribute("id", request+'-'+input.replaceAll('/','-'))
    token.onclick = function(){
      findChildren()
    }

    token1.setAttribute("id", 'children-'+input.replaceAll('/','-'))
    token1.onclick = function(){
      findChildren()
    }

    function findChildren() {
      childrenContainer.innerHTML = ''

      var requestIndex = input
      testfml(requestIndex.replaceAll('/','-'),request,'initialize')
      
      if (request == 'decade') {
        uniqueYears.forEach((item, i) => {
          if (item.slice(0,3) == token.innerHTML.slice(0,3)) {
            drawCalendar(item,'year')
          }
        })
      } else if (request == 'year') {
        uniqueMonths.forEach((item, i) => {
          if (item.slice(0,4) == token.innerHTML.slice(0,4)) {
            drawCalendar(item,'month')
          }
        })
      } else if (request == 'month') {
        uniqueWeeks.forEach((item, i) => {
          if (item.slice(0,7) == token.innerHTML.slice(0,7)) {
            drawCalendar(item,'week')
          }
        })
      }
    }

    childrenContainer.appendChild(token1)
    document.querySelector("#"+request+"-container").appendChild(token)

    //FIND PICS FOR EVERY DECADE/YEAR/MONTH/WEEK
    
    // var songList = []
    // for (let i = 1; i <= 10; i++) {
    //   searchYearly(i)
    // }
    // function searchYearly(pos) {
    //   for (let i = 0; i < data.length; i++) {
    //     if (data[i].week.includes(input)) {
    //       var name = data[i]?.['no'+pos+'name']
    //       var artist = data[i]?.['no'+pos+'artist']
    //       var genre = data[i]?.['no'+pos+'genre']
    //       var object = [genre,name,artist]
    //       var score = 11 - pos
    //       songList.push({object,score})
    //     }
    //   }
    // }
    // group(songList).forEach((item, i) => {
    //   if (i == '0') {
    //     pic(item.key[2], item.key[1], 'children-'+input.replaceAll('/','-'))
    //   }
    // })
  }

  function testfml(input, request, action) {

    if (request == 'decade') {
      input = input.slice(0,3)
      for (let i = 0; i < document.querySelectorAll('#button-container button').length; i++) {
        document.querySelectorAll('#button-container button')[i].style.opacity = '1'
      }
      document.querySelector("#children-container").innerHTML = ''
      document.querySelector('#decade-'+input).style.opacity = '0.5'
      document.querySelector("#year-container").innerHTML = ''
      if (action == 'navigate') {
        uniqueYears.forEach((item, i) => {
          if (item.slice(0,3) == input) {
            drawCalendar(item,'year')
          }
        })
      }
      document.querySelector("#month-container").innerHTML = ''
      document.querySelector("#week-container").innerHTML = ''

      nextPrev(uniqueDecades)
    } else if (request == 'year') {
      document.querySelector("#year-container").innerHTML = ''
      uniqueYears.forEach((item, i) => {
        if (item.slice(0,3) == input.slice(0,3)) {
          drawCalendar(item,'year')
        }
      })
      for (let i = 0; i < document.querySelectorAll('#button-container button').length; i++) {
        document.querySelectorAll('#button-container button')[i].style.opacity = '1'
      }
      document.querySelector("#children-container").innerHTML = ''
      document.querySelector('#decade-'+input.slice(0,3)).style.opacity = '0.5'
      document.querySelector('#year-'+input.slice(0,4)).style.opacity = '0.5'
      document.querySelector("#month-container").innerHTML = ''
      if (action == 'navigate') {
        uniqueMonths.forEach((item, i) => {
          if (item.slice(0,4) == input.slice(0,4)) {
            drawCalendar(item,'month')
          }
        })
      }
      document.querySelector("#week-container").innerHTML = ''

      nextPrev(uniqueYears)
    } else if (request == 'month') {
      document.querySelector("#year-container").innerHTML = ''
      uniqueYears.forEach((item, i) => {
        if (item.slice(0,3) == input.slice(0,3)) {
          drawCalendar(item,'year')
        }
      })
      document.querySelector("#month-container").innerHTML = ''
      uniqueMonths.forEach((item, i) => {
        if (item.slice(0,4) == input.slice(0,4)) {
          drawCalendar(item,'month')
        }
      })
      for (let i = 0; i < document.querySelectorAll('#button-container button').length; i++) {
        document.querySelectorAll('#button-container button')[i].style.opacity = '1'
      }
      document.querySelector("#children-container").innerHTML = ''
      document.querySelector('#decade-'+input.slice(0,3)).style.opacity = '0.5'
      document.querySelector('#year-'+input.slice(0,4)).style.opacity = '0.5'
      document.querySelector('#month-'+input.slice(0,7)).style.opacity = '0.5'
      document.querySelector("#week-container").innerHTML = ''
      if (action == 'navigate') {
        uniqueWeeks.forEach((item, i) => {
          if (item.slice(0,7) == input.slice(0,7).replaceAll('-','/')) {
            drawCalendar(item,'week')
          }
        })
      }

      nextPrev(uniqueMonths)
    } else if (request == 'week') {
      document.querySelector("#year-container").innerHTML = ''
      uniqueYears.forEach((item, i) => {
        if (item.slice(0,3) == input.slice(0,3)) {
          drawCalendar(item,'year')
        }
      })
      document.querySelector("#month-container").innerHTML = ''
      uniqueMonths.forEach((item, i) => {
        if (item.slice(0,4) == input.slice(0,4)) {
          drawCalendar(item,'month')
        }
      })
      document.querySelector("#week-container").innerHTML = ''
      uniqueWeeks.forEach((item, i) => {
        if (item.slice(0,7) == input.slice(0,7).replaceAll('-','/')) {
          drawCalendar(item,'week')
        }
      })
      for (let i = 0; i < document.querySelectorAll('#button-container button').length; i++) {
        document.querySelectorAll('#button-container button')[i].style.opacity = '1'
      }
      document.querySelector("#children-container").innerHTML = ''
      document.querySelector('#decade-'+input.slice(0,3)).style.opacity = '0.5'
      document.querySelector('#year-'+input.slice(0,4)).style.opacity = '0.5'
      document.querySelector('#month-'+input.slice(0,7)).style.opacity = '0.5'
      document.querySelector('#week-'+input).style.opacity = '0.5'

      nextPrev(uniqueWeeks)
    }

    function nextPrev(requestArray) {
      document.getElementById('next').onclick = async function() {
        input = requestArray[(requestArray.findIndex(element => element.includes(input.replaceAll('-','/'))))+1]
        testfml(input.replaceAll('/','-'),request,'navigate')
      }
      document.getElementById('previous').onclick = function() {
        input = requestArray[(requestArray.findIndex(element => element.includes(input.replaceAll('-','/'))))-1]
        testfml(input.replaceAll('/','-'),request,'navigate')
      }
    }
    
    for (let i = 0; i < data.length; i++) {
      if (data[i].week.includes(input.replaceAll('-','/'))) {
        yearButton(data[i].week,request,i)
        return
      }
    }
  }

  function yearButton(week,request,counter) {

    if (request == 'decade') {
      findYear(week.substring(0, 3))
    } else if (request == 'year') {
      findYear(week.substring(0, 4))
    } else if (request == 'month') {
      findYear(week.substring(0, 7))
    } else if (request == 'week') {
      findWeek(counter)
    }
    testHistory([week,request])
  }



  const searchFml = document.createElement("div")
  searchFml.classList.add('search-container')
  document.querySelector("#nav-container").appendChild(searchFml)

  const yyyy = document.createElement("input")
  yyyy.setAttribute("type", 'text')
  yyyy.setAttribute("id", 'yearSearch')
  yyyy.setAttribute("placeholder", 'YYYY')
  yyyy.setAttribute("maxlength", '4')
  document.querySelector(".search-container").appendChild(yyyy)

  const mm = document.createElement("input")
  mm.setAttribute("type", 'text')
  mm.setAttribute("id", 'monthSearch')
  mm.setAttribute("placeholder", 'MM')
  mm.setAttribute("maxlength", '2')
  document.querySelector(".search-container").appendChild(mm)

  const dd = document.createElement("input")
  dd.setAttribute("type", 'text')
  dd.setAttribute("id", 'daySearch')
  dd.setAttribute("placeholder", 'DD')
  dd.setAttribute("maxlength", '2')
  document.querySelector(".search-container").appendChild(dd)

  const searchWeekButton = document.createElement("button")
  searchWeekButton.setAttribute("id", 'search-button')
  searchWeekButton.onclick = function(){search()}
  searchWeekButton.innerHTML = "search"
  document.querySelector(".search-container").appendChild(searchWeekButton)

  const nextprev = document.createElement("div")
  nextprev.classList.add('nextprev')
  document.querySelector("#nav-container").appendChild(nextprev)

  // const browseWeek = document.createElement("button")
  // browseWeek.setAttribute("id", 'week')
  // browseWeek.innerHTML = "Week"
  // document.querySelector(".nextprev").appendChild(browseWeek)

  // const browseMonth = document.createElement("button")
  // browseMonth.setAttribute("id", 'month')
  // browseMonth.innerHTML = "Month"
  // document.querySelector(".nextprev").appendChild(browseMonth)

  // const browseYear = document.createElement("button")
  // browseYear.setAttribute("id", 'year')
  // browseYear.innerHTML = "Year"
  // document.querySelector(".nextprev").appendChild(browseYear)

  // const browseDecade = document.createElement("button")
  // browseDecade.setAttribute("id", 'decade')
  // browseDecade.innerHTML = "Decade"
  // document.querySelector(".nextprev").appendChild(browseDecade)

  const prev = document.createElement("button")
  prev.setAttribute("id", 'previous')
  prev.innerHTML = "<"
  document.querySelector(".nextprev").appendChild(prev)

  const next = document.createElement("button")
  next.setAttribute("id", 'next')
  next.innerHTML = ">"
  document.querySelector(".nextprev").appendChild(next)

  const weekTitle = document.createElement("div")
  weekTitle.setAttribute("id", 'weektitle')
  document.querySelector(".chart-title").appendChild(weekTitle)

  const chartIntel = document.createElement("div")
  chartIntel.classList.add('chart-intel')
  document.querySelector(".chart-title").appendChild(chartIntel)

  const video1 = document.createElement("div")
  video1.setAttribute("id", 'video1')
  video1.classList.add('video')
  document.querySelector("#videos").appendChild(video1)

  const video2 = document.createElement("div")
  video2.setAttribute("id", 'video2')
  video2.classList.add('video')
  document.querySelector("#videos").appendChild(video2)

  const video3 = document.createElement("div")
  video3.setAttribute("id", 'video3')
  video3.classList.add('video')
  document.querySelector("#videos").appendChild(video3)

  const dataList = document.createElement("div")
  dataList.setAttribute("id", 'datalist')
  document.querySelector("#chart-wrapper").appendChild(dataList)

  const top10 = document.createElement("div")
  top10.setAttribute("id", 'top10')
  top10.classList.add('top10')
  document.querySelector("#datalist").appendChild(top10)

  const nonweeklychart = document.createElement("div")
  nonweeklychart.classList.add('nonweeklychart')
  document.querySelector("#datalist").appendChild(nonweeklychart)

  const topsongs = document.createElement("div")
  topsongs.setAttribute("id", 'songs')
  topsongs.classList.add('songs')
  document.querySelector(".nonweeklychart").appendChild(topsongs)

  const topartists = document.createElement("div")
  topartists.setAttribute("id", 'artists')
  topartists.classList.add('artists')
  document.querySelector(".nonweeklychart").appendChild(topartists)




  function findYear(yearno) {
    
    document.querySelector('#songs').innerHTML = ''
    document.querySelector('#artists').innerHTML = ''
    document.querySelector('#top10').innerHTML = ''

    document.querySelector('#weektitle').innerHTML = yearno
  
    for (let i = 0; i < genrePool.length; i++) {
      document.querySelector('#id' + genrePool[i].slice(-6)).style.width = '0'
      document.querySelector('#id' + genrePool[i].slice(-6)).innerHTML = '<div class="bar" style="display:inline-block;background: ' + genrePool[i] + ';"></div>'
      // document.querySelector('#id' + genrePool[i].slice(-6)).innerHTML = '<div style="display:inline-block;width:16px;height:16px;background: ' + genrePool[i] + ';"></div>' + decode(genrePool[i].slice(-7)) + ": 0" + "</div><div class='bar' style='background:" + genrePool[i].slice(-7) + "'></div>"
      document.querySelector('#id' + genrePool[i].slice(-6)).style.order = '500'
      // document.querySelector('#id' + genrePool[i].slice(-6)).style.opacity = '0'
    }
    var songList = []
    var artistList = []
    var genreList = []
    for (let i = 1; i <= 10; i++) {
      searchYearly(i)
    }
    function searchYearly(pos) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].week.includes(yearno)) {
          var year = data[i].week.slice(0,4)
          var genre = data[i]?.['no'+pos+'genre']
          var id = data[i]?.['no'+pos+'id']
          var name = data[i]?.['no'+pos+'name']
          var artist = data[i]?.['no'+pos+'artist']
          var object = [genre,id,name,artist]
          var score = 11 - pos + (1 / pos)
          score = multiplier(year,score)
          songList.push({object,score})
          var separators = [' ft. ', ' / ', ', ']
          var tokens = artist.split(new RegExp(separators.join('|'), 'g'))
          var fuck = []
          tokens.forEach((object, i) => {
            score = multiplier(year,(score + 10) * (1/(tokens.length)) + (5 / (i+1)))
            fuck.push({object,score})
          })
          artistList.push(fuck)
          object = genre
          genreList.push({object,score})
        }

        function multiplier(year,score) {
          if ((year >= 1980) && (year <= 1984)) {
            score = score * 1.6
          } else if ((year >= 1985) && (year <= 1991)) {
            score = score * 2
          } else if ((year >= 1992) && (year <= 2011)) {
            score = score * 1
          } else if ((year >= 2012) && (year <= 2013)) {
            score = score * 0.9
          } else if ((year >= 2014) && (year <= 2016)) {
            score = score * 0.85
          } else if ((year >= 2017) && (year <= 2018)) {
            score = score * 0.8
          } else if ((year >= 2019) && (year <= 2020)) {
            score = score * 0.75
          } else if ((year >= 2021) && (year <= 2023)) {
            score = score * 0.65
          }
          return Math.round(score)
        }
      }
    }
  
    var combinedArtist = artistList.flat(1)
  
    
    
    group(songList).forEach((item, i) => {
      if (i == '0') {
        pic(item.key[3], item.key[2], 'video2')
      }
      const li = document.createElement("li")
      li.innerHTML = item.score + ' <div style="display:inline-block;width:16px;height:16px;background: ' + item.key[0] + ';"></div><a class="songname" songid="'+ item.key[1] + '">' + item.key[2] + "</a>&nbsp-&nbsp<div class='artistname'><a>"+item.key[3].replace(re, function(matched){return mapObj[matched]})+"</a></div>"
      document.querySelector("#songs").appendChild(li)
    })
    group(combinedArtist).forEach((item, i) => {
      const li = document.createElement("li")
      li.innerHTML = item.score + "&nbsp/&nbsp<div class='artistname'><a>" + item.key + "</a></div>"
      document.querySelector("#artists").appendChild(li)
    })
    group(genreList).forEach((item, i) => {
        document.querySelector('#id' + item.key.slice(-6)).style.order = i + 1
        document.querySelector('#id' + item.key.slice(-6)).style.width = [item.score] + '%'
        // document.querySelector('#id' + item.key.slice(-6)).innerHTML = '<div style="display:inline-block;width:16px;height:16px;background: ' + item.key + ';"></div><div>' + decodeGenre(item.key) + ": " + item.score + "</div><div class='bar' style='background:" + item.key + "'></div>"
        document.querySelector('#id' + item.key.slice(-6)).style.opacity = '1'
    })
    document.querySelectorAll('#artists li a').forEach((item, i) => {
      item.setAttribute('onClick', 'map("' + item.innerHTML + '");')
    })
    document.querySelector('.chart-intel').innerHTML = decode(group(songList)[0].key[1])[0][3] + " is the #1 song of " + yearno

    document.querySelectorAll('.nonweeklychart a.songname').forEach((item, i) => {
      item.setAttribute('onClick', 'history(`'+item.getAttribute("songid")+'`);searchSong(`'+item.getAttribute("songid")+'`)')
      //item.setAttribute('onClick', 'map("' + item.innerHTML + '");')
    })
    document.querySelectorAll('.nonweeklychart .artistname a').forEach((item, i) => {
      item.setAttribute('onClick', 'history(`'+item.innerHTML+'`);searchArtist(`'+item.innerHTML+'`)')
      //item.setAttribute('onClick', 'map("' + item.innerHTML + '");')
    })
  }
  function group(type) {
    var reducedArray = Object.values(type.reduce((hash, item) => {
      if (!hash[item.object]) {
          hash[item.object] = { key: item.object, score: 0 };
      }
      hash[item.object].score += item.score;
      
      return hash;
    }, {}))
    var results = reducedArray.sort((a,b) => b.score - a.score )
    return results
  }
  
  function findWeek(weekno) {
  
    document.querySelector('#artists').innerHTML = ''
    document.querySelector('#songs').innerHTML = ''
    document.querySelector('#genres').style.display = "none"
  
    var currentWeek = data[weekno];
    var lastWeek = data[weekno - 1];
    var nextWeek = data[weekno + 1];
  
    var no1Count = 0
    for (let i = 0; i <= weekno; i++) {
      if (data[i].no1id.includes(currentWeek.no1id)) {
        no1Count++
      }
    }
  
    if (currentWeek.no1id.includes(lastWeek.no1id)) {
      document.querySelector('.chart-intel').innerHTML = data[weekno].no1name + " remains at #1 for " + no1Count + " weeks"
    } else if (!currentWeek.no1id.includes(lastWeek.no1id) && no1Count > 1) {
      document.querySelector('.chart-intel').innerHTML = data[weekno].no1name + " returns to #1 for " + no1Count + " weeks"
    } else if (no1Count = 1) {
      document.querySelector('.chart-intel').innerHTML = data[weekno].no1name + " hits #1"
    }
  
    var newList = [];
    var newIdList = [];
    var repeatIdList = [];
    var exitList = [];
    var exitIdList = [];
    var enterList = [];
    var enterIdList = [];
  
    for (let y = 1; y <= 10; y++) {
      for (let z = 1; z <= 10; z++) {
        if(lastWeek?.['no'+y+'name'] !== currentWeek?.['no'+z+'name']){
          const exits = lastWeek?.['no'+y+'direction']+'<div style="width:16px;height:16px;background: '+lastWeek?.['no'+y+'genre']+';"></div>'+'<a class="songname" id="'+lastWeek?.['no'+y+'id']+'">'+lastWeek?.['no'+y+'name']+"</a>&nbsp-&nbsp<div class='artistname'><a>"+lastWeek?.['no'+y+'artist'].replace(re, function(matched){return mapObj[matched]})+"</a></div>"
          const exitsId = lastWeek?.['no'+y+'id']
          exitList.push(exits);
          exitIdList.push(exitsId);
        }
        if(nextWeek?.['no'+y+'name'] !== currentWeek?.['no'+z+'name']){
          const enters = nextWeek?.['no'+y+'direction']+'<div style="width:16px;height:16px;background: '+nextWeek?.['no'+y+'genre']+';"></div>'+'<a class="songname" id="'+nextWeek?.['no'+y+'id']+'">'+nextWeek?.['no'+y+'name']+"</a>&nbsp-&nbsp<div class='artistname'><a>"+nextWeek?.['no'+y+'artist'].replace(re, function(matched){return mapObj[matched]})+"</a></div>"
          const entersId = nextWeek?.['no'+y+'id']
          enterList.push(enters);
          enterIdList.push(entersId);
        }
        if(currentWeek?.['no'+y+'name'] !== lastWeek?.['no'+z+'name']){
          //const news = currentWeek?.['no'+y+'direction']+'<div style="width:16px;height:16px;background: '+currentWeek?.['no'+y+'genre']+';"></div>'+'<a onClick="modal(`visible`,`'+currentWeek?.['no'+y+'artist']+'`,`'+currentWeek?.['no'+y+'name']+'`,`modal`)">'+currentWeek?.['no'+y+'name']+'</a>&nbsp'+"-"+"&nbsp<a>"+currentWeek?.['no'+y+'artist'].replace(re, function(matched){return mapObj[matched]})+"</a>"
          const news = currentWeek?.['no'+y+'direction']+'<div style="width:16px;height:16px;background: '+currentWeek?.['no'+y+'genre']+';"></div>'+'<a class="songname" id="'+currentWeek?.['no'+y+'id']+'">'+currentWeek?.['no'+y+'name']+"</a>&nbsp-&nbsp<div class='artistname'><a>"+currentWeek?.['no'+y+'artist'].replace(re, function(matched){return mapObj[matched]})+"</a></div>"
          const newsId = currentWeek?.['no'+y+'id']
          newList.push(news);
          newIdList.push(newsId);
        }
      }
    }
  
    const valWhichRepeat = (arr,count) =>
             [...new Set(arr)].filter(x =>
                  arr.filter(a => a === x).length == count
             )
  
    var exitSongList = valWhichRepeat(exitList,10); //from last week
    var exitSongIdList = valWhichRepeat(exitIdList,10); //from last week
    var enterSongList = valWhichRepeat(enterList,10); //before next week
    var enterSongIdList = valWhichRepeat(enterIdList,10); //before next week
    var newSongList = valWhichRepeat(newList,10); //for this week
    var newSongIdList = valWhichRepeat(newIdList,10); //for this week
    var repeatSongList = valWhichRepeat(newList,9); //from any week
    var repeatSongIdList = valWhichRepeat(newIdList,9); //from any week
  
    exitSongList.forEach((element, i) => { //from last week
      var exits = document.querySelector("#" + exitSongIdList[i] + "")
      if(exits){
        exits.className = "";
        exits.classList.add('out')
        addToAttribute(exits, "pos", "out")
      } else {
        const div = document.createElement("div");
        div.setAttribute("id", exitSongIdList[i]);
        div.setAttribute("pos", "out")
        div.innerHTML = exitSongList[i];
        div.className = "";
        div.classList.add('out')
        document.querySelector('#top10').appendChild(div);
      }
    })
    enterSongList.forEach((element, i) => { //before next week
      var exists = document.querySelector("#" + enterSongIdList[i] + "");
      if(exists) {
        exists.className = "";
        if (enterSongList[i].includes('★')) {
          exists.classList.add('no'+enterSongList[i].slice(0, 2), 'debut')
        } else {
          exists.classList.add('out')
        }
        addToAttribute(exists, "pos", enterSongList[i].slice(0, 3))
      } else {
        const div = document.createElement("div");
        div.setAttribute("id", enterSongIdList[i]);
        div.setAttribute("pos", enterSongList[i].slice(0, 3))
        div.innerHTML = enterSongList[i];
        div.className = "";
        if (enterSongList[i].includes('★')) {
          div.classList.add('no'+enterSongList[i].slice(0, 2), 'debut')
        } else {
          div.classList.add('out')
        }
        document.querySelector('#top10').appendChild(div);
      }
    })
    newSongList.forEach((element, i) => { //this week
      console.log(decode(newSongIdList[i])[0][4] + " - " + decode(newSongIdList[i])[0][3] + " enters top 10")
      var exists = document.querySelector("#" + newSongIdList[i] + "");
      if(exists) {
        addToAttribute(exists, "pos", newSongList[i].slice(0, 3))
        exists.innerHTML = newSongList[i];
        exists.className = "";
        exists.classList.add('no'+newSongList[i].slice(0, 2))
        exists.style.backgroundColor = 'gray'
      }else {
        const div = document.createElement("div");
        div.setAttribute("id", newSongIdList[i]);
        div.setAttribute("pos", newSongList[i].slice(0, 3))
        div.innerHTML = newSongList[i];
        div.className = "";
        div.classList.add('no'+newSongList[i].slice(0, 2))
        div.style.backgroundColor = 'gray'
        document.querySelector('#top10').appendChild(div);
      }
    })
    repeatSongList.forEach((element, i) => { //this week
      var repeats = document.querySelector("#" + repeatSongIdList[i] + "");
      if(repeats !== null){
        addToAttribute(repeats, "pos", repeatSongList[i].slice(0, 3))
        repeats.innerHTML = repeatSongList[i];
        repeats.className = "";
        repeats.classList.add('no'+repeatSongList[i].slice(0, 2));
        repeats.style.backgroundColor = ''
      }else {
        const div = document.createElement("div");
        div.setAttribute("id", repeatSongIdList[i]);
        div.setAttribute("pos", repeatSongList[i].slice(0, 3))
        div.innerHTML = repeatSongList[i];
        div.className = "";
        div.classList.add('no'+repeatSongList[i].slice(0, 2))
        div.style.backgroundColor = ''
        document.querySelector('#top10').appendChild(div);
      }
    })
  
    document.querySelector('#weektitle').innerHTML = data[weekno].week;
    function addToAttribute(element, attributeName, value) {
      element.setAttribute(attributeName, value + (element.getAttribute(attributeName) || ''));
    }
  
    document.querySelectorAll('#top10 a.songname').forEach((item, i) => {
      //item.setAttribute('href', '#')
      item.setAttribute('onClick', 'history(`'+item.getAttribute("id")+'`);searchSong(`'+item.getAttribute("id")+'`)')
      //item.setAttribute('onClick', 'map("' + item.innerHTML + '");')
    })
    document.querySelectorAll('#top10 .artistname a').forEach((item, i) => {
      //item.setAttribute('href', '#')
      item.setAttribute('onClick', 'history(`'+item.innerHTML+'`);searchArtist(`'+item.innerHTML+'`)')
      //item.setAttribute('onClick', 'map("' + item.innerHTML + '");')
    })
  
    pic(lastWeek.no1artist, lastWeek.no1name, 'video1')
    pic(currentWeek.no1artist, currentWeek.no1name, 'video2')
    pic(nextWeek.no1artist, nextWeek.no1name, 'video3')
  }

  function decode(input) {
    const output = []
    for (let x = 1; x <= 10; x++) {
      for (var a = 0; a < data.length; a++) {
        if (data[a]?.['no'+x+'id'] == input) {
          output.push(new Array(data[a]?.week,data[a]?.['no'+x+'direction'].slice(0, 2),data[a]?.['no'+x+'genre'],data[a]?.['no'+x+'name'],data[a]?.['no'+x+'artist']))
          return output
        }
      }
    }
  }

  function searchEnter(e) {
    if (e.keyCode == 13) {
      search();
      return false;
    }
  }
  function search() {
    var date = document.getElementById("yearSearch").value + "/" + document.getElementById("monthSearch").value + "/" + document.getElementById("daySearch").value
    document.querySelector('#songs').innerHTML = ""
    searchWeek(date)
  }
  function searchWeek(searchRequest) {
    var yearRequest = searchRequest.substring(4, 0);
    var weekRequest = getNumberOfWeek(searchRequest);
  
    function getNumberOfWeek(date) {
      const today = new Date(date);
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
      if (yearRequest == '2018') {
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
      } else {
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7) - 1;
      }
    }
    
    var sdfsdfsdf = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].week.includes(yearRequest)) {
        sdfsdfsdf.push(i)
      }
    }
    document.querySelector('#top10').innerHTML = ''
    testfml(data[sdfsdfsdf[weekRequest]].week.replaceAll('/','-'),'week','initialize')
    findWeek(sdfsdfsdf[weekRequest])
    
    // console.log(yearRequest,weekRequest)
  }

  
}





//old







function modal(visibility) {
  document.querySelector("#videomodal").style.backgroundImage = ''
  document.querySelector("#covermodal").style.backgroundImage = ''
  document.querySelector("#modalsongs").innerHTML = ''
  document.querySelector('#modalstats').innerHTML = ''
  document.querySelector("#modal").style.visibility = visibility
}
var modalHistory = []
document.querySelector('#close').onclick = function(){
  for (let i = 0; i < document.querySelectorAll("#searchResults li").length; i++) {
    document.querySelectorAll("#searchResults li")[i].style.backgroundColor = ''
  }
  modal('hidden')
  modalHistory = []
}
function history(term) {
  modalHistory.push(term)
  
  const historyItem = document.createElement("li")
  historyItem.innerHTML = modalHistory[modalHistory.length - 1]
  if (term.slice(0, 2) == 'ix') {
    historyItem.addEventListener('click', function() { history(term);searchSong(term);updateHistory(historyItem) })
    // historyItem.setAttribute('onClick', 'searchSong(`'+term+'`)')
  } else {
    historyItem.addEventListener('click', function() { history(term);searchArtist(term);updateHistory(historyItem) })
    // historyItem.setAttribute('onClick', 'searchArtist(`'+term+'`)')
  }
  document.querySelector("#history").appendChild(historyItem)
}
// document.querySelector('#back').onclick = function(){
//   modalHistory.pop()
//   var recent = modalHistory.length - 1
  
//   if (!modalHistory[recent]) {
//     for (let i = 0; i < document.querySelectorAll("#searchResults li").length; i++) {
//       document.querySelectorAll("#searchResults li")[i].style.backgroundColor = ''
//     }
//     modal('hidden')
//     modalHistory.pop()
//     const parent = document.querySelector("#history");
//     [...parent.children].slice(-1).forEach(parent.removeChild.bind(parent));
//   } else if (modalHistory[recent].slice(0, 2) == 'ix') {
//     history(modalHistory[recent])
//     searchSong(modalHistory[recent])
//     modalHistory.pop()
//     const parent = document.querySelector("#history");
//     [...parent.children].slice(-2).forEach(parent.removeChild.bind(parent));
//   } else {
//     history(modalHistory[recent])
//     searchArtist(modalHistory[recent])
//     modalHistory.pop()
//     const parent = document.querySelector("#history");
//     [...parent.children].slice(-2).forEach(parent.removeChild.bind(parent));
//   }
// }

function updateHistory(el) {
  el.style.opacity = '0.5'

  const i = Array.from(el.parentNode.children).indexOf(el)
  var itemAheadLength = 0 - [document.querySelector("#history").children.length - i - 1]

  const parent = document.querySelector("#history");
  [...parent.children].slice(itemAheadLength).forEach(parent.removeChild.bind(parent));
}

async function searchSong(id) {
  modal(`visible`)
  // history(id)
  const api_url = 'https://opensheet.elk.sh/1oxsWP57qoaxOZFUpPmwQ-Dkagv0o87qurp92_-VKITQ/allYears';
  const response = await fetch(api_url);
  const data = await response.json();
  var artist = decode(id)[0][4]
  var name = decode(id)[0][3]
  document.querySelector("#modalname").innerHTML = name+" by <a>"+artist.replace(re, function(matched){return mapObj[matched]})+"</a>"

  list('id').then(function (val) {
    val.forEach((item, i) => {
      if (item.artist == id) {
        document.querySelector('#modalstats').innerHTML = "#"+[i+1]+" all time • #"+decode(id)[0][1]+" peak • "+item.count+" weeks"
        return
      }
    })
  })
  function decode(input) {
    const output = []
    for (let x = 1; x <= 10; x++) {
      for (var a = 0; a < data.length; a++) {
        if (data[a]?.['no'+x+'id'] == input) {
          output.push(new Array(data[a]?.week,data[a]?.['no'+x+'direction'].slice(0, 2),data[a]?.['no'+x+'genre'],data[a]?.['no'+x+'name'],data[a]?.['no'+x+'artist']))
          return output
        }
      }
    }
  }
  document.querySelectorAll('#modalname a').forEach((item, i) => {
    //item.setAttribute('href', '#')
    if (document.querySelector("#termSearch").value.length === 0) {
      item.setAttribute('onClick', 'history(`'+item.innerHTML+'`);searchArtist(`'+item.innerHTML+'`)')
    } else {
      item.setAttribute('onClick', 'searchArtist(`'+item.innerHTML+'`)')
    }
  });
  pic(artist,name,'videomodal')
}

async function searchArtist(artist) {
  modal('visible')
  // history(artist)
  const api_url = 'https://opensheet.elk.sh/1oxsWP57qoaxOZFUpPmwQ-Dkagv0o87qurp92_-VKITQ/allYears';
  const response = await fetch(api_url);
  const data = await response.json();
  document.querySelector("#modalname").innerHTML = artist

  var fullList = []
  for (let x = 1; x <= 10; x++) {
    data.forEach((item, i) => {
      if (item?.['no'+x+'artist'].includes(artist)) {
        var artistCell = item?.['no'+x+'artist'].replace(re, function(matched){return mapObj1[matched]}).split("separator")
        if (artistCell.includes(artist)) {
          fullList.push(item?.['no'+x+'id'])
        }
      }
    })
  }
  combinedUnique = [...new Set(fullList)];
  var totalList = group(fullList)[0]
  var no1Count = 0
  list('artist').then(function (val) {
    val.forEach((item, i) => {
      if (item.artist == artist) {
        document.querySelector('#modalstats').innerHTML = "#"+[i+1]+" all time • "+no1Count+" #1s • "+[combinedUnique.length]+" top 10s"
        return
      }
    })
  })
  combinedUnique.forEach((item, i) => {
    if (decode(item)[0][1] == '01') {
      no1Count++
    }
    const div = document.createElement("div");
    div.innerHTML = decode(item)[0][1]+'<div style="width:16px;height:16px;background: '+decode(item)[0][2]+';"></div>'+'<a class="songname" id="'+item+'">'+decode(item)[0][3]+'</a>&nbsp'+"-"+"&nbsp<div class='artistname'><a>"+decode(item)[0][4].replace(re, function(matched){return mapObj[matched]})+"</a></div>"
    document.querySelector("#modalsongs").appendChild(div);
  })
  document.querySelectorAll('#modalsongs a.songname').forEach((item, i) => {
    //item.setAttribute('href', '#')
    if (document.querySelector("#termSearch").value.length === 0) {
      item.setAttribute('onClick', 'history(`'+item.getAttribute("id")+'`);searchSong(`'+item.getAttribute("id")+'`)')
    } else {
      item.setAttribute('onClick', 'searchSong(`'+item.getAttribute("id")+'`)')
    }
  })
  document.querySelectorAll('#modalsongs .artistname a').forEach((item, i) => {
    //item.setAttribute('href', '#')
    if (document.querySelector("#termSearch").value.length === 0) {
      item.setAttribute('onClick', 'history(`'+item.innerHTML+'`);searchArtist(`'+item.innerHTML+'`)')
    } else {
      item.setAttribute('onClick', 'searchArtist(`'+item.innerHTML+'`)')
    }
  })
  function decode(input) {
    const output = []
    for (let x = 1; x <= 10; x++) {
      for (var a = 0; a < data.length; a++) {
        if (data[a]?.['no'+x+'id'] == input) {
          output.push(new Array(data[a]?.week,data[a]?.['no'+x+'direction'].slice(0, 2),data[a]?.['no'+x+'genre'],data[a]?.['no'+x+'name'],data[a]?.['no'+x+'artist']))
          return output
        }
      }
    }
  }
  var filteredDecode = combinedUnique.filter(function(item){
    var leadArtist = decode(item)[0][4].replace(re, function(matched){return mapObj1[matched]}).split("separator")
    if (leadArtist[0] == artist) {
      return item !== undefined;
    }
  })
  var dfsgfeg = filteredDecode.concat(combinedUnique)[0]
  // decode(dfsgfeg).then(results => {
  //   pic(results[0][4], results[0][3], 'modal')
  // })
  pic(decode(dfsgfeg)[0][4], decode(dfsgfeg)[0][3], 'videomodal')
  //pic(decode(totalList.artist)[0][4], decode(totalList.artist)[0][3], 'modal')
}
function group(type) {
  let reducedArray = type.reduce( (acc, curr, _, arr) => {
      if (acc.length == 0) acc.push({artist: curr, count: 1})
      else if (acc.findIndex(f => f.artist === curr ) === -1) acc.push({artist: curr, count: 1})
      else ++acc[acc.findIndex(f => f.artist === curr)].count
      return acc
  }, [])
  var results = reducedArray.sort((a,b) => b.count - a.count )
  return results
}

//CHANGE SEARCH TO CALCULATE RESULTS AT ONCE AND THEN APPEND RATHER THAN APPEND ONE BY ONE

async function termSearch() {
  
  const api_url = 'https://opensheet.elk.sh/1oxsWP57qoaxOZFUpPmwQ-Dkagv0o87qurp92_-VKITQ/allYears';
  const response = await fetch(api_url);
  const data = await response.json();

  const searchResults = document.querySelector("#searchResults")
  const termSearch = document.querySelector("#termSearch")
  const searchClose = document.querySelector("#searchClose")

  searchResults.innerHTML = ''

  function decode(input) {
    const output = []
    for (let x = 1; x <= 10; x++) {
      for (var a = 0; a < data.length; a++) {
        if (data[a]?.['no'+x+'id'] == input) {
          output.push(new Array(data[a]?.week,data[a]?.['no'+x+'direction'].slice(0, 2),data[a]?.['no'+x+'genre'],data[a]?.['no'+x+'name'],data[a]?.['no'+x+'artist']))
          return output
        }
      }
    }
  }
  var searchValue = termSearch.value.toLowerCase();
  if (termSearch !== null && termSearch.value === ""){
    searchClose.innerHTML = ''
    searchResults.innerHTML = ''
    return
  }

  //for artists
  list('artist').then(function (val) {
    searchResults.innerHTML = ''
    val.forEach((item, i) => {
      if (item.artist.toLowerCase().includes(searchValue)) {
        const line = document.createElement("li");
        line.innerHTML = item.artist
        line.addEventListener('click', function() {
          searchArtist(item.artist) 
          for (let i = 0; i < document.querySelectorAll("#searchResults li").length; i++) {
            document.querySelectorAll("#searchResults li")[i].style.backgroundColor = ''
          }
          line.style.backgroundColor = 'grey'
        })
        searchResults.appendChild(line)
      }
    })
  }) //for songs
  list('name','id').then(function (val) {
    val.forEach((item, i) => {
      if (item.artist.slice(0,-10).toLowerCase().includes(searchValue)) {
        const line = document.createElement("li");
        console.log(item.artist.slice(-10), decode(item.artist.slice(-10)))
        line.innerHTML = decode(item.artist.slice(-10))[0][3]
        line.addEventListener('click', function() {
          searchSong(item.artist.slice(-10)) 
          for (let i = 0; i < document.querySelectorAll("#searchResults li").length; i++) {
            document.querySelectorAll("#searchResults li")[i].style.backgroundColor = ''
          }
          line.style.backgroundColor = 'grey'
        })
        searchResults.appendChild(line)
      }
    })
  }) //for songs by artist
  list('artist','id').then(function (val) {
    val.forEach((item, i) => {
      if (item.artist.slice(0,-10).toLowerCase().includes(searchValue)) {
        const line = document.createElement("li");
        line.innerHTML = decode(item.artist.slice(-10))[0][3]
        line.addEventListener('click', function() {
          searchSong(item.artist.slice(-10)) 
          for (let i = 0; i < document.querySelectorAll("#searchResults li").length; i++) {
            document.querySelectorAll("#searchResults li")[i].style.backgroundColor = ''
          }
          line.style.backgroundColor = 'grey'
        })
        searchResults.appendChild(line)
      }
    })
  })

  searchClose.innerHTML = ''

  const closeSearch = document.createElement("button")
  closeSearch.setAttribute("id", 'closeSearch')
  closeSearch.innerHTML = "X"
  searchClose.appendChild(closeSearch)

  document.querySelector('#closeSearch').onclick = function(){
    searchResults.innerHTML = ''
    searchClose.innerHTML = ''
    termSearch.value = ''
  }
}

async function list(component,comp2) {
  const api_url = 'https://opensheet.elk.sh/1oxsWP57qoaxOZFUpPmwQ-Dkagv0o87qurp92_-VKITQ/allYears';
  const response = await fetch(api_url)
  const data = await response.json()

  var list = []
  for (let i = 1; i <= 10; i++) {
    searchYearly(i)
  }
  function searchYearly(pos) {
    data.forEach((item, i) => {
      var separators = [' ft. ', ' / ', ', '];
      if (comp2) {
        var tokens = item?.['no'+pos+component].split(new RegExp(separators.join('|'), 'g')) + ' ' + item?.['no'+pos+comp2];
      } else {
        var tokens = item?.['no'+pos+component].split(new RegExp(separators.join('|'), 'g'));
      }
      list.push(tokens)
    });
  }
  var combinedList = list.flat(1)
  return group(combinedList)
}

//CHANGE TO RETURN A SINGULAR IMAGE

function pic(termArtist, termSong, id) {
  var allArtists = termArtist.replace(' ft. ',' ').toLowerCase()
  var artists = termArtist;

  const artistsList = artists.replace(re, function(matched){return mapObj1[matched]}).split("separator");

  termArtist = artistsList[0].toLowerCase()
  termSong = termSong.toLowerCase()
  var term = termArtist + ' - ' + termSong
  const url0 = `https://itunes.apple.com/search?term=${term}`;
  const url1 = `https://itunes.apple.com/search?term=${allArtists + ' - ' + termSong}&media=musicVideo`;
  const url2 = `https://itunes.apple.com/search?term=${term}&media=musicVideo`;

  var coverList = []
  var videoList = []
  fetch(url0)
      .then((Response) => Response.json())
      .then((data) => {
        findPic()
        function findPic() {
          for (var i = 0; i < data.results.length; i++) {
            if (termArtist.includes(data.results[i].artistName.toLowerCase()) && data.results[i].trackName.toLowerCase().includes(termSong))  {
              coverList.push(data.results[i]);
              return
            }
          }
          for (var i = 0; i < data.results.length; i++) {
            if (termArtist.indexOf(data.results[i].artistName.toLowerCase()) || data.results[i].trackName.toLowerCase().indexOf(termSong))  {
              coverList.push(data.results[i]);
              return
            }
          }
        }
        //let str = coverList[0].artworkUrl100.replace('100x100', '200x200')
        //document.querySelector('#'+id).style.backgroundImage = 'url(' + str + ')'
  })
  fetch(url1)
      .then((Response) => Response.json())
      .then((data) => {
        findPic()
        function findPic() {
          for (var i = 0; i < data.results.length; i++) {
            if (termSong.includes(data.results[i].trackName.toLowerCase()))  {
              videoList.push(data.results[i]);
              return
            }
          }
          for (var i = 0; i < data.results.length; i++) {
            videoList.push(data.results[i])
            return
          }
        }
        let con = videoList.concat(coverList)
        if (con.length == 0) {
          console.log("no")
          setTimeout(() => {
            let str = coverList[0].artworkUrl100.replace('100x100', '800x800')
            document.querySelector('#'+id).style.backgroundImage = 'url(' + str + ')'
            // color(str)
          }, 2000);
        } else {
          let str = con[0].artworkUrl100.replace('100x100', '800x800')
          document.querySelector('#'+id).style.backgroundImage = 'url(' + str + ')'
          // color(str)
        }
  })
  // var video2 = fetch(url2)
  //     .then((Response) => Response.json())
  //     .then((data) => {
  //       var authList = []
  //       findPic()
  //       function findPic() {
  //         for (var i = 0; i < data.results.length; i++) {
  //           if (termSong.includes(data.results[i].trackName.toLowerCase()))  {
  //             authList.push(data.results[i]);
  //             return
  //           }
  //         }
  //       }
  //       return authList
  // })
  // Promise.all([video1, songCover]).then(function(valArray) {
  //   const videoList = valArray[0].concat(valArray[1],valArray[2])
  //   let str = videoList[0].artworkUrl100.replace('100x100', '800x800')
  //   document.querySelector('#'+id).style.backgroundImage = 'url(' + str + ')'
  // });
  //
  // songCover.then(function (val) {
  //   let str = val[0].artworkUrl100.replace('100x100', '300x300')
  //   document.querySelector('#cover'+id).style.backgroundImage = 'url(' + str + ')'
  //   //console.log(str + ', done loading')
  // });
  function color(pic) {
    var img = document.createElement('img');
    img.setAttribute('src', pic)
    img.crossOrigin = "Anonymous";

    // img.addEventListener('load', function() {
    //     var vibrant = new Vibrant(img);
    //     new Vibrant(
    //         img,
    //         64, /* amount of colors in initial palette from which the swatches will be generated, defaults to 64 */
    //         5 /* quality. 0 is highest, but takes way more processing. defaults to 5. */
    //     )
    //     var swatches = vibrant.swatches()
    //     for (var swatch in swatches)
    //     //if (swatches['DarkVibrant']) {
    //     //  document.querySelector('html').style.background = swatches['DarkVibrant'].getHex()
    //     //  //WRITE FUNCTION TO REMOVE HUE OR SATURATION WHEN TOO EXTREME
    //     //} else {
    //     //  document.querySelector('html').style.background = swatches['DarkMuted'].getHex()
    //     //}
    //     document.querySelectorAll('#palette div')[0].style.background = swatches['Vibrant'].getHex()
    //     document.querySelectorAll('#palette div')[1].style.background = swatches['Muted'].getHex()
    //     document.querySelectorAll('#palette div')[2].style.background = swatches['DarkVibrant'].getHex()
    //     document.querySelectorAll('#palette div')[3].style.background = swatches['DarkMuted'].getHex()
    //     document.querySelectorAll('#palette div')[4].style.background = swatches['LightVibrant'].getHex()
    // });
  }
}


//map('');
// const artistSearch = [];
// async function map(artist) {
//   const api_url = 'https://opensheet.elk.sh/1oxsWP57qoaxOZFUpPmwQ-Dkagv0o87qurp92_-VKITQ/allYears';
//   const response = await fetch(api_url);
//   const data = await response.json();
//   const dfgdfg = formList(artist, '');
//   dfgdfg.forEach((item, i) => {
//     const button = document.createElement("button");
//     button.innerHTML = item;
//     button.setAttribute("onClick", 'formList(``,"'+item+'")');
//     document.querySelector("#map-labels").appendChild(button);
//   });
//
//   for (let i = 1; i <= 10; i++) {
//     const li = document.createElement("div");
//     li.setAttribute("id", 'id' + i);
//     li.classList.add('gdfskgf')
//     li.style.gridTemplateColumns = "repeat(" + data.length + ", 1fr)";
//     document.querySelector("#map").appendChild(li);
//     createLine(i);
//   }
//   function createLine(pos) {
//
//     for (let z = 0; z < data.length; z++) {
//       const tile = document.createElement("div");
//       tile.style.backgroundColor = data[z]?.['no'+pos+'genre'];
//       var separators = [' ft. ', ' / ', ', '];
//       const tokens = data[z]?.['no'+pos+'artist'].split(new RegExp(separators.join('|'), 'g'));
//
//       if (tokens.some(r=> dfgdfg.includes(r))) {
//         tile.style.opacity = '1';
//       } else {
//         //tile.style.opacity = '0';
//       }
//       document.querySelector('#id' + pos).appendChild(tile);
//     }
//   }
// }
//
// function formList(artistAdd, artistRemove) {
//   artistAdd = artistAdd.replace("&amp;", "&");
//   document.querySelector("#map").innerHTML = '';
//   artistSearch.push(artistAdd);
//
//   if (artistRemove !== '') {
//     console.log(artistRemove)
//     // const index = artistSearch.indexOf(artistRemove);
//     // if (index > -1) {
//     //   artistSearch.splice(index, 1);
//     // }
//     var i = 0;
//     while (i < artistSearch.length) {
//       if (artistSearch[i] === artistRemove) {
//           artistSearch.splice(i, 1);
//       } else {
//           ++i;
//       }
//     }
//   }
//   document.querySelector("#map-labels").innerHTML = '';
//   console.log(artistSearch)
//   return artistSearch;
// }

function decodeGenre(input) {

  if (input == '#de7eea') {
    output = ['Pop','Pop, Power pop']
  } else if (input == '#a16fd9') {
    output = ['Dance-pop','Dance-pop, Synth-pop, Europop, Electropop']
  } else if (input == '#9a82c8') {
    output = ['Indie','Indie-pop, Indie-rock, Indie-folk, Indie-electronic, Indie-soul, Indie-dance, Indie-tronica, Indie-pop, Indie-rock, Indie-folk, Indie-electronic, Indie-soul, Indie-dance, Indie-tronica']
  } else if (input == '#c295c8') {
    output = ['Pop rock','Pop rock, Soft rock, Pop punk']
  } else if (input == '#d700ff') {
    output = ['Disco','Disco, Nu-Disco, Euro disco, Italo disco, Space disco, Disco polo, Disco house, Disco rap, Disco polo, Disco house, Disco rap']
  } else if (input == '#854d76') {
    output = ['Funk','Funk, Funk-pop, Boogie, Electro-funk, G-funk, P-Funk, Funktronica, Funk carioca, Funk carioca, Funk ostentação, Funk melody, Funk ousadi']
  } else if (input == '#ba2c8e') {
    output = ['Pop rap','Pop rap, Melodic rap, Pop trap']
  } else if (input == '#ba3d3d') {
    output = ['R&B','']
  } else if (input == '#b65f5f') {
    output = ['New jack','New jack, Doo-wop, Swing']
  } else if (input == '#603232') {
    output = ['Hip Hop','']
  } else if (input == '#1a1a1a') {
    output = ['Trap','Trap, Dirty, Southern hip hop, Crunk, Snap, Drill, Trap metal, Trap soul, Trapstep, Cloud rap, Trap rock, Trap jazz, Trap funk, Trap pop, Trapcore']
  } else if (input == '#413630') {
    output = ['Regional','Regional, Gangsta rap, G-funk, West Coast hip hop, East Coast hip hop']
  } else if (input == '#935b4a') {
    output = ['Alt hip hop','Alternative hip hop, Experimental hip hop, Jazz rap, Conscious hip hop, Political hip hop, Horrorcore']
  } else if (input == '#3ca33f') {
    output = ['Rock','']
  } else if (input == '#308532') {
    output = ['Hard rock','Hard rock, Metal, Heavy metal, Glam metal, Hair metal, Thrash metal, Death metal, Black metal, Doom metal, Grindcore, Metalcore, Industrial metal, Alternative metal, Nu metal']
  } else if (input == '#638559') {
    output = ['Grunge','Grunge, Post-grunge, Alternative metal, Nu metal']
  } else if (input == '#6a9d32') {
    output = ['Funk rock','Funk rock, Blues rock, Psychedelic rock, Jam rock']
  } else if (input == '#8eb371') {
    output = ['Punk','Punk rock, New wave, Post-punk, Ska punk, Pop punk, Emo, Hardcore punk, Skate punk']
  } else if (input == '#4aca4e') {
    output = ['Rock and Roll','Rock and roll, Rockabilly, Surf rock, Rock and roll revival']
  } else if (input == '#97be9d') {
    output = 'Alternative Rock'
  } else if (input == '#a4d685') {
    output = ['Folk Rock','Folk rock, Folktronica, Folk pop, Folk punk, Folk metal, Folk jazz']
  } else if (input == '#c4c800') {
    output = ['Soul','Soul, Neo soul, Blue-eyed soul, Psychedelic soul, Soul jazz, Soul blues, Southern soul, Northern soul, Soul pop, Soultronica']
  } else if (input == '#a7ab00') {
    output = ['Blues','']
  } else if (input == '#d5eb20') {
    output = ['Jazz','Jazz, Jazz fusion, Acid jazz, Jazz rap, Nu jazz, Jazz funk, Jazz blues, Jazz pop, Jazz rock, Jazztronica, Nu jazz']
  } else if (input == '#ddf3a8') {
    output = ['Soca','Soca, Calypso, Chutney, Chutney soca, Chutney parang, Chutney rapso, Chutney dance']
  } else if (input == '#c6ccae') {
    output = ['Gospel','Gospel, Worship, Christian rock, Christian hip hop, Christian metal, Christian hardcore, Christian punk, Christian alternative rock']
  } else if (input == '#ceb8ae') {
    output = ['World','World, New Age, World fusion, Worldbeat']
  } else if (input == '#7085ef') {
    output = ['Electronic','Electronic, EDM, Club, Electro, Electro house, Electroclash, Electro swing, Electro hop, Electro funk, Electro pop, Electronicore, Electronic dance']
  } else if (input == '#5666b8') {
    output = ['Dubstep','Dubstep, Brostep, Chillstep, Drumstep, Riddim, Dubstyl']
  } else if (input == '#4d95b8') {
    output = ['Electro Rock','Electro rock, Electro funk, Electro rock, Electronic rock, Electronicore']
  } else if (input == '#623aff') {
    output = ['Reggae','Reggae, Dancehall']
  } else if (input == '#73e6e0') {
    output = 'Eurodance, Trance, etc'
  } else if (input == '#3eadef') {
    output = 'House'
  } else if (input == '#ff6900') {
    output = 'Country'
  } else if (input == '#f6b26b') {
    output = 'Country Pop'
  } else if (input == '#b3997a') {
    output = 'Country Rock'
  } else if (input == '#d49875') {
    output = 'Country Rap'
  } else if (input == '#c7cc86') {
    output = 'Folk, Bluegrass, etc'
  } else if (input == '#ffe381') {
    output = 'Latin'
  } else if (input == '#f5d8d8') {
    output = 'Tango, Polka, etc'
  }
  return output;
}
