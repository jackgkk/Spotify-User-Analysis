"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var topItemsController_1 = __importDefault(require("./topItemsController"));
var playlistUrl = "";
function getRecommendedItems(req, res) {
    var token = req.query.token;
    var limit = req.query.limit;
    var name = req.query.name;
    var seedTracks = req.query.seedTracks;
    var seedArtists = req.query.seedArtists;
    var url = "https://api.spotify.com/v1/recommendations";
    var trackList = [];
    if ((seedArtists === null || seedArtists === void 0 ? void 0 : seedArtists.length) == 0)
        seedArtists = "xxxxxxxxxxxxxxxxxxxxxx";
    if ((seedTracks === null || seedTracks === void 0 ? void 0 : seedTracks.length) == 0)
        seedTracks = "xxxxxxxxxxxxxxxxxxxxxx";
    var queryParams = url +
        "?" +
        "seed_artists=" +
        seedArtists +
        "&seed_tracks=" +
        seedTracks +
        "&seed_genres=-" +
        "&limit=" +
        limit;
    axios_1.default
        .get(queryParams, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
        .then(function (response) {
        trackList = topItemsController_1.default.handleResponseObject(response.data.tracks);
        createAndAddItemsToPlaylist(token.toString(), response, name.toString())
            .then(function (response) { return res.send({ trackList: trackList, playlistUrl: playlistUrl }); })
            .catch(function (err) {
            console.log(err);
            res.status(err.status).send();
        });
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
            console.log("Error sending recommendation request: ", err);
        }
    });
}
function handleTrackUri(res) {
    var trackUris = [];
    res.data.tracks.forEach(function (e) { return trackUris.push(e.uri); });
    return trackUris;
}
function createPlaylist(userId, name, token) {
    return __awaiter(this, void 0, void 0, function () {
        var playlistId, url, body, config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    playlistId = null;
                    url = "https://api.spotify.com/v1/users/" + userId + "/playlists";
                    body = {
                        name: name
                    };
                    config = {
                        method: "POST",
                        url: url,
                        headers: {
                            Authorization: "Bearer " + token,
                            "Content-Type": "application-json"
                        },
                        data: body
                    };
                    return [4 /*yield*/, axios_1.default(config)
                            .then(function (res) {
                            playlistId = res.data.id;
                            playlistUrl = res.data.external_urls.spotify;
                        })
                            .catch(function (err) { return console.log(err.response, "error creating playlist"); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, playlistId];
            }
        });
    });
}
function getUserId(token) {
    return __awaiter(this, void 0, void 0, function () {
        var url, userId, config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.spotify.com/v1/me";
                    userId = null;
                    config = {
                        method: "GET",
                        url: url,
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    };
                    return [4 /*yield*/, axios_1.default(config)
                            .then(function (res) { return (userId = res.data.id); })
                            .catch(function (err) { return console.log(err.response, "error getting user_id"); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, userId];
            }
        });
    });
}
function addItemsToPlaylist(trackUris, playlistId, token) {
    var url = "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks";
    var params = url + "?uris=" + trackUris;
    var config = {
        method: "POST",
        url: params,
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application-json"
        }
    };
    return axios_1.default(config);
}
function createAndAddItemsToPlaylist(token, res, name) {
    return __awaiter(this, void 0, void 0, function () {
        var trackUris, userId, playlistId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    trackUris = handleTrackUri(res);
                    if (!(trackUris.length === 0)) return [3 /*break*/, 1];
                    console.error("Error when saving track URI's");
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, getUserId(token)];
                case 2:
                    userId = _a.sent();
                    if (!userId) return [3 /*break*/, 4];
                    return [4 /*yield*/, createPlaylist(userId, name, token)];
                case 3:
                    playlistId = _a.sent();
                    if (playlistId) {
                        return [2 /*return*/, addItemsToPlaylist(trackUris, playlistId, token)];
                    }
                    else
                        console.error("Cannot get playlist id");
                    return [3 /*break*/, 5];
                case 4:
                    console.error("Cannot get user id");
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = { getRecommendedItems: getRecommendedItems };
