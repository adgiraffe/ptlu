tinymce.init({
    selector: '#my_editor',  // change this value according to your HTML
    branding: false,
    theme:'modern',
    menubar:false,
    plugins: "autolink autosave code link media image table textcolor autoresize",
    // image_title: true,
    toorbar: 'undo redo | styleselect | forecolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table link media custom_image code ',
    // setup: function(editor) {
    //     editor.addButton('custom_image', {
    //         title: '이미지삽입',
    //         icon: 'image',
    //         onclick: function() {
    //             window.open("POPUP_URL","tinymcePop","width=400,height=350");
    //         }
    //     });
    // },
    paste_data_images:true,
    images_upload_url: 'fileUploadT',
    images_upload_base_path:'../../images',
    file_picker_types: 'image',
    // file_browser_callback_types: 'file image media',
    // file_browser_callback:'myFileBrowser'



    // file_picker_callback: function (callback, value, meta) {
    //
    //     if (meta.filetype=='image'){
    //         var input = document.createElement('input');
    //         input.setAttribute('type', 'file');
    //         input.setAttribute('accept', 'image/*');
    //
    //         // Note: In modern browsers input[type="file"] is functional without
    //         // even adding it to the DOM, but that might not be the case in some older
    //         // or quirky browsers like IE, so you might want to add it to the DOM
    //         // just in case, and visually hide it. And do not forget do remove it
    //         // once you do not need it anymore.
    //
    //         input.onchange = function() {
    //             var file = input.files[0];
    //
    //             var reader = new FileReader();
    //             reader.readAsDataURL(file);
    //             reader.onload = function () {
    //                 // Note: Now we need to register the blob in TinyMCEs image blob
    //                 // registry. In the next release this part hopefully won't be
    //                 // necessary, as we are looking to handle it internally.
    //                 var id = 'blobid' + (new Date()).getTime();
    //                 var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
    //                 var base64 = reader.result.split(',')[1];
    //                 var blobInfo = blobCache.create(id, file, base64);
    //                 blobCache.add(blobInfo);
    //
    //                 // call the callback and populate the Title field with the file name
    //
    //                 callback(blobInfo.blobUri(), {
    //                     title: file.name });
    //             };
    //         };
    //         input.click();
    //     }
    //
    //
    //     if (meta.filetype == 'file') {
    //         callback('mypage.html', {text: 'My text'});
    //     }
    //
    //     // Provide image and alt text for the image dialog
    //     if (meta.filetype == 'image') {
    //         callback('myimage.jpg', {alt: 'My alt text'});
    //     }
    //
    //     // Provide alternative source and posted for the media dialog
    //     if (meta.filetype == 'media') {
    //         callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
    //     }
    // },

});


// function myFileBrowser (field_name, url, type, win) {
//
//     alert("Field_Name: " + field_name + "nURL: " + url + "nType: " + type + "nWin: " + win);
//     // debug/testing
//
//     /* If you work with sessions in PHP and your client doesn't accept cookies you might need to carry
//      the session name and session ID in the request string (can look like this: "?PHPSESSID=88p0n70s9dsknra96qhuk6etm5").
//      These lines of code extract the necessary parameters and add them back to the filebrowser URL again. */
//
//     var cmsURL = window.location.toString();    // script URL - use an absolute path!
//     if (cmsURL.indexOf("?") < 0) {
//         //add the type as the only query parameter
//         cmsURL = cmsURL + "?type=" + type;
//     }
//     else {
//         //add the type as an additional query parameter
//         // (PHP session ID is now included if there is one at all)
//         cmsURL = cmsURL + "&type=" + type;
//     }
//
//     tinyMCE.activeEditor.windowManager.open({
//         file : cmsURL,
//         title : 'My File Browser',
//         width : 420,  // Your dimensions may differ - toy around with them!
//         height : 400,
//         resizable : "yes",
//         inline : "yes",  // This parameter only has an effect if you use the inlinepopups plugin!
//         close_previous : "no"
//     }, {
//         window : win,
//         input : field_name
//     });
//     return false;
// }
//
//
//
// tinymce.activeEditor.uploadImages(function(success) {
//     $.post('ajax/upLoadContents', tinymce.activeEditor.getContent()).done(function() {
//         console.log("Uploaded images and posted content as an ajax request.");
//     });
// });
