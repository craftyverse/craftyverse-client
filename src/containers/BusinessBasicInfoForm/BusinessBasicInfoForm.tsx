import React, { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import { Dropdown } from '../../components/Dropdown';
import styles from './BusinessBasicInfoForm.module.scss';

type BusinessBasicInfoDataType = {
  locationLegalAddressLine1: string;
  locationLegalAddressLine2: string;
  locationLegalCity: string;
  locationLegalState: string;
  locationLegalCountry: string;
  locationLegalPostcode: string;
};

type BusinessBasicInfoProps = BusinessBasicInfoDataType & {
  submitFormErrorMsg: string;
  updateLocationData: (fields: Partial<BusinessBasicInfoDataType>) => void;
};

export const BusinessBasicInfoForm: React.FC<BusinessBasicInfoProps> = ({
  locationLegalAddressLine1,
  locationLegalAddressLine2,
  locationLegalCity,
  locationLegalState,
  locationLegalCountry,
  locationLegalPostcode,
  submitFormErrorMsg,
  updateLocationData,
}) => {
  const [businessBasicInfoInputFocus, setBusinessBasicInfoInputFocus] = useState<Record<string, boolean>>({
    locationLegalAddressLine1InputFocus: false,
    locationLegalAddressLine2InputFocus: false,
    locationLegalCityInputFocus: false,
    locationLegalStateInputFocus: false,
    locationLegalCountryInputFocus: false,
    locationLegalPostcodeInputFocus: false,
  });

  const [locationBasicInfoErrorMsg, setLocationBasicInfoErrorMsg] = useState<Record<string, string>>({
    locationLegalAddressLine1ErrorMsg: '',
    locationLegalAddressLine2ErorMsg: '',
    locationLegalCity: '',
    locationLegalState: '',
    locationLegalCountry: '',
    locationLegalPostcode: '',
  });

  const validateLocationLegalAddressLine1 = (input: string) => {
    if (!input) {
      setLocationBasicInfoErrorMsg({
        ...locationBasicInfoErrorMsg,
        locationLegalAddressLine1ErrorMsg: 'Please enter your business address.',
      });
    } else if (input.length < 3) {
      setLocationBasicInfoErrorMsg({
        ...locationBasicInfoErrorMsg,
        locationLegalAddressLine1ErrorMsg: 'Business address must be at least 3 characters.',
      });
    } else if (input.length > 3) {
      setLocationBasicInfoErrorMsg({ ...locationBasicInfoErrorMsg, locationLegalAddressLine1ErrorMsg: '' });
    } else if (submitFormErrorMsg) {
      setLocationBasicInfoErrorMsg({
        ...locationBasicInfoErrorMsg,
        locationLegalAddressLine1ErrorMsg: submitFormErrorMsg,
      });
    }
  };

  const validateLocationLegalAddressLine2 = (input: string) => {
    if (!input) {
      setLocationBasicInfoErrorMsg({
        ...locationBasicInfoErrorMsg,
        locationLegalAddressLine2ErrorMsg: 'Please enter your business address.',
      });
    } else if (input.length < 3) {
      setLocationBasicInfoErrorMsg({
        ...locationBasicInfoErrorMsg,
        locationLegalAddressLine2ErrorMsg: 'Business address must contain at least 3 characters.',
      });
    } else if (input.length > 3) {
      setLocationBasicInfoErrorMsg({ ...locationBasicInfoErrorMsg, locationLegalAddressLine2ErrorMsg: '' });
    } else if (submitFormErrorMsg) {
      setLocationBasicInfoErrorMsg({
        ...locationBasicInfoErrorMsg,
        locationLegalAddressLine2ErrorMsg: submitFormErrorMsg,
      });
    }
  };

  const validateLocationLegalCountry = (input: string) => {
    if (!input) {
      setLocationBasicInfoErrorMsg({
        ...locationBasicInfoErrorMsg,
        locationLegalCountry: 'Please enter your country of operation.',
      });
    } else if (input.length < 2) {
      setLocationBasicInfoErrorMsg({
        ...locationBasicInfoErrorMsg,
        locationLegalCountry: 'Country names must contian at least 2 characters.',
      });
    } else {
      setLocationBasicInfoErrorMsg({ ...locationBasicInfoErrorMsg, locationLegalCountry: '' });
    }
  };

  const validateLocationLegalCity = (input: string) => {
    if (!input) {
      setLocationBasicInfoErrorMsg({
        ...locationBasicInfoErrorMsg,
        locationLegalCity: 'Please enter your city of operation.',
      });
    } else if (input.length < 2) {
      setLocationBasicInfoErrorMsg({
        ...locationBasicInfoErrorMsg,
        locationLegalCity: 'City names must contian at least 2 characters.',
      });
    } else {
      setLocationBasicInfoErrorMsg({ ...locationBasicInfoErrorMsg, locationLegalCity: '' });
    }
  };

  const validateLocationLegalState = (input: string) => {
    if (!input) {
      setLocationBasicInfoErrorMsg({
        ...locationBasicInfoErrorMsg,
        locationLegalState: '',
      });
    } else if (input.length < 2) {
      setLocationBasicInfoErrorMsg({
        ...locationBasicInfoErrorMsg,
        locationLegalState: 'State names must contian at least 2 characters.',
      });
    } else if (submitFormErrorMsg) {
      setLocationBasicInfoErrorMsg({
        ...locationBasicInfoErrorMsg,
        locationLegalState: submitFormErrorMsg,
      });
    }
  };

  const validateLocationLegalPostcode = (input: string) => {
    if (!input) {
      setLocationBasicInfoErrorMsg({
        ...locationBasicInfoErrorMsg,
        locationLegalPostcode: 'Please enter your postal code.',
      });
    } else if (input.length < 2) {
      setLocationBasicInfoErrorMsg({
        ...locationBasicInfoErrorMsg,
        locationLegalPostcode: 'Postal codes must contian at least 2 digits.',
      });
    } else {
      setLocationBasicInfoErrorMsg({ ...locationBasicInfoErrorMsg, locationLegalPostcode: '' });
    }
  };

  useEffect(() => {
    validateLocationLegalState(locationLegalState);
  }, [locationLegalState, locationBasicInfoErrorMsg.locationLegalState]);

  return (
    <div className={styles.businesBasicInfoFormContainer}>
      <p className={styles.businessBasicInfoFormTitle}>
        Now that we've got your business name, we would love to know a little bit more about your business.
      </p>
      <p className={styles.businessBasicInfoFormContent}>
        This will give us a chance to more accurately recommend your products to your potential customers near
        you.
      </p>

      <Input
        labelName="Address Line 1*"
        placeholderName="Line 1"
        type="text"
        onBlur={(event) => {
          updateLocationData({ locationLegalAddressLine1: event.target.value });
          validateLocationLegalAddressLine1(locationLegalAddressLine1);
        }}
        onChange={(event) => {
          updateLocationData({ locationLegalAddressLine1: event.target.value });
          setLocationBasicInfoErrorMsg({
            ...locationBasicInfoErrorMsg,
            locationLegalAddressLine1ErrorMsg: '',
          });
        }}
        onFocus={() => {
          setBusinessBasicInfoInputFocus({ locationLegalAddressLine1InputFocus: true });
        }}
        toggleInputFocus={businessBasicInfoInputFocus.locationLegalAddressLine1InputFocus}
        inputErrorMessage={locationBasicInfoErrorMsg.locationLegalAddressLine1ErrorMsg}
        value={locationLegalAddressLine1}
      />
      <Input
        labelName="Address Line 2*"
        placeholderName="Line 2"
        type="text"
        onBlur={(event) => {
          updateLocationData({ locationLegalAddressLine2: event.target.value });
          validateLocationLegalAddressLine2(locationLegalAddressLine2);
          setBusinessBasicInfoInputFocus({ locationLegalAddressLine2InputFocus: false });
        }}
        onChange={(event) => {
          updateLocationData({ locationLegalAddressLine2: event.target.value });
          setLocationBasicInfoErrorMsg({
            ...locationBasicInfoErrorMsg,
            locationLegalAddressLine2ErrorMsg: '',
          });
        }}
        onFocus={() => {
          setBusinessBasicInfoInputFocus({ locationLegalAddressLine2InputFocus: true });
        }}
        toggleInputFocus={businessBasicInfoInputFocus.locationLegalAddressLine2InputFocus}
        inputErrorMessage={locationBasicInfoErrorMsg.locationLegalAddressLine2ErrorMsg}
        value={locationLegalAddressLine2}
      />
      <div className={styles.businessbasicInfoAreaInfo}>
        <Input
          labelName="City / Town*"
          placeholderName="City"
          type="text"
          onBlur={(event) => {
            updateLocationData({ locationLegalCity: event.target.value });
            setBusinessBasicInfoInputFocus({ locationLegalCityInputFocus: false });
            validateLocationLegalCity(locationLegalCity);
          }}
          onChange={(event) => {
            updateLocationData({ locationLegalCity: event.target.value });
            setLocationBasicInfoErrorMsg({ ...locationBasicInfoErrorMsg, locationLegalCity: '' });
          }}
          onFocus={() => {
            setBusinessBasicInfoInputFocus({ locationLegalCityInputFocus: true });
          }}
          toggleInputFocus={businessBasicInfoInputFocus.locationLegalCityInputFocus}
          inputErrorMessage={locationBasicInfoErrorMsg.locationLegalCity}
          value={locationLegalCity}
        />
        <Dropdown
          dropdownHeaderTitle={'State / Province*'}
          dropdownHeaderName={'Select'}
          dropdownOptionsArray={['NSW', 'MEL', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT']}
          onSelection={(selection) => {
            updateLocationData({ locationLegalState: selection });
            if (!locationLegalState) {
              setLocationBasicInfoErrorMsg({ locationLegalState: 'Please select your state.' });
            }
          }}
          selectionErrorMessage={locationBasicInfoErrorMsg.locationLegalState}
        />
        <Input
          labelName="Postal / Zip Code*"
          placeholderName="Zip"
          type="text"
          onBlur={(event) => {
            updateLocationData({ locationLegalPostcode: event.target.value });
            validateLocationLegalPostcode(locationLegalPostcode);
            setBusinessBasicInfoInputFocus({ locationLegalPostcodeInputFocus: false });
          }}
          onChange={(event) => {
            updateLocationData({ locationLegalPostcode: event.target.value });
            setLocationBasicInfoErrorMsg({ ...locationBasicInfoErrorMsg, locationLegalPostcode: '' });
          }}
          onFocus={() => {
            setBusinessBasicInfoInputFocus({ locationLegalPostcodeInputFocus: true });
          }}
          toggleInputFocus={businessBasicInfoInputFocus.locationLegalPostcodeInputFocus}
          inputErrorMessage={locationBasicInfoErrorMsg.locationLegalPostcode}
          value={locationLegalPostcode}
        />
      </div>
      <Input
        labelName="Country of primary operation*"
        placeholderName="Country"
        type="text"
        onBlur={(event) => {
          updateLocationData({ locationLegalCountry: event.target.value });
          setBusinessBasicInfoInputFocus({ locationLegalCountryInputFocus: false });
          validateLocationLegalCountry(locationLegalCountry);
        }}
        onChange={(event) => {
          updateLocationData({ locationLegalCountry: event.target.value });
          setLocationBasicInfoErrorMsg({ ...locationBasicInfoErrorMsg, locationLegalCountry: '' });
        }}
        onFocus={() => {
          setBusinessBasicInfoInputFocus({ locationLegalCountryInputFocus: true });
        }}
        toggleInputFocus={businessBasicInfoInputFocus.locationLegalCountryInputFocus}
        inputErrorMessage={locationBasicInfoErrorMsg.locationLegalCountry}
        value={locationLegalCountry}
      />
    </div>
  );
};
