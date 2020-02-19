import * as actions from "./actions";

const initialState = {
  searchValue: "",
  photosURL: [],
  loading: false,
  modalPhoto: null,
  isLastPage: false
};

const reducer = (state = initialState, action) => {
  const inputHandler = (value) => ({
    ...state,
    searchValue: value,
    photosURL: value ? [...state.photosURL] : [],
    loading: value ? true : false
  });

  // add photos or append to the stack
  const addPhotos = (photos, isLastPage, newContent) => ({
    ...state,
    photosURL: newContent ? photos : [...state.photosURL, ...photos],
    loading: false,
    isLastPage
  });

  // put image to the Modal
  const enlargeImage = photo => ({
    ...state,
    modalPhoto: photo
  });

  switch(action.type) {
    case actions.input_change_handle: return inputHandler(action.value);
    case actions.add_photos_url: return addPhotos(action.photos, action.isLastPage, action.newContent);
    case actions.enlarge_image: return enlargeImage(action.photo);
    default: return state;
  }
};

export default reducer;