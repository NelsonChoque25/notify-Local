const BcpAlerts = require("../models/teleservices/BcpAlert");
const BcpNotifications = require("../models/teleservices/BcpNotifications");
const InterbankCompanys = require("../models/teleservices/InterbankCompany");
const BcpOwnAccounts = require("../models/teleservices/BcpOwnAccounts");

const { extractDataFromBody } = require("../utils/emailUtils");

// Procesar correos de BCP Alertas
const processBcpAlertsEmail = async (parsedEmail, emailDate) => {
  const body = parsedEmail.text;

  const amountString = extractDataFromBody(body, /Importe: S\/(.*)/);
  const amountNumeric = parseFloat(amountString.replace(',', ''));

  await BcpAlerts.create({
    orderingCompany: extractDataFromBody(body, /Empresa ordenante:\s*(.*)/),
    beneficiary: extractDataFromBody(body, /Beneficiario:\s*(.*)/),
    account: extractDataFromBody(body, /N° de cuenta:\s*(.*)/),
    amount: amountNumeric,
    message: extractDataFromBody(body, /Mensaje:\s*(.*)/),
    dateTime: emailDate,
  });
};

// Procesar correos de BCP Notificaciones
const processBcpNotificationsEmail = async (parsedEmail, emailDate) => {
  const body = parsedEmail.text;
  const cuentaRegex = /Cuenta\s*([\d-]+)/g;
  const messageType = extractDataFromBody(body, /Mensaje\s*(.*)/).trim();
  const startsWithKeyword = /Si Ud\. es cliente de Telecrédito/.test(
    messageType
  );
  //const isMessageStartsWithKeyword = messageType && messageType.startsWith("Si Ud. es cliente de Telecrédito");
  let match, cuenta1, cuenta2;

  while ((match = cuentaRegex.exec(body)) !== null) {
    if (!cuenta1) {
      cuenta1 = match[1];
    } else {
      cuenta2 = match[1];
      break; 
    }
  }

  console.log(extractDataFromBody(body, /Tipo de operación\s*(.*)/));
  console.log(emailDate);
  console.log(extractDataFromBody(body, /Número de operación\s*(.*)/));
  console.log(extractDataFromBody(body, /Empresa ordenante\s*(.*)/));
  console.log(extractDataFromBody(body, /Cuenta\s*(.*)/));
  console.log(cuenta1);
  console.log(extractDataFromBody(body, /Tipo de cuenta\s*(.*)/));
  console.log(extractDataFromBody(body, /Beneficiario\s*(.*)/));
  console.log(extractDataFromBody(body, /Cuenta\s*(.*)/));
  console.log(cuenta2);
  console.log(extractDataFromBody(body, /Monto\s*(.*)/));
  console.log(extractDataFromBody(body, /Referencia\s*(.*)/));
  console.log(startsWithKeyword ? null : messageType);

  console.log("Mensaje:", messageType);
  console.log("Comienza con Palabra Clave:", startsWithKeyword);
  //console.log();

  await BcpNotifications.create({
    operationType: extractDataFromBody(body, /Tipo de operación\s*(.*)/),
    operationDate: emailDate,
    operationNumber: extractDataFromBody(body, /Número de operación\s*(.*)/),
    orderingCompany: extractDataFromBody(body, /Empresa ordenante\s*(.*)/),
    account: extractDataFromBody(body, /Cuenta\s*(.*)/),
    accountType: extractDataFromBody(body, /Tipo de cuenta\s*(.*)/),
    beneficiary: extractDataFromBody(body, /Beneficiario\s*(.*)/),
    destinationAccount: cuenta2,
    amount: extractDataFromBody(body, /Monto\s*(.*)/),
    reference: extractDataFromBody(body, /Referencia\s*(.*)/),
    message: startsWithKeyword ? null : messageType,
  });
};

// Procesar correos de Interbank Alertas
const processInterbankCompanysEmail = async (parsedEmail, emailDate) => {
  const body = parsedEmail.text;

  await InterbankCompanys.create({
    orderingCompany: extractDataFromBody(body, /De:\s*(.*)/),
    beneficiary: extractDataFromBody(body, /Para:\s*(.*)/),
    accountCharge: extractDataFromBody(body, /Cuenta de cargo:\s*(.*)/),
    accountDestination: extractDataFromBody(body, /Cuenta de destino:\s*(.*)/),
    status: extractDataFromBody(body, /Estado:\s*(.*)/),
    numberApplication: extractDataFromBody(body, /Número de solicitud:\s*(.*)/),
    amount: extractDataFromBody(body, /Monto:\s*(.*)/),
    dateTime: emailDate,
  });
};

// Procesar correos de BCP Alertas Cuentas Propias y Terceras
const processBcpOwnCompanyEmail = async (parsedEmail, emailDate) => {
  const body = parsedEmail.text;

  //console.log(body);
const account1 = body.match(/\*{4}\s*(\d+)/);
const simb = "****";
const sentAccount = simb + account1[1];
const fromAccount = simb + account1[2];

const match = body.match(/S\/(.*)/);
const simbolo = "S/";
const amount1=  simbolo + match[1] ;
console.log (amount1);
console.log ("------");
//console.log(account1);
console.log(sentAccount);
console.log ("------");
console.log(fromAccount);

const cuentaRegex = /\*{4}\s*(\d+)/g;
let match2, cuenta1, cuenta2;

while ((match2 = cuentaRegex.exec(body)) !== null) {
  if (!cuenta1) {
    cuenta1 = match2[1];
  } else {
    cuenta2 = match2[1];
    break; 
  }
}
console.log(cuenta1);
console.log(cuenta2);

//console.log('Desde:', desde)
/*
  await BcpOwnAccounts.create({
    sendsTo: extractDataFromBody(body, /Enviado a\s*(.*)/),
    from: extractDataFromBody(body, /Desde\s*(.*)/),
    channel: extractDataFromBody(body, /Canal\s*(.*)/),
    numberOperation: extractDataFromBody(body, /Número de operación\s*(.*)/),
    amount: amount1,
    dateTime: emailDate,
  });*/
};

module.exports = {
  processBcpAlertsEmail,
  processBcpNotificationsEmail,
  processInterbankCompanysEmail,
  processBcpOwnCompanyEmail,
};
