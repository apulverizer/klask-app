/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
      short_name: "Klask",
      name: "Klask (an Esri Apps production)",
      icons: [
        {
          src: "/assets/images/launcher-icon-1x.png",
          type: "image/png",
          sizes: "48x48"
        },
        {
          src: "/assets/images/launcher-icon-2x.png",
          type: "image/png",
          sizes: "96x96"
        },
        {
          src: "/assets/images/launcher-icon-3x.png",
          type: "image/png",
          sizes: "144x144"
        },
        {
          src: "/assets/images/launcher-icon-4x.png",
          type: "image/png",
          sizes: "512x512"
        }
      ],
      start_url: "/",
      background_color: "#7D34C4",
      theme_color: "#212121",
      display: "standalone",
      orientation: "portrait"
  };
}
