const quotes = [
  '"A rainy day is the perfect time for a walk in the woods" - Rachel Carson',
  '"It is best to read the weather forecast before praying for rain" - Mark Twain',
  '"Fog is rain that whispers" - Olivia Dresher',
  '"The sound of the rain needs no translation" - Alan Watts',
  '"Bad weather always looks worse through a window" - Author unknown',
  '"My favorite weather is bird-chirping weather" - Terri Guillemets',
  '"One can find so many pains when the rain is falling" - John Steinbeck',
  '“There’s no such thing as bad weather, only unsuitable clothing” - Alfred Wainwright',
  '"Some people walk in the rain, others just get wet" - Roger Miller',
  '"The best thing one can do when it’s raining is to let it rain" - Henry Wadsworth Longfellow',
  '"You must not blame me if I do talk to the clouds" - Henry David Thoreau',
  '"A cloudy day is no match for a sunny disposition" - William Arthur Ward',
  '"I never get tired of the blue sky" - Vincent van Gogh',
  '"Dark clouds may hang on me sometimes, but I’ll work it out..." - Dave Matthews',
  '"Clouds are like boogers hanging on the nostrils of the moon" - Robin Williams',
  '"Don’t let one cloud obliterate the whole sky" - Anaïs Nin',
  '"A man’s heart changes as often as does the autumn sky" - Japanese Proverb',
  '"I like these cold, grey winter days. Days like these let you savour a bad mood" - Bill Watterson',
  '"Winter is dead, spring is crazy, summer is cheerful and autumn is wise!" - Mehmet Murat Ildan',
  '"Autumn carries more gold in its pocket than all the other seasons" - Jim Bishop',
  '"Do what we can, summer will have its flies" - Ralph Waldo Emerson',
  '“The sun did not shine. It was too wet to play. So we sat in the house. All that cold, cold, wet day.” ― Dr. Seuss, The Cat in the Hat',
  '“Don’t knock the weather. If it didn’t change once in a while, nine out of ten people couldn’t start a conversation.” ― Kim Hubbard',
  '"You don’t need a weatherman to know which way the wind blows." - Dylan',
  '"There is no such thing as bad weather, only different kinds of good weather." - John Ruskin',
  '"Climate is what we expect, weather is what we get." - Mark Twain'
];

function showQuote(){
    var whichquote = Math.floor(Math.random() * quotes.length);
    document.getElementById('weatherquote').innerHTML = '<p class="text-dark text-center"><em>' + quotes[whichquote] + '</em></p>';
}

const arForecast = [
  'Sunny',
  'Partly Cloudy',
  'Cloudy',
  'Rainy',
  'Storm',
  'Increasing clouds',
  '<#forecast>'
];

const arForecastIcon = [
  'wi-day-sunny',
  'wi-day-sunny-overcast',
  'wi-cloudy',
  'wi-day-rain',
  'wi-thunderstorm',
  'wi-day-sunny-overcast',
  'wi-day-sunny'
];

function showForecastIcon(){
  var forecast = document.getElementById('forecast').innerText.toLowerCase(); // lowercase for case-insensitive match
  var forecastorig = document.getElementById('forecast').innerText; // Original case for display
  var indexForecast = -1;

  for (var i = 0; i < arForecast.length; i++) {
    var keyword = arForecast[i].toLowerCase();
    if (forecast.includes(keyword)) {
      indexForecast = i;
      break;  // stop at the first matching keyword
    }
  }

  // If no match, you can choose a default icon or handle it:
  if(indexForecast === -1){
    indexForecast = 0; // default to 'Sunny' or whichever index you prefer
  }

  document.getElementById('forecasticon').innerHTML = '<h4 class="text-center wi ' + arForecastIcon[indexForecast] + '"> <small>   ' + forecastorig +'</small></h4>';
}

function checkIsUpdating() {
  const updateElem = document.getElementById('lastupdate');
  const updateAlertElem = document.getElementById('updatealert');
  if (!updateElem || !updateAlertElem) return;

  const updateTime = updateElem.innerText.trim();
  const dateUpdated = Date.parse(updateTime);

  if (isNaN(dateUpdated)) {
    // Could not parse date — clear any previous alerts
    updateAlertElem.innerHTML = '';
    return;
  }

  const dateNow = Date.now();
  const diffMs = dateNow - dateUpdated;
  const fifteenMinutesMs = 15 * 60 * 1000;

  if (diffMs > fifteenMinutesMs) {
    updateAlertElem.innerHTML = `
      <div class="alert alert-warning" role="alert">
        <h6 class="my-auto">Caution: This page has not updated for more than 15 minutes.</h6>
      </div>`;
  } else {
    updateAlertElem.innerHTML = '';
  }
}
