tinymce.init({
    selector: 'div#contentTitle',
    inline: true,
    theme:'inlite',
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste'
    ],
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',

    selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
    paste_data_images: true,
    content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',]
});