"use strict";

const register = ({ strapi }) => {
  strapi.customFields.register({
    name: "VuCKEditor",
    plugin: "vu-strapi-plugin-ckeditor",
    type: "richtext",
  });
};

module.exports = register;
