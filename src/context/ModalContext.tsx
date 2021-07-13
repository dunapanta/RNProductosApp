import React, {createContext, useState} from 'react';

type ModalContextProps = {
  visible: boolean;
  openModal: () => void;
  hideModal: () => void;
};

export const ModalContext = createContext({} as ModalContextProps);

export const ModalProvider = ({children}: any) => {
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };

  return (
    <ModalContext.Provider value={{visible, openModal, hideModal}}>
      {children}
    </ModalContext.Provider>
  );
};
