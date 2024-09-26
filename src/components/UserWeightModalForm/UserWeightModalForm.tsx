import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Input from "~/components/common/Input";
import { WeightHistory, WeightHistoryENUM } from "~/types/weightHistory.type";
import { api, type RouterInputs } from "~/utils/api";
import { Modal, Button } from "react-daisyui";
import type { WeightHistory as WeightHistoryType } from "@prisma/client";

interface IUserWeightModalProps {
  setToastVisible: React.Dispatch<React.SetStateAction<boolean>>;
  weightHistoryData: WeightHistoryType[];
}
const UserWeightModalForm: React.FC<IUserWeightModalProps> = ({
  setToastVisible,
  weightHistoryData,
}) => {
  const [visible, setVisible] = useState<boolean>(true);
  const session = useSession();
  const ctx = api.useContext();

  const { mutateAsync: updateMateLevel } =
    api.mate.tryToUpdateLevelByUserId.useMutation({
      onSuccess: async () => {
        await ctx.mate.getMateByUserId.invalidate({
          userId: session.data?.user.id || "",
        });
        setToastVisible(true);
        setTimeout(() => {
          setToastVisible(false);
        }, 3000);
      },
    });

  const { mutate: addWeightHistory } = api.weightHistory.create.useMutation({
    onSuccess: async () => {
      await ctx.weightHistory.getWeightHistoryByUserId.invalidate({
        userId: session.data?.user.id || "",
      });
      await ctx.mate.getMateByUserId.invalidate({
        userId: session.data?.user.id || "",
      });
      if (weightHistoryData.length > 0) {
        await updateMateLevel();
      }
      setVisible(false);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RouterInputs["weightHistory"]["create"]>({
    resolver: zodResolver(WeightHistory),
  });

  const weight = watch(WeightHistoryENUM.weight);

  const onSubmit = (v: RouterInputs["weightHistory"]["create"]) => {
    addWeightHistory(v);
  };

  return (
    <div className="font-sans">
      <Modal open={visible}>
        <Modal.Header className="font-bold">
          What is your weight today?
        </Modal.Header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit(onSubmit)(e);
          }}
        >
          <Modal.Body>
            <Input
              type="number"
              name={WeightHistoryENUM.weight}
              spanValue="kg"
              placeholder="Your weight"
              register={register}
              required
            />
            {errors.weight && (
              <p className="text-red-500">{errors.weight.message}</p>
            )}
          </Modal.Body>

          <Modal.Actions>
            <Button type="submit" disabled={!weight}>
              Choose!
            </Button>
          </Modal.Actions>
        </form>
      </Modal>
    </div>
  );
};

export default UserWeightModalForm;
