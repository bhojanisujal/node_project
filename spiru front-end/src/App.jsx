import "./App.css";
import "../src/sass/sass.scss";
import NavBar from "./components/NavBar";
import Carousel from "./components/Carousel";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Bestsellers from "./components/Bestseller";
import Balance from "./components/Balance";
import NewLaunches from "./components/NewLaunches";
import TabPane from "./components/TabPane";
import Section10 from "./components/Section10";
import Footer from "./components/Footer";
import Blog from "./components/Blog";
import Offers from "./components/Offers";
import SupportFeatures from "./components/SupportFeatures";
import Reviews from "./components/Reviews";
import Transformation from "./components/Transformation";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wishlist from "./components/WishList";
import { WishlistProvider } from "./components/WishlistContext";
import Collection from "./components/Collection";
import Cartmainpage from "./components/Cartmainpage";
import CartSidebar from "./components/Cartsidebar";
import { CartProvider } from "./components/CartContext";
import Shopall from "./components/Shopeall";
import ProductDetails from "./components/productDiteils";
import Checkout from "./components/Checkout";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Header />
          <NavBar />
          <CartSidebar />
          <Routes>
            <Route path="/cart" element={<Cartmainpage />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/Shopall" element={<Shopall />} />
            <Route path="/collection" element={<Collection />}>
              <Route path=":category" element={<Collection />} />
            </Route>
            <Route
              path="/"
              element={
                <>
                  <Login />
                  <Carousel />
                  <Categories />
                  <Bestsellers />
                  <Transformation />
                  <Balance />
                  <NewLaunches />
                  <TabPane />
                  <Section10 />
                  <Blog />
                  <Reviews />
                  <SupportFeatures />
                </>
              }
            />
          </Routes>
          <Offers />
          <Footer />
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;