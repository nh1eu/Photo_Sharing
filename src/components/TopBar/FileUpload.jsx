import React, { useState } from 'react';
import postData from "../../lib/postData";
import AlertMessage from '../Layout/AlertMessage';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState(null);


  const selectFile = (event) => {
    if (!!event.target.files[0])
      setFile(event.target.files[0]);
  }

  const uploadFile = async () => {
    const data = new FormData();
    data.append("image", file, file.name);

    try {
      await postData("/photo/photos/new", data);
      setAlert({ type: "ok", message: "Upload file successfully!" });
    } catch (error) {
      console.log(error);
      setAlert({ type: "danger", message: error.message ?? error.response.data });
    }

  }

  return (
    <div className='file-upload' style={{ display: 'flex', gap: 8 }}>
      <AlertMessage info={alert} />
      <input type='file' accept="image/*" onChange={selectFile} />
      {!!file && <div className='right-button' onClick={() => uploadFile()}>Add Photo</div>}
    </div>
  )
}

export default FileUpload