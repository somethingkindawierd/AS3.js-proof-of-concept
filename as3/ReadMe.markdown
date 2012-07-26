Testing ActionScript 3
=======================

Installing Flex SDK
-------------------

It's very easy to test ActionScript3 code without owning Flash or Flex tools.

1.  Download the [Flex SDK](http://www.adobe.com/products/flex/) for your system

2.  Follow these instructions specific to your system

    *   [Linux Instructions](http://stevelove.org/2009/05/14/how-to-install-and-set-up-adobe-flex-sdk-on-ubuntu-linux/)
    *   TODO: OSX Flex SDK Instructions
    *   TODO: Windows Flex SDK Instructions?

Compiling the Examples
----------------------

1.  In your terminal navigate to the base directory of the as3 sample code

        # Change the path appropriate to your system
        $ cd ~/Sites/js/AS3.js/as3SampleCode/

2.  Run the following command in your terminal

        $ mxmlc -static-link-runtime-shared-libraries=true as3/looselyTyped/HelloWorld2.as

About the example code
======================

Strongly Typed
--------------

The strongly-typed examples are there to show what AS3 should look like to pass
the strict mode when compiled through Flash. Code in this format must be edited
to run in JavaScript, since JavaScript does not have strong-typing.

Loosely Typed
-------------

These are the snippets that should run in the AS3.js port.

In JavaScript we cannot strongly-type our code, so we have loosly-typed examples
of the same code. This code will compile in both Flash/Flex and AS3.js (however
it will throw warnings when compiling with the Flex cli.)

As long as it actually compiles and runs, it'll work for our examples.
