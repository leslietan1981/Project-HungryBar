import { SearchOutlined } from "@mui/icons-material";
import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";

const SearchField = ({ sx, size, color }: TextFieldProps) => {
  return (
    <TextField
      size={size}
      color={color}
      variant="outlined"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
        },
      }}
      sx={sx}
    />
  );
};

export default SearchField;
