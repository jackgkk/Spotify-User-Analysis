import * as React from 'react'
import { Artist, Track } from '../../types'
import CreatePlaylistWindow from '../CreatePlaylistWindow'
import './index.scss'

interface Props {
  items: (Artist | Track)[] | null
  onClick: () => void
}

export default function CreatePlaylistButton ({ items, onClick }: Props) {
  return (
    <div className="playlistButtonContainer">
      <button onClick={onClick} className="smallButton">
        Create Playlist
      </button>
      <div className="trackCircles">
        {items?.map(e => {
          if (e) {
            return (
              <img key={e.image} src={e.image} className="circleImage"></img>
            )
          } else return ''
        })}
      </div>
    </div>
  )
}
