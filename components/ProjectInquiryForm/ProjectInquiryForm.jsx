"use client";

import React, { useState, useEffect } from 'react';
import Cal, { getCalApi } from "@calcom/embed-react";
import styles from './ProjectInquiryForm.module.css';

const lowestBudget = '₪2000 עד';

const ProjectInquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    source: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "intro" });
      cal("ui", {
        "theme": "dark",
        "cssVarsPerTheme": {
          "light": { "cal-brand": "#111" },
          "dark": { "cal-brand": "#6855FB" }
        },
        "hideEventTypeDetails": true,
        "layout": "month_view"
      });
    })();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'נא להזין שם מלא';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'נא להזין כתובת אימייל';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'כתובת האימייל אינה תקינה';
    }

    if (!formData.service) newErrors.service = 'נא לבחור סוג שירות';
    if (!formData.budget) newErrors.budget = 'נא לבחור מסגרת תקציב';
    if (!formData.source) newErrors.source = 'נשמח לדעת איך הגעתם אלינו';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) element.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      setIsSuccess(true);
    } catch (error) {
      console.error("Submission error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className={`${styles['wrapper']} ${styles['cal-wrapper']}`}>
        <Cal
          namespace="intro"
          calLink="riser/intro"
          calOrigin="https://cal.eu"
          style={{ width: "100%", height: "100%", overflow: "hidden" }}
          config={{
            name: formData.name,
            email: formData.email,
            layout: "month_view",
            theme: "dark",
            timeFormat: 24,
            project_details: `מתעניין ב: ${formData.service} ● תקציב משוער: ${formData.budget} ● איך שמעתם עלינו: ${formData.source} ● תיאור: ${formData.message}`
          }}
        />
      </section>
    );
  }

  return (
    <section className={`card ${styles['wrapper']} ${styles['form-wrapper']}`}>
      <header className={styles['header']}>
        <h2>בואו נבנה משהו!</h2>
        <p>ספרו לנו על החזון שלכם כדי שנוכל להתקדם לפגישת ייעוץ.</p>
      </header>

      <form onSubmit={handleSubmit} noValidate>

        <div className={styles['row']}>

          <div className={styles['form-group']}>
            <label htmlFor="name">שם מלא</label>
            <input
              required
              id="name"
              name="name"
              type="text"
              className={`${errors.name ? styles['input-error'] : ''}`}
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <span id="name-error" className={styles['error']}>{errors.name}</span>
            )}
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="email">אימייל</label>
            <input
              required
              id="email"
              name="email"
              type="email"
              className={`${errors.email ? styles['input-error'] : ''}`}
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span id="email-error" className={styles['error']}>{errors.email}</span>
            )}
          </div>

        </div>

        <div className={styles['row']}>

          <div className={styles['form-group']}>
            <label htmlFor="service">אני מתעניין ב...</label>
            <select
              required
              id="service"
              name="service"
              className={`${errors.service ? styles['input-error'] : ''}`}
              value={formData.service}
              onChange={handleChange}
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? "service-error" : undefined}
            >
              <option value="">בחרו שירות</option>
              <option value="landing-page">דף נחיתה</option>
              <option value="website">אתר (תדמית/חנות/אירוע)</option>
              <option value="app">אפליקציה</option>
              <option value="ai-solution">פתרונות AI ואוטומציה</option>
              <option value="not-sure">לא בטוח מה מתאים לי</option>
            </select>
            {errors.service && (
              <span id="service-error" className={styles['error']}>{errors.service}</span>
            )}
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="budget">תקציב משוער</label>
            <select
              required
              id="budget"
              name="budget"
              className={`${errors.budget ? styles['input-error'] : ''}`}
              value={formData.budget}
              onChange={handleChange}
              aria-invalid={!!errors.budget}
              aria-describedby={errors.budget ? "budget-error" : undefined}
            >
              <option value="">בחרו תקציב</option>
              <option value={lowestBudget}>עד ₪2000</option>
              <option value="₪2000 - ₪8,000">₪2000 - ₪8,000</option>
              <option value="₪8,000 - ₪15,000">₪8,000 - ₪15,000</option>
              <option value="₪15,000 - ₪50,000">₪15,000 - ₪50,000</option>
            </select>
            {errors.budget && (
              <span id="budget-error" className={styles['error']}>{errors.budget}</span>
            )}
          </div>

        </div>

        <div className={styles['form-group']}>
          <label htmlFor="source">איך שמעתם עלינו?</label>
          <select
            required
            id="source"
            name="source"
            className={`${errors.source ? styles['input-error'] : ''}`}
            value={formData.source}
            onChange={handleChange}
            aria-invalid={!!errors.source}
            aria-describedby={errors.source ? "source-error" : undefined}
          >
            <option value="">בחרו אפשרות</option>
            <option value="google">חיפוש בגוגל</option>
            <option value="ai">תשובה מבינה מלאכותית</option>
            <option value="social">רשתות חברתיות</option>
            <option value="friend or colleague">המלצה מחבר / קולגה</option>
            <option value="other">אחר</option>
          </select>
          {errors.source && (
            <span id="source-error" className={styles['error']}>{errors.source}</span>
          )}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="message">מה האתגר הגדול ביותר כרגע?</label>
          <textarea
            id="message"
            name="message"
            className={`${errors.message ? styles['input-error'] : ''}`}
            rows={4}
            placeholder="ספרו לנו על מטרות הפרויקט, לוחות זמנים, או איפה הדברים תקועים כרגע..."
            value={formData.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <span id="message-error" className={styles['error']}>{errors.message}</span>
          )}
        </div>

        <button
          type="submit"
          className={`btn cta`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'תכף ממשיכים...' : 'הבא'}
        </button>

      </form>
    </section>
  );
};

export default ProjectInquiryForm;