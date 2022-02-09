import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';

describe('LoginComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports:[
                RouterTestingModule,
                HttpClientModule
            ],
            declarations:[
                AppComponent
            ]
        }).compileComponents();
    });

    it('Load LoginComponent', ()=>{
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});