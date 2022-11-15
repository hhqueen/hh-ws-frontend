// Libraries
import React, { useState, useEffect } from 'react'
import { checkboxFilters } from "../../sourceData/filters"
import { dowList } from "../../sourceData/dowList"
import { useImmer } from "use-immer"
import { Checkbox, Label, Button, TextInput } from 'flowbite-react'
import EditMenuItems from "../EditMenuItems"
import { menuDiscountType } from "../../sourceData/menuDiscountType"
import militaryTimeConverter from '../../helperFunctions/militaryTimeConverter'
import axios from "axios"
import date from "date-and-time"

import YelpResponseModal from '../YelpResponseModal'
import BulkHoursUpdateModal from '../BulkHoursUpdateModal'
// const ModalForArray = React.lazy(()=>import('../ModalForArray'))
// import {useQuery} from "@tanstack/react-query"

// Components
// import Checkbox from '../Checkbox'

const emptyRestaurantData = {
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
    hasDrinks: false,
    hasFood: false,
    dogFriendly: false,
    hasPatio: false,
    cuisines: [],
    hours: [
        { day: 0, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: 21, end2: 0, end2close: false }, //monday
        { day: 1, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: 21, end2: 0, end2close: false }, //tuesday
        { day: 2, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: 21, end2: 0, end2close: false }, //weds
        { day: 3, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: 21, end2: 0, end2close: false }, // thurs
        { day: 4, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: 21, end2: 0, end2close: false }, //friday
        { day: 5, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: 21, end2: 0, end2close: false }, //sat
        { day: 6, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: 21, end2: 0, end2close: false }, //sun
    ],
    menu: {
        restaurantname: "",
        isChain: false,
        hasFoodSpecials: true,
        foodSpecialsDescriptions: "",
        foodMenu: [],
        hasDrinkSpecials: true,
        drinkSpecialsDescriptions: "",
        drinkMenu: []
    }
}

// const hourStateGenerator = () => {
//     const weekLength = 7
//     const hoursStateTemplate = {
//         day: 0,
//         hour1start: 3,
//         minute1start: 0,
//         ampm1start: "PM",
//         hour1end: 6,
//         minute1end: 0,
//         ampm1end: "PM",
//         hour2start: 9,
//         minute2start: 0,
//         ampm2start: "PM",
//         hour2end: 11,
//         minute2end: 0,
//         ampm2end: "PM",
//     }
//     let HoursArr = []
//     for (let i = 0; i < weekLength; i++) {
//         HoursArr.push(hoursStateTemplate)
//     }
//     return HoursArr
// }


export default function AddRest({ newRestFlag = true, passedRestData = null, currentLocation }) {

    // variables
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [messageModalOpen, setMessageModalOpen] = useState(false)
    const [yelpModalOpen, setYelpModalOpen] = useState(false)
    const [bulkHourModalOpen, setBulkHourModalOpen] = useState(false)
    const foodMenuItemTemplate = {
        name: "",
        description: "",
        Type: "Food",
        specialTypeId: 1,
        // 1 = price, 2 = percentDiscount, 3 = dollarsOff
        value: 0
    }

    const drinkMenuItemTemplate = {
        name: "",
        description: "",
        Type: "Drink",
        specialTypeId: 1,
        // 1 = price, 2 = percentDiscount, 3 = dollarsOff
        value: 0
    }
    const [restaurantData, setRestaurantData] = useImmer(newRestFlag ? emptyRestaurantData : passedRestData)
    const [newFoodMenuItemState, setNewFoodMenuItemState] = useImmer(foodMenuItemTemplate)
    const [newDrinkMenuItemState, setNewDrinkMenuItemState] = useImmer(drinkMenuItemTemplate)
    const [filterParams, setFilterParams] = useState(checkboxFilters)
    const [searchRestBool, setSearchRestBool] = useState(true)
    // const [yelpRestData, setYelpRestData] = useImmer({})
    const [yelpRestResponse, setYelpRestResponse] = useImmer({
        businesses: []
    })
    // const [hoursData, setHoursData] = useImmer(hourStateGenerator())
    // const [mainMenuData, setMainMenuData] = useState({
    //     restaurantname: "",
    //     isChain: false,
    //     hasFoodSpecials: true,
    //     foodSpecialsDescriptions: "",
    //     foodMenu: [],
    //     hasDrinkSpecials: true,
    //     drinkSpecialsDescriptions: "",
    //     drinkMenu: []
    // })
    // const [foodMenuData, setFoodMenuData] = useState([])
    // const [drinksMenuData, setDrinksMenuData] = useState([])
    const [searchParams, setSearchParams] = useImmer({
        term: "",
        location: {
            isCoordinates: false,
            address: "",
            lat: 0,
            long: 0
        }
    })

    const handleHourInputChange = (e, idx) => {
        setRestaurantData((draft) => {
            const hour = Number(date.transform(e.target.value, "HH:mm", "HH"))
            const minute = Number(date.transform(e.target.value, "HH:mm", "mm")) / 60
            const time = hour + minute
            console.log(time)
            draft.hours[idx][e.target.name] = time
        })
    }

  

    useEffect(() => {
        filterParams.forEach((filter) => {
            setRestaurantData((draft) => {
                draft[filter.name] = filter.value
            });
            // console.log("i-restaurantData", restaurantData)
        })
    }, [filterParams])

    // Handler Functions

    const handleSearchButton = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants/yelpSearch?search=${searchParams.term}&lat=${searchParams.location.lat}&long=${searchParams.location.long}&address=${searchParams.location.address}`)
            const yelpRestList = response.data
            console.log(yelpRestList)
            setYelpRestResponse(yelpRestList)
        } catch (error) {
            console.log(error)
        }
    }
    const handlePickOneYelpRestaurant = (business) => {
        setRestaurantData((draft) => {
            draft.yelpRestaurantId = business.id
            draft.name = business.name
            draft.telNumber = business.phone
            draft.cuisines = business.categories
            draft.displayNumber = business.display_phone
            draft.address1 = business.location.address1
            draft.address2 = business.location.address2
            draft.address3 = business.location.address3
            draft.state = business.location.state
            draft.city = business.location.city
            draft.zip_code = business.location.zip_code
            draft.country = business.location.country
            draft.longitude = business.coordinates.longitude
            draft.latitude = business.coordinates.latitude
            draft.image_url = business.image_url
        })
        setSearchRestBool(false)
    }

    const onModalClick = () => {
        setYelpModalOpen(!yelpModalOpen)
    }

    const onClose = () => {
        setYelpModalOpen(false)
        // setSearchRestBool(false)
    }
    const handleAddFoodNewMenuItem = (e, type) => {
        e.preventDefault()
        // console.log(newFoodMenuItemState)
        setRestaurantData((draft) => {
            draft.menu.foodMenu.push(newFoodMenuItemState)
        })

        setNewFoodMenuItemState(foodMenuItemTemplate)
    }

    const handleAddDrinkNewMenuItem = (e) => {
        e.preventDefault()
        // console.log(newDrinkMenuItemState)
        setRestaurantData((draft) => {
            draft.menu.drinkMenu.push(newDrinkMenuItemState)
        })
        setNewDrinkMenuItemState(drinkMenuItemTemplate)
    }

    const handleEditNewMenuItem = (e, type, idx) => {
        e.preventDefault()
        const typeVar = type.toLowerCase()
        setRestaurantData((draft) => {
            draft.menu[`${typeVar}Menu`][idx][e.target.name] = e.target.value
        })
    }

    const handleRemoveNewMenuItem = (e, type, idx) => {
        e.preventDefault()
        const typeVar = type.toLowerCase()
        setRestaurantData((draft) => {
            draft.menu[`${typeVar}Menu`].splice(idx, 1)
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const reqbody = { restaurantData }
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/restaurants/newRestaurant`, reqbody)
            console.log(response)

        } catch (error) {
            console.warn(error)
        }

    }

    const handleBulkHourSubmit = (e,daysArr,hourData)=>{
        e.preventDefault()
        // console.log("Click")
        console.log("click")
        const filteredDaysArr = daysArr.filter(day=>day.updateBool === true)
        setRestaurantData((draft)=>{
            filteredDaysArr.forEach((filteredDay)=>{
                console.log("hourData.end2",hourData.end2)
                let foundDay = draft.hours.find(hour=>hour.day===filteredDay.dayIdx)
                console.log(foundDay.hasHH1)
                foundDay.hasHH1 = hourData.hasHH1
                foundDay.start1 = hourData.start1
                foundDay.end1 = hourData.end1
                foundDay.hasHH2 = hourData.hasHH2
                foundDay.start2 = hourData.start2
                foundDay.end2 = hourData.end2
                foundDay.end2close = hourData.end2close
                console.log(`${foundDay.day} found and updated`)
            })
        })
        setBulkHourModalOpen(false)

    }

    const filtersMap = checkboxFilters.map((filterVal, idx) => {
        return (
            <li
                key={`AddRestFilter${idx}`}
            >
                <label>
                    <Checkbox
                        checked={restaurantData[filterVal.name]}
                        name={filterVal.name}
                        onChange={
                            (e) => {
                                setRestaurantData((draft) => {
                                    draft[filterVal.name] = e.target.checked
                                })
                            }
                        }
                    />
                    {filterVal.display}
                </label>

            </li>
        )
    })

    const hhHoursMap = dowList.map((day, idx) => {
        return (
            <>
                <div
                    className='p-3'
                >
                    {day}
                    <div>
                        <Label>
                            <Checkbox
                                name='hasHH1'
                                checked={restaurantData.hours[idx].hasHH1}
                                onChange={(e) => setRestaurantData(
                                    (draft) => { draft.hours[idx].hasHH1 = e.target.checked }
                                )}

                            />Happy Hour</Label>
                        <div>
                            {/* <div>
                            <Label>
                                <Checkbox
                                    checked={restaurantData.hours[idx].end1close}
                                    onChange={(e) => setRestaurantData(
                                        (draft) => { draft.hours[idx].end1close = e.target.checked }
                                    )}

                                />Til-Close</Label>
                        </div> */}
                            <input
                                id={`${day}Hour1Start`}
                                className="min-w-[50px] text-xs"
                                name="start1"
                                type="time"
                                value={militaryTimeConverter(restaurantData.hours[idx].start1)}
                                // defaultValue="15:00"
                                onChange={(e) => handleHourInputChange(e, idx)}
                                disabled={restaurantData.hours[idx].hasHH1 === false}
                            />

                            <input
                                id={`${day}Hour1end`}
                                className="min-w-[50px] text-xs"
                                name="end1"
                                type="time"
                                value={militaryTimeConverter(restaurantData.hours[idx].end1)}
                                // defaultValue="18:00"
                                onChange={(e) => handleHourInputChange(e, idx)}
                                disabled={restaurantData.hours[idx].hasHH1 === false || restaurantData.hours[idx].end1close === true}
                            />
                        </div>

                    </div>

                    <div>
                        <Label>
                            <Checkbox
                                checked={restaurantData.hours[idx].hasHH2}
                                onChange={(e) => setRestaurantData(
                                    (draft) => { draft.hours[idx].hasHH2 = e.target.checked }
                                )}

                            />Late Night</Label>
                        <div
                        className='flex'
                        >
                           
                            <input
                                id={`${day}Hour2Start`}
                                className="min-w-[50px] text-xs"
                                name="start2"
                                type="time"
                                value={militaryTimeConverter(restaurantData.hours[idx].start2)}
                                // defaultValue="15:00"
                                onChange={(e) => handleHourInputChange(e, idx)}
                                disabled={restaurantData.hours[idx].hasHH2 === false}
                            />
                            {
                                restaurantData.hours[idx].end2close ?
                            
                            <div
                                className="min-w-[50px]  w-[110px] text-center "
                            >
                               to Close
                            </div>
                                :
                            <input
                                id={`${day}Hour2end`}
                                className="min-w-[50px] text-xs"
                                name="end2"
                                type="time"
                                value={militaryTimeConverter(restaurantData.hours[idx].end2)}
                                // defaultValue="18:00"
                                onChange={(e) => handleHourInputChange(e, idx)}
                                disabled={restaurantData.hours[idx].hasHH2 === false || restaurantData.hours[idx].end2close === true}
                            />
                             }
                             <div>
                                <Label>
                                    <Checkbox
                                        checked={restaurantData.hours[idx].end2close}
                                        onChange={(e) => setRestaurantData(
                                            (draft) => { draft.hours[idx].end2close = e.target.checked }
                                        )}

                                    />Til-Close</Label>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    })

    return (
        <div
            className='px-2'
        >
            <form
                onSubmit={(e) => handleFormSubmit(e)}
            >
                <Button
                    className='border'
                    type="submit"
                    disabled={formSubmitted}
                    onClick={()=>{
                        setFormSubmitted(true)
                    }}
                >Submit</Button>

                <YelpResponseModal
                    yelpList={yelpRestResponse}
                    modalOpen={yelpModalOpen}
                    onClose={onClose}
                    onModalClick={onModalClick}
                    handlePickOneYelpRestaurant={handlePickOneYelpRestaurant}
                />
                {/* div that holds yelp search input */}
                <div
                className='py-3'
                >
                    <h1>Search Yelp Restaurant:</h1>
                    {
                        searchRestBool ?
                            // {/* search container */}
                            <div>
                                <div>
                                <label
                                    htmlFor='yelpSearchTerm'
                                >Search Term:</label>
                                <input
                                    id='yelpSearchTerm'
                                    className='border'
                                    type="text"
                                    value={searchParams.term}
                                    onChange={(e) => {
                                        setSearchParams((draft) => {
                                            draft.term = e.target.value
                                        })
                                    }}
                                />
                                </div>
                                <div>
                                <label
                                    htmlFor='yelpSearchLoc'
                                >Location:</label>
                                <input
                                    id='yelpSearchLoc'
                                    className='border'
                                    list="yelpSearchLocList"
                                    type="text"
                                    value={searchParams.location.address}
                                    onChange={(e) => {
                                        setSearchParams((draft) => {
                                            draft.location.address = e.target.value
                                            if (e.target.value === "Current Location") {
                                                draft.location.long = currentLocation.longitude
                                                draft.location.lat = currentLocation.latitude
                                            }
                                        })
                                    }}
                                />
                                
                                <datalist id="yelpSearchLocList">
                                    <option className="font-['Roboto']" value="Current Location">Current Location</option>
                                </datalist>
                                </div>
                                <Button
                                    onClick={() => {
                                        handleSearchButton()
                                        onModalClick()
                                    }}
                                    type='button'
                                    className="border"
                                >Search</Button>
                            </div>
                            :
                            // {/* results Container */}
                            <div>
                                <p>Yelp Results Container</p>
                                <img
                                    alt={restaurantData.name}
                                    src={restaurantData.image_url}
                                />
                                <p>{restaurantData.name}</p>
                                <p>{restaurantData.address1}</p>
                                <p>{restaurantData.city}</p>
                                <Button
                                    type='button'
                                    className='border'
                                    onClick={() => {
                                        setSearchRestBool(true)
                                        // onModalClick()
                                        console.log(searchRestBool)
                                        console.log("Reset Search Clicked")
                                    }}
                                >Reset Search</Button>
                            </div>
                    }

                    {/* <Button></Button> */}
                </div>

                {/* div that filters option input */}
                <div
                className='py-3'
                >
                    <p>Filters:</p>
                    <ul>
                        {filtersMap}
                    </ul>
                </div>

                {/* div that holds hours input */}
                <div
                className='py-3'
                >
                    <p>Hours:</p>
                    <Button
                    type="button"
                    className='border rounded-xl'
                    onClick={()=>{
                        setBulkHourModalOpen(true)
                    }}
                    >
                        Bulk Update Hours
                    </Button>

                    <BulkHoursUpdateModal
                    bulkHourModalOpen={bulkHourModalOpen}
                    setBulkHourModalOpen={setBulkHourModalOpen}
                    handleFormSubmit={handleBulkHourSubmit}
                    />

                    
                    {/* <p>Day</p>
                        <p>Happy Hour</p>
                        <p>Late Night</p> */}
                    {hhHoursMap}
                </div>

                {/* div that holds menu input */}

                {/* Main Menu Inputs */}
                <div
                className='py-3'
                >
                <p>Menu:</p>
                    <div
                        
                    >
                        {/* food/drink checkbox */}
                        <div
                        
                        >
                            <div>
                                <input
                                    id='foodSpecialsBoolean'
                                    type="checkbox"
                                    checked={restaurantData.menu.hasFoodSpecials}
                                    onChange={(e) => {
                                        setRestaurantData((draft) => {
                                            draft.menu.hasFoodSpecials = e.target.checked
                                        })
                                    }}
                                />
                                <label
                                    htmlFor='foodSpecialsBoolean'
                                >
                                    Has Food Specials
                                </label>
                            </div>
                        </div>


                        {/* Food Menu Items */}
                        {restaurantData.menu.hasFoodSpecials &&
                            <div
                                className='border mb-3'
                            >
                                <p>Add Food Menu/Items:</p>

                                <label
                                    htmlFor='foodSpecialDescription'
                                >
                                    Food Special Description:
                                </label>
                                <br></br>
                                <textarea
                                    id='foodSpecialDescription'
                                    onChange={(e) => {
                                        setRestaurantData((draft) => {
                                            draft.menu.foodSpecialsDescriptions = e.target.value
                                        })
                                    }}
                                />


                                {/* div that holds the add new items button */}
                                <div>
                                    <p>new Food Item</p>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder='name'
                                            value={newFoodMenuItemState.name}
                                            onChange={(e) => {
                                                setNewFoodMenuItemState((draft) => {
                                                    draft.name = e.target.value
                                                })
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder='description'
                                            value={newFoodMenuItemState.description}
                                            onChange={(e) => {
                                                setNewFoodMenuItemState((draft) => {
                                                    draft.description = e.target.value
                                                })
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='newFoodDiscountType'>Discount Type</label>
                                        <select
                                            name="newFoodDiscountType"
                                            id="newFoodDiscountType"
                                            onChange={(e) => {
                                                setNewFoodMenuItemState((draft) => {
                                                    draft.specialTypeId = e.target.value
                                                })
                                            }}
                                        >
                                            {/* // 1 = price, 2 = percentDiscount, 3 = dollarsOff */}
                                            <option value={1}>$ </option>
                                            <option value={2}>% Off</option>
                                            <option value={3}>$ Off</option>
                                        </select>
                                    </div>

                                    <input
                                        type="number"
                                        value={newFoodMenuItemState.value}
                                        onChange={(e) => {
                                            setNewFoodMenuItemState((draft) => {
                                                draft.value = e.target.value
                                            })
                                        }}
                                    />
                                    <Button
                                        type='button'
                                        onClick={handleAddFoodNewMenuItem}
                                    >Add New Food Item</Button>
                                </div>

                                {/* div that holds food menu items as they are added */}
                                <div>
                                    {
                                        restaurantData.menu.foodMenu.length > 0 &&
                                        <EditMenuItems
                                            ItemsArr={restaurantData.menu.foodMenu}
                                            handleInputChange={handleEditNewMenuItem}
                                            handleRemove={handleRemoveNewMenuItem}
                                        />
                                    }
                                </div>

                            </div>
                        }
                    </div>
                    {/* DRINKS AREA */}
                    <div>


                        <div>
                            <input
                                id='drinkSpecialsBoolean'
                                type="checkbox"
                                checked={restaurantData.menu.hasDrinkSpecials}
                                onChange={(e) => {
                                    setRestaurantData((draft) => {
                                        draft.menu.hasDrinkSpecials = e.target.checked
                                    })
                                }}
                            />
                            <label
                                htmlFor='drinkSpecialsBoolean'
                            >
                                has Drink Specials
                            </label>
                        </div>
                        {/* Drink Menu Items */}
                        {restaurantData.menu.hasDrinkSpecials &&
                            <>
                                <div>
                                    <label
                                        htmlFor='drinkSpecialDescription'
                                    >
                                        Drink Special Description:
                                    </label>
                                    <br></br>
                                    <textarea
                                        id='drinkSpecialDescription'
                                        onChange={(e) => {
                                            setRestaurantData((draft) => {
                                                draft.menu.drinkSpecialsDescriptions = e.target.value
                                            })
                                        }}
                                    />
                                </div>

                                <div>
                                    <div>
                                        <p>new Drink Item</p>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder='name'
                                                value={newDrinkMenuItemState.name}
                                                onChange={(e) => {
                                                    setNewDrinkMenuItemState((draft) => {
                                                        draft.name = e.target.value
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder='description'
                                                value={newDrinkMenuItemState.description}
                                                onChange={(e) => {
                                                    setNewDrinkMenuItemState((draft) => {
                                                        draft.description = e.target.value
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='newDrinkDiscountType'>Discount Type</label>
                                            <select
                                                name="newDrinkDiscountType"
                                                id="newDrinkDiscountType"
                                                onChange={(e) => {
                                                    setNewDrinkMenuItemState((draft) => {
                                                        draft.specialTypeId = e.target.value
                                                    })
                                                }}
                                            >
                                                {/* // 1 = price, 2 = percentDiscount, 3 = dollarsOff */}
                                                {
                                                    Object.entries(menuDiscountType).map((discount) => {
                                                        return <option value={discount[0]}>{discount[1]}</option>
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <input
                                            type="number"
                                            value={newDrinkMenuItemState.value}
                                            onChange={(e) => {
                                                setNewDrinkMenuItemState((draft) => {
                                                    draft.value = e.target.value
                                                })
                                            }}
                                        />
                                        <Button
                                            type='button'
                                            onClick={handleAddDrinkNewMenuItem}
                                        >Add New Drink Item</Button>
                                    </div>

                                    {/* div that holds food menu items as they are added */}
                                    <div>
                                        {
                                            restaurantData.menu.drinkMenu.length > 0 &&
                                            <EditMenuItems
                                                ItemsArr={restaurantData.menu.drinkMenu}
                                                handleInputChange={handleEditNewMenuItem}
                                                handleRemove={handleRemoveNewMenuItem}
                                            />
                                        }
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>

            </form>
        </div>
    )
}
