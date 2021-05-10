"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var topItemsController_1 = __importDefault(require("../Controllers/topItemsController"));
var router = express_1.default.Router();
router.get('/', topItemsController_1.default.getTopItems);
exports.default = router;
