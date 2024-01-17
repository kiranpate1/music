
var browseHistory = []
var mapObj = {' ft. ':"</a>&nbspft.&nbsp<a>",' / ':"</a>&nbsp/&nbsp<a>",', ':"</a>,&nbsp<a>"};
var mapObj1 = {' ft. ':"separator",' / ':"separator",', ':"separator"};
var mapSeparators = [' ft. ',' / ',', '];
var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
var genrePool = ['#ec66c6','#b479ff','#5d62da','#b17bb6','#da09c5','#933f67','#fe5c5c','#cf0a45','#a73138','#871a1a','#4b150d','#422727','#865b3c','#0ba135','#04612f','#3f6539','#537e0b','#319c5c','#21d811','#79c999','#8dea6c','#baa912','#8f845a','#e8f92d','#ddf3a8','#be8f7a','#bcbdb9','#00a3ff','#162be9','#008ea1','#7d2ffd','#1ce8e8','#5666f8','#e56000','#fe965c','#8f5a0a','#a31f0d','#c7cc86','#f8d763','#ffd4d1']

homeInitialize()
function homeInitialize() {
  browse()
  document.querySelector("#main-content").innerHTML = ''

  const yeah = document.createElement("div")
  yeah.innerHTML = "Hello and welcome!"
  document.querySelector("#main-content").appendChild(yeah);
}



async function browse() {
  const api_url = 'https://opensheet.elk.sh/1oxsWP57qoaxOZFUpPmwQ-Dkagv0o87qurp92_-VKITQ/allYears';
  const response = await fetch(api_url);
  const data = await response.json();

  const songs_url = 'https://opensheet.elk.sh/1oxsWP57qoaxOZFUpPmwQ-Dkagv0o87qurp92_-VKITQ/allSongs';
  const songsResponse = await fetch(songs_url)
  const songsData = await songsResponse.json()

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

  function testHistory(term,request) {
    const history = document.querySelector("#history")
    browseHistory.push(term)
    var date = browseHistory[browseHistory.length - 1][0].replaceAll('/','-')
    var timeRequest = browseHistory[browseHistory.length - 1][1]
  
    const historyItem = document.createElement("li")
    // historyItem.setAttribute("date", date)
    // historyItem.setAttribute("timeRequest", timeRequest)
    if (request == 'time') {
      if (timeRequest == 'decade') {
        historyItem.innerHTML = date.slice(0,3) + "0s"
        historyItem.addEventListener("click", function() { testfml(date.slice(0,3) + "0",timeRequest,'navigate');updateHistory(historyItem) })
      } else if (timeRequest == 'year') {
        historyItem.innerHTML = date.slice(0,4)
        historyItem.addEventListener("click", function() { testfml(date.slice(0,4),timeRequest,'navigate');updateHistory(historyItem) })
      } else if (timeRequest == 'month') {
        historyItem.innerHTML = date.slice(0,7)
        historyItem.addEventListener("click", function() { testfml(date.slice(0,7),timeRequest,'navigate');updateHistory(historyItem) })
      } else if (timeRequest == 'week') {
        historyItem.innerHTML = date
        historyItem.addEventListener("click", function() { document.querySelector('#top10').innerHTML = '';testfml(date,timeRequest,'navigate');updateHistory(historyItem) })
      }
    } else if (request == 'genre') {
      historyItem.innerHTML = decodeGenre(term)[0]
      historyItem.addEventListener("click", function() { genre(term);updateHistory(historyItem) })
    }
    history.appendChild(historyItem)
  
  }

  
  document.querySelector("#browse").onclick = function(){
    browseInitialize()
  }
  function browseInitialize() {
    const mainContent = document.querySelector("#main-content")
    mainContent.innerHTML = ''

    const browseContainer = document.createElement("div")
    browseContainer.setAttribute("id", 'browse-container')
    mainContent.appendChild(browseContainer)
    
    const thisWeek = document.createElement("div")
    thisWeek.setAttribute("id", 'this-week')
    browseContainer.appendChild(thisWeek)
    pic(data[data.length - 1].no1id, 'this-week')

    const thisWeekText = document.createElement("h1")
    thisWeekText.innerHTML = "This Week - " + data[data.length - 1].week + " - " + data[data.length - 1].no1name + " by " + data[data.length - 1].no1artist + " is #1"
    thisWeek.appendChild(thisWeekText)

    const initialDecadesTitle = document.createElement("h2")
    initialDecadesTitle.innerHTML = "Decades"
    browseContainer.appendChild(initialDecadesTitle)

    const initialDecades = document.createElement("div")
    initialDecades.setAttribute("id", 'initial-decades-container')
    browseContainer.appendChild(initialDecades)

    const initialGenresTitle = document.createElement("h2")
    initialGenresTitle.innerHTML = "Genres"
    browseContainer.appendChild(initialGenresTitle)

    const initialGenres = document.createElement("div")
    initialGenres.setAttribute("id", 'initial-genres-container')
    browseContainer.appendChild(initialGenres)

    const genresCount = []
    for (let i = 1; i <= 10; i++) {
      searchGenres(i)
    }
    function searchGenres(pos) {
      var score = pos
      for (let i = 0; i < data.length; i++) {
        var object = data[i]?.['no'+pos+'genre']
        genresCount.push({object,score})
      }
    }

    group(genresCount).forEach((item, i) => {
      const button = document.createElement("button")
      // button.setAttribute("id", 'genre' + item.slice(-6))
      button.innerHTML = decodeGenre(item.key)[0]
      button.onclick = function(){
        genre(item.key)
        testHistory(item.key,'genre')
      }
      initialGenres.appendChild(button)
    })

    const initialFlashbackTitle = document.createElement("h2")
    initialFlashbackTitle.innerHTML = "Flashback"
    browseContainer.appendChild(initialFlashbackTitle)

    const initialFlashback = document.createElement("div")
    initialFlashback.setAttribute("id", 'initial-flashback-container')
    browseContainer.appendChild(initialFlashback)

    const flashbackCount = []
    for (let i = 0; i < (uniqueYears.length / 5); i++) {
      var increment = uniqueYears[uniqueYears.length - 1] - (i * 5)
      if (i == 0) {
        increment = uniqueYears[uniqueYears.length - 1] - 1
      }
      flashbackCount.push(increment)
    }
    flashbackCount.forEach((item, i) => {
      const button = document.createElement("button")
      button.innerHTML = item
      button.onclick = function(){
        chartContainer.style.display = "block"
        var monthDay = data[data.length - 1].week.slice(4)
        var dateSearch = item + '/' + monthDay
        searchWeek(dateSearch)
        testHistory(item,'time')
      }
      initialFlashback.appendChild(button)
    })

    const goatTitle = document.createElement("h2")
    goatTitle.innerHTML = "Greatest Of All Time"
    browseContainer.appendChild(goatTitle)

    const initialGoat = document.createElement("div")
    initialGoat.setAttribute("id", 'initial-goat-container')
    browseContainer.appendChild(initialGoat)

    const goatSongs = document.createElement("button")
    goatSongs.innerHTML = "Songs"
    goatSongs.onclick = function(){
      genre('')
      testHistory('','goat')
    }
    initialGoat.appendChild(goatSongs)
      
    const chartContainer = document.createElement("div")
    chartContainer.setAttribute("id", 'chart-container')
    chartContainer.style.display = "none"
    mainContent.appendChild(chartContainer)

    const chartNav = document.createElement("div")
    chartNav.setAttribute("id", 'chart-nav')
    chartContainer.appendChild(chartNav)

    const navBack = document.createElement("div")
    navBack.addEventListener("click", function() { browseInitialize()})
    navBack.innerHTML = "<"
    chartNav.appendChild(navBack)

    const buttonContainer = document.createElement("div")
    buttonContainer.setAttribute("id", 'button-container')
    chartNav.appendChild(buttonContainer)

    const decadeContainer = document.createElement("div")
    decadeContainer.classList.add('button-container')
    decadeContainer.setAttribute("id", 'decade-container')
    decadeContainer.style.gridTemplateColumns = 'repeat('+uniqueDecades.length+', 1fr)'
    buttonContainer.appendChild(decadeContainer)

    const yearContainer = document.createElement("div")
    yearContainer.classList.add('button-container')
    yearContainer.setAttribute("id", 'year-container')
    yearContainer.style.gridTemplateColumns = 'repeat(10, 1fr)'
    buttonContainer.appendChild(yearContainer)

    const monthContainer = document.createElement("div")
    monthContainer.classList.add('button-container')
    monthContainer.setAttribute("id", 'month-container')
    monthContainer.style.gridTemplateColumns = 'repeat(12, 1fr)'
    buttonContainer.appendChild(monthContainer)
    
    const weekContainer = document.createElement("div")
    weekContainer.classList.add('button-container')
    weekContainer.setAttribute("id", 'week-container')
    weekContainer.style.gridTemplateColumns = 'repeat(53, 1fr)'
    buttonContainer.appendChild(weekContainer)

    const videoPic = document.createElement("div")
    videoPic.classList.add('videos')
    chartContainer.appendChild(videoPic)

    const chartTitle = document.createElement("div")
    chartTitle.classList.add('chart-title')
    chartContainer.appendChild(chartTitle)

    const descriptionGenres = document.createElement("div")
    descriptionGenres.setAttribute("id", 'description-genres')
    chartContainer.appendChild(descriptionGenres)

    const chartDescription = document.createElement("p")
    chartDescription.classList.add('chart-description')
    descriptionGenres.appendChild(chartDescription)

    const topgenres = document.createElement("div")
    topgenres.setAttribute("id", 'genres')
    topgenres.classList.add('genres')
    descriptionGenres.appendChild(topgenres)

    genrePool.forEach((item, i) => {
      const li = document.createElement("li")
      li.setAttribute("id", 'id' + item.slice(-6))
      li.style.order = i + 1
      // li.innerHTML = '<div style="display:inline-block;background: ' + item + ';"></div>'
      // li.innerHTML = '<div style="display:inline-block;width:16px;height:16px;background: ' + item + ';"></div>'
      topgenres.appendChild(li)
    })

    const childrenContainer = document.createElement("div")
    childrenContainer.setAttribute("id", 'children-container')
    chartContainer.appendChild(childrenContainer)

    uniqueDecades.forEach((item, i) => {
      drawCalendar(item,'decade')
      
      const token = document.createElement("button")
      item = item.slice(0,3)
      token.innerHTML = item + "0s"
     
      token.setAttribute("id", 'children-'+item.replaceAll('/','-'))
      token.onclick = function(){
        chartContainer.style.display = "block"
        initialDecades.innerHTML = ''

        var requestIndex = item
        testfml(requestIndex.replaceAll('/','-'),'decade','initialize')
        
        uniqueYears.forEach((item, i) => {
          if (item.slice(0,3) == token.innerHTML.slice(0,3)) {
            drawCalendar(item,'year')
          }
        })
      }

      initialDecades.appendChild(token)
    })

    const genreContainer = document.createElement("div")
    genreContainer.setAttribute("id", 'genre-container')
    genreContainer.style.display = "none"
    mainContent.appendChild(genreContainer)

    const genreNav = document.createElement("div")
    genreNav.setAttribute("id", 'genre-nav')
    genreContainer.appendChild(genreNav)

    const navBack1 = document.createElement("div")
    navBack1.addEventListener("click", function() { browseInitialize()})
    navBack1.innerHTML = "<"
    genreNav.appendChild(navBack1)

    const genreNavSelection = document.createElement("div")
    genreNavSelection.setAttribute("id", 'genre-nav-selection')
    genreContainer.appendChild(genreNavSelection)

    const genreInfo = document.createElement("div")
    genreInfo.setAttribute("id", 'genre-info')
    genreContainer.appendChild(genreInfo)

    const genreMap = document.createElement("div")
    genreMap.setAttribute("id", 'genre-map')
    genreMap.classList.add('map')
    genreContainer.appendChild(genreMap)

    const genreDataList = document.createElement("div")
    genreDataList.setAttribute("id", 'genre-datalist')
    genreContainer.appendChild(genreDataList)

    const genreSongs = document.createElement("div")
    genreSongs.setAttribute("id", 'genre-songs')
    genreSongs.classList.add('songs')
    genreDataList.appendChild(genreSongs)

    const genreArtists = document.createElement("div")
    genreArtists.setAttribute("id", 'genre-artists')
    genreArtists.classList.add('artists')
    genreDataList.appendChild(genreArtists)

    // const top10 = document.createElement("div")
    // top10.setAttribute("id", 'top10')
    // top10.classList.add('top10')
    // document.querySelector("#chartDataList").appendChild(top10)

    // const nonweeklychart = document.createElement("div")
    // nonweeklychart.classList.add('nonweeklychart')
    // document.querySelector("#chartDataList").appendChild(nonweeklychart)

    genrePool.forEach((item, i) => {
      const button = document.createElement("button")
      button.innerHTML = decodeGenre(item)[0]
      button.onclick = function(){
        genre(item)
        testHistory(item,'genre')
      }
      genreNavSelection.appendChild(button)
    })

    if (browseHistory.length !== 0) {
      // chartInitialize()
      // findWeek(browseHistory[browseHistory.length - 1])
    }

    const searchContainer = document.createElement("div")
    searchContainer.classList.add('search-container')
    searchContainer.onkeyup = function(e) {
      var target = e.srcElement;
      var maxLength = parseInt(target.attributes["maxlength"].value, 10);
      var myLength = target.value.length;
      if (myLength >= maxLength) {
        var next = target;
        while (next = next.nextElementSibling) {
          if (next == null)
              break;
          if (next.tagName.toLowerCase() == "input") {
              next.focus();
              break;
          }
        }
      }
      else if (myLength === 0) {
        var previous = target;
        while (previous = previous.previousElementSibling) {
          if (previous == null)
              break;
          if (previous.tagName.toLowerCase() === "input") {
              previous.focus();
              break;
          }
        }
      }
    }
    chartNav.appendChild(searchContainer)

    
  
    const yyyy = document.createElement("input")
    yyyy.setAttribute("type", 'text')
    yyyy.setAttribute("id", 'yearSearch')
    yyyy.setAttribute("placeholder", 'YYYY')
    yyyy.setAttribute("maxlength", '4')
    searchContainer.appendChild(yyyy)
  
    const mm = document.createElement("input")
    mm.setAttribute("type", 'text')
    mm.setAttribute("id", 'monthSearch')
    mm.setAttribute("placeholder", 'MM')
    mm.setAttribute("maxlength", '2')
    searchContainer.appendChild(mm)
  
    const dd = document.createElement("input")
    dd.setAttribute("type", 'text')
    dd.setAttribute("id", 'daySearch')
    dd.setAttribute("placeholder", 'DD')
    dd.setAttribute("maxlength", '2')
    searchContainer.appendChild(dd)
  
    const searchWeekButton = document.createElement("button")
    searchWeekButton.setAttribute("id", 'search-button')
    searchWeekButton.onclick = function(){search()}
    searchWeekButton.innerHTML = "search"
    searchContainer.appendChild(searchWeekButton)
  
    const nextprev = document.createElement("div")
    nextprev.classList.add('nextprev')
    chartNav.appendChild(nextprev)
  
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
    nextprev.appendChild(prev)
  
    const next = document.createElement("button")
    next.setAttribute("id", 'next')
    next.innerHTML = ">"
    nextprev.appendChild(next)
  
    const weekTitle = document.createElement("div")
    weekTitle.setAttribute("id", 'weektitle')
    chartTitle.appendChild(weekTitle)
  
    const chartIntel = document.createElement("div")
    chartIntel.classList.add('chart-intel')
    chartTitle.appendChild(chartIntel)
  
    const video1 = document.createElement("div")
    video1.setAttribute("id", 'video1')
    video1.classList.add('video')
    videoPic.appendChild(video1)
  
    const video2 = document.createElement("div")
    video2.setAttribute("id", 'video2')
    video2.classList.add('video')
    videoPic.appendChild(video2)
  
    const video3 = document.createElement("div")
    video3.setAttribute("id", 'video3')
    video3.classList.add('video')
    videoPic.appendChild(video3)
  
    const chartDataList = document.createElement("div")
    chartDataList.setAttribute("id", 'chart-datalist')
    chartContainer.appendChild(chartDataList)
  
    const top10 = document.createElement("div")
    top10.setAttribute("id", 'top10')
    top10.classList.add('top10')
    chartDataList.appendChild(top10)
  
    const nonweeklychart = document.createElement("div")
    nonweeklychart.classList.add('nonweeklychart')
    chartDataList.appendChild(nonweeklychart)
  
    const topsongs = document.createElement("div")
    topsongs.setAttribute("id", 'songs')
    topsongs.classList.add('songs')
    nonweeklychart.appendChild(topsongs)
  
    const topartists = document.createElement("div")
    topartists.setAttribute("id", 'artists')
    topartists.classList.add('artists')
    nonweeklychart.appendChild(topartists)
  }



  function drawCalendar(input,request) {
    
    const childrenContainer = document.querySelector("#children-container")
    const token = document.createElement("button")
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
    
    var songList = []
    for (let i = 1; i <= 10; i++) {
      searchYearly(i)
    }
    function searchYearly(pos) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].week.includes(input)) {
          var name = data[i]?.['no'+pos+'name']
          var id = data[i]?.['no'+pos+'id']
          var artist = data[i]?.['no'+pos+'artist']
          var genre = data[i]?.['no'+pos+'genre']
          var object = [id,genre,name,artist]
          var score = 11 - pos
          songList.push({object,score})
        }
      }
    }
    group(songList).forEach((item, i) => {
      if (i == '0') {
        console.log(input.replaceAll('/','-'))
        pic(item.key[0], 'children-'+input.replaceAll('/','-'))
      }
    })
  }



  function testfml(input, request, action) {
    var buttons = document.querySelectorAll('#button-container button')
    var childrenContainer = document.querySelector("#children-container")
    var yearContainer = document.querySelector("#year-container")
    var monthContainer = document.querySelector("#month-container")
    var weekContainer = document.querySelector("#week-container")

    if (request == 'decade') {
      input = input.slice(0,3)
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.opacity = '1'
      }
      childrenContainer.innerHTML = ''
      document.querySelector('#decade-'+input).style.opacity = '0.5'
      yearContainer.innerHTML = ''
      if (action == 'navigate') {
        uniqueYears.forEach((item, i) => {
          if (item.slice(0,3) == input) {
            drawCalendar(item,'year')
          }
        })
      }
      monthContainer.innerHTML = ''
      weekContainer.innerHTML = ''

      nextPrev(uniqueDecades)
    } else if (request == 'year') {
      yearContainer.innerHTML = ''
      uniqueYears.forEach((item, i) => {
        if (item.slice(0,3) == input.slice(0,3)) {
          drawCalendar(item,'year')
        }
      })
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.opacity = '1'
      }
      childrenContainer.innerHTML = ''
      document.querySelector('#decade-'+input.slice(0,3)).style.opacity = '0.5'
      document.querySelector('#year-'+input.slice(0,4)).style.opacity = '0.5'
      monthContainer.innerHTML = ''
      if (action == 'navigate') {
        uniqueMonths.forEach((item, i) => {
          if (item.slice(0,4) == input.slice(0,4)) {
            drawCalendar(item,'month')
          }
        })
      }
      weekContainer.innerHTML = ''

      nextPrev(uniqueYears)
    } else if (request == 'month') {
      yearContainer.innerHTML = ''
      uniqueYears.forEach((item, i) => {
        if (item.slice(0,3) == input.slice(0,3)) {
          drawCalendar(item,'year')
        }
      })
      monthContainer.innerHTML = ''
      uniqueMonths.forEach((item, i) => {
        if (item.slice(0,4) == input.slice(0,4)) {
          drawCalendar(item,'month')
        }
      })
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.opacity = '1'
      }
      childrenContainer.innerHTML = ''
      document.querySelector('#decade-'+input.slice(0,3)).style.opacity = '0.5'
      document.querySelector('#year-'+input.slice(0,4)).style.opacity = '0.5'
      document.querySelector('#month-'+input.slice(0,7)).style.opacity = '0.5'
      weekContainer.innerHTML = ''
      if (action == 'navigate') {
        uniqueWeeks.forEach((item, i) => {
          if (item.slice(0,7) == input.slice(0,7).replaceAll('-','/')) {
            drawCalendar(item,'week')
          }
        })
      }

      nextPrev(uniqueMonths)
    } else if (request == 'week') {
      yearContainer.innerHTML = ''
      uniqueYears.forEach((item, i) => {
        if (item.slice(0,3) == input.slice(0,3)) {
          drawCalendar(item,'year')
        }
      })
      monthContainer.innerHTML = ''
      uniqueMonths.forEach((item, i) => {
        if (item.slice(0,4) == input.slice(0,4)) {
          drawCalendar(item,'month')
        }
      })
      weekContainer.innerHTML = ''
      uniqueWeeks.forEach((item, i) => {
        if (item.slice(0,7) == input.slice(0,7).replaceAll('-','/')) {
          drawCalendar(item,'week')
        }
      })
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.opacity = '1'
      }
      childrenContainer.innerHTML = ''
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
    testHistory([week,request],'time')
  }







  function findYear(yearno) {
    var topsongs = document.querySelector('#songs')
    var topartists = document.querySelector('#artists')
    var top10 = document.querySelector('#top10')
    document.querySelector('#genres').style.display = "flex"

    topsongs.innerHTML = ''
    topartists.innerHTML = ''
    top10.innerHTML = ''

    if (yearno.length === 3) {
      document.querySelector('#weektitle').innerHTML = yearno + "0s"
    } else {
      document.querySelector('#weektitle').innerHTML = yearno
    }
  
    for (let i = 0; i < genrePool.length; i++) {
      document.querySelector('#id' + genrePool[i].slice(-6)).style.width = '0'
      document.querySelector('#id' + genrePool[i].slice(-6)).innerHTML = '<div class="bar" style="display:inline-block;background: ' + genrePool[i] + ';"></div>'
      // document.querySelector('#id' + genrePool[i].slice(-6)).innerHTML = '<div style="display:inline-block;width:16px;height:16px;background: ' + genrePool[i] + ';"></div>' + decode(genrePool[i].slice(-7)) + ": 0" + "</div><div class='bar' style='background:" + genrePool[i].slice(-7) + "'></div>"
      document.querySelector('#id' + genrePool[i].slice(-6)).style.order = '500'
      // document.querySelector('#id' + genrePool[i].slice(-6)).style.opacity = '0'
    }
    
    group(dataList('week', yearno, 'song')).forEach((item, i) => {
      if (i == '0') {
        pic(item.key[1], 'video2')
      }
      const li = document.createElement("li")
      li.innerHTML = item.score + ' <div style="display:inline-block;width:16px;height:16px;background: ' + item.key[0] + ';"></div><a class="songname" songid="'+ item.key[1] + '">' + item.key[2] + "</a>&nbsp-&nbsp<div class='artistname'><a>"+item.key[3].replace(re, function(matched){return mapObj[matched]})+"</a></div>"
      topsongs.appendChild(li)
    })
    group(dataList('week', yearno, 'artist')).forEach((item, i) => {
      const li = document.createElement("li")
      li.innerHTML = item.score + "&nbsp/&nbsp<div class='artistname'><a>" + item.key + "</a></div>"
      topartists.appendChild(li)
    })
    group(dataList('week', yearno, 'genre')).forEach((item, i) => {
        document.querySelector('#id' + item.key.slice(-6)).style.order = i + 1
        document.querySelector('#id' + item.key.slice(-6)).style.width = [item.score] + '%'
        // document.querySelector('#id' + item.key.slice(-6)).innerHTML = '<div style="display:inline-block;width:16px;height:16px;background: ' + item.key + ';"></div><div>' + decodeGenre(item.key) + ": " + item.score + "</div><div class='bar' style='background:" + item.key + "'></div>"
        document.querySelector('#id' + item.key.slice(-6)).style.opacity = '1'
    })
    document.querySelector('.chart-intel').innerHTML = decode(group(dataList('week', yearno, 'song'))[0].key[1])[0][3] + " is the #1 song of " + yearno

    document.querySelectorAll('.nonweeklychart a.songname').forEach((item, i) => {
      item.onclick = function(){
        history(item.getAttribute("songid"),'song')
        searchSong(item.getAttribute("songid"))
      }
    })
    document.querySelectorAll('.nonweeklychart .artistname a').forEach((item, i) => {
      item.onclick = function(){
        history(item.innerHTML,'artist')
        searchArtist(item.innerHTML)
      }
    })
    description("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",'year','','')
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

  function dataList(operation, key, request) {
    var list = []
    var operator
    for (let i = 1; i <= 10; i++) {
      searchYearly(i)
    }
    function searchYearly(pos) {
      if (operation == 'genre') {
        operator = 'no'+pos+'genre'
      } else {
        operator = operation
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i]?.[operator].includes(key)) {
          var count = 1
          var year = data[i].week.slice(0,4)
          var genre = data[i]?.['no'+pos+'genre']
          var id = data[i]?.['no'+pos+'id']
          var name = data[i]?.['no'+pos+'name']
          var artist = data[i]?.['no'+pos+'artist']
          var object = [genre,id,name,artist]
          var score = 11 - pos + (1 / pos)
          score = multiplier(year,score)
          if (request == 'song') {
            list.push({object,score,count})
          } else if (request == 'artist') {
            var separators = [' ft. ', ' / ', ', ']
            var tokens = artist.split(new RegExp(separators.join('|'), 'g'))
            var fuck = []
            tokens.forEach((object, i) => {
              score = multiplier(year,(score + 10) * (1/(tokens.length)) + (5 / (i+1)))
              fuck.push({object,score,count})
            })
            list.push(fuck)
          } else if (request == 'genre') {
            object = genre
            list.push({object,score,count})
          }
        }
      }
    }
    return list.flat(1)
  }

  

  function group(type) {
    var reducedArray = Object.values(type.reduce((hash, item) => {
      if (!hash[item.object]) {
          hash[item.object] = { key: item.object, score: 0, count: 0 };
      }
      hash[item.object].score += item.score;
      hash[item.object].count += item.count;
      
      return hash;
    }, {}))
    var results = reducedArray.sort((a,b) => b.score - a.score )
    return results
  }

  function title(key,operation,type) {
    if (operation == 'no1') {
      if (type == 'hold') {
        document.querySelector('.chart-intel').innerHTML = key[1][0] + " remains at #1 for " + key[2] + " weeks"
      } else if (type == 'return') {
        document.querySelector('.chart-intel').innerHTML = key[0] + " returns to #1 for " + key[2] + " weeks"
      } else if (type == 'debut') {
        document.querySelector('.chart-intel').innerHTML = key[0] + " debuts at #1"
      } else if (type == 'new') {
        document.querySelector('.chart-intel').innerHTML = key[0] + " hits #1"
      }
    }
  }

  function description(key,request,operation,type) {
    //for decade, year, month
    if (request == 'year') {
      document.querySelector('.chart-description').innerHTML = key
    }
    //for week
    if (request == 'week') {
      const descriptionNo1 = document.createElement("span")
      descriptionNo1.classList.add('description-no1')
      document.querySelector(".chart-description").appendChild(descriptionNo1)
      if (operation == 'no1') {
        if (type == 'hold') {
          document.querySelector('.description-no1').innerHTML = "While " + key[0] + " remains at #1,"
        } else if (type == 'return') {
          document.querySelector('.description-no1').innerHTML = "While " + key[1] + " returns at #1,"
        } else if (type == 'new') {
          document.querySelector('.description-no1').innerHTML = "While " + key[1] + " lands at #1,"
        }
      }
      const descriptionEntries = document.createElement("span")
      descriptionEntries.classList.add('description-entries')
      document.querySelector(".chart-description").appendChild(descriptionEntries)
      if (operation == 'entry') {
        if (type == 'new') {
          document.querySelector('.description-entries').innerHTML += key[0] + " enters the top 10,"
        } else if (type == 'newSole') {
          document.querySelector('.description-entries').innerHTML += key[1] + " score nth top 10 hit with " + key[0] + ","
        } else if (type == 'newBatch') {
          document.querySelector('.description-entries').innerHTML = ''
          document.querySelector('.description-entries').innerHTML += key[1].newSongArtist + " scores top 10 hits with "
          key.forEach((item, i) => {
            document.querySelector('.description-entries').innerHTML += item.newSong + ", "
          })
        } else if (type == 'return') {

        }
      }
    }
  }
  
  function findWeek(weekno) {
    var topsongs = document.querySelector('#songs')
    var topartists = document.querySelector('#artists')
    var top10 = document.querySelector('#top10')

    document.querySelector('.chart-description').innerHTML = ''
    topartists.innerHTML = ''
    topsongs.innerHTML = ''
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
    var no1name = data[weekno].no1name
    var no1artist = data[weekno].no1artist.split(new RegExp(mapSeparators.join('|'), 'g'))
  
    if (currentWeek.no1id.includes(lastWeek.no1id)) {
      title([no1name,no1artist,no1Count],'no1','hold')
      description([no1name,no1artist],'week','no1','hold')
    } else if (!currentWeek.no1id.includes(lastWeek.no1id) && no1Count > 1) {
      title([no1name,no1artist,no1Count],'no1','return')
      description([no1name,no1artist],'week','no1','return')
    } else if (no1Count = 1) {
      if (data[weekno].no1direction.includes('★')) {
        title([no1name,no1artist,no1Count],'no1','debut')
      } else {
        title([no1name,no1artist,no1Count],'no1','new')
      }
    }

    //detect multiple entries here, depending on amt, overwrite title
  
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
        exits.className = ""
        exits.classList.add('out')
        addToAttribute(exits, "pos", "out")
      } else {
        const div = document.createElement("div")
        div.setAttribute("id", exitSongIdList[i])
        div.setAttribute("pos", "out")
        div.innerHTML = exitSongList[i]
        div.className = ""
        div.classList.add('out')
        top10.appendChild(div)
      }
    })
    enterSongList.forEach((element, i) => { //before next week
      var exists = document.querySelector("#" + enterSongIdList[i] + "")
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
        div.innerHTML = enterSongList[i]
        div.className = "";
        if (enterSongList[i].includes('★')) {
          div.classList.add('no'+enterSongList[i].slice(0, 2), 'debut')
        } else {
          div.classList.add('out')
        }
        top10.appendChild(div)
      }
    })
    var newArtistList = [];
    newSongList.forEach((element, i) => { //this week
      var exists = document.querySelector("#" + newSongIdList[i] + "")
      if(exists) {
        addToAttribute(exists, "pos", newSongList[i].slice(0, 3))
        exists.innerHTML = newSongList[i]
        exists.className = "";
        exists.classList.add('no'+newSongList[i].slice(0, 2))
        exists.style.backgroundColor = 'gray'
      }else {
        const div = document.createElement("div")
        div.setAttribute("id", newSongIdList[i])
        div.setAttribute("pos", newSongList[i].slice(0, 3))
        div.innerHTML = newSongList[i]
        div.className = "";
        div.classList.add('no'+newSongList[i].slice(0, 2))
        div.style.backgroundColor = 'gray'
        top10.appendChild(div)
      }
      var newSongArtist = decode(newSongIdList[i])[0][4].split(new RegExp(mapSeparators.join('|'), 'g'))[0]
      var newSong = decode(newSongIdList[i])[0][3]
      newArtistList.push({newSongArtist,newSong})
      // //for description
      var entries = [decode(newSongIdList[i])[0][4],decode(newSongIdList[i])[0][3]]
      if (decode(newSongIdList[i])[0][4].split(new RegExp(mapSeparators.join('|'), 'g')).length == 0) {
        description(entries,'week','entry','newSole')
      } else {
        description(entries,'week','entry','new')
      }
    })

    lookup = newArtistList.reduce((a, e) => {
      a[e.newSongArtist] = ++a[e.newSongArtist] || 0;
      return a;
    }, {});
    // description(newArtistList.filter(e => lookup[e.newSongArtist]),'week','entry','newBatch')
    
    repeatSongList.forEach((element, i) => { //this week
      var repeats = document.querySelector("#" + repeatSongIdList[i] + "")
      if(repeats !== null){
        addToAttribute(repeats, "pos", repeatSongList[i].slice(0, 3))
        repeats.innerHTML = repeatSongList[i]
        repeats.className = ""
        repeats.classList.add('no'+repeatSongList[i].slice(0, 2))
        repeats.style.backgroundColor = ''
      }else {
        const div = document.createElement("div")
        div.setAttribute("id", repeatSongIdList[i])
        div.setAttribute("pos", repeatSongList[i].slice(0, 3))
        div.innerHTML = repeatSongList[i]
        div.className = ""
        div.classList.add('no'+repeatSongList[i].slice(0, 2))
        div.style.backgroundColor = ''
        top10.appendChild(div)
      }
    })
  
    document.querySelector('#weektitle').innerHTML = data[weekno].week
    function addToAttribute(element, attributeName, value) {
      element.setAttribute(attributeName, value + (element.getAttribute(attributeName) || ''))
    }
  
    top10.querySelectorAll('a.songname').forEach((item, i) => {
      //item.setAttribute('href', '#')
      item.addEventListener('click', function() {
        history(item.getAttribute("id"),'song')
        searchSong(item.getAttribute("id"))
      })
      //item.setAttribute('onClick', 'history(`'+item.getAttribute("id")+'`,`song`);searchSong(`'+item.getAttribute("id")+'`)')
      //item.setAttribute('onClick', 'map("' + item.innerHTML + '");')
    })
    top10.querySelectorAll('.artistname a').forEach((item, i) => {
      //item.setAttribute('href', '#')
      item.addEventListener('click', function() {
        history(item.innerHTML,'artist')
        searchArtist(item.innerHTML)
      })
      //item.setAttribute('onClick', 'history(`'+item.innerHTML+'`,`artist`);searchArtist(`'+item.innerHTML+'`)')
      //item.setAttribute('onClick', 'map("' + item.innerHTML + '");')
    })
  
    pic(lastWeek.no1id, 'video1')
    pic(currentWeek.no1id, 'video2')
    pic(nextWeek.no1id, 'video3')
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
    top10.innerHTML = ''
    testfml(data[sdfsdfsdf[weekRequest]].week.replaceAll('/','-'),'week','initialize')
    findWeek(sdfsdfsdf[weekRequest])
    
    // console.log(yearRequest,weekRequest)
  }

  function genre(key) {
    document.querySelector("#genre-container").style.display = "block"
    document.querySelector("#genre-songs").innerHTML = ""
    document.querySelector("#genre-artists").innerHTML = ""
    document.querySelector("#genre-info").innerHTML = ""
    for (let i = 0; i < document.querySelectorAll('#history li').length; i++) {
      document.querySelectorAll('#history li')[i].style.opacity = '1'
    }
    const description = document.createElement("h1")
    description.innerHTML = decodeGenre(key)[0] + " is a subgenre within "+decodeGenre(key)[1]+" that includes " + decodeGenre(key)[2]
    document.querySelector("#genre-info").appendChild(description)

    group(dataList('genre', key, 'song')).forEach((item, i) => {
      var id = item.key[1]
      const li = document.createElement("li")
      li.innerHTML = item.score + ' <div style="display:inline-block;width:16px;height:16px;background: ' + item.key[0] + ';"></div><a class="songname" songid="'+ id + '">' + item.key[2] + "</a>&nbsp-&nbsp<div class='artistname'><a>"+item.key[3].replace(re, function(matched){return mapObj[matched]})+"</a></div>"
      li.setAttribute('songId', id)
      li.setAttribute('week', firstweek(id))
      li.onmouseover = function() {
        document.querySelectorAll("#genre-map .genre").forEach((item, i) => {
          if (item.id !== id) {
            item.style.opacity = '0.2'
          } else {
            item.style.opacity = '1'
          }
        })
      }
      li.onmouseout = function() {
        document.querySelectorAll("#genre-map .genre").forEach((item, i) => {
          item.style.opacity = '1'
        })
      }
      document.querySelector("#genre-songs").appendChild(li)
    })
    setClick('#genre-songs','song','songId')
    setClick('#genre-songs','artist','')

    group(dataList('genre', key, 'artist')).forEach((item, i) => {
      const li = document.createElement("li")
      li.innerHTML = item.score + "&nbsp/&nbsp<div class='artistname'><a>" + item.key + "</a></div>"
      document.querySelector("#genre-artists").appendChild(li)
    })
    setClick('#genre-artists','artist','')
    map(key,'genre')
  }

  function firstweek(id) {
    for (let pos = 1; pos <= 10; pos++) {
      operator = 'no'+pos+'id'
      for (let i = 0; i < data.length; i++) {
        if (data[i]?.[operator].includes(id)) {
          return data[i].week
        }
      }
    }
  }

  function setClick(container, request, id) {
    if (request == 'song') {
      document.querySelectorAll(container + ' a.songname').forEach((item, i) => {
        //item.setAttribute('href', '#')
        if (document.querySelector("#termSearch").value.length === 0) {
          item.addEventListener('click', function() {
            history(item.getAttribute(id),'song')
            searchSong(item.getAttribute(id))
          })
          // item.setAttribute('onClick', 'history(`'+item.getAttribute(id)+'`,`song`);searchSong(`'+item.getAttribute(id)+'`)')
        } else {
          item.addEventListener('click', function() {
            searchSong(item.getAttribute(id))
          })
          // item.setAttribute('onClick', 'searchSong(`'+item.getAttribute(id)+'`)')
        }
      })
    } else if (request == 'artist') {
      document.querySelectorAll(container + ' .artistname a').forEach((item, i) => {
        //item.setAttribute('href', '#')

        if (document.querySelector("#termSearch").value.length === 0) {
          item.addEventListener('click', function() {
            history(item.innerHTML,'artist')
            searchArtist(item.innerHTML)
          })
          // item.setAttribute('onClick', 'history(`'+item.innerHTML+'`,`artist`);searchArtist(`'+item.innerHTML+'`)')
        } else {
          item.addEventListener('click', function() {
            searchArtist(item.innerHTML)
          })
          // item.setAttribute('onClick', 'searchArtist(`'+item.innerHTML+'`)')
        }
      })
    }
  }

  var modalHistory = []
  document.querySelector('#close').onclick = function(){
    for (let i = 0; i < document.querySelectorAll("#searchResults li").length; i++) {
      document.querySelectorAll("#searchResults li")[i].style.backgroundColor = ''
    }
    document.querySelector("#modal-wrapper").style.display = 'none'
    modalHistory = []
  }
  function history(term, request) {
    modalHistory.push(term)
    var historyItemTerm = modalHistory[modalHistory.length - 1]
    
    const historyItem = document.createElement("li")
    if (request == 'song') {
      historyItem.innerHTML = decode(historyItemTerm)[0][3]
      historyItem.addEventListener('click', function() { history(term,'song');searchSong(term);updateHistory(historyItem) })
    } else if (request == 'artist') {
      historyItem.innerHTML = historyItemTerm
      historyItem.addEventListener('click', function() { history(term,'artist');searchArtist(term);updateHistory(historyItem) })
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
  //     document.querySelector("#modal-wrapper").style.display = 'none'
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

  function mode(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
  }

  function similar(operation, key, request) {
    //find a song with similar genre(same or same header) and similar year
    //find an artist with similar genre(same or same header) and similar years active, along with similar stats
    var list = []
    var operator
    for (let i = 1; i <= 10; i++) {
      searchYearly(i)
    }
    function searchYearly(pos) {
      for (let i = 0; i < data.length; i++) {
        if ((data[i]?.['no'+pos+'genre'].includes(key[0])) && (data[i]?.week.slice(0,4) == key[1])) {
          var count = 1
          var year = data[i].week.slice(0,4)
          var genre = data[i]?.['no'+pos+'genre']
          var id = data[i]?.['no'+pos+'id']
          var name = data[i]?.['no'+pos+'name']
          var artist = data[i]?.['no'+pos+'artist']
          var object = [genre,id,name,artist]
          var score = 11 - pos + (1 / pos)
          score = multiplier(year,score)
          if (request == 'song') {
            list.push({object,score,count})
          } else if (request == 'artist') {
            var separators = [' ft. ', ' / ', ', ']
            var tokens = artist.split(new RegExp(separators.join('|'), 'g'))
            var fuck = []
            tokens.forEach((object, i) => {
              score = multiplier(year,(score + 10) * (1/(tokens.length)) + (5 / (i+1)))
              fuck.push({object,score,count})
            })
            list.push(fuck)
          }
        }
      }
    }
    return list.flat(1)
  }

  async function modal(input, type) {
    var modalTitle = document.querySelector("#modaltitle")
    var modalDescription = document.querySelector("#modaldescription")
    var modalStats = document.querySelector("#modalstats")
    document.querySelector("#videomodal").style.backgroundImage = ''
    document.querySelector("#modalsongs").innerHTML = ''
    document.querySelector('#modalstats').innerHTML = ''
    document.querySelector("#modal-wrapper").style.display = 'flex'

    if (type == 'song') {
      var id = input
    
      var artist = decode(id)[0][4]
      var name = decode(id)[0][3]
      var genre = decodeGenre(decode(id)[0][2])[0]
      var peak = decode(id)[0][1]
      var date = decode(id)[0][0]
      modalTitle.innerHTML = name+" by <div class='artistname'><a>"+artist.replace(re, function(matched){return mapObj[matched]})+"</a></div>"
    
      group(dataList('week', '', 'song')).forEach((item, i) => {
        if (item.key[1] == id) {
          modalDescription.innerHTML = `is a ${genre} song<span class="album"> from <span class="album-name"></span></span><span class="release"> released <span class="release-date"></span></span> that peaked at #${peak} on ${decodeDate(date)} while spending ${item.count} weeks in the top 10.`
          modalStats.innerHTML = "#"+[i+1]+" all time • #"+peak+" peak • "+item.count+" weeks • "+genre
          return
        }
      })
      for (let i = 0; i < songsData.length; i++) {
        if (songsData[i]?.[`id`] == id) {
          document.querySelector('#videomodal').style.backgroundImage = 'url(' + songsData[i]?.[`video`] + ')'
          document.querySelector('#modaldescription .album-name').innerHTML = songsData[i]?.[`album`]
          document.querySelector('#modaldescription .release-date').innerHTML = decodeDate(songsData[i]?.[`release`],'release')
          return
        }
      }

      group(similar(['genre','week'], [decode(id)[0][2],date.slice(0,4)], 'song')).forEach((item, i) => {
        // console.log(item)
      })
      
      setClick('#modaltitle','artist','')
      // pic(id,'videomodal','song')
    } 
    else if (type == 'artist') {
      var artist = input
      modalTitle.innerHTML = artist

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
      combinedUnique = [...new Set(fullList)]
      var totalList = group1(fullList)[0]

      var firstYear = decode(combinedUnique[0])[0][0].slice(0,4)
      var top10Count = combinedUnique.length
      var no1Count = 0
      var genreList = []
      combinedUnique.forEach((item, i) => {
        if (decode(item)[0][1] == '01') {
          no1Count++
        }
        genreList.push(decode(item)[0][2])
        const li = document.createElement("li");
        li.innerHTML = '#'+parseInt(decode(item)[0][1])+'<div style="width:16px;height:16px;background: '+decode(item)[0][2]+';"></div>'+'<a class="songname" id="'+item+'">'+decode(item)[0][3]+'</a>&nbsp'+"-"+"&nbsp<div class='artistname'><a>"+decode(item)[0][4].replace(re, function(matched){return mapObj[matched]})+"</a>"+decode(item)[0][0]+"</div>"
        document.querySelector("#modalsongs").appendChild(li);
      })

      group(dataList('week', '', 'artist')).forEach((item, i) => {
        if (item.key == artist) {
          modalStats.innerHTML = "#"+[i+1]+" all time • "+no1Count+" #1s • "+[top10Count]+" top 10s"
          return
        }
      })

      artistDescription();

      function artistDescription() {
        modalDescription.innerHTML = `is a `+decodeGenre(mode(genreList))[1]+` artist that`  

        if (top10Count > 1) {
          modalDescription.innerHTML += ` first reached the top 10 in `+firstYear
          if (no1Count > 1) {
            modalDescription.innerHTML += ` and has since notched ${no1Count} number 1s and `
          } else if (no1Count == 1) {
            modalDescription.innerHTML += ` and has since collected a number 1 and `
          } else if (no1Count == 0) {
            modalDescription.innerHTML += ` and has since scored `
          }
          modalDescription.innerHTML += [top10Count]+` top 10 hits`
          if (top10Count > 3) {
            modalDescription.innerHTML += ` including `
            combinedUnique.slice(0, 3).forEach((item, i) => {
              modalDescription.innerHTML += decode(item)[0][3] + `, `
            })
            modalDescription.innerHTML += `and more.`
          } else if (top10Count == 3 || top10Count == 2) {
            modalDescription.innerHTML += ` in total—`
            combinedUnique.slice(0, 3).forEach((item, i) => {
              if (i == combinedUnique.slice(0, 3).length - 1) {
                modalDescription.innerHTML += `and `
                modalDescription.innerHTML += decode(item)[0][3] + `.`
              } else {
                modalDescription.innerHTML += decode(item)[0][3] + `, `
              }
            })
          }
        } else if (top10Count == 1) {
          if (no1Count == 1) {
            modalDescription.innerHTML += ` reached number 1 in `+firstYear
          } else if (no1Count == 0) {
            modalDescription.innerHTML += ` reached the top 10 in `+firstYear
          }
          modalDescription.innerHTML += ` with ${decode(combinedUnique[0])[0][3]}.`
        }
      }


      setClick('#modalsongs','song','id')
      setClick('#modalsongs','artist','')
      map(artist,'artist')

      var filteredDecode = combinedUnique.filter(function(item){
        var leadArtist = decode(item)[0][4].replace(re, function(matched){return mapObj1[matched]}).split("separator")
        if (leadArtist[0] == artist) {
          return item !== undefined;
        }
      })
      var dfsgfeg = filteredDecode.concat(combinedUnique)[0]
      // decode(dfsgfeg).then(results => {
      //   pic(dfsgfeg, 'modal')
      // })
      for (let i = 0; i < songsData.length; i++) {
        if (songsData[i]?.[`id`] == dfsgfeg) {
          document.querySelector('#videomodal').style.backgroundImage = 'url(' + songsData[i]?.[`video`] + ')'
          return
        }
      }

      // pic(dfsgfeg, 'videomodal','artist')
      //pic(dfsgfeg, 'modal')
    }
  }
  
  function searchSong(id) {
    modal(id,'song')
  }

  function searchArtist(artist) {
    modal(artist,'artist')
  }

  async function pic(id, location) {
    for (let i = 0; i < songsData.length; i++) {
      if (songsData[i]?.[`id`] == id) {
        var img = songsData[i]?.[`video`]
        document.querySelector('#'+location).style.backgroundImage = `url(${img})`
        color(img)
        return
      }
    }
  }

  function color(pic) {
    var img = document.createElement('img');
    img.setAttribute('src', pic)
    img.crossOrigin = "Anonymous";
    console.log(img)

    img.addEventListener('load', function() {
        var vibrant = new Vibrant(img);
        new Vibrant(
            img,
            64, /* amount of colors in initial palette from which the swatches will be generated, defaults to 64 */
            5 /* quality. 0 is highest, but takes way more processing. defaults to 5. */
        )
        var swatches = vibrant.swatches()
        for (var swatch in swatches)
        //if (swatches['DarkVibrant']) {
        //  document.querySelector('html').style.background = swatches['DarkVibrant'].getHex()
        //  //WRITE FUNCTION TO REMOVE HUE OR SATURATION WHEN TOO EXTREME
        //} else {
        //  document.querySelector('html').style.background = swatches['DarkMuted'].getHex()
        //}
        document.querySelectorAll('#palette div')[0].style.background = swatches['Vibrant'].getHex()
        document.querySelectorAll('#palette div')[1].style.background = swatches['Muted'].getHex()
        document.querySelectorAll('#palette div')[2].style.background = swatches['DarkVibrant'].getHex()
        document.querySelectorAll('#palette div')[3].style.background = swatches['DarkMuted'].getHex()
        document.querySelectorAll('#palette div')[4].style.background = swatches['LightVibrant'].getHex()
    });
  }






  //CHANGE SEARCH TO CALCULATE RESULTS AT ONCE AND THEN APPEND RATHER THAN APPEND ONE BY ONE

  document.querySelector('#termSearch').onkeyup = function(){ 
    const searchResults = document.querySelector("#searchResults")
    var termSearch = document.querySelector("#termSearch")
    const searchClose = document.querySelector("#searchClose")
  
    searchResults.innerHTML = ''
  
    var searchValue = this.value.toLowerCase();
    if (termSearch !== null && termSearch.value === ""){
      searchClose.innerHTML = ''
      searchResults.innerHTML = ''
      return
    }
    const artistList = list('artist')
    const songList = list('name','id')
    const songList2 = list('artist','id')

    var searchLimit = 10
  
    //for artists
    artistList.then(function (val) {
      searchResults.innerHTML = ''
      let count = 0
      for (let i = 0; i < val.length; i++) {
        if (val[i].artist.toLowerCase().includes(searchValue)) {
          if (count < searchLimit) {
            const line = document.createElement("li");
            line.innerHTML = val[i].artist
            line.addEventListener('click', function() {
              searchArtist(val[i].artist) 
              for (let i = 0; i < document.querySelectorAll("#searchResults li").length; i++) {
                document.querySelectorAll("#searchResults li")[i].style.backgroundColor = ''
              }
              line.style.backgroundColor = 'grey'
            })
            searchResults.appendChild(line)
            count++
          }
        }
      }
    }) 
    //for songs
    songList.then(function (val) {
      let count = 0
      for(let i = 0; i < val.length; i++) {
        if (val[i].artist.slice(0,-10).toLowerCase().includes(searchValue)) {
          if (count < searchLimit) {
            const line = document.createElement("li");
            // console.log(item.artist.slice(-10), decode(item.artist.slice(-10)))
            line.innerHTML = decode(val[i].artist.slice(-10))[0][3]
            line.addEventListener('click', function() {
              searchSong(val[i].artist.slice(-10)) 
              for (let i = 0; i < document.querySelectorAll("#searchResults li").length; i++) {
                document.querySelectorAll("#searchResults li")[i].style.backgroundColor = ''
              }
              line.style.backgroundColor = 'grey'
            })
            searchResults.appendChild(line)
            count++
          }
        }
      }
    }) 
    //for songs by artist
    songList2.then(function (val) {
      let count = 0
      for(let i = 0; i < val.length; i++) {
        if (val[i].artist.slice(0,-10).toLowerCase().includes(searchValue)) {
          if (count < searchLimit) {
            const line = document.createElement("li");
            line.innerHTML = decode(val[i].artist.slice(-10))[0][3]
            line.addEventListener('click', function() {
              searchSong(val[i].artist.slice(-10)) 
              for (let i = 0; i < document.querySelectorAll("#searchResults li").length; i++) {
                document.querySelectorAll("#searchResults li")[i].style.backgroundColor = ''
              }
              line.style.backgroundColor = 'grey'
            })
            searchResults.appendChild(line)
            count++
          }
        }
      }
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

  function map(key, request) {
    if (request == 'artist') {
      document.querySelector("#artist-map").innerHTML = ""
      document.querySelector("#artist-map").style.gridTemplateColumns = "repeat(" + data.length + ", 1fr)";
    } else if (request == 'genre') {
      document.querySelector("#genre-map").innerHTML = ""
      document.querySelector("#genre-map").style.gridTemplateColumns = "repeat(" + data.length + ", 1fr)";
    }
  
    for (let z = 0; z < data.length; z++) {
      const li = document.createElement("div")
      li.setAttribute("id", 'week' + z)
      li.classList.add('map-week')
      if (request == 'artist') {
        document.querySelector("#artist-map").appendChild(li)
      } else if (request == 'genre') {
        document.querySelector("#genre-map").appendChild(li)
      }
      createLine(z)
    }
    function createLine(pos) {
      for (let i = 1; i <= 10; i++) {
        const tile = document.createElement("div")
        tile.style.backgroundColor = data[pos]?.['no'+i+'genre']
  
        if (request == 'artist') {
          var separators = [' ft. ', ' / ', ', ']
          const tokens = data[pos]?.['no'+i+'artist'].split(new RegExp(separators.join('|'), 'g'))
    
          if (tokens.some(r=> key.includes(r))) {
            tile.classList.add('genre')
          } else {
            tile.style.opacity = '0'
          }
          document.querySelector('#artist-map #week' + pos).appendChild(tile)
        } else if (request == 'genre') {
          if (data[pos]?.['no'+i+'genre'] == key) {
            tile.classList.add('genre')
            tile.setAttribute('id', data[pos]?.['no'+i+'id'])
          } else {
            tile.style.height = '0'
          }
          document.querySelector('#genre-map #week' + pos).appendChild(tile)
        }
      }
    }
  }

  async function list(component,component2) {
  
    // var list = []
    // for (let i = 1; i < songsData.length; i++) {
    //     var separators = [' ft. ', ' / ', ', '];
    //     if (component2) {
    //       var tokens = songsData[i]?.[component].split(new RegExp(separators.join('|'), 'g')) + ' ' + songsData[i]?.[component2];
    //     } else {
    //       var tokens = songsData[i]?.[component].split(new RegExp(separators.join('|'), 'g'));
    //     }
    //     list.push(tokens)
    // }
    // var combinedList = list.flat(1)
    // return group1(combinedList)
    var list = []
    for (let i = 1; i <= 10; i++) {
      searchYearly(i)
    }
    function searchYearly(pos) {
      data.forEach((item, i) => {
        var separators = [' ft. ', ' / ', ', '];
        if (component2) {
          var tokens = item?.['no'+pos+component].split(new RegExp(separators.join('|'), 'g')) + ' ' + item?.['no'+pos+component2];
        } else {
          var tokens = item?.['no'+pos+component].split(new RegExp(separators.join('|'), 'g'));
        }
        list.push(tokens)
      });
    }
  }
  
  function group1(type) {
    let reducedArray = type.reduce( (acc, curr, _, arr) => {
        if (acc.length == 0) acc.push({artist: curr, count: 1})
        else if (acc.findIndex(f => f.artist === curr ) === -1) acc.push({artist: curr, count: 1})
        else ++acc[acc.findIndex(f => f.artist === curr)].count
        return acc
    }, [])
    var results = reducedArray.sort((a,b) => b.count - a.count )
    return results
  }
}





//necessary async functions for performance sake



function decodeGenre(input) {
  if (input == '#ec66c6') {
    output = ['Pop','pop','']
  } else if (input == '#b479ff') {
    output = ['Dance-pop','pop','Synth-pop, Europop, Electropop, Dance rock, Synth rock, Dream pop, Bubblegum pop, Teen pop']
  } else if (input == '#5d62da') {
    output = ['Indie','pop','Indie-pop, Indie-rock, Indie-folk, Indie-electronic, Indie-soul, Indie-dance, Indie-tronica, Indie-pop, Indie-rock, Indie-folk, Indie-electronic, Indie-soul, Indie-dance, Indie-tronica, Psychedelic, Baroque pop']
  } else if (input == '#b17bb6') {
    output = ['Pop rock','pop','Soft rock, Pop punk, Power pop, Garage rock']
  } else if (input == '#da09c5') {
    output = ['Disco','pop','Nu-Disco, Euro disco, Italo disco, Space disco, Disco polo, Disco house, Disco rap, Disco polo, Disco house, Disco rap']
  } else if (input == '#933f67') {
    output = ['Funk','pop','Funk-pop, Boogie, Electro-funk, G-funk, P-Funk, Funktronica, Funk carioca, Funk carioca, Funk ostentação, Funk melody, Funk ousadi']
  } else if (input == '#fe5c5c') {
    output = ['Pop rap','rap','Melodic rap, Pop trap']
  } else if (input == '#cf0a45') {
    output = ['R&B','R&B','Quiet storm, Contemporary R&B']
  } else if (input == '#a73138') {
    output = ['New jack','R&B','Doo-wop, Swing']
  } else if (input == '#871a1a') {
    output = ['Hip Hop','hip hop','']
  } else if (input == '#4b150d') {
    output = ['Trap','hip hop','Dirty, Southern hip hop, Crunk, Snap, Drill, Trap metal, Trap soul, Trapstep, Cloud rap, Trap rock, Trap jazz, Trap funk, Trap pop, Trapcore']
  } else if (input == '#422727') {
    output = ['Regional','hip hop','Gangsta rap, G-funk, West Coast hip hop, East Coast hip hop']
  } else if (input == '#865b3c') {
    output = ['Alt hip hop','hip hop','Experimental hip hop, Jazz rap, Conscious hip hop, Political hip hop, Horrorcore']
  } else if (input == '#0ba135') {
    output = ['Rock','rock','']
  } else if (input == '#04612f') {
    output = ['Hard rock','rock','Metal, Heavy metal, Glam metal, Hair metal, Thrash metal, Death metal, Black metal, Doom metal, Grindcore, Metalcore, Industrial metal, Alternative metal, Nu metal']
  } else if (input == '#3f6539') {
    output = ['Grunge','rock','Post-grunge, Alternative metal, Nu grunge']
  } else if (input == '#537e0b') {
    output = ['Funk rock','rock','Blues rock, Psychedelic rock, Jam rock']
  } else if (input == '#319c5c') {
    output = ['New Wave','rock','Punk rock, New wave, Post-punk, Ska punk, Pop punk, Emo, Hardcore punk, Skate punk']
  } else if (input == '#21d811') {
    output = ['Rock and Roll','rock','Rockabilly, Surf rock, Rock and roll revival, Heartland rock', 'Roots rock']
  } else if (input == '#79c999') {
    output = ['Alternative Rock','rock','']
  } else if (input == '#8dea6c') {
    output = ['Folk Rock','rock','Folktronica, Folk pop, Folk punk, Folk metal, Folk jazz']
  } else if (input == '#baa912') {
    output = ['Soul','soul','Neo soul, Blue-eyed soul, Psychedelic soul, Soul jazz, Soul blues, Southern soul, Northern soul, Soul pop, Soultronica']
  } else if (input == '#8f845a') {
    output = ['Blues','blues','']
  } else if (input == '#e8f92d') {
    output = ['Jazz','jazz','Jazz fusion, Acid jazz, Jazz rap, Nu jazz, Jazz funk, Jazz blues, Jazz pop, Jazz rock, Jazztronica, Nu jazz']
  } else if (input == '#ddf3a8') {
    output = ['Soca','soca','Calypso, Chutney, Parang, Rapso']
  } else if (input == '#be8f7a') {
    output = ['Gospel','gospel','Worship, Christian rock, Christian hip hop, Christian metal, Christian hardcore, Christian punk, Christian alternative rock']
  } else if (input == '#bcbdb9') {
    output = ['World','world','New Age, World fusion, Worldbeat']
  } else if (input == '#00a3ff') {
    output = ['Electronic','electronic','EDM, Club, Electro, Electro house, Electroclash, Electro swing, Electro hop, Electro funk, Electro pop, Electronicore, Electronic dance, Freestyle, Electro-hip-hop']
  } else if (input == '#162be9') {
    output = ['Dubstep','electronic','Brostep, Chillstep, Drumstep, Riddim, Dubstyl, Garage']
  } else if (input == '#008ea1') {
    output = ['Electro Rock','electronic','Electro funk, Electronic rock, Electronicore']
  } else if (input == '#7d2ffd') {
    output = ['Reggae','reggae','Dancehall, Afrobeats, Reggae fusion, Reggaeton, Reggae en Español, Reggae rock, Reggae pop, Reggae hip hop, Reggae metal']
  } else if (input == '#1ce8e8') {
    output = ['Eurodance','electronic','Trance, Euro disco, Italo disco, Space disco, Eurobeat, Euro house, Eurotrance']
  } else if (input == '#5666f8') {
    output = ['House','electronic','Deep house, Tech house, Progressive house, Tropical house, Future house, Acid house, Ambient house, Balearic house, Big room house, Bouncy house, Chicago house, Deep house, Electro house, Funky house, Ghetto house, Hard house, Hip house, Latin house, Microhouse, Minimal house, Progressive house, Tech house, Tribal house, UK hard house, Vocal house']
  } else if (input == '#e56000') {
    output = ['Country','country','']
  } else if (input == '#fe965c') {
    output = ['Country Pop','country','Folk pop']
  } else if (input == '#8f5a0a') {
    output = ['Country Rock','country','Southern rock, Countrycore']
  } else if (input == '#a31f0d') {
    output = ['Country Rap','country','Trap-country, Hick hop']
  } else if (input == '#c7cc86') {
    output = ['Folk','folk','Bluegrass, Folktronica, Folk pop, Folk punk, Folk metal, Folk jazz']
  } else if (input == '#f8d763') {
    output = ['Latin','latin','Latin pop, Latin rock, Salsa, Banda, Cumbia, Regional mexican, Tejano, Norteño, Mariachi, Ranchera']
  } else if (input == '#ffd4d1') {
    output = ['Tango','tango','Polka, Contradanse']
  }
  return output;
}
function decodeDate(input, type) {
  console.log(input)
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  var month = months[parseInt(input.slice(5,7)) - 1]
  var day = input.slice(8,10)
  if (day.slice(0,1) == '0') { 
    day = day.slice(1,2)
  }
  var year = input.slice(0,4)
  if (day == '1' || day == '21' || day == '31') {
    day = day + 'st'
  } else if (day == '2' || day == '22') {
    day = day + 'nd'
  } else if (day == '3' || day == '23') {
    day = day + 'rd'
  } else {
    day = day + 'th'
  }
  if (type == 'release' && month == 'January' && day == '1st') {
    return 'in ' + year
  } else if (type == 'release') {
    return 'on ' + month + ' ' + day + ', ' + year
  } else {
    return month + ' ' + day + ', ' + year
  }
}

//resize

function breakpoints() {
  const root = document.documentElement;
  const currentWidth = window.innerWidth;

  if (currentWidth <= 480) {
    root.style.setProperty('--browse-grid-columns', '1fr');
  } else if (currentWidth <= 768) {
    root.style.setProperty('--browse-grid-columns', '1fr 1fr');
  } else if (currentWidth <= 1024) {
    root.style.setProperty('--browse-grid-columns', '1fr 1fr 1fr');
  } else if (currentWidth <= 1280) {
    root.style.setProperty('--browse-grid-columns', '1fr 1fr 1fr 1fr');
  } else if (currentWidth > 1280) {
    root.style.setProperty('--browse-grid-columns', '1fr 1fr 1fr 1fr 1fr');
  }
}

window.addEventListener('DOMContentLoaded', breakpoints);
window.addEventListener('resize', breakpoints);