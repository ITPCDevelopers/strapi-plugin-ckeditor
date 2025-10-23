import {memo} from 'react'
import {CKEditorInput} from '../CKEditorInput'
import 'ckeditor5/ckeditor5.css'

const CKEditorProvider = (props) => {
  const {
    attribute,
    name,
    disabled = false,
    labelAction = null,
    required = false,
    description = null,
    hint = null,
    placeholder = null,
    error = null,
    label,
  } = props

  return (
    <CKEditorInput
      attribute={attribute}
      name={name}
      disabled={disabled}
      labelAction={labelAction}
      required={required}
      hint={hint || description}
      placeholder={placeholder}
      error={error}
      label={label}
    />
  )
}

export default memo(CKEditorProvider)
