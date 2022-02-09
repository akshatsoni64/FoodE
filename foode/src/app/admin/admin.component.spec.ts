import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports:[
                RouterTestingModule,
                HttpClientModule
            ],
            declarations:[
                AdminComponent
            ]
        }).compileComponents();
    });

    it('Load AdminComponent', ()=>{
        const fixture = TestBed.createComponent(AdminComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});