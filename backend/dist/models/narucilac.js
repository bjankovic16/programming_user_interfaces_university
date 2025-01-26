"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Narucilac = new Schema({
    kor_ime: {
        type: String
    },
    naziv: {
        type: String
    },
    pib: {
        type: String
    },
    mat_br: {
        type: String
    },
    brojDana: {
        type: Number
    },
    procenat: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Narucilac', Narucilac, 'narucilac');
//# sourceMappingURL=narucilac.js.map