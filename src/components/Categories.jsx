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
    { name: 'Tropical', src: 'https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg', link: '/trophical', width: 24, height: 24 },
    { name: 'OMG!', src: 'https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg', link: '/omg', width: 24, height: 24 },
    { name: 'Trending', src: 'https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg', link: '/trending', width: 24, height: 24 },
    { name: 'Earth Homes', src: 'https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg', link: '/earth-homes', width: 24, height: 24 },
    { name: 'Castles', src: 'https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg', link: '/castles', width: 24, height: 24 },
    { name: 'Bed & breakfasts', src: 'https://a0.muscache.com/pictures/5ed8f7c7-2e1f-43a8-9a39-4edfc81a3325.jpg', link: '/bed-breakfast', width: 24, height: 24 },
    { name: 'Camping', src: 'https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg', link: '/camping', width: 24, height: 24 },
    { name: 'Historical Homes', src: 'https://a0.muscache.com/pictures/33dd714a-7b4a-4654-aaf0-f58ea887a688.jpg', link: '/historical-homes', width: 24, height: 24 },
    { name: 'Cabins', src: 'https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg', link: '/cabins', width: 24, height: 24 },
    { name: 'A-frames', src: 'https://a0.muscache.com/pictures/1d477273-96d6-4819-9bda-9085f809dad3.jpg', link: '/a-frames', width: 24, height: 24 },
    { name: 'Lake', src: 'https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg', link: '/lake', width: 24, height: 24 },
    { name: 'Arctic', src: 'https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg', link: '/arctic', width: 24, height: 24 },
    { name: 'Luxe', src: 'https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg', link: '/luxe', width: 24, height: 24 },
    { name: 'Riads', src: 'https://a0.muscache.com/pictures/7ff6e4a1-51b4-4671-bc9a-6f523f196c61.jpg', link: '/riads', width: 24, height: 24 },
    { name: 'Islands', src: 'https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg', link: '/islands', width: 24, height: 24 },
    { name: 'Containers', src: 'https://a0.muscache.com/pictures/0ff9740e-52a2-4cd5-ae5a-94e1bfb560d6.jpg', link: '/containers', width: 24, height: 24 },
    { name: 'Top of the World', src: 'https://a0.muscache.com/pictures/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4.jpg', link: '/top-of-the-world', width: 24, height: 24 },
    { name: 'Design', src: 'https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg', link: '/design', width: 24, height: 24 },
    { name: 'National Parks', src: 'https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg', link: '/national-parks', width: 24, height: 24 },
    { name: 'Caves', src: 'https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg', link: '/caves', width: 24, height: 24 },
    { name: 'Amazing Pools', src: 'https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg', link: '/amazing-pools', width: 24, height: 24 },
    { name: 'New', src: 'https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg', link: '/new', width: 24, height: 24 },
    { name: 'Farms', src: 'https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg', link: '/farms', width: 24, height: 24 },
    { name: 'Off-the-Grid', src: 'https://a0.muscache.com/pictures/9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg', link: '/off-the-grid', width: 24, height: 24 },
    { name: 'Cycladic Homes', src: 'https://a0.muscache.com/pictures/e4b12c1b-409b-4cb6-a674-7c1284449f6e.jpg', link: '/cycladic-homes', width: 24, height: 24 },
    { name: 'Dammusi', src: 'https://a0.muscache.com/pictures/c9157d0a-98fe-4516-af81-44022118fbc7.jpg', link: '/dammusi', width: 24, height: 24 },
    { name: 'Surfing', src: 'https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg', link: '/surfing', width: 24, height: 24 },
    { name: 'Yurts', src: 'https://a0.muscache.com/pictures/4759a0a7-96a8-4dcd-9490-ed785af6df14.jpg', link: '/yurts', width: 24, height: 24 },
    { name: 'Treehouses', src: 'https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg', link: '/tree-houses', width: 24, height: 24 },
    { name: 'Beachfront', src: 'https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg', link: '/beach-front', width: 24, height: 24 },
    { name: 'Beach', src: 'https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg', link: '/beach', width: 24, height: 24 },
    { name: 'Campers', src: 'https://a0.muscache.com/pictures/31c1d523-cc46-45b3-957a-da76c30c85f9.jpg', link: '/campers', width: 24, height: 24 },
    { name: 'Surfing', src: 'https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg', link: '/surfing', width: 24, height: 24 },
    { name: 'Surfing', src: 'https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg', link: '/surfing', width: 24, height: 24 },
    { name: 'Surfing', src: 'https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg', link: '/surfing', width: 24, height: 24 },
    { name: 'Surfing', src: 'https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg', link: '/surfing', width: 24, height: 24 },
    { name: 'Surfing', src: 'https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg', link: '/surfing', width: 24, height: 24 },
    { name: 'Surfing', src: 'https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg', link: '/surfing', width: 24, height: 24 },
    { name: 'Surfing', src: 'https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg', link: '/surfing', width: 24, height: 24 },
    { name: 'Surfing', src: 'https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg', link: '/surfing', width: 24, height: 24 }
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
