A plugin enabling rich-text editing via CKEditor.
It is based on official [plugin](https://github.com/ckeditor/strapi-plugin-ckeditor)

## Development

1. Get strapi backend ready.
2. Add this plugin to backend's package.json: `"vu-strapi-plugin-ckeditor": "file:../../strapi-plugin-ckeditor"`
3. Enable plugin via strapi configuration `@strapi_root/config/plugins.ts`:

```
'vu-strapi-plugin-ckeditor': {
    enabled: true,
},
```

4. Run strapi
5. Make sure to raise version in package.json. Then you can `rm -rf node_modules/vu-strapi-plugin-ckeditor && yarn install --force && yarn develop` in @strapi_root to update the plugin.
