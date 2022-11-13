"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const utils_1 = require("./utils");
const PORT = process.env.PORT || 3000;
server_1.default.listen(PORT, () => utils_1.logger.info(`Server running at ${PORT}`));
