//
import { useContext, useState } from "react";
import style from "./Card.module.scss";
import { SetData } from "../../StaticRoutes";

export default function Card({ id, title, img, types, dough, sizes, price }) {
  const [activeType, setActiveType] = useState("");
  const [activeSize, setActiveSize] = useState("");
  const [choice, setChoice] = useState("");
  const global = useContext(SetData);

  function AddProducts() {
    const item = JSON.parse(localStorage.getItem("item"))?.find(
      (el) =>
        el.id === id &&
        el.activeType === activeType &&
        el.activeSize === activeSize
    );

    const array = {
      id,
      title,
      img,
      types,
      activeSize,
      price,
      sizes,
      dough,
      activeType,
      quantity: 1,
    };
    //
    dough[activeType] && sizes[activeSize]
      ? item
        ? item.quantity < 9
          ? global.setGlobal(array)
          : setChoice("Слишком Много Пицц данной категории")
        : global.setGlobal(array)
      : !dough[activeType] &&
        setChoice("Выбери Тесто") | !sizes[activeSize] &&
        setChoice("Выбери Размер");
  }

  return (
    <div key={id} className={style.card}>
      <div className={choice ? style.choice_active : ""}>{choice}</div>
      <img src={img} />
      <h2>{title}</h2>
      <div className={style.sortByDough}>
        {types.map((i) => (
          <button
            onClick={() => setActiveType(i)}
            key={i}
            className={activeType === i ? style.active : ""}
          >
            {dough[i]}
          </button>
        ))}
      </div>
      <div className={style.sortBySize}>
        {sizes.map((size, i) => (
          <button
            onClick={() => setActiveSize(i)}
            key={i}
            className={activeSize === i ? style.active : ""}
          >
            {size} см.
          </button>
        ))}
      </div>
      <div className={style.price_block}>
        <h2>от {price} Р</h2>
        <button onClick={() => AddProducts()}>Добавить</button>
      </div>
    </div>
  );
}
