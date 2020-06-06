import React from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";

export default function ReviewList(props) {

    return (
        <ul id="reviewList">
            <li id="headers">
                <h4>Title</h4>
                <h4>Butter Score</h4>
            </li>
            <InfiniteScroll dataLength={props.reviews.length} next={props.getMore} hasMore={true}>
                {props.reviews.map(review => {
                    return (
                        <li className="reviews" key={review._id}>
                            <h4>{review.Title}</h4>
                            <h4 className={review["Butter Score"] >= 80 ? "buttered" : null }>{review["Butter Score"]}</h4>
                        </li>
                    )
                })}
            </InfiniteScroll>
        </ul>
    );
}