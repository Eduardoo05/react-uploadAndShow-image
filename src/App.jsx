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
    console.log(file);
    setImage(event.target.files[0])
  }

  return (
    <>
    <div className="image-upload-container">
      <div className="box-decoration">
        <label htmlFor="image-upload-input" className="image-upload-label">
          {image ? image.name : "Choose an image"}
        </label>
        <div onClick={handleImageClick} style={{cursor: "pointer"}}>
          {image ? (<img src={URL.createObjectURL(image)} alt="" className="img-display-before"/>) : (<img src="./image/defaultImage.png" alt="" className="img-display-before" />)}
          <input type="file" ref={inputRef} onChange={handleImageChange} style={{display: "none"}}/>
        </div>
        <button className="image-upload-button">Upload</button>
      </div>
    </div>
    </>
  )
}

export default App
