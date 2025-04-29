interface ButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
}

const Button = ({onClick, children, className}:ButtonProps) => {
  return (
    <button onClick={onClick} className={`${className} px-4 py-2 bg-black rounded-[10px] text-white cursor-pointer`}>{children}</button>
  )
}

export default Button