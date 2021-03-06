import * as React from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import artists from '../../assets/Artists.svg'
import songs from '../../assets/MusicNotes.svg'
import './index.scss'
import CricleIcon from '../../assets/yellowCircle'

export default function SideNav () {
  const history = useHistory()

  function redirect (location: string) {
    history.push(location)
  }
  console.log(history.location.pathname)

  return (
    <>
      <div className="spaceDiv"></div>
      <nav className="navBar">
        <div className="logoWrap">
          <p style={{ color: 'black' }}>logo</p>
        </div>
        <ul>
          <li>
            <button
              className="bareBtn navBtn"
              onClick={() => redirect('/artistlist')}
            >
              {history.location.pathname === '/artistlist'
                ? (
                <CricleIcon id="yellowCircle" />
                  )
                : (
                    ''
                  )}
              <CricleIcon id="whiteCircle" />

              <svg
                className="sideNavIcon"
                width="25"
                height="26"
                viewBox="0 0 25 26"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.8358 15.9245C12.884 15.2283 13.6802 14.213 14.1066 13.029C14.533 11.8451 14.5668 10.5553 14.2032 9.35056C13.8395 8.14585 13.0977 7.09022 12.0874 6.3399C11.0772 5.58959 9.8522 5.18445 8.59379 5.18445C7.33539 5.18445 6.11042 5.58959 5.10017 6.3399C4.08992 7.09022 3.34807 8.14585 2.98442 9.35056C2.62076 10.5553 2.65462 11.8451 3.08098 13.029C3.50734 14.213 4.30355 15.2283 5.35177 15.9245C3.56486 16.5837 2.02047 17.7704 0.923301 19.3272C0.840929 19.4442 0.792275 19.5816 0.782647 19.7244C0.773019 19.8672 0.802786 20.0098 0.868702 20.1368C0.934617 20.2639 1.03415 20.3703 1.15644 20.4446C1.27873 20.5189 1.41907 20.5582 1.56217 20.5582L15.6251 20.5577C15.7682 20.5577 15.9085 20.5184 16.0308 20.4441C16.1531 20.3698 16.2526 20.2633 16.3185 20.1363C16.3844 20.0092 16.4142 19.8666 16.4045 19.7238C16.3949 19.581 16.3462 19.4437 16.2638 19.3267C15.1667 17.7701 13.6225 16.5836 11.8358 15.9245Z" />
                <path d="M24.225 19.3267C23.1278 17.7701 21.5836 16.5837 19.7969 15.9246C20.9586 15.1513 21.8061 13.9888 22.187 12.6463C22.5679 11.3038 22.4571 9.86942 21.8747 8.6013C21.2922 7.33318 20.2763 6.31457 19.0097 5.72877C17.7431 5.14297 16.309 5.02844 14.9655 5.4058C14.8436 5.4401 14.7318 5.50356 14.6398 5.59069C14.5478 5.67782 14.4784 5.78601 14.4375 5.90595C14.3967 6.02588 14.3856 6.15394 14.4053 6.27911C14.4249 6.40427 14.4747 6.52278 14.5504 6.62441C15.4336 7.81073 15.9413 9.23432 16.0081 10.7118C16.075 12.1892 15.6979 13.6528 14.9255 14.9141C14.8235 15.0804 14.7874 15.2789 14.8244 15.4705C14.8613 15.6621 14.9686 15.8329 15.1252 15.9493C15.4214 16.1698 15.7064 16.4049 15.9791 16.6539C15.9931 16.6692 16.0074 16.6844 16.0229 16.6988C17.0656 17.6628 17.9107 18.8206 18.5111 20.1075C18.574 20.2422 18.674 20.3562 18.7994 20.436C18.9248 20.5159 19.0704 20.5583 19.219 20.5583L23.5863 20.5577C23.7294 20.5577 23.8697 20.5184 23.992 20.4441C24.1142 20.3697 24.2137 20.2633 24.2796 20.1363C24.3455 20.0092 24.3753 19.8666 24.3656 19.7238C24.356 19.581 24.3073 19.4437 24.2249 19.3267L24.225 19.3267Z" />
              </svg>
            </button>
          </li>
          <li>
            <button
              className="bareBtn navBtn"
              onClick={() => redirect('/tracklist')}
            >
              {history.location.pathname === '/tracklist'
                ? (
                <CricleIcon id="yellowCircle" />
                  )
                : (
                    ''
                  )}
              <CricleIcon id="whiteCircle" />

              <svg
                className="sideNavIcon"
                width="25"
                height="26"
                viewBox="0 0 25 26"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.7926 3.00878C20.6994 2.93513 20.5905 2.88401 20.4743 2.85939C20.3581 2.83478 20.2378 2.83734 20.1227 2.86687L7.62271 5.99187C7.45366 6.03401 7.30355 6.13148 7.19627 6.26876C7.08899 6.40603 7.0307 6.57525 7.03067 6.74947V17.501C6.37918 17.066 5.601 16.8611 4.81975 16.919C4.03851 16.9769 3.29901 17.2942 2.71875 17.8205C2.13849 18.3468 1.75074 19.0519 1.6171 19.8238C1.48347 20.5957 1.61162 21.3901 1.98119 22.0808C2.35076 22.7716 2.94055 23.319 3.65687 23.6361C4.37319 23.9533 5.17494 24.022 5.93476 23.8313C6.69458 23.6406 7.36888 23.2014 7.85054 22.5836C8.33219 21.9658 8.59358 21.2047 8.59317 20.4213V11.2653L19.5307 8.53093V14.376C18.8792 13.941 18.101 13.7361 17.3198 13.794C16.5385 13.8519 15.799 14.1692 15.2188 14.6955C14.6385 15.2218 14.2507 15.9269 14.1171 16.6988C13.9835 17.4707 14.1116 18.2651 14.4812 18.9558C14.8508 19.6466 15.4406 20.194 16.1569 20.5111C16.8732 20.8283 17.6749 20.897 18.4348 20.7063C19.1946 20.5156 19.8689 20.0764 20.3505 19.4586C20.8322 18.8408 21.0936 18.0797 21.0932 17.2963V3.62447C21.093 3.50577 21.0659 3.38865 21.0138 3.28199C20.9617 3.17532 20.8861 3.08189 20.7926 3.00878Z" />
              </svg>
            </button>
          </li>
        </ul>
        <div></div>
      </nav>
    </>
  )
}
