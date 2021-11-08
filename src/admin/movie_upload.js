import React, { useState } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import fire from '../files/firebase';
import '../movie_details.css';

export const Movieupload = () => {
    let [image, setimage] = useState('');
    const [moviename, setmoviename] = useState('');
    const [ticketcost, setticketcost] = useState('')
    const [description, setdescription] = useState('');
    const [actorname, setactorname] = useState('');
    const [directorname, setdirectorname] = useState('');
    const [releasedate, setreleasedate] = useState('');
    const [outdate, setoutdate] = useState('');
    const [video, setvideo] = useState('');
    const history = useHistory();
    const location = useLocation();
    const profile = location.state.profile;
    const name = location.state.name;
    const email = location.state.email;
    const password = location.state.password;
    const mobile = location.state.mobile;
    const movieUpload = (e) => {
        e.preventDefault();
        if (video === "" || moviename === "" || description === "" || actorname === "" || directorname === "" || releasedate === "" || outdate === "") {
            alert("please fill all fields");
        } else {
            fire.storage().ref("movie_images").child(moviename + ".jpg").getDownloadURL().then(url => {
                fire.firestore().collection("currentmovies").add({
                    image: url,
                    videourl: video,
                    moviename: moviename,
                    ticketcost: ticketcost,
                    description: description,
                    actorname: actorname,
                    directorname: directorname,
                    releasedate: releasedate,
                    outdate: outdate
                }).then(() => {
                    alert("Movie Added Successfully");
                    setimage('');
                    setvideo('');
                    setmoviename('');
                    setticketcost('');
                    setdescription('');
                    setactorname('');
                    setdirectorname('');
                    setreleasedate('');
                    setoutdate('');
                }).catch((err) => console.log(err))
            });


        }
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
                            <li className="nav-item">
                                <Link to={{ pathname: "/adminpage", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                    <i className="material-icons">home</i>
                                    <p>Home</p>
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link to={{ pathname: "/movieupload", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                    <i className="material-icons">dashboard</i>
                                    <p>Movie Upload</p>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link to={{ pathname: "/adminbooking", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                    <i className="material-icons">content_paste</i>
                                    <p>Retrieve Bookings</p>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link to={{ pathname: "/adminprofile", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                    <i className="material-icons">person</i>
                                    <p>User Profile</p>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link to={{ pathname: "/retrievefeedback", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link" >
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
                            <button class="navbar-toggler" id="upload" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="navbar-toggler-icon icon-bar"></span>
                                <span class="navbar-toggler-icon icon-bar"></span>
                                <span class="navbar-toggler-icon icon-bar"></span>
                            </button>

                        </div>
                    </nav>
                    <div className="main-panel">
                        <div class="form-container sign-in-container" style={{ height: 'auto', left: '0', width: 'max-content', zIndex: 2, marginLeft: '33%', marginTop: '9%' }}>
                            <form className="upload-form" style={{ background: '#f6f5f7', marginLeft: "-50%", marginTop: "inherit" }}>
                                <h2 className="upload-font" style={{ fontWeight: "bold" }}>Upload Theater Movies</h2>
                                <br />
                                {/* <input type="text" placeholder="movie image url" value={image} onChange={(e) => setimage(e.target.value)} /> */}
                                <input type="text" placeholder="movie video url" value={video} onChange={(e) => setvideo(e.target.value)} />
                                <input type="text" placeholder="Movie name" value={moviename} onChange={(e) => setmoviename(e.target.value)} />
                                <input type="text" placeholder="Ticket Cost" value={ticketcost} onChange={(e) => setticketcost(e.target.value)} />
                                <input type="text" placeholder="Description" value={description} onChange={(e) => setdescription(e.target.value)} />
                                <input type="text" placeholder="Actor Name" value={actorname} onChange={(e) => setactorname(e.target.value)} />
                                <input type="text" placeholder="Director Name" value={directorname} onChange={(e) => setdirectorname(e.target.value)} />
                                <input type="date" placeholder="Pick release Date" value={releasedate} onChange={(e) => setreleasedate(e.target.value)} />
                                <input type="date" placeholder="Pick out Date" value={outdate} onChange={(e) => setoutdate(e.target.value)} />

                                <input type="button" style={{ background: "#ff4b2b", color: "white" }} value="Upload Movie" onClick={movieUpload} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
