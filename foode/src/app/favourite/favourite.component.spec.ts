import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FavouriteComponent } from './favourite.component';

describe('FavouriteComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports:[
                RouterTestingModule,
                HttpClientModule
            ],
            declarations:[
                FavouriteComponent
            ]
        }).compileComponents();
    });

    it('Load FavouriteComponent', ()=>{
        const fixture = TestBed.createComponent(FavouriteComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});