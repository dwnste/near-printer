function generateAccountId() {
  const randomNumber = Math.floor(
    Math.random() * (99999999999999 - 10000000000000) + 10000000000000
  );

  return `dev-${Date.now()}-${randomNumber}`;
}

export { generateAccountId };
