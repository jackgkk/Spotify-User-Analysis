"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var axios_1 = __importDefault(require("axios"));
var qs_1 = __importDefault(require("qs"));
var clientId = process.env.CLIENT_ID;
var clientSecret = process.env.CLIENT_SECRET;
var encodedData = Buffer.from(clientId + ":" + clientSecret).toString("base64");
//const redirectURI = "http://192.168.43.90:3000/"
var redirectURI = "http://192.168.1.2:3000/";
var state = "g223u3i2f20";
var authURL = "https://accounts.spotify.com/authorize?client_id=" + clientId + "&response_type=code&redirect_uri=" + redirectURI + "&scope=user-read-private%20playlist-modify-private%20playlist-modify-public%20user-read-email%20user-top-read&state=" + state;
var tokensURL = "https://accounts.spotify.com/api/token";
var getAuth = function (req, res) {
    axios_1.default
        .get(authURL)
        .then(function (response) {
        res.send(response.config.url);
    })
        .catch(function () { return console.log("Error fetching auth code"); });
};
var getTokens = function (req, res) {
    var data = qs_1.default.stringify({
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: redirectURI
    });
    var config = {
        method: "post",
        url: tokensURL,
        headers: {
            Authorization: "Basic " + encodedData
        },
        data: data
    };
    axios_1.default(config)
        .then(function (response) {
        return res.send({
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token
        });
    })
        .catch(function (err) { return console.log("Error fetching token", err); });
};
var refreshToken = function (req, res) {
    var data = qs_1.default.stringify({
        grant_type: "refresh_token",
        refresh_token: req.query.refresh_token
    });
    var config = {
        method: "post",
        url: tokensURL,
        headers: {
            Authorization: "Basic " + encodedData
        },
        data: data
    };
    axios_1.default(config)
        .then(function (response) { return res.send({ access_token: response.data.access_token }); })
        .catch(function (err) { return console.log("Error fetching refreshToken", err.response); });
};
exports.default = { getAuth: getAuth, getTokens: getTokens, refreshToken: refreshToken };
