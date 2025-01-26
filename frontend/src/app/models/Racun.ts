import { Stavka } from "./Stavka";

export class Racun{
    id:number
    stavke:Array<Stavka>=new Array<Stavka>()
    nacinPlacanja:string
    vrednost:number=0
    porez:number=0;
    kor_ime:string
    imePreduzeca:string
    pib:string
    imeObjekta:string
    kusur:number
    brLicne:string
    ime:string
    prezime:string
    slip:string
    datum:string
    narucilac:string
    zatvoren:boolean
    naziv:string
}