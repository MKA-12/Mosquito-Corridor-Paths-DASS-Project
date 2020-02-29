export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";

  return "";
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return "Password cannot be empty.";

  return "";
};

export const textValidator = text => {
  if (!text || text.length <= 0) return "Name cannot be empty.";
  if (text.length > 300) return "At max 300 characters are allowed."

  return "";
};


export const phoneNumberValidator = phoneNumber => {
  const re = /^\d{10}$/;

  if (!phoneNumber || phoneNumber.length <= 0) return "Phone number cannot be empty.";
  if(!re.test(phoneNumber)) return "Ooops! We need a valid phone number."

  return "";
};