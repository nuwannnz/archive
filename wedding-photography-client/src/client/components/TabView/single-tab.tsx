import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LinkTab from "./LinkTab";
import { TabContext } from "@mui/lab";
import TabPanel from "@mui/lab/TabPanel";
import ImageList from "../imageList/imagelist";
import "./single-tab.css";

interface NavTabProps {
  tabData: {
    label: string;
    imageUrl: string;
    images: {
      img: string;
      title?: string;
      hideTitle?: boolean;
      subtitle?: string;
    }[];
  }[];
}

export default function NavTabs({ tabData = [] }: NavTabProps) {
  const [value, setValue] = React.useState<string>("0");

  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string
  ) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ width: "100%" }}>
        <Tabs
          className="tabs-wrapper"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          {tabData.map((tab, index) => (
            <LinkTab
              key={index}
              label={tab.label}
              imageUrl={tab.imageUrl}
              value={`${index}`}
              onClick={() => handleChange(null, `${index}`)}
            />
          ))}
        </Tabs>
      </Box>

      {tabData.map((tab, index) => (
  <TabPanel key={index} value={`${index}`}>
    <div className="singletab-img">
      {/* Pass null for handleImageClick */}
      <ImageList data={tab.images} handleImageClick={null} />
    </div>
  </TabPanel>
))}
</TabContext>

  );
}
