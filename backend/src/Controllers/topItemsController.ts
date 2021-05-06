import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import express, { Request, Response } from "express"
import queryString from "querystring"
import Track from "../Models/trackModel"
import Artist from "../Models/artistModel"

const apiURL = "https://api.spotify.com/v1/me/top/"

const getTopItems = (req: Request, res: Response) => {
  const token = req.query.token
  const type = req.query.type
  const timeRange = req.query.timeRange
  const params = queryString.stringify({
    time_range: timeRange?.toString(),
    limit: 50
  })

  const config: AxiosRequestConfig = {
    method: "GET",
    url: apiURL + type + "?" + params,
    headers: {
      Authorization: "Bearer " + token
    }
  }

  axios(config)
    .then(response => {
      res.send(handleResponseObject(response.data.items))
    })
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
        console.log("Error geting top artists", err)
      }
    })
}

function handleResponseObject(items: any) {
  let position = 0
  if (items[0].type === "track")
    return items.map((e: any) => {
      position++
      return new Track(
        e.id,
        position,
        e.name,
        e.artists.map((a: { name: String }) => a.name),
        e.duration_ms,
        e.external_urls.spotify,
        e.album.images[1].url,
        e.preview_url
      )
    })
  else if (items[0].type === "artist")
    return items.map((e: any) => {
      position++
      return new Artist(
        e.id,
        position,
        e.name,
        e.genres.slice(0, 3),
        e.followers.total,
        e.external_urls.spotify,
        e.images[1].url
      )
    })
}

export default { getTopItems, handleResponseObject }
