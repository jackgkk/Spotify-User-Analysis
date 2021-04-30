import * as React from 'react'
import TrackCard from '../../Components/TrackCard'
import { Artist, Track } from '../../types'
import './index.scss'
import Line from '../../assets/yellowLine.svg'
import ArtistCard from '../../Components/ArtistCard'
import { artistType, trackType } from '../../navigation'
import { useHistory, useLocation } from 'react-router'
import apiMethods from '../../api/index'

interface ListPageProps {
  token: String | null
  fetchRefreshToken: () => void
  type: String
}

const isTrack = (x: any): x is trackType => x.type === 'tracks'
const isArtist = (x: any): x is artistType => x.type === 'artists'

export default function ListPage ({
  token,
  fetchRefreshToken,
  type
}: ListPageProps) {
  const history = useHistory()
  const [timeRange, setTimeRange] = React.useState('short_term')
  const [listItems, setListItems] = React.useState(['null'])

  React.useEffect(() => {
    if (token) {
      apiMethods
        .fetchTopItems(timeRange, token, type)
        .then(res => handleErrors(res))
        .then(res => {
          handleSuccess(res)
          console.log(listItems)
        })
        .catch(err => console.error(err))
    } else history.push('/')
  }, [token, type, timeRange])

  function handleErrors (res: any) {
    if (!res.ok) {
      if (res.status === 401) {
        res.json().then((res: { message: string }) => {
          if (res.message && res.message === 'invalid token') {
            fetchRefreshToken()
          } else {
            console.error('Error while fetching list data', res)
          }
        })
      } else {
        console.error('Error while fetching list data')
      }
    } else return res.json()
  }

  function handleSuccess (res: any) {
    console.log(res)
    setListItems(
      res.map(
        (e: Track) =>
          new Track(
            e.id,
            e.position,
            e.name,
            e.artists,
            e.durationMs,
            e.url,
            e.image,
            e.previewUrl
          )
      )
    )
  }

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
        {listItems.length > 0
          ? listItems.map(e => {
            if (isTrack(e)) {
              return <TrackCard key={Math.random()} track={e} />
            } else if (isArtist(e)) {
              return <ArtistCard key={Math.random()} artist={e} />
            }

            return <div key="1">Error Happened</div>
          })
          : 'no data'}
      </div>
    </div>
  )
}
