import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Artist, Track } from '../../types'
import CreatePlaylistWindow from '../CreatePlaylistWindow'
import './index.scss'

interface Props {
  items: (Artist | Track)[] | null
  onClick: () => void
  logOut: () => void
}

export default function CreatePlaylistButton ({
  items,
  onClick,
  logOut
}: Props) {
  const history = useHistory()
  return (
    <>
      <div className="spaceDiv2"></div>

      <div className="headerButtons">
        <button onClick={logOut} id="logoutBtn" className="smallButton">
          Log Out
        </button>

        <div className="playlistButtonContainer">
          <button onClick={onClick} className="smallButton">
            Create Playlist
          </button>
          <div className="trackCircles">
            {items?.map(e => {
              if (e) {
                return (
                  <img
                    key={e.image}
                    src={e.image}
                    className="circleImage"
                  ></img>
                )
              } else return ''
            })}
          </div>
        </div>
      </div>
    </>
  )
}
