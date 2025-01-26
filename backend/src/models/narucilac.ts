import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Narucilac = new Schema(
    {
        kor_ime: {
            type: String
        },
        naziv: {
            type: String
        },
        pib:{
            type:String
        },
        mat_br:{
            type:String
        },
        brojDana:{
            type:Number
        },
        procenat:{
            type:Number
        }
    }
)

export default mongoose.model('Narucilac', Narucilac, 'narucilac');
