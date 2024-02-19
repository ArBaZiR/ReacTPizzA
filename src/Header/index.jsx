//
import { Link } from "react-router-dom";
import style from "./header.module.scss";

export default function Header({ allCost, allNum }) {
  return (
    <div className={style.header_block}>
      <Link to={"/"}>
        <div className={style.logo_block}>
          <img src="/Pizza_logo.svg" alt="#" />
          <div>
            <h1>React PIZZA</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </div>
      </Link>
      <div>
        <Link to={"/cart"}>
          <div className={style.cart_block}>
            <div>
              <div>{allCost}</div>
              <p>р</p>
            </div>
            <span></span>
            <div>
              <img src="/cart.svg" alt="" />
              <p>{allNum}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
