/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useRef } from "react";

export const useUpdateDefaultValues = ({ form, fieldName, value, shouldUpdate }: any) => {
  const valueRef = useRef(value);
  useEffect(() => {
    if (shouldUpdate) {
      form.setValue(fieldName, value);
      valueRef.current = value;
    }
  }, [value, fieldName, form.setValue, shouldUpdate]);
};
