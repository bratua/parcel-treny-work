import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const userData = {};
const STORAGE_USER_DATA_KEY = 'feedback-form-state';

document.addEventListener('load', onLoad());
feedbackForm.addEventListener('input', throttle(onInput, 500));
feedbackForm.addEventListener('submit', onSubmit);

// console.log(localStorage.getItem(STORAGE_USER_DATA_KEY));

function onInput(e) {
  createUserDataField(e);
  saveLocalData(userData);
  //   console.log(e.currentTarget);

  //   const {
  //     elements: { email, message },
  //   } = e.currentTarget;

  //   userData[e.target.name] = e.target.value;

  //   console.log(userData);

  //   localStorage.setItem(STORAGE_USER_DATA_KEY, JSON.stringify(userData));

  //   console.log(localStorage.getItem(STORAGE_USER_DATA_KEY));
}

function onLoad() {
  console.log('Load page - OK');
  const loadedData = loadLocalData();
  if (!loadedData) {
    console.log('No data in local storage in KEY - ', STORAGE_USER_DATA_KEY);
    return;
  }
  feedbackForm.email.value = loadedData.email;
  feedbackForm.message.value = loadedData.message;
  console.log('on load', feedbackForm.email);
}

function createUserDataField(e) {
  userData[e.target.name] = e.target.value;
}

function saveLocalData(data) {
  localStorage.setItem(STORAGE_USER_DATA_KEY, JSON.stringify(data));
}

function loadLocalData() {
  try {
    const loadedData = JSON.parse(localStorage.getItem(STORAGE_USER_DATA_KEY));
    return loadedData;
  } catch (error) {
    console.log(error.message);
  }
}

function onSubmit(e) {
  e.preventDefault();
  const loadedData = loadLocalData();
  localStorage.clear();
  feedbackForm.reset();
  console.log('Loaded user data :', loadedData);
}
