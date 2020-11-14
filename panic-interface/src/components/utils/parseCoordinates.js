export function parseCoordinates(coordString){
  const [,lonStr, latStr] = /POINT\((-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)\)/.exec(coordString)
  return {
    lon: Number(lonStr),
    lat: Number(latStr)
  }
}