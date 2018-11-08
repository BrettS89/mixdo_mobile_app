import { AsyncStorage } from 'react-native';
import Expo from 'expo';
import axios from 'axios';
import { URI } from '../config';

async function getToken() {
  let config = {
    headers: {
      authorization: await AsyncStorage.getItem('token'),
      deviceName: Expo.Constants.deviceName,
    }
  };

  if(!config.headers.authorization) {
    throw 'error';
  }

  return config;
}

//Test connection to server
export async function apiTest() {
  try {
    const config = await getToken();
    const { data } = await axios.get(`${URI}/connection`, config);
    await AsyncStorage.setItem('_id', data._id);
  }
  catch(e) {
    console.log(e);
    throw(e);
  }
}

//Signup
export async function userSignup(body) {
  try {
    const { data } = await axios.post(`${URI}/auth/signup`, body);
    await AsyncStorage.setItem('_id', data._id);
    return data;
  }
  catch(e) {
    console.log(e);
    return 'Error'
  }
}

//Save push token
export async function apiSavePushToken(body) {
  try {
    const config = await getToken();
    const { data } = await axios.post(`${URI}/users/pushtoken`, body, config);
    return data.res;
  }
  catch(e) {
    throw new Error('error!!!');
  }
}

//Login
export async function userLogin(body) {
  try {
    const { data } = await axios.post(`${URI}/auth/login`, body);
    await AsyncStorage.setItem('_id', data._id);
    return data;
  }
  catch(e) {
    return 'Got an error';
  }
}

//Facebook login/signup
export async function apiFacebookAuth(body) {
  try {
    const { data } = await axios.post(`${URI}/auth/facebook`, body);
    return data;
  }
  catch(e) {
    return 'error';
  }
}

//Add todo
export async function addTodoItem(body) {
  try {
    const config = await getToken();
    const { data } = await axios.post(`${URI}/todos/add`, body, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'Got an error'
  }
}

//Delete todo
export async function apiDeleteTodo(body) {
  try {
    const config = await getToken();
    const { data } = await axios.post(`${URI}/todos/delete`, body, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

//Get my todos
export async function getOnePersonTodos() {
  try {
    const config = await getToken();


  //   const data = await fetch(`${URI}/todos/user`, {
  //     method: "GET",
  //     headers: config,
  // });
  // console.log(data);

    const { data } = await axios.get(`${URI}/todos/user`, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error'
  }
}

//Get Todos
export async function todos() {
  try {
    const config = await getToken();
    const { data } = await axios.get(`${URI}/todos/get`, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

//Inifity scroll
export async function apiGetInifityTodos(body) {
  try {
    const config = await getToken();
    const { data } = await axios.post(`${URI}/todos/infinity`, body, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

//Find Friends
export async function apiFindFriends() {
  try {
    const config = await getToken();
    const { data } = await axios.get(`${URI}/users/find`, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

export async function apiFindFriendsInfinite(body) {
  try {
    const config = await getToken();
    const { data } = await axios.get(`${URI}/users/find/${body.date}`, config);
    return data.res;
  }
  catch(e) {
    console.log(e);
    return 'error';
  }
}

//Get Followers
export async function apiGetFollowers(type) {
  try {
    const config = await getToken();
    const { data } = await axios.get(`${URI}/users/getFollowers/${type}`, config);
    return data;
  }
  catch(e) {
    return 'error';
  }
}

//Get Following
export async function apiGetFollowing() {
  try {
    const config = await getToken();
    const { data } = await axios.get(`${URI}/users/getFollowing`, config);
    return data;
  }
  catch(e) {
    return 'error'
  }
}

//Follow a User 
export async function apiFollowUser(body) {
  try {
    const config = await getToken();
    const { data } = await axios.post(`${URI}/users/followUser`, body, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

//Unfollow a User 
export async function apiUnFollowUser(body) {
  try {
    const config = await getToken();
    const { data } = await axios.post(`${URI}/users/unfollowUser`, body, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

//Get Notifications
export async function apiGetNotifications() {
  try {
    const config = await getToken();
    const { data } = await axios.get(`${URI}/notifications/get`, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

//Discover Todos
export async function apiDiscoverTodos() {
  try {
    const config = await getToken();
    const { data } = await axios.get(`${URI}/todos/discover`, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

//Get Infinity Discover
export async function apiGetInfinityDiscover(body) {
  try {
    const config = await getToken();
    const { data } = await axios.post(`${URI}/todos/infinitidiscover`, body, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

//Get Profile
export async function apiGetMyProfile() {
  try {
    const config = await getToken();
    const { data } = await axios.get(`${URI}/users/myProfile`, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

//Get a Profile 
export async function apiGetUserProfile(id) {
  try {
    const config = await getToken();
    const { data } = await axios.get(`${URI}/users/getProfile/${id}`, config);
    await AsyncStorage.setItem('token', data.token);
    return data;
  }
  catch(e) {
    return 'error';
  }
}

//Search for users
export async function apiSearchUser(name) {
  try {
    const config = await getToken();
    const { data } = await axios.get(`${URI}/users/search/${name}`, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

//Search Todos
export async function apiSearchTodos(search) {
  try {
    const config = await getToken();
    const { data } = await axios.get(`${URI}/todos/search/${search}`, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

//Like a todo
export async function apiLikeTodo(body) {
  try {
    const config = await getToken();
    const { data } = await axios.post(`${URI}/todos/like`, body, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

//Add a user's todo
export async function apiAddUserTodo(body) {
  try {
    const config = await getToken();
    const { data } = await axios.post(`${URI}/todos/addusertodo`, body, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

//Finish a todo
export async function apiFinishTodo(todo) {
  try {
    const config = await getToken();
    const { data } = await axios.post(`${URI}/todos/finish`, todo, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

//Flag a todo
export async function apiFlagTodo(body) {
  try {
    const config = await getToken();
    const { data } = await axios.post(`${URI}/todos/flag`, body, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

//Get user history
export async function apiGetUserHistory() {
  try {
    const config = await getToken();
    const { data } = await axios.get(`${URI}/todos/userhistory`, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

//Upload image
export async function apiGetAwsUrl(type) {
  try {
    const config = await getToken();
    const { data } = await axios.get(`${URI}/upload/awsimage/${type}`, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    return 'error';
  }
}

//Upload profile photo
export async function apiUploadProfilePhoto(body) {
  try {
    const config = await getToken();
    const { data } = await axios.post(`${URI}/users/profilephoto`, body, config);
    return data;
  }
  catch(e) {
    return 'error';
  }
}

export async function apiDeleteUserAndTodos() {
  try {
    const config = await getToken();
    const { data } = await axios.delete(`${URI}/users/delete`, config);
    await AsyncStorage.setItem('token', data.token);
    return data.res;
  }
  catch(e) {
    console.log(e);
    return 'error';
  }
}




//================================================================



// import { AsyncStorage } from 'react-native';
// import Expo from 'expo';
// import axios from 'axios';
// import { URI } from '../config';

// async function getToken() {
//   let config = {
//     headers: {
//       authorization: await AsyncStorage.getItem('token'),
//       deviceName: Expo.Constants.deviceName,
//     }
//   };

//   if(!config.headers.authorization) {
//     throw 'error';
//   }

//   return config;
// }

// //Test connection to server
// export async function apiTest() {
//   try {
//     const config = await getToken();
//     const { data } = await axios.get(`${URI}/connection`, config);
//     await AsyncStorage.setItem('_id', data._id);
//   }
//   catch(e) {
//     console.log(e);
//     throw(e);
//   }
// }

// //Signup
// export async function userSignup(body) {
//   try {
//     const { data } = await axios.post(`${URI}/auth/signup`, body);
//     await AsyncStorage.setItem('_id', data._id);
//     return data;
//   }
//   catch(e) {
//     console.log(e);
//     return 'Error'
//   }
// }

// //Save push token
// export async function apiSavePushToken(body) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.post(`${URI}/users/pushtoken`, body, config);
//     return data.res;
//   }
//   catch(e) {
//     throw new Error('error!!!');
//   }
// }

// //Login
// export async function userLogin(body) {
//   try {
//     const { data } = await axios.post(`${URI}/auth/login`, body);
//     await AsyncStorage.setItem('_id', data._id);
//     return data;
//   }
//   catch(e) {
//     return 'Got an error';
//   }
// }

// //Facebook login/signup
// export async function apiFacebookAuth(body) {
//   try {
//     const { data } = await axios.post(`${URI}/auth/facebook`, body);
//     return data;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Add todo
// export async function addTodoItem(body) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.post(`${URI}/todos/add`, body, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'Got an error'
//   }
// }

// //Delete todo
// export async function apiDeleteTodo(body) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.post(`${URI}/todos/delete`, body, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Get my todos
// export async function getOnePersonTodos() {
//   try {
//     const config = await getToken();

//     const data = await fetch(`${URI}/todos/user`, {
//       method: "GET",
//       headers: config,
//   })

//     // const { data } = await axios.get(`${URI}/todos/user`, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error'
//   }
// }

// //Get Todos
// export async function todos() {
//   try {
//     const config = await getToken();
//     const { data } = await axios.get(`${URI}/todos/get`, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Inifity scroll
// export async function apiGetInifityTodos(body) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.post(`${URI}/todos/infinity`, body, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Find Friends
// export async function apiFindFriends() {
//   try {
//     const config = await getToken();
//     const { data } = await axios.get(`${URI}/users/find`, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// export async function apiFindFriendsInfinite(body) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.get(`${URI}/users/find/${body.date}`, config);
//     return data.res;
//   }
//   catch(e) {
//     console.log(e);
//     return 'error';
//   }
// }

// //Get Followers
// export async function apiGetFollowers(type) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.get(`${URI}/users/getFollowers/${type}`, config);
//     return data;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Get Following
// export async function apiGetFollowing() {
//   try {
//     const config = await getToken();
//     const { data } = await axios.get(`${URI}/users/getFollowing`, config);
//     return data;
//   }
//   catch(e) {
//     return 'error'
//   }
// }

// //Follow a User 
// export async function apiFollowUser(body) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.post(`${URI}/users/followUser`, body, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Unfollow a User 
// export async function apiUnFollowUser(body) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.post(`${URI}/users/unfollowUser`, body, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Get Notifications
// export async function apiGetNotifications() {
//   try {
//     const config = await getToken();
//     const { data } = await axios.get(`${URI}/notifications/get`, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Discover Todos
// export async function apiDiscoverTodos() {
//   try {
//     const config = await getToken();
//     const { data } = await axios.get(`${URI}/todos/discover`, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Get Infinity Discover
// export async function apiGetInfinityDiscover(body) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.post(`${URI}/todos/infinitidiscover`, body, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Get Profile
// export async function apiGetMyProfile() {
//   try {
//     const config = await getToken();
//     const { data } = await axios.get(`${URI}/users/myProfile`, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Get a Profile 
// export async function apiGetUserProfile(id) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.get(`${URI}/users/getProfile/${id}`, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Search for users
// export async function apiSearchUser(name) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.get(`${URI}/users/search/${name}`, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Search Todos
// export async function apiSearchTodos(search) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.get(`${URI}/todos/search/${search}`, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Like a todo
// export async function apiLikeTodo(body) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.post(`${URI}/todos/like`, body, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Add a user's todo
// export async function apiAddUserTodo(body) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.post(`${URI}/todos/addusertodo`, body, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Finish a todo
// export async function apiFinishTodo(todo) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.post(`${URI}/todos/finish`, todo, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Flag a todo
// export async function apiFlagTodo(body) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.post(`${URI}/todos/flag`, body, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Get user history
// export async function apiGetUserHistory() {
//   try {
//     const config = await getToken();
//     const { data } = await axios.get(`${URI}/todos/userhistory`, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Upload image
// export async function apiGetAwsUrl(type) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.get(`${URI}/upload/awsimage/${type}`, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// //Upload profile photo
// export async function apiUploadProfilePhoto(body) {
//   try {
//     const config = await getToken();
//     const { data } = await axios.post(`${URI}/users/profilephoto`, body, config);
//     return data;
//   }
//   catch(e) {
//     return 'error';
//   }
// }

// export async function apiDeleteUserAndTodos() {
//   try {
//     const config = await getToken();
//     const { data } = await axios.delete(`${URI}/users/delete`, config);
//     await AsyncStorage.setItem('token', data.token);
//     return data.res;
//   }
//   catch(e) {
//     console.log(e);
//     return 'error';
//   }
// }