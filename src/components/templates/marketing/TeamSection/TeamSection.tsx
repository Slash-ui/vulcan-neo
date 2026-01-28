import React, { forwardRef } from 'react';
import { Avatar } from '../../atoms/Avatar';
import styles from './TeamSection.module.css';

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  bio?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface TeamSectionProps extends React.HTMLAttributes<HTMLElement> {
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
   * Team members to display
   */
  members: TeamMember[];
  /**
   * Layout variant
   * @default 'grid'
   */
  variant?: 'grid' | 'compact' | 'featured';
  /**
   * Number of columns (for grid layout)
   * @default 4
   */
  columns?: 3 | 4;
}

const SocialIcon = ({
  type,
  href,
}: {
  type: 'twitter' | 'linkedin' | 'github';
  href: string;
}) => {
  const icons = {
    twitter: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    linkedin: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    github: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialLink}
      aria-label={type}
    >
      {icons[type]}
    </a>
  );
};

/**
 * TeamSection - Marketing team members section
 */
export const TeamSection = forwardRef<HTMLElement, TeamSectionProps>(
  (
    {
      eyebrow,
      title,
      description,
      members,
      variant = 'grid',
      columns = 4,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [styles.team, styles[variant], className]
      .filter(Boolean)
      .join(' ');

    return (
      <section ref={ref} className={classNames} {...props}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            <h2 className={styles.title}>{title}</h2>
            {description && (
              <p className={styles.description}>{description}</p>
            )}
          </div>

          {/* Grid Layout */}
          {(variant === 'grid' || variant === 'compact') && (
            <div
              className={styles.grid}
              style={{ '--columns': columns } as React.CSSProperties}
            >
              {members.map((member, index) => (
                <div key={index} className={styles.memberCard}>
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className={styles.memberImage}
                    />
                  ) : (
                    <Avatar
                      alt={member.name}
                      size="lg"
                      className={styles.memberAvatar}
                    />
                  )}
                  <div className={styles.memberInfo}>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <p className={styles.memberRole}>{member.role}</p>
                    {variant !== 'compact' && member.bio && (
                      <p className={styles.memberBio}>{member.bio}</p>
                    )}
                    {member.social && (
                      <div className={styles.socialLinks}>
                        {member.social.twitter && (
                          <SocialIcon
                            type="twitter"
                            href={member.social.twitter}
                          />
                        )}
                        {member.social.linkedin && (
                          <SocialIcon
                            type="linkedin"
                            href={member.social.linkedin}
                          />
                        )}
                        {member.social.github && (
                          <SocialIcon
                            type="github"
                            href={member.social.github}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Featured Layout */}
          {variant === 'featured' && members.length > 0 && (
            <div className={styles.featured}>
              <div className={styles.featuredMain}>
                {members.slice(0, 2).map((member, index) => (
                  <div key={index} className={styles.featuredCard}>
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className={styles.featuredImage}
                      />
                    ) : (
                      <Avatar
                        alt={member.name}
                        size="lg"
                        className={styles.memberAvatar}
                      />
                    )}
                    <div className={styles.memberInfo}>
                      <h3 className={styles.memberName}>{member.name}</h3>
                      <p className={styles.memberRole}>{member.role}</p>
                      {member.bio && (
                        <p className={styles.memberBio}>{member.bio}</p>
                      )}
                      {member.social && (
                        <div className={styles.socialLinks}>
                          {member.social.twitter && (
                            <SocialIcon
                              type="twitter"
                              href={member.social.twitter}
                            />
                          )}
                          {member.social.linkedin && (
                            <SocialIcon
                              type="linkedin"
                              href={member.social.linkedin}
                            />
                          )}
                          {member.social.github && (
                            <SocialIcon
                              type="github"
                              href={member.social.github}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {members.length > 2 && (
                <div className={styles.featuredGrid}>
                  {members.slice(2).map((member, index) => (
                    <div key={index} className={styles.memberCard}>
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className={styles.memberImage}
                        />
                      ) : (
                        <Avatar
                          alt={member.name}
                          size="lg"
                          className={styles.memberAvatar}
                        />
                      )}
                      <div className={styles.memberInfo}>
                        <h3 className={styles.memberName}>{member.name}</h3>
                        <p className={styles.memberRole}>{member.role}</p>
                        {member.social && (
                          <div className={styles.socialLinks}>
                            {member.social.twitter && (
                              <SocialIcon
                                type="twitter"
                                href={member.social.twitter}
                              />
                            )}
                            {member.social.linkedin && (
                              <SocialIcon
                                type="linkedin"
                                href={member.social.linkedin}
                              />
                            )}
                            {member.social.github && (
                              <SocialIcon
                                type="github"
                                href={member.social.github}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }
);

TeamSection.displayName = 'TeamSection';
