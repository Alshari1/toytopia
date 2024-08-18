import CheckoutCart from "../../Cart/CheckoutCart";
import MiniCart from "../../Cart/MiniCart";
import Navbar from "../../Navbar/Navbar";

const Checkout = () => {



    const products = [
        {
            name: "Apple iPhone 12 Pro (128GB)",
            image: "https://store.storeimages.cdn-apple.com/4953/as-images.apple.com/is/image/AppleInc/MNPY3LL/A/MNPY3LL-product-select-2020?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1604018739000",
            color: "Silver",
            memoryStorage: "128GB",
            price: 544.9,
        },
        {
            name: "Headphones SONY 11 X-O",
            image: "https://images-na.ssl-images-amazon.com/images/I/412rX3%2B5gJL._AC_SY355_.jpg",
            color: "Grey",
            price: 44.9,
        },
        {
            name: "Smartwatch Uistore Homme Watch 19",
            image: "https://www.uis.com.tr/images/urunler/21582/ustore-homme-akilli-saat-siyah-19-9003354525007.jpg",
            color: "Green",
            size: "M",
            price: 120.9,
        },
    ];

    return (
       <div>
        <Navbar></Navbar>
         <div className="flex justify-between">
            <div className="p-6 w-4/5">
                {products.map((product) => (
                    <CheckoutCart key={product.id} product={product} />
                ))}
            </div>
            <div className="w-1/5 flex justify-center">
                <MiniCart cartItems={[]}></MiniCart>
            </div>
        </div>
       </div>
    );
}

export default Checkout;
