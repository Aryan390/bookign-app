import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import fire from '../files/firebase';
import '../movie_details.css';


export const MovieDetails = () => {
    const location = useLocation();
    var videourl = location.state.videourl;
    var moviename = location.state.moviename;
    var description = location.state.description;
    var actorname = location.state.actorname;
    var directorname = location.state.directorname;
    var releasedate = location.state.releasedate;
    var outdate = location.state.outdate;
    const [stars, setStars] = useState(0);
    const [feedbackData, setFeedbackData] = useState([])
    
    useEffect(() => {
        fire.firestore().collection('feedback').where('moviename', '==', moviename).get().then(snapshot => {
            snapshot.forEach(doc => {
                let data = doc.data();
                //console.log(data);
                setFeedbackData(arr => [...arr, {data: data}])
                setStars(prevState => prevState+data.stars)
            })
        })
    }, [])

    console.log(feedbackData);

    return (
        <div>
            <br /><br />

            <div ><iframe width="450" height="300" className="viedo" src={videourl}></iframe></div>
            <div className="card" style={{ width: "70%", marginLeft: "16%", background: "lightpink" }}>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>moviename : {moviename}</h2>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>Description : {description}</h2>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>Actor Name : {actorname}</h2>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>Director Name : {directorname}</h2>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>Release Date : {releasedate}</h2>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>Out Date : {outdate}</h2>
                <h2>Average Rating: {stars / feedbackData.length} </h2>
                <h2>FeedBacks</h2>
                <div className="feedback-data">
                    {feedbackData && feedbackData.map((item, i) => {
                        return <div key={i}>{item.data.feedback}</div>
                    })}
                </div>
            </div>

        </div>
    )
}
