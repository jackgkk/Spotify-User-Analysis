import * as React from 'react'
import LoadingBar from '../../Components/Loading'
import TrackCard from '../../Components/TrackCard'
import { Track } from '../../types'
import './index.scss'

interface PlaylistPageProps {
  listItems: Track[]
  playlistName: string
}

export default function PlaylistPage ({
  listItems,
  playlistName
}: PlaylistPageProps) {
  return (
    <div className="container">
      <div className="headerContainer">
        <div className="headerDiv">
          <h2 id="underlineText">{playlistName}</h2>
          <p>This new playlist is now available on your spotify!</p>
        </div>
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
