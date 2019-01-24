var quotes=new Array();
quotes[0] = '"A rainy day is the perfect time for a walk in the woods" - Rachel Carson';
quotes[1] = '"It is best to read the weather forecast before praying for rain" - Mark Twain';
quotes[2] = '"Fog is rain that whispers" - Olivia Dresher';
quotes[3] = '"The sound of the rain needs no translation" - Alan Watts';
quotes[4] = '"Bad weather always looks worse through a window" - Author unknown';
quotes[5] = '"My favorite weather is bird-chirping weather" - Terri Guillemets';
quotes[6] = '"One can find so many pains when the rain is falling" - John Steinbeck';
quotes[7] = '"There’s no such thing as bad weather, only unsuitable clothing" - Alfred Wainwright';
quotes[8] = '"Some people walk in the rain, others just get wet" - Roger Miller';
quotes[9] = '"The best thing one can do when it’s raining is to let it rain - Henry Wadsworth Longfellow';
quotes[10] = '"You must not blame me if I do talk to the clouds" - Henry David Thoreau';
quotes[11] = '"A cloudy day is no match for a sunny disposition" - William Arthur Ward';
quotes[12] = '"I never get tired of the blue sky" - Vincent van Gogh';
quotes[13] = '"Dark clouds may hang on me sometimes, but I’ll work it out..." - Dave Matthews';
quotes[14] = '"Clouds are like boogers hanging on the nostrils of the moon" - Robin Williams';
quotes[15] = '"Don’t let one cloud obliterate the whole sky" - Anaïs Nin';
quotes[16] = '"A man’s heart changes as often as does the autumn sky" - Japanese Proverb';
quotes[17] = '"I like these cold, grey winter days. Days like these let you savour a bad mood" - Bill Watterson';
quotes[18] = '"Winter is dead, spring is crazy, summer is cheerful and autumn is wise!" - Mehmet Murat Ildan';
quotes[19] = '"Autumn carries more gold in its pocket than all the other seasons" - Jim Bishop';
quotes[20] = '"Do what we can, summer will have its flies" - Ralph Waldo Emerson';
quotes[21] = '“The sun did not shine. It was too wet to play. So we sat in the house. All that cold, cold, wet day.” ― Dr. Seuss, The Cat in the Hat';
quotes[22] = '“Don’t knock the weather. If it didn’t change once in a while, nine out of ten people couldn’t start a conversation.”  ― Kim Hubbard';

var q = quotes.length;
var whichquote=Math.round(Math.random()*(q-1));

function showQuote(){
    document.getElementById('weatherquote').innerHTML = '<p class="text-dark text-center"><em>' + quotes[whichquote] + '</em></p>';
}

var arForecast= new Array();
arForecast[0] = 'Sunny';
arForecast[1] = 'Partly Cloudy';
arForecast[2] = 'Cloudy';
arForecast[3] = 'Rainy';
arForecast[4] = 'Storm';
arForecast[5] = 'Something';
arForecast[6] = '<#forecast>';

var arForecastIcon= new Array();
arForecastIcon[0] = 'wi-day-sunny';
arForecastIcon[1] = 'wi-day-sunny-overcast';
arForecastIcon[2] = 'wi-cloudy';
arForecastIcon[3] = 'wi-day-rain';
arForecastIcon[4] = 'wi-thunderstorm';
arForecastIcon[5] = 'wi-day-sunny';
arForecastIcon[6] = 'wi-day-sunny';


function showForecastIcon(){
	var forecast = document.getElementById('forecast').innerText;
	var indexForecast = arForecast.indexOf(forecast);
    document.getElementById('forecasticon').innerHTML = '<h2 class="text-info text-center wi ' + arForecastIcon[indexForecast] + '"> <small>   ' + forecast +'</small></h2>';
}

function checkIsUpdating(){
  var updateTime = document.getElementById('lastupdate').innerText;
  var dateUpdated = date.parse(updateTime)
  var dateNow = date.parse()
  document.getElementById('updatealert').innerHTML = '<div class="alert alert-warning" role="alert"><h6 class="my-auto">Caution: This page has not updated for more then 15 minutes.</h6></div>';
}
