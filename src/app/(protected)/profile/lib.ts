
export const getIdentityLabel = (value: string): string => {
  let label = "";
  switch (value) {
    case "passport":
      label = "Passport"
      break;
    case "nationalId":
      label = "ບັດປະຈຳຕົວ";
      break;
    case "driverLicense":
      label = "ໃບຂັບຂີ່";
      break;
    default:
      label = "";
      break;
  }
  return label
};