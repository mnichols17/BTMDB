import React from 'react';
import axios from 'axios';
import matchSorter from 'match-sorter';
import Select from 'react-select';

import ReviewList from './ReviewList.js';

class Home extends React.Component {

    state = {
        reviews: [],
        query: "",
        loadNum: 15,
        category: "Butter Score",
        isLoading: true
    }

    componentDidMount = () => {
        axios.get('/api/reviews')
        .then(res => {
            this.setState({
                reviews: res.data,
                isLoading: false
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
            category: e.value,
            loadNum: 15
        })
    }

    getMore = () => {
        this.setState(prevState => ({loadNum: prevState.loadNum + 15}))
    }

    render() {
        const options = [
            {value: "Butter Score", label: "Butter Score"},
            {value: "Jeff", label: "Jeff D. Lowe"},
            {value: "Jack", label: "Jack Kennedy"},
            {value: "Trill", label: "Trill Ballins"},
            {value: "Audience (LCB)", label: "Audience"}
        ]
        const reviews = this.state.query === "" ? this.state.reviews : matchSorter(this.state.reviews, this.state.query, {keys: ['Title', "Director", "Genre", "Sub-Genre"]});
        return (
            <div id="home">
                <input onChange={this.queryChange} type="text" value={this.state.query} placeholder="Search by Title, Director or Genre" />
                <div id="category">
                    <label>Score Category:</label>
                    <Select onChange={this.categoryChange} id="select" label="Score Category" defaultValue={options[0]} options={options} isSearchable={false}/>
                </div>
                {reviews.length !== 0 || this.state.isLoading ? <ReviewList reviews={reviews.slice(0, this.state.loadNum)} getMore={this.getMore} category={this.state.category} /> : <h3>No results found</h3>}
            </div>
        )
    }
}

export default Home;