import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import express, { query, Request, Response } from "express"

function compressImage(imgUrl: string) {
  const url = "http://api.resmush.it/ws.php?img=" + imgUrl

  axios.get(url).then(res => console.log(res))

  return "agsjknls"
}

export default compressImage
