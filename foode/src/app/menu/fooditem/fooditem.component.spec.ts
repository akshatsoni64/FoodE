import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FooditemComponent } from './fooditem.component';

describe('FooditemComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports:[
                RouterTestingModule,
                HttpClientModule
            ],
            declarations:[
                FooditemComponent
            ]
        }).compileComponents();
    });

    it('Load FooditemComponent', ()=>{
        const fixture = TestBed.createComponent(FooditemComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});