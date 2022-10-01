import "./FormInputGroup.css";

const FormInputGroup = (props) => {
  return (
    <div className={`${props.className} form-group`}>
      <label className="label" htmlFor={props.htmlFor}>
        {props.label}
      </label>
      <input
        className="input"
        id={props.htmlFor}
        name={props.htmlFor}
        type={props.type}
        placeholder={props.placeholder}
        required={props.required ? true : null}
        minLength={props.minlength}
        defaultValue={props.defaultValue}
      />
    </div>
  );
};

export default FormInputGroup;
