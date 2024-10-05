
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

import { useState, useEffect, useRef } from 'react';

const SearchBar = () => {
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [guests, setGuests] = useState('');

    // Create a ref to hold references to the input elements
    const inputsRef = useRef([]);

    useEffect(() => {
        const inputs = inputsRef.current;

        // Define focus event handler
        const handleFocus = (input) => {
            inputs.forEach(i => {
                if (i && i !== input) {
                    i.style.opacity = '0.5'; // Dull effect on other inputs
                }
            });
        };

        // Define blur event handler
        const handleBlur = () => {
            inputs.forEach(i => {
                if (i) {
                    i.style.opacity = '1'; // Restore opacity on blur
                }
            });
        };


        // Add event listeners to each input
        inputs.forEach(input => {
            if (input) { // Check if input exists
                input.addEventListener('focus', () => handleFocus(input));
                input.addEventListener('blur', handleBlur);

            }
        });

        // Cleanup event listeners on component unmount
        return () => {
            inputs.forEach(input => {
                if (input) { // Check if input exists
                    input.removeEventListener('focus', () => handleFocus(input));
                    input.removeEventListener('blur', handleBlur);
                }
            });
        };
    }, []);

    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Anywhere"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    ref={el => inputsRef.current[0] = el} // Save reference to the input
                />
                <input
                    type="text"
                    placeholder="Any week"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    ref={el => inputsRef.current[1] = el} // Save reference to the input
                />
                <input
                    type="text"
                    placeholder="Add guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    ref={el => inputsRef.current[2] = el} // Save reference to the input
                />
                <button className="search-button">🔍</button>
            </div>
        </div>
    );
};

export default SearchBar;
