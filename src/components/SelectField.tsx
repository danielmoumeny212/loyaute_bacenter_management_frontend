interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  placeholder: string;
  value?: string;
  register?: any; 
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField = ({ options, placeholder, value, register,  onChange, ...rest }: SelectFieldProps) => {
  return (
    <select value={value} onChange={onChange} {...rest} {...register}>
      {options && (
        <option value="" disabled  hidden>
          {placeholder}
        </option>
      )}
      {options?.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
