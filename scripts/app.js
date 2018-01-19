// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


(function() {
  'use strict';
  var app = {
    isLoading: true,
    spinner: document.querySelector('.loader'),
    container: document.querySelector('.main'),
    gamesList: document.querySelectorAll('.games_list li:not(:first-child)')
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/
  
  // Check if pointer events are supported.
  if (window.PointerEvent) {
    // Add Pointer Event Listener
    console.log("pointer events supported");
    // for (var i = 0; i < app.gamesList.length; i++) {
    //   app.gamesList[i].addEventListener('pointerdown', this.handleGestureStart, true);
    //   app.gamesList[i].addEventListener('pointermove', this.handleGestureMove, true);
    //   app.gamesList[i].addEventListener('pointerup', this.handleGestureEnd, true);
    //   app.gamesList[i].addEventListener('pointercancel', this.handleGestureEnd, true);
    // }

    
  } else {
    // Add Touch Listener
    console.log("touch events supported");
    // app.gamesList[i].addEventListener('touchstart', this.handleGestureStart, true);
    // app.gamesList[i].addEventListener('touchmove', this.handleGestureMove, true);
    // app.gamesList[i].addEventListener('touchend', this.handleGestureEnd, true);
    // app.gamesList[i].addEventListener('touchcancel', this.handleGestureEnd, true);

    // Add Mouse Listener
    // app.gamesList[i].addEventListener('mousedown', this.handleGestureStart, true);
  }


  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

  if (app.isLoading) {
    app.spinner.setAttribute('hidden', true);
    app.container.removeAttribute('hidden');
    app.isLoading = false;
  }

  // Handle the start of gestures
  // this.handleGestureStart = function(evt) {
  //   evt.preventDefault();

  //   if(evt.touches && evt.touches.length > 1) {
  //     return;
  //   }

  //   // Add the move and end listeners
  //   if (window.PointerEvent) {
  //     evt.target.setPointerCapture(evt.pointerId);
  //   } else {
  //     // Add Mouse Listeners
  //     document.addEventListener('mousemove', this.handleGestureMove, true);
  //     document.addEventListener('mouseup', this.handleGestureEnd, true);
  //   }

  //   initialTouchPos = getGesturePointFromEvent(evt);

  //   swipeFrontElement.style.transition = 'initial';
  // }.bind(this);

  // // Handle end gestures
  // this.handleGestureEnd = function(evt) {
  //   evt.preventDefault();

  //   if(evt.touches && evt.touches.length > 0) {
  //     return;
  //   }

  //   rafPending = false;

  //   // Remove Event Listeners
  //   if (window.PointerEvent) {
  //     evt.target.releasePointerCapture(evt.pointerId);
  //   } else {
  //     // Remove Mouse Listeners
  //     document.removeEventListener('mousemove', this.handleGestureMove, true);
  //     document.removeEventListener('mouseup', this.handleGestureEnd, true);
  //   }

  //   updateSwipeRestPosition();

  //   initialTouchPos = null;
  // }.bind(this);


  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/


  // TODO add startup code here

  // TODO add service worker code here
  // register a service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

})();
