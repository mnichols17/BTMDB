import React, {useState, useEffect} from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Reely from '../media/reely.PNG';

export default function Review(props) {

    let { movie } = useParams();

    const [title, setTitle] = useState(movie)
    const [poster, setPoster] = useState(null);
    const [info, setInfo] = useState([]);
    const [isLoading, setLoading] = useState(true);

    if(title.includes("The") && title.includes(",")){
        let the = title.substring(title.lastIndexOf(',') + 2)
        if(title.includes("(20")){
            const split = the.split(" ")
            setTitle(split[0] + " " + title.substring(0, title.lastIndexOf(',')) + " " + split[1])
        } else {
            setTitle(the + " " + title.substring(0, title.lastIndexOf(',')))
        }
    }

    useEffect(() => {
        const getData = async() => {
            try {
                const response = await axios.get(`/api/reviews/${movie}`)
                if(!response.data.review) throw ("Movie doesn't exist. Try again")
                setInfo(response.data.review);
                setPoster(response.data.poster);
                setLoading(false)
            }
            catch(e) {
                alert(e)
                props.history.push("/")
            }
        }

        getData();
    }, []);

    console.log(info.jeff)
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
                            <td className={info.jeff >= 70 ? "buttered" : null }>{info.jeff !== null ? info.jeff : "N/A"}</td>
                            <td className={info.jack >= 70 ? "buttered" : null } >{info.jack !== null ? info.jack : "N/A"}</td>
                            <td className={info.trill >= 70 ? "buttered" : null }>{info.trill !== null ? info.trill : "N/A"}</td>
                            <td className={info.audience >= 70 ? "buttered" : null }>{info.audience !== null ? info.audience : "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
                <h3 id="butterScore">Butter Score: <span className={info.butter >= 80 ? "buttered" : null} >{info.butter}</span></h3>
            </div>
            <div id="div2">
                <img style={{border: !poster ? "none" : null}} id="poster" src={poster || Reely} />
                <table id="movieInfo">
                    <tbody>
                        <tr>
                            <td>Director:</td>
                            <td>{info.director}</td>
                        </tr>
                        <tr>
                            <td>Release Date:</td>
                            <td>{info.release}</td>
                        </tr>
                        <tr>
                            <td>Runtime:</td>
                            <td>{info.runtime} minutes</td>
                        </tr>
                        <tr>
                            <td>Genre:</td>
                            <td>{info.genre}</td>
                        </tr>
                        <tr>
                            <td>Sub-Genre:</td>
                            <td>{info.subGenre}</td>
                        </tr>
                        <tr>
                            <td>LCB Episode:</td>
                            <td>{info.episode}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Button onClick={() => props.history.goBack()} id="back" variant="contained" startIcon={<ArrowBackIcon />}>Back</Button>
        </div> : <ReactLoading className="loadingIcon" type={'spin'} color={'#FEDC19'} height={100} width={100}/>
    );
}