import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FeaturesSection } from './FeaturesSection';

const defaultFeatures = [
  { title: 'Feature 1', description: 'Description 1' },
  { title: 'Feature 2', description: 'Description 2' },
  { title: 'Feature 3', description: 'Description 3' },
];

describe('FeaturesSection', () => {
  it('renders title', () => {
    render(<FeaturesSection title="Our Features" features={defaultFeatures} />);
    expect(screen.getByText('Our Features')).toBeInTheDocument();
  });

  it('renders eyebrow', () => {
    render(
      <FeaturesSection
        title="Title"
        eyebrow="Why Choose Us"
        features={defaultFeatures}
      />
    );
    expect(screen.getByText('Why Choose Us')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <FeaturesSection
        title="Title"
        description="Section description"
        features={defaultFeatures}
      />
    );
    expect(screen.getByText('Section description')).toBeInTheDocument();
  });

  it('renders all features', () => {
    render(<FeaturesSection title="Title" features={defaultFeatures} />);
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Feature 3')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('renders feature icons', () => {
    const features = [
      { title: 'Feature', description: 'Desc', icon: <span data-testid="icon">★</span> },
    ];
    render(<FeaturesSection title="Title" features={features} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders feature images in list layout', () => {
    const features = [
      {
        title: 'Feature',
        description: 'Desc',
        image: 'https://example.com/img.jpg',
        imageAlt: 'Feature image',
      },
    ];
    render(<FeaturesSection title="Title" features={features} layout="list" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/img.jpg');
    expect(img).toHaveAttribute('alt', 'Feature image');
  });

  it('renders feature images in alternating layout', () => {
    const features = [
      { title: 'Feature', description: 'Desc', image: 'https://example.com/img.jpg' },
    ];
    render(<FeaturesSection title="Title" features={features} layout="alternating" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('applies layout classes correctly', () => {
    const { rerender } = render(
      <FeaturesSection
        title="Title"
        features={defaultFeatures}
        layout="grid"
        data-testid="features"
      />
    );
    expect(screen.getByTestId('features').className).toContain('grid');

    rerender(
      <FeaturesSection
        title="Title"
        features={defaultFeatures}
        layout="list"
        data-testid="features"
      />
    );
    expect(screen.getByTestId('features').className).toContain('list');

    rerender(
      <FeaturesSection
        title="Title"
        features={defaultFeatures}
        layout="alternating"
        data-testid="features"
      />
    );
    expect(screen.getByTestId('features').className).toContain('alternating');
  });

  it('applies custom className', () => {
    render(
      <FeaturesSection
        title="Title"
        features={defaultFeatures}
        className="custom-features"
        data-testid="features"
      />
    );
    expect(screen.getByTestId('features')).toHaveClass('custom-features');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<FeaturesSection ref={ref} title="Title" features={defaultFeatures} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
