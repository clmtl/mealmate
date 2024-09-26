import { setServers } from "dns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import BlackListSelect from "~/components/BlackList/BlackListSelect";
import Logout from "~/components/Logout/Logout";
import { api } from "~/utils/api";

const Profile: React.FC = () => {
  const sessionData = useSession().data?.user;
  const userData = api.user.getUserInfos.useQuery();

  return (
    <div>
      <h1 className="mt-4 text-center">Profile</h1>
      <div className="absolute right-2 top-2">
        <Logout />
      </div>
      <div className="flex flex-col items-center justify-center space-y-4 p-4">
        <p>Here you can see your profile infos</p>
        <p>Name: {sessionData?.name}</p>
        <p>Email: {sessionData?.email}</p>
        <Image
          src={sessionData?.image || ""}
          alt="profile pic"
          width={500}
          height={500}
          className="h-40 w-40 rounded-full"
        />
      </div>
      <BlackListSelect />
    </div>
  );
};

export default Profile;
