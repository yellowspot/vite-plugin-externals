import 'blueimp-file-upload/js/jquery.fileupload';
import 'blueimp-file-upload/js/jquery.fileupload-validate';

$('#app').html(`
  <div>
    <h1>Hello to this demo app!</h1>
    <div class="card">
      <input type="file" name="upload" id="upload" style="display: none;" placeholder="Click me. You should see a file picker" />
    </div>
  </div>
`);


try {
  // This proves that blueimp-file-upload used the global jQuery instance
  $('#upload').fileupload({
    fail: (e, data) => {
      const file = data.data.get('upload');

      const reader = new FileReader();

      reader.addEventListener("load", function () {
        var image = new Image();
        image.height = 100;
        image.title = file.name;
        image.src = this.result;
        $('#app').append(image);
      }, false);

      reader.readAsDataURL(file);
    }
  });
  $('#upload').show();
} catch (e) {
  $('#app').append(`<p>Sorry, we have issue. blueimp used a different instance of jQuery</p>`);
}
