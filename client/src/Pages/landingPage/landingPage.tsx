import * as React from 'react'
import './index.scss'
import logo from '../../assets/spotifyLogo.svg'
import illustration from '../../assets/landingIlustration.svg'
import { render } from '@testing-library/react'
import apiMethods from '../../api/index'

export default function LandingPage () {
  return (
    <div className="mainWrap">
      <div className="navMenu">
        <div className="logo">Logo</div>
        <ul>
          <li>
            <a href="#">GitHub</a>
          </li>
          <li>
            <a href="#">LinkedIn</a>
          </li>
          <li>
            <a href="#">Behance</a>
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
          <button className="mainButton" onClick={apiMethods.fetchAuthCode}>
            <img
              src={logo}
              alt="small spotify logo svg"
              style={{ margin: '0 5px' }}
              id="spotLogo"
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
