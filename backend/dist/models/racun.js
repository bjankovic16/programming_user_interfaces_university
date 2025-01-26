"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Racun = new Schema({
    id: {
        type: Number
    },
    kor_ime: {
        type: String
    },
    imePreduzeca: {
        type: String
    },
    pib: {
        type: String
    },
    imeObjekta: {
        type: String
    },
    stavke: {
        type: (Array)
    },
    nacinPlacanja: {
        type: String
    },
    vrednost: {
        type: Number
    },
    porez: {
        type: Number
    },
    brLicne: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    slip: {
        type: String
    },
    datum: {
        type: String
    },
    narucilac: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Racun', Racun, 'racuni');
//# sourceMappingURL=racun.js.map