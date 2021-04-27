import * as React from 'react'
import Play from '../../assets/PlayButton.svg'
import Plus from '../../assets/PlusButton.svg'
import { Track } from '../../types'
import './index.scss'

interface TrackCardProps {
  track: Track
}

function msToHMS (ms: number) {
  let seconds = ms / 1000

  seconds = seconds % 3600
  const minutes = seconds / 60
  seconds = seconds % 60
  return Math.floor(minutes) + ':' + Math.floor(seconds)
}

export default function TrackCard ({ track }: TrackCardProps) {
  return (
    <div className="trackCard-component">
      <div className="cardContainer">
        <p className="positionNumber">{track.position}</p>
        <div className="cardWrap">
          <div className="imageDiv">
            <img src={track.image} alt="" id="albumImage" />
            <img src={Play} alt="" className="playBtn" />
          </div>
          <div className="mainContent">
            <img src={track.image} alt="" id="albumImageBlured" />
            <div className="glassDiv"></div>
            <div className="textContentWrap">
              <h4>{track.name}</h4>
              <h5>
                {track.artists.map(e => {
                  if (track.artists.indexOf(e) !== track.artists.length - 1) {
                    return e + ', '
                  }

                  return e
                })}
              </h5>
              <p>{msToHMS(track.durationMs)}</p>
            </div>
            <div className="footerButtons">
              <button className="bareBtn openBtn">open</button>
              <button className="bareBtn plusBtn ">
                <img src={Plus} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
