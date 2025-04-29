import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`border rounded px-4 py-2 ${props.className}`} // Estilos base + clase custom
    />
  );
});

Input.displayName = "Input"; // Necesario para evitar warnings con forwardRef

export default Input;