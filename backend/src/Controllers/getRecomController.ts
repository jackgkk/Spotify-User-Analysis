import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import express, { Request, Response } from "express"

function getRecommendedItems(req:Request, res:Response){
    const token = req.query.token
    const limit = req.query.limit
    const seedTracks = req.query.seedTracks
    const seedArtists = req.query.seedArtists
    const url = 'https://api.spotify.com/v1/recommendations'

    const queryParam = url + '?'

    axios.get(url, {
        headers: {
            Authorization: "Bearer " + token
        }
    }, )

}

export default {getRecommendedItems}