import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextLabelFieldGroup = ({
    name,
    type,
    placeholder,
    value,
    error,
    label,
    info,
    disabled,
    onChange
}) => {
  return (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
            type={ type }
            className={classnames("form-control", {
                "is-invalid": error
            })}
            placeholder={ placeholder }
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
        { info && (<small className="form-text text-muted">{info}</small>) }
        { error && <div className="invalid-feedback">{error}</div> }
  </div>
  )
}

TextLabelFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool

}

TextLabelFieldGroup.defaultProps = {
    type: "text"
}

export default TextLabelFieldGroup;