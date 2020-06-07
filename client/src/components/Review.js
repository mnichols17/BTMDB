import React, {useState, useEffect} from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';

// If people refresh or come here seperately props data isn't gonna work
// is loading for poster

export default function Review(props) {

    const [poster, setPoster] = useState(null);
    const [info, setInfo] = useState([]);
    
    const api_key = "a90be46"
    let { title } = useParams();

    useEffect(() => {
        const getData = async() => {
            const response = await axios.get(`/api/reviews/${title}`)
            const data = response.data[0]
            setInfo(data)
            if(title.includes("The") && title.includes(",")) title = title.substring(0, title.lastIndexOf(','))
            const date = data["Release Date"].split("/")
            let poster = await axios.get(`http://www.omdbapi.com/?t=${title}&y=${date[2]}&apikey=${api_key}`)
            if(poster.data.Error || poster.data.Poster === "N/A") poster = await axios.get(`http://www.omdbapi.com/?t=${title}&y=${date[2]-1}&apikey=${api_key}`)
            setPoster(poster.data.Poster)
        }

        getData();
    }, []);

    console.log(info)
    return (
        <div id="movie">
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
            <img alt="No Poster Available For This Movie" src={poster} />
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
    );
}