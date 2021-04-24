import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import reportWebVitals from './reportWebVitals'
import LandingPage from './Pages/landingPage/landingPage'
import TrackCard from './Components/TrackCard'
import tracks from './Components/TrackCard/data'
import { Track } from './types'
import SideNav from './Components/SideNav'
import ListPage from './Pages/ListPage'

let count = 0
const trackList = tracks.map(track => {
  count++
  return new Track(
    count,
    track.name,
    track.artists,
    track.durationMs,
    track.url,
    track.image,
    track.previewUrl
  )
})

ReactDOM.render(
  <React.StrictMode>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <SideNav />
      <ListPage tracks={trackList} />
      <div></div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
