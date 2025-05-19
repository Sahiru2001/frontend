import "./productCard.css";

export default function ProductCard() {
return (
    <div className = "card">
        <img className = "productImage" src = "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/i/i/m/-original-imahf92dcrxbrzrj.jpeg?q=70&crop=false"></img>
        <h1> Gaming Laptop</h1>
        <p>Whether you're in the midst of epic battles in your favorite titles, exploring vast virtual realms, or streaming your gameplay to a worldwide audience, the powerful Intel® Core™ i7-13700HX processor is the ultimate gaming companion, ensuring that you can enjoy seamless, lag-free gaming, and unlock the full potential of your gaming rig.</p>
        <h2>Price: Au$ 1999 </h2>
        <button className = "addToCart">Add to Cart</button>
        <button className = "buyNow">Buy Now</button>
    
    </div>

)

}