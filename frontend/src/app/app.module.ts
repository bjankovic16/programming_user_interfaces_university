import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { KupacComponent } from './kupac/kupac.component';
import { ProdavnicaComponent } from './prodavnica/prodavnica.component';
import { UgostiteljComponent } from './ugostitelj/ugostitelj.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { PrijavaAdminComponent } from './prijava-admin/prijava-admin.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { PrikazPodatakaComponent } from './prikaz-podataka/prikaz-podataka.component';
import { NaruciociComponent } from './narucioci/narucioci.component';
import { RobaComponent } from './roba/roba.component';
import { UnosRobeComponent } from './unos-robe/unos-robe.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RasporedAComponent } from './raspored-a/raspored-a.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DodelaArtiklaComponent } from './dodela-artikla/dodela-artikla.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RasporedStoComponent } from './raspored-sto/raspored-sto.component';
import { UnosStolovaComponent } from './unos-stolova/unos-stolova.component';
import { IzdavanjeRacunaComponent } from './izdavanje-racuna/izdavanje-racuna.component';
import { IzvestajStavkeComponent } from './izvestaj-stavke/izvestaj-stavke.component';
import { DnevniPazarComponent } from './dnevni-pazar/dnevni-pazar.component';
import { PregledRacunaKupacComponent } from './pregled-racuna-kupac/pregled-racuna-kupac.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RobaBrisanjeComponent } from './roba-brisanje/roba-brisanje.component';
import { PromenaAdminComponent } from './promena-admin/promena-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    KupacComponent,
    ProdavnicaComponent,
    UgostiteljComponent,
    PrijavaComponent,
    PrijavaAdminComponent,
    PreduzeceComponent,
    PrikazPodatakaComponent,
    NaruciociComponent,
    RobaComponent,
    UnosRobeComponent,
    RasporedAComponent,
    DodelaArtiklaComponent,
    RasporedStoComponent,
    UnosStolovaComponent,
    IzdavanjeRacunaComponent,
    IzvestajStavkeComponent,
    DnevniPazarComponent,
    PregledRacunaKupacComponent,
    HeaderComponent,
    FooterComponent,
    RegistracijaComponent,
    PromenaLozinkeComponent,
    RobaBrisanjeComponent,
    PromenaAdminComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[DodelaArtiklaComponent,RasporedStoComponent,PromenaLozinkeComponent]
})
export class AppModule { }
