"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Roba = new Schema({
    kor_ime: {
        type: String
    },
    imePreduzeca: {
        type: String
    },
    sifra: {
        type: String
    },
    naziv: {
        type: String
    },
    jedinica: {
        type: String
    },
    stopa: {
        type: Number
    },
    proizvodjac: {
        type: String
    },
    tip: {
        type: String
    },
    poreklo: {
        type: String
    },
    sNaziv: {
        type: String
    },
    barKod: {
        type: String
    },
    carina: {
        type: String
    },
    taksa: {
        type: Boolean
    },
    min: {
        type: Number
    },
    max: {
        type: Number
    },
    opis: {
        type: String
    },
    deklaracija: {
        type: String
    },
    nazivMagacina: {
        type: String
    },
    nabavna: {
        type: Number
    },
    prodajna: {
        type: Number
    },
    stanje: {
        type: Number
    },
    minKolicina: {
        type: Number
    },
    maxKolicina: {
        type: Number
    },
    kategorija: {
        type: String
    },
    slika: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Roba', Roba, 'roba');
//# sourceMappingURL=roba.js.map