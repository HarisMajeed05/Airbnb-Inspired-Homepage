import { useState } from 'react';
import '../styles/SearchBar.css';
// const SearchBar = () => {
//     const [location, setLocation] = useState('');

//     const handleSearch = () => {
//         console.log(`Searching for properties in ${location}`);
//     };

//     return (
//         <div className="search-bar">
//             <input
//                 type="text"
//                 placeholder="Where are you going?"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//             />
//             <button onClick={handleSearch}>Search</button>
//         </div>
//     );
// };


const SearchBar = () => {
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [guests, setGuests] = useState('');

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Anywhere"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <input
                type="text"
                placeholder="Any week"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <input
                type="text"
                placeholder="Add guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
            />
            <button className="search-button">🔍</button>
        </div>
    );
};


export default SearchBar;
