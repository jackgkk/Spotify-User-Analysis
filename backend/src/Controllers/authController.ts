require("dotenv").config()
import axios, { AxiosRequestConfig } from "axios"
import express, { Request, Response } from "express"
import qs from "qs"

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const encodedData = Buffer.from(clientId + ":" + clientSecret).toString(
  "base64"
)
const redirectURI = "http://localhost:3000/trackList"
const state = "g223u3i2f20"

const authURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectURI}&scope=user-read-private%20user-read-email%20user-top-read&state=${state}`
const tokensURL = "https://accounts.spotify.com/api/token"

const getAuth = (req: Request, res: Response) => {
  axios
    .get(authURL)
    .then(response => {
      res.send(response.config.url)
    })
    .catch(() => console.log("Error fetching auth code"))
}

const getTokens = (req: Request, res: Response) => {
  const data = qs.stringify({
    grant_type: "authorization_code",
    code: req.query.code,
    redirect_uri: redirectURI
  })
  const config: AxiosRequestConfig = {
    method: "post",
    url: tokensURL,
    headers: {
      Authorization: "Basic " + encodedData
    },
    data: data
  }

  axios(config)
    .then(response =>
      res.send({
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token
      })
    )
    .catch(err => console.log("Error fetching token", err))
}

const refreshToken = (req: Request, res: Response) => {
  const data = qs.stringify({
    grant_type: "refresh_token",
    refresh_token: req.query.refresh_token
  })

  const config: AxiosRequestConfig = {
    method: "post",
    url: tokensURL,
    headers: {
      Authorization: "Basic " + encodedData
    },
    data: data
  }

  axios(config)
    .then(response => res.send({ access_token: response.data.access_token }))
    .catch(err => console.log("Error fetching refreshToken", err.response))
}

export default { getAuth, getTokens, refreshToken }
