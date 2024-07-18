interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button className="button button-item" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
