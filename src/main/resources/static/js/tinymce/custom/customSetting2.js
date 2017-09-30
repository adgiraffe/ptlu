/**
 * Created by joo on 2017. 7. 2..
 */
tinymce.init({
    selector: "#my_editor",
    branding: false,
    theme: "modern",
    language: "ko_KR",
    menubar:false,
    plugins: "autolink autosave code link media image table textcolor autoresize",
    toolbar: "undo redo | styleselect | forecolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table link media custom_image code ",
    // forced_root_block_attrs: {
    //     'class': 'myclass',
    //     'data-something': 'my data'
    // },
    protect: [
        /\<\/?(if|endif)\>/g,  // Protect <if> & </endif>
        /\<xsl\:[^>]+\>/g,  // Protect <xsl:...>
        /<\?php.*?\?>/g,  // Protect php code
        /$.ajax/g,
        /<=onclick+>/g,
    ],



    setup: function(editor) {
        // var inp = $('<input id="tinymce-uploader" type="file" name="pic" accept="image/*" style="display:none">');
        // $(editor.getElement()).parent().append(inp);

        editor.addButton('custom_image', {
            title: '이미지삽입',
            icon: 'image',
            onclick: function () {
                openExploer();
            }
        });

        // inp.on("change", function(e){
        //     uploadFile($(this), editor);
        // });

        // function uploadFile(inp, editor) {
        //     var input = inp.get(0);
        //     var data = new FormData();
        //     data.append('files', input.files[0]);
        //
        //     $.ajax({
        //         url: '${pageContext.request.contextPath}/a/images',
        //         type: 'POST',
        //         data: data,
        //         enctype: 'multipart/form-data',
        //         dataType : 'json',
        //         processData: false, // Don't process the files
        //         contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        //         success: function(data, textStatus, jqXHR) {
        //             editor.insertContent('<img class="content-img" src="${pageContext.request.contextPath}' + data.location + '" data-mce-src="${pageContext.request.contextPath}' + data.location + '" />');
        //         },
        //         error: function(jqXHR, textStatus, errorThrown) {
        //             if(jqXHR.responseText) {
        //                 errors = JSON.parse(jqXHR.responseText).errors
        //                 alert('Error uploading image: ' + errors.join(", ") + '. Make sure the file is an image and has extension jpg/jpeg/png.');
        //             }
        //         }
        //     });
        // }

        // opener.tinymce.activeEditor.execCommand("mceInsertContent",'false',이미지경로);

    }
});

