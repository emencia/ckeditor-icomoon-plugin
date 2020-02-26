Icomoon Plugin for CKEditor 4
=============================

This plugin allows you to browse Icomoon gallery and select one item to insert
in content.

Note
****

This is currently in Alpha stage, the plugin works but is just able to insert
an icon, there is still some things to finish:

* [ ] Ship a CSS and Sass samples for plugin stylesheet;
* [ ] The plugin should be able to edit an already inserted icon;
* [ ] It would be cool to find a trick to avoid usage of ``&nbsp;`` entity in
  inserted element (since CKEditor refuse empty element);
* [ ] Add a correct plugin icon;
* [ ] Better looking inserted icon in editor, something more visible which
  could help to edit/remove them;
* [ ] Add english and french translation catalog for plugin texts;


Require
*******

* CKEditor >=4.5.0, <5.0.0
* CKEditor plugin enabled: ``ajax``, ``xml``;


Installation
************

Follow these steps:

#. Download the latest version of the plugin from Github.
#. Extract the downloaded file into the CKEditor's **plugins** folder.
#. Enable the plugin by changing or adding the extraPlugins line in your
   configuration (``config.js``): ::

    config.extraPlugins = 'ajax,xml,icomoon';
#. Add and fill the required options to the configuration.


Options
*******

Icomoon plugin stylesheet (Required)
    An URL path to the CSS file for the plugin stylesheets. This is needed for
    plugin layout and diplay icons in editor preview.

    The stylesheet is not part of plugin package since it relies on Icomoon
    icons which depends from your Icomoon project, there is no way to cover
    every project cases so it's your responsability to build it, however a
    sample is shipped to start your own.

    Sample: ::

        config.icomoon_css_path = '/static/css/ckeditor_icomoon.css';

Icomoon manifest path (Required)
    An URL path to the Icomoon JSON manifest (``selection.json``) file which
    define available icons, it is included in Icomoon ZIP file download online
    from your Icomoon project.

    Sample: ::

        config.icomoon_manifest_path = '/static/icomoon/selection.json';
