/* eslint-disable func-call-spacing */
import { faTimes, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { isTemplateExpression } from 'typescript'
import { trackType, artistType } from '../../navigation'
import { Artist, Track } from '../../types'
import LoadingBar from '../Loading'
import './index.scss'

interface Props {
  items: (Artist | Track)[] | null
  onClick: () => void
  removeAnItem: (id: string) => void
  createPlaylistBasedOnSeeds: (
    name: string,
    limit: number,
    setErrorStack: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void> | undefined
}

const isTrack = (x: any): x is trackType => x.type === 'tracks'
const isArtist = (x: any): x is artistType => x.type === 'artists'

function useOutsideAlerter (
  ref: React.RefObject<HTMLDivElement>,
  onClick: () => void
) {
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside (event: { target: any }) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick()
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

export default function CreatePlaylistWindow ({
  items,
  onClick,
  removeAnItem,
  createPlaylistBasedOnSeeds
}: Props) {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  useOutsideAlerter(wrapperRef, onClick)
  const [listOfItems, setListOfItems] = React.useState<
    (Artist | Track)[] | null
      >(null)
  const [numOfElements, setNumOfElements] = React.useState(20)
  const [nameOfPlaylist, setNameOfPlaylist] = React.useState('Cool Playlist')
  const [errorStack, setErrorStack] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  function handleNumberOnChange (event: React.ChangeEvent<HTMLInputElement>) {
    let value = parseInt(event.target.value)

    if (value > 100) {
      value = 100
      event.target.value = '100'
    }

    if (value < 0) {
      value = 0
      event.target.value = '0'
    }

    setNumOfElements(value)
  }

  function handleNameOnChange (event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value

    setNameOfPlaylist(value)
  }

  React.useEffect(() => {
    setListOfItems(items)
  }, [items])
  console.log(listOfItems)

  React.useEffect(() => setLoading(false))

  return (
    <div className="createPlaylistWindowContainer" ref={wrapperRef}>
      <div className="header">
        <div className="mobileHead">
          <h3>Create Playlist</h3>
          <FontAwesomeIcon
            id="xIcon"
            icon={faTimes}
            size="lg"
            onClick={onClick}
          />
        </div>
        <p className="playlistP">
          Generate a playlist based on 4 songs/artists you picked.
        </p>
        {errorStack
          ? (
          <p id="smallP" style={{ color: 'red' }}>
            Pick at least 1 artist/track to generate a playlist
          </p>
            )
          : (
              ''
            )}
      </div>
      <div className="content">
        {listOfItems?.map(item => {
          if (item) {
            return (
              <div key={item.id} className="itemLine">
                <img src={item.image} alt="" className="circleImage" />
                <div className="textDiv">
                  <p id="smallP">{item.name}</p>
                  <p id="artistNames">
                    {isTrack(item)
                      ? item.artists.map(e => {
                        if (
                          item.artists.indexOf(e) !==
                            item.artists.length - 1
                        ) {
                          return e + ', '
                        }

                        return e
                      })
                      : ''}
                  </p>
                </div>
                <button
                  className="bareBtn"
                  onClick={() => removeAnItem(item.id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            )
          } else return ''
        })}

        {listOfItems && listOfItems.length < 4
          ? (
          <button onClick={onClick} className="addItem">
            Add Item +
          </button>
            )
          : (
              ''
            )}
      </div>
      <div className="footer">
        <div className="numOfTracksDiv">
          <p id="smallP">Number of Tracks:</p>
          <input
            className="inputButton"
            type="number"
            max="100"
            min="0"
            defaultValue="20"
            onChange={handleNumberOnChange}
          />
        </div>

        <div className="wideDiv">
          <button
            className="smallButton"
            onClick={() => {
              setLoading(true)
              createPlaylistBasedOnSeeds(
                nameOfPlaylist,
                numOfElements,
                setErrorStack
              )
            }}
          >
            Create Playlist
          </button>
          <div className="nameDiv">
            <p id="smallP">Playlist name:</p>
            <input
              className="inputButton name"
              type="text"
              defaultValue="Cool Playlist"
              onChange={handleNameOnChange}
            />
          </div>
        </div>
      </div>
      {loading ? <LoadingBar /> : ''}
    </div>
  )
}
