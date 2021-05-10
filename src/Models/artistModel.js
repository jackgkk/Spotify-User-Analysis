"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Artist = /** @class */ (function () {
    function Artist(id, position, name, genres, followers, url, image) {
        this.id = id;
        this.position = position;
        this.name = name;
        this.genres = genres;
        this.followers = followers;
        this.url = url;
        this.image = image;
        this.type = "artist";
        Object.freeze(this);
    }
    return Artist;
}());
exports.default = Artist;
