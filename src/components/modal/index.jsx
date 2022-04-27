import React, { useState, useEffect, useRef } from "react";
import styles from "./.module.css";
import InputField from "../inputField";
import readFormData from "../../utils/readFormData";
import validateFindContact from "../../validators/validateContactSearch";
import bootstrap from "bootstrap/dist/js/bootstrap";

export default function Modal({ setUser, user, setNotification }) {
  const [formObject, setFormObject] = useState(null);
  const [term, setterm] = useState("");
  const Modal = useRef();

  useEffect(() => {
    if (formObject) {
      const { username } = formObject;
      const contact = validateFindContact(username);

      if (contact) {
        if (!user?.contacts.find((contact) => contact.username === username)) {
          setUser({ ...user, contacts: [...user?.contacts, contact] });
          setNotification({
            type: "success",
            msg: `"${username}" Successfully added to your contacts`,
          });
          setterm("");
          const myModalEl = document.getElementById("Modal");
          const modal = bootstrap.Modal.getInstance(myModalEl);
          modal.hide();
        } else {
          setNotification({
            type: "danger",
            msg: `"${username}" is already in your contacts`,
          });
        }
      } else {
        setNotification({
          type: "danger",
          msg: "Incorrect or already added contact",
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formObject]);

  return (
    <div
      ref={Modal}
      className={`modal fade`}
      id="Modal"
      tabIndex="-1"
      aria-labelledby="ModalLabel"
      aria-hidden="true"
    >
      <div className={`modal-dialog modal-dialog-centered`}>
        <div className={`modal-content ${styles.Modal_wrapper}`}>
          <div className={`modal-header ${styles.white_border}`}>
            <h6 className="modal-title" id="ModalLabel">
              Add New Contact
            </h6>
            <button
              type="button"
              className="btn-close shadow-none"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setFormObject(readFormData(e));
            }}
          >
            <div className={`modal-body ${styles.white_border}`}>
              <p>
                Contacts for testing: [ dora, lara, mark, max, evie, phillip ]{" "}
              </p>
              <InputField
                term={term}
                placeholder={"Enter Username"}
                type={"text"}
                label={"username"}
                id={"contact_username"}
                required={true}
                name="username"
                minLength={3}
                onChange={setterm}
              />
            </div>
            <div className={`modal-footer ${styles.white_border}`}>
              <button
                type="button"
                className={styles.close_btn}
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="submit" className={styles.invite_btn}>
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
