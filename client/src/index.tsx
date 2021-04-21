import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import reportWebVitals from './reportWebVitals'
import LandingPage from './Pages/landingPage/landingPage'
import TrackCard from './Components/TrackCard'
import tracks from './Components/TrackCard/data'
import { Track } from './types'
import SideNav from './Components/SideNav'

const track = new Track(
  2,
  tracks.name,
  tracks.artists,
  tracks.durationMs,
  tracks.url,
  tracks.image,
  tracks.previewUrl
)

ReactDOM.render(
  <React.StrictMode>
    <div>
      <SideNav />
      <TrackCard track={track} />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
