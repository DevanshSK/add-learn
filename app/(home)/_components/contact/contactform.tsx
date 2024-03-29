"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();


  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!name || !email || !message){
      toast.error("Please fill all the fields");
      return;
    }
    toast.promise(
      axios.post("/api/contact", {
        name,
        email,
        message
      }),
      {
        loading: 'Sending Message...',
        success: (data) => {
          router.refresh();
          setName("")
          setEmail("")
          setMessage("")
          return "Message Sent"
        },
        error: (error) => {
          console.log("Message sending error");
          console.log(error);
          return "Something went wrong"
        },
      }
    );
  }

  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row ">
      {/* LEFT */}

      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2 pt-20">
        {/* <Image
        src="/"
        alt="addlearn"
        width={50}
        height={50}
        className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]"
      /> */}
        <h1 className="bold-32 lg:bold-88">
          Contact Us
        </h1>
        <p className="regular-16 mt-6 text-gray-30 xl:max-w-[520px]">
          We&apos;re here to help and eager to hear from you.
          Whether you have questions about our services, what we do,
          need assistance with your account, or just want
          to share feedback, we&apos;re ready to assist you every step of the way.
        </p>
        <div className="my-11 flex flex-wrap gap-5">
        </div>
      </div>
      <div className="relative flex flex-1 items-start aspect-square">
        <form onSubmit={submitHandler} className="w-3/4">
          <div className="mb-5">
            <label
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          {/* <div className="mb-5">
        <label
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Subject
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          placeholder="Enter your subject"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div> */}
          <div className="mb-5">
            <label
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
