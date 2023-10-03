import React, { createContext, useState } from "react";

type NavigationContextType = {
  isSidebarActive: boolean,
  setIsSidebarActive: React.Dispatch<React.SetStateAction<boolean>>
};

const NavigationContext = createContext<NavigationContextType>({
  isSidebarActive: false,
  setIsSidebarActive: () => {}
});

export function NavigationProvider(props: { children: React.ReactNode }) {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  return (
    <NavigationContext.Provider value={{ isSidebarActive, setIsSidebarActive }}>
      {props.children}
    </NavigationContext.Provider>
  );
}

export default NavigationContext;
