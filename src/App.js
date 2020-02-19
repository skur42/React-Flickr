import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Navigation from "./components/Navigation";
import Loader from "./components/Loader";
import Gallery from "./components/Gallery";
import Modal from "./components/Modal";
import * as actions from "./store/actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.page = 1;
  }

  componentWillMount() {
    if(!localStorage.getItem('search-key'))
      localStorage.setItem('search-key', JSON.stringify([]));
  }

  componentDidMount() {
    //Event listener to scroll down the age
    window.addEventListener("scroll", () => {
      const loader = document.getElementById("loader-wrapper");
      if(loader) 
        loader.style.opacity = 0;

      const scrollThreshold = document.documentElement.scrollHeight - window.innerHeight - 1;
      
      if(!this.props.isLastPage && window.scrollY > scrollThreshold  && loader) {
        loader.style.opacity = 1;
        ++this.page;

        this.fetchPhotos(false, this.page);
      }
      else if(this.props.isLastPage && loader) {
        loader.style.opacity = 1;
      }
    });
  }

  onChangeInput(e) {
    this.props.inputHandler(e.target.value);
    this.fetchPhotos(true);
  }

  fetchPhotos(newContent, page = 1) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      axios.get('https://api.flickr.com/services/rest/', {
          params: {
            method: 'flickr.photos.search',
            api_key: 'ce31aca469c3c233d8d5025bf0d1238b',
            text: this.props.searchValue,
            per_page: 20,
            page: page,
            format: 'json'
          }
        }).then(res => {
          const { data } = res;
          // JS Object created from the JSON data recieved
          const jsonData = JSON.parse(("" + data).substring(14, ("" + data).length - 1));
          if(jsonData.stat === "ok") {
            this.handleStorage(newContent);

            // fetch the URL of the photos to be diplayed in UI
            const photoURLs = jsonData.photos.photo.map(photo => {
              const { farm, server, id, secret, title } = photo;
              return {
                id,
                title,
                url: `http://farm${farm}.staticflickr.com/${server}/${id}_${secret}_n.jpg`, 
              };
            });

            const isLastPage = jsonData.photos.page === jsonData.photos.pages;
            this.props.addPhotos(photoURLs, isLastPage, newContent);
          }
        }).catch(er => console.log(er));
    }, 500);
  }

  handleStorage(newContent) {
    if(newContent) {
      const localData = JSON.parse(localStorage.getItem('search-key'));
      if(localData.length === 10)
        localData.pop();
      const context = this.props.searchValue.toLowerCase().trim();
      if (!localData.includes(context)) {
        localData.unshift(context);
        localStorage.setItem('search-key', JSON.stringify(localData));
      }
    }
  }

  render() {
    const { modalPhoto, loading } = this.props;
    return (
      <div>
        <Navigation searchValue={this.props.searchValue} 
          onChangeInput={this.onChangeInput.bind(this)}/>

        { modalPhoto ? <Modal photo={modalPhoto}
          collapsePhoto={this.props.collapsePhoto}/> : null }

        { loading ? <Loader /> :
          <Gallery searchValue={this.props.searchValue}
            photosURL={this.props.photosURL}
            isLastPage={this.props.isLastPage}
            enlargeImage={this.props.enlargeImage}/> }
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  inputHandler: value => dispatch({ type: actions.input_change_handle, value }),
  addPhotos: (photos, isLastPage, newContent) => dispatch({ type: actions.add_photos_url, photos, isLastPage, newContent }),
  enlargeImage: photo => dispatch({ type: actions.enlarge_image, photo }),
  collapsePhoto: () => dispatch({type: actions.enlarge_image, photo: null })
})

export default connect(mapStateToProps, mapDispatchToProps)(App);