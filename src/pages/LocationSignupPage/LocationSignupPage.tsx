import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import styles from './LocationSignupPage.module.scss';
import { BusinessNameForm } from '../../containers/BusinessNameForm';
import { BusinessBasicInfo } from '../../containers/BusinessBasicInfo';
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
  const [locationData, setLocationData] = useState<Record<string, string>>(intialLocationData);
  const [inputErrorMsg, setInputErrorMsg] = useState<string>('');
  const [businessNameData, setBusinessNameData] = useState<string>('');
  const { steps, currentStepIndex, currentStep, isFirstStep, isLastStep, previousStep, nextStep } =
    useCreateLocationForm([
      <BusinessNameForm
        setBusinessNameInput={setBusinessNameData}
        inputErrorMsg={inputErrorMsg}
        userName={`${authenticatedUser?.currentUser?.userFirstName}`}
      />,
      <BusinessBasicInfo />,
      <div>Hii from step 3</div>,
      <div>Hii from step 4</div>,
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
    validateBusinessNameInput(businessNameData);
  }, [businessNameData]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (inputErrorMsg || !businessNameData) {
      setInputErrorMsg('Please enter a valid business name');
      return;
    }

    nextStep();
  };

  return (
    <div className={styles.locationSignupContainer}>
      <div className={styles.locationSignupFormContainer}>
        <div className={styles.locationSignupFormLogoContainer}>
          <h1> Craftyverse</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            {currentStepIndex + 1 && (
              <ProgressBar
                progressStage={`${(100 / steps.length - 1) * (currentStepIndex + 1)}%`}
              />
            )}
          </div>
          {currentStep}
          <div className={styles.locationSignupFormCtaContainer}>
            <div className={styles.locationSignupFormCtaBtn}>
              {!isFirstStep && (
                <Button buttonType="submit" onClick={previousStep} type="secondary">
                  Back
                </Button>
              )}
              <Button buttonType="submit" type="primary">
                {isLastStep ? 'Submit' : 'Next'}
              </Button>
            </div>
          </div>
        </form>
      </div>
      {/* {businessNameData} */}
      {/* <BusinessNameForm userName={`${authenticatedUser?.currentUser?.userFirstName}`} /> */}
    </div>
  );
};
