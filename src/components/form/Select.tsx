import ReactSelect from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (option: any) => void;
  className?: string;
  defaultValue?: Option | null;
  isSearchable?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Seleccione una opción",
  onChange,
  defaultValue = null,
  isSearchable = true,
}) => {
  return (
    <ReactSelect
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
      isSearchable={isSearchable}
      classNamePrefix="react-select"
      components={{
        IndicatorSeparator: () => null,
      }}
      styles={{
        control: (base) => ({
          ...base,
          minHeight: "44px",
          borderRadius: "10px",
        }),

        option: (base, state) => ({
          ...base,

          backgroundColor: state.isSelected
            ? "#dbeafe"
            : state.isFocused
              ? "#dbeafe"
              : "white",

          color: "#111827",
          cursor: "pointer",
        }),
      }}
    />
  );
};

export default Select;