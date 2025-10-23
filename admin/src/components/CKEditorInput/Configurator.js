import {StrapiMediaLib} from "./plugins/StrapiMediaLib";
import {StrapiEditorUsageDataPlugin} from "./plugins/StrapiEditorUsageData";

import MaximumLength from "../../vendor/ckeditor5-maximum-length/index";
import "../../vendor/ckeditor5-maximum-length/index-editor.css";

import {
  Alignment,
  Autoformat,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  BlockQuote,
  CodeBlock,
  Essentials,
  FindAndReplace,
  Heading,
  HorizontalLine,
  HtmlEmbed,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Link,
  LinkImage,
  List,
  ListProperties,
  Markdown,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SpecialCharacters,
  SpecialCharactersEssentials,
  Table,
  TableToolbar,
  TableProperties,
  TableCellProperties,
  TableColumnResize,
  TableCaption,
  WordCount,
  SourceEditing,
} from "ckeditor5";

const CKEDITOR_BASE_CONFIG_FOR_PRESETS = {
  custom: {
    plugins: [
      Alignment,
      Autoformat,
      Bold,
      Italic,
      Underline,
      Strikethrough,
      Code,
      BlockQuote,
      CodeBlock,
      Essentials,
      FindAndReplace,
      Heading,
      HorizontalLine,
      HtmlEmbed,
      Image,
      ImageCaption,
      ImageStyle,
      ImageToolbar,
      ImageUpload,
      Link,
      LinkImage,
      List,
      ListProperties,
      MediaEmbed,
      Paragraph,
      PasteFromOffice,
      RemoveFormat,
      SpecialCharacters,
      SpecialCharactersEssentials,
      Table,
      TableToolbar,
      TableProperties,
      TableCellProperties,
      TableColumnResize,
      TableCaption,
      WordCount,
      StrapiMediaLib,
      StrapiEditorUsageDataPlugin,
      SourceEditing,
    ],
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "findAndReplace",
        "selectAll",
        "|",
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "removeFormat",
        "link",
        "strapiMediaLib",
        "mediaEmbed",
        "insertTable",
        "horizontalLine",
        "blockQuote",
        "htmlEmbed",
        "specialCharacters",
        "|",
        "alignment",
        "|",
        "bulletedList",
        "numberedList",
        "|",
        "sourceEditing",
      ],
      shouldNotGroupWhenFull: true,
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    image: {
      toolbar: [
        "toggleImageCaption",
        "|",
        "imageTextAlternative",
        "|",
        "linkImage",
      ],
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "|",
        "tableCellProperties",
        "tableProperties",
        "|",
        "toggleTableCaption",
      ],
    },
    link: {
      decorators: {
        openInNewTab: {
          mode: "manual",
          label: "Open in a new tab",
          attributes: {
            target: "_blank",
            rel: "noopener noreferrer",
          },
        },
      },
    },
  },
  minimal: {
    plugins: [
      Autoformat,
      Bold,
      Italic,
      Underline,
      Strikethrough,
      Essentials,
      SourceEditing,
      FindAndReplace,
      Link,
      List,
      Paragraph,
      PasteFromOffice,
      RemoveFormat,
      SpecialCharacters,
      SpecialCharactersEssentials,
      WordCount,
      StrapiEditorUsageDataPlugin,
    ],
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "findAndReplace",
        "selectAll",
        "removeFormat",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "specialCharacters",
        "|",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "sourceEditing",
      ],
      shouldNotGroupWhenFull: true,
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    link: {
      decorators: {
        openInNewTab: {
          mode: "manual",
          label: "Open in a new tab",
          attributes: {
            target: "_blank",
            rel: "noopener noreferrer",
          },
        },
      },
    },
  },
};

export default class Configurator {
  constructor(fieldConfig) {
    this.fieldConfig = fieldConfig;
  }

  getEditorConfig() {
    const config = this._getBaseConfig();

    const maxLength = this.fieldConfig.maxLength;
    const outputOption = this.fieldConfig.options.output;
    const licenseKey = this.fieldConfig.licenseKey;

    config.licenseKey = licenseKey;

    if (outputOption === "Markdown") {
      config.plugins.push(Markdown);
    }

    if (maxLength) {
      config.plugins.push(MaximumLength);

      config.maximumLength = {
        characters: maxLength,
      };
    }

    return config;
  }

  _getBaseConfig() {
    const presetName = this.fieldConfig.options.preset;

    switch (presetName) {
      case "custom":
        return CKEDITOR_BASE_CONFIG_FOR_PRESETS.custom;
      case "minimal":
        return CKEDITOR_BASE_CONFIG_FOR_PRESETS.minimal;
      default:
        throw new Error("Invalid preset name " + presetName);
    }
  }
}
