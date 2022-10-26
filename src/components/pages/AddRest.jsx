// Libraries
import { useState, useEffect } from 'react'
import { checkboxFilters } from "../../sourceData/filters"
import { dowList } from "../../sourceData/dowList"
import { useImmer } from "use-immer"
import { Checkbox, Label } from 'flowbite-react'

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
        { day: 0, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: true, start2: 22, end2: -1, end2close: true }, //monday
        { day: 1, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: true, start2: 22, end2: -1, end2close: true }, //tuesday
        { day: 2, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: true, start2: 22, end2: -1, end2close: true }, //weds
        { day: 3, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: -1, end2: -1, end2close: true }, // thurs
        { day: 4, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: -1, end2: -1, end2close: true }, //friday
        { day: 5, hasHH1: false, start1: -1, end1: -1, end1close: false, hasHH2: false, start2: -1, end2: -1, end2close: true }, //sat
        { day: 6, hasHH1: false, start1: -1, end1: -1, end1close: false, hasHH2: true, start2: 22, end2: -1, end2close: true }, //sun
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

const hourStateGenerator = () =>{
    const weekLength = 7
    const hoursStateTemplate = {
        hour1start:3,
        minute1start:0,
        ampm1start:"PM",
        hour1end:6,
        minute1end:0,
        ampm1end:"PM",
        hour2start:9,
        minute2start:0,
        ampm2start:"PM",
        hour2end:11,
        minute2end:0,
        ampm2end:"PM",
    }
    let HoursArr = []
    for(let i=0;i<weekLength;i++){
        HoursArr.push(hoursStateTemplate)
    }
    return HoursArr
}


export default function AddRest({ newRestFlag = true, passedRestData = null }) {

    const [restaurantData, setRestaurantData] = useImmer(newRestFlag ? emptyRestaurantData : passedRestData)

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
        Type: "Food",
        specialTypeId: 1,
        // 1 = price, 2 = percentDiscount, 3 = dollarsOff
        value: 0
    }
    const [filterParams, setFilterParams] = useState(checkboxFilters)
    const [searchRestBool, setSearchRestBool] = useState(true)
    const [yelpRestData, setYelpRestData] = useState({})
    
    
    const [hoursData, setHoursData] = useImmer(hourStateGenerator())
    

    const [mainMenuData, setMainMenuData] = useState({
        restaurantname: "",
        isChain: false,
        hasFoodSpecials: true,
        foodSpecialsDescriptions: "",
        foodMenu: [],
        hasDrinkSpecials: true,
        drinkSpecialsDescriptions: "",
        drinkMenu: []
    })
    const [foodMenuData, setFoodMenuData] = useState([])
    const [drinksMenuData, setDrinksMenuData] = useState([])
    const [searchParams, setSearchParams] = useState({
        term: "",
        location: {
            isCoordinates: false,
            address: "",
            lat: 0,
            long: 0
        }
    })

    const hhHoursMap = dowList.map((day,idx) => {
        return (
            <li
                className='grid grid-cols-auto'
            >   
                <div>{day}</div>
                <Label>
                    <Checkbox
                    checked={restaurantData.hours[idx].hasHH1}
                    onChange={(e)=>setRestaurantData(
                        (draft)=>{draft.hours[idx].hasHH1 = e.target.checked}
                    )}

                />Has Happy Hour</Label>
                <div>

                    <label
                        htmlFor={`${day}Hour1`}
                    >Happy Hour
                        <input
                            id={`${day}Hour1`}
                            min={0}
                            max={12}
                            type="number"
                            step={1}
                            className='border'
                            defaultValue={hoursData[idx].hour1start}
                            onChange={(e)=>setHoursData((draft)=>{
                                draft[idx].hour1start = e.target.value
                            })}
                        />
                    </label>
                    <label
                        htmlFor={`${day}Minute1`}
                    >
                        <input
                            id={`${day}Minute1`}
                            min={0}
                            max={59}
                            type="number"
                            step={1}
                            className='border'
                            defaultValue={hoursData[idx].minute1start}
                            onChange={(e)=>setHoursData((draft)=>{
                                draft[idx].minute1start = e.target.value
                            })}
                        />
                    </label>
                    <label
                        htmlFor='ampm'
                    >
                        <select
                            id='ampm'
                            name='ampm'
                            onChange={(e)=>setHoursData((draft)=>{
                                draft[idx].ampm1start = e.target.value
                            })}
                        >
                            <option value="PM">PM</option>
                            <option value="AM">AM</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label
                        htmlFor={`${day}Hour2`}
                    >Late Night
                    <Label>
                    <Checkbox
                    checked={restaurantData.hours[idx].hasHH2}
                    onChange={(e)=>setRestaurantData(
                        (draft)=>{draft.hours[idx].hasHH2 = e.target.checked}
                    )}

                />HasLate Night</Label>
                        <input
                            id={`${day}Hour2`}
                            min={0}
                            max={12}
                            type="number"
                            step={1}
                            className='border'
                            defaultValue={hoursData[idx].hour2start}
                            onChange={(e)=>setHoursData((draft)=>{
                                draft[idx].hour2start = e.target.value
                            })}
                        />
                    </label>
                    <label
                        htmlFor={`${day}Minute2`}
                    >
                        <input
                            id={`${day}Minute2`}
                            min={0}
                            max={59}
                            type="number"
                            step={1}
                            className='border'
                            defaultValue={hoursData[idx].minute2start}
                            onChange={(e)=>setHoursData((draft)=>{
                                draft[idx].minute2start = e.target.value
                            })}
                        />
                    </label>
                    <label
                        htmlFor='ampm'
                    >
                        <select
                            id='ampm'
                            name='ampm'
                        >
                            <option value="PM">PM</option>
                            <option value="AM">AM</option>
                        </select>
                    </label>
                </div>
            </li>
        )
    })

    useEffect(() => {
        filterParams.forEach((filter) => {
            setRestaurantData((draft) => {
                const filterItem = draft[filter.name] = filter.value
            });
            console.log("i-restaurantData", restaurantData)
        })
    }, [filterParams])

    const handleAddNewMenuItem = (arr) => {

    }

    const handleRemoveNewMenuItem = (arr, idx) => {

    }
    const options = checkboxFilters
    // console.log("options", options)

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

    return (
        <div
            className='ml-10'
        >
            <form
                onSubmit={''}
            >

                {/* div that holds yelp search input */}
                <div>
                    {
                        searchRestBool ?
                            // {/* search container */}
                            <div>
                                <label
                                    htmlFor='yelpSearchTerm'
                                >Search:</label>
                                <input
                                    id='yelpSearchTerm'
                                    className='border'
                                    type="input"
                                />
                                <label
                                    htmlFor='yelpSearchLoc'
                                >Location:</label>
                                <input
                                    id='yelpSearchLoc'
                                    className='border'
                                    type="input"
                                />
                                <button
                                    onClick={() => { setSearchRestBool(false) }}
                                    type='button'
                                    className="border"
                                >Search</button>
                            </div>
                            :
                            // {/* results Container */}
                            <div>
                                <p>Yelp Results Container</p>

                                <button
                                    type='button'
                                    className='border'
                                    onClick={() => { setSearchRestBool(true) }}
                                >Reset Search</button>
                            </div>
                    }

                    <button></button>
                </div>

                {/* div that holds options input */}
                <div>
                    <p>Filters:</p>
                    <ul>
                        {filtersMap}
                    </ul>
                </div>

                {/* div that holds hours input */}
                <div>
                    <p>Hours:</p>
                    <ul
                        className=''
                    >
                        {/* <p>Day</p>
                        <p>Happy Hour</p>
                        <p>Late Night</p> */}
                        {hhHoursMap}
                    </ul>
                </div>

                {/* div that holds menu input */}
                <div>
                    {/* Main Menu Inputs */}
                    <p>Menu</p>
                    <div>

                        {/* food/drink checkbox */}
                        <div>
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

                        {/* Food Menu Items */}
                        {restaurantData.menu.hasFoodSpecials &&
                            <div
                                className='border'
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
                                {/* div that holds food menu items as they are added */}
                                <div>

                                </div>

                                {/* div that holds the add new items button */}
                                <div>


                                </div>


                            </div>
                        }


                        {/* Drink Menu Items */}
                        {restaurantData.menu.hasDrinkSpecials &&
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
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}
