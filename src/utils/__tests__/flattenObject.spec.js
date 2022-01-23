import { default as flattenObject } from "../flattenObject";

describe("flattenObject", () => {
  it("should be able to flatten object", () => {
    const translations = {
      header: {
        tagline: {
          test1: "Hello world #1",
          test2: "Hello world #2",
        },
      },
      payment: {
        errors: {
          Q001: "Something was wrong with the credit card details: {message}",
          Q002: "Invalid credit card details. {message}",
          Q099: "Error occurred on the payment service provide. Please wait a while and try again. If the problem persist, please contact us.",
        },
      },
    };
    const EXPECTED_FLATTENED = {
      "header.tagline.test1": "Hello world #1",
      "header.tagline.test2": "Hello world #2",
      "payment.errors.Q001":
        "Something was wrong with the credit card details: {message}",
      "payment.errors.Q002": "Invalid credit card details. {message}",
      "payment.errors.Q099":
        "Error occurred on the payment service provide. Please wait a while and try again. If the problem persist, please contact us.",
    };

    let result = flattenObject(translations);
    expect(result).toEqual(EXPECTED_FLATTENED);
  });
});
