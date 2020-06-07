import React from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";

export default function ReviewList(props) {
    return (
        <ul id="reviewList">
            <InfiniteScroll dataLength={props.reviews.length} next={props.getMore} hasMore={true}>
                {props.reviews.length !== 0 ? props.reviews.map(review => {
                    return (
                        <Link className="reviewLink" to={`/review/${review.Title}`} key={review._id}>
                            <li className="reviews">
                                <h4>{review.Title}</h4>
                                <h4 className={review[props.category] >= 80 ? "buttered" : null }>{review[props.category] || "N/A"}</h4>
                            </li>
                        </Link>
                    )
                }): <h3>No Matching Reviews Found</h3>}
            </InfiniteScroll>
        </ul>
    );
}