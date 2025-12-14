import TextField from "@mui/material/TextField";

type Props = {
    name: string;
    type: string;
    label: string;
}

const CustomizedInput = (props: Props) => {
    return (
        <TextField
            name={props.name}
            type={props.type}
            label={props.label}
            slotProps={{
              input: {
                style: {
                  width: "400px",
                  color: "#fff",
                }
              }
            }}
        />
    )
}

export default CustomizedInput;