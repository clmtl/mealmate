import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "react-daisyui";

const Logout: React.FC = () => {
  return (
    <Button color="primary" onClick={() => void signOut()}>
      Logout
    </Button>
  );
};

export default Logout;
