import { UserButton } from "@clerk/nextjs";
// Header component without the toggle button
export default function UserHeader() {

  return (
    <div className="flex items-center">
    <UserButton />
  </div>
  );
}
