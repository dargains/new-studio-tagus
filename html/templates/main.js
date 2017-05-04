var main = document.getElementById("main");
var btn = document.getElementById("btn");
var imageContainer = document.getElementById("image-container");
var images = document.querySelectorAll(".image");

images.forEach(function(value) {
  value.addEventListener("click", function() {
    images.forEach(function(value) {
      value.style.opacity = .5;
    });
    var image = this.style.backgroundImage;
    main.style.backgroundImage = image;
    this.style.opacity = 1;
  })
});

btn.addEventListener("click", function () {
  $(".loading").show();
  html2canvas(main, {
    allowTaint: true,
    taintTest: false,
    onrendered: function(canvas) {
      $(".loading").hide();
      window.open(canvas.toDataURL("image/png"));
    },
  })
});


$(imageContainer).flickity({
  cellAlign: 'left',
  contain: true,
  freeScroll: true,
  prevNextButtons: false,
  pageDots: false
});

$("#draggable").draggable();
