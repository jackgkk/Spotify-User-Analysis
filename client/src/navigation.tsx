import * as React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import artists from './Components/ArtistCard/data'
import CreatePlaylistWindow from './Components/CreatePlaylistWindow'
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
  const [token, setToken] = React.useState(localStorage.getItem('accessToken'))

  function fetchToken (code: string | string[]) {
    localStorage.setItem('authCode', code.toString())
    fetch(`/auth?code=${code}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        window.localStorage.setItem('accessToken', res.access_token)
        window.localStorage.setItem('refreshToken', res.refresh_token)

        setToken(res.access_token)
      })
      .catch(() => console.log('Error while fetching the token'))
  }

  function fetchRefreshToken () {
    fetch(
      `/auth/refresh?refresh_token=${localStorage.getItem('refreshToken')}`,
      {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(res => res.json())
      .then(res => {
        window.localStorage.setItem('accessToken', res.access_token)
        setToken(res.access_token)
        console.log('new refreshed token:', token)
      })
      .catch(() => console.log('Error while fetching the refresh token'))
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {token
            ? (
            <Redirect to="/tracklist" />
              )
            : (
            <LandingPage token={token} fetchToken={fetchToken} />
              )}
        </Route>
        <Route path="/trackList" exact>
          {!token
            ? (
            <Redirect to="/" />
              )
            : (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <SideNav />
              <ListPage
                token={token}
                fetchRefreshToken={fetchRefreshToken}
                type="tracks"
              />
              <div></div>
            </div>
              )}
        </Route>
        <Route path="/artistList" exact>
          {!token
            ? (
            <Redirect to="/" />
              )
            : (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <SideNav />
              <ListPage
                token={token}
                fetchRefreshToken={fetchRefreshToken}
                type="artists"
              />
              <div></div>
            </div>
              )}
        </Route>
        <Route path="/ggg" exact></Route>
      </Switch>
    </Router>
  )
}
