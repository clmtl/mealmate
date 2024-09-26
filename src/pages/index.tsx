import { useState } from "react";
import { type NextPage } from "next";
import Image from "next/image";
import { api } from "~/utils/api";
import MatePickerModal from "~/components/MatePickerModal/MatePickerModal";
import UserWeightModalForm from "~/components/UserWeightModalForm/UserWeightModalForm";
import type { WeightHistory } from "@prisma/client";

const Home: NextPage = () => {
  const [toastVisible, setToastVisible] = useState(false);

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = api.user.getUserInfos.useQuery();

  const userId = userData?.id || "";

  const {
    data: weightHistoryData,
    isLoading: weightHistoryLoading,
    isError: weightHistoryError,
  } = api.weightHistory.getWeightHistoryByUserId.useQuery(
    {
      userId: userId,
    },
    { enabled: !!userId }
  );

  const {
    data: mateData,
    isLoading: mateLoading,
    isError: mateError,
  } = api.mate.getMateByUserId.useQuery(
    {
      userId: userId,
    },
    { enabled: !!userId }
  );

  const todaysWeight = (weightHistory: WeightHistory[]) => {
    const today = new Date();
    return weightHistory.find(
      (element) => element.created_at.getDate() == today.getDate()
    );
  };

  if (userLoading || weightHistoryLoading || mateLoading)
    return <div>Loading...</div>;

  if (userError || weightHistoryError || mateError)
    return <div>An error has occurred</div>;

  return (
    <div>
      {toastVisible && (
        <div className="toast-end toast z-10">
          <div className="alert">
            <div>
              <span>Congratulations, your mate has just evolved!</span>
            </div>
          </div>
        </div>
      )}
      {!mateData && <MatePickerModal />}
      {!todaysWeight(weightHistoryData) && mateData && (
        <UserWeightModalForm
          setToastVisible={setToastVisible}
          weightHistoryData={weightHistoryData}
        />
      )}
      <div className="flex justify-between p-2 font-semibold">
        <div>{userData?.name}</div>
        <div>
          <div>{userData?.age} ans</div>
          <div>{userData?.heightInCentimeters} cm</div>
          <div>{weightHistoryData[0]?.weight} kg</div>
        </div>
      </div>
      {mateData && (
        <div className="mt-24 flex justify-center">
          <Image
            className="rounded-full border-2 border-solid border-white"
            src={`/images/${mateData?.color.toLowerCase() || ""}/stage${
              mateData?.level || 1
            }.png`}
            alt="mate"
            width={360}
            height={360}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
