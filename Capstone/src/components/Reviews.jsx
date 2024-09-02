import { useGetTheoryQuery } from "../api/index.js";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Reviews({ token }) {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data = {}, err, isLoading, isSuccess } = useGetTheoryQuery(id);

  console.log(data);
}

export default Reviews;
