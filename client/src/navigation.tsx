import * as React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import artists from './Components/ArtistCard/data'
import SideNav from './Components/SideNav'
import tracks from './Components/TrackCard/data'
import LandingPage from './Pages/landingPage/landingPage'
import ListPage from './Pages/ListPage'
import { Artist, Track } from './types'

let count = 0
const trackList = tracks.map(track => {
  count++
  return new Track(
    'ajfaksjgasglsalgj',
    'track',
    count,
    track.name,
    track.artists,
    track.durationMs,
    track.url,
    track.image,
    track.previewUrl
  )
})

const artistList = artists.map(artist => {
  count++
  return new Artist(
    'ajfaksjgasglsalgj',
    'artist',
    count,
    artist.name,
    artist.genres,
    artist.followers,
    artist.url,
    artist.image
  )
})

export type trackType = typeof trackList[0]
export type artistType = typeof artistList[0]

export default function Navigation () {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/trackList" exact>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <SideNav />
            <ListPage listItems={trackList} />
            <div></div>
          </div>
        </Route>
        <Route path="/artistList" exact>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <SideNav />
            <ListPage listItems={artistList} />
            <div></div>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}
