import Carousel from "./Carousel";
import Category from "./Category";
// import Filter from "./Filter";
import Product from "./Product";

const Body = ({sneakers,firstProduct,shorts,watches,glasses}) => {
  console.log(watches);
  return (
    <div>
      <Carousel firstProduct={firstProduct}/>
      {/* <Category sneakers={sneakers} watches={watches} shorts={shorts} glasses={glasses} /> */}

      {/* <Product products={sneakers} name="Sneakers" goto="sneakers"/> */}
      {/* <Product products={watches} /> */}
      {/* <Product products={shorts} name="Shorts" goto="shorts"/> */}
      {/* <Product products={glasses} name="Glasses" goto="glasses"/> */}
      {/* <Filter/> */}
    </div>
  );
};

export default Body;
