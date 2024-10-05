

// const ListingCard = ({ image, title, type, guests, bedrooms, bathrooms, price, rating }) => {
//     return (
//         <div className="listing-card">
//             <img src={image} alt={title} />
//             <div className="listing-info">
//                 <h3>{title}</h3>
//                 <p>{type} • {guests} guests • {bedrooms} bedrooms • {bathrooms} bathrooms</p>
//                 <p>${price} / night</p>
//                 <p>Rating: {rating} ⭐</p>
//             </div>
//         </div>
//     );
// };

// // Define PropTypes for the component to validate props
// ListingCard.propTypes = {
//     image: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     guests: PropTypes.number.isRequired,
//     bedrooms: PropTypes.number.isRequired,
//     bathrooms: PropTypes.number.isRequired,
//     price: PropTypes.number.isRequired,
//     rating: PropTypes.number.isRequired,
// };

import PropTypes from 'prop-types'; // Import PropTypes
import '../styles/ListingCard.css';

const ListingCard = ({ image, title, rating, distance, duration, hostedby, price, status }) => {
    return (
        <div className="listing-card">
            <img src={image} alt={title} />
            <div className="listing-info">
                <div className="title-rating">
                    <h3>{title}</h3>
                    <p className="rating">{rating}</p>
                </div>
                <p>{distance}</p>
                <p>{duration}</p>
                <p className="hostedby">{hostedby}</p>
                <p className="price">{price} {status}</p>
            </div>
        </div>
    );
};


ListingCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    distance: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    hostedby: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
};

export default ListingCard;
