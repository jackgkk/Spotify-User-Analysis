import * as React from 'react'
import TrackCard from '../../Components/TrackCard'
import { Track } from '../../types'
import './index.scss'
import Line from '../../assets/yellowLine.svg'

interface ListPageProps {
  tracks: Track[]
}

export default function ListPage ({ tracks }: ListPageProps) {
  return (
    <div className="container">
      <div className="headerDiv">
        <h2 id="underlineText">
          List of Tracks <img src={Line} alt="" />
        </h2>
        <p>Tracks that were popular among your ears in the last:</p>
        <div className="switchBtns">
          <button className="switchButton">1 month</button>
          <button className="switchButton">6 months</button>
          <button className="switchButton">All time</button>
        </div>
      </div>

      <div className="listWrap">
        {tracks.map(e => {
          return <TrackCard key={e.previewUrl} track={e} />
        })}
      </div>
    </div>
  )
}
