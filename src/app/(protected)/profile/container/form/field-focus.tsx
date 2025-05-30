
export const handleEnterFocusNext = (e: React.KeyboardEvent<HTMLElement>) => {
  const currentElement = e.currentTarget as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  const form = currentElement.form;
  if (!form) { 
    return; 
  }

  const dataAttributes = currentElement.dataset;

  const isSelectOrCombobox =
    currentElement.tagName === "BUTTON" &&
    (dataAttributes.state !== undefined || dataAttributes.radixComboboxTrigger !== undefined);

  if (isSelectOrCombobox && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
    return;
  }

  const fieldElements = Array.from(form.elements).filter(
    (el): el is HTMLElement =>
      el instanceof HTMLElement &&
      typeof el.focus === "function" &&
      !el.hasAttribute("disabled") &&
      ["INPUT", "SELECT", "TEXTAREA"].includes(el.tagName),
  );

  const index = fieldElements.indexOf(currentElement);
  let nextElement: HTMLElement | undefined;

  switch (e.key) {
    case "Enter":
      e.preventDefault();
      if (index === fieldElements.length - 1) {
        form.requestSubmit();
      } else {
        nextElement = fieldElements[index + 1];
      }
      break;
  }

  if (nextElement) {
    nextElement.focus();
  }
};
  