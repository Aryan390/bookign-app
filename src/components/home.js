import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import fire from '../files/firebase';
import '../movie_details.css';

import Search from './Search';


export const Homepage = () => {
    const history = useHistory();
    const location = useLocation();

    const profile = location.state.profile;
    const name = location.state.name;
    const email = location.state.email;
    const password = location.state.password;
    const mobile = location.state.mobile;
    const [moviedata, setmoviedata] = useState([]);
    const [originalMovieData, setOriginalMovieData] = useState([])
    const [searchVal, setSearchVal] = useState('')
    const [searchResults, setSearchResults] = useState([]);
    const [genre, setGenre] = useState([]);
    const [counts, setCounts] = useState({});
    var recommend_movies = [];
    var recommend_movienames = [];
    const [rmovies, setR] = useState([]);
    // const [recommend_movies, setRecommend] = useState([]);
    // const [recommend_movienames, setRecommendNames] = useState([]);
    // const [recommend, setR] = useState([]);
    // const [arr, setArr] = useState([]);
    // const [max, setMax] = useState(0);
    // const [key, setKey] = useState([]);
    // const [rmovies, setR] = useState([]);
    useEffect(() => {
        fire.firestore().collection("currentmovies").get().then((snapshot) => {
            snapshot.forEach(doc => {
                var data = doc.data();
                //console.log(data);
                setmoviedata(arr => [...arr, { data: data }]);
                setOriginalMovieData(arr => [...arr, { data: data }])
            })
        })
        fire.firestore().collection("Booking").where("email", "==", email).get().then((snapshot) => {
            snapshot.forEach(doc => {
                var moviename = doc.data().moviename;
                //console.log(data);
                fire.firestore().collection("currentmovies").where("moviename", "==", moviename).get().then((snapshot) => {
                    snapshot.forEach(doc => {
                        var data = doc.data();
                        data.genre.forEach(genre => {
                            setGenre(arr => [...arr, genre]);
                            counts[genre] = counts[genre] ? counts[genre] + 1 : 1;
                        })

                    })

                })

            })
        })
        // let array = Object.values(counts);
        // let maximum = Math.max(...array);
        // var recommend = [];
        // console.log(maximum);
        // Object.keys(counts).forEach(key => {
        //     if (counts[key] === maximum) {
        //         recommend.push(key);
        //     }
        // });
        // console.log(recommend);

    }, [])

    console.log(recommend_movies);
    let array = Object.values(counts);
    let maximum = Math.max(...array);
    var recommend = [];
    // console.log(maximum);
    Object.keys(counts).forEach(key => {
        if (counts[key] === maximum) {
            recommend.push(key);
        }
    });
    // console.log(recommend);
    fire.firestore().collection("currentmovies").get().then((snapshot) => {
        snapshot.forEach(doc => {
            var data = doc.data();
            var moviename = data.moviename;
            // console.log(recommend_movienames);

            data.genre.forEach(genre => {
                if (recommend.includes(genre)) {
                    if (!recommend_movienames.includes(moviename)) {
                        recommend_movies.push({ data: data });
                        recommend_movienames.push(data.moviename);
                        // setRecommend(arr => [...arr, { data: data }])
                        // setRecommendNames(arr => [...arr, data.moviename]);
                    }
                }
            })

        })
    })
    console.log(recommend_movies);
    // // if (recommend_movies.length > 0) {
    // recommend_movies.forEach(movie => {
    //     setR(arr => [...arr, movie])
    // })

    // console.log(rmovies);
    // console.log(rmovies);
    //}

    const searchResChangeHandler = (res) => {
        res = res.split(' ').join('').toLowerCase();
        let matches = []

        if (res.length > 0) {
            matches = originalMovieData.filter(item => {
                const regex = new RegExp(`${res}`, "gi");
                return item.data.moviename.match(regex);
            })
        }
        setSearchVal(res);
        setSearchResults(matches)
    }

    const movieClickHandler = (e) => {
        const res = e.target.innerHTML
        let matches = []

        matches = originalMovieData.filter(item => item.data.moviename === res)
        setSearchResults([])
        setSearchVal('')
        setmoviedata(matches)
    }

    const handleMenu = (e) => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('sidebar_visible');
        document.getElementById('menu').classList.toggle('hide');
    }

    return (
        <>
            <i id="menu" onClick={handleMenu} className="material-icons menu">menu</i>
            <div className="wrapper ">
                <link href="../assets/css/material-dashboard.css?v=2.1.2" rel="stylesheet" />

                <div className="sidebar" id="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
                    <div className="logo simple-text logo-normal">
                        <p>CINETIME</p>
                        <div><i onClick={handleMenu} className="material-icons menu_nav">menu</i></div>
                    </div>
                    <div className="sidebar-wrapper">
                        <ul className="nav">
                            <li className="nav-item active  ">
                                <Link to={{ pathname: "/homepage", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                    <i className="material-icons">home</i>
                                    <p>Home</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={{ pathname: "/dashboard", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                    <i className="material-icons">dashboard</i>
                                    <p>Dashboard</p>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link to={{ pathname: "/bookings", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                    <i className="material-icons">content_paste</i>
                                    <p>Bookings</p>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link to={{ pathname: "/userprofile", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                    <i className="material-icons">person</i>
                                    <p>User Profile</p>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link to={{ pathname: "/feedback", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link" >
                                    <i className="material-icons">notifications</i>
                                    <p>Feedback</p>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link to="" className="nav-link" >
                                    <i className="material-icons">logout</i>
                                    <p>Logout</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="main-panel">
                    <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                        <div class="container-fluid">
                            <div class="navbar-wrapper">
                            </div>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="navbar-toggler-icon icon-bar"></span>
                                <span class="navbar-toggler-icon icon-bar"></span>
                                <span class="navbar-toggler-icon icon-bar"></span>
                            </button>

                        </div>
                    </nav>
                    <div className="main-panel">

                        {/* auto-complete search on the movie dataset */}
                        <div className="search-maker">
                            <Search onSearchRes={searchResChangeHandler} searchVal={searchVal} />
                            <div className="results-box">
                                {searchResults &&
                                    searchResults.map((item, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="movie-item"
                                                onClick={movieClickHandler}
                                            >
                                                {item.data.moviename}
                                            </div>)
                                    })
                                }
                            </div>
                        </div>

                        <div>
                            <h1 className="now_showing">Now Showing</h1>
                        </div>

                        <div className="row">
                            {
                                moviedata.map((data, index) => {
                                    //console.log(data.image);
                                    return <div className="col-4" key={index} style={{ marginLeft: "auto", marginRight: "auto" }}>
                                        <div className="card">

                                            <div className="card-img-top img-fluid">
                                                <img src={data.data.image} style={{ width: '18rem', height: '20rem' }} />
                                            </div>
                                            <button onClick={() => history.push({ pathname: "/details", state: { videourl: data.data.videourl, moviename: data.data.moviename, description: data.data.description, actorname: data.data.actorname, directorname: data.data.directorname, releasedate: data.data.releasedate, outdate: data.data.outdate, name: name, email: email, password: password, mobile: mobile, ticketcost: data.data.ticketcost, profile: profile, movieimage: data.data.image } })}>View Details</button>
                                            <button onClick={() => history.push({ pathname: "/bookingform", state: { releasedate: data.data.releasedate, outdate: data.data.outdate, movieimage: data.data.image, moviename: data.data.moviename, ticketcost: data.data.ticketcost, profile: profile, name: name, email: email, password: password, mobile: mobile } })}>Book Now</button>

                                        </div>
                                    </div>
                                })

                            }
                        </div>
                        <div>
                            <h1 className="now_showing">Recommended for you</h1>
                        </div>
                        <div className="row">
                            {

                                recommend_movies.map((data, index) => {
                                    //console.log(data.image);
                                    return <div className="col-4" key={index} style={{ marginLeft: "auto", marginRight: "auto" }}>
                                        <div className="card">

                                            <div className="card-img-top img-fluid">
                                                <img src={data.data.image} style={{ width: '18rem', height: '20rem' }} />
                                            </div>
                                            <button onClick={() => history.push({ pathname: "/details", state: { videourl: data.data.videourl, moviename: data.data.moviename, description: data.data.description, actorname: data.data.actorname, directorname: data.data.directorname, releasedate: data.data.releasedate, outdate: data.data.outdate, name: name, email: email, password: password, mobile: mobile, ticketcost: data.data.ticketcost, profile: profile, movieimage: data.data.image } })}>View Details</button>
                                            <button onClick={() => history.push({ pathname: "/bookingform", state: { releasedate: data.data.releasedate, outdate: data.data.outdate, movieimage: data.data.image, moviename: data.data.moviename, ticketcost: data.data.ticketcost, profile: profile, name: name, email: email, password: password, mobile: mobile } })}>Book Now</button>

                                        </div>
                                    </div>
                                })

                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
