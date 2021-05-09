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
import tracks from '../../Components/TrackCard/data'
import { Dispatch, SetStateAction } from 'react'

interface ListPageProps {
  token: String | null
  fetchRefreshToken: () => void
  type: String
  setPlaylistItems: Dispatch<SetStateAction<Track[]>>
  setPlaylistName: Dispatch<SetStateAction<string>>
  setPlaylistUrl: Dispatch<SetStateAction<string>>
  logOut: () => void
}

const isTrack = (x: any): x is trackType => x.type === 'tracks'
const isArtist = (x: any): x is artistType => x.type === 'artists'
const globalPickedItems = [] as Array<Artist | Track>

export default function ListPage ({
  token,
  fetchRefreshToken,
  type,
  setPlaylistItems,
  setPlaylistName,
  logOut,
  setPlaylistUrl
}: ListPageProps) {
  const history = useHistory()
  const [timeRange, setTimeRange] = React.useState('short_term')
  const [listItems, setListItems] = React.useState<(Artist | Track)[]>([])
  const buttonsRef = React.useRef<HTMLDivElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)
  const [pickedItems, setPickedItems] = React.useState<Array<Artist | Track>>(
    globalPickedItems
  )

  React.useEffect(() => {
    setListItems(new Array(0))
    if (token) {
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
            return fetchRefreshToken()
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
    if (type === 'tracks') {
      setListItems(
        res.map((e: Track) => {
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
    }
    if (pickedItems.length > 3) {
      alert('Maximum of 4 items allowed to pick')
    } else {
      if (pickedItems.filter(i => i.id === item.id).length === 0) {
        setPickedItems([...pickedItems, item])
        pickedItems.length = 0
        pickedItems.forEach(i => globalPickedItems.push(i))
      }
    }
  }

  function removeAnItem (id: string) {
    if (pickedItems.length < 1) {
      alert('something went wrong, reload the page')
    } else {
      setPickedItems(pickedItems.filter(item => item.id !== id))
      pickedItems.length = 0
      pickedItems.forEach(i => globalPickedItems.push(i))
    }
  }

  function createPlaylistBasedOnSeeds (
    name: string,
    limit: number,
    setErrorStack: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    const seedTracks: string[] = []
    const seedArtists: string[] = []
    setPlaylistName(name)
    pickedItems?.forEach(i => {
      if (i.type === 'tracks') seedTracks.push(i.id)
      if (i.type === 'artists') seedArtists.push(i.id)
    })

    if (seedArtists.length === 0 && seedTracks.length === 0) {
      setErrorStack(true)
    } else {
      return fetch(
        `/recommended?token=${token}&seedTracks=${seedTracks}&seedArtists=${seedArtists}&name=${name}&limit=${limit}`
      )
        .then(handleErrors)
        .then(res => {
          handleSuccessPlaylist(res)
          history.push('/myPlaylist')
        })
        .catch(err => {
          console.error(err)
          history.push('/')
        })
    }
  }

  function handleSuccessPlaylist (res: any) {
    if (!res.playlistUrl || !res.trackList) {
      console.error('error creating a playlist')
      history.push('/')
    } else {
      setPlaylistUrl(res.playlistUrl)
      setPlaylistItems(
        res.trackList.map((e: Track) => {
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
                setListItems([])

                setTimeRange('short_term')
              }}
            >
              1 month
            </button>
            <button
              className="switchButton"
              onClick={() => {
                setListItems([])
                setTimeRange('medium_term')
              }}
            >
              6 months
            </button>
            <button
              className="switchButton"
              onClick={() => {
                setListItems([])
                setTimeRange('long_term')
              }}
            >
              All time
            </button>
          </div>
        </div>
        <CreatePlaylist
          createPlaylistBasedOnSeeds={createPlaylistBasedOnSeeds}
          items={pickedItems}
          removeAnItem={removeAnItem}
          logOut={logOut}
        />
      </div>

      <div className="listWrap" ref={listRef}>
        {listItems.length > 0 && listItems[0].type === type
          ? (
              listItems.map(e => {
                if (isTrack(e)) {
                  return (
                <TrackCard
                  key={Math.random()}
                  track={e}
                  pickAnItem={pickAnItem}
                  pickedItems={pickedItems}
                  removeAnItem={removeAnItem}
                />
                  )
                } else if (isArtist(e)) {
                  return (
                <ArtistCard
                  key={Math.random()}
                  artist={e}
                  pickAnItem={pickAnItem}
                  pickedItems={pickedItems}
                  removeAnItem={removeAnItem}
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
