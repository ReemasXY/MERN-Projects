const host = import.meta.env.VITE_HOST;
export const sockethost = import.meta.env.VITE_SOCKET_HOST;
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allUsers`;
export const sendMsgRoute = `${host}/api/messages/addmsg`;
export const getAllMsgRoute = `${host}/api/messages/getallmsg`;
