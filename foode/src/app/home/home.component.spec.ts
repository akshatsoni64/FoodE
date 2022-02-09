import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports:[
                RouterTestingModule,
                HttpClientModule
            ],
            declarations:[
                HomeComponent
            ]
        }).compileComponents();
    });

    it('Load HomeComponent', ()=>{
        const fixture = TestBed.createComponent(HomeComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});