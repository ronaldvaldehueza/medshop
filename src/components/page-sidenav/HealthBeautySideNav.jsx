import { Box, styled } from "@mui/material";
import appIcons from "components/icons";
import Scrollbar from "components/Scrollbar";
import { FlexBox } from "components/flex-box";
import MartCard from "components/MartCard";
import { H4, Span } from "components/Typography";
import NavLink from "components/nav-link/NavLink";
import Accordion from "components/accordion/Accordion";
import AccordionHeader from "components/accordion/AccordionHeader";

import { useAppContext } from "contexts/AppContext";
import { useEffect } from "react";

// styled components
const NavbarRoot = styled(MartCard)(({ theme }) => ({
  height: "100%",
  borderRadius: "8px",
  position: "relative",
  "& .linkList": {
    padding: "8px 11px",
    transition: "all 0.2s",
    background: theme.palette.primary[50],
    "&:hover": {
      color: theme.palette.primary.main,
      background: theme.palette.primary[100],
    },
  },
}));

const StyledList = styled(FlexBox)(({ theme }) => ({
  transition: "all 0.2s",
  padding: "4px 11px",
  alignItems: "center",
  "& .listCircle": {
    background: theme.palette.grey[600],
  },
  "&:hover": {
    color: theme.palette.primary.main,
    background: theme.palette.primary[100],
    "& .listCircle": {
      background: theme.palette.primary.main,
    },
  },
}));

const Circle = styled("span")(() => ({
  width: "4px",
  height: "4px",
  marginLeft: "2rem",
  marginRight: "8px",
  borderRadius: "3px",
})); 


const HealthBeautySideNav = ({ navList }) => {
  
  const { mainContent, setMainContent, 
    selectedCategory, setSelectedCategory,
    setSelectedCategoryTitle,
  } = useAppContext();

  // RENDER THE NESTED CHILD
  const renderChild = (childList) => {
    if (!Array.isArray(childList)) return null; // fallback
    return childList.map((item) => (
      <NavLink 
        href="#" 
        key={item.title} 
        color="grey.700"
        onClick={(e) => {
            e.preventDefault();
            setSelectedCategory(item.slug);
            setSelectedCategoryTitle(item.title);
            setMainContent("CATEGORYRESULT");
          }
        } 
      >
        <StyledList>
          <Circle className="listCircle" />
          <Span py={0.75}>{item.title}</Span>
        </StyledList>
      </NavLink>
    ));
  };

  return (
    <Scrollbar>
      <NavbarRoot>
        <FlexBox
          padding="10px 18px"
          sx={{
            backgroundColor: "primary.200",
            borderRadius: "5px 5px 0px 0px",
          }}
        >
          <H4>Categories</H4>
        </FlexBox>

        {navList.map((item, ind) => {
          const Icon = appIcons[item.icon];
          return (
            <Box mb="2px" color="grey.700" key={ind}>
              {item.child ? (
                <Accordion>
                  <AccordionHeader px={0} py={0.75} className="linkList">
                    <FlexBox py={0.3} gap={1.5} alignItems="center">
                      <Icon fontSize="small" />
                      <Span fontWeight={600}>{item.title}</Span>
                    </FlexBox>
                  </AccordionHeader>
                  {item.child ? renderChild(item.child) : null}
                </Accordion>
              ) : (
                <NavLink key={item.title} href={item.href} color="grey.700">
                  <FlexBox className="linkList" py={0.75} gap={1.5}>
                    <Icon fontSize="small" />
                    <Span fontWeight={600}>{item.title}</Span>
                  </FlexBox>
                </NavLink>
              )}
            </Box>
          );
        })}
      </NavbarRoot>
    </Scrollbar>
  );
};

export default HealthBeautySideNav;
