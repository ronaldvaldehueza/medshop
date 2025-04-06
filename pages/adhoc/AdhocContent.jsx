import { Box, Grid, Stack } from "@mui/material";

import PageFooter from "components/page-footer/PageFooter";
import { useTheme } from "@mui/material/styles";

import HelpCenter from "pages-sections/adhoc/HelpCenter";
import CorporatePurchasing from "pages-sections/adhoc/CorporatePurchasing";
import ReturnsRefunds from "pages-sections/adhoc/ReturnsRefunds";

const AdhocContent = (props) => {

  const theme = useTheme();

  return (
    <Stack>
      <Grid container spacing={3}>
        <Grid item xs={2}/>
        <Grid item xs={8}>
          {
          props.content && props.content === "HELP-CENTER" 
            ? <HelpCenter/>
            : props.content === "CORPORATE-PURCHASING" 
            ? <CorporatePurchasing/>
            : props.content === "RETURNS-REFUNDS" 
            ? <ReturnsRefunds/>
            : null
          }

        </Grid>
        <Grid item xs={12} md={2}/>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}/>
        <Grid item xs={8}>
          <PageFooter
              id="footer"
              bgcolor={theme.palette.primary[800]}
              sx={{ borderRadius: "8px", width: "auto" }}
          />
        </Grid>
        <Grid item xs={2}/>
      </Grid>
    </Stack>
  );
};

export default AdhocContent;
