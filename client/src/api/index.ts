import { Artist, Track } from '../types'

function fetchAuthCode () {
  fetch('/auth', {
    method: 'GET',
    headers: {
      'Content-Type': 'text/html'
    }
  })
    .then(res => res.text())
    .then(res => (window.location.href = res))
    .catch(() => console.log('Error while fetching the auth code'))
}

function fetchTopItems (timeRange: String, token: String, type: String) {
  return fetch(`/topItems?timeRange=${timeRange}&token=${token}&type=${type}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // .then(res =>
  //   res.ok
  //     ? res.json()
  //     : res.json().then(res => {
  //       res.status = 401
  //       return res
  //     })
  // )
}

export default { fetchTopItems, fetchAuthCode }
