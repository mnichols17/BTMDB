import React, {useState, useEffect} from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';

import Reely from '../media/reely.PNG';

export default function Review(props) {

    let { movie } = useParams();

    const [title, setTitle] = useState(movie)
    const [poster, setPoster] = useState(null);
    const [info, setInfo] = useState([]);
    const [isLoading, setLoading] = useState(true);

    if(title.includes("The") && title.includes(",")){
        let the = title.substring(title.lastIndexOf(',') + 2)
        setTitle(the + " " + title.substring(0, title.lastIndexOf(',')))
    }

    useEffect(() => {
        const getData = async() => {
            try {
                const response = await axios.get(`/api/reviews/${movie}`)
                const data = response.data.review[0];
                const api_key = response.data.key;
                setInfo(data)
                
                const date = data["Release Date"].split("/")
                let poster = await axios.get(`http://www.omdbapi.com/?t=${title}&y=${date[2]}&apikey=${api_key}`)
                if(poster.data.Error || poster.data.Poster === "N/A") poster = await axios.get(`http://www.omdbapi.com/?t=${title}&y=${date[2]-1}&apikey=${api_key}`)
                else if (poster.data.Director !== data.Director && parseInt(poster.data.Runtime.substring(0, poster.data.Runtime.lastIndexOf(' '))) !== data.Runtime) poster = await axios.get(`http://www.omdbapi.com/?t=${title}&apikey=${api_key}`)
                setPoster(poster.data.Poster)
                setLoading(false)
            }
            catch(e) {
                alert("That movie doesn't exist. Try again")
                props.history.push("/")
            }
        }

        getData();
    }, []);

    return (
        !isLoading ? <div id="movie">
            <div id="div1">
                <h2>{title}</h2>
                <table id="movieReviews">
                    <thead>
                        <tr>
                            <th>Jeff</th>
                            <th>Kenjac</th>
                            <th>Trill</th>
                            <th>Audience</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={info.Jeff >= 80 ? "buttered" : null }>{info.Jeff || "N/A"}</td>
                            <td className={info.Jack >= 80 ? "buttered" : null } >{info.Jack || "N/A"}</td>
                            <td className={info.Trill >= 80 ? "buttered" : null }>{info.Trill || "N/A"}</td>
                            <td className={info["Audience (LCB)"] >= 80 ? "buttered" : null }>{info["Audience (LCB)"] || "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
                <h3 id="butterScore">Butter Score: <span className={info["Butter Score"] >= 80 ? "buttered" : null} >{info["Butter Score"]}</span></h3>
            </div>
            <div id="div2">
                <img style={{border: !poster ? "none" : "inherit"}} id="poster" src={poster || Reely} />
                <table id="movieInfo">
                    <tbody>
                        <tr>
                            <td>Director:</td>
                            <td>{info.Director}</td>
                        </tr>
                        <tr>
                            <td>Release Date:</td>
                            <td>{info["Release Date"]}</td>
                        </tr>
                        <tr>
                            <td>Runtime:</td>
                            <td>{info.Runtime} minutes</td>
                        </tr>
                        <tr>
                            <td>Genre:</td>
                            <td>{info.Genre}</td>
                        </tr>
                        <tr>
                            <td>Sub-Genre:</td>
                            <td>{info["Sub-Genre"]}</td>
                        </tr>
                        <tr>
                            <td>LCB Episode:</td>
                            <td>{info["Podcast Review"]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div> : <ReactLoading className="loadingIcon" type={'spin'} color={'#FEDC19'} height={100} width={100}/>
    );
}