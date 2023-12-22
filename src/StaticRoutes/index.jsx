//
import { createContext, useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import style from "./static.module.scss";
import Header from "../Header/index";
//
export const SetData = createContext();

export default function StaticRoutes({ num, allPizza, useArray, setUseArray }) {
  const [global, setGlobal] = useState();
  //
  const getItem = JSON.parse(localStorage.getItem("item"));
  getItem
    ? getItem.map(
        (el) => (num += el.price * el.quantity) | (allPizza += el.quantity)
      )
    : "";

  useEffect(() => {
    const item = useArray.find((el) =>
      el.id === global.id
        ? el.dough[el.activeType] === global.dough[global.activeType] &&
          el.sizes[el.activeSize] === global.sizes[global.activeSize]
        : ""
    );

    if (global) {
      item ? item.quantity++ : useArray.push(global);
      localStorage.setItem("item", JSON.stringify(useArray));
    }
    //
    const getItem = JSON.parse(localStorage.getItem("item"));
    getItem ? setUseArray(getItem) : "";
  }, [global]);

  return (
    <SetData.Provider value={{ setGlobal }}>
      <div className={style.block}>
        <header>
          <Header num={num} allPizza={allPizza} />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </SetData.Provider>
  );
}
