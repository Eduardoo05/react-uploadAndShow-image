import { useState } from "react";
import { useRef } from "react"
import './App.css'


function App() {

  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const handleImageClick = () =>{
    inputRef.current.click();
  }

  const handleImageChange = (event) =>{
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
      const img = new Image();
      img.src = reader.result;
      img.onload = () =>{
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob],img.name, {
              type: "image/png",
              lastModified: Date.now(),
            });
            console.log(file);
            setImage(event.target.files[0])
          },
          "image/jpeg",
          0.8 
        );
      };
    };
  };

  
  /*const handleUploadButtonClick = (file) =>{
    var myHeaders = new Headers();
    const token = "adhgsdksdhk938742937423";
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("file", file);

    /*var requestOption = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://trickweb.com/upload/profile_pic", requestOption)
      .then((response) => response.text())
      .then((result) =>{
        console.log(JSON.parse(result));
        const profileurl = JSON.parse(result);
        setImage(profileurl.img_url);
      });
      .catch((error) => console.log("error", error));
  };*/


  return (
    <>
    <div className="image-upload-container">
      <div className="box-decoration">
        <label htmlFor="image-upload-input" className="image-upload-label">
          {image ? image.name : "Elige una imagen"}
        </label>
        <div onClick={handleImageClick} style={{cursor: "pointer"}}>
          {image ? (<img src={URL.createObjectURL(image)} alt="" className="img-display-before"/>) : (<img src="./image/defaultImage.png" alt="" className="img-display-before" />)}
          <input type="file" ref={inputRef} onChange={handleImageChange} style={{display: "none"}}/>
        </div>
        <button className="image-upload-button" onClick={handleImageClick}>Upload</button>
      </div>
    </div>
    </>
  )
}

export default App
