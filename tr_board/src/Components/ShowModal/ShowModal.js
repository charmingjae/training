import React from "react";
import { modal, loginModal } from "./ShowModal.module.css";

function ShowModal({ setModal, isModalOpen }) {
  const getModalOpen = isModalOpen;
  return (
    <>
      {getModalOpen ? (
        <div className={`${modal}`}>
          <div onClick={setModal}>
            <div className={`${loginModal}`}>Hello</div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ShowModal;
