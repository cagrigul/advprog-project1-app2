require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Search",
  "esri/widgets/Legend", 
  "esri/layers/FeatureLayer",
  "esri/symbols/PictureMarkerSymbol"
], function(Map, MapView, Search, Legend, FeatureLayer, PictureMarkerSymbol) {
  const map = new Map({
    basemap: "streets"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-90.44341, 38.64068], // Center of the USA
    zoom: 10
  });

  // Correct the search widget to be added
  const searchWidget = new Search({
    view: view
  });
  view.ui.add(searchWidget, { // Correct the variable name here
    position: "top-right"
  });

  // Feature Layer for county
  const featureLayer_1 = new FeatureLayer({
    url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/ADVPROG_PROJECT1_CG/FeatureServer/3"
  });



  // Second district layer (Assuming a different URL or ID for the district layer)
const featureLayer_2 = new FeatureLayer({
  url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/ADVPROG_PROJECT1_CG/FeatureServer/2",
  popupTemplate: {
    title: "{DIST_NAME}",
    content: [{
      type: "fields",
      fieldInfos: [
        { fieldName: "DIST_NAME", label: "District Name" },
        { fieldName: "LOGRADE", label: "Lowest Grade" },
        { fieldName: "HIGRADE", label: "Highest Grade" },
        { fieldName: "CountSchool", label: "Number of Schools" }
      ]
    }]
  },
  renderer: {
    type: "simple", // Use a SimpleRenderer for uniform styling.
    symbol: {
      type: "simple-fill", // Use a SimpleFillSymbol for polygon features.
      color: "transparent", // Set the fill color to transparent.
      outline: { // Define the outline of the polygon.
        color: "blue", // Color of the outline.
        width: 1, // Make the line thinner.
        style: "dash" // Use a dashed style for the outline.
      }
    }
  }
});

  // Third school layer (Assuming a different URL or ID for the school layer)
const featureLayer_3 = new FeatureLayer({
  url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/ADVPROG_PROJECT1_CG/FeatureServer/0",
  popupTemplate: {
    title: "{Facility}",
    content: [{
      type: "fields",
      fieldInfos: [
        { fieldName: "Facility", label: "Facility Name" },
        { fieldName: "Adress", label: "Address" },
        { fieldName: "City", label: "City" },
        { fieldName: "Phone", label: "Phone Number" },
        { fieldName: "Email", label: "Email" },
        { fieldName: "Teachers", label: "Teachers Count" },
        { fieldName: "Enrollment", label: "Enrollment Count" }
      ]
    }]
  },
  renderer: {
    type: "simple", // Use a SimpleRenderer for uniform symbolization of all features.
    symbol: {
      type: "picture-marker", // Use a PictureMarkerSymbol to use an image as the point symbol.
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Round_Landmark_School_Icon_-_Transparent.svg/512px-Round_Landmark_School_Icon_-_Transparent.svg.png", // URL to the icon image.
      width: "24px", // Set the icon width.
      height: "24px" // Set the icon height.
    }
  }
});


  // Add legend widget
  // Add legend widget with custom layer titles
const legend = new Legend({
  view: view,
  layerInfos: [
    {
      layer: featureLayer_1,
      title: "County Layer" 
    },
    {
      layer: featureLayer_2,
      title: "District Layer" 
    },
    {
      layer: featureLayer_3,
      title: "School Layer" 
    }
  ]
});

// 
view.ui.add(legend, "bottom-right");
  // Add legend widget to the UI at the bottom right
  view.ui.add(legend, "bottom-right");

  // Add layers to the map
  map.add(featureLayer_1);
  map.add(featureLayer_2);
  map.add(featureLayer_3);
});
