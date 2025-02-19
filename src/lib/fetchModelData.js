import Promise from "promise";
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "../constraint";

function fetchModel(url) {
  return new Promise(function(resolve, reject) {
      console.log("Fetching data from: ", url);
      // Load via AJAX
      const request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        // a function to be executed whenever the readyState changes.
        if (this.readyState===4 && this.status===200) {
          // On Success return:
          resolve({ data: JSON.parse(this.responseText) });
        } 
        // On Error return:
        this.onerror = () => {
          console.log("fdsfsd");
          reject(new Error({ status: this.status, statusText: this.statusText }))
        };
      };       
      // Send request to server, the path is url variable
      request.open("GET", `${API_URL}${url}`, true); 
      if (localStorage[LOCAL_STORAGE_TOKEN_NAME])
        request.setRequestHeader("Authorization", `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`);
      // Start the request sending 
      request.send();
  });
}

export default {fetchModel}

// (function() {

//   /**
//   * FetchModel - Fetch a model from the web server.
//   *     url - string - The URL to issue the GET request.
//   * 
//   * 
//   * Returns: a Promise that should be filled
//   * with the response of the GET request parsed
//   * as a JSON object and returned in the property
//   * named "data" of an object.
//   * 
//   * 
//   * If the requests has an error the promise should be
//   * rejected with an object contain the properties:
//   *    status:  The HTTP response status
//   *    statusText:  The statusText from the xhr request
//   */
  


//   /**
//    * For accessing model
//    *  */ 
//   var server = {
//     fetchModel: fetchModel
//   };


//   /**
//    * For export
//    *  */ 
//   if( typeof exports !== 'undefined' ) {
//     // We're being loaded by the Node.js module loader ('require') so we use its
//     // conventions of returning the object in exports.
//     exports.server = server;
//   } else {
//     // We're not in the Note.js module loader so we assume we're being loaded
//     // by the browser into the DOM.
//     window.server = server;
//   }

// }());