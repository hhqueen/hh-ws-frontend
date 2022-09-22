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


function App() {
  const [allRestaurants, setAllRestaurants] = useState([])
  // const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [searchParams, setSearchParams] = useState({
    searchTerm: "",
    coordinates: {
        lat:"",
        long: ""
    },
    location: ""
  })

  const getRestaurants = async () => {
    try {      
      const gotRests = await axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants`)
      return gotRests.data
    } catch (error) {
      console.warn(error)
    }
  }


  useEffect(() => {
      const loadInitialData = async () => {
        const allRests = await getRestaurants()
        setAllRestaurants(allRests)
      }
      loadInitialData()
  },[])


  return (
    <Router>
      
        <NavBar/>
      
      <Routes>
        {/* website routes */}
        <Route
          path="/"
          element={<Main/>}
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
