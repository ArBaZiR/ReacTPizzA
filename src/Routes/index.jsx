//
//
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./routes.module.scss";
import Main from "../Main/index";
import Category from "../Sort/Category/index";
import Order from "../Sort/Order/index";
import Cart from "../Cart/index";
import StaticRoutes from "../StaticRoutes/index";
//

export default function Routes() {
  const [allCost, setAllCost] = useState(0);
  const [allNum, setAllNum] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [sortType, setSortType] = useState("title");
  const [useArray, setUseArray] = useState([]);
  //
  useEffect(() => {
    useArray?.length && localStorage.setItem("item", JSON.stringify(useArray));
    setAllCost(
      useArray.reduce(
        (accumulator, el) => accumulator + el.price * el.quantity,
        0
      )
    );
    setAllNum(
      useArray.reduce((accumulator, el) => accumulator + el.quantity, 0)
    );
  }, [useArray]);
  const routes = createBrowserRouter([
    {
      element: (
        <StaticRoutes
          allCost={allCost}
          allNum={allNum}
          useArray={useArray}
          setUseArray={setUseArray}
        />
      ),
      children: [
        {
          path: "*",
          element: <Navigate to={"/"} />,
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
                <Order setSortType={setSortType} />
              </div>
              <h1 className={style.all_pizza__logo}>Все пиццы</h1>
              <Main index={categoryIndex} sortType={sortType} />
            </>
          ),
        },
        {
          path: "/cart",
          element: (
            <Cart
              allCost={allCost}
              allNum={allNum}
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
