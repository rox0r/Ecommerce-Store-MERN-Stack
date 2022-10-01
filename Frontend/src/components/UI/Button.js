import "./Button.css";

const Button = (props) => {
  const onClickHandler = () => {
    props.onClick();
  };

  return (
    <button
      className={props.className}
      type={props.type}
      onClick={onClickHandler}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
