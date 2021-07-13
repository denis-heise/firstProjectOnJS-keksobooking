const FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];
const WIDTH = 70;
const HEIGHT = 70;
const ALT = 'Фотография жилья';
const fileChooserAvatarNode = document.querySelector('.ad-form__field input[type=file]');
const previewAvatarNode = document.querySelector('.ad-form-header__preview img');
const fileChooserPhotosNode = document.querySelector('.ad-form__upload input[type=file]');
const previewPhotosNode = document.querySelector('.ad-form__photo');
const containerNode = document.querySelector('.ad-form__photo-container');

fileChooserAvatarNode.addEventListener('change', () => {
  const file = fileChooserAvatarNode.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      previewAvatarNode.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

fileChooserPhotosNode.addEventListener('change', () => {
  const file = fileChooserPhotosNode.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    previewPhotosNode.remove();
    reader.addEventListener('load', () => {
      const blockNode = document.createElement('div');
      blockNode.classList.add('ad-form__photo');
      function getPhotos () {
        containerNode.appendChild(blockNode);
        const propertyPhotosNode = document.createElement('img');
        function setAttributes (el, options) {
          Object.keys(options).forEach((attr) => {
            el.setAttribute(attr, options[attr]);
          });
        }
        setAttributes(propertyPhotosNode, {'src': reader.result, 'width': WIDTH, 'height': HEIGHT, 'alt': ALT});
        blockNode.appendChild(propertyPhotosNode);
      }
      getPhotos();
    });
    reader.readAsDataURL(file);
  }
});
