import React, { useRef, useState } from "react";
import "./Image.css";
import img from "../Assets/img1.jpeg";
import ima from "../Assets/img2.jpeg";
import imag from "../Assets/img3.jpeg";
import image from "../Assets/img4.jpeg";
import imaged from "../Assets/img5.jpeg";
import imaget from "../Assets/img6.jpeg";
import default_image from "../Assets/default.jpeg";
const Image = () => {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);
  const imageGenerator = async () => {
    const searchTerm = inputRef.current.value.trim().toLowerCase();
    
    if (searchTerm === "") {
      alert("Please enter a description to search for an image.");
      return;
    }
  
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=47698926-0a8ba9952d4de2c86df9d083f&q=${encodeURIComponent(searchTerm)}&image_type=photo`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
  
      const data = await response.json();
      console.log(data);
  
      if (data.hits.length > 0) {
        setImage_url(data.hits[0].webformatURL);
      } else {
        alert("No images found. Please try a different search term.");
        setImage_url(default_image);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      alert("An error occurred while fetching the image. Please try again.");
    }
  };

  return (
    <div>
      <div className="header">
        <h3>Image Generator</h3>
        <button
          onClick={async () => {
            if (image_url !== default_image) {
              try {
                const response = await fetch(image_url);
                if (!response.ok) {
                  throw new Error("Failed to fetch image for download");
                }
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "generated_image.jpg";
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
              } catch (error) {
                console.error("Error downloading image:", error);
                alert(
                  "An error occurred while downloading the image. Please try again."
                );
              }
            } else {
              alert("No image to download!");
            }
          }}
        >
          Download
        </button>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url === "/" ? default_image : image_url} alt=""></img>
        </div>
        <div className="images">
          <img src={img} alt=""></img>
          <img src={ima} alt=""></img>
          <img src={imag} alt=""></img>
          <img src={image} alt=""></img>
          <img src={imaged} alt=""></img>
          <img src={imaget} alt=""></img>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          placeholder="describe what type of image you want"
          className="search-input"
        />
        <div
          className="generate-btn"
          onClick={() => {
            imageGenerator();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
};
export default Image;
