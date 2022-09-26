// import libraries
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import {useState, useEffect} from 'react';
import axios from "axios"

// import components needed
import NavBar from "./components/NavBar";
import Main from './components/pages/Main';
import RestDetail from './components/pages/RestDetail';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';

const filters = [
  { name: "dogFriendly", display: "Dog Friendly", value: false },
  { name: "hasPatio", display: "Patio", value: false  },
  { name: "hasFood", display: "Food", value: false  },
  { name: "hasDrinks", display: "Drinks", value: false  },
  { name: "roofTop", display: "Roof Top", value: false  },
]

function App() {
  const [allRestaurants, setAllRestaurants] = useState([])
  const [filterParams, setFilterParams] = useState([])
  const [currentLocation, setCurrentLocation] = useState({})
  // const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [showRestaurants, setShowRestaurants] = useState([])
  const [searchParams, setSearchParams] = useState({
    searchTerm: "",
    coordinates: {
        lat:"",
        long: ""
    },
    location: ""
  })


  const filterRests = (filterArr, restData) => {
    const trueFilters = filterArr.filter(filterParam => filterParam.value)
    const filteredRestaurants = restData.filter((rest)=>{
      // console.log(rest)  
      for(let i=0;i<trueFilters.length;i++){
          // console.log(rest[trueFilters[i].name])
          if(!rest[trueFilters[i].name]){
            return false
          }
        }
        return true
    })
    // console.log("filteredRestaurants", filteredRestaurants)
    return filteredRestaurants
  }

  const getRestaurants = async (filterObj) => {
    try {
      // console.log(filterObj)   
      const gotRests = await axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants`)
      return gotRests.data
    } catch (error) {
      console.warn(error)
    }
  }

  const filterFormSubmitHandler = async (e) => {
    e.preventDefault()
    const filteredRests = filterRests(filterParams,allRestaurants)
    setShowRestaurants(filteredRests)
  }


  useEffect(() => {
      const loadInitialData = async () => {
        const allRests = await getRestaurants()
        setAllRestaurants(allRests)
        setShowRestaurants(allRests)
      }
      loadInitialData()
      setFilterParams(filters)
  },[])


  return (
    <Router>
      
        <NavBar/>
      
      <Routes>
        {/* website routes */}
        <Route
          path="/"
          element={<Main
            allRestaurants = {showRestaurants}
            setFilterParams = {setFilterParams}
            filterParams = {filterParams}
            filterFormSubmitHandler= {filterFormSubmitHandler}
            />}
        />

        <Route
          path="/restaurant/:id"
          element={<RestDetail/>}
        />

        {/* <Route
          path="/account"
          element={<RestDetail/>}
        /> */}

        <Route
          path="/signup"
          element={<SignUp/>}
        />

        <Route
          path="/login"
          element={<Login/>}
        />

      </Routes>
    </Router>
  );
}

export default App;
