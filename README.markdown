Project Description
===================

Inception
---------

This project started as a curiosity of Jon Beebe, wondering if it'd be possible
to port the ActionScript 3 api to JavaScript so that AS3 code could run natively
in Javascript.

Proof-of-concept
----------------

To consider the proof-of-concept successful, I must be able to run ActionScript3
code, with minimal alterations, in an HTML5 page. I must be able to:

*   Create Sprites in a canvas element
*   Perform basic drawing in the sprites, such as creating a circle and filling
    it with a color and stroke.
*   Process basic events, such as mouse and keyboard events

Intermetiate-goal
-----------------

Port all core display classes*: http://www.adobe.com/livedocs/flash/9.0/main/wwhelp/wwhimpl/common/html/wwhelp.htm?context=LiveDocs_Parts&file=00000143.html

*with the exception possibly being the legacy AVM1Movie class.

End-goal
--------

Port the entire AS3 api to JavaScript.

Testing
=======

The barrier to entry for contributors needs to be low. As such it will not be
necessary to own the Flash or Flex IDE to code or run the AS3 samples.

See the ReadMe in the /as3 folder for more on the ActionScript 3 examples.
See the notes on Google Closure below.

Coding Standards
================

All code should pass the Google Linter in --strict mode. Therefore, code to the
[Google Style guidelines](http://bit.ly/goog-js-style-guide)

Once installed run your script(s) through the linter

    $ gjslint --strict AS3.js/lib/flash/geom/Point.js
    1 files checked, no errors found. # <-- here's the result you want to see :)

Namespacing
-----------

Namespace all Classes inside their respective AS3 path, e.g.

    flash.js // wrapper object
    flash.display.js // wrapper object
    flash.display.Sprite.js // contains Sprite class definition

When defining a class alias it to a global of the class name, e.g.

    flash.display.Sprite = Sprite = function() {...}

This enables us to follow the AS3 shortcuts of using:

    var s = new Sprite();

Instead of:

    var s = new flash.display.Sprite();

Both are legal it AS3, so we make both available in this project.

See the [Adobe Packages & namespaces Docs](http://bit.ly/adobe-as3-pkg-nmspace)
for info on packaging/namespacing is ActionScript 3

Installation
============

You'll need both the google closure library and a clone of AS3.js from github.

In the end you'll have a directory structure looking something like this:

        AS3/
            closure-library
            compiler.jar
            as3.js/

1.  Make the AS3 dir and navigate to it in a terminal.
Download the [Google Closure Library](http://code.google.com/closure/library/docs/gettingstarted.html). Here's the svn command that'll make the `closure-library` folder and check-out the library into it.

        svn checkout http://closure-library.googlecode.com/svn/trunk/ closure-library

2.  Download the [Google Closure Compiler](http://code.google.com/p/closure-compiler/), which can be found in a [.zip file here](http://closure-compiler.googlecode.com/files/compiler-latest.zip). Exctact `compiler.jar` into the `AS3` folder.

3.  Clone your fork of the AS3 project from github

        git clone git@github.com:yourUserName/AS3.js-proof-of-concept.git as3.js

Compiling
=========

Dependencies
------------

Google Closure offers powerful compilation tools to merge and minify the library.

First we need to create the dependencies file. This is done via the `as3.js/builddeps.sh`
In your terminal navigate to the root of the project (the AS3 folder we made above) and run:

    ./builddeps.sh

This'll create the `as3.js/as3.deps.js` that closure needs to resolve dependencies dynamically.

Compilation
-----------

The examples and tests within the library use the uncompiled code. However, when you want
to finally export your project, you'll want to export a single, compiled version of the js code. To do this you'll use `closurebuilder.py`

Compiling is demonstrated in the Point demo -- `as3.js/test/flash/geom/point2.html`.

1.  Navigate your terminal to the `as3.js` folder and run this command in your terminal:

        ./compile.sh

2. You should see something like this echoed to the terminal:

        ../closure-library/closure/bin/build/closurebuilder.py: Scanning paths...
        ../closure-library/closure/bin/build/closurebuilder.py: 701 sources scanned.
        ../closure-library/closure/bin/build/closurebuilder.py: Building dependency tree..
        ../closure-library/closure/bin/build/closurebuilder.py: Compiling with the following command: java -jar ../compiler.jar --js *snipped for readability*
        ../closure-library/closure/bin/build/closurebuilder.py: JavaScript compilation succeeded.


At which point, if you look in the `as3.js/lib/flash/geom/` folder you'll see a freshly compiled `point.compiled.js` file.

Now load up and compare both the development `point_test.html` (which dynamically loads all individual scripts needed) and production example `point_compiled_test.html` (which only loads one compiled js file).

