import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DnevniPazarComponent } from './dnevni-pazar/dnevni-pazar.component';
import { IzdavanjeRacunaComponent } from './izdavanje-racuna/izdavanje-racuna.component';
import { IzvestajStavkeComponent } from './izvestaj-stavke/izvestaj-stavke.component';
import { KupacComponent } from './kupac/kupac.component';
import { NaruciociComponent } from './narucioci/narucioci.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { PregledRacunaKupacComponent } from './pregled-racuna-kupac/pregled-racuna-kupac.component';
import { PrijavaAdminComponent } from './prijava-admin/prijava-admin.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PrikazPodatakaComponent } from './prikaz-podataka/prikaz-podataka.component';
import { ProdavnicaComponent } from './prodavnica/prodavnica.component';
import { RasporedAComponent } from './raspored-a/raspored-a.component';
import { RasporedStoComponent } from './raspored-sto/raspored-sto.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RobaComponent } from './roba/roba.component';
import { UgostiteljComponent } from './ugostitelj/ugostitelj.component';
import { UnosStolovaComponent } from './unos-stolova/unos-stolova.component';

const routes: Routes = [
  {path:"", component:PrijavaComponent},
  {path:"admin", component:AdminComponent},
  {path:"kupac", component:KupacComponent},
  {path:"ugostitelj", component:UgostiteljComponent},
  {path:"prodavnica", component:ProdavnicaComponent},
  {path:"preduzece", component:PreduzeceComponent},
  {path:"registracija",component:RegistracijaComponent},
  {path:"registracijaA",component:RegistracijaComponent},
  {path:"prijavaAdmin",component:PrijavaAdminComponent},
  {path:"prodavnica/opstiPodaci",component:PrikazPodatakaComponent},
  {path:"prodavnica/Narucioci",component:NaruciociComponent},
  {path:"prodavnica/Roba",component:RobaComponent},
  {path:"prodavnica/RasporedArtikala",component:RasporedAComponent},
  {path:"prodavnica/IzdavanjeRacuna",component:IzdavanjeRacunaComponent},
  {path:"prodavnica/izvestajPoStavkama",component:IzvestajStavkeComponent},
  {path:"prodavnica/dnevniPazar",component:DnevniPazarComponent},
  {path:"ugostitelj/opstiPodaci",component:PrikazPodatakaComponent},
  {path:"ugostitelj/Narucioci",component:NaruciociComponent},
  {path:"ugostitelj/Roba",component:RobaComponent},
  {path:"ugostitelj/RasporedArtikala",component:RasporedAComponent},
  {path:"ugostitelj/RasporedStolova",component:RasporedStoComponent},
  {path:"ugostitelj/UnosStolova",component:UnosStolovaComponent},
  {path:"ugostitelj/IzdavanjeRacuna",component:IzdavanjeRacunaComponent},
  {path:"ugostitelj/IzdavanjeRacuna/UnosStolova",component:UnosStolovaComponent},
  {path:"ugostitelj/izvestajPoStavkama",component:IzvestajStavkeComponent},
  {path:"ugostitelj/dnevniPazar",component:DnevniPazarComponent},
  {path:"kupac/pregledRacunaKupac",component:PregledRacunaKupacComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
