import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { Link, useParams } from "react-router-dom";
import models from '../../modelData/models.js';
import server from "../../lib/fetchModelData"
import Photo from "./Photo.jsx";

/**
 * Define UserPhotos, a React component of Project 4.
 */
const UserPhotos = () => {
  const { userId } = useParams();
  // const userPhotos = models.photoOfUserModel(userId);
  // console.log("djkskajdjakjkd");
  const [userPhotos, setUserPhotos] = useState([])


  useEffect(() => {

    const fetchData = async () => {
      const data = await server.fetchModel(`/photo/photosOfUser/${userId}`);
      setUserPhotos(data.data)
    }
    fetchData();

  }, [userId])


  return (
    <>
      {!!userPhotos && <div>
        <h2>User Photos</h2>
        {userPhotos.map(photo => (
          <Photo key={photo._id} photo={photo} />
        ))}
      </div>}
    </>
  );
};

export default UserPhotos;
