import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Korisnik = new Schema(
    {
        username: {
            type: String
        },
        password: {
            type: String
        },
        registrovan:{
            type:Boolean
        },
        tip:{
            type:String
        },
        ime:{
            type:String
        },
        prezime:{
            type:String
        },
        licna:{
            type:String
        },
        telefon:{
            type:String
        }
    }
)

export default mongoose.model('Korisnik', Korisnik, 'korisnik');