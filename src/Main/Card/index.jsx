//
import { useContext, useState } from "react";
import style from "./Card.module.scss";
import { SetData } from "../../Routes";

export default function Card({ id, title, img, types, sizes, price }) {
  const [activeType, setActiveType] = useState();
  const [activeSize, setActiveSize] = useState();
  const [choice, setChoice] = useState("");
  const dough = ["тонкое", "традиционное"];
  const global = useContext(SetData);
  const quantity = 1;

  function AddProducts() {
    const getItem = JSON.parse(localStorage.getItem("item"));
    const item = getItem.map((el) => {
      if (el.id === id) {
        if (
          el.dough[el.activeType] === dough[activeType] &&
          el.sizes[el.activeSize] === sizes[activeSize]
        ) {
          return el;
        }
      }
    });
    //
    dough[activeType] && sizes[activeSize]
      ? item
        ? item.quantity < 9
          ? global.setGlobal({
              id,
              title,
              img,
              types,
              activeSize,
              price,
              sizes,
              activeSize,
              dough,
              activeType,
              quantity,
            })
          : setChoice("Слишком Много Пицц данной категории")
        : global.setGlobal({
            id,
            title,
            img,
            types,
            activeSize,
            price,
            sizes,
            activeSize,
            dough,
            activeType,
            quantity,
          })
      : !dough[activeType]
      ? setChoice("Выбери Тесто")
      : "" | !sizes[activeSize]
      ? setChoice("Выбери Размер")
      : "";
  }

  return (
    <div key={id} className={style.card}>
      <div className={choice ? style.choice_error_active : style.choice_error}>
        {choice}
      </div>
      <img src={img} />
      <h2>{title}</h2>
      <div className={style.sortByDough}>
        {types.map((typeI) => (
          <button
            onClick={() => setActiveType(typeI)}
            key={typeI}
            className={activeType === typeI ? style.active : ""}
          >
            {dough[typeI]}
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
