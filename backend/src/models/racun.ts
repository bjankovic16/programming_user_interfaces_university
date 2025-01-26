
import mongoose from 'mongoose';
import { Stavka } from './stavka';
const Schema = mongoose.Schema;

let Racun = new Schema(
    {
        id:{
            type:Number
        },
        kor_ime:{
            type:String
        },
        imePreduzeca:{
            type:String
        },
        pib:{
            type:String
        },
        imeObjekta:{
            type:String
        },
        stavke: {
            type: Array<Stavka>
        },
        nacinPlacanja: {
            type: String
        },
        vrednost: {
            type:Number
        },
        porez:{
            type:Number
        },
        brLicne: {
            type:String
        },
        ime:{
            type:String
        },
        prezime:{
            type:String
        },
        slip:{
            type:String
        },
        datum:{
            type:String
        },
        narucilac:{
            type:String
        }
    }
)

export default mongoose.model('Racun', Racun, 'racuni');

