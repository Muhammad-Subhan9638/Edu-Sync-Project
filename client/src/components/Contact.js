import React, { useRef } from "react";
import emailjs from "emailjs-com";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "Edu_Sync_project",
        "template_z9c0uy9",
        form.current,
        "f_FCkNvrppdzZAlCz"
      )
      .then(
        (result) => {
          console.log(result.text);
          // Reset form fields
          form.current.reset();
          alert("Email sent successfully.");
        },
        (error) => {
          alert("Email not sent successfully.");
        }
      );
  };

  return (
    <>
      <Navbar />
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.795573731374!2d74.33236197454121!3d31.5297741466792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190551053abab9%3A0x23a8cbb22a0699d7!2sNCBA%26E%20FLC!5e0!3m2!1sen!2s!4v1713437613924!5m2!1sen!2s"
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-start my-4">
        <div className="Auth-form-container py-4 flex-fill">
          <form className="contact-form" ref={form} onSubmit={sendEmail}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Contact Us</h3>
              <div className="row mx-2">
                <div className="col-md-6 form-group mb-3">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Jane Doe"
                    name="name"
                    required
                  />
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label>Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone Number"
                    name="phone"
                    required
                  />
                </div>
                <div className="col-md-12 form-group mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    name="email"
                    required
                  />
                </div>
                <div className="col-md-12 form-group mb-3">
                  <label>Message</label>
                  <textarea
                    className="form-control"
                    placeholder="Your Message"
                    name="message"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="contact-button">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="contactdetails py-4 flex-fill mt-4 mt-md-0">
          <h3 className="Auth-form-title">Contact details</h3>
          <div className="Contactdata p-4 m-1">
            <h6>
              <i className="fa-solid fa-envelope-circle-check"></i>{" "}
              Edu-Sync@gmail.com
            </h6>
          </div>
          <div className="Contactdata p-4 m-1">
            <h6>
              <i className="fa-solid fa-mobile-screen"></i> (+92) 300 1234567
            </h6>
          </div>
          <div className="Contactdata p-4 m-1">
            <h6>
              <i className="fa-solid fa-location-crosshairs"></i> National
              College of Business Administration & Economics.
            </h6>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
