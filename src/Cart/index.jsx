//
import { Link } from "react-router-dom";
import style from "./cart.module.scss";

export default function Cart({ num, allPizza, useArray, setUseArray }) {
  //
  const getItem = JSON.parse(localStorage.getItem("item"));
  getItem
    ? getItem.map(
        (el) => (num += el.price * el.quantity) | (allPizza += el.quantity)
      )
    : "";
  //
  function GetAndSet() {
    localStorage.setItem("item", JSON.stringify(useArray));
    setUseArray(JSON.parse(localStorage.getItem("item")));
  }
  //
  function Increase(i) {
    useArray[i].quantity < 9 ? useArray[i].quantity++ : "";
    GetAndSet();
  }
  //
  function Decrease(i) {
    useArray[i].quantity > 1 ? useArray[i].quantity-- : useArray.splice(i, 1);
    GetAndSet();
  }

  function Delete(i) {
    useArray.splice(i, 1);
    GetAndSet();
  }

  return (
    <div className={style.cart_block}>
      {!getItem || getItem.length < 1 ? (
        <div className={style.cart_empty}>
          <h1>Здесь пока ничего нету</h1>
          <p>Вероятнее всего, вы ещё не добавляли пиццу.</p>
          <p>Для того, чтобы её добавить, перейдите на главную страницу.</p>
          <Link to={"/"}>
            <button>Вернуться назад</button>
          </Link>
        </div>
      ) : (
        <div>
          <div className={style.cart_header}>
            <h1>Корзина</h1>
            <button
              onClick={() => (
                localStorage.setItem("item", JSON.stringify([])),
                setUseArray(JSON.parse(localStorage.getItem("item")))
              )}
              className={style.clear_cart}
            >
              Очистить корзину
            </button>
          </div>
          <div className={style.cart_products}>
            {/*  */}
            {getItem.map((el, i) => (
              <div key={i} className={style.cart_card}>
                <img src={el.img} alt="" />
                <div className={style.card__title}>
                  <h2>{el.title}</h2>
                  <p>
                    {el.dough[el.activeType]}, {el.sizes[el.activeSize]} см.
                  </p>
                </div>
                <div className={style.card_counter}>
                  <button
                    onClick={() => Decrease(i)}
                    className={style.decrease}
                  >
                    <span />
                  </button>
                  <h2>{el.quantity}</h2>
                  <button
                    onClick={() => Increase(i)}
                    className={style.increase}
                  >
                    <span />
                  </button>
                </div>
                <div className={style.card_price}>
                  {el.price * el.quantity} Р
                </div>
                <button onClick={() => Delete(i)} className={style.card_delete}>
                  <span />
                </button>
              </div>
            ))}
            {/*  */}
          </div>
          <div className={style.cart_footer}>
            <div>
              <p>
                Всего пицц: <span>{allPizza} шт.</span>
              </p>
              <p>
                Сумма заказа: <span>{num} Р</span>
              </p>
            </div>
            <div>
              <Link to={"/"}>
                <button className={style.go_back}>Вернуться назад</button>
              </Link>
              <button className={style.pay}>Оплатить сейчас</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
