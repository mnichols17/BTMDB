import React from 'react';
import axios from 'axios';
import matchSorter, {rankings, caseRankings} from 'match-sorter';

import ReviewList from './ReviewList.js';

class Home extends React.Component {

    state = {
        reviews: [],
        query: ""
    }

    componentDidMount = () => {
        axios.get('/api/reviews')
        .then(res => {
            this.setState({
                reviews: res.data
            })
        })
        .catch(res => {
            //alert("Error connecting to DB")
        })
    }

    onChange = e => {
        this.setState({
            query: e.target.value
        })
    }

    render() {
        const reviews = this.state.query === "" ? this.state.reviews : matchSorter(this.state.reviews, this.state.query, {keys: ['Title']})
        return (
            <div id="home">
                <input onChange={this.onChange} type="text" value={this.state.query} placeholder="Start entering a movie title here" />
                <ReviewList reviews={reviews} />
            </div>
        )
    }
}

export default Home;