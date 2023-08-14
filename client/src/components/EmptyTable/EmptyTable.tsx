import { Box, Typography } from "@mui/material";
import { FC } from "react";
interface IEmptyTable {
    logoSrc: string;
    primaryText: string;
    secondText: string;
}

const EmptyTable: FC<IEmptyTable> = ({ logoSrc, primaryText, secondText }) => {

    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <img src={`${logoSrc}`} alt="Logo" />
            <Typography fontWeight={600} fontSize={40} color="white">
                {primaryText}
            </Typography>
            <Typography fontWeight={500} fontSize={14} color="#768396">
                {secondText}
            </Typography>
        </Box>
    );
};

export default EmptyTable;
