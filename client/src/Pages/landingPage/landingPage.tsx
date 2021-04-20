import * as React from 'react'
import './index.scss'
import logo from '../../assets/spotifyLogo.svg'
import illustration from '../../assets/landingIlustration.svg'

export default function LandingPage () {
  return (
    <div className="mainWrap">
      <div className="navBar">
        <ul>
          <li>
            <p>GitHub</p>
          </li>
          <li>
            <p>LinkedIn</p>
          </li>
          <li>
            <p>Behance</p>
          </li>
        </ul>
      </div>
      <div className="contentWrap">
        <div className="textWrap">
          <h1>
            Explore your own music taste, and create something new based on it
          </h1>
          <p>
            Discover artists and songs you&apos;ve been listening the most to,
            and create a new playlist based on the results
          </p>
          <button className="mainButton">
            <img
              src={logo}
              alt="small spotify logo svg"
              style={{ margin: '0 5px' }}
            />
            sign in with Spotify
          </button>
        </div>
        <img src={illustration} alt="" className="illust" />
      </div>
      <div className="pieceOfSh" style={{ height: '100px' }}></div>
    </div>
  )
}
