import { memo } from "react";
import { CKEditorInput } from "../CKEditorInput";
import "ckeditor5/ckeditor5.css";

const CKEditorProvider = ({
  attribute,
  name,
  disabled = false,
  labelAction = null,
  required = false,
  description = null,
  error = null,
  intlLabel,
}) => {
  return (
    <CKEditorInput
      attribute={attribute}
      name={name}
      disabled={disabled}
      labelAction={labelAction}
      required={required}
      description={description}
      error={error}
      intlLabel={intlLabel}
    />
  );
};

export default memo(CKEditorProvider);
