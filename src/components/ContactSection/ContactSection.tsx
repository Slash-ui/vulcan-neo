import React, { forwardRef, useState } from 'react';
import { Button } from '../Button';
import { InsetField } from '../InsetField';
import { Textarea } from '../Textarea';
import { FeaturedIcon } from '../FeaturedIcon';
import styles from './ContactSection.module.css';

export interface ContactInfo {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

export interface ContactSectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Section eyebrow text
   */
  eyebrow?: string;
  /**
   * Section title
   */
  title: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Contact information items
   */
  contactInfo?: ContactInfo[];
  /**
   * Show contact form
   * @default true
   */
  showForm?: boolean;
  /**
   * Form submit handler
   */
  onFormSubmit?: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => void;
  /**
   * Layout variant
   * @default 'split'
   */
  variant?: 'split' | 'centered' | 'info-only';
  /**
   * Map embed URL
   */
  mapUrl?: string;
}

/**
 * ContactSection - Marketing contact section with form
 */
export const ContactSection = forwardRef<HTMLElement, ContactSectionProps>(
  (
    {
      eyebrow,
      title,
      description,
      contactInfo = [],
      showForm = true,
      onFormSubmit,
      variant = 'split',
      mapUrl,
      className,
      ...props
    },
    ref
  ) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    const classNames = [styles.contact, styles[variant], className]
      .filter(Boolean)
      .join(' ');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (onFormSubmit) {
        onFormSubmit(formData);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    };

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };

    return (
      <section ref={ref} className={classNames} {...props}>
        <div className={styles.container}>
          {/* Header (for centered variant) */}
          {variant === 'centered' && (
            <div className={styles.header}>
              {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
              <h2 className={styles.title}>{title}</h2>
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </div>
          )}

          <div className={styles.content}>
            {/* Info Side */}
            {(variant === 'split' || variant === 'info-only') && (
              <div className={styles.infoSide}>
                {variant === 'split' && (
                  <>
                    {eyebrow && (
                      <span className={styles.eyebrow}>{eyebrow}</span>
                    )}
                    <h2 className={styles.title}>{title}</h2>
                    {description && (
                      <p className={styles.description}>{description}</p>
                    )}
                  </>
                )}

                {contactInfo.length > 0 && (
                  <div className={styles.contactItems}>
                    {contactInfo.map((info, index) => (
                      <div key={index} className={styles.contactItem}>
                        {info.icon && (
                          <FeaturedIcon
                            variant="convex"
                            color="primary"
                            size="md"
                          >
                            {info.icon}
                          </FeaturedIcon>
                        )}
                        <div className={styles.contactItemContent}>
                          <h3 className={styles.contactItemTitle}>
                            {info.title}
                          </h3>
                          {info.href ? (
                            <a
                              href={info.href}
                              className={styles.contactItemDescription}
                            >
                              {info.description}
                            </a>
                          ) : (
                            <p className={styles.contactItemDescription}>
                              {info.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {mapUrl && (
                  <div className={styles.mapWrapper}>
                    <iframe
                      src={mapUrl}
                      width="100%"
                      height="200"
                      style={{ border: 0, borderRadius: 'var(--neo-radius-md)' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Location map"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Form Side */}
            {showForm && variant !== 'info-only' && (
              <div className={styles.formSide}>
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label className={styles.label}>Name</label>
                      <InsetField
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className={styles.formField}>
                      <label className={styles.label}>Email</label>
                      <InsetField
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.label}>Subject</label>
                    <InsetField
                      name="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.label}>Message</label>
                    <Textarea
                      name="message"
                      placeholder="Tell us more..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" variant="convex" size="lg">
                    Send Message
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
);

ContactSection.displayName = 'ContactSection';
