import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports:[
                RouterTestingModule,
                HttpClientModule
            ],
            declarations:[
                NavigationComponent
            ]
        }).compileComponents();
    });

    it('Load NavigationComponent', ()=>{
        const fixture = TestBed.createComponent(NavigationComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});