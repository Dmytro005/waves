//https://www.codexpedia.com/javascript/javascript-create-read-and-delete-cookies/

/**
 * Delete a cookie
 * @param {String} cname, cookie name
 */
export const deleteCookie = cname => {
  const d = new Date(); //Create an date object
  d.setTime(d.getTime() - 1000 * 60 * 60 * 24); //Set the time to the past. 1000 milliseonds = 1 second
  const expires = 'expires=' + d.toGMTString(); //Compose the expirartion date
  window.document.cookie = cname + '=' + '; ' + expires; //Set the cookie with name and the expiration date
};
