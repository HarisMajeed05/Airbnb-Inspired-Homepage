// import { useState } from 'react';
import { useEffect, useRef } from "react";
import '../styles/Categories.css';

// const categories = ['Beachfront', 'Cabins', 'Trending', 'Mountain', 'City', 'Luxury'];

// const Categories = () => {
//     const [selectedCategory, setSelectedCategory] = useState('');

//     return (
//         <div className="categories">
//             {categories.map((category, index) => (
//                 <button
//                     key={index}
//                     className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
//                     onClick={() => setSelectedCategory(category)}
//                 >
//                     {category}
//                 </button>
//             ))}
//         </div>
//     );
// };
const categories = [
    { name: 'Icons', src: 'https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png', link: '/icons', width: 24, height: 24 },
    { name: 'Top cities', src: 'https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg', link: '/top-cities', width: 24, height: 24 },
    { name: 'Rooms', src: 'https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg', link: '/rooms', width: 24, height: 24 },
    { name: 'Amazing views', src: 'https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg', link: '/amazing-views', width: 24, height: 24 },
    { name: 'Countryside', src: 'https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg', link: '/countryside', width: 24, height: 24 },
    { name: 'Tiny homes', src: 'https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg', link: '/tiny-homes', width: 24, height: 24 },
    { name: 'Mansions', src: 'https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg', link: '/mansions', width: 24, height: 24 },
    { name: 'Trophical', src: 'https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg', link: '/trophical', width: 24, height: 24 },
    { name: 'OMG!', src: 'https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg', link: '/omg', width: 24, height: 24 },
    { name: 'Trending', src: 'https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg', link: '/trending', width: 24, height: 24 },
    { name: 'Earth Homes', src: 'https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg', link: '/earthHomes', width: 24, height: 24 },
    { name: 'Castles', src: 'https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg', link: '/castles', width: 24, height: 24 },
    { name: 'Earth Homes', src: 'https://a0.muscache.com/pictures/5ed8f7c7-2e1f-43a8-9a39-4edfc81a3325.jpg', link: '/bed&breakfast', width: 24, height: 24 },
    { name: 'Bed & breakfasts', src: 'https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg', link: '/earthHomes', width: 24, height: 24 },
    { name: 'Earth Homes', src: 'https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg', link: '/earthHomes', width: 24, height: 24 },
    { name: 'Earth Homes', src: 'https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg', link: '/earthHomes', width: 24, height: 24 },
    { name: 'Earth Homes', src: 'https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg', link: '/earthHomes', width: 24, height: 24 },
    { name: 'Earth Homes', src: 'https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg', link: '/earthHomes', width: 24, height: 24 },
    { name: 'Earth Homes', src: 'https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg', link: '/earthHomes', width: 24, height: 24 },
    { name: 'Earth Homes', src: 'https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg', link: '/earthHomes', width: 24, height: 24 },
    { name: 'Earth Homes', src: 'https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg', link: '/earthHomes', width: 24, height: 24 },
    { name: 'Earth Homes', src: 'https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg', link: '/earthHomes', width: 24, height: 24 },
    { name: 'Earth Homes', src: 'https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg', link: '/earthHomes', width: 24, height: 24 },
    { name: 'Earth Homes', src: 'https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg', link: '/earthHomes', width: 24, height: 24 },
    { name: 'Earth Homes', src: 'https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg', link: '/earthHomes', width: 24, height: 24 }
];


const Categories = () => {
    const categoriesRef = useRef([]); // Create a ref for each category button

    useEffect(() => {
        // IntersectionObserver to detect if a category is in view
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('category-visible'); // Remove blur when in view
                    } else {
                        entry.target.classList.remove('category-visible'); // Add blur when out of view
                    }
                });
            },
            { threshold: 0.75 } // Only remove blur when 75% of the category is visible
        );

        categoriesRef.current.forEach((category) => {
            if (category) {
                observer.observe(category);
            }
        });

        // Cleanup the observer on component unmount
        return () => {
            categoriesRef.current.forEach((category) => {
                if (category) {
                    observer.unobserve(category);
                }
            });
        };
    }, []);

    return (
        <div className="categories">
            <div className="category-list">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="category-button"
                        ref={(el) => (categoriesRef.current[index] = el)} // Attach ref to each category
                    >
                        <img src={category.src} alt={category.name} width={category.width} height={category.height} />
                        <p>{category.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};




export default Categories;
