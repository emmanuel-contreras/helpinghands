// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By }           from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { IonicModule, Platform, NavController} from 'ionic-angular/index';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { PlatformMock, StatusBarMock, SplashScreenMock } from '../../../test-config/mocks-ionic';
// import {CompletedPage} from "./completed";
// import { DashboardPage} from "../dashboard/dashboard";
// // import { FirebaseMock } from  '@ionic-native-mocks/firebase';



// describe('Page1', () => {
//   let de: DebugElement;
//   let comp: CompletedPage;
//   let fixture: ComponentFixture<CompletedPage>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [CompletedPage,DashboardPage],
//       imports: [
//         IonicModule.forRoot(CompletedPage)
//       ],
//       providers: [
//         NavController,
//         { provide: Platform, useClass: PlatformMock},
//         { provide: StatusBar, useClass: StatusBarMock },
//         { provide: SplashScreen, useClass: SplashScreenMock },
//         // { provide: FirebaseMock, useClass: FirebaseMock },


//       ]
//     });
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CompletedPage);
//     comp = fixture.componentInstance;
//     de = fixture.debugElement.query(By.css('h3'));
//   });

//   it('should create component', () => expect(comp).toBeDefined());

//   // it('should have expected <h3> text', () => {
//   //   fixture.detectChanges();
//   //   const h3 = de.nativeElement;
//   //   expect(h3.innerText).toMatch(/ionic/i,
//   //     '<h3> should say something about "Ionic"');
//   // });
//   //
//   // it('should show the favicon as <img>', () => {
//   //   fixture.detectChanges();
//   //   const img: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
//   //   expect(img.src).toContain('assets/icon/favicon.ico');
//   // });
// });
