import { Banka } from "./Banka";
import { Kasa } from "./Kasa";
import { Magacin } from "./Magacin";

export class Preduzece{
    ime: string;
    prezime: string;
    kor_ime:string;
    lozinka:string;
    br_tel:string;
    e_mail:string;
    naziv:string;
    drzava:string;
    grad:string;
    pos_br: number;
    ulica: string;
    broj: number;
    pib: string;
    mat_br:string;
    slika:string;
    registrovan:boolean
    tip:string
    sifraDelatnosti:Array<string>
    pdv:boolean
    brojR:number
    banke:Array<Banka>
    magacini:Array<Magacin>
    brojK:number
    kase:Array<Kasa>
}