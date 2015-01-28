document.addEventListener("DOMContentLoaded", function(){

    var theBody = document.querySelector('#theBody');
    
    buildHeader()
    
    if(navigator.geolocation){
        //alert('I know where you are!')
        drawMap();
    }else{
        alert('Your Browser does not Support Geolocation!')
        //failedToLoad();
    }
function buildHeader(){
    var header = document.createElement('header');
    theBody.appendChild(header);
    var headerDiv = document.createElement('div');
    headerDiv.setAttribute('class','headOfPage');
    header.appendChild(headerDiv);
    var h1Tag = document.createElement('h1');
    h1Tag.innerHTML += 'Google Static Map Location Assignment';
    headerDiv.appendChild(h1Tag);
}
    
function drawMap(){
    
    var wrapper = document.createElement('div');
    wrapper.setAttribute('class','wrapper');
    theBody.appendChild(wrapper); 
    
    var parameters = {enableHighAccuracy: true, timeout:3600, maximumAge:60000};
    
    navigator.geolocation.getCurrentPosition(watchPosition, failedToLoad, parameters);

    
function watchPosition(position){
      
    var mapCanvas = document.createElement("canvas");
        mapCanvas.setAttribute('height', '400px');
        mapCanvas.setAttribute('width', '400px');
        mapCanvas.style.marginTop = '10%';
        mapCanvas.setAttribute('class', 'staticMap');
        mapCanvas.style.backgroundColor = '#a2a2a2';
        mapCanvas.style.boxShadow = '5px 5px 8px #888888';
        wrapper.appendChild(mapCanvas);
    
    var coordsData = document.createElement('p');
        coordsData.setAttribute('class','coords');
        coordsData.style.maxWidth = '400px';
        coordsData.style.textAlign = 'center';
        coordsData.style.boxShadow = '5px 5px 8px #888888';
        coordsData.innerHTML += 'Your Current Location <br><br>Latitude: ' + position.coords.latitude + '&deg<br>' + 'Longitude: ' + position.coords.longitude + '&deg<br>' + 'Accuracy: ' + position.coords.accuracy + 'm<br>' + 'Time: ' + (position.timestamp); 
        wrapper.appendChild(coordsData);
    
    var locationInput = document.createElement('input');
    locationInput.setAttribute('type','text');
    locationInput.setAttribute('id','userLocation');
    locationInput.style.marginLeft = '21%';
    wrapper.appendChild(locationInput);
    var locationButton = document.createElement('input');
    locationButton.setAttribute('type','button');
    locationButton.setAttribute('value','Change Location');
    locationButton.setAttribute('onclick','getUserLocation()');
    wrapper.appendChild(locationButton);
    
    
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    var canvas = document.querySelector('.staticMap');
    var context = canvas.getContext('2d');
    var imgObj = new Image();
    imgObj.onload = function() {
     context.drawImage(imgObj, 0, 0);
    };
    imgObj.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude + '%C2%B0&zoom=14&sensor=false&size=400x400&maptype=roadmap&style=lightness:15|gamma:1.31|hue:0x0008ff|saturation:-50|invert_lightness:true';
    
};
    
    function failedToLoad(error){
        var errors = {
            1: 'You haven\'t allowed us to find you',
            2: 'We couldn\'t find you',
            3: 'We have timed out',
        };
        //alert('Error: ' + errors[error.code]);
        
        var failImage = document.createElement('img');
        failImage.setAttribute('src','img/map.svg');
        failImage.style.maxWidth = '100%';
        failImage.style.marginTop = '50px';
        wrapper.appendChild(failImage);
        var messageDiv = document.createElement('p');
        messageDiv.style.width = '270px';
        messageDiv.style.margin = '-370px 0px 0px 66px';
        messageDiv.style.position = 'absolute';
        messageDiv.style.fontFamily = 'monospace';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.fontSize = '1.5rem';
        messageDiv.innerHTML += errors[error.code];
        wrapper.appendChild(messageDiv);
        
    }
}
});
function getUserLocation(id){  
    
    var canvas = document.querySelector('.staticMap');
    var context = canvas.getContext('2d');
    var imgObj = new Image();
    imgObj.onload = function() {
     context.drawImage(imgObj, 0, 0);
    };
    imgObj.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' + document.getElementById('userLocation').value + '%C2%B0&zoom=14&sensor=false&size=400x400&maptype=roadmap&style=lightness:15|gamma:1.31|hue:0x0008ff|saturation:-50|invert_lightness:true';
    };