import axios, { AxiosRequestConfig } from "axios"
import express, { Request, Response } from "express"
import queryString from "querystring"

const apiURL = "https://api.spotify.com/v1/me/top/"

const getTopItems = (req: Request, res: Response) => {
  const token = req.query.token
  const type = req.query.type
  const timeRange = req.query.timeRange
  const params = queryString.stringify({ time_range: timeRange?.toString() })

  const config: AxiosRequestConfig = {
    method: "GET",
    url: apiURL + type + "?" + params,
    headers: {
      Authorization: "Bearer " + token
    }
  }

  axios(config)
    .then(response => console.log(response.data))
    .catch(err => {
      if (err.response) {
        // Request made and server responded
        if (err.response.data.error.message === "Invalid access token") {
          res.status(400).send({ message: "invalid token" })
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

export default { getTopItems }
