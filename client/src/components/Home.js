import React from 'react';
import axios from 'axios';
import matchSorter from 'match-sorter';

import ReviewList from './ReviewList.js';

class Home extends React.Component {

    state = {
        reviews: [],
        query: "",
        loadNum: 15,
        category: "Butter Score"
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

    queryChange = e => {
        if(e.target.value === "") this.setState({loadNum: 15})
        this.setState({
            query: e.target.value
        })
    }

    categoryChange = e => {
        this.setState({
            category: e.target.value,
            loadNum: 15
        })
    }

    getMore = () => {
        this.setState(prevState => ({loadNum: prevState.loadNum + 15}))
    }

    render() {
        const reviews = this.state.query === "" ? this.state.reviews : matchSorter(this.state.reviews, this.state.query, {keys: ['Title']});
        return (
            <div id="home">
                <input onChange={this.queryChange} type="text" value={this.state.query} placeholder="Search by title or director" />
                <div id="category">
                    <label>Score Category: </label>
                    <select id="categoy-select" value={this.state.category} onChange={this.categoryChange}>
                        <option value="Butter Score">Butter Score</option>
                        <option value="Jeff">Jeff</option>
                        <option value="Jack">KenJac</option>
                        <option value="Trill">Trill</option>
                        <option value="Audience (LCB)">Audience</option>
                    </select>
                </div>
                <ReviewList reviews={reviews.slice(0, this.state.loadNum)} getMore={this.getMore} category={this.state.category}/>
            </div>
        )
    }
}

export default Home;