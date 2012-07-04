/*!
 * Background Stretch v0.1
 * www.needmorecaffeine.com
 *
 * Copyright (c) Need More caffeine
 * Available under the BSD and MIT licenses: www.needmorecafeine.com/license/
 */

/*
 * Author         Cristian Ferrari
 * Contributors   Abraham Barrera, Miguel Michelson
 */

function setBackgroundStretch(target) {

  var _target = $(target);
  if (_target) {

    _target.each(function(i,e) {
      // Targets variables
      var target = $(e),
          image = new Image(),
          imageBg = target.css('background-image');
          //imageBg = imageaBg.replace(/[\url(\)\.\-\s,]/g, '');
          imageBg = imageBg.replace('url(', '').replace(')', '');
          image.src = imageBg;

      var reloadSizeImage = function (target, image) {
        // Container variables
        var containerHeight = target.height(),
            containerWidth = target.width(),
            containerRatio = containerHeight / containerWidth,
            containerOrientation;

        // Image variables
        var imageHeight = image.height,
            imageWidth = image.width,
            imageRatio = imageHeight / imageWidth,
            imageOrientation;

        // Format variables
        var ratio = 1,
            moreHeight = (containerRatio > imageRatio)? 'container' : 'image',
            moreWidth = (containerRatio < imageRatio)? 'container' : 'image';

        // CSS variables
        var adjustHeight = {'background-size' : 'auto 100%'},
            adjustWidth = {'background-size' : '100% auto'},
            adjustAll = {'background-size' : '100% 100%'};

        // Container Orientation
        if (containerRatio == ratio) {
          containerOrientation = 'square'
        } else if (containerRatio > ratio) {
          containerOrientation = 'portrait'
        } else {
          containerOrientation = 'landscape'
        }

        // Image Orientation
        if (imageRatio == ratio) {
          imageOrientation = 'square'
        } else if (imageRatio > ratio) {
          imageOrientation = 'portrait'
        } else {
          imageOrientation = 'landscape'
        }

        // Set background size
        if(containerOrientation == 'square') {
        // Si el contenedor es cuadrado
          if (imageOrientation == 'square') {
            target.css(adjustAll);
          } else if (imageOrientation == 'portrait') {
            target.css(adjustWidth);
          } else {
            target.css(adjustHeight);
          }
        } else if (containerOrientation == 'portrait') {
        // Si el contenedor es vertical
          if (imageOrientation == 'square') {
            target.css(adjustHeight);
          } else if (imageOrientation == 'landscape') {
            target.css(adjustHeight);
          } else {
            if (moreHeight == 'container') {
            // Si el contenedor es mas vertical que la imagen
              target.css(adjustHeight);
            } else {
            // Si el contenedor es menos vertical que la imagen
              target.css(adjustWidth);
            }
          }
        } else {
        // Si el contenedor es horizontal
          if (imageOrientation == 'square') {
            target.css(adjustWidth);
          } else if (imageOrientation == 'portrait') {
            target.css(adjustWidth);
          } else {
            if(moreWidth == 'container') {
            // Si el contenedor es mas horizontal que la imagen
              target.css(adjustWidth);
            } else {
            // Si el contenedor es menos horizontal que la imagen
              target.css(adjustHeight);
            }
          }
        }

        if(containerRatio == imageRatio) {
        // Si ambos tienen el mismo ratio
          target.css(adjustAll);
        }
      }; // reloadSizeImage

      image.onload = function(){
        reloadSizeImage(target, image);
      };
      /*
      image.onabort = function(){
        el.prev('.loading-' + el.attr('data-loading')).removeClass('spin').remove();
      };
      */
    });
  }
}

