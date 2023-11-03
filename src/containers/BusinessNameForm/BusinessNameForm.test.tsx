import { getByTestId, render, screen } from '@testing-library/react';
import { BusinessNameForm } from './BusinessNameForm';

describe('BusinessNameForm component', () => {
  it('should render the component and render ', () => {
    render(
      <BusinessNameForm
        userName="Tony"
        locationNameErrorMsg=""
        updateLocationData={() => {}}
        locationName={''}
      />
    );
    const businessNameFormComponent = screen.getByTestId('business-name-component');
    expect(businessNameFormComponent).toBeInTheDocument();
  });

  it('should render an input field', () => {
    render(
      <BusinessNameForm
        userName="Tony"
        locationNameErrorMsg=""
        updateLocationData={() => {}}
        locationName={''}
      />
    );
    const businessNameInput = screen.getByPlaceholderText('Business Name');
    expect(businessNameInput).toBeInTheDocument();
  });

  it('should render an input field with a label', () => {
    render(
      <BusinessNameForm
        userName="Tony"
        locationNameErrorMsg=""
        updateLocationData={() => {}}
        locationName={''}
      />
    );
    const businessNameInput = screen.getByText('Your Business Name');
    expect(businessNameInput).toBeInTheDocument();
  });
});
