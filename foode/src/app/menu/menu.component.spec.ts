import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuComponent } from './menu.component';

describe('LoginComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports:[
                RouterTestingModule,
                HttpClientModule
            ],
            declarations:[
                MenuComponent
            ]
        }).compileComponents();
    });

    it('Load LoginComponent', ()=>{
        const fixture = TestBed.createComponent(MenuComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});