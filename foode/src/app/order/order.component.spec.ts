import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderComponent } from './order.component';

describe('OrderComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports:[
                RouterTestingModule,
                HttpClientModule
            ],
            declarations:[
                OrderComponent
            ]
        }).compileComponents();
    });

    it('Load OrderComponent', ()=>{
        const fixture = TestBed.createComponent(OrderComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});