import { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

interface Location {
  locationName: string | undefined;
  locationEmail: string | undefined;
  locationIndustry: string | undefined;
  locationRegion: string | undefined;
  locationCurrency: string | undefined;
  locationTimezone: string | undefined;
  locationSIUnit: string | undefined;
  locationLegalBusinessName: string | undefined;
  locationLegalBusinessAddressLine1: string | undefined;
  locationLegalBusinessAddressLine2: string | undefined;
  locationLegalCity: string | undefined;
  locationLegalState: string | undefined;
  locationLegalCountry: string | undefined;
  locationLegalPostCode: string | undefined;
}

interface LocationContextType {
  location: Location | undefined;
  setLocation: Dispatch<SetStateAction<Location | undefined>>;
}

const locationContext = createContext({});
