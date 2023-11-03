import React, { FormEvent, useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import styles from './LocationSignupPage.module.scss';
import { BusinessNameForm } from '../../containers/BusinessNameForm';
import { BusinessBasicInfoForm } from '../../containers/BusinessBasicInfoForm';
import { BusinessPreferencesForm } from '../../containers/BusinessPreferenceForm';
import { Button } from '../../components/Button';
import { useCreateLocationForm } from '../../hooks/useCreateLocationForm';
import { ProgressBar } from '../../components/ProgressBar';
import { set } from 'zod';

type LocationFormDataType = {
  locationName: string;
  locationEmail: string;
  locationIndustry: string;
  locationRegion: string;
  locationCurrency: string;
  locationTimeZone: string;
  locationSIUnit: string;
  locationLegalBusinessName: string;
  locationLegalAddressLine1: string;
  locationLegalAddressLine2: string;
  locationLegalCity: string;
  locationLegalState: string;
  locationLegalCountry: string;
  locationLegalPostcode: string;
};

const intialLocationData = {
  locationName: '',
  locationEmail: '',
  locationIndustry: '',
  locationRegion: '',
  locationCurrency: '',
  locationTimeZone: '',
  locationSIUnit: '',
  locationLegalBusinessName: '',
  locationLegalAddressLine1: '',
  locationLegalAddressLine2: '',
  locationLegalCity: '',
  locationLegalState: '',
  locationLegalCountry: '',
  locationLegalPostcode: '',
};
export const LocationSignupPage: React.FC = () => {
  const authenticatedUser = useAuth();
  const [locationData, setLocationData] = useState<LocationFormDataType>(intialLocationData);
  const [submitInputErrMsg, setSubmitInputErrorMsg] = useState<string>('');

  const updateLocationData = (fields: Partial<LocationFormDataType>) => {
    setLocationData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const { steps, currentStepIndex, currentStep, isFirstStep, isLastStep, previousStep, nextStep } =
    useCreateLocationForm([
      <BusinessNameForm
        locationNameErrorMsg={submitInputErrMsg}
        userName={`${authenticatedUser?.currentUser?.userFirstName}`}
        {...locationData}
        updateLocationData={updateLocationData}
      />,
      <BusinessBasicInfoForm
        submitFormErrorMsg={submitInputErrMsg}
        {...locationData}
        updateLocationData={updateLocationData}
      />,
      <BusinessPreferencesForm />,
      <div>
        <p>Hii from step 4</p>
      </div>,
      <div>Hii from step 5</div>,
    ]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // For step1: locationName submit input validation
    if (currentStepIndex === 0) {
      if (!locationData.locationName) {
        setSubmitInputErrorMsg('Please enter your business name.');
        return;
      }
      if (locationData.locationName.length < 3) {
        setSubmitInputErrorMsg('Business name must be at least 3 characters.');
        return;
      }
      setSubmitInputErrorMsg('');
      nextStep();
    }

    if (currentStepIndex === 1) {
      if (!locationData.locationLegalAddressLine1) {
        setSubmitInputErrorMsg('Please enter your business address.');
        return;
      }
      if (locationData.locationLegalAddressLine1.length < 3) {
        setSubmitInputErrorMsg('Business address must be at least 3 characters.');
        return;
      }
      if (!locationData.locationLegalAddressLine2) {
        setSubmitInputErrorMsg('Please enter your business address.');
        return;
      }
      if (locationData.locationLegalAddressLine2.length < 3) {
        setSubmitInputErrorMsg('Business address must be at least 3 characters.');
        return;
      }
      if (!locationData.locationLegalCity) {
        setSubmitInputErrorMsg('Please enter your business city.');
        return;
      }
      if (locationData.locationLegalCity.length < 2) {
        setSubmitInputErrorMsg('Business city must be at least 2 characters.');
        return;
      }
      if (!locationData.locationLegalState) {
        setSubmitInputErrorMsg('Please enter your business state.');
        return;
      }
      if (locationData.locationLegalState.length < 2) {
        setSubmitInputErrorMsg('Business state must be at least 2 characters.');
        return;
      }
      if (!locationData.locationLegalCountry) {
        setSubmitInputErrorMsg('Please enter your business country.');
        return;
      }
      if (locationData.locationLegalCountry.length < 2) {
        setSubmitInputErrorMsg('Business country must be at least 2 characters.');
        return;
      }
      if (!locationData.locationLegalPostcode) {
        setSubmitInputErrorMsg('Please enter your business postcode.');
        return;
      }
      if (locationData.locationLegalPostcode.length < 2) {
        setSubmitInputErrorMsg('Business postcode must be at least 2 characters.');
        return;
      }
      setSubmitInputErrorMsg('');
      nextStep();
    }

    if (currentStepIndex === 2) {
      setSubmitInputErrorMsg('');
      nextStep();
    }
  };

  useEffect(() => {}, [{ ...locationData }]);

  return (
    <div className={styles.locationSignupContainer}>
      <div className={styles.locationSignupFormContainer}>
        <div>
          <div className={styles.locationSignupFormLogoContainer}>
            <h1> Craftyverse</h1>
          </div>
          <div>
            {currentStepIndex + 1 && (
              <ProgressBar progressStage={`${(100 / steps.length - 1) * (currentStepIndex + 1)}%`} />
            )}
          </div>

          <form onSubmit={handleSubmit} className={styles.locationSignupFormContent}>
            {currentStep}
            <div className={styles.locationSignupFormCtaContainer}>
              {!isFirstStep && (
                <Button buttonType="button" onClick={previousStep} type="secondary">
                  Back
                </Button>
              )}
              <Button buttonType="submit" type="primary">
                {isLastStep ? 'Submit' : 'Next'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
