import React from 'react';
import { Input } from '../../components/Input';
import styles from './BusinessBasicInfoForm.module.scss';

type BusinessBasicInfoDataType = {
  locationLegalAddressLine1: string;
  locationLegalAddressLine2: string;
  locationLegalCity: string;
  locationLegalState: string;
  locationLegalCountry: string;
  locationLegalPostcode: string;
};

type BusinessBasicInfoProps = {
  locationLegalAddressLine1: string;
  locationLegalAddressLine2: string;
  locationLegalCity: string;
  locationLegalState: string;
  locationLegalCountry: string;
  locationLegalPostcode: string;
  locationBasicInfoErrorMsg: Record<string, string>;
  updateLocationData: (fields: Partial<BusinessBasicInfoDataType>) => void;
};

export const BusinessBasicInfoForm: React.FC<BusinessBasicInfoProps> = ({
  locationLegalAddressLine1,
  locationLegalAddressLine2,
  locationLegalCity,
  locationLegalState,
  locationLegalCountry,
  locationLegalPostcode,
  locationBasicInfoErrorMsg,
  updateLocationData,
}) => {
  const [toggleBusinessBasicInfoInputFocus, setToggleLocationInputFocus] = React.useState<
    Record<string, boolean>
  >({
    locationLegalAddressLine1: false,
    locationLegalAddressLine2: false,
    locationLegalCity: false,
    locationLegalState: false,
    locationLegalCountry: false,
    locationLegalPostcode: false,
  });

  const [businessBasicInfoErrorMsg, setBusinessBasicInfoErrorMsg] = React.useState<
    Record<string, string>
  >({
    locationLegalAddressLine1ErrorMsg: '',
    locationLegalAddressLine2ErrorMsg: '',
    locationLegalCityErrorMsg: '',
    locationLegalStateErrorMsg: '',
    locationLegalCountryErrorMsg: '',
    locationLegalPostcodeErrorMsg: '',
  });

  const handleBusinessBasicInfoBlur = (event: any) => {
    updateLocationData({
      locationLegalAddressLine1: event.target.value,
      locationLegalAddressLine2: event.target.value,
      locationLegalCity: event.target.value,
      locationLegalState: event.target.value,
      locationLegalCountry: event.target.value,
      locationLegalPostcode: event.target.value,
    });

    setBusinessBasicInfoErrorMsg(locationBasicInfoErrorMsg);
  };

  return (
    <div className={styles.businesBasicInfoFormContainer}>
      <p className={styles.businessBasicInfoFormTitle}>
        Now that we've got your business name, we would love to know a little bit more about your
        business.
      </p>
      <p className={styles.businessBasicInfoFormContent}>
        This will give us a chance to more accurately recommend your products to your potential
        customers near you.
      </p>
      <Input
        labelName="Address Line 1"
        placeholderName="Line 1"
        type="text"
        onBlur={handleBusinessBasicInfoBlur}
        inputErrorMessage={businessBasicInfoErrorMsg.locationLegalAddressLine1}
      />
      <Input
        labelName="Address Line 2"
        placeholderName="Line 2"
        type="text"
        onBlur={handleBusinessBasicInfoBlur}
      />
      <Input
        labelName="Country of primary operation"
        placeholderName="Country"
        type="text"
        onBlur={handleBusinessBasicInfoBlur}
      />
      <div className={styles.businessbasicInfoAreaInfo}>
        <Input
          labelName="City / Town"
          placeholderName="City"
          type="text"
          onBlur={handleBusinessBasicInfoBlur}
        />
        <Input
          labelName="State / Province"
          placeholderName="State"
          type="text"
          onBlur={handleBusinessBasicInfoBlur}
        />
        <Input
          labelName="Postal / Zip Code"
          placeholderName="Zip"
          type="text"
          onBlur={handleBusinessBasicInfoBlur}
        />
      </div>
    </div>
  );
};
