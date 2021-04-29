import * as React from 'react'
import TrackCard from '../../Components/TrackCard'
import { Artist, Track } from '../../types'
import './index.scss'
import Line from '../../assets/yellowLine.svg'
import ArtistCard from '../../Components/ArtistCard'
import { artistType, trackType } from '../../navigation'
import { useHistory, useLocation } from 'react-router'
import queryString from 'querystring'
import apiMethods from '../../api/index'

interface ListPageProps {
  listItems: (Track | Artist)[]
  token: String | null
  fetchToken: (code: string | string[]) => void
  fetchRefreshToken: () => void
}

const isTrack = (x: any): x is trackType => x.type === 'tracks'
const isArtist = (x: any): x is artistType => x.type === 'artists'

export default function ListPage ({
  listItems,
  token,
  fetchToken,
  fetchRefreshToken
}: ListPageProps) {
  const location = useLocation()
  const [timeRange, setTimeRange] = React.useState('short_term')

  React.useEffect(() => {
    if (!token) {
      const query = queryString.parse(location.search)
      if (query['?code']) {
        fetchToken(query['?code'])
      }
      if (query['?error']) {
        console.log('error')
      }
    } else {
      apiMethods.fetchTopItems(timeRange, token, 'tracks').then(res => {
        if (!res.ok) {
          if (res.message && res.message === 'invalid token') {
            fetchRefreshToken()
          }
        } else {
          console.log(res)
        }
      })
    }
  }, [])

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
