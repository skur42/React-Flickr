import React from "react";
import './styles/Modal.css'

const Modal = (props) => (
  <div className="full_image">
    <div className="full_image_cover"
      onClick={props.collapsePhoto}></div>
    <div className="image_wrapper">
      <img src={props.photo.url} alt={props.photo.title} />
      <p>{props.photo.title}</p>
    </div>
  </div>
);

export default Modal;