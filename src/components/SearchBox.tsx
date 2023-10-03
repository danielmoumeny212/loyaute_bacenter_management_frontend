import React, { useState, useCallback } from "react";
import { IconButton, TextField} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import SelectField from "./SelectField";
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
  type: "input" | "select";
  placeholder?: string; 
  onSearch: (value: string) => void;
  options?: string[];
}

const SearchBox = React.memo(({ type, options, onSearch, placeholder }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isClick, setIsClick] = useState<boolean>(false);

  const handleInputChange = useCallback((e: any) => {
    setSearchValue(e.currentTarget.value);
    onSearch(e.currentTarget.value);
    setIsClick(true);
  }, []);

  const handleSearchClick = useCallback(() => {
    onSearch(searchValue);
    setIsClick(true);
  }, [onSearch, searchValue]);

  const handleClearClick = useCallback(() => {
    setSearchValue("");
    setIsClick(false);
    onSearch(searchValue); 
  }, []);

  return (
    <>
      {type === "input" && (
          <form onSubmit={() => handleSearchClick()} className="search-form">
          <TextField type="text" value={searchValue} onChange={handleInputChange} placeholder={placeholder} 
           InputProps={{
             endAdornment: (
              isClick && searchValue !== "" ?  
              <IconButton  onClick={handleClearClick} color="primary">
                <ClearIcon />
              </IconButton> : 
              <IconButton onClick={handleSearchClick} color="primary">
                <SearchIcon />
              </IconButton>
              
             )
           }}
          
          />
          </form>

      )}
      {type === "select" && (
        <SelectField
          options={options!}
          value={searchValue}
          placeholder={placeholder!}
          onChange={(e) => {
            onSearch(e.currentTarget.value);
            setSearchValue(e.currentTarget.value);
          }}
        />
          
      )}
    </>
  );
});

export default SearchBox;
