"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var getRecomController_1 = __importDefault(require("../Controllers/getRecomController"));
var router = express_1.default.Router();
router.get('/', getRecomController_1.default.getRecommendedItems);
exports.default = router;
