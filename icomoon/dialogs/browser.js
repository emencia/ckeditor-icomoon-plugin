/*
 * Functionnal methods
 */

var IcomoonBrowserMethods = {
    //
    // Clean icons browser from every selection
    //
    'reset': function() {
        console.log("IcomoonBrowserMethods.reset");
        const $buttons = document.querySelectorAll('#icomoon-browser button');
        if ($buttons.length > 0) {
            $buttons.forEach(function(itemObject, itemIndex) {
                itemObject.setAttribute('data-browser-selection', 'false');
            });
        }
    },

    //
    // Set input selection value from selected item in icons browser
    //
    'select': function(el) {
        console.log("IcomoonBrowserMethods.select");
        const current_dialog = CKEDITOR.dialog.getCurrent(),
            input = current_dialog.getContentElement('tab-browser', 'browser-selection');
        // Ensure there will be only one selection
        IcomoonBrowserMethods.reset();
        // Set to true
        el.setAttribute('data-browser-selection', 'true');
        input.setValue(el.getAttribute('data-icon-name'));
    },

    //
    // Get selected button if any
    //
    'get_button': function(name) {
        console.log("IcomoonBrowserMethods.get_button");
        const $selection = document.querySelector('#icomoon-browser button[data-icon-name="'+ name +'"]');

        return $selection;
    },

    //
    // Build icomoon browser items from manifest
    //
    'build_items': function(manifest) {
        var output = '',
            prefix = manifest.preferences.fontPref.prefix;

        console.log("IcomoonBrowserMethods.build_items");
        console.log(manifest);
        for (var i = 0; i < manifest.icons.length; i++) {
            let item = manifest.icons[i],
                name = item.properties.name,
                code = item.properties.code,
                class_name = name,
                button = '<button data-icon-class="' + prefix+class_name + '"'
                            + ' data-icon-name="' + class_name + '"'
                            + ' onclick="IcomoonBrowserMethods.select(this);return false;">' +
                        '<i class="' + prefix+class_name + '"></i>' +
                        '<span>' + name + '</span>' +
                        '</button>';

                output += button;
        }

        return output;
    }
};


/*
 * Browser dialog definition
 */
CKEDITOR.dialog.add('icomoonBrowserDialog', function(editor) {
    return {
        title: 'Icomoon browser',
        minWidth: 600,
        minHeight: 300,

        //
        // Add dialog form and content structure
        //
        contents: [
            {
                id: 'tab-browser',
                label: 'Icons',
                elements: [
                    {
                        id: 'browser-items',
                        type: 'html',
                        html: '<div id="icomoon-browser">' + IcomoonBrowserMethods.build_items(editor.config.icomoon_manifest) + '</div>',

                        // On dialog first load, set the click event on items
                        onLoad: function( a ) {
                            console.log("icomoonBrowserDialog:browser-selection.onLoad");
                            console.log("this.id:", this.id);
                        }
                    },
                    {
                        id: 'browser-selection',
                        type: 'text',
                        label: 'Icon name',
                        style: 'display:none',

                        // Setup the input initial value from possible widget
                        // object attribute, also setup selection state in
                        // 'browser-items' since it depends from this field value
                        setup: function(widget) {
                            console.log("icomoonBrowserDialog:browser-selection.setup");
                            IcomoonBrowserMethods.reset();

                            if (widget.data.name) {
                                this.setValue(widget.data.name);
                                IcomoonBrowserMethods.select(
                                    IcomoonBrowserMethods.get_button(widget.data.name)
                                );
                            }
                        },

                        // Set the value on widget object from possible input
                        // choice
                        commit: function(widget) {
                            console.log("icomoonBrowserDialog:browser-selection.commit");
                            widget.setData('name', this.getValue());
                        }
                    }
                ]
            }
        ]
    }
});
