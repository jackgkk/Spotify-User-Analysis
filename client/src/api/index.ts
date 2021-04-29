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
  }).then(res => res.json())
}

export default { fetchTopItems, fetchAuthCode }
