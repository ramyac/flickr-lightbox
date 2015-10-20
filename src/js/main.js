var FlickrLightbox = {
  photoList: [],
  index: 0,
    init: function() {
      FlickrLightbox.fetchPhotos();

      document.getElementById('lightbox-prev-btn')
        .addEventListener('click', function handlePrevClick() {
          FlickrLightbox.prev();
        });

      document.getElementById('lightbox-next-btn')
        .addEventListener('click', function handleNextClick() {
          FlickrLightbox.next();
        });

      document.onkeydown = function lightboxKeydown(event) {
        event = event || window.event;
        var code = event.keyCode || event.charCode;

        switch(code) {
        case 37: case 38:
          FlickrLightbox.prev();
          break;
        case 39: case 40:
          FlickrLightbox.next();
          break;
        }

        if (code >= 37 && code <= 40) {
          event.preventDefault();
        }
      };
    },

    prev: function() {
      if (FlickrLightbox.index === 0) {
        FlickrLightbox.index = 9;
      } else {
        FlickrLightbox.index--;
      }
      FlickrLightbox.insertPhotosintoDOM();
    },

    next: function() {
      if (FlickrLightbox.index === 9) {
        FlickrLightbox.index = 0;
      } else {
        FlickrLightbox.index++;
      }
      FlickrLightbox.insertPhotosintoDOM();
    },

    fetchPhotos: function() {
      var getUrl = 'https://secure.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=afc10df252985efc637c5387181032e9&tags=eiger&content_type=1&nojsoncallback=1&per_page=10';

      fetch(getUrl, {
        method: 'get'
      }).then(function(response) {
        return response.json()
      }).then(function(data){
        FlickrLightbox.buildPhotoUrls(data);
      })
    },

    buildPhotoUrls: function(flickrPhotos) {
      var photoArr = flickrPhotos.photos.photo;
      Array.prototype.forEach.call(photoArr, function(photo, i){
        photo.url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_z.jpg';
      });
      FlickrLightbox.photoList = photoArr;
      console.log(FlickrLightbox.photoList);
      FlickrLightbox.insertPhotosintoDOM();
    },

    insertPhotosintoDOM: function() {
      var imgTag = document.getElementById('image');
      var imgTitleTag = document.getElementById('imageTitle');
      var imgToInsert = FlickrLightbox.photoList[FlickrLightbox.index];
      imgTag.src = imgToInsert.url;
      imgTitleTag.innerHTML = imgToInsert.title;
    }
};

window.onload = function() {
  FlickrLightbox.init();
}
