import React from "react";
import Select from "react-select";
import { useProjects } from "../context/ProjectsProvider";
const SelectDropdown = ({
  setUsername,
  setUserId,
}: {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { users } = useProjects();

  const options = users?.map((user: any) => ({
    value: user._id,
    label: `${user.username} (${user.role})`,
  }));
  return (
    <div>
      <Select
        options={options}
        className="text-black"
        onChange={(item: any) => {
          if (item?.value) {
            setUsername(item.label);
            setUserId(item.value);
          }
        }}
      />
    </div>
  );
};

export default SelectDropdown;
