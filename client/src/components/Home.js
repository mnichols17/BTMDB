import React from 'react';
import axios from 'axios';
import matchSorter from 'match-sorter';
import Select from 'react-select';
import ReactLoading from 'react-loading';

import Logo from '../media/logo.png';
import ReviewList from './ReviewList.js';

const Filters = (props) => {
    const options = [
        {value: "default", label: "Best Match (Default)"},
        {value: "high", label: "High to Low"},
        {value: "low", label: "Low to High"},
    ]

    return (
        <div className="filters">
            <label>Sort By:</label>
            <Select id="select" onChange={props.sortChange} label="Sort by: " defaultValue={options[0]} options={options} isSearchable={false}/>
        </div>
    )
}

class Home extends React.Component {

    state = {
        reviews: [],
        query: "",
        loadNum: 15,
        category: "butter",
        sort: "default",
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
            alert("Error connecting to DB. Refresh the page and try again.")
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

    sortChange = e => {
        this.setState({sort: e.value})
    }

    render() {
        const options = [
            {value: "butter", label: "Butter Score"},
            {value: "jeff", label: "Jeff D. Lowe"},
            {value: "jack", label: "Jack Kennedy"},
            {value: "trill", label: "Trill Ballins"},
            {value: "audience", label: "Audience"}
        ]

        const reviews = this.state.query === "" ? this.state.reviews : matchSorter(this.state.reviews, this.state.query, {keys: ['title', "director", "genre", "subGenre"]});
        
        switch(this.state.sort){
            case("high"):
                reviews.sort((a,b) => b[this.state.category] - a[this.state.category])
                break;
            case("low"):
                reviews.sort((a,b) => a[this.state.category] - b[this.state.category])
                break;
            default:
                break;
        }

        return (
            <div id="home">
                <img id="logo" src={Logo} alt="LCB" />
                <input onChange={this.queryChange} type="text" value={this.state.query} placeholder="Search by Title, Director or Genre" />
                <p id="update">Last updated: 6/10/2020</p>
                <div id="selectDiv">
                    <div id="scoreCategory" className="filters">
                        <label>Score Category:</label>
                        <Select onChange={this.categoryChange} id="select" label="Score Category" defaultValue={options[0]} options={options} isSearchable={false}/>
                    </div>
                    <Filters sortChange={this.sortChange} />
                </div>
                {!this.state.isLoading ? <ReviewList sort={this.state.sort} reviews={reviews.slice(0, this.state.loadNum)} getMore={this.getMore} category={this.state.category} /> : <ReactLoading className="loadingIcon" type={'spin'} color={'#FEDC19'} height={100} width={100}/>}
            </div>
        )
    }
}

export default Home;