const BcpAlerts = require("../models/teleservices/BcpAlerts");
const BcpNotifications = require("../models/teleservices/BcpNotifications");

const { extractDataFromBody } = require("../utils/emailUtils");

// Procesar correos de BCP Alertas
const processBcpAlertsEmail = async (parsedEmail, emailDate) => {
  const body = parsedEmail.text;

  

  await BcpAlerts.create({
    orderingCompany: extractDataFromBody(body, /Empresa ordenante:\s*(.*)/),
    beneficiary: extractDataFromBody(body, /Beneficiario:\s*(.*)/),
    account: extractDataFromBody(body, /N° de cuenta:\s*(.*)/),
    amount: extractDataFromBody(body, /Importe:\s*(.*)/),
    message: extractDataFromBody(body, /Mensaje:\s*(.*)/),
    dateTime: emailDate,
  });
};

//processBcpNotificationsEmail;
// Procesar correos de BCP Notificaciones

const processBcpNotificationsEmail = async (parsedEmail, emailDate) => {
  const body = parsedEmail.text;

  /*const accountRegex = /Cuenta\s*(\d{3}-\d{8}-\d-\d{2})/;
  const accountMatches = body.match(accountRegex); // Buscar todas las coincidencias de cuentas
  const account = accountMatches ? accountMatches[1] : null;

  const destinationAccountMatches = body.match(accountRegex);
  const destinationAccount = destinationAccountMatches
    ? destinationAccountMatches[1]
    : null;*/
  
  console.log(extractDataFromBody(body, /Tipo de Operacion\s*(.*)/));
  console.log(emailDate);
  console.log(extractDataFromBody(body, /Número de operación\s*(.*)/));
  console.log(extractDataFromBody(body, /Empresa ordenante\s*(.*)/));
  console.log(extractDataFromBody(body, /Cuenta\s*(.*)/),);
  console.log(extractDataFromBody(body, /Tipo de cuenta\s*(.*)/),);
  console.log(extractDataFromBody(body, /Beneficiario\s*(.*)/),);
  console.log(extractDataFromBody(body, /Cuenta\s*(.*)/),);
  console.log(extractDataFromBody(body, /Monto\s*(.*)/));
  console.log(extractDataFromBody(body, /Referencia\s*(.*)/));
  console.log(extractDataFromBody(body, /Mensaje\s*(.*)/));
  //console.log();


  await BcpNotifications.create({
    operationType: extractDataFromBody(body, /Tipo de Operacion\s*(.*)/),
    operationDate: emailDate,
    operationNumber: extractDataFromBody(body, /Número de operación\s*(.*)/),
    orderingCompany: extractDataFromBody(body, /Empresa ordenante\s*(.*)/),
    account: extractDataFromBody(body, /Cuenta\s*(.*)/),
    accountType: extractDataFromBody(body, /Tipo de cuenta\s*(.*)/),
    beneficiary: extractDataFromBody(body, /Beneficiario\s*(.*)/),
    destinationAccount: extractDataFromBody(body, /Cuenta\s*(.*)/),
    amount: extractDataFromBody(body, /Monto\s*(.*)/),
    reference: extractDataFromBody(body, /Referencia\s*(.*)/),
    message: null,
  });
};


module.exports = {
  processBcpAlertsEmail,
  processBcpNotificationsEmail,
};
