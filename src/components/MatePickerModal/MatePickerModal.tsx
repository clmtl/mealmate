import { Color } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Modal, Button } from "react-daisyui";
import { api } from "~/utils/api";

const colors = Object.values(Color)
  .filter((c) => c !== "UNSET" && c !== "EASTEREGG")
  .map((c) => c.toLocaleLowerCase() as keyof typeof Color);

const MatePickerModal: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);

  const session = useSession();
  const ctx = api.useContext();

  const { mutate: chooseMate } = api.mate.create.useMutation({
    onSuccess: async () => {
      await ctx.mate.getMateByUserId.invalidate({
        userId: session.data?.user.id || "",
      });
      setVisible(false);
    },
  });

  const handleChooseMate = () => {
    const color = colors[idx]?.toUpperCase() as keyof typeof Color;
    if (color === undefined) {
      return;
    }

    chooseMate({ color });
  };

  const [idx, setIdx] = useState(0);

  return (
    <div className="font-sans">
      <Modal open={visible}>
        <Modal.Header className="font-bold">Choose your mate</Modal.Header>

        <Modal.Body>
          <div className="carousel mt-4 w-full">
            {colors.map((color, index) => (
              <div
                id={`slide${index}`}
                key={index}
                className="carousel-item relative w-full"
              >
                <Image
                  className="rounded-full"
                  src={`/images/${color}/stage1.png`}
                  alt={`${color} mate`}
                  width={360}
                  height={360}
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a
                    href={`#slide${idx}`}
                    className="btn-circle btn"
                    onClick={() => {
                      setIdx(idx > 0 ? idx - 1 : idx);
                    }}
                  >
                    ❮
                  </a>

                  <a
                    href={`#slide${idx}`}
                    className="btn-circle btn"
                    onClick={() => {
                      const next = idx + 1 === colors.length ? idx : idx + 1;
                      setIdx(next);
                    }}
                  >
                    ❯
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>

        <Modal.Actions>
          <Button onClick={handleChooseMate}>Choose!</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default MatePickerModal;
