'use strict';

//geolocation
function success(pos){
    ajaxRequest(pos.coords.latitude, pos.coords.longitude);
}

function fail(error){
 alert('位置情報の取得に失敗しました。エラーコード：'+ error.code);   
}

/*global navigator*/
/*global $*/
navigator.geolocation.getCurrentPosition(success, fail);

//UTFをミリ秒へ
function utcToJSTime(utcTime){
    return utcTime * 1000;
}

//データ取得
function ajaxRequest(lat, long){
    const url = 'https://api.openweathermap.org/data/2.5/forecast';
    const appId = 'fc61547ccec8ccbc10d938e3712875af';
    
       /*global data*/
    //都市名，国
    console.log('都市名:' + data.city.name);
    console.log('国名：' + data.city.country);
    
    //天気予報データ
    data.list.forEach(function(forecast, index){
        const dateTime = new Date(utcToJSTime(forecast.dt));
        const month = dateTime.getMonth() + 1;
        const date = dateTime.getDate();
        const hours = dateTime.getHours();
        const min = String(dateTime.getMinutes()).padStart(2, '0');
        const temperature = Math.round(forecast.main.temp);
        const description = forecast.weather[0].description;
        const iconPatch = `images/${forecast.weather[0].icon}.svg`;
        
        console.log('日時：' + `${month}/${date} ${hours}:${min}`);
        console.log('気温：' + temperature);
        console.log('天気：' + description);
        console.log('画像パス：' + iconPatch);
    });
    
    
    $.ajax({
        url: url,
        data:{
            appId: appId,
            lat: lat,
            lon: long,
            units: 'metric',
            lang: 'ja'
        }
    })
    //成功
    .done(function(data){
        console.log(data);
    })
    //失敗
    .fail(function(){
        console.log('$.ajax failed!');
    })
}