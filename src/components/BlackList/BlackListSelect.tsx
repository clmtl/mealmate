import { api } from "~/utils/api";
import Creatable from "react-select/creatable";
import { type MultiValue } from "react-select";

const BlackListSelect: React.FC = () => {
  const { data } = api.blacklist.getUserBlackList.useQuery();
  const defaultValues = data?.map((e) => {
    return { value: e, label: e.charAt(0).toUpperCase() + e.slice(1) };
  });
  const options = [
    { value: "peanuts", label: "Peanuts" },
    { value: "treeNuts", label: "Tree Nuts" },
    { value: "milk", label: "Milk" },
    { value: "eggs", label: "Eggs" },
    { value: "wheat", label: "Wheat" },
    { value: "soy", label: "Soy" },
    { value: "fish", label: "Fish" },
    { value: "shellfish", label: "Shellfish" },
  ];

  const { mutate: createBlackListFood } = api.blacklist.create.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });

  const { mutate: deleteBlackListFood } = api.blacklist.delete.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });

  const handleChange = (
    e: MultiValue<{
      value: string;
      label: string;
    }>
  ) => {
    if (e.length > data!.length || data!.length === 0) {
      const content = e.slice(-1)[0]?.value || "";
      if (content === "") return;
      createBlackListFood({ content: content });
    } else if (e.length < data!.length) {
      data?.forEach((element) => {
        if (!e.map((e) => e.value).includes(element)) {
          deleteBlackListFood({ content: element });
        }
      });
    }
  };

  return (
    <div>
      <p>Add element to your blacklist*</p>
      {defaultValues && (
        <Creatable
          isMulti
          name="BlackListed food"
          options={options}
          isClearable
          className="m-2"
          defaultValue={defaultValues}
          onChange={(e) => handleChange(e)}
        />
      )}

      <p className="absolute bottom-16 text-clip">
        * Reciepes with blacklisted elements will be hidden
      </p>
    </div>
  );
};

export default BlackListSelect;
