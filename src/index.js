"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var auth_1 = __importDefault(require("./Routes/auth"));
var topItems_1 = __importDefault(require("./Routes/topItems"));
var getRecommended_1 = __importDefault(require("./Routes/getRecommended"));
var port = process.env.PORT || 5000;
var app = express_1.default();
app.use(cors_1.default());
app.use('/auth', auth_1.default);
app.use('/topItems', topItems_1.default);
app.use('/recommended', getRecommended_1.default);
app.listen(port, function () {
    console.log("started on port " + port);
});
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('client/build'));
}
