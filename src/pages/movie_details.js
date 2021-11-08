import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import fire from '../files/firebase';
import '../movie_details.css';


export const MovieDetails = () => {
    const location = useLocation();
    const history = useHistory();
    var videourl = location.state.videourl;
    var moviename = location.state.moviename;
    var description = location.state.description;
    var actorname = location.state.actorname;
    var directorname = location.state.directorname;
    var releasedate = location.state.releasedate;
    var outdate = location.state.outdate;
    var email = location.state.email;
    var mobile = location.state.mobile;
    var password = location.state.password;
    var name = location.state.name;
    var ticketcost = location.state.ticketcost;
    var profile = location.state.profile;
    var image = location.state.movieimage;
    const [stars, setStars] = useState(0);
    const [feedbackData, setFeedbackData] = useState([])

    useEffect(() => {
        fire.firestore().collection('feedback').where('moviename', '==', moviename).get().then(snapshot => {
            snapshot.forEach(doc => {
                let data = doc.data();
                //console.log(data);
                setFeedbackData(arr => [...arr, { data: data }])
                setStars(prevState => prevState + data.stars)
            })
        })
    }, [])

    console.log(stars);

    return (
        <div className="detail_container">

            <div className="title">
                <h1>{moviename}</h1>
            </div>

            <div ><iframe width="450" height="300" className="viedo" src={videourl}></iframe></div>
            <div className="card_container">
                <div><p style={{ fontWeight: "normal", fontSize: "larger", color: "white" }}><span>moviename</span> : {moviename}</p></div>
                <div><p style={{ fontWeight: "normal", fontSize: "larger", color: "white" }}>Description : {description}</p></div>
                <div><p style={{ fontWeight: "normal", fontSize: "larger", color: "white" }}>Actor Name : {actorname}</p></div>
                <div><p style={{ fontWeight: "normal", fontSize: "larger", color: "white" }}>Director Name : {directorname}</p></div>
                <div><p style={{ fontWeight: "normal", fontSize: "larger", color: "white" }}>Release Date : {releasedate}</p></div>
                <div><p style={{ fontWeight: "normal", fontSize: "larger", color: "white" }}>Out Date : {outdate}</p></div>
                <div><h2>Average Rating: {(stars / feedbackData.length).toFixed(2)} </h2></div>
                <div><h2>FeedBacks</h2></div>
                <div className="feedback-data">
                    {feedbackData && feedbackData.map((item, i) => {
                        return <div key={i} className="review">{item.data.feedback}</div>
                    })}
                </div>
                <button onClick={() => history.push({ pathname: "/bookingform", state: { releasedate: releasedate, outdate: outdate, movieimage: image, moviename: moviename, ticketcost: ticketcost, profile: profile, name: name, email: email, password: password, mobile: mobile } })}>Book Now</button>
            </div>

        </div>
    )
}
