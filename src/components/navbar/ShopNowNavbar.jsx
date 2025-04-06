import React, { useState } from "react";
import { Box, Container, Grid, Accordion, AccordionSummary, AccordionDetails, styled, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import appIcons from "components/icons"; // Import your icons map

// Styled components for the grid
const CheckeredGrid = styled(Grid)(({ theme }) => ({
  maxWidth: "100%",
  margin: "0 auto",
  gap: theme.spacing(2),
}));

const GridItem = styled(Box)(({ theme, selected }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: selected ? theme.palette.primary.light : theme.palette.grey[200],
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  minHeight: "100px",
  width: "120px", // Consistent square size
  height: "120px", // Consistent square size
  boxShadow: selected? theme.shadows[5] : theme.shadows[1],
  border: selected? "1px solid rgba(127, 127, 127, 0.1)" : "0px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.primary[100],
    boxShadow: theme.shadows[5],
    color: theme.palette.primary.contrastText,
  },
}));

const IconBox = styled(Box)(({ theme, selected }) => ({
  fontSize: "32px",
  marginBottom: theme.spacing(1),
  color: selected ? theme.palette.primary.main : theme.palette.text.secondary,
}));

const CategoryText = styled(Typography)(({ theme, selected }) => ({
  fontSize: "12px",
  fontWeight: selected ? "600" : "400",
  textAlign: "center",
  color: selected ? theme.palette.primary.main : theme.palette.text.primary,
}));


const ShopNowNavbar = ({ 
  navigationList, 
  selectedDivision, 
  setSelectedDivision,
  selectedCategory, 
  selectedCategoryTitle, 
  accordionCollapsed,
  onChangeCategory 
}) => {
  const [expanded, setExpanded] = useState(null);
  const handleAccordionToggle = (divisionId) => (_, isExpanded) => {
    setSelectedDivision(divisionId);
    setExpanded(isExpanded ? divisionId : null);
  };

  const handleMenuItemClick = (categoryId, itemSlug, itemTitle) => {
    onChangeCategory(categoryId, itemSlug, itemTitle);
    setSelectedDivision(categoryId);
    setExpanded(null); // Collapse the accordion after item selection
  };

  return (
    <Box bgcolor="background.paper">
      <Container>
        {navigationList.map((division) => (
          <Accordion
            key={division.id}
            expanded={selectedDivision ? expanded === division.id : false}
            onChange={handleAccordionToggle(division.id)}
            sx={{
              mb: 2,
              boxShadow: "none",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${division.id}-content`}
              id={`panel-${division.id}-header`}
              sx={{
                bgcolor: selectedDivision === division.id ? "primary.light" : "transparent",
              }}
              
            >
              <Typography fontWeight="600">
                {division.title}
                {division.id === selectedDivision && selectedCategoryTitle && ` > ${selectedCategoryTitle}`}
              </Typography>

            </AccordionSummary>
            <AccordionDetails>
              <CheckeredGrid container spacing={1.5} columns={8}>
                {division.child.map((item) => {
                  const Icon = appIcons[item.icon];
                  const isSelected = item.slug === selectedCategory;

                  return (
                    <Grid
                      key={item.id}
                      item
                      onClick={() => handleMenuItemClick(division.id, item.slug, item.title)}
                      variant={selectedCategory === division.slug ? "contained" : "outlined"}
                    >
                      <GridItem selected={isSelected}>
                        <IconBox selected={isSelected}>
                          <Icon />
                        </IconBox>
                        <CategoryText selected={isSelected}>{item.title}</CategoryText>
                      </GridItem>
                    </Grid>
                  );
                })}
              </CheckeredGrid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
};

export default ShopNowNavbar;
