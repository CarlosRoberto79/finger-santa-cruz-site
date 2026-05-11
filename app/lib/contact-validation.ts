export const MAX_PHONE_DIGITS = 11;
export const MAX_MESSAGE_LENGTH = 700;

const VALID_BRAZILIAN_DDDS = new Set([
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "21",
  "22",
  "24",
  "27",
  "28",
  "31",
  "32",
  "33",
  "34",
  "35",
  "37",
  "38",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "51",
  "53",
  "54",
  "55",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "71",
  "73",
  "74",
  "75",
  "77",
  "79",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
]);

export function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function limitPhoneDigits(value: string) {
  return onlyDigits(value).slice(0, MAX_PHONE_DIGITS);
}

export function formatBrazilianPhone(value: string) {
  const digits = limitPhoneDigits(value);

  if (digits.length <= 2) {
    return digits;
  }

  const ddd = digits.slice(0, 2);
  const number = digits.slice(2);

  if (number.length <= 4) {
    return `(${ddd}) ${number}`;
  }

  if (digits.length <= 10) {
    return `(${ddd}) ${number.slice(0, 4)}-${number.slice(4)}`;
  }

  return `(${ddd}) ${number.slice(0, 5)}-${number.slice(5)}`;
}

function hasExcessiveRepetition(digits: string) {
  const subscriberNumber = digits.slice(2);

  return (
    /^(\d)\1+$/.test(digits) ||
    /^(\d)\1+$/.test(subscriberNumber) ||
    /(\d)\1{6,}/.test(digits) ||
    new Set(digits).size <= 2
  );
}

export function validateName(value: string) {
  const name = value.trim();
  const letterCount = name.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/g)?.length ?? 0;

  if (!name) {
    return "Informe seu nome.";
  }

  if (name.length < 2 || letterCount < 2) {
    return "Informe um nome válido.";
  }

  return "";
}

export function validateWhatsApp(value: string) {
  const digits = onlyDigits(value);

  if (!digits) {
    return "Informe seu WhatsApp.";
  }

  if (digits.length < 10 || digits.length > MAX_PHONE_DIGITS) {
    return "Informe um telefone com DDD, como (51) 99999-9999.";
  }

  if (!VALID_BRAZILIAN_DDDS.has(digits.slice(0, 2))) {
    return "Informe um DDD brasileiro válido.";
  }

  if (digits.length === 11 && digits[2] !== "9") {
    return "Informe um WhatsApp celular válido com o nono dígito.";
  }

  if (hasExcessiveRepetition(digits)) {
    return "Informe um número de WhatsApp válido.";
  }

  return "";
}

export function validateEmail(value: string) {
  const email = value.trim();

  if (!email) {
    return "";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return "Informe um e-mail válido.";
  }

  return "";
}

export function validateRequiredSelect(value: string, message: string) {
  return value.trim() ? "" : message;
}

export function validateMessage(value: string) {
  if (value.trim().length > MAX_MESSAGE_LENGTH) {
    return `Use até ${MAX_MESSAGE_LENGTH} caracteres no briefing.`;
  }

  return "";
}
