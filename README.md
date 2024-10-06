# Airbnb-Inspired React Application

This project is a React application that replicates the main features of the Airbnb homepage. The primary focus is on building a responsive and interactive user interface using React hooks, functional components, and modern styling techniques like CSS modules.

## Project Description

This application simulates a simplified version of the Airbnb homepage, including key components such as the navbar, search bar, property categories, listing cards, and a footer. It is designed to be mobile-responsive and includes the following features:

- **Navbar**: Includes a logo, navigation links (Home, Experiences, Online Experiences), and a user menu for login/signup.
- **SearchBar**: Allows users to input a location and trigger searches.
- **Categories**: Provides a horizontal scrollable list of property categories (e.g., Beachfront, Cabins, Trending).
- **ListingCard**: Displays property details such as images, titles, property type, number of guests, bedrooms, bathrooms, price, and rating.
- **Footer**: Includes links to various pages (Support, Community, Hosting, About), social media icons, and copyright information.

The application uses React's `useState` and `useEffect` hooks for state management and side effects like fetching mock listing data and updating the display when different categories are selected.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/HarisMajeed05/Airbnb-Inspired-Homepage.git
   ```

2. **Navigate into the project directory:**

   ```bash
   cd Airbnb-Inspired-Homepage
   ```

3. **Install dependencies:**

   Make sure you have [Node.js](https://nodejs.org/) installed. Then, install the project dependencies:

   ```bash
   npm install
   ```

4. **Run the development server:**

   Start the project locally by running:

   ```bash
   npm run dev
   ```

5. **Open the application:**

   Once the server is running, open your browser and go to `http://localhost:3000` to view the application.

## Assumptions & Design Decisions

- **Responsiveness**: The app has been designed to be responsive across multiple screen sizes, especially for mobile and tablet views.
- **State Management**: The `useState` hook is used for managing local component states like active categories and search inputs.
- **Mock Data**: For simplicity, mock data is used for listings, and no real API integration is implemented.
- **CSS Modules**: The project uses CSS modules for scoped and modular styling, ensuring that styles don't conflict with each other.
- **Component-Based Structure**: The project is structured around reusable components like `Navbar`, `SearchBar`, `Categories`, `ListingCard`, and `Footer`, to maintain a clear and maintainable codebase.

---
