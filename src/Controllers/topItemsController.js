"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var querystring_1 = __importDefault(require("querystring"));
var trackModel_1 = __importDefault(require("../Models/trackModel"));
var artistModel_1 = __importDefault(require("../Models/artistModel"));
var apiURL = "https://api.spotify.com/v1/me/top/";
var getTopItems = function (req, res) {
    var token = req.query.token;
    var type = req.query.type;
    var timeRange = req.query.timeRange;
    var params = querystring_1.default.stringify({
        time_range: timeRange === null || timeRange === void 0 ? void 0 : timeRange.toString(),
        limit: 50
    });
    var config = {
        method: "GET",
        url: apiURL + type + "?" + params,
        headers: {
            Authorization: "Bearer " + token
        }
    };
    axios_1.default(config)
        .then(function (response) {
        res.send(handleResponseObject(response.data.items));
    })
        .catch(function (err) {
        if (err.response) {
            // Request made and server responded
            var message = err.response.data.error.message;
            if (message === "The access token expired") {
                res.status(401).send({ message: "invalid token" });
            }
            else {
                console.error("error getting the token", err.response);
                res.status(401).send({ message: message });
            }
        }
        else if (err.request) {
            // The request was made but no response was received
            console.log(err.request);
        }
        else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error geting top artists", err);
        }
    });
};
function handleResponseObject(items) {
    var position = 0;
    if (items[0].type === "track")
        return items
            .filter(function (e) { return e.album.images[1] != undefined; })
            .map(function (e) {
            if (e.album.images[1]) {
                position++;
                return new trackModel_1.default(e.id, position, e.name, e.artists.map(function (a) { return a.name; }), e.duration_ms, e.external_urls.spotify, e.album.images[1].url, e.preview_url);
            }
            else
                return;
        });
    else if (items[0].type === "artist")
        return items
            .filter(function (e) { return e.images[1] != undefined; })
            .map(function (e) {
            position++;
            return new artistModel_1.default(e.id, position, e.name, e.genres.slice(0, 3), e.followers.total, e.external_urls.spotify, e.images[1].url);
        });
}
exports.default = { getTopItems: getTopItems, handleResponseObject: handleResponseObject };
