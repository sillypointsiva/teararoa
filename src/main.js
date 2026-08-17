document.getElementById('app').innerHTML = `
  <div style="font-family: sans-serif; padding: 2rem; text-align: center;">
    <h1>Native Alien Trail</h1>
    <p>It's alive.</p>
    <p id="time"></p>
  </div>
`
document.getElementById('time').textContent = new Date().toLocaleString()
