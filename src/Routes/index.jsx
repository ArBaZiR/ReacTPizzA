//
//
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useRef, useState } from "react";
import style from "./routes.module.scss";
import Main from "../Main/index";
import Category from "../Sort/Category/index";
import Order from "../Sort/Order/index";
import Cart from "../Cart/index";
import StaticRoutes from "../StaticRoutes/index";
//

export default function Routes() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [sortTypes, setSortTypes] = useState(0);
  const [useArray, setUseArray] = useState([]);
  //
  const numRef = useRef(0);
  const allPizzaRef = useRef(0);
  //
  //
  const routes = createBrowserRouter([
    {
      element: (
        <StaticRoutes
          num={numRef.current}
          allPizza={allPizzaRef.current}
          useArray={useArray}
          setUseArray={setUseArray}
        />
      ),
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
              num={numRef.current}
              allPizza={allPizzaRef.current}
              useArray={useArray}
              setUseArray={setUseArray}
            />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
