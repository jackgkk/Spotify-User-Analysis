"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Track = /** @class */ (function () {
    function Track(id, position, name, artists, durationMs, url, image, previewUrl) {
        this.id = id;
        this.position = position;
        this.name = name;
        this.artists = artists;
        this.durationMs = durationMs;
        this.url = url;
        this.image = image;
        this.previewUrl = previewUrl;
        this.type = "track";
        Object.freeze(this);
    }
    return Track;
}());
exports.default = Track;
