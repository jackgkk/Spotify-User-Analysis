import * as React from 'react'
import TrackCard from '../../Components/TrackCard'
import { Artist, Track } from '../../types'
import './index.scss'
import Line from '../../assets/yellowLine.svg'
import ArtistCard from '../../Components/ArtistCard'
import { artistType, trackType } from '../../navigation'

interface ListPageProps {
  listItems: (Track | Artist)[]
}

export default function ListPage ({ listItems }: ListPageProps) {
  const isTrack = (x: any): x is trackType => x.type === 'track'
  const isArtist = (x: any): x is artistType => x.type === 'artist'
  return (
    <div className="container">
      <div className="headerDiv">
        <h2 id="underlineText">
          List of {isTrack(listItems[0]) ? 'Tracks' : 'Artists'}
          <img src={Line} alt="" />
        </h2>
        {isTrack(listItems[0])
          ? (
          <p>Tracks that were popular among your ears in the last:</p>
            )
          : (
          <p>Artists you couldn’t get enough of in the last:</p>
            )}

        <div className="switchBtns">
          <button className="switchButton">1 month</button>
          <button className="switchButton">6 months</button>
          <button className="switchButton">All time</button>
        </div>
      </div>

      <div className="listWrap">
        {listItems.map(e => {
          if (isTrack(e)) {
            return <TrackCard key={Math.random()} track={e} />
          } else if (isArtist(e)) {
            return <ArtistCard key={Math.random()} artist={e} />
          }

          return <div key="1">Error Happened</div>
        })}
      </div>
    </div>
  )
}
