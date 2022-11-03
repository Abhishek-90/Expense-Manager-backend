export const customCookieParser = (cookie:string|undefined):any => {
  const cookieArray = cookie?.split(";");
  let cookieObject = {};
  cookieArray?.forEach(cookie => {
    const key = cookie.split("=")[0];
    const value = cookie.split("=")[1];
    cookieObject = {...cookieObject, [key]:value};
  })

  return cookieObject;
}