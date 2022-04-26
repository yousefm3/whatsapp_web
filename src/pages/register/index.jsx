import React, { useState, useEffect } from "react";
import styles from "./.module.css";
import InputField from "../../components/inputField";
import SubmitBtn from "../../components/submitBtn";
import { Link } from "react-router-dom";
import readFormData from "../../utils/readFormData";
import validateRegister from "../../validators/validateRegister";
import { useNavigate } from "react-router-dom";

export default function Register({ setNotification, setUser }) {
  const navigate = useNavigate();
  const [formObject, setFormObject] = useState(null);

  // Set A Handler on Form Object
  useEffect(() => {
    // Validate The Register User Data
    if (formObject) {
      const { isValid, msg, type } = validateRegister(formObject);
      setNotification({ msg, type });

      // If All IS OK ( ALL DATA IS VALID )
      if (isValid) {
        setUser({
          credentials: {
            username: formObject.username,
            password: formObject.password,
          },
          displayname: formObject.displayName,
          avatar: formObject.avatar,
          contacts: [],
        });
        navigate("/login");
      }
    }
  }, [formObject, setNotification, navigate, setUser]);

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <section className={styles.register_page}>
        <form
          onSubmit={(e) => {
            // Prevent The Default Behavior of HTML Form
            e.preventDefault();

            // Read The Form Input Values (Data) And Set Them Into Object
            setFormObject(readFormData(e));
          }}
        >
          <InputField
            placeholder={"Enter Username"}
            type={"text"}
            label={"username"}
            id={"username"}
            required={true}
            name="username"
            minLength={4}
          />
          <InputField
            placeholder={"Enter Password"}
            type={"password"}
            label={"password"}
            id={"password"}
            required={true}
            name="password"
            minLength={8}
          />
          <InputField
            placeholder={"Enter Password Confirmation"}
            type={"password"}
            label={"password confirmation"}
            id={"password_confirmation"}
            required={true}
            name="passwordConfirmation"
            minLength={8}
          />
          <InputField
            placeholder={"Enter Display Name"}
            type={"text"}
            label={"display name"}
            id={"display_name"}
            required={true}
            name="displayName"
            minLength={4}
          />

          <div className="d-flex">
            <InputField
              type={"file"}
              id={"avatar"}
              label={"Upload your avatar"}
              accept="image/*"
            />
          </div>
          <div className="py-1 pb-4">
            <SubmitBtn text={"Register"} />
          </div>
        </form>
        <p>
          Already have an account ?{" "}
          <Link className={styles.anchor_link} to="/login">
            Login
          </Link>
        </p>
      </section>
    </div>
  );
}
