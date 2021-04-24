import * as React from 'react'
import { FunctionExpression } from 'typescript'
import { Artist } from '../../types'
import artists from './data'
import Plus from '../../assets/PlusButton.svg'
import './index.scss'

interface ArtistCardProps {
  artist: Artist
}

const ranges = [
  { divider: 1e6, suffix: 'M' },
  { divider: 1e3, suffix: 'K' }
]

function roundToTwo (num: number) {
  const newNum = num + 'e+1'
  return +(Math.round(parseFloat(newNum)) + 'e-1')
}

function formatNumber (n: number) {
  for (let i = 0; i < ranges.length; i++) {
    if (n >= ranges[i].divider) {
      return roundToTwo(n / ranges[i].divider).toString() + ranges[i].suffix
    }
  }
  return n.toString()
}

export default function ArtistCard ({ artist }: ArtistCardProps) {
  return (
    <div className="artistCard-component">
      <div className="cardContainer">
        <p className="positionNumber">{artist.position}</p>
        <div className="cardWrap">
          <div className="imageDiv">
            <img src={artist.image} alt="" id="albumImage" />
          </div>
          <div className="mainContent">
            <img src={artist.image} alt="" id="albumImageBlured" />
            <div className="glassDiv"></div>
            <div className="textWrap">
              <h4>{artist.name}</h4>
              <p>
                {artist.genres.map(e => {
                  if (artist.genres.indexOf(e) !== artist.genres.length - 1) {
                    return e + ', '
                  }

                  return e
                })}
              </p>
              <p>
                <span id="followers">{formatNumber(artist.followers)}</span>{' '}
                followers
              </p>
            </div>
            <div className="footerButtons">
              <button className="bareBtn openBtn">open</button>
              <button className="bareBtn plusBtn ">
                <img src={Plus} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
