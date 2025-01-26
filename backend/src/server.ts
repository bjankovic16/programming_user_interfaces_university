import cors from 'cors';
import e from 'express';
import express from 'express';
import mongoose from 'mongoose';
import { rawListeners } from 'process';
import admin from './models/admin';
import kategorija from './models/kategorija';
import korisnik from './models/korisnik';
import { Magacin } from './models/magacin';
import narucilac from './models/narucilac';
import preduzece from './models/preduzece';
import racun from './models/racun';
import roba from './models/roba';
const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://0.0.0.0:27017/projekat')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));

const multer=require("multer");
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'../frontend/src/assets/preduzeca')
    },
    filename:(req,file,cb)=>{
        slika=file.originalname
        cb(null,file.originalname);
    } 
})
const upload=multer({
    storage:storage
})

router.route('/upload').post(upload.single('image'),(req,res)=>{
    res.json({poruka:"ok"})
})

router.route("/prijavaAdmin").post((req,res)=>{
    let username=req.body.username;
    let password=req.body.password;

    admin.findOne({"username":username, "password":password},(err,rez)=>{
        if(err) console.log(err);
        else res.json(rez);
    })
})

router.route("/prijavaNaSistem").post((req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    korisnik.findOne({"username":username,"password":password},(err,rez)=>{
        if(err) console.log(err);
        else res.json(rez);
    })
})

router.route("/ubaciKorisnika").post((req,res)=>{
    let username=req.body.username;
    let password1=req.body.password1;
    korisnik.findOne({"username":username},(err,rez)=>{
        if(err) console.log(err);
        else{
            if(rez==null){
                let k={
                    username:username,
                    password:password1,
                    registrovan:req.body.registrovan,
                    tip:req.body.tip
                }
                korisnik.insertMany(k);
                res.json({poruka:"ok"});
            }else{
                res.json({poruka:"bad"})
            }
        }
    })
})

router.route("/istiMail").post((req,res)=>{
    let e_mail=req.body.e_mail;
    preduzece.find({"e_mail":e_mail},(err,rez)=>{
        if(err) console.log(err);
        else{
            if(rez.length==0){
                res.json({poruka:"ok"});
            }
            else{
                res.json({poruka:"bad"})
            }
        }
    } )
})
let slika:String="";
router.route("/registrovanjePreduzeca").post((req,res)=>{
    let matBr=req.body.mat_br
        preduzece.findOne({"mat_br":matBr}, (err,rez)=>{
        if(err) console.log(err);
        if(!rez){
            let pred={
                kor_ime:req.body.kor_ime,
                lozinka:req.body.lozinka,
                ime:req.body.ime,
                prezime:req.body.prezime,
                br_tel:req.body.br_tel,
                e_mail:req.body.e_mail,
                naziv:req.body.naziv,
                drzava:req.body.drzava,
                registrovan:req.body.registrovan,
                grad:req.body.grad,
                pos_br:req.body.pos_br,
                ulica:req.body.ulica,
                broj:req.body.broj,
                pib: req.body.pib,
                mat_br:req.body.mat_br,
                slika:slika
            }
            preduzece.insertMany(pred)
            res.json({poruka:"ok"})
        }else{
            res.json({poruka:"bad"})
        }
    })
})

router.route("/regPRED").post((req,res)=>{
    let kor_ime=req.body.kor_ime;
    preduzece.updateOne({"kor_ime":kor_ime},{$set:{"registrovan":true}},(err,rez)=>{
        if(err) console.log(err);
        else res.json({poruka:"ok"});
    })
})

router.route("/regKOR").post((req,res)=>{
    let kor_ime=req.body.kor_ime;
    korisnik.updateOne({"username":kor_ime},{$set:{"registrovan":true}},(err,rez)=>{
        if(err) console.log(err);
        else res.json({poruka:"ok"});
    })
})

router.route("/obrisiPRED").post((req,res)=>{
    let kor_ime=req.body.kor_ime;
    console.log(kor_ime)
    preduzece.deleteOne({"kor_ime":kor_ime},(err,rez)=>{
        if(err) console.log(err)
        else res.json({poruka:"ok"})    
    })
})

router.route("/obrisiKOR").post((req,res)=>{
    let kor_ime=req.body.kor_ime;
    console.log(kor_ime);
    korisnik.deleteOne({"username":kor_ime},(err,rez)=>{
        if(err) console.log(err)
        else res.json({poruka:"ok"})    
    })
})

router.route("/neregistrovanaPreduzeca").get((req,res)=>{
    preduzece.find({"registrovan":false},(err,rez)=>{
        if(err) console.log(err);
        else res.json(rez);
    })
})


let n=1;
router.route("/preduzeceInfo").post((req,res)=>{
    let kor_ime=req.body.kor_ime
    let magacini:Magacin[]=[];
    for(var i=0;i<req.body.brojMagacina;i++){
        let m:Magacin=new Magacin();
        m.id=n++;
        m.naziv="magacin"+m.id;
        magacini.push(JSON.parse(JSON.stringify(m)))
    }
    preduzece.updateOne({"kor_ime":kor_ime},
    {$set:{"tip":req.body.tip,"sifraDelatnosti":req.body.sifra,"pdv":req.body.pdv,
    "brojR":req.body.brojRac,"banke":req.body.banke,"magacini":magacini,
    "brojK":req.body.brojKas,"kase":req.body.kase}}, (err,rez)=>{
        if(err)
            console.log(err);
            else res.json({poruka:"ok"})
        
    })
})

router.route("/getPreduzece").post((req,res)=>{
    let kor_ime=req.body.kor_ime
    preduzece.findOne({"kor_ime":kor_ime},(err,rez)=>{
        if(err) console.log(err);
        else{
            res.json(rez);
        }
    })
})

router.route("/promeniMail").post((req,res)=>{
    let mail=req.body.mail;
    let username=req.body.username
    korisnik.updateOne({"kor_ime":username},{$set:{"kor_ime":mail}},(err,rez)=>{
        if(err) console.log(err);
        else res.json(rez)
    })
})

router.route("/dodajBanku").post((req,res)=>{
    let imeBanke=req.body.imeBanke
    let brojRacuna=req.body.brojR
    let banka=req.body.bankaPr;
    let uslov=req.body.dodavanje;
    let kor_ime=req.body.kor_ime

    if(uslov){
        let banka={
            brojRacuna:brojRacuna,
            imeBanke:imeBanke
        }
        preduzece.updateOne({"kor_ime":kor_ime},{$push:{"banke":banka}},(err,rez)=>{
            if(err) console.log(err);
            else res.json(rez);
        })
    }else{
        preduzece.updateOne({"banke.brojRacuna":banka.brojRacuna},{$set:{"banke.$.brojRacuna":brojRacuna ,"banke.$.imeBanke":imeBanke}},(err,rez)=>{
            if(err) console.log(err);
            else res.json(rez);
        })
    }
})

router.route("/obrisiRacun").post((req,res)=>{
    let banka=req.body.banka;
    let kor_ime=req.body.kor_ime
    preduzece.updateOne({"kor_ime":kor_ime},{$pull:{"banke":{"brojRacuna":banka.brojRacuna, "imeBanke":banka.imeBanke}}},(err,rez)=>{
        if(err) console.log(err);
        else {
            res.json({poruka:"ok"})
        }
    })
})

router.route("/obrisiKasu").post((req,res)=>{
    let kasa=req.body.kasa;
    let kor_ime=req.body.kor_ime
    preduzece.updateOne({"kor_ime":kor_ime},{$pull:{"kase":{"lokacija":kasa.lokacija, "tip":kasa.tip}}},(err,rez)=>{
        if(err) console.log(err);
        else {
            res.json({poruka:"ok"})
        }
    })
})

router.route("/dodajKasu").post((req,res)=>{
    let tip=req.body.tip
    let lokacija=req.body.lokacija
    let kasa=req.body.kasaPr;
    let uslov=req.body.uslov;
    let kor_ime=req.body.kor_ime
    if(uslov){
        let kas={
            lokacija:lokacija,
            tip:tip
        }
        preduzece.updateOne({"kor_ime":kor_ime},{$push:{"kase":kas}},(err,rez)=>{
            if(err) console.log(err);
            else res.json(rez);
        })
    }else{
        preduzece.updateOne({"kase.tip":kasa.tip, "kase.lokacija":kasa.lokacija},{$set:{"kase.$.tip":tip ,"kase.$.lokacija":lokacija}},(err,rez)=>{
            if(err) console.log(err);
            else res.json(rez);
        })
    }
})


router.route("/dodajMagacin").post((req,res)=>{
    let ime=req.body.ime
    let maga=req.body.maga
    let uslov=req.body.uslov;
    let kor_ime=req.body.kor_ime
    let id=req.body.id;
 
    if(uslov){
        let m={
            id:id,
            naziv:"magacin"+id,
        }
        preduzece.updateOne({"kor_ime":kor_ime},{$push:{"magacini":m}},(err,rez)=>{
            if(err) console.log(err);
            else res.json({poruka:"ok"});
        })
    }else{
        preduzece.updateOne({"magacini.id":maga.id},{$set:{"magacini.$.naziv":ime}},(err,rez)=>{
            if(err) console.log(err);
            else res.json({poruka:"ok"});
        })
    }
})

router.route("/postojiIstiMagacin").post((req,res)=>{
    let kor_ime=req.body.kor_ime;
    let ime=req.body.ime;
    preduzece.find({"kor_ime":kor_ime,"magacini.naziv":ime},(err,rez)=>{
        if(err) console.log(err);
        else
        if(rez.length>0){
            res.json({poruka:"bad"})
        }
        else{
            res.json({poruka:"ok"})
        }
    })
})

router.route("/obrisiMagacin").post((req,res)=>{
    let naziv=req.body.naziv;
    let kor_ime=req.body.kor_ime
    preduzece.updateOne({"kor_ime":kor_ime},{$pull:{"magacini":{"naziv":naziv}}},(err,rez)=>{
        if(err) console.log(err);
        else {
            res.json({poruka:"ok"})
        }
    })
})

router.route("/obrisiProizvodMaga").post((req,res)=>{
    let naziv=req.body.naziv;
    let kor_ime=req.body.kor_ime;
    roba.deleteMany({"kor_ime":kor_ime,"nazivMagacina":naziv},(err,rez)=>{
        if(err) console.log(err);
        else res.json({poruka:"ok"})
    })
})

router.route("/promeniIme").post((req,res)=>{
    let ime=req.body.ime;
    let kor_ime=req.body.kor_ime;
    preduzece.updateOne({"kor_ime":kor_ime},{$set:{"ime":ime}},(err,rez)=>{
        if(err) console.log(err);
        else{ 
            res.json({poruka:"ok"})
        }
    })
})

router.route("/promeniPrezime").post((req,res)=>{
    let prezime=req.body.prezime;
    let kor_ime=req.body.kor_ime;
    preduzece.updateOne({"kor_ime":kor_ime},{$set:{"prezime":prezime}},(err,rez)=>{
        if(err) console.log(err);
        else{ 
            res.json({poruka:"ok"})
        }
    })
})

router.route("/promeniM").post((req,res)=>{
    let mail=req.body.mail;
    let kor_ime=req.body.kor_ime;
    preduzece.updateOne({"kor_ime":kor_ime},{$set:{"e_mail":mail}},(err,rez)=>{
        if(err) console.log(err);
        else{ 
            res.json({poruka:"ok"})
        }
    })
})

router.route("/promeniTelefon").post((req,res)=>{
    let telefon=req.body.telefon;
    let kor_ime=req.body.kor_ime;
    preduzece.updateOne({"kor_ime":kor_ime},{$set:{"telefon":telefon}},(err,rez)=>{
        if(err) console.log(err);
        else{ 
            res.json({poruka:"ok"})
        }
    })
})

router.route("/promeniTip").post((req,res)=>{
    let tip=req.body.tip;
    let kor_ime=req.body.kor_ime;
    preduzece.updateOne({"kor_ime":kor_ime},{$set:{"tip":tip}},(err,rez)=>{
        if(err) console.log(err);
        else{ 
            res.json({poruka:"ok"})
        }
    })
})

router.route("/promeniPdv").post((req,res)=>{
    let pdv=req.body.pdv;
    let kor_ime=req.body.kor_ime;
    preduzece.updateOne({"kor_ime":kor_ime},{$set:{"pdv":pdv}},(err,rez)=>{
        if(err) console.log(err);
        else{ 
            res.json({poruka:"ok"})
        }
    })
})

router.route("/promeniSifra").post((req,res)=>{
    let sifra=req.body.sifra;
    let kor_ime=req.body.kor_ime;
    preduzece.updateOne({"kor_ime":kor_ime},{$set:{"sifraDelatnosti":sifra}},(err,rez)=>{
        if(err) console.log(err);
        else{ 
            res.json({poruka:"ok"})
        }
    })
})

router.route("/pretrazi").post((req,res)=>{
    let pib=req.body.pib;
    preduzece.find({"pib":{$regex:pib +'.*'}}, (err,rez)=>{
        if(err) console.log(err);
        else res.json(rez);
    })
})

router.route("/ubaciNarucioca").post((req,res)=>{
    let n={
        kor_ime:req.body.kor_ime,
        naziv:req.body.naziv,
        pib:req.body.pib,
        mat_br:req.body.mat_br,
        brojDana:req.body.broj,
        procenat:req.body.procenat
    }
    narucilac.insertMany(n);
    res.json({poruka:"ok"})
})

router.route("/getRoba").post((req,res)=>{
    let k=req.body.kor_ime
    roba.find({"kor_ime":k},(err,rez)=>{
        if(err) console.log(err);
        else res.json(rez);
    })
})
router.route("/slikaRobe").post((req,res)=>{
    let kor_ime=req.body.kor_ime;
    let sifra=req.body.sifra;
    roba.updateOne({"kor_ime":kor_ime,"sifra":sifra},{$set:{"slika":slika}},(err,rez)=>{
        if(err) console.log(err);
        else res.json({poruka:"ok"});
    })
})
router.route("/obrisi").post((req,res)=>{
    let r=req.body.roba;
    roba.deleteOne({"kor_ime":r.kor_ime,"sifra":r.sifra},(err,rez)=>{
        if(err) console.log(err);
        else res.json({poruka:"ok"});
    })
})

router.route("/ubacivanjeRobe").post((req,res)=>{
    let rob=req.body.roba;
    roba.insertMany(rob);
    res.json({poruka:"ok"});
})

router.route("/postojiIstaRoba").post((req,res)=>{
    let rob=req.body.roba;
    roba.find({"kor_ime":rob.kor_ime,"sifra":rob.sifra},(err,rez)=>{
        if(err) console.log(err);
        else res.json(rez)
    })
})

router.route("/getKategorije").get((req,res)=>{
    kategorija.find({},(err,rez)=>{
        if(err) console.log(err);
        else res.json(rez);
    })
})

router.route("/ubaciKategoriju").post((req,res)=>{
    let kat=req.body.kategorija
    kategorija.insertMany(kat);
    res.json({poruka:"ok"})
})

router.route("/ubaciPotkategoriju").post((req,res)=>{
    let imeK=req.body.ime;
    let potK=req.body.potkategorija

    kategorija.updateOne({"ime":imeK},{$push:{"potkategorije":potK}},(err,rez)=>{
        if(err) console.log(err);
        else res.json({poruka:"ok"})
    })
})

router.route("/pretragaRobePoImenu").post((req,res)=>{
    let ime=req.body.ime;
    roba.find({"naziv": { $regex: '.*'+ime+'.*' }}, (err,rez)=>{
        if(err) console.log(err);
        else res.json(rez);
    })
})

router.route("/setKategorija").post((req,res)=>{
    let r=req.body.roba;
    let kat=req.body.kat;
    roba.updateOne({"sifra":r.sifra},{$set:{"kategorija":kat}},(err,rez)=>{
        if(err) console.log(err);
        else res.json({poruka:"ok"});
    })
})

router.route("/getRobaFromMagacin").post((req,res)=>{
    let imeM=req.body.imeMagacina;
    roba.find({"nazivMagacina":imeM},(err,rez)=>{
        if(err) console.log(err);
        else res.json(rez);
    })
})

router.route("/promeniKolicinu").post((req,res)=>{
    let kolicina=req.body.kolicina
    let kor_ime=req.body.kor_ime
    let sifra=req.body.sifra
    roba.updateOne({"kor_ime":kor_ime, "sifra":sifra},{$set:{"stanje":kolicina}},(err,rez)=>{
        if(err) console.log(err);
        else res.json({poruka:"ok"});
    })
})
router.route("/ubaciRacun").post((req,res)=>{
    let idBrojac=req.body.id;
    let racunn=req.body.racun;
    let n={
        id:idBrojac,
        stavke:racunn.stavke,
        kor_ime:racunn.kor_ime,
        porez:racunn.porez,
        nacinPlacanja:racunn.nacinPlacanja,
        vrednost:racunn.vrednost,
        brLicne:racunn.brLicne,
        ime:racunn.ime,
        pib:racunn.pib,
        prezime:racunn.prezime,
        slip:racunn.slip,
        datum:racunn.datum,
        narucilac:racunn.narucilac,
        imeObjekta:racunn.imeObjekta,
        imePreduzeca:racunn.imePreduzeca,
    }
    racun.insertMany(n)
    res.json({poruka:"ok"})
})

router.route("/getRacune").post((req,res)=>{
    let kor_ime=req.body.kor_ime;
    racun.find({"kor_ime":kor_ime},(err,rez)=>{
        if(err) console.log(err);
        else res.json(rez);
    })
})

router.route("/dodaciKorisnik").post((req,res)=>{
    let ime=req.body.ime
    let prezime=req.body.prezime
    let telefon=req.body.telefon
    let licna=req.body.licna
    let kor_ime=req.body.kor_ime
    korisnik.updateOne({"username":kor_ime},{$set:{"ime":ime,"prezime":prezime,"telefon":telefon,"licna":licna}},(err,rez)=>{
        if(err) console.log(err);
        else res.json({poruka:"ok"})
    })
})

router.route("/getRobaPP").post((req,res)=>{
    let proizvod=req.body.proizvod
    let proizvodjac=req.body.proizvodjac
    roba.find({"naziv":{ $regex: '.*'+proizvod+'.*' },
    "proizvodjac":{ $regex: '.*'+proizvodjac+'.*' }},(err,rez)=>{
        if(err) console.log(err);
        else res.json(rez)
    })
})

router.route("/getRacuneLicna").post((req,res)=>{
    let licna=req.body.licna
    racun.find({"brLicne":licna},(err,rez)=>{
        if(err) console.log(err);
        else res.json(rez);
    })
})

router.route("/getRacuneDatumOdDo").post((req,res)=>{
    let datumOd=req.body.datumOd
    let datumDo=req.body.datumDo
    let imePreduzeca=req.body.naziv
    let pib=req.body.pib

    racun.find({"imePreduzeca":{ $regex: '.*'+imePreduzeca+'.*' },"pib":{ $regex: '.*'+pib+'.*' },
    "datum":{$gt:new Date(datumOd).toISOString(),$lt:new Date(datumDo).toISOString()}},(err,rez)=>{
        if(err) console.log(err);
        else res.json(rez);
    })
})

router.route("/postaviTip").post((req,res)=>{
    let kor_ime=req.body.kor_ime;
    let tip=req.body.tip
    korisnik.updateOne({"username":kor_ime},{$set:{"tip":tip}},(err,rez)=>{
        if(err) console.log(err);
        else res.json({poruka:"ok"})
    })
})

router.route("/promeniLozinku").post((req,res)=>{
    let username=req.body.username
    let password=req.body.pas;
    korisnik.updateOne({"username":username},{$set:{"password":password}},(err,rez)=>{
        if(err) console.log(err);
        else res.json({poruka:"ok"});
    })
})

router.route("/promeniLozAdmin").post((req,res)=>{
    let username=req.body.username
    let password=req.body.pas;
    admin.updateOne({"username":username},{$set:{"password":password}},(err,rez)=>{
        if(err) console.log(err);
        else res.json({poruka:"ok"});
    })
})

router.route("/getNarucioce").post((req,res)=>{
    let kor_ime=req.body.kor_ime;
    narucilac.find({"kor_ime":kor_ime},(err,rez)=>{
        if(err) console.log(err);
        else res.json(rez);
    })
})

router.route("/getRacuneSve").get((req,res)=>{
    racun.find({},(err,rez)=>{
        if(err) console.log(err);
        else res.json(rez);
    })
})