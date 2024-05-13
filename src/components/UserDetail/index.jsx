import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import models from '../../modelData/models';
import "./styles.css";
import { Link } from "react-router-dom";
import server from "../../lib/fetchModelData"

/**
 * Define UserDetail, a React component of Project 4.
 */
const UserDetail = ({ userId }) => {
  // const user = models.userModel(userId);
  const [user, setUser] = useState(null);
  // const userPhotos = models.photoOfUserModel(userId);
  const [userPhotos, setUserPhotos] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await server.fetchModel(`/user/${userId}`);
      setUser(userData.data);

      const photosData = await server.fetchModel(`/photo/photosOfUser/${userId}`);
      setUserPhotos(photosData.data)
    }

    // const fetchPhotoData = async () => {
    //   const data = await server.fetchModel(`/photosOfUser/${userId}`);
    //   setuserPhotos(data.data);
    // }

    fetchUserData();
    // fetchPhotoData();
  }, [userId])


  return (
    <>
      {!!user && <div>
        <h2>User Detail</h2>
        <p>Name: {user.first_name} {user.last_name}</p>
        <p>Location: {user.location}</p>
        <p>Description: {user.description}</p>
        <p>Occupation: {user.occupation}</p>

        <h3>Photos</h3>
        <div>
          {userPhotos.map(photo => (
            <div key={photo._id}>
              <img src={`../../images/${photo.file_name}`} alt={`Photo by ${user.first_name}`} style={{ width: '150px' }} />
              <p>Date: {new Date(photo.date_time).toLocaleString()}</p>
              <p><Link to={`/photo/photosOfUser/${photo.user_id}`}>View Photos</Link></p>
            </div>
          ))}
        </div>
      </div>}
    </>
  );
};

export default UserDetail;
