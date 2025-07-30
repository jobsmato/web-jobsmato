/**
 * Onboarding steps for both 'fresher' and 'experienced'
 */
export const onboardingSteps = {
  choose: [
    { key: "workStatus", ui: "workStatus" }, // fresher vs experienced
  ],
  experienced: [
    { key: "workStatus", ui: "workStatus" },
    { key: "isEmployed", ui: "isEmployed" },
    { key: "workExperience", ui: "workExperience" },
    { key: "companyRole", ui: "companyRole" },
    { key: "duration", ui: "duration" },
    { key: "compensationNotice", ui: "compensationNotice" },
  ],
  fresher: [
    { key: "workStatus", ui: "workStatus" },
    { key: "education", ui: "education" },
  ],
};

export const onboardingInitialState = {
  stepIndex: 0, // which question user is on
  answers: {},
  errors: {},
  mode: "choose",
  isLastStep: false,
};

export function onboardingReducer(state, action) {
  switch (action.type) {
    case "SET_ANSWER": {
      const answers = { ...state.answers, ...action.payload };
      // Dynamically determine which steps come next
      let mode = state.mode;
      if (action.payload.workStatus) {
        mode =
          action.payload.workStatus === "fresher" ? "fresher" : "experienced";
      }
      // Step index: add one for each answer
      let stepIndex = state.stepIndex + 1;
      // If not all steps, cap at step length
      if (stepIndex >= onboardingSteps[mode].length)
        stepIndex = onboardingSteps[mode].length - 1;
      return {
        ...state,
        answers,
        mode,
        stepIndex,
        isLastStep: stepIndex === onboardingSteps[mode].length - 1,
      };
    }
    case "NEXT": {
      let stepIndex = state.stepIndex + 1;
      if (stepIndex >= onboardingSteps[state.mode].length)
        stepIndex = onboardingSteps[state.mode].length - 1;
      return {
        ...state,
        stepIndex,
        isLastStep: stepIndex === onboardingSteps[state.mode].length - 1,
      };
    }
    case "SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.error,
        },
      };
    default:
      return state;
  }
}

export function validateStep(field, value, state) {
  if (!value || (typeof value === "string" && !value.trim())) {
    return "This field is required.";
  }
  if (
    field === "cgpa" &&
    (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 10)
  ) {
    return "Enter a CGPA between 0 and 10.";
  }
  // Add other per-field validations as required
  return "";
}

export function makeOnboardingPayload(answers) {
  // Clean/consolidate answers into the payload for API
  return answers;
}
