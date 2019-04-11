import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    name,
    type,
    placeholder,
    value,
    error,
    info,
    disabled,
    onChange
}) => {
  return (
    <div className="form-group">
        <input
            type={ type }
            className={classnames("form-control form-control-lg", {
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

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.string

}

TextFieldGroup.defaultProps = {
    type: "text"
}

export default TextFieldGroup;


