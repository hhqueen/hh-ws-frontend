// Libraries
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { dowList } from "../../sourceData/dowList"
import { useImmer } from "use-immer"
import { Checkbox, Label, Button, TextInput, Select } from 'flowbite-react'
import EditMenuItems from "../EditMenuItems"
import militaryTimeConverter from '../../helperFunctions/militaryTimeConverter'
import axios from "axios"
import date from "date-and-time"
import geoLocation from '../../helperFunctions/geoLocation'

import YelpResponseModal from '../modals/YelpResponseModal'
import BulkHoursUpdateModal from '../modals/BulkHoursUpdateModal'
import MessageModal from '../modals/MessageModal'
import LoadingComp from '../LoadingComp'
import ImageUploadModal from '../modals/ImageUploadModal'
import { siteSettings } from "../../sourceData/siteSettings"
import {
    emptyRestaurantData,
    foodMenuItemTemplate,
    drinkMenuItemTemplate,
    emptyMessageModalProp,
    emptySearchParams,
} from "../../sourceData/emptyDataTemplates"

// Components
// import Checkbox from '../Checkbox'

const getOneRestaurantInfo = async (id) => {
    console.log("restId for Edit:", id)
    const getOneRest = await axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants/${id}`)
    console.log("get One Async Data", getOneRest.data)
    return getOneRest.data
}


export default function AddEditRest({ currentLocation ,mainDivStyle }) {

    // variables
    const { id } = useParams()
    const navigate = useNavigate()
    const [foodAndDrinkMenuImgModalState, setFoodAndDrinkMenuImgModalState] = useState(false)
    const [foodMenuImgModalState, setFoodMenuImgModalState] = useState(false)
    const [drinkMenuImgModalState, setDrinkMenuImgModalState] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [messageModalProps, setMessageModalProps] = useImmer(emptyMessageModalProp)
    const [yelpModalOpen, setYelpModalOpen] = useState(false)
    const [bulkHourModalOpen, setBulkHourModalOpen] = useState(false)
    const [restaurantData, setRestaurantData] = useImmer(emptyRestaurantData)
    const [newFoodMenuItemState, setNewFoodMenuItemState] = useImmer(foodMenuItemTemplate)
    const [newDrinkMenuItemState, setNewDrinkMenuItemState] = useImmer(drinkMenuItemTemplate)
    const [searchRestBool, setSearchRestBool] = useState(true)
    const [yelpRestResponse, setYelpRestResponse] = useImmer([])
    const [searchParams, setSearchParams] = useImmer(emptySearchParams)

    // init useEffect
    useEffect(()=>{
        // set search location to "Current Location"
        setSearchParams((draft)=>{
            draft.location.address = "Current Location"
        })
    },[])
    
    // set searchParam lat and long to current geolocation when address = "Current Location"
    useEffect(()=>{
        const execute = async () => {
            console.log("execute UseEffect")
            try {
                if(searchParams.location.address === "Current Location") {
                    const clCoordinates = await geoLocation()
                    console.log("clCoordinates:",clCoordinates)
                    setSearchParams((draft)=>{
                        draft.location.lat = clCoordinates.latitude
                        draft.location.long = clCoordinates.longitude
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
        execute()
    },[searchParams.location.address])

    // useEffect(()=>{
    //     setSearchParams((draft)=>{
    //         draft.location.address="Current Location"
    //         draft.location.lat = currentLocation.latitude
    //         draft.location.long = currentLocation.longitude
    //     })
    // },[currentLocation])


    useEffect(() => {
        const execute = async () => {
            try {
                if (id !== undefined) {
                    console.log("id:", id)
                    const restResponse = await getOneRestaurantInfo(id)
                    setRestaurantData(restResponse)
                    setSearchRestBool(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        execute()
    }, [id])




    // Handler Functions
    async function checkDBforYelpId(yelpId) {
        try {
            const foundRest = await axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants/dbYelpIdCheck/${yelpId}`)
            console.log("foundRest.data:",foundRest.data)
            if (foundRest.data === null) return false
            return true
        } catch (error) {
            console.log(error)
        }
    } 

    const handleHourInputChange = (e, idx) => {
        setRestaurantData((draft) => {
            const hour = Number(date.transform(e.target.value, "HH:mm", "HH"))
            const minute = Number(date.transform(e.target.value, "HH:mm", "mm")) / 60
            draft.hourSet.hours[idx][e.target.name] = hour + minute
        })
    }

    const handleSearchButton = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants/yelpSearch?search=${searchParams.term}&lat=${searchParams.location.lat}&long=${searchParams.location.long}&address=${searchParams.location.address}`)
            const yelpRestList = response.data.results.businesses
            setYelpRestResponse((draft) => draft = yelpRestList)
            onModalClick()
        } catch (error) {
            console.log(error)
        }
    }


    const handlePickOneYelpRestaurant = async (business) => {
        // check if yelp restaurant is in the db
        const restAlreadyExists = await checkDBforYelpId(business.id)
        // modal if it is
        console.log("restAlreadyExists:",restAlreadyExists)
        if (restAlreadyExists) {
            console.log("restaurant already exists!")
            setMessageModalProps((draft) => {
                draft.modalOpen = true
                draft.body = `${business.name} - ${business.location.city} already exists!`
                draft.button1text = "Okay!"
                draft.handleButton1Click = () => { setMessageModalProps((draft) => { draft.modalOpen = false }) }
            })
            return
        }

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
    }
    const handleAddFoodNewMenuItem = (e, type) => {
        e.preventDefault()
        setRestaurantData((draft) => draft.menu.foodMenu.push(newFoodMenuItemState))
        setNewFoodMenuItemState(foodMenuItemTemplate)
    }

    const handleAddDrinkNewMenuItem = (e) => {
        e.preventDefault()
        setRestaurantData((draft) => draft.menu.drinkMenu.push(newDrinkMenuItemState))
        setNewDrinkMenuItemState(drinkMenuItemTemplate)
    }

    const handleEditNewMenuItem = (e, type, idx) => {
        e.preventDefault()
        const typeVar = type.toLowerCase()
        setRestaurantData((draft) => draft.menu[`${typeVar}Menu`][idx][e.target.name] = e.target.value)
    }

    const handleRemoveNewMenuItem = (e, type, idx) => {
        e.preventDefault()
        setRestaurantData((draft) => draft.menu[`${type.toLowerCase()}Menu`].splice(idx, 1))
    }

    const handleResetSearch = () => {
        setSearchRestBool(true)
        // onModalClick()
        console.log(searchRestBool)
        console.log("Reset Search Clicked")
        setRestaurantData((draft) => {
            draft.yelpRestaurantId = null
            draft.name = null
            draft.telNumber = null
            draft.cuisines = null
            draft.displayNumber = null
            draft.address1 = null
            draft.address2 = null
            draft.address3 = null
            draft.state = null
            draft.city = null
            draft.zip_code = null
            draft.country = null
            draft.longitude = null
            draft.latitude = null
            draft.image_url = null
        })
        setSearchParams((draft) => {
            draft.term = ""
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const reqbody = { restaurantData }
        // console.log("reqbody clientside:", reqbody)
        try {
            // console.log("Form Submitted")
            setMessageModalProps((draft) => {
                draft.modalOpen = true
                draft.body = <LoadingComp />
            })
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/restaurants/newRestaurant`, reqbody)
            console.log(response)
            setMessageModalProps((draft) => {
                if (response.status === 201) {
                    draft.body = response.data.msg
                    draft.button1text = "Add Another Restaurant"
                    draft.handleButton1Click = () => {
                        setMessageModalProps((draft) => {
                            draft.header = null
                            draft.body = null
                            draft.modalOpen = false
                            draft.button1text = ""
                            draft.handButton1Click = null
                            draft.button2text = ""
                            draft.handButton2Click = null
                        })
                        setRestaurantData(emptyRestaurantData)

                        handleResetSearch()
                    }
                    draft.button2text = "See Created Restaurant"
                    draft.handleButton2Click = () => {
                        console.log(response.data.id)
                        navigate(`/restaurant/${response.data.id}`)
                    }
                } else {
                    draft.body = response.data.msg
                    draft.button1text = "Go back to Add New Restaurant Page"
                    draft.handleButton1Click = () => { setMessageModalProps((draft) => { draft.modalOpen = false }) }
                }
            })
        } catch (error) {
            console.warn(error)
        } finally {
            setFormSubmitted(false)
        }
    }

    const handleBulkHourSubmit = (e, daysArr, hourData) => {
        e.preventDefault()
        // console.log("Click")
        console.log("click")
        const filteredDaysArr = daysArr.filter(day => day.updateBool === true)
        setRestaurantData((draft) => {
            filteredDaysArr.forEach((filteredDay) => {
                console.log("hourData.end2", hourData.end2)
                let foundDay = draft.hourSet.hours.find(hour => hour.day === filteredDay.dayIdx)
                console.log(foundDay.hasHH1)
                foundDay.hasHH1 = hourData.hasHH1
                foundDay.start1 = hourData.start1
                foundDay.end1 = hourData.end1
                foundDay.hasHH2 = hourData.hasHH2
                foundDay.start2 = hourData.start2
                foundDay.end2 = hourData.end2
                foundDay.end2close = hourData.end2close
                foundDay.isAllDay = hourData.isAllDay
                console.log(`${foundDay.day} found and updated`)
            })
        })
        setBulkHourModalOpen(false)
    }

    const handleSetFoodMenuImg = (uploadedImgObj) => {
        console.log("uploadedImgObj", uploadedImgObj)
        setRestaurantData((draft) => { draft.menu.foodMenuImg = uploadedImgObj })
        setFoodMenuImgModalState(false)
    }

    const handleSetDrinkMenuImg = (uploadedImgObj) => {
        console.log("uploadedImgObj", uploadedImgObj)
        setRestaurantData((draft) => { draft.menu.drinkMenuImg = uploadedImgObj })
        setDrinkMenuImgModalState(false)
    }

    const handleSetFoodAndDrinkMenuImg = (uploadedImgObj) => {
        console.log("uploadedImgObj", uploadedImgObj)
        setRestaurantData((draft) => { draft.menu.foodAndDrinkMenuImg = uploadedImgObj })
        setFoodAndDrinkMenuImgModalState(false)
    }



    // Map functions:
    const filtersMap = restaurantData.filterParams.map((param, idx) => {
        return (
            <li key={`AddRestFilter${idx}`}>
                <label>
                    <Checkbox
                        checked={param.value}
                        name={param.name}
                        onChange={(e) => {
                            setRestaurantData((draft) => {
                                const foundParam = draft.filterParams.find((item) => item.name === param.name)
                                foundParam.value = e.target.checked
                            })
                        }}
                    />
                    {param.display}
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
                        {
                            !restaurantData.hourSet.hours[idx].isAllDay &&
                            <Label>
                                <Checkbox
                                    name='hasHH1'
                                    checked={restaurantData.hourSet.hours[idx].hasHH1}
                                    onChange={(e) => setRestaurantData(
                                        (draft) => { draft.hourSet.hours[idx].hasHH1 = e.target.checked }
                                    )}
                                />Happy Hour</Label>
                        }

                        <Label>
                            <Checkbox
                                name='hasHH1'
                                checked={restaurantData.hourSet.hours[idx].isAllDay}
                                onChange={(e) => setRestaurantData(
                                    (draft) => { draft.hourSet.hours[idx].isAllDay = e.target.checked }
                                )}
                            />All Day</Label>
                        {
                            restaurantData.hourSet.hours[idx].hasHH1 && !restaurantData.hourSet.hours[idx].isAllDay &&
                            <div
                                className='flex'
                            >
                                <input
                                    id={`${day}Hour1Start`}
                                    className="min-w-[50px] text-xs"
                                    name="start1"
                                    type="time"
                                    value={militaryTimeConverter(restaurantData.hourSet.hours[idx].start1)}
                                    // defaultValue="15:00"
                                    onChange={(e) => handleHourInputChange(e, idx)}
                                    disabled={restaurantData.hourSet.hours[idx].hasHH1 === false}
                                />

                                {
                                    restaurantData.hourSet.hours[idx].end1close ?

                                        <div
                                            className="min-w-[50px]  w-[110px] text-center "
                                        >
                                            to Close
                                        </div>
                                        :
                                        <input
                                            id={`${day}Hour1end`}
                                            className="min-w-[50px] text-xs"
                                            name="end1"
                                            type="time"
                                            value={militaryTimeConverter(restaurantData.hourSet.hours[idx].end1)}
                                            // defaultValue="18:00"
                                            onChange={(e) => handleHourInputChange(e, idx)}
                                            disabled={restaurantData.hourSet.hours[idx].hasHH1 === false || restaurantData.hourSet.hours[idx].end1close === true}
                                        />
                                }
                                <div>
                                    <Label>
                                        <Checkbox
                                            checked={restaurantData.hourSet.hours[idx].end1close}
                                            onChange={(e) => setRestaurantData(
                                                (draft) => { draft.hourSet.hours[idx].end1close = e.target.checked }
                                            )}

                                        />Til-Close</Label>
                                </div>
                            </div>
                        }
                    </div>
                    <div>
                        {
                            !restaurantData.hourSet.hours[idx].isAllDay &&
                            <Label>
                                <Checkbox
                                    checked={restaurantData.hourSet.hours[idx].hasHH2}
                                    onChange={(e) => setRestaurantData(
                                        (draft) => { draft.hourSet.hours[idx].hasHH2 = e.target.checked }
                                    )}

                                />Late Night</Label>
                        }
                        {
                            restaurantData.hourSet.hours[idx].hasHH2 && !restaurantData.hourSet.hours[idx].isAllDay &&
                            <div
                                className='flex'
                            >
                                <input
                                    id={`${day}Hour2Start`}
                                    className="min-w-[50px] text-xs"
                                    name="start2"
                                    type="time"
                                    value={militaryTimeConverter(restaurantData.hourSet.hours[idx].start2)}
                                    // defaultValue="15:00"
                                    onChange={(e) => handleHourInputChange(e, idx)}
                                    disabled={restaurantData.hourSet.hours[idx].hasHH2 === false}
                                />
                                {
                                    restaurantData.hourSet.hours[idx].end2close ?

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
                                            value={militaryTimeConverter(restaurantData.hourSet.hours[idx].end2)}
                                            // defaultValue="18:00"
                                            onChange={(e) => handleHourInputChange(e, idx)}
                                            disabled={restaurantData.hourSet.hours[idx].hasHH2 === false || restaurantData.hourSet.hours[idx].end2close === true}
                                        />
                                }
                                <div>
                                    <Label>
                                        <Checkbox
                                            checked={restaurantData.hourSet.hours[idx].end2close}
                                            onChange={(e) => setRestaurantData(
                                                (draft) => { draft.hourSet.hours[idx].end2close = e.target.checked }
                                            )}

                                        />Til-Close</Label>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </>
        )
    })



    return (
        <div
            style={mainDivStyle}
            className='px-2'
        >



            <MessageModal
                modalOpen={messageModalProps.modalOpen}
                header={messageModalProps.header}
                body={messageModalProps.body}
                onClose={() => { setMessageModalProps((draft) => { draft.modalOpen = false }) }}
                button1text={messageModalProps.button1text}
                handleButton1Click={messageModalProps.handleButton1Click}
                button2text={messageModalProps.button2text}
                handleButton2Click={messageModalProps.handleButton2Click}
            />


            <YelpResponseModal
                yelpList={yelpRestResponse}
                modalOpen={yelpModalOpen}
                onClose={onClose}
                onModalClick={onModalClick}
                handlePickOneYelpRestaurant={handlePickOneYelpRestaurant}
            />
            {/* div that holds yelp search input */}
            <form
                className='py-3'
                onSubmit={(e) => {
                    e.preventDefault()
                    console.log("yelpformsubmited")
                    if (searchRestBool) {
                        handleSearchButton()
                    } else {
                        handleResetSearch()
                    }
                }}
            >
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
                                            // if (e.target.value === "Current Location") {
                                            //     draft.location.long = currentLocation.longitude
                                            //     draft.location.lat = currentLocation.latitude
                                            // }
                                        })
                                    }}
                                />

                                <datalist id="yelpSearchLocList">
                                    <option className="font-['Roboto']" value="Current Location">Current Location</option>
                                </datalist>
                            </div>
                            <div
                                className='flex flex-wrap gap-2 md:w-3/12'
                            >
                                <Button
                                    // onClick={() => {
                                    //     handleSearchButton()
                                    // }}
                                    type='submit'
                                    className="border"
                                >Search</Button>
                            </div>
                        </div>
                        :
                        // {/* results Container */}
                        <div>
                            <img
                                alt={restaurantData.name}
                                src={restaurantData.image_url}
                            />
                            <p>{restaurantData.name}</p>
                            <p>{restaurantData.address1}</p>
                            <p>{restaurantData.city}</p>

                            {
                                id === undefined &&

                                <div
                                    className='flex flex-wrap gap-2 md:w-3/12'
                                >
                                    <Button
                                        type='submit'
                                        className='border'
                                    // onClick={handleResetSearch}
                                    >Reset Search</Button>
                                </div>
                            }
                        </div>
                }
            </form>
            <form
            // onSubmit={(e) => handleFormSubmit(e)}
            >
                {
                    !searchRestBool &&
                    <>

                        {/* div that filters option input */}
                        < div
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
                            <div
                                className="flex flex-wrap gap-2 md:w-3/12"
                            >
                                <Button
                                    type="button"
                                    className='border rounded-xl'
                                    onClick={() => {
                                        setBulkHourModalOpen(true)
                                    }}
                                >
                                    Bulk Update Hours
                                </Button>
                            </div>

                            <BulkHoursUpdateModal
                                bulkHourModalOpen={bulkHourModalOpen}
                                setBulkHourModalOpen={setBulkHourModalOpen}
                                handleFormSubmit={handleBulkHourSubmit}
                            />
                            {hhHoursMap}
                        </div>

                        {/* div that holds menu input */}

                        {/* Main Menu Inputs */}
                        <div
                            className='py-3'
                        >
                            <p>Menu:</p>
                            <div>

                                {/* Food AND Drink Menu Img Upload */}
                                <div>
                                    <label>Food And Drink Menu:</label>
                                    <input
                                        type="checkbox"
                                        checked={restaurantData.menu.isFoodAndDrinkMenu}
                                        onClick={(e) => { setRestaurantData((draft) => { draft.menu.isFoodAndDrinkMenu = e.target.checked }) }}
                                    />
                                </div>

                                {
                                    restaurantData.menu.isFoodAndDrinkMenu &&
                                    <>
                                        {
                                            restaurantData.menu.foodAndDrinkMenuImg?.imgUrl &&
                                            <div>
                                                <img src={restaurantData.menu.foodAndDrinkMenuImg.imgUrl} />
                                            </div>
                                        }
                                        <div>
                                            <Button
                                                onClick={() => setFoodAndDrinkMenuImgModalState(true)}
                                            >Upload Combined Menu</Button>

                                            <ImageUploadModal
                                                title="Food And Drink (Combined) Menu Picture Upload"
                                                modalState={foodAndDrinkMenuImgModalState}
                                                setModalState={setFoodAndDrinkMenuImgModalState}
                                                handleAfterSubmit={handleSetFoodAndDrinkMenuImg}
                                                imgType={2}
                                            />
                                        </div>
                                    </>
                                }
                                {/* food/drink checkbox */}
                                {
                                    !restaurantData.menu.isFoodAndDrinkMenu &&
                                    <>
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


                                        {/* Food Menu Items */}
                                        {restaurantData.menu.hasFoodSpecials &&
                                            <div
                                                className='border mb-3'
                                            >
                                                {siteSettings.showImgMenu ?
                                                    <>
                                                        {
                                                            restaurantData.menu.foodMenuImg?.imgUrl &&
                                                            <div>
                                                                <img src={restaurantData.menu.foodMenuImg.imgUrl} />
                                                            </div>
                                                        }
                                                        <div>
                                                            <Button
                                                                onClick={() => setFoodMenuImgModalState(true)}
                                                            >Upload Food Menu</Button>

                                                            <ImageUploadModal
                                                                title="Food Menu Picture Upload"
                                                                modalState={foodMenuImgModalState}
                                                                setModalState={setFoodMenuImgModalState}
                                                                handleAfterSubmit={handleSetFoodMenuImg}
                                                                imgType={1}
                                                            />
                                                        </div>
                                                    </>
                                                    :
                                                    <>
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
                                                                    draft.menu.foodSpecialsdescription = e.target.value
                                                                })
                                                            }}
                                                        />
                                                        <div
                                                            className="flex flex-wrap gap-2 md:w-3/12"
                                                        >
                                                            <Button
                                                                type='button'
                                                                onClick={handleAddFoodNewMenuItem}
                                                            >Add New Food Item</Button>
                                                        </div>

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
                                                    </>
                                                }
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                            {/* DRINKS AREA */}
                            <div>
                                {!restaurantData.menu.isFoodAndDrinkMenu &&
                                    <>
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
                                                {
                                                    siteSettings.showImgMenu ?
                                                        <>


                                                            {
                                                                restaurantData.menu.drinkMenuImg?.imgUrl &&
                                                                <div>
                                                                    <img src={restaurantData.menu.drinkMenuImg.imgUrl} />
                                                                </div>
                                                            }
                                                            <div>
                                                                <Button
                                                                    onClick={() => setDrinkMenuImgModalState(true)}
                                                                >Upload Drink Menu</Button>

                                                                <ImageUploadModal
                                                                    title="Drink Menu Picture Upload"
                                                                    modalState={drinkMenuImgModalState}
                                                                    setModalState={setDrinkMenuImgModalState}
                                                                    handleAfterSubmit={handleSetDrinkMenuImg}
                                                                    imgType={2}
                                                                />
                                                            </div>
                                                        </>
                                                        :
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
                                                                            draft.menu.drinkSpecialsdescription = e.target.value
                                                                        })
                                                                    }}
                                                                />
                                                            </div>



                                                            <div>
                                                                <div>

                                                                    <div
                                                                        className="flex flex-wrap gap-2 md:w-3/12"
                                                                    >
                                                                        <Button
                                                                            type='button'
                                                                            className=""
                                                                            onClick={handleAddDrinkNewMenuItem}
                                                                        >Add New Drink Item</Button>
                                                                    </div>
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
                                            </>
                                        }
                                    </>
                                }
                            </div>
                        </div>

                        <div
                            className='flex flex-wrap gap-2 md:w-3/12'
                        >
                            <Button
                                className='border'
                                type="submit"
                                disabled={formSubmitted}
                                onClick={(e) => {
                                    setFormSubmitted(true)
                                    handleFormSubmit(e)
                                }}
                            >Submit</Button>
                        </div>
                    </>}
            </form >
            <footer
                className='h-[5rem]'
            >

            </footer>
        </div >
    )
}
