const validateCpf = (cpf) => {
  const strippedCPF = String(cpf).replace(/[\s.-]/g, '');
  if (
    strippedCPF.length !== 11 ||
    !Array.from(strippedCPF).filter((e) => e !== strippedCPF[0]).length
  ) {
    return false;
  }
  const firstNineDigits = strippedCPF.slice(0, 9);
  const validatorDigits = strippedCPF.slice(9, 11);

  // Checa o somatório pelo primeiro dígito validador
  let sum = 0;
  for (let i = 0; i < 9; ++i) {
    sum += Number(firstNineDigits.charAt(i)) * (10 - i);
  }

  let firstChecker = sum % 11;
  firstChecker = firstChecker < 2 ? 0 : 11 - firstChecker;

  const cpfWithChecker = `${firstNineDigits}${firstChecker}`;

  // Checa o somatório pelo segundo dígito validador
  sum = 0;
  for (let i = 0; i < 10; ++i) {
    sum += Number(cpfWithChecker.charAt(i)) * (11 - i);
  }

  let secondChecker = sum % 11;
  secondChecker = secondChecker < 2 ? 0 : 11 - secondChecker;

  return validatorDigits === `${firstChecker}${secondChecker}`;
};

export { validateCpf };
