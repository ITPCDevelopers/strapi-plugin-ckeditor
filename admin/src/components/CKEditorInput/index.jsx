import React, { useRef, useState } from 'react'
import { Flex } from '@strapi/design-system'
import { Field } from '@strapi/design-system'
import PropTypes from 'prop-types'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { ClassicEditor } from 'ckeditor5'
import { useField } from '@strapi/strapi/admin'
import { getGlobalStyling } from './GlobalStyling'
import Configurator from './Configurator'
import MediaLib from '../MediaLib'
import sanitize from './utils/utils'

const strapiTheme = localStorage.getItem('STRAPI_THEME') || 'light'
const GlobalStyling = getGlobalStyling(strapiTheme)

const CKEditorInput = (props) => {
  const { attribute, name, disabled, labelAction, required, hint, placeholder, label } = props

  const { onChange, value, error } = useField(name)
  const [editorInstance, setEditorInstance] = useState(false)
  const { maxLengthCharacters: maxLength, licenseKey, ...options } = attribute.options
  const configurator = new Configurator({ options, maxLength, licenseKey })
  const editorConfig = configurator.getEditorConfig()

  // Add placeholder to editor config if provided
  if (placeholder) {
    editorConfig.placeholder = placeholder
  }

  const wordCounter = useRef(null)

  const [mediaLibVisible, setMediaLibVisible] = useState(false)

  const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev)

  const handleChangeAssets = async (assets) => {
    const maxWidth = 704 // Max width = 768 layout width - 2*32px margin from each side
    const maxHeight = 704

    // Load image intrinsic dimensions & limit scale to max width/height
    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          let { naturalWidth: width, naturalHeight: height } = img

          const widthScale = maxWidth / width
          const heightScale = maxHeight / height
          const scale = Math.min(widthScale, heightScale, 1)

          resolve({
            width: Math.floor(width * scale),
            height: Math.floor(height * scale),
          })
        }
        img.onerror = () => resolve({ width: undefined, height: undefined })
      })
    }

    // Preload all images and get their sizes
    const imageData = await Promise.all(
      assets
        .filter((asset) => asset.mime.includes('image'))
        .map(async (asset) => {
          const { width, height } = await loadImage(asset.url)
          return { ...asset, width, height }
        })
    )

    // Insert images synchronously
    editorInstance.model.change((writer) => {
      imageData.forEach((asset) => {
        const imageElement = writer.createElement('imageBlock', {
          src: sanitize(asset.url),
          alt: asset.alt ? sanitize(asset.alt) : '',
          width: asset.width ? asset.width.toString() : undefined,
          height: asset.height ? asset.height.toString() : undefined,
        })

        // Insert image at current selection
        editorInstance.model.insertContent(imageElement)

        // Move selection after each inserted image
        const position = writer.createPositionAfter(imageElement)
        writer.setSelection(position)
      })
    })

    handleToggleMediaLib()
  }

  return (
    <Field.Root name={name} id={name} error={error} hint={hint} required={required}>
      <Flex direction="column" alignItems="stretch" gap={1}>
        <Field.Label action={labelAction}>{label || name}</Field.Label>
        <GlobalStyling />
        <div className={`ck-editor-wrapper ${error ? 'ck-editor-wrapper-error' : ''}`}>
          <CKEditor
            editor={ClassicEditor}
            disabled={disabled}
            data={value ?? ''}
            onReady={(editor) => {
              const wordCountPlugin = editor.plugins.get('WordCount')
              const wordCountWrapper = wordCounter.current
              wordCountWrapper.appendChild(wordCountPlugin.wordCountContainer)

              // Only connect media lib if the plugin is available
              if (editor.plugins.has('strapiMediaLib')) {
                const mediaLibPlugin = editor.plugins.get('strapiMediaLib')
                mediaLibPlugin.connect(handleToggleMediaLib)
              }

              setEditorInstance(editor)
            }}
            onChange={(event, editor) => {
              const data = editor.getData()
              onChange({ target: { name, value: data } })
            }}
            config={editorConfig}
          />
        </div>
        <div ref={wordCounter} />
        <Field.Hint />
        <Field.Error />
      </Flex>
      <MediaLib
        isOpen={mediaLibVisible}
        onChange={handleChangeAssets}
        onToggle={handleToggleMediaLib}
      />
    </Field.Root>
  )
}

CKEditorInput.propTypes = {
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  hint: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  label: PropTypes.string,
}

export { CKEditorInput }
