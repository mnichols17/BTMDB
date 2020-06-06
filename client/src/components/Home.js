import React from 'react';
import axios from 'axios';
import matchSorter from 'match-sorter';

import ReviewList from './ReviewList.js';

class Home extends React.Component {

    state = {
        reviews: [],
        query: "",
        loadNum: 15
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
        if(e.target.value === "") this.setState({loadNum: 15})
        this.setState({
            query: e.target.value
        })
    }

    getMore = () => {
        this.setState(prevState => ({loadNum: prevState.loadNum + 15}))
    }

    render() {
        const reviews = this.state.query === "" ? this.state.reviews : matchSorter(this.state.reviews, this.state.query, {keys: ['Title']});
        return (
            <div id="home">
                <input onChange={this.onChange} type="text" value={this.state.query} placeholder="Start entering a movie title here" />
                <ReviewList reviews={reviews.slice(0, this.state.loadNum)} getMore={this.getMore}/>
            </div>
        )
    }
}

export default Home;