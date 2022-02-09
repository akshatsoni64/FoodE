import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports:[
                RouterTestingModule,
                HttpClientModule
            ],
            declarations:[
                CartComponent
            ]
        }).compileComponents();
    });

    it('Load CartComponent', ()=>{
        const fixture = TestBed.createComponent(CartComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});