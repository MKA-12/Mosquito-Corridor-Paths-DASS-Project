window.onload = init;
//
var sensor_location_store = [];

function Get_sensor_data() {
  fetch("http://localhost:4000/api/addSensor")
    .then(res => res.json())
    .then(out => {
      for (let i = 0; i < out.length; i++) {
        // console.log('Output: ', out[0].latitude);
        sensor_location_store.push([
          parseFloat(out[i].longitude),
          parseFloat(out[i].latitude)
        ]);
      }
    })
    .catch(err => console.error(err));

  // console.log(sensor_location_store[0]);
}

var location_store_blips = [
  [78.34866, 17.448],
  [78.34856, 17.447],
  [78.34846, 17.446],
  [78.3474, 17.4455],
  [78.35110974166003, 17.445744868858498],
  [78.34729022183531, 17.446740379912782],
  [78.34589547314756, 17.444795668745485]
];
var sensor_location_store = [
  [78.348, 17.4476],
  [78.347, 17.4456],
  [78.347, 17.4446],
  [78.3503671869923, 17.444856796402092],
  [78.34609981858057, 17.445443033098826],
  [78.34850222616629, 17.44394568613177]
];
//
function place_new_blip(array_index) {
  var Mobile_app_user_location_new = new ol.Feature({
    geometry: new ol.geom.Point(
      ol.proj.fromLonLat(location_store_blips[array_index])
    )
  });

  return Mobile_app_user_location_new;
}
//
function Place_Sensor_on_Map(i) {
  var extent = ol.proj.transformExtent(
    [
      sensor_location_store[i][0],
      sensor_location_store[i][1],
      sensor_location_store[i][0] + 0.0001,
      sensor_location_store[i][1] - 0.0001
    ],
    "EPSG:4326",
    "EPSG:3857"
  );
  var imageLayer = new ol.layer.Image({
    source: new ol.source.ImageStatic({
      color: "#ffcd46",
      url: "sensor.jpeg",
      imageExtent: extent
    })
  });
  return imageLayer;
}

function draw_path_between_points(arr1, arr2) {
  // var Arbitarary = [[78.34866, 17.4480], [78.34856, 17.4470]];
  var points = [arr1, arr2];

  for (var i = 0; i < points.length; i++) {
    points[i] = ol.proj.transform(points[i], "EPSG:4326", "EPSG:3857");
  }

  var featureLine = new ol.Feature({
    geometry: new ol.geom.LineString(points)
  });

  var vectorLine = new ol.source.Vector({});
  vectorLine.addFeature(featureLine);

  var vectorLineLayer = new ol.layer.Vector({
    source: vectorLine,
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: [0, 0, 0, 0.6],
        opacity: 0.1
      }),
      stroke: new ol.style.Stroke({
        color: [0, 0, 0, 1],
        lineDash: [5, 5],
        width: 0.8
      })
    })
  });
  return vectorLineLayer;
  // map.addLayer(vectorLineLayer);
}

async function init() {
  const openStreetMapStandard = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: false,
    title: "OSMStandard"
  });
  const openStreetMapHumanitarian = new ol.layer.Tile({
    source: new ol.source.OSM({
      url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    }),
    visible: true,
    title: "OSMHumanitarian"
  });
  const map = new ol.Map({
    view: new ol.View({
      center: [8721720.927831486, 1972719.6248556883],
      zoom: 18.5,
      maxZoom: 21,
      minZoom: 17
    }),
    layers: [openStreetMapHumanitarian],
    target: "js-map"
  });
  //

  // Get_sensor_data();
  fetch("http://localhost:4000/api/addSensor")
    .then(res => res.json())
    .then(out => {
      for (let i = 0; i < out.length; i++) {
        // console.log('Output: ', out[0].latitude);
        sensor_location_store.push([
          parseFloat(out[i].longitude),
          parseFloat(out[i].latitude)
        ]);
      }
      //iterate over mobile app users co-ordinates and place them on the map
      fetch("http://localhost:4000/api/SOSReport")
        .then(res => res.json())
        .then(out => {
          // console.log(out)
          //    var new_list = [out]
          for (let i = 0; i < out.length; i++) {
            // console.log('Output: ', out[0].latitude);
            location_store_blips.push([
              parseFloat(out[i].longitude),
              parseFloat(out[i].latitude)
            ]);
          }
          // console.log(location_store_blips)
        })
        .then(() => {
          var Store_added_layer = [];
          for (i = 0; i < location_store_blips.length; i++) {
            // console.log(location_store_blips)
            Store_added_layer.push(place_new_blip(i));
          }

          var vectorSource = new ol.source.Vector({
            features: Store_added_layer
          });

          var markerVectorLayer = new ol.layer.Vector({
            source: vectorSource
          });
          map.addLayer(markerVectorLayer);
        });
      //
      //
      //drawing path between two sensors
      var Count_array = [];
      var Count_array_complement = [];
      for (var i = 0; i < sensor_location_store.length; i++) {
        if (Math.random() > 0.5) {
          Count_array.push(i);
        } else {
          // console.log("kalyan gay");
          Count_array_complement.push(i);
        }
      }
      // console.log("hi");
      // console.log(Count_array_complement);
      // console.log(Count_array);
      // console.log("hi1");

      var j = 0;
      for (
        var i = 0;
        i < Count_array.length && j < Count_array_complement.length;
        i++
      ) {
        append_Stored_path = draw_path_between_points(
          sensor_location_store[Count_array[i]],
          sensor_location_store[Count_array_complement[j]]
        );
        map.addLayer(append_Stored_path);
        j++;
      }
      //
      //drawing paths between two blips
      // append_Stored_path = draw_path_between_points(location_store_blips[0], location_store_blips[1])
      // map.addLayer(append_Stored_path);
      //
      //Adding Sensors to the map
      for (i = 0; i < sensor_location_store.length; i++) {
        // console.log("here");
        NewLayer_sensor = Place_Sensor_on_Map(i);
        map.addLayer(NewLayer_sensor);
      }
      //
    });
  map.on("click", function(evt) {
    var lonlat = ol.proj.transform(evt.coordinate, "EPSG:3857", "EPSG:4326");
    var lon = lonlat[0];
    var lat = lonlat[1];
    // …
    console.log(lonlat);
  });
  // .catch(err => console.error(err));

  //
  // map.on('click', function(e) {
  // console.log(e.coordinate);
  // })
}
