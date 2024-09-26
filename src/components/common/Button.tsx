import { forwardRef } from "react";
import { Button as DaisyButton, type ButtonProps } from "react-daisyui";
import useOffline from "~/hooks/common/useOffline";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function AppButton({ children, disabled, ...other }, ref) {
    const offline = useOffline();
    return (
      <DaisyButton disabled={disabled || offline} ref={ref} {...other}>
        {children}
      </DaisyButton>
    );
  }
);
