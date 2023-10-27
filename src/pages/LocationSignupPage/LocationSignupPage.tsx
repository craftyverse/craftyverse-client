import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import styles from './LocationSignupPage.module.scss';
import { BusinessNameForm } from '../../containers/BusinessNameForm';
import { BusinessBasicInfoForm } from '../../containers/BusinessBasicInfoForm';
import { BusinessPreferencesForm } from '../../containers/BusinessPreferenceForm';
import { Button } from '../../components/Button';
import { useCreateLocationForm } from '../../hooks/useCreateLocationForm';
import { ProgressBar } from '../../components/ProgressBar';

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
  const [inputErrorMsg, setInputErrorMsg] = useState<string>('');
  const [stepSubmitErrorMsg, setStepSubmitErrorMsg] = useState<string>('');

  const updateLocationData = (fields: Partial<LocationFormDataType>) => {
    setLocationData((prev) => {
      return { ...prev, ...fields };
    });
  };
  const { steps, currentStepIndex, currentStep, isFirstStep, isLastStep, previousStep, nextStep } =
    useCreateLocationForm([
      <BusinessNameForm
        inputErrorMsg={inputErrorMsg}
        userName={`${authenticatedUser?.currentUser?.userFirstName}`}
        {...locationData}
        updateLocationData={updateLocationData}
      />,
      <BusinessBasicInfoForm {...locationData} updateLocationData={updateLocationData} />,
      <BusinessPreferencesForm />,
      <div>
        <p>Hii from step 4</p>
      </div>,
      <div>Hii from step 5</div>,
    ]);

  const validateBusinessNameInput = (businessNameInput: string) => {
    if (!businessNameInput) {
      setInputErrorMsg('');
    } else if (businessNameInput.length < 2) {
      setInputErrorMsg('Please enter a valid business name');
    } else {
      setInputErrorMsg('');
    }
  };

  useEffect(() => {
    validateBusinessNameInput(locationData.locationName);

    if (!locationData.locationName) {
      setInputErrorMsg('Please enter a valid business name');
    }
  }, [locationData.locationName]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!locationData.locationName) {
      setStepSubmitErrorMsg('Please enter a valid business name');
      return;
    }

    setStepSubmitErrorMsg('');
    nextStep();
  };

  return (
    <div className={styles.locationSignupContainer}>
      <div className={styles.locationSignupFormContainer}>
        <div>
          <div className={styles.locationSignupFormLogoContainer}>
            <h1> Craftyverse</h1>
          </div>
          <div>
            {currentStepIndex + 1 && (
              <ProgressBar
                progressStage={`${(100 / steps.length - 1) * (currentStepIndex + 1)}%`}
              />
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
            <span className={styles.locationSignupFormErrorMsg}>{stepSubmitErrorMsg}</span>
          </form>
        </div>
      </div>
    </div>
  );
};
