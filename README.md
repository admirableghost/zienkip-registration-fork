# zienkip-registration

## Points to note
----------------
1. Whenever someone is adding any dependent node modules, please do "npm install module_name" and commit the module as well so that we don't lose any dependency
2. You need to get couchbase setup in your local and create the necessary buckets for it to work
3. The template folder will contain the required stuff for the front end. Modify that and use it when required.

## Folder structure
------------------
### All the public facing components will come into the folder public
1. All javascripts goes to the folder public/javascripts
2. All css goes to the folder public/stylesheets
3. All htmls goes to the folder public/views
4. All images goes to the folder public/images
5. All stock stuff goes to the folder public/vendors (for instance angular.js, bootstrap and all such vendor stuff)

### Add the necessary server modules into the folder modules

## Dev comments
--------------
1. Use em, vw, vh etc. instead of using px in css files.
