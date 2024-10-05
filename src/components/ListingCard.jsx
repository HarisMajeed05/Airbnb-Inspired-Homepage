

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

const ListingCard = ({ image, title, type, guests, bedrooms, bathrooms, price, rating }) => {
    return (
        <div className="listing-card">
            <img src={image} alt={title} />
            <div className="listing-info">
                <h3>{title}</h3>
                <p>{type} • {guests} guests • {bedrooms} bedrooms • {bathrooms} bathrooms</p>
                <p className="price">${price} per night</p>
                {rating && <p>Rating: {rating}</p>} {/* Conditionally render rating if available */}
            </div>
        </div>
    );
};

ListingCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
};

export default ListingCard;
