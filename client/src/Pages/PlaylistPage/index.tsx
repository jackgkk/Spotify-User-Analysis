import * as React from 'react'
import { useHistory } from 'react-router-dom'
import LoadingBar from '../../Components/Loading'
import TrackCard from '../../Components/TrackCard'
import { Track } from '../../types'
import './index.scss'

interface PlaylistPageProps {
  listItems: Track[]
  playlistName: string
  playlistUrl: string
}

export default function PlaylistPage ({
  listItems,
  playlistName,
  playlistUrl
}: PlaylistPageProps) {
  const history = useHistory()
  return (
    <div className="container">
      <div className="headerContainer">
        <div className="headerDiv">
          <h2 id="underlineText">{playlistName}</h2>
          <p>This new playlist is now available on your spotify!</p>
        </div>
        <>
          <div className="spaceDiv2"></div>

          <div className="headerButtons">
            <button
              onClick={() => (window.location.href = playlistUrl)}
              className="smallButton"
            >
              Open on Spotify
            </button>

            <button onClick={() => history.push('/')} className="smallButton">
              Go Back
            </button>
          </div>
        </>
      </div>

      <div className="listWrap">
        {listItems.length > 0
          ? (
              listItems.map(e => <TrackCard key={Math.random()} track={e} />)
            )
          : (
          <div className="loadingContainer">
            <LoadingBar />
          </div>
            )}
      </div>
    </div>
  )
}
