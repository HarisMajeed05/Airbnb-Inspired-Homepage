// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// import Navbar from './components/Navbar';
// import SearchBar from './components/SearchBar';
// import Categories from './components/Categories';
// import ListingCard from './components/ListingCard';
// import Footer from './components/Footer';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <Navbar />
//       <SearchBar />
//       <Categories />

//       {/* ListingCard Components with different data */}
//       <div className="listing-grid">
//         <ListingCard
//           image="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/a766e0e9-1e6f-4b88-b8d5-ce12375c6de8.png?im_w=1440&im_q=highq"
//           title="Cozy Beachfront Villa"
//           type="Entire home"
//           guests={4}
//           bedrooms={2}
//           bathrooms={2}
//           price={250}
//           rating={4.8}
//         />

//         <ListingCard
//           image="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDV8fGx1eHVyeSUyMGFwYXJ0bWVudHxlbnwwfHx8fDE2ODY4NTExNDg&ixlib=rb-1.2.1&q=80&w=1080"
//           title="Mountain Cabin Retreat"
//           type="Cabin"
//           guests={6}
//           bedrooms={3}
//           bathrooms={2}
//           price={180}
//           rating={4.6}
//         />

//         <ListingCard
//           image="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDV8fGx1eHVyeSUyMGFwYXJ0bWVudHxlbnwwfHx8fDE2ODY4NTExNDg&ixlib=rb-1.2.1&q=80&w=1080"
//           title="Luxury City Apartment"
//           type="Apartment"
//           guests={2}
//           bedrooms={1}
//           bathrooms={1}
//           price={300}
//           rating={4.9}
//         />

//         <ListingCard
//           image="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDExMTEzMHx8bG9mdCUyMGRvd250b3dufGVufDB8fHx8MTY4ODcwNjU5OQ&ixlib=rb-1.2.1&q=80&w=1080"

//           title="Modern Downtown Loft"
//           type="Loft"
//           guests={2}
//           bedrooms={1}
//           bathrooms={1}
//           price={200}
//           rating={4.7}
//         />
//       </div>

//       <Footer />
//     </div>
//   );
// }

import { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Categories from './components/Categories';
import ListingCard from './components/ListingCard';
import Footer from './components/Footer';
import './App.css';



const listings = {
  "Icons": [
    {
      image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/a766e0e9-1e6f-4b88-b8d5-ce12375c6de8.png?im_w=720&im_q=highq',
      title: "Stay in Prince's Purple Rain house",
      type: 'Entire home',
      distance: "",
      duration: "",
      hostedby: "Hosted by Wendy and Lisa",
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      price: "$7",
      status: "per guest",
      rating: ""
    },
    {
      image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjMyMzc5Mzc2MTc3OTEzMg%3D%3D/original/8a39953f-f158-4cc2-a112-aa4079e0fca8.jpeg?im_w=720&im_q=highq',
      title: "Join the Living Room Session with Doja Cat",
      hostedby: "Hosted by Doja Cat",
      type: 'Entire home',
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      price: "$77",
      status: " per guest",
      rating: ""
    }
    ,
    {
      image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3NzY2MTYzNDg4MjE2ODY1Nw%3D%3D/original/a332d020-4315-4f63-af71-444d46474939.png?im_w=1440&im_q=highq',
      title: "Sleepover at Polly Pocket's Compact",
      hostedby: "Hosted by Polly Pocket",
      type: 'Entire home',
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      price: "",
      status: "Sold out",
      rating: ""
    },
    {
      image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE4NzE3Nzg1NDA2MjM5NzY2NQ%3D%3D/original/6989d581-3f67-4cd9-8cb6-5f5c226aedc6.png?im_w=1440&im_q=highq',
      title: "Playdate at Polly Pocket's Compact",
      hostedby: "Hosted by Doja Cat",
      type: 'Entire home',
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      price: "",
      status: "Sold out",
      rating: ""
    },
    {
      image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4NzY0ODgzNzUzNjQzNw%3D%3D/original/1077cfcd-29d5-42b7-adab-19e0b620e492.jpeg?im_w=1440&im_q=highq',
      title: "Go VIP with Kevin Hart",
      hostedby: "Hosted by Kevin Hart",
      type: 'Entire home',
      distance: "",
      duration: "",
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      price: "",
      status: "Sold out",
      rating: ""
    },
    {
      image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjIzMTk3NDU3MjE4Nzg2NA%3D%3D/original/f4cbe542-3ce0-4c6f-a8f1-d2120c1b2420.jpeg?im_w=1440&im_q=highq',
      title: "Train at the X-Mansion",
      hostedby: "Hosted by Jubilee",
      type: 'Entire home',
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      price: "",
      status: "Sold out",
      rating: ""
    }
  ],
  "Top cities": [
    {
      image: 'https://a0.muscache.com/im/pictures/miso/Hosting-631154213461762756/original/9e1dc69d-c64f-4052-8dad-6f089fa04b6e.jpeg?im_w=720',
      title: "Paris, France",
      hostedby: "",
      distance: "5,930 kilometers away",
      duration: "Oct 26-31",
      type: '',
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      price: "$2,531 night",
      status: "",
      rating: "⭐ 5.0"
    },
    {
      image: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/77873d3d-6c2b-4b43-853d-925ba0192e5d.jpg?im_w=720',
      title: "Rome, Italy",
      hostedby: "",
      distance: "5,288 kilometers away",
      duration: "Dec 15-20",
      type: '',
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      price: "$229 night",
      status: "",
      rating: "⭐ 4.95"
    },
    {
      image: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/23a60113-a16d-4cd6-bf5a-a2f352eb4f4e.jpg?im_w=720',
      title: "Gaular, Norway",
      hostedby: "",
      distance: "5,580 kilometers away",
      duration: "Oct 14-19",
      type: '',
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      price: "$324 night",
      status: "",
      rating: "⭐ 4.94"
    },
    {
      image: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/77873d3d-6c2b-4b43-853d-925ba0192e5d.jpg?im_w=720',
      title: "Rome, Italy",
      hostedby: "",
      distance: "5,288 kilometers away",
      duration: "Dec 15-20",
      type: '',
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      price: "$229 night",
      status: "",
      rating: "⭐ 4.95"
    },
    {
      image: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/77873d3d-6c2b-4b43-853d-925ba0192e5d.jpg?im_w=720',
      title: "Rome, Italy",
      hostedby: "",
      distance: "5,288 kilometers away",
      duration: "Dec 15-20",
      type: '',
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      price: "$229 night",
      status: "",
      rating: "⭐ 4.95"
    },
    {
      image: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/77873d3d-6c2b-4b43-853d-925ba0192e5d.jpg?im_w=720',
      title: "Rome, Italy",
      hostedby: "",
      distance: "5,288 kilometers away",
      duration: "Dec 15-20",
      type: '',
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      price: "$229 night",
      status: "",
      rating: "⭐ 4.95"
    }
  ]
};

function App() {
  const [activeCategory, setActiveCategory] = useState('Icons'); // Default to 'Icons'

  // Get listings based on active category
  const filteredListings = listings[activeCategory] || []; // This should give the correct listings based on active category

  return (
    <div className="App">
      <Navbar />
      <SearchBar />
      <Categories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory} // Pass the setActiveCategory function
      /> {/* Pass down the function and active category */}
      <div className="listing-section">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing, index) => (
            <ListingCard key={index} {...listing} /> // Spread the listing object as props
          ))
        ) : (
          <p>No listings available for this category.</p> // Display message when no listings are found
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;