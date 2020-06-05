import React from 'react';
import axios from 'axios';

import ReviewList from './ReviewList.js';

class Home extends React.Component {

    state = {
        reviews: [],
        query: ""
    }

    componentDidMount = () => {
        axios.get('/api/reviews/test')
        .then(res => {
            this.setState({
                reviews: res.data
            })
        })
        .catch(res => {
            this.setState({
                reviews: "Error connecting to DB"
            })
        })
    }

    onChange = e => {
        this.setState({
            query: e.target.value
        })
    }

    render() {
        console.log(this.state.reviews)
        return (
            <div id="home">
                <input onChange={this.onChange} type="text" value={this.state.query} placeholder="Start entering a movie title here" />
                <ReviewList query={this.state.query} />
            </div>
        )
    }
}

export default Home;