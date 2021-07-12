const FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];
const WIDTH = 70;
const HEIGHT = 70;
const ALT = 'Фотография жилья';
const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');

const fileChooserPhotos = document.querySelector('.ad-form__upload input[type=file]');
const previewPhotos = document.querySelector('.ad-form__photo');

const container = document.querySelector('.ad-form__photo-container');

fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

fileChooserPhotos.addEventListener('change', () => {
  const file = fileChooserPhotos.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    previewPhotos.remove();
    reader.addEventListener('load', () => {
      const imgBlock = document.createElement('div');
      imgBlock.classList.add('ad-form__photo');
      function getImg () {
        container.appendChild(imgBlock);
        const img = document.createElement('img');
        function setAttributes (el, options) {
          Object.keys(options).forEach((attr) => {
            el.setAttribute(attr, options[attr]);
          });
        }
        setAttributes(img, {'src': reader.result, 'width': WIDTH, 'height': HEIGHT, 'alt': ALT});
        imgBlock.appendChild(img);
      }
      getImg();
    });
    reader.readAsDataURL(file);
  }
});
