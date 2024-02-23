//
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import style from "./static.module.scss";
import Header from "../Header/index";
//
export const SetData = createContext();

export default function StaticRoutes({
  allCost,
  allNum,
  useArray,
  setUseArray,
}) {
  const [global, setGlobal] = useState(null);
  //

  useEffect(() => {
    if (global) {
      const item = useArray.find(
        (el) =>
          el.id === global.id &&
          el.activeType === global.activeType &&
          el.activeSize === global.activeSize
      );
      //
      item
        ? (item.quantity++, setUseArray((e) => [...e]))
        : setUseArray((e) => [...e, global]);
    }
  }, [global]);

  return (
    <SetData.Provider value={{ setGlobal }}>
      <div className={style.block}>
        <header>
          <Header allCost={allCost} allNum={allNum} />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </SetData.Provider>
  );
}
