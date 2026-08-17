import { loadTrail, matchPosition } from './trail.js'

const app = document.getElementById('app')
app.innerHTML = `
  <div style="font-family: sans-serif; padding: 2rem; text-align: center;">
    <h1>Native Alien Trail</h1>
    <p id="status">Loading trail data...</p>
  </div>
`

const statusEl = document.getElementById('status')

async function init() {
  let trail
  try {
    trail = await loadTrail('/northland.gpx')
    statusEl.textContent = `Trail loaded: ${trail.totalKm.toFixed(1)} km total. Getting your location...`
  } catch (err) {
    statusEl.textContent = `Could not load trail data: ${err.message}`
    return
  }

  if (!navigator.geolocation) {
    statusEl.textContent = 'This browser does not support location.'
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords
      const result = matchPosition(trail, latitude, longitude)
      statusEl.textContent =
        `You're about ${result.km.toFixed(1)} km along Northland ` +
        `(${result.distanceFromTrailKm.toFixed(2)} km from the trail line).`
    },
    (err) => {
      statusEl.textContent = `Could not get your location: ${err.message}`
    }
  )
}

init()
