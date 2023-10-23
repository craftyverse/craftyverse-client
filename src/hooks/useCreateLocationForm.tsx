import { ReactElement, useState } from 'react';

/*
 * This custom hook is responsible for managing the steps and
 * states and data of the Create Location Form.
 */

export const useCreateLocationForm = (steps: ReactElement[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // This fuction will retrieve the current step in the UI and increment to the next step.
  // It will also check for if the current step is the last step in the UI.
  const nextStep = () => {
    setCurrentStepIndex((stepIndex) => {
      if (stepIndex >= steps.length - 1) {
        return stepIndex;
      }
      return stepIndex + 1;
    });
  };

  // This fuction will retrieve the current step in the UI and decrement to the previous step.
  // It will also check for if the current step is the first step in the UI.
  const previousStep = () => {
    setCurrentStepIndex((stepIndex) => {
      if (stepIndex <= 0) {
        return stepIndex;
      }
      return stepIndex - 1;
    });
  };

  const skipTo = (index: number) => {
    setCurrentStepIndex(index);
  };

  return {
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    currentStepIndex,
    currentStep: steps[currentStepIndex],
    nextStep,
    previousStep,
    steps,
  };
};
