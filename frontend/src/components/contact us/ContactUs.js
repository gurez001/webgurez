import React, { useEffect, useState } from "react";
import "./asset/Contact.css";
import ContactText from "./asset/ContactText";
import ContactForm from "./asset/ContactForm";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { ClearError, CreateContactAction } from "../../actions/ContactAction";
import { CREATE_CONTACT_RESET } from "../../constants/ContactConstant";

const ContactUs = () => {
  const [inputValue, setinputValue] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, success, error } = useSelector((state) => state.contact);

  const handleinputValue = (e) => {
    const { name, value } = e.target;
    setinputValue({ ...inputValue, [name]: value });
  };
  const handlesubmitForm = (e) => {
    e.preventDefault();

    dispatch(CreateContactAction(inputValue));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (success) {
      alert.success("submit successfully");
      setinputValue({ name: "", email: "", subject: "", message: "" });
      dispatch({ type: CREATE_CONTACT_RESET });
    }
  }, [dispatch, alert, success, error]);

  return (
    <>
      <section>
        <div className="product-cont ">
          <div className="contact-row-gap">
            <h1>Contact Us</h1>
            <div className="contact-column">
              <div className="contact-left-column">
                <ContactText />
              </div>
              <div className="contact-right-column">
                <ContactForm
                  inputValue={inputValue}
                  handleinputValue={handleinputValue}
                  handlesubmitForm={handlesubmitForm}
                />
              </div>
            </div>
          </div>
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d16020.481560690137!2d76.96399425395555!3d29.674014703746508!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e7135786eee2d%3A0x3fb1429338224c4b!2sYadav%20house!5e0!3m2!1sen!2sin!4v1702013191518!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
