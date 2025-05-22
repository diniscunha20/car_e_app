import React, { createContext, useContext, useState } from "react";

type MapContextType = {
  car: string;
  setCar: (car: string) => void;
  event: string;
  setEvent: (event: string) => void;
  reset: () => void;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [car, setCar] = useState("");
  const [event, setEvent] = useState("");

  const reset = () => {
    setCar("");
    setEvent("");
  };

  return (
    <MapContext.Provider value={{ car, setCar, event, setEvent, reset }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapContextProvider");
  }
  return context;
};
