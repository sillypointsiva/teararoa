async function loadTrail(gpxUrl) {
  const response = await fetch(gpxUrl)
  const text = await response.text()
  const xml = new DOMParser().parseFromString(text, 'application/xml')
  const trkpts = Array.from(xml.getElementsByTagName('trkpt'))

  const points = []
  for (const pt of trkpts) {
    const lat = parseFloat(pt.getAttribute('lat'))
    const lon = parseFloat(pt.getAttribute('lon'))
    const last = points[points.length - 1]
    if (last && last.lat === lat && last.lon === lon) continue
    points.push({ lat, lon })
  }

  let cumulative = 0
  points[0].km = 0
  for (let i = 1; i < points.length; i++) {
    cumulative += haversineKm(points[i - 1], points[i])
    points[i].km = cumulative
  }

  return { points, totalKm: cumulative }
}

function haversineKm(a, b) {
  const R = 6371
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

function toRad(deg) {
  return (deg * Math.PI) / 180
}

function matchPosition(trail, lat, lon) {
  let closest = null
  let closestDist = Infinity
  for (const pt of trail.points) {
    const dist = haversineKm({ lat, lon }, pt)
    if (dist < closestDist) {
      closestDist = dist
      closest = pt
    }
  }
  return { km: closest.km, totalKm: trail.totalKm, distanceFromTrailKm: closestDist }
}

export { loadTrail, matchPosition }
