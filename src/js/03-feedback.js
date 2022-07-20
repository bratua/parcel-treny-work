import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
let userData = {};
const STORAGE_USER_DATA_KEY = 'feedback-form-state';

document.addEventListener('load', onLoad());
feedbackForm.addEventListener('input', throttle(onInput, 500));
feedbackForm.addEventListener('submit', onSubmit);

console.log('now in storage', localStorage.getItem(STORAGE_USER_DATA_KEY));

function onInput(e) {
  createUserDataField(e);
  saveLocalData(userData);
}

function onLoad() {
  // console.log('Load page - OK');
  const loadedData = loadLocalData();
  if (loadedData) {
    feedbackForm.email.value = loadedData.email;
    feedbackForm.message.value = loadedData.message;
    userData.email = loadedData.email;
    userData.message = loadedData.message;
    console.log('user data ', userData);
  }

  // console.log('on load', feedbackForm.email);
}

function createUserDataField(e) {
  userData[e.target.name] = e.target.value;
  // console.log('user data ', userData);
}

function saveLocalData(data) {
  localStorage.setItem(STORAGE_USER_DATA_KEY, JSON.stringify(data));
  console.log('in storage: ', localStorage.getItem(STORAGE_USER_DATA_KEY));
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
  userData = {};
  console.log('Loaded user data :', loadedData);
}
