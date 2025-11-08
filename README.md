Zayn E commerce Steps:

npm create vite@latest .
React, Javascript

Created .env file

npm install -D tailwindcss @tailwindcss/vite

Added tailwind in vite.config.js

npm i react-router-dom




## 📁 Folder Structure

ZAYN-FRONTEND/
├── .github/
│ └── workflows/
│ └── cicd.yml
│
├── public/
│ └── vite.svg
│
├── src/
│ ├── Assets/
│ │ ├── close.png
│ │ ├── dash.png
│ │ ├── main logo.jpg
│ │ ├── product 1.jpg
│ │ ├── shield.png
│ │ └── (other images & gifs)
│ │
│ ├── Components/
│ │ ├── Admin/
│ │ │ ├── AdminLayout.jsx
│ │ │ ├── OrdersTable.jsx
│ │ │ ├── ProductTable.jsx
│ │ │ ├── AddProductOfferModal.jsx
│ │ │ ├── LineGraph.jsx
│ │ │ └── (other modals, tables, graphs)
│ │ │
│ │ ├── Protected/
│ │ │ ├── AdminProtected.jsx
│ │ │ ├── UserProtected.jsx
│ │ │ └── RouteValidation.jsx
│ │ │
│ │ ├── User/
│ │ │ ├── Header.jsx
│ │ │ ├── Footer.jsx
│ │ │ ├── ProductCard.jsx
│ │ │ ├── CartItem.jsx
│ │ │ ├── Razorpay.jsx
│ │ │ └── (other UI components & modals)
│ │
│ ├── Error/
│ │ └── ErrorBoundary.jsx
│ │
│ ├── Layout/
│ │ └── MyAccountLayout.jsx
│ │
│ ├── Pages/
│ │ ├── Admin/
│ │ │ ├── Dashboard.jsx
│ │ │ ├── AddProducts.jsx
│ │ │ ├── Orders.jsx
│ │ │ ├── Users.jsx
│ │ │ └── (other management pages)
│ │ │
│ │ ├── User/
│ │ │ ├── Home.jsx
│ │ │ ├── Cart.jsx
│ │ │ ├── Checkout.jsx
│ │ │ ├── Orders.jsx
│ │ │ ├── Profile.jsx
│ │ │ └── (other user-facing pages)
│ │
│ ├── Routes/
│ │ ├── Admin.route.jsx
│ │ └── User.route.jsx
│ │
│ ├── Store/
│ │ ├── store.js
│ │ ├── Api/
│ │ │ ├── admin/
│ │ │ ├── setup/
│ │ │ └── user/
│ │ └── StoreSlices/
│ │ ├── adminAuthSlice.js
│ │ ├── cartSlice.js
│ │ └── userAuthSlice.js
│ │
│ ├── Utils/
│ │ ├── getCroppedImg.js
│ │ ├── ProtectedRoute.jsx
│ │ └── YupSchemas.js
│ │
│ ├── WebSocket/
│ │ └── socket.js
│ │
│ ├── App.jsx
│ ├── App.css
│ ├── index.css
│ └── main.jsx
│
├── .env
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
