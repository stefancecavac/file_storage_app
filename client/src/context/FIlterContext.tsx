import React, { useContext, useState, useEffect } from "react";

type ContextProp = {
  gridView: boolean;
  setGridView: (prev: boolean) => void;
  showType: string;
  setShowType: (value: string) => void;
};

const FilterContext = React.createContext<ContextProp | null>(null);

export const FilterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [gridView, setGridView] = useState(
    JSON.parse(localStorage.getItem("gridView") || "false")
  );
  const [showType, setShowType] = useState(
    localStorage.getItem("showType") || "all"
  );

  useEffect(() => {
    localStorage.setItem("gridView", JSON.stringify(gridView));
  }, [gridView]);

  useEffect(() => {
    localStorage.setItem("showType", showType);
  }, [showType]);

  return (
    <FilterContext.Provider
      value={{ gridView, setGridView, showType, setShowType }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useUIContext must be used within a UIProvider");
  }
  return context;
};
