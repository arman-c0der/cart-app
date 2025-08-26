// import 'regenerator-runtime/runtime'
import { ui } from './UI.js'
document.addEventListener('DOMContentLoaded', (e) => {
  //get data from localStorage and show in initial load
  ui.populateCartFromLocalStorage()
  ui.init()
  console.log('loaded')
})
console.log('loaded')