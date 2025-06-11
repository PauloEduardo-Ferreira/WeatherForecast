module.exports = {
    transformIgnorePatterns: [
      "/node_modules/(?!axios|ol|rbush)/" // Adiciona as bibliotecas que precisam ser processadas pelo Babel
    ]
  };
  