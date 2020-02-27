window.onload = init;

function init() {
    const openStreetMapStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: false,
        title: 'OSMStandard'
    })
    const openStreetMapHumanitarian = new ol.layer.Tile({
        source: new ol.source.OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }),
        visible: true,
        title: 'OSMHumanitarian'
    })
    const map = new ol.Map({
        view: new ol.View({
            center: [8721720.927831486, 1972719.6248556883],
            zoom: 18.5,
            maxZoom: 21,
            // minZoom: ,
            // rotation: 2.3
        }),
        layers: [openStreetMapHumanitarian],
        // layers: [
        //     new ol.layer.Tile({
        //         source: new ol.source.OSM()
        //     })
        // ],
        target: 'js-map'
    })


    // 
    // const statemTerrain = new ol.layer.Tile({
    // source: new ol.source.XYZ({
    // url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
    // attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    // }),
    // visible: false,
    // title: 'StatemTerrain'
    // })

    // //layer grp
    // const baseLayerGroup = new ol.layer.Group({
    //         layers: [
    //             openStreetMapStandard, openStreetMapHumanitarian, statemTerrain
    //         ]
    //     })
    // map.addLayer(baseLayerGroup);
    //

    var Mobile_app_user_location1 = new ol.Feature({
        geometry: new ol.geom.Point(
            ol.proj.fromLonLat([78.34866, 17.4480])
        ),
    });
    var Mobile_app_user_location2 = new ol.Feature({
        geometry: new ol.geom.Point(
            ol.proj.fromLonLat([78.34856, 17.4470])
        ), 
    });
    var Mobile_app_user_location3 = new ol.Feature({
        geometry: new ol.geom.Point(
            ol.proj.fromLonLat([78.34846, 17.4460])
        ), 
    });
    var Mobile_app_user_location4 = new ol.Feature({
        geometry: new ol.geom.Point(
            // {color : '#ffcd46',} 
            ol.proj.fromLonLat([78.3485043, 17.4483573])
        ), 
    });
    // marker.setStyle(new ol.style.Style({
    // image: new ol.style.Icon(({
    // color: '#ffcd46',
    // crossOrigin: 'anonymous',
    // src: './1.jpg'
    // }))
    // }));

    // var marker1 = new ol.Feature({
    // geometry: new ol.geom.Point(
    // ol.proj.fromLonLat([78.34865, 17.4480])
    // ), // Cordinates of Bakul nivas
    // });

    var vectorSource = new ol.source.Vector({
        features: [ Mobile_app_user_location4]
    });
    var markerVectorLayer = new ol.layer.Vector({
        source: vectorSource,
    });
    map.addLayer(markerVectorLayer);

    //

    var north = 17.4476;
    var south = 17.4475;
    var east = 78.3480;
    var west = 78.3481;
    var extent = ol.proj.transformExtent([east, north, west, south], 'EPSG:4326', 'EPSG:3857');
    var imageLayer = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            color :  '#ffcd46',
            url: 'sensor.jpeg',
            imageExtent: extent
        })
    });
    map.addLayer(imageLayer);

    var north = 17.4456;
    var south = 17.4455;
    var east = 78.3470;
    var west = 78.3471;
    var extent = ol.proj.transformExtent([east, north, west, south], 'EPSG:4326', 'EPSG:3857');
    var imageLayer1 = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            color :  '#ffcd46',
            url: 'sensor.jpeg',
            imageExtent: extent
        })
    });
    map.addLayer(imageLayer1);

    var north = 17.4446;
    var south = 17.4445;
    var east = 78.3470;
    var west = 78.3471;
    var extent = ol.proj.transformExtent([east, north, west, south], 'EPSG:4326', 'EPSG:3857');
    var imageLayer2 = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            color :  '#ffcd46',
            url: 'sensor.jpeg',
            imageExtent: extent
        })
    });
    map.addLayer(imageLayer2);

    //
    var north = 17.4456;
    var south = 17.4455;
    var east = 78.3490;
    var west = 78.3491;
    var extent = ol.proj.transformExtent([east, north, west, south], 'EPSG:4326', 'EPSG:3857');
    var imageLayer3 = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            color :  '#ffcd46',
            url: 'sensor.jpeg',
            imageExtent: extent
        })
    });
    map.addLayer(imageLayer3);

    // map.on('click', function(e) {
    // console.log(e.coordinate);
    // })
}