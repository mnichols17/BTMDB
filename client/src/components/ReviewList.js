import React from 'react';
import { Link } from 'react-router-dom';

const ReviewList = props => {
  return (
    <table id="reviews">
        <thead>
            <tr>
                <th>Title</th>
                <th>Jeff</th>
                <th>KenJac</th>
                <th>Trill</th>
                <th>Audience</th>
                <th className="butter">Butter Score</th>
            </tr>
        </thead>
        <tbody>
            {props.reviews.map(review => {
                return (
                    <tr key={review._id}>
                        <td className="review-title">{review.Title}</td>
                        <td className="review-score">{review.Jeff}</td>
                        <td className="review-score">{review.Jack}</td>
                        <td className="review-score">{review.Trill}</td>
                        <td className="review-score">{review["Audience (LCB)"]}</td>
                        <td className="review-score butter">{review["Butter Score"]}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
  );
}

export default ReviewList;
