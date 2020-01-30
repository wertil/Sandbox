export function leafletMap() {

    // get map data
    const mapCenter = document.querySelector('.map-center');
    const mapCenterLat = mapCenter.getAttribute('data-lat');
    const mapCenterLng = mapCenter.getAttribute('data-lng');
    const mapCenterZoom = mapCenter.getAttribute('data-zoom');

   
    // leaflet code
    var mymap = L.map('map-id').setView([mapCenterLat, mapCenterLng], mapCenterZoom);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2FtYXNhbWEiLCJhIjoiY2s1bjA5MW1xMDI3MzNrcDF2OTVhc2c4ZCJ9.ex6Lyw0F7meUcIfK-R7rXA', {
        maxZoom: 18,
        attribution: `Map data &copy; <a href="https://www.openstreetmap.org/#map=${mapCenterZoom}/${mapCenterLat}/${mapCenterLng}" target="_blank">OpenStreetMap</a> contributors,
            <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
            Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
        id: 'mapbox/streets-v11'
    }).addTo(mymap);


    // get markers
    const markers = document.getElementsByClassName('marker');

    for (let i = 0, len = markers.length; i < len; i++) {
        const lat = markers[i].getAttribute('data-lat');
        const lng = markers[i].getAttribute('data-lng');
        const url = markers[i].getAttribute('data-url');
        const locationName = markers[i].getAttribute('data-location');

        const marker = L.marker([lat, lng]).addTo(mymap).bindTooltip(locationName);
        
        marker.on('click', function(leafletEvent) {
            window.open(url, "_self"); 
          });
    }


    
    
 


}