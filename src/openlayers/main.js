window.onload = init;

function init() {
    const openStreetMapStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true,
        title: 'OSMStandard'
    })

    const map = new ol.Map({
        view: new ol.View({
            center: [8721720.927831486, 1972719.6248556883],
            zoom: 17.5,
            maxZoom: 21,
            // minZoom: ,
            // rotation: 2.3
        }),
        layers: [openStreetMapStandard],
        // layers: [
        //     new ol.layer.Tile({
        //         source: new ol.source.OSM()
        //     })
        // ],
        target: 'js-map'
    })

    // const openStreetMapHumanitarian = new ol.layer.Tile({
    // source: new ol.source.OSM({
    // url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    // }),
    // visible: true,
    // title: 'OSMHumanitarian'
    // })
    // 
    // const statemTerrain = new ol.layer.Tile({
    // source: new ol.source.XYZ({
    // url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
    // attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    // }),
    // visible: false,
    // title: 'StatemTerrain'
    // })

    //layer grp
    const baseLayerGroup = new ol.layer.Group({
            layers: [
                openStreetMapStandard, openStreetMapHumanitarian, statemTerrain
            ]
        })
        // map.addLayer(baseLayerGroup);
        //

    var marker = new ol.Feature({
        geometry: new ol.geom.Point(
            ol.proj.fromLonLat([78.34866, 17.4480])
        ), // Cordinates of New York's Town Hall
    });
    var marker1 = new ol.Feature({
        geometry: new ol.geom.Point(
            ol.proj.fromLonLat([78.34865, 17.4480])
        ), // Cordinates of New York's Town Hall
    });

    var vectorSource = new ol.source.Vector({
        features: [marker, marker1]
    });
    var markerVectorLayer = new ol.layer.Vector({
        source: vectorSource,
    });
    map.addLayer(markerVectorLayer);





    // map.on('click', function(e) {
    // console.log(e.coordinate);
    // })
}