import ReactSelect from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: Option | null;
  value?: Option | null;
  isSearchable?: boolean;
  required?: boolean;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Seleccione una opción",
  onChange,
  defaultValue = null,
  value = null,
  isSearchable = true,
  required = false,
  disabled = false,
}) => {
  return (
    <ReactSelect
      options={options}
      placeholder={placeholder}
      onChange={(option) => {
        onChange(option?.value ?? "");
      }}
      defaultValue={defaultValue}
      value={value}
      isSearchable={isSearchable}
      isDisabled={disabled}
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