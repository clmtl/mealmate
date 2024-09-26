import { IconBook, IconUserCircle, IconYoga } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BottomNavigation } from "react-daisyui";

const AppNavbar = () => {
  const router = useRouter();
  return (
    <BottomNavigation>
      <Link
        href={{ pathname: "/" }}
        className={router.pathname === "/" ? "active" : undefined}
      >
        <IconYoga />
        <BottomNavigation.Label>Mate</BottomNavigation.Label>
      </Link>
      <Link
        href={{ pathname: "/recipes" }}
        className={router.pathname.includes("recipes") ? "active" : undefined}
      >
        <IconBook />
        <BottomNavigation.Label>Recipes</BottomNavigation.Label>
      </Link>
      <Link
        href={{ pathname: "/profile" }}
        className={router.pathname.includes("profile") ? "active" : undefined}
      >
        <IconUserCircle />
        <BottomNavigation.Label>Profile</BottomNavigation.Label>
      </Link>
    </BottomNavigation>
  );
};

export default AppNavbar;
