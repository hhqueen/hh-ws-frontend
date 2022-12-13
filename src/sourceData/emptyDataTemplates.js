export const checkboxFilters = [
    { name: "dogFriendly", display: "Dog Friendly", value: false },
    { name: "hasPatio", display: "Patio", value: false  },
    { name: "hasFood", display: "Food", value: false  },
    { name: "hasDrinks", display: "Drinks", value: false  },
  ]

export const emptyRestaurantData = {
    yelpRestaurantId: null,
    name: null,
    telNumber: null,
    displayNumber: null,
    address1: null,
    address2: null,
    address3: null,
    city: null,
    zip_code: null,
    country: null,
    state: null,
    latitude: null,
    longitude: null,
    image_url: null,
    filterParams: checkboxFilters,
    cuisines: [],
    hourSet: {
        hours:[
            { day: 0, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: 21, end2: 0, end2close: false }, //monday
            { day: 1, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: 21, end2: 0, end2close: false }, //tuesday
            { day: 2, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: 21, end2: 0, end2close: false }, //weds
            { day: 3, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: 21, end2: 0, end2close: false }, // thurs
            { day: 4, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: 21, end2: 0, end2close: false }, //friday
            { day: 5, hasHH1: false, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: 21, end2: 0, end2close: false }, //sat
            { day: 6, hasHH1: false, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: 21, end2: 0, end2close: false }, //sun
        ],
    },   
    menu: {
        restaurantname: "",
        isChain: false,
        hasFoodSpecials: true,
        foodSpecialsdescription: "",
        foodMenu: [],
        foodMenuImg: null,
        hasDrinkSpecials: true,
        drinkSpecialsdescription: "",
        drinkMenu: [],
        drinkMenuImg: null,
        isFoodAndDrinkMenu: true,
        foodAndDrinkMenuImg: null
    }
}

export const foodMenuItemTemplate = {
    name: "",
    description: "",
    Type: "Food",
    specialTypeId: 1,
    // 1 = price, 2 = percentDiscount, 3 = dollarsOff
    value: 0
}

export const drinkMenuItemTemplate = {
    name: "",
    description: "",
    Type: "Drink",
    specialTypeId: 1,
    // 1 = price, 2 = percentDiscount, 3 = dollarsOff
    value: 0
}

export const emptyMessageModalProp = {
    modalOpen: false,
    onClose: null,
    header: null,
    body: null,
    button1text: "",
    button2text: "",
    handleButton1Click: null,
    handleButton2Click: null,
}

export const emptySearchParams = {
    term: "",
    location: {
        isCoordinates: false,
        address: "",
        lat: 0,
        long: 0
    }
}