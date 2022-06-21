import React from "react";
import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const params = useParams();
  const trainingName = params.query;

  return (
    <>
      <div>Detail</div>
      {params.query}
      <Link to="/"><button className="bg-pink-100 px-4 py-2">TOP</button></Link>
      <section className="">

      </section>
    </>
  );
};

export default Detail;
