import * as React from "react"
import { Artist, Track } from "../../types"
import CreatePlaylistButton from "../CreatePlaylistButton"
import CreatePlaylistWindow from "../CreatePlaylistWindow"

interface Props {
  items: (Artist | Track)[] | null
  removeAnItem: (item: Artist | Track) => void
  createPlaylistBasedOnSeeds: (
    name: string,
    limit: number,
    setErrorStack: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void> | undefined
  logOut: () => void
}

export default function CreatePlaylist({
  createPlaylistBasedOnSeeds,
  items,
  removeAnItem,
  logOut
}: Props) {
  const [togglePopup, setTogglePopup] = React.useState(false)

  return (
    <>
      {!togglePopup ? (
        <CreatePlaylistButton
          items={items}
          onClick={() => setTogglePopup(true)}
          logOut={logOut}
        />
      ) : (
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
