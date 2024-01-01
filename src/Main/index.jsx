//
import style from "./main.module.scss";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loading/index";
import Card from "./Card/index";
import { useMemo } from "react";

export default function Main({ index, sortType }) {
  const Query = useMemo(() => {
    return function Query() {
      const { isLoading, error, data } = useQuery({
        queryKey: ["QueryData"],
        queryFn: () =>
          fetch(
            `https://64f1c3f70e1e60602d243f88.mockapi.io/products?category=${index}&sortBy=${sortType}&order=desc`
          ).then((data) => data.json()),
      });

      if (isLoading) {
        return (
          <div className={style.loader}>
            <Loader />
          </div>
        );
      }

      if (error) {
        return (
          <div className={style.error}>
            <span>Sorry:</span> 500 Internal Server Error :(
          </div>
        );
      }

      return (
        <div className={style.card_block}>
          {data.map((el) => (
            <Card
              key={el.id}
              id={el.id}
              title={el.title}
              img={el.img}
              types={el.types}
              sizes={el.sizes}
              price={el.price}
              quantityT={el.quantity}
            />
          ))}
        </div>
      );
    };
  }, [index, sortType]);

  return <Query />;
}
