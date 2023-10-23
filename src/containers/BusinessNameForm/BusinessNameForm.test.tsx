import { render, screen } from '@testing-library/react';
import { BusinessNameForm } from './BusinessNameForm';

describe('BusinessNameForm component', () => {
  it('should render the subheading text', () => {
    render(
      <BusinessNameForm
        userName="Tony"
        inputErrorMsg="Please enter your business name"
        setBusinessNameInput={() => {
          return;
        }}
      />
    );
    const subheadingText = screen.getByText(
      "We are very excited to have you here Tony! Let's start off by telling us your business name."
    );
    expect(subheadingText).toBeInTheDocument();
  });

  it('should render the input label name "Your Business Name".', () => {
    render(
      <BusinessNameForm
        userName="Tony"
        inputErrorMsg="Please enter your business name"
        setBusinessNameInput={() => {
          return;
        }}
      />
    );
    const businessNameLabelName = screen.getByText('Your Business Name');
    expect(businessNameLabelName).toBeInTheDocument();
  });
});
