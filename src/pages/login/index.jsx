import React, { useState, useEffect } from "react";
import styles from "./.module.css";
import InputField from "../../components/inputField";
import SubmitBtn from "../../components/submitBtn";
import { Link } from "react-router-dom";
import readFormData from "../../utils/readFormData";
import validateLogin from "../../validators/validateLogin";
import { useNavigate } from "react-router-dom";

export default function Login({ user, setNotification }) {
  const navigate = useNavigate();
  const [formObject, setFormObject] = useState(null);

  // Set A Handler on Form Object
  useEffect(() => {
    // Validate The Login User Data
    if (formObject) {
      if (user?.credentials?.username) {
        const { isValid, msg, type } = validateLogin(
          { username: formObject.username, password: formObject.password },
          user?.credentials
        );
        setNotification({ msg, type });

        // If All IS OK ( ALL DATA IS VALID )
        if (isValid) {
          navigate("/");
        }
      } else {
        setNotification({
          type: "danger",
          msg: "Username or password is incorrect",
        });
      }
    }
  }, [formObject, user, setNotification, navigate]);

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <section className={styles.login_page}>
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
            required={true}
            minLength={4}
            id={"username"}
            name="username"
          />
          <InputField
            placeholder={"Enter Password"}
            type={"password"}
            label={"password"}
            required={true}
            id={"password"}
            name="password"
            minLength={8}
          />
          <div className="py-3 pb-4">
            <SubmitBtn text={"Log In"} />
          </div>
        </form>
        <p>
          Don't have an account ?{" "}
          <Link className={styles.anchor_link} to="/register">
            Register
          </Link>
        </p>
      </section>
    </div>
  );
}
