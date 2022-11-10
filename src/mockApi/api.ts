import { Check } from "../types/check"
import { CheckResult } from "../types/checkResult"

/**
 * Setting the types for API error and Success Response (Array of Checks --> Check[], Array of Results --> CheckAnswer[]) 
 * to have more control over the responses.
 */

const fetchChecks = () => {
  return new Promise<Check[]>((resolve, reject) =>
    setTimeout(
      () =>
        Math.random() <= 0.8
          ? resolve([
              {
                id: "aaa",
                priority: 10,
                description: "Face on the picture matches face on the document"
              },
              {
                id: "bbb",
                priority: 5,
                description: "Veriff supports presented document"
              },
              {
                id: "ccc",
                priority: 7,
                description: "Face is clearly visible"
              },
              {
                id: "ddd",
                priority: 3,
                description: "Document data is clearly visible"
              }
            ])
          : reject({ success: false }),
      500
    )
  );
};

/**
 * @param {Object[]} results - The list of check results
 * @param {string} results[].checkId - Check id
 * @param {string} results[].result - Result value (yes / no)
 */
const submitCheckResults = (results: CheckResult[]) => {
  return new Promise<CheckResult[]>((resolve, reject) =>
    setTimeout(
      () => Math.random() <= 0.8 ? resolve(results) : reject({ success: false }),
      500
    )
  );
};

export {
  fetchChecks,
  submitCheckResults
};
