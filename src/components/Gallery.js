import React from "react";
import Loader from "./Loader";
import "./styles/Gallery.css";

const Gallery = (props) => {
  let photos = null;

  // Images to be diplayed to the user
  if(props.photosURL.length > 0) {
    photos = props.photosURL.map((photo, index) => (
      <li key={`${photo.id}-${index}`}>
        <img src={photo.url}
          alt={photo.title}
          onClick={props.enlargeImage.bind(null, photo)}/>
      </li>
    ))
  };
  
  // if there is anything to search for AND there is some result/images for the same
  if(props.searchValue && photos) {
    return (
      <div className="photos">
        <ul className="all_photos">{photos}</ul>
        <div className="loader-wrapper" id="loader-wrapper">
          {!props.isLastPage ? <Loader/> : <p>End of results</p>}
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="nil-search">
        Let's search some images...
      </div>
    );
  }
};

export default Gallery;