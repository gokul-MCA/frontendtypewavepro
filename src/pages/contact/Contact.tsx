import styles from "../../css/Contact.module.css";

import React, { useRef, useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { SubmitHandler, useForm } from "react-hook-form";
import { Loader, Rocket, RotateCcw, SendHorizonal } from "lucide-react";
import { FormValues } from "../../types";
import { postCaptcha, postContactForm } from "../../services/contactService";

type SubmitState = "idle" | "sending" | "success" | "error";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onBlur" });

  const [submit, setSubmit] = useState<SubmitState>("idle");
  const [status, setStatus] = useState<string>("");

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Trigger CAPTCHA only after fields are valid
    const token = await recaptchaRef.current?.executeAsync();
    if (!token) {
      setStatus("Please complete the CAPTCHA.");
      return;
    }

    try {
      setSubmit("sending");

      // Verify CAPTCHA token first
      const captchaResponse = await postCaptcha(token);

      if (captchaResponse.data.message !== "Success") {
        setStatus("CAPTCHA verification failed. Please try again.");
        setSubmit("idle");
        recaptchaRef.current?.reset();
        return;
      }

      // Proceed with form submission
      postContactForm(data).then((response) => {
        if (response.status === 201) {
          setSubmit("success");

          setTimeout(() => {
            reset();
            setSubmit("idle");
            // recaptchaRef.current?.reset();
          }, 2000);
        } else {
          setSubmit("error");
        }
      });
    } catch (error: unknown) {
      setSubmit("error");

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log("Error response:", error.response.data);
        } else if (error.request) {
          console.log("No response received:", error.request);
        } else {
          console.log("Error message:", error.message);
        }
      } else {
        console.error("Unknown error:", error);
      }

      setTimeout(() => {
        setSubmit("idle");
      }, 2000);
    } finally {
      // ✅ Always reset CAPTCHA after attempt
      recaptchaRef.current?.reset();
    }
  };
  return (
    <section className={styles.contactSection} id="contact">
      {/* image */}
      <div className={styles.imageContainer}>
        <img src="/typing_3-2.webp" alt="" className={styles.image} />
      </div>

      {/* next section */}
      <div className={styles.contactContainer}>
        <div className={styles.contactText}>
          <h1 className={styles.contactHeading}>Let&apos;s Connect</h1>
          <div className={styles.contactSubText}>
            <p>Have something on your mind?</p>
            <p>Drop me a line — I&apos;ll get back with a typed reply.</p>
          </div>
          <div className={styles.contactSubText}>
            <p>Your feedback means the world to us.</p>
            <p>We’d love to hear from you!</p>
          </div>
        </div>

        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formWrapper}
          >
            {/* name */}
            <div className={styles.inputWrapper}>
              <label
                htmlFor="name"
                className={`${styles.label} ${styles.required}`}
              >
                Full Name
              </label>
              <input
                id="name"
                required
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[a-zA-Z'-\s]{2,}$/,
                    message: "Name is not valid",
                  },
                })}
                className={styles.input}
              />
              {errors.name && (
                <span className={styles.errorMessage}>
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* email */}
            <div className={styles.inputWrapper}>
              <label
                htmlFor="email"
                className={`${styles.label} ${styles.required}`}
              >
                Email
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email is not valid",
                  },
                })}
                className={styles.input}
              />
              {errors.email && (
                <span className={styles.errorMessage}>
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* message */}
            <div className={styles.inputWrapper}>
              <label
                htmlFor="message"
                className={`${styles.label} ${styles.required}`}
              >
                Message
              </label>
              <textarea
                id="message"
                {...register("message", {
                  required: "Message is required",
                  validate: {
                    minWords: (value) => {
                      const wordCount = value.trim().split(/\s+/).length;
                      if (wordCount < 6) {
                        return "Please enter a message with at least 6 words.";
                      }
                      return true;
                    },
                  },
                })}
                className={styles.textarea}
              ></textarea>
              {errors.message && (
                <span className={styles.errorMessage}>
                  {errors.message.message}
                </span>
              )}
            </div>

            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY as string}
              size="invisible"
              badge="bottomright"
              theme="dark"
            />

            {/* submit */}
            <button
              type="submit"
              className={styles.submitButton}
              aria-label="Submit your message"
              disabled={submit === "sending"}
            >
              {renderButtonContent(submit)}
            </button>
          </form>
          {status}
        </div>
      </div>
    </section>
  );
};

export default Contact;

const renderButtonContent = (submit: SubmitState) => {
  switch (submit) {
    case "sending":
      return (
        <>
          <span>Sending</span>
          <Loader className="text-gray-500 animate-spin" />
        </>
      );
    case "success":
      return (
        <>
          <span>Sent</span>
          <Rocket className="text-green-500" />
        </>
      );
    case "error":
      return (
        <>
          <span>Retry</span>
          <RotateCcw className="text-red-500" />
        </>
      );
    default:
      return (
        <>
          <span>Send</span>
          <SendHorizonal className="active:translate-x-2" />
        </>
      );
  }
};
