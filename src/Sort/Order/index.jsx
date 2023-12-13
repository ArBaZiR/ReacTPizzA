//
import { useState } from "react";
import style from "./order.module.scss";

export default function Order({ sortTypes, setSortTypes }) {
  const [openBlock, setOpenBlock] = useState(false);

  const selector = [
    { title: "алфaвиту" },
    { title: "популярности" },
    { title: "цене" },
  ];

  return (
    <div onClick={() => setOpenBlock(!openBlock)} className={style.order_block}>
      <button>
        <p>Сортировка по:</p>
        <p>{selector[sortTypes].title}</p>
      </button>
      <div>
        {openBlock ? (
          <div className={style.selector_block}>
            {selector.map((el, i) => (
              <button
                className={sortTypes === i ? style.active : ""}
                key={i}
                onClick={() => setSortTypes(i)}
              >
                {el.title}
              </button>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
