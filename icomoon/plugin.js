/*
* Icomoon Browser Plugin
*
* @author David Thenon <dthenon@emencia.com>
* @version 1.0.0
*
* Require ckeditor >=4.5.0 and ajax + xml plugin modules
*
*/
(function () {
    /*
     * NOTE: This is a (temporary?) workaround ACF (CKEditor content filter),
     * it would be better instead in your "config.js".
     */
    //CKEDITOR.dtd.$removeEmpty.span = false;
    if (CKEDITOR.dtd.$removeEmpty.i == true) {
        console.log("Fix ACF to accept empty 'i' element.");
        CKEDITOR.dtd.$removeEmpty.i = false;
    }

    //
    // Split CKEditor internal classes and widget base classes (the ones in
    // plugin definition) from icon classes
    //
    function distinct_css_classes(classes, prefix) {
        const registry = {
                "cke": [],
                "icons": [],
                "others": [],
                "widget": []
            },
            items = classes.split(' ');

        console.log("distinct_css_classes:");
        console.log(items);

        for (var i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.startsWith("cke")) {
                registry.cke.push(item);
            } else if (item.startsWith("icomoon-widget")) {
                registry.widget.push(item);
            } else if (item.startsWith(prefix)) {
                registry.icons.push(item.substring(prefix.length));
            } else {
                registry.others.push(item);
            }
        }

        return registry;
    }


    CKEDITOR.plugins.add('icomoon', {
        icons: 'icomoon',
        requires: 'xml,ajax,widget',

        //
        // Prepare data before plugin initialization
        //
        beforeInit: function(editor) {
            // Load manifest JSON file so it will be available within dialogs
            // from a plugin config variable
            if (!editor.config.icomoon_manifest) {
                console.log("Get manifest:", editor.config.icomoon_manifest_path);
                const data = CKEDITOR.ajax.load(editor.config.icomoon_manifest_path);
                editor.config.icomoon_manifest = JSON.parse(data);
                // Set the icon prefix variable in config for further usage
                editor.config.icomoon_prefix = editor.config.icomoon_manifest.preferences.fontPref.prefix;
            }
        },

        //
        // Initialize plugin
        //
        init: function(editor) {
            // Define widget config
            editor.widgets.add('icomoon', {
                allowedContent: 'i(!icomoon-widget)',
                button: 'Insert an icon',
                dialog: 'icomoonBrowserDialog',
                requiredContent: 'i(!icomoon-widget)',
                template: '<i class=""></i>',
                editables: {},
                upcast: function( element ) {
                    return element.name == 'i' && element.hasClass('icomoon-widget');
                },

                // Initialize widget, this is where we can set its object
                // datas from its parsed DOM element
                init: function() {
                    console.log("icomoonBrowser:widget.init");
                    const current_classes = distinct_css_classes(
                        this.element.getAttribute('class'),
                        editor.config.icomoon_prefix
                    );
                    console.log(current_classes);
                    // Take the first icon class, every other are ignored (since
                    // an icon widget should always have a single icon class)
                    if (current_classes.icons.length > 0) {
                        this.setData('name', current_classes.icons[0]);
                    }
                },

                // Retrieve widget datas and modify its DOM element
                data: function() {
                    const prefix = "dummy-";

                    console.log("icomoonBrowser:widget.data");

                    if (this.data.name) {
                        console.log("icomoonBrowser:widget.data:should set the classes to:");
                        const new_classes = [
                            'icomoon-widget',
                            editor.config.icomoon_prefix + this.data.name
                        ];
                        console.log(new_classes);
                        this.element.setAttribute('class', new_classes.join(' '));
                    }
                }
            });

            // Declare the plugin stylesheet if any
            if (editor.config.icomoon_css_path) {
                CKEDITOR.document.appendStyleSheet(editor.config.icomoon_css_path);
            }

            // Load the dialogs
            CKEDITOR.dialog.add('icomoonBrowserDialog',
                                this.path + 'dialogs/browser.js');
        },
    });
})();
