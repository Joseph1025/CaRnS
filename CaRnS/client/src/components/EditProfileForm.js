import React from "react";
import { useAuth } from "../Utils/AuthContext.js";
import "./EditProfileForm.css";
import defaultavatar from "../assets/icons/defaultavatar.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function EditProfileForm() {
  const auth = useAuth();
  let navigate = useNavigate();
  if (!auth.user){
    return (<><h1 style={{color: 'black'}}> LOADING </h1></>);
  }
  const initialValues = {
    name: auth.user.profile.name,
    email: auth.user.email,
    phone: auth.user.profile.phone_number,
    date: moment(auth.user.createdAt).format("MMM DD, YYYY"),
    type: Capitalize(auth.user.userType),
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Name hould be 3 characters long").required("Required"),
    email: Yup.string().email("Enter a valid email").required("Required"),
    phone: Yup.number()
      .typeError("Enter a valid Phone Number")
      .required("Required"),
  });

  const onSubmit = async (data) => {
    auth.editprofile(
      {
        newEmail: data.email.trim(),
        newName: data.name,
        newPhoneNumber: data.phone,
        uid: auth.user._id,
      },
      (status, data) => {
        if (status === 200) {
          navigate("/profile");
        } else {
        }
      }
    );
  };
  return (
    <editprofile className="editprofile">
      <div className="editprofile-container">
        <text className="page-title">Profile</text>
        <img
          className="profile-avatar"
          style={{ width: 175, height: 175 }}
          src={defaultavatar}
          alt="default avatar"
        ></img>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <div className="form-fields">
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                />
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                />
                <Field
                  as={TextField}
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                />
                <Field
                  as={TextField}
                  name="type"
                  disabled
                  label="Account Type"
                />
                <Field
                  as={TextField}
                  name="date"
                  disabled
                  label="Account Creation"
                />
              </div>
              <div className="save-profile-btn">
                <Button
                  className="btn"
                  type="submit"
                  style={{
                    borderRadius: 40,
                    backgroundColor: "#e87123",
                    padding: "8px 30px",
                    fontSize: "18px",
                    color: "#fff",
                    marginLeft: "auto",
                    marginRight: "20px",
                  }}
                  variant="contained"
                  disableElevation
                  disabled={props.isSubmitting}
                >
                  Save Changes
                </Button>
                <Button
                  className="btn"
                  type="reset"
                  style={{
                    borderRadius: 40,
                    backgroundColor: "#e87123",
                    padding: "8px 30px",
                    fontSize: "18px",
                    color: "#fff",
                    marginLeft: "auto",
                    marginRight: "20px",
                  }}
                  variant="contained"
                  disableElevation
                  disabled={props.isSubmitting}
                  href="/profile"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </editprofile>
  );
}

export default EditProfileForm;
