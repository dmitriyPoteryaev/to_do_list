import React from "react";
import Select from "../../components/UI/Filter/Select";

const Sorting = ({ filterSelector, setfilterSelector }) => {
  return (
    <Select
      filterSelector={filterSelector}
      setfilterSelector={setfilterSelector}
      defaultName="Сортировка по:"
      options={[
        { name: "Все", value: "all" },
        { name: "Выполненные", value: "Выполненна" },
        { name: "Невыполненные", value: "Невыполненна" },
        { name: "Просрочено", value: "Просрочено" },
      ]}
    />
  );
};

export default Sorting;
