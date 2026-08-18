import { loadTrail, matchPosition } from './trail.js'
import { days } from './days.js'

const app = document.getElementById('app')
app.innerHTML = `
  <div style="font-family: sans-serif; padding: 1.5rem; max-width: 500px; margin: 0 auto;">
    <h1 style="text-align:center;">Native Alien Trail</h1>
    <p id="status" style="text-align:center; color:#666;">Loading trail data...</p>
    <div id="days"></div>
  </div>
`

const statusEl = document.getElementById('status')
const daysEl = document.getElementById('days')

function renderDays(currentKm) {
  daysEl.innerHTML = days.map(day => {
    const unlocked = currentKm >= day.unlockAtKm
    const factsHtml = day.facts.map(f =>
      `<div style="margin:4px 0;">${f.icon} <span style="font-size:0.9em;">${f.label}</span></div>`
    ).join('')

    const narrativeHtml = unlocked
      ? `<p style="font-style:italic; color:#3a3a3a; margin-top:10px;">${day.narrative}</p>`
      : `<p style="color:#999; margin-top:10px;">🔒 Locked — unlocks at ${day.unlockLabel}</p>`

    return `
      <div style="border:1px solid #ddd; border-radius:8px; padding:14px; margin-bottom:12px;">
        <strong>Day ${day.id} · ${day.km} km</strong>
        <div style="font-size:0.85em; color:#666; margin-bottom:6px;">${day.title}</div>
        ${factsHtml}
        ${narrativeHtml}
      </div>
    `
  }).join('')
}

async function init() {
  let trail
  try {
    trail = await loadTrail('/northland.gpx')
    statusEl.textContent = 'Trail loaded. Getting your location...'
  } catch (err) {
    statusEl.textContent = `Could not load trail data: ${err.message}`
    renderDays(0)
    return
  }

  if (!navigator.geolocation) {
    statusEl.textContent = 'This browser does not support location.'
    renderDays(0)
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords
      const result = matchPosition(trail, latitude, longitude)
      statusEl.textContent = `${result.km.toFixed(1)} km along Northland`
      renderDays(result.km)
    },
    (err) => {
      statusEl.textContent = `Could not get your location: ${err.message}`
      renderDays(0)
    }
  )
}

init()
