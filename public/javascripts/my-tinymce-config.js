/*tinymce.init({
    selector: 'textarea#my-expressjs-tinymce-app',
    height: 500,
    a_plugin_option: true,
    plugins: 'lists media nonbreaking image',
    toolbar: 'undo redo | numlist bullist | media | nonbreaking | image',
    lists_indent_on_tab: false,
    audio_template_callback: function(data) {
        return '<audio controls>' + '\n<source src="' + data.source + '"' + (data.sourcemime ? ' type="' + data.sourcemime + '"' : '') + ' />\n' + (data.altsource ? '<source src="' + data.altsource + '"' + (data.altsourcemime ? ' type="' + data.altsourcemime + '"' : '') + ' />\n' : '') + '</audio>';
    }
});
 plugins: 'media',
  menubar: 'insert',
  toolbar: 'media'

    plugins: 'nonbreaking',
  menubar: 'insert',
  toolbar: 'nonbreaking'
  */
  tinymce.init({
    selector: 'textarea#my-expressjs-tinymce-app',
    plugins: 'a11ychecker advcode casechange export formatpainter image editimage linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tableofcontents tinycomments tinymcespellchecker lists media nonbreaking image',
    toolbar: 'undo redo | numlist bullist a11ycheck addcomment showcomments casechange checklist code export formatpainter image editimage pageembed permanentpen table tableofcontents',
    toolbar_mode: 'floating',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    lists_indent_on_tab: false,
  });
  tinymce.init({
    selector: '#my-expressjs-tinymce-app',
    setup: function (editor) {
      editor.on('init', function (e) {
        editor.setContent('<p>Hello world!</p>');
      });
    }
  });
  

  