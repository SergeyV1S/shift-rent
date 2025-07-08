export const formatPhone = (phone: string) => phone.replace(/[^0-9]/g, "");

export const formatPhoneToView = (phone: string) =>
  phone.replace(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/, "+$1 ($2) $3 $4 $5");
