//
//
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import style from "./routes.module.scss";
import Header from "../Header/index";
import Main from "../Main/index";
import Category from "../Sort/Category/index";
import Order from "../Sort/Order/index";
import Cart from "../Cart/index";

export const SetData = createContext();

export default function Routes() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [sortTypes, setSortTypes] = useState(0);
  const [useArray, setUseArray] = useState([]);
  const [global, setGlobal] = useState();
  //
  const getItem = JSON.parse(localStorage.getItem("item"));
  let num = 0;
  let allPizza = 0;

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

  function StaticRoutes() {
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

  const routes = createBrowserRouter([
    {
      element: <StaticRoutes />,
      children: [
        {
          path: "*",
          element: (
            <div className={style.error}>
              <h1>Ошибка 404</h1>
              <h2>Страница не найдена</h2>
            </div>
          ),
        },
        {
          path: "/",
          element: (
            <>
              <div className={style.sort_block}>
                <Category
                  categoryIndex={categoryIndex}
                  setCategoryIndex={setCategoryIndex}
                />
                <Order sortTypes={sortTypes} setSortTypes={setSortTypes} />
              </div>
              <h1 className={style.all_pizza__logo}>Все пиццы</h1>
              <Main index={categoryIndex} sortTypes={sortTypes} />
            </>
          ),
        },
        {
          path: "/cart",
          element: (
            <Cart
              num={num}
              getItem={getItem}
              useArray={useArray}
              allPizza={allPizza}
              setUseArray={setUseArray}
            />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
