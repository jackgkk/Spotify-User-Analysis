"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = __importDefault(require("../Controllers/authController"));
var router = express_1.default.Router();
router.get('/', authController_1.default.getAuth);
router.post('/', authController_1.default.getTokens);
router.post('/refresh', authController_1.default.refreshToken);
exports.default = router;
