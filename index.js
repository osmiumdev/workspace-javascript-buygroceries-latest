// Import stylesheets
import "./style.css";

// Import javascript files
import {changeStyle} from "./js/add-element.js";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from "firebaseui";

//  Code for later database connection Please ignore.

// Add Firebase project configuration object here
const firebaseConfig = {

  apiKey: "AIzaSyB6APEzxWLgEPejdT2nfXfxdSCYPUc6I9k",

  authDomain: "groceries-11944.firebaseapp.com",

  projectId: "groceries-11944",

  storageBucket: "groceries-11944.appspot.com",

  messagingSenderId: "380766981048",

  appId: "1:380766981048:web:518ab0356d72e9a7629d4d"

};


firebase.initializeApp(firebaseConfig);

const collection = firebase.firestore().collection("mylist");

collection.get().then(snapshot => {

  snapshot.forEach(item => {

    $('#todo').append("<li class=\"" + item.data().class + "\">" + item.data().item + "</li>");

  })

}).then(function(){

  // bind click with the event handler
  $('li').click(changeStyle);
  console.log('here');

});

// Save the list to database
$("#save").click(function() {
// document.querySelectorAll('li') ==> nodelist
// for loop to go through each nodelist
// and then get the text content
  collection.get().then(snapshot => {

    snapshot.forEach(item => {
      item.ref.delete();
    })

  }).then(function(){


    $('li').each(function(){
      var value = $(this).text();
      var value2 = $(this).attr("class");
      console.log(value + " " + value2);
  
      firebase
      .firestore()
      .collection("mylist")
      .add({
        item: value,
        class: value2
      });
  
  
    })

  });


});
