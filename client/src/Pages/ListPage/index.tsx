import * as React from 'react'
import TrackCard from '../../Components/TrackCard'
import { Artist, Track } from '../../types'
import './index.scss'
import Line from '../../assets/yellowLine.svg'
import ArtistCard from '../../Components/ArtistCard'
import { artistType, trackType } from '../../navigation'
import { useHistory, useLocation } from 'react-router'
import apiMethods from '../../api/index'
import LoadingBar from '../../Components/Loading'
import CreatePlaylistButton from '../../Components/CreatePlaylistButton'
import CreatePlaylistWindow from '../../Components/CreatePlaylistWindow'
import CreatePlaylist from '../../Components/CreatePlaylist'

interface ListPageProps {
  token: String | null
  fetchRefreshToken: () => void
  type: String
}

const isTrack = (x: any): x is trackType => x.type === 'tracks'
const isArtist = (x: any): x is artistType => x.type === 'artists'
const audioElements = [] as Array<HTMLAudioElement>

export default function ListPage ({
  token,
  fetchRefreshToken,
  type
}: ListPageProps) {
  const history = useHistory()
  const [timeRange, setTimeRange] = React.useState('short_term')
  const [listItems, setListItems] = React.useState([])
  const buttonsRef = React.useRef<HTMLDivElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)
  const [pickedItems, setPickedItems] = React.useState<Array<Artist | Track>>(
    []
  )

  React.useEffect(() => {
    if (token) {
      setListItems([])
      apiMethods
        .fetchTopItems(timeRange, token, type)
        .then(res => handleErrors(res))
        .then(res => {
          handleSuccess(res)
        })
        .catch(err => {
          console.error(err)
          history.push('/')
        })
    } else history.push('/')

    switch (timeRange) {
      case 'short_term':
        if (buttonsRef && buttonsRef.current) {
          buttonsRef.current.children[1]!.id = ''
          buttonsRef.current.children[2]!.id = ''

          buttonsRef.current.children[0]!.id = 'activated'
        }
        break
      case 'medium_term':
        if (buttonsRef && buttonsRef.current) {
          buttonsRef.current.children[0]!.id = ''
          buttonsRef.current.children[2]!.id = ''

          buttonsRef.current.children[1]!.id = 'activated'
        }
        break
      case 'long_term':
        if (buttonsRef && buttonsRef.current) {
          buttonsRef.current.children[0]!.id = ''
          buttonsRef.current.children[1]!.id = ''

          buttonsRef.current.children[2]!.id = 'activated'
        }
        break
    }
  }, [timeRange, token, type])

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
    if (listRef && listRef.current) {
      listRef.current.id = 'animateRender'
    }
    console.log('huj')
    if (type === 'tracks') {
      setListItems(
        res.map((e: Track) => {
          // audioElements.push(new Audio(e.previewUrl))
          return new Track(
            e.id,
            e.position,
            e.name,
            e.artists,
            e.durationMs,
            e.url,
            e.image,
            e.previewUrl
          )
        })
      )
    } else if (type === 'artists') {
      setListItems(
        res.map(
          (e: Artist) =>
            new Artist(
              e.id,
              e.position,
              e.name,
              e.genres,
              e.followers,
              e.url,
              e.image
            )
        )
      )
    }
  }

  function pickAnItem (item: Track | Artist) {
    if (listRef && listRef.current) {
      listRef.current.id = ''
      console.log('niehuj')
    }
    if (pickedItems.length > 4) {
      alert('Maximum of 5 items allowed to pick')
    } else {
      if (pickedItems.filter(i => i.id === item.id).length === 0) {
        setPickedItems([...pickedItems, item])
      }
    }
  }

  function removeAnItem (id: string) {
    if (pickedItems.length < 1) {
      alert('something went wrong, reload the page')
    } else {
      setPickedItems(pickedItems.filter(item => item.id !== id))
    }
  }

  return (
    <div className="container">
      <div className="headerContainer">
        <div className="headerDiv">
          <h2 id="underlineText">
            List of {type === 'tracks' ? 'Tracks' : 'Artists'}
            <img src={Line} alt="" />
          </h2>
          {type === 'tracks'
            ? (
            <p>Tracks that were popular among your ears in the last:</p>
              )
            : (
            <p>Artists you couldn’t get enough of in the last:</p>
              )}

          <div className="switchBtns" ref={buttonsRef}>
            <button
              className="switchButton"
              onClick={() => {
                setTimeRange('short_term')
              }}
            >
              1 month
            </button>
            <button
              className="switchButton"
              onClick={() => setTimeRange('medium_term')}
            >
              6 months
            </button>
            <button
              className="switchButton"
              onClick={() => setTimeRange('long_term')}
            >
              All time
            </button>
          </div>
        </div>
        <CreatePlaylist items={pickedItems} removeAnItem={removeAnItem} />
      </div>

      <div className="listWrap" ref={listRef}>
        {listItems.length > 0
          ? (
              listItems.map(e => {
                if (isTrack(e)) {
                  return (
                <TrackCard
                  key={Math.random()}
                  track={e}
                  audioElements={audioElements}
                  pickAnItem={pickAnItem}
                  pickedItems={pickedItems}
                />
                  )
                } else if (isArtist(e)) {
                  return (
                <ArtistCard
                  key={Math.random()}
                  artist={e}
                  pickAnItem={pickAnItem}
                  pickedItems={pickedItems}
                />
                  )
                }

                return 'Error Happend'
              })
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
