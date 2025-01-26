"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Racun = new Schema({
    stavke: {
        type: (Array)
    },
    nacinPlacanja: {
        type: String
    },
    vrednost: {
        type: Number
    },
    brLicne: {
        type: String
    },
    ime: {
        type: Number
    },
    prezime: {
        type: String
    },
    brSlip: {
        type: Number
    },
    datum: {
        type: String
    },
    narucilac: {
        type: String
    },
    zatvoren: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('Racun', Racun, 'racuni');
//# sourceMappingURL=racun.js.map