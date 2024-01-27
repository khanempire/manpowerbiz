/*eslint-disable*/
import { Box, Button, Container, Group, MultiSelect, Text, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getCallWithHeaders } from "../../helpers/apiCallHelpers";
import { SelectItem, allCodesAppended } from "../services/AddServices";
import CategoryInfoCard from "./CategoryInfoCard";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [zips, setZips] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const fetchCategories = async () => {
    const apiResponse = await getCallWithHeaders("customer/get-all-service-categories");
    setCategories(apiResponse);
    setLoading(false);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search");
    // const zipParam = params.get("zip");
    if (searchParam) {
      setSearch(searchParam);
    }
    // if (zipParam) {
    //   setZips(zipParam);
    // }
  }, []);

  useEffect(() => {
    const filtered = categories?.filter((category) => {
      const searchMatch = category.categoryTitle.toLowerCase().includes(search?.toLowerCase());

      // const zipMatch = category.categoryServices.some((service) => {
      //   let zipArr = zips;
      //   if (typeof zips === "string") {
      //     zipArr = JSON.parse(zips);
      //   }
      //   return service.serviceZipCode.filter((zip) => zipArr?.includes(zip))?.length > 0;
      // });
      // && (zips?.length === 0 || zipMatch); /

      return searchMatch // Updated the condition here
    });
    setFilteredCategories(filtered);
  }, [categories, search]);

  return (
    <Container size={"xl"} pt={20} mt={"lg"}>
      {!loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          mb={"xl"}
        >
          <Text size={"1.4rem"} fw={"bold"}>
            {search ? `Search results for "${search}"` : "All Services"}
          </Text>
          <Group>
            {/* <MultiSelect
              styles={{
                label: {
                  color: "white",
                },
                wrapper: {
                  width: "20rem",
                },
              }}
              placeholder="Select a zip"
              value={zips}
              itemComponent={SelectItem}
              data={allCodesAppended?.map((d) => ({ value: d, label: d }))}
              onChange={setZips}
              clearable
            /> */}
            <TextInput
              rightSectionWidth={"100px"}
              styles={{
                label: {
                  color: "white",
    
                },
                wrapper: {
                  width: "20rem",
                },
              }}
              placeholder="Search..."
               value={search}
              onChange={(e) => {
                setSearch(e.currentTarget.value);
              }}
            />
            <Button
              color="blue"
              onClick={() => {
                setSearch("");
                // setZips("");
                window.history.replaceState({}, "", window.location.pathname);
              }}
              disabled={search === ""}
            >
              Clear
            </Button>
          </Group>
        </Box>
      )}
      <CategoryInfoCard categories={filteredCategories} loading={loading} />
    </Container>
  );
};

export default AllCategories;
