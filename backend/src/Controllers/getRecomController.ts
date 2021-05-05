import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import express, { Request, Response } from "express"
import { create } from "node:domain"
import { send } from "node:process"

function getRecommendedItems(req: Request, res: Response) {
  const token = req.query.token
  const limit = req.query.limit
  const name = req.query.name
  const seedTracks = req.query.seedTracks
  const seedArtists = req.query.seedArtists
  const url = "https://api.spotify.com/v1/recommendations"

  const queryParams =
    url +
    "?" +
    "seed_artists=" +
    seedArtists +
    "&seed_tracks=" +
    seedTracks +
    "&seed_genres=-" +
    "&limit=" +
    limit

  axios
    .get(queryParams, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(response =>
      createAndAddItemsToPlaylist(token!.toString(), response, name!.toString())
        .then(response => res.status(200).send)
        .catch(err => console.log(err))
    )
    .catch(err => {
      if (err.response) {
        // Request made and server responded
        const message = err.response.data.error.message

        if (message === "The access token expired") {
          res.status(401).send({ message: "invalid token" })
        } else {
          console.error("error getting the token", err.response)
          res.status(401).send({ message: message })
        }
      } else if (err.request) {
        // The request was made but no response was received
        console.log(err.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", err.message)
      }
    })
}

function handleTrackUri(res: AxiosResponse) {
  const trackUris: string[] = []
  res.data.tracks.forEach((e: any) => trackUris.push(e.uri))

  return trackUris
}

async function createPlaylist(userId: string, name: string, token: string) {
  let playlistId = null
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`
  const body = {
    name: name
  }

  const config: AxiosRequestConfig = {
    method: "POST",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application-json"
    },
    data: body
  }
  await axios(config)
    .then(res => (playlistId = res.data.id))
    .catch(err => console.log(err.response, "error creating playlist"))

  return playlistId
}

async function getUserId(token: string) {
  const url = "https://api.spotify.com/v1/me"

  let userId = null
  const config: AxiosRequestConfig = {
    method: "GET",
    url: url,
    headers: {
      Authorization: "Bearer " + token
    }
  }
  await axios(config)
    .then(res => (userId = res.data.id))
    .catch(err => console.log(err.response, "error getting user_id"))

  return userId
}

function addItemsToPlaylist(
  trackUris: string[],
  playlistId: string,
  token: string
) {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
  const params = url + "?uris=" + trackUris

  const config: AxiosRequestConfig = {
    method: "POST",
    url: params,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application-json"
    }
  }

  return axios(config)
}

async function createAndAddItemsToPlaylist(
  token: string,
  res: AxiosResponse,
  name: string
) {
  const trackUris = handleTrackUri(res)
  if (trackUris.length === 0) console.error("Error when saving track URI's")
  else {
    const userId = await getUserId(token)
    if (userId) {
      const playlistId = await createPlaylist(userId, name, token)
      if (playlistId) {
        return addItemsToPlaylist(trackUris, playlistId, token)
      } else console.error("Cannot get playlist id")
    } else console.error("Cannot get user id")
  }
}

export default { getRecommendedItems }
