//
import style from "./category.module.scss";

export default function Category({ categoryIndex, setCategoryIndex }) {
  const category = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Фирменные",
  ];

  return (
    <div className={style.category_block}>
      {category.map((el, i) => (
        <button
          onClick={() => setCategoryIndex(i)}
          className={categoryIndex === i ? style.size_btn_active : ""}
          key={i}
        >
          {el}
        </button>
      ))}
    </div>
  );
}
