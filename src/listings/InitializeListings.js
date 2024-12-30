import { MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'airbnbListings';
const client = new MongoClient(uri);

const listings = {
    "Icons": [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
      },
      {
        id: 7,
        image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4NjI3OTI1MjIxNDQyOA%3D%3D/original/bc989f2d-eca8-4bcf-a9b0-b70b8e685a64.jpeg?im_w=1440&im_q=highq',
        title: "Live like Bollywood star Janvhi Kapoor",
        hostedby: "Hosted by Janvhi Kapoor",
        type: 'Entire home',
        guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        price: "",
        status: "Sold out",
        rating: ""
      },
      {
        id:8,
        image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE2MjI1MjI0NDQ0MzYzMjM4Mg%3D%3D/original/ae3426d1-fba4-44d4-bed2-690426f25f7a.jpeg?im_w=960&im_q=highq',
        title: "Open the Olympic Games at Musée d’Orsay",
        hostedby: "Hosted by Mathieu Lehanneur",
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
        id:1,
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
        id:2,
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
        id:3,
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
        id:4,
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
        id:5,
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
        id:6,
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

async function run() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collectionIcons = db.collection('icons');
    const collectionTopCities = db.collection('topcities');

    await collectionIcons.insertMany(listings.Icons);
    console.log('Inserted Icons data');

    await collectionTopCities.insertMany(listings['Top cities']);
    console.log('Inserted Top Cities data');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
