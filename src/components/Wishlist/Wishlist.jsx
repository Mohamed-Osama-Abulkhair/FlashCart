import React, { useContext, useEffect, useState } from "react";
import { storeContext } from "../Context/storeContext.js";
import Loading from "../Loading/Loading.jsx";
import WishlistItem from "../WishlistItem/WishlistItem.jsx";

export default function Wishlist() {
  const [loading, setLoading] = useState(true);

  const { getCartOrWishlist, data, setData } = useContext(storeContext);

  useEffect(() => {
    (async () => {
      const data = await getCartOrWishlist("wishlist");
      data.message == "success" ? setData(data.result) : setData(null);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading ? <Loading /> : ""}
      {!data?.length ? (
        <h2 className="text-center my-5 text-main">No items in Wishlist</h2>
      ) : (
        <div className="container-fluid py-5 px-5 ">
          <div className="row bg-main-light rounded-4 p-3 m-0 cartRow">
            <h2>My wish List</h2>
            {data?.map((item) => {
              return <WishlistItem key={item._id} item={item} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}
