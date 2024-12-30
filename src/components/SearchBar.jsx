
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

    const inputsRef = useRef([]);

    useEffect(() => {
        const inputs = inputsRef.current;

        const handleFocus = (input) => {
            inputs.forEach(i => {
                if (i && i !== input) {
                    i.style.opacity = '0.5';
                }
            });
        };

        const handleBlur = () => {
            inputs.forEach(i => {
                if (i) {
                    i.style.opacity = '1'; 
                }
            });
        };


        inputs.forEach(input => {
            if (input) {
                input.addEventListener('focus', () => handleFocus(input));
                input.addEventListener('blur', handleBlur);

            }
        });

        return () => {
            inputs.forEach(input => {
                if (input) {
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
                    ref={el => inputsRef.current[0] = el} 
                />
                <input
                    type="text"
                    placeholder="Any week"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    ref={el => inputsRef.current[1] = el}
                />
                <input
                    type="text"
                    placeholder="Add guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    ref={el => inputsRef.current[2] = el} 
                />
                <button className="search-button">🔍</button>
            </div>
        </div>
    );
};

export default SearchBar;
