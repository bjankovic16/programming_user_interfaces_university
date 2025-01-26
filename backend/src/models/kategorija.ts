import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Kategorija = new Schema(
    {
        ime: {
            type: String
        },
        potkategorije: {
            type: Array<String>
        }
    }
)

export default mongoose.model('Kategorija', Kategorija, 'kategorija');