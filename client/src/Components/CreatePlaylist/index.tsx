import * as React from 'react'
import { Artist, Track } from '../../types'
import CreatePlaylistButton from '../CreatePlaylistButton'
import CreatePlaylistWindow from '../CreatePlaylistWindow'

interface Props {
  items: (Artist | Track)[] | null
  removeAnItem: (id: string) => void
}

export default function CreatePlaylist ({ items, removeAnItem }: Props) {
  const [togglePopup, setTogglePopup] = React.useState(false)

  return (
    <>
      {!togglePopup
        ? (
        <CreatePlaylistButton
          items={items}
          onClick={() => setTogglePopup(true)}
        />
          )
        : (
        <CreatePlaylistWindow
          items={items}
          onClick={() => setTogglePopup(false)}
          removeAnItem={removeAnItem}
        />
          )}
    </>
  )
}
