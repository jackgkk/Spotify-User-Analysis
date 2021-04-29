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
        console.log(token)
      })
      .catch(() => console.log('Error while fetching the refresh token'))
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/trackList" exact>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <SideNav />
            <ListPage
              token={token}
              listItems={trackList}
              fetchToken={fetchToken}
              fetchRefreshToken={fetchRefreshToken}
            />
            <div></div>
          </div>
        </Route>
        <Route path="/artistList" exact>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <SideNav />
            <ListPage
              token={token}
              listItems={artistList}
              fetchToken={fetchToken}
              fetchRefreshToken={fetchRefreshToken}
            />
            <div></div>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}
