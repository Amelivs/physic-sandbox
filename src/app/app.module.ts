import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { PendulumComponent } from './components/pendulum/pendulum.component';
import { DoublePendulumComponent } from './components/double-pendulum/double-pendulum.component';
import { GameOfLifeComponent } from './components/game-of-life/game-of-life.component';
import { LangtonAntComponent } from './components/langton-ant/langton-ant.component';
import { Lorenz2dComponent } from './components/lorenz-2d/lorenz-2d.component';
import { Lorenz3dComponent } from './components/lorenz-3d/lorenz-3d.component';
import { BouncingBallComponent } from './components/bouncing-ball/bouncing-ball.component';
import { KeplerComponent } from './components/kepler/kepler.component';
import { MandelbrotComponent } from './components/mandelbrot/mandelbrot.component';

const appRoutes: Routes = [
  { path: 'pendulum', component: PendulumComponent },
  { path: 'double-pendulum', component: DoublePendulumComponent },
  { path: 'game-of-life', component: GameOfLifeComponent },
  { path: 'langton-ant', component: LangtonAntComponent },
  { path: 'lorenz-2d', component: Lorenz2dComponent },
  { path: 'lorenz-3d', component: Lorenz3dComponent },
  { path: 'bouncing-ball', component: BouncingBallComponent },
  { path: 'kepler', component: KeplerComponent },
  { path: 'mandelbrot', component: MandelbrotComponent },
  { path: '**', component: PendulumComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PendulumComponent,
    DoublePendulumComponent,
    GameOfLifeComponent,
    LangtonAntComponent,
    Lorenz2dComponent,
    Lorenz3dComponent,
    BouncingBallComponent,
    KeplerComponent,
    MandelbrotComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
