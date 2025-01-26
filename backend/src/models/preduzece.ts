import mongoose from 'mongoose';
import { Banka } from './banka';
import { Kasa } from './kasa';
import { Magacin } from './magacin';

const Schema = mongoose.Schema;

let Preduzece = new Schema(
    {
        kor_ime: {
            type: String
        },
        lozinka: {
            type: String
        },
        ime: {
            type:String
        },
        prezime: {
            type:String
        },
        br_tel:{
            type:String
        },
        e_mail:{
            type:String
        },
        naziv:{
            type:String
        },
        drzava:{
            type:String
        },
        grad:{
            type:String
        },
        pos_br:{
            type:String
        },
        ulica:{
            type:String
        },
        broj:{
            type:String
        },
        pib: {
            type:String
        },
        mat_br:{
            type:String
        },
        slika:{
            type:String
        },
        registrovan:{
            type:Boolean
        },
        tip:{
            type:String
        },
        sifraDelatnosti:{
            type:Array<String>()
        },
        pdv:{
            type:Boolean
        },
        brojR:{
            type:Number
        },
        banke:{
            type:Array<Banka>()
        },
        magacini:{
            type:Array<Magacin>()
        },
        brojK:{
            type:Number
        },
        kase:{
            type:Array<Kasa>()
        }
    }
)

export default mongoose.model('Preduzece', Preduzece, 'preduzece');