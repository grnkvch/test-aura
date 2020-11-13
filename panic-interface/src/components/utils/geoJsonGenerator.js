export const geoJsonGenerator = (coordArray) => {
  const geoJSON = { type: 'FeatureCollection', 
    features: [], 
    properties: {
      title: 'Mapbox DC',
      'marker-symbol': 'monument'
    } 
  }
  coordArray.forEach(({ lat, lon }) => {
    geoJSON.features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lon, lat],
      },
      'properties': {
        name,
      },
    })
  })
  return geoJSON
}