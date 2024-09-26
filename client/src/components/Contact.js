import React from 'react'
import { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import Navbar from './Navbar'
import Footer from './Footer'

const Contact = () => {
    // let ContactFormData = {
    //     Name: FullName,
    //     Email: Email,
    //     Phone: Phone,
    //     Message: Message
    // }
    // console.log(ContactFormData);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        const email = emailjs.sendForm('Edu_Sync_project', 'template_z9c0uy9', form.current, 'f_FCkNvrppdzZAlCz')
            .then((result) => {
                console.log(result.text);
                const formData = new FormData(form.current);
                formData.set('name', '');
                formData.set('phone', '');
                formData.set('email', '');
                formData.set('message', '');
                console.log(result)
                window.alert('Email sent successfully.');
            }, (error) => {
                window.alert('Email is not sent successfully.');
            });

    };
    return (
        <>
            <Navbar />
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.795573731374!2d74.33236197454121!3d31.5297741466792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190551053abab9%3A0x23a8cbb22a0699d7!2sNCBA%26E%20FLC!5e0!3m2!1sen!2s!4v1713437613924!5m2!1sen!2s" width="100%" height="450" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="container d-flex mx-2 d-flex justify-content-between aligned-center contactpage">
                <div className="Auth-form-container py-4">
                    <form className="contact-form" ref={form} onSubmit={sendEmail}>
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Contact Us</h3>
                            <div className="mx-2 d-flex justify-content-between">
                                <div className="form-group mx-2">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        placeholder="e.g Jane Doe"
                                        name="name"
                                    />
                                </div>
                                <div className="form-group mx-2">
                                    <label>Phone</label>
                                    <input
                                        type="number"
                                        className="form-control mt-1"
                                        placeholder="Phone Number"
                                        name="phone"
                                    />
                                </div>
                                <div className="form-group mx-2">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        className="form-control mt-1"
                                        placeholder="Email Address"
                                        name="email"
                                    />
                                </div>
                            </div>
                            <div className="mx-2">
                                <div className="form-group mx-2">
                                    <label>Message</label>
                                    <textarea className="form-control mt-1" placeholder="Your Message" name="message" id="" cols="65" rows="10"></textarea>
                                </div>
                            </div>
                            <div className="d-grid gap-2 mt-3 mx-3">
                                <button type="submit" className="formbtn">
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="contactdetails py-4">
                    <div>
                        <h3 className='Auth-form-title'>Contact details</h3>
                    </div>
                    <div className="Contactdata p-4 m-1">
                        <h6><i className="fa-solid fa-envelope-circle-check"></i> Edu-Sync@gmail.com</h6>
                    </div>
                    <div className="Contactdata p-4 m-1">
                        <h6><i className="fa-solid fa-mobile-screen"></i> (+92) 300 1234567</h6>
                    </div>
                    <div className="Contactdata p-4 m-1">
                        <h6><i className="fa-solid fa-location-crosshairs"></i> National College of Business Administration & Economics.</h6>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default Contact