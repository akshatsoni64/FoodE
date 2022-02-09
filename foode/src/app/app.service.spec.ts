import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppService } from './app.service';
import { Order } from './Models/Order';
import { Food } from './Models/Food';
import { Favourites } from './Models/Favourites';
import { Cart } from './Models/Cart';
import { User } from './Models/User';

describe('AppService', () => {
  let htc: HttpTestingController;
  let service: AppService;
  let user!: User;

  let mockUsers = [
    {
      "id": 2,
      "username": "akshat@foode.com",
      "password": "12345678",
      "type": "user",
      "active": false
    },
  ];

  let mockFavourites = [
    {
      "user": "{\"id\":2,\"username\":\"akshat@foode.com\",\"password\":\"12345678\",\"active\":false}",
      "food": {
        "name": "Apple",
        "description": "Fresh Apple",
        "price": "100",
        "id": 1,
        "favourite": -1
      },
      "id": 3
    },
    {
      "user": "{\"id\":2,\"username\":\"akshat@foode.com\",\"password\":\"12345678\",\"active\":false}",
      "food": {
        "name": "Grapes",
        "description": "Fresh & Juicy Grapes",
        "price": "120",
        "id": 5,
        "favourite": -1
      },
      "id": 4
    }
  ];

  let mockFood = [
    {
      "name": "Apple",
      "description": "Fresh Apple",
      "price": "100",
      "id": 1
    },
    {
      "name": "Mango",
      "description": "Fresh and handpicked delicious Mango fruit, the king of fruit",
      "price": "150",
      "id": 2
    }
  ];

  let mockCart = [
    {
      "food": {
        "name": "Apple",
        "description": "Fresh Apple",
        "price": "100",
        "id": 1,
        "favourite": 5
      },
      "user": 2,
      "totalprice": 100,
      "active": false,
      "quantity": 1,
      "id": 1
    },
    {
      "food": {
        "name": "Mango",
        "description": "Fresh and handpicked delicious Mango fruit, the king of fruit",
        "price": "150",
        "id": 2,
        "favourite": -1
      },
      "user": 2,
      "totalprice": 450,
      "active": false,
      "quantity": 3,
      "id": 2
    }
  ];

  let mockOrders = [
    {
      "user": 2,
      "cart": [
        {
          "food": {
            "name": "Apple",
            "description": "Fresh Apple",
            "price": "100",
            "id": 1,
            "favourite": 5
          },
          "user": 2,
          "totalprice": 100,
          "active": true,
          "quantity": 1,
          "id": 1
        },
        {
          "food": {
            "name": "Mango",
            "description": "Fresh and handpicked delicious Mango fruit, the king of fruit",
            "price": "150",
            "id": 2,
            "favourite": -1
          },
          "user": 2,
          "totalprice": 450,
          "active": true,
          "quantity": 3,
          "id": 2
        }
      ],
      "address": "New Address, Gujarat",
      "totalprice": 550,
      "id": 1
    },
    {
      "user": 2,
      "cart": [
        {
          "food": {
            "name": "Mango",
            "description": "Fresh and handpicked delicious Mango fruit, the king of fruit",
            "price": "150",
            "id": 2,
            "favourite": -1
          },
          "user": 2,
          "totalprice": "150",
          "active": true,
          "quantity": 1,
          "id": 4
        },
        {
          "food": {
            "name": "Watermelon",
            "description": "Best in class Watermelon",
            "price": "150",
            "id": 6,
            "favourite": -1
          },
          "user": 2,
          "totalprice": "150",
          "active": true,
          "quantity": 1,
          "id": 5
        }
      ],
      "address": "Address, City, State, Country - Pincode",
      "totalprice": 300,
      "id": 2
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(AppService);
    htc = TestBed.inject(HttpTestingController);

    let u = {
      id: 2,
      username: "akshat",
      type: "user"
    }
    sessionStorage.setItem('user', JSON.stringify(u));

    user = service.getCurrentUser();
  });

  afterEach(() => {
    htc.verify();
  });

  it('initialize service', () => {
    expect(service).toBeTruthy();
  });

  it("should fetch Cart[]", () => {
    let arrCart!: Cart[];
    service.getCart().subscribe((res: Cart[]) => {
      arrCart = res;
      // console.log("arrCart", res);
    });

    const requestCart = htc.expectOne(`${service.apiUrl}cart?${'user'}=${user.id}&${'active'}=${true}`);
    expect(arrCart).toBeFalsy();
    requestCart.flush(mockCart);
    expect(arrCart.length).toBe(2);
  });

  it("should fetch Favourites[]", () => {
    let arrFavourites!: Favourites[];
    service.getFavourite().subscribe((res: Favourites[]) => {
      arrFavourites = res;
      // console.log("arrFavourites", res);
    });

    const requestFavourite = htc.expectOne(`${service.apiUrl}favourites?user=${user.id}`);
    expect(arrFavourites).toBeFalsy();
    requestFavourite.flush(mockFavourites);
    expect(arrFavourites.length).toBe(2);
  });

  it("should fetch Food[]", () => {
    let arrFood!: Food[];
    service.getFood().subscribe((res: Food[]) => {
      arrFood = res;
      // console.log("arrFood", res);
    });

    const requestFood = htc.expectOne(`${service.apiUrl}food/`);
    expect(arrFood).toBeFalsy();
    requestFood.flush(mockFood);
    expect(arrFood.length).toBe(2);
  });

  it("should fetch Order[]", () => {
    let arrOrders!: Order[];
    service.getOrders().subscribe((res: Order[]) => {
      arrOrders = res;
      // console.log("arrOrders", res);
    });

    const requestOrders = htc.expectOne(`${service.apiUrl}orders/?user=${user.id}`);
    expect(arrOrders).toBeFalsy();
    requestOrders.flush(mockOrders);
    expect(arrOrders.length).toBe(2);
  });

  it("should fetch User[]", () => {
    let username: string = "akshat";
    let arrUsers!: User[];
    service.getUser(username).subscribe((res: User[]) => {
      arrUsers = res;
      // console.log("arrUsers", res);
    });

    const requestUser = htc.expectOne(`${service.apiUrl}users/?username=${username}`);
    expect(arrUsers).toBeFalsy();
    requestUser.flush(mockUsers);
    expect(arrUsers.length).toBe(1);
  });
});
