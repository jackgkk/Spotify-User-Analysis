/* eslint-disable func-call-spacing */
import { faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { isTemplateExpression } from 'typescript'
import { trackType, artistType } from '../../navigation'
import { Artist, Track } from '../../types'
import './index.scss'

interface Props {
  items: (Artist | Track)[] | null
  onClick: () => void
  removeAnItem: (id: string) => void
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
  removeAnItem
}: Props) {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  useOutsideAlerter(wrapperRef, onClick)
  const [listOfItems, setListOfItems] = React.useState<
    (Artist | Track)[] | null
      >(null)

  React.useEffect(() => {
    setListOfItems(items)
  }, [items])
  console.log(listOfItems)

  return (
    <div className="createPlaylistWindowContainer" ref={wrapperRef}>
      <div className="header">
        <h3>Create Playlist</h3>
        <p className="playlistP">
          Generate a playlist based on 5 songs/artists you picked.
        </p>
      </div>
      <div className="content">
        {listOfItems?.map(item => {
          if (item) {
            return (
              <div key={item.id} className="itemLine">
                <img src={item.image} alt="" className="circleImage" />
                <div className="textDiv">
                  <p>{item.name}</p>
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

        {listOfItems && listOfItems.length < 5
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
        <button className="smallButton">Create Playlist</button>
      </div>
    </div>
  )
}
