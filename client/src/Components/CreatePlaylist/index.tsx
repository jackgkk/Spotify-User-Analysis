import * as React from 'react'
import { Artist, Track } from '../../types'
import CreatePlaylistButton from '../CreatePlaylistButton'
import CreatePlaylistWindow from '../CreatePlaylistWindow'

interface Props {
  items: (Artist | Track)[] | null
  removeAnItem: (id: string) => void
  createPlaylistBasedOnSeeds: (
    name: string,
    limit: number,
    setErrorStack: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void> | undefined
}

export default function CreatePlaylist ({
  createPlaylistBasedOnSeeds,
  items,
  removeAnItem
}: Props) {
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
          createPlaylistBasedOnSeeds={createPlaylistBasedOnSeeds}
        />
          )}
    </>
  )
}
