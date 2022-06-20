import React from "react";
import { Link, useParams } from "react-router-dom";


const Detail = () => {
  const params = useParams();

  return (
    <>
      <div>Detail</div>
      {params.query}
      <Link to="/"><button className="bg-pink-100 px-4 py-2">TOP</button></Link>
    </>
  );
};

export default Detail;
