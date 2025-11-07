document.addEventListener("DOMContentLoaded", () => {
  if (document.body?.id !== "register") return;

  const form = document.querySelector("#register form");
  if (!form) return;

  const submitButton = form.querySelector("button[type='submit']");

  const summaryFields = {
    bydel: document.getElementById("summary-bydel"),
    køn: document.getElementById("summary-køn"),
    bager: document.getElementById("summary-bager"),
    birth: document.getElementById("summary-birth"),
    bno: document.getElementById("summary-bno"),
    message: document.getElementById("summary-message"),
    fullname: document.getElementById("summary-fullname"),
    email: document.getElementById("summary-email"),
    phone: document.getElementById("summary-phone"),
    accept: document.getElementById("summary-accept"),
  };

  const bydelField = form.querySelector("#bydel");
  const kønField = form.querySelector("#køn");
  const bagerField = form.querySelector("#bager");
  const acceptField = form.querySelector("#accept_terms");
  const termsError = document.getElementById("terms-error");
  let termsTouched = false;

  const setSummaryValue = (key, value) => {
    const target = summaryFields[key];
    if (!target) return;
    const text = value && String(value).trim() ? value : "-";
    target.textContent = text;
  };

  const focusFirstInvalid = () => {
    const firstInvalid = form.querySelector(":invalid");
    firstInvalid?.focus();
  };

  const updateSubmitState = () => {
    if (!submitButton) return;
    submitButton.disabled = !form.checkValidity();
    updateTermsError();
  };

  const getSelectedOptionText = (field) => {
    if (!field) return "-";
    const option = field.selectedOptions?.[0];
    return option?.textContent?.trim() || "-";
  };

  const updateTermsError = () => {
    if (!termsError || !acceptField) return;
    const shouldShow = termsTouched && !acceptField.checked;
    termsError.hidden = !shouldShow;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      termsTouched = true;
      updateTermsError();
      focusFirstInvalid();
      form.reportValidity();
      return;
    }

    const data = new FormData(form);

    setSummaryValue("bydel", getSelectedOptionText(bydelField));
    setSummaryValue("køn", getSelectedOptionText(kønField));
    setSummaryValue("bager", getSelectedOptionText(bagerField));
    setSummaryValue("birth", data.get("birth"));

    const bnoValue = data.get("bno");
    if (bnoValue === "ja") {
      setSummaryValue("bno", "Ja");
    } else if (bnoValue === "nej") {
      setSummaryValue("bno", "Nej");
    } else {
      setSummaryValue("bno", "-");
    }

    setSummaryValue("message", data.get("message"));
    setSummaryValue("fullname", data.get("fullname"));
    setSummaryValue("email", data.get("email"));
    setSummaryValue("phone", data.get("phone"));

    const acceptTerms = data.get("accept_terms");
    setSummaryValue("accept", acceptTerms ? "Ja" : "Nej");

    form.reset();
    termsTouched = false;
    updateSubmitState();
  };

  const handleInvalid = (event) => {
    event.preventDefault();
    event.target.focus();
    if (event.target === acceptField) {
      termsTouched = true;
      updateTermsError();
    }
  };

  acceptField?.addEventListener("change", () => {
    termsTouched = true;
    updateTermsError();
    updateSubmitState();
  });

  acceptField?.addEventListener("blur", () => {
    termsTouched = true;
    updateTermsError();
  });

  form.addEventListener("invalid", handleInvalid, true);
  form.addEventListener("submit", handleSubmit);
  form.addEventListener("input", updateSubmitState);
  form.addEventListener("change", updateSubmitState);

  updateSubmitState();
});
