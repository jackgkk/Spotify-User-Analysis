import * as React from 'react'
import Play from '../../assets/PlayButton.svg'
import Plus from '../../assets/PlusButton.svg'
import { Artist, Track } from '../../types'
import tracks from './data'
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPause } from '@fortawesome/free-solid-svg-icons'

interface TrackCardProps {
  track: Track
  audioElements: HTMLAudioElement[]
  pickAnItem: (item: Track | Artist) => void
  pickedItems: (Track | Artist)[]
}

function msToHMS (ms: number) {
  const minutes = Math.floor(ms / 60000)
  const seconds = ((ms % 60000) / 1000).toFixed(0)
  return minutes + ':' + (parseInt(seconds) < 10 ? '0' : '') + seconds
}

export default function TrackCard ({
  track,
  audioElements,
  pickAnItem,
  pickedItems
}: TrackCardProps) {
  const [audio] = React.useState(new Audio(track.previewUrl))
  const [playing, setPlaying] = React.useState(false)

  const toggleAudio = () => {
    setPlaying(!playing)
  }

  function openTackPage () {
    const newWindow = window.open(track.url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  React.useEffect(() => {
    if (playing) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [playing])

  React.useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false))
    return () => {
      audio.pause()
      audio.removeEventListener('ended', () => setPlaying(false))
    }
  }, [])

  return (
    <div className="trackCard-component">
      <div className="cardContainer">
        <p className="positionNumber">{track.position}</p>
        <div className="cardWrap">
          <div className="imageDiv" onClick={toggleAudio}>
            <img src={track.image} alt="" id="albumImage" />
            {playing
              ? (
              <FontAwesomeIcon
                className="playBtn"
                icon={faPause}
                color="white"
              />
                )
              : (
              <img src={Play} alt="" className="playBtn" />
                )}
          </div>
          <div className="mainContent">
            <img src={track.image} alt="" id="albumImageBlured" />
            <div className="glassDiv"></div>
            <div className="textContentWrap">
              <div className="animationTextWrapper">
                <h4>{track.name}</h4>
              </div>
              <div className="animationTextWrapper">
                <h5>
                  {track.artists.map(e => {
                    if (track.artists.indexOf(e) !== track.artists.length - 1) {
                      return e + ', '
                    }

                    return e
                  })}
                </h5>
              </div>

              <p>{msToHMS(track.durationMs)}</p>
            </div>
            <div className="footerButtons">
              <button className="bareBtn openBtn" onClick={openTackPage}>
                open
              </button>
              <button
                className="bareBtn plusBtn "
                onClick={() => pickAnItem(track)}
              >
                {pickedItems.filter(i => i.id === track.id).length === 0
                  ? (
                  <img src={Plus} alt="" />
                    )
                  : (
                  <FontAwesomeIcon icon={faCheck} color="white" />
                    )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
