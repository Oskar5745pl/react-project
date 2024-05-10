import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  // const highlight = {
  //     color: '#553087',
  //     fontSize: 60,
  //     fontFamily: 'Lexend',
  //     fontWeight: '400',
  //     wordWrap: 'break-word'
  // }
  // const text = {
  //     color: 'black', fontSize: 48, fontFamily: 'Anaheim', fontWeight: '400', wordWrap: 'break-word'
  // }
  // const nav = {
  //     color: '#553087', fontSize: 20, fontFamily: 'Lexend', fontWeight: '300', wordWrap: 'break-word'
  // }

  return (
    <>
      <div id="landingPage">
        <div className="heading">
          <p id="heroTxt">
            Fuel Your Body<span> On-the-Go:</span>{" "}
          </p>{" "}
        </div>
        <div className="subHeading">
          <p>
            Discover Our <span>Premium</span> Supplements
          </p>
          <button id="homeBtn">
            <Link to={"/products"}>Explore Our Range</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
