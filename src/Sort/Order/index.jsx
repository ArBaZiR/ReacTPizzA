//
import { useEffect, useState } from "react";
import style from "./order.module.scss";

export default function Order({ setSortType }) {
  const [sortIndex, setSortIndex] = useState(0);
  const [openBlock, setOpenBlock] = useState(false);

  const selector = [
    { title: "Алфaвиту", sortBy: "title" },
    { title: "Популярности", sortBy: "rating&order=desc" },
    { title: "Цене", sortBy: "price&order=desc" },
  ];

  useEffect(() => {
    setSortType(selector[sortIndex].sortBy);
  }, [sortIndex]);

  return (
    <div onClick={() => setOpenBlock(!openBlock)} className={style.order_block}>
      <button>
        <p>Сортировка по:</p>
        <p>{selector[sortIndex].title}</p>
      </button>
      <div>
        {openBlock ? (
          <div className={style.selector_block}>
            {selector.map((el, i) => (
              <button
                className={sortIndex === i ? style.active : ""}
                key={i}
                onClick={() => setSortIndex(i)}
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
