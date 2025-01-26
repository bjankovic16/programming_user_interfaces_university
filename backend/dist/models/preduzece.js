"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Preduzece = new Schema({
    kor_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    br_tel: {
        type: String
    },
    e_mail: {
        type: String
    },
    naziv: {
        type: String
    },
    drzava: {
        type: String
    },
    grad: {
        type: String
    },
    pos_br: {
        type: String
    },
    ulica: {
        type: String
    },
    broj: {
        type: String
    },
    pib: {
        type: String
    },
    mat_br: {
        type: String
    },
    slika: {
        type: String
    },
    registrovan: {
        type: Boolean
    },
    tip: {
        type: String
    },
    sifraDelatnosti: {
        type: Array()
    },
    pdv: {
        type: Boolean
    },
    brojR: {
        type: Number
    },
    banke: {
        type: Array()
    },
    magacini: {
        type: Array()
    },
    brojK: {
        type: Number
    },
    kase: {
        type: Array()
    }
});
exports.default = mongoose_1.default.model('Preduzece', Preduzece, 'preduzece');
//# sourceMappingURL=preduzece.js.map