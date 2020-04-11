// // @flow
// import { GOOGLE_SIGNIN_FAILURE, GOOGLE_SIGNIN } from "../types/thunks";

// export function fetchGoogleSignin() {
//   const userInfo = googleSignIn;

//   if (userInfo == null) {
//     return {
//       type: GOOGLE_SIGNIN_FAILURE,
//     };
//   }

//   return {
//     payload: userInfo,
//     type: GOOGLE_SIGNIN,
//   };
// }

// // Private functions

// const googleSignIn = async () => {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     return userInfo;
//   } catch (error) {
//     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//       // user cancelled the login flow
//     } else if (error.code === statusCodes.IN_PROGRESS) {
//       // operation (e.g. sign in) is in progress already
//     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//       // play services not available or outdated
//     } else {
//       // some other error happened
//     }
//   }
// };
