// Libraries
import { useState } from 'react'
import { checkboxFilters } from "../../sourceData/filters"
import { dowList } from "../../sourceData/dowList"
// import {useQuery} from "@tanstack/react-query"

// Components
import Checkbox from '../Checkbox'
import ModalForArray from '../ModalForArray'
// import { Button } from 'flowbite-react'

export default function AddRest() {
    const menuItemTypeText = {
        1: "$",
        2: "% Off",
        3: "$ Off"
    }
    const foodMenuItemTemplate = {
        name: "",
        description: "",
        Type: "Food",
        specialTypeId: 1,
        // 1 = price, 2 = percentDiscount, 3 = dollarsOff
        price: 0,
        percentDiscout: 0.5,
        dollarsOff: 0,
    }
    const drinkMenuItemTemplate = {
        name: "",
        description: "",
        Type: "Food",
        specialTypeId: 1,
        // 1 = price, 2 = percentDiscount, 3 = dollarsOff
        price: 0,
        percentDiscout: 0.5,
        dollarsOff: 0,
    }
    const [filterParams, setFilterParams] = useState(checkboxFilters)
    const [searchRestBool, setSearchRestBool] = useState(true)
    const [yelpRestData, setYelpRestData] = useState({})
    const [hoursData, setHoursData] = useState([
        { day: 0, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: true, start2: 22, end2: -1, end2close: true }, //monday
        { day: 1, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: true, start2: 22, end2: -1, end2close: true }, //tuesday
        { day: 2, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: true, start2: 22, end2: -1, end2close: true }, //weds
        { day: 3, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: -1, end2: -1, end2close: true }, // thurs
        { day: 4, hasHH1: true, start1: 15, end1: 18, end1close: false, hasHH2: false, start2: -1, end2: -1, end2close: true }, //friday
        { day: 5, hasHH1: false, start1: -1, end1: -1, end1close: false, hasHH2: false, start2: -1, end2: -1, end2close: true }, //sat
        { day: 6, hasHH1: false, start1: -1, end1: -1, end1close: false, hasHH2: true, start2: 22, end2: -1, end2close: true }, //sun
    ])
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

    const hhHoursMap = dowList.map((day) => {
        return (
            <li
                className='grid grid-cols-auto'
            >
                <div>{day}</div>
                <div>

                    <label
                        htmlFor={`${day}Hour1`}
                    >Happy Hour
                        <input
                            id={`${day}Hour1`}
                            min={0}
                            max={12}
                            type="number"
                            step={0.25}
                            className='border'
                            defaultValue={4}
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
                            defaultValue={0}
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
                <div>
                    <label
                        htmlFor={`${day}Hour2`}
                    >Late Night
                        <input
                            id={`${day}Hour2`}
                            min={0}
                            max={12}
                            type="number"
                            step={0.25}
                            className='border'
                            defaultValue={4}
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
                            defaultValue={0}
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

    const options = checkboxFilters
    console.log("options", options)

    const filtersMap = filterParams.map((filterVal, idx) => {
        return (
            <li>
                <Checkbox
                    idx={idx}
                    filterParams={filterParams}
                    data={filterVal}
                    setFilterParams={setFilterParams}
                />
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
                    <div>
                        <div>
                            <input
                                id='foodSpecialsBoolean'
                                type="checkbox"
                            />
                            <label
                                htmlFor='foodSpecialsBoolean'
                            >
                                Has Food Specials
                            </label>
                        </div>
                        <div>
                            <input
                                id='drinkSpecialsBoolean'
                                type="checkbox"
                            />
                            <label
                                htmlFor='drinkSpecialsBoolean'
                            >
                                has Drink Specials
                            </label>
                        </div>
                    </div>

                    {/* Main Menu Inputs */}
                    <p>Menu</p>
                    <div>
                        
                        {/* Food Menu Items */}
                        {mainMenuData.hasFoodSpecials &&
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
                                    onChange={(e)=>{setMainMenuData({...mainMenuData, foodSpecialsDescriptions:e.target.value})}}
                                />
                            </div>
                        }


                        {/* Drink Menu Items */}
                        {mainMenuData.hasDrinkSpecials &&
                            <div>
                                <label
                                    htmlFor='drinkSpecialDescription'
                                >
                                    Drink Special Description:
                                </label>
                                <br></br>
                                <textarea
                                    id='drinkSpecialDescription'
                                    onChange={(e)=>{setMainMenuData({...mainMenuData, drinkSpecialsDescriptions:e.target.value})}}
                                />
                            </div>
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}
