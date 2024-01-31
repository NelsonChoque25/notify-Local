const BcpAlert = require("../models/teleservices/BcpAlert");
const BcpNotification = require("../models/teleservices/BcpNotification");
const InterbankCompany = require("../models/teleservices/InterbankCompany");
const BcpOwnAccount = require("../models/teleservices/BcpOwnAccount");
const cheerio = require('cheerio');
const CncBbva = require("../models/teleservices/CncBbva");
const { parse } = require('date-fns');

const { extractDataFromBody } = require("../utils/emailUtils");

// Procesar correos de BCP Alertas
const processBcpAlertsEmail = async (parsedEmail, emailDate) => {
  const body = parsedEmail.text;

  const amountString = extractDataFromBody(body, /Importe: S\/(.*)/);
  const amountNumeric = parseFloat(amountString.replace(',', ''));

  await BcpAlert.create({
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

  const amountString = extractDataFromBody(body, /S\/(.*)/);
  const amountNumeric = parseFloat(amountString.replace(',', ''));

  await BcpNotification.create({
    operationType: extractDataFromBody(body, /Tipo de operación\s*(.*)/),
    operationDate: emailDate,
    operationNumber: extractDataFromBody(body, /Número de operación\s*(.*)/),
    orderingCompany: extractDataFromBody(body, /Empresa ordenante\s*(.*)/),
    account: extractDataFromBody(body, /Cuenta\s*(.*)/),
    accountType: extractDataFromBody(body, /Tipo de cuenta\s*(.*)/),
    beneficiary: extractDataFromBody(body, /Beneficiario\s*(.*)/),
    destinationAccount: cuenta2,
    amount: amountNumeric,
    reference: extractDataFromBody(body, /Referencia\s*(.*)/),
    message: startsWithKeyword ? null : messageType,
  });
};

// Procesar correos de Interbank Alertas
const processInterbankCompanysEmail = async (parsedEmail, emailDate) => {
  const body = parsedEmail.text;

  const amountString = extractDataFromBody(body, /S\/(.*)/);
  const amountNumeric = parseFloat(amountString.replace(',', ''));

  await InterbankCompany.create({
    orderingCompany: extractDataFromBody(body, /De:\s*(.*)/),
    beneficiary: extractDataFromBody(body, /Para:\s*(.*)/),
    accountCharge: extractDataFromBody(body, /Cuenta de cargo:\s*(.*)/),
    accountDestination: extractDataFromBody(body, /Cuenta de destino:\s*(.*)/),
    status: extractDataFromBody(body, /Estado:\s*(.*)/),
    numberApplication: extractDataFromBody(body, /Número de solicitud:\s*(.*)/),
    amount: amountNumeric,
    dateTime: emailDate,
  });
};

// Procesar correos de BCP Alertas Cuentas Propias y Terceras
const processBcpOwnCompanyEmail = async (parsedEmail, emailDate) => {
  const body = parsedEmail.text;

  //console.log(body);
/*const account1 = body.match(/\*{4}\s*(\d+)/);
const simb = "****";
const sentAccount = simb + account1[1];
const fromAccount = simb + account1[2];
*/
const match = body.match(/S\/(.*)/);
const simbolo = "S/";
const amount1= match[1] ;

const amountString = extractDataFromBody(body, /S\/(.*)/);
const amountNumeric = parseFloat(amountString.replace(',', ''));


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

  await BcpOwnAccount.create({
    sendsTo: extractDataFromBody(body, /Enviado a\s*(.*)/),
    accountSendsTo: cuenta1,
    from: extractDataFromBody(body, /Desde\s*(.*)/),
    accountFrom: cuenta2,
    channel: extractDataFromBody(body, /Canal\s*(.*)/),
    numberOperation: extractDataFromBody(body, /Número de operación\s*(.*)/),
    amount: amountNumeric,
    dateTime: emailDate,
  });
};

const processCNCBBVAEmail = async (parsedEmail, emailDate) => {
  const body = parsedEmail.html;

  let plainTextBody;
      
  const $ = cheerio.load(parsedEmail.html);
  plainTextBody = $('body').text();
  
  //console.log("Subject:", subject);
  //console.log("Body:", plainTextBody);

  //const amountString = extractDataFromBody(body, /Importe: S\/(.*)/);
  const amountString = extractDataFromBody(plainTextBody, /por lacantidad  de \s*(.*)/);
  const amountNumeric = parseFloat(amountString.replace(',', ''));
  const fecha = extractDataFromBody(plainTextBody, /Atentamente,BBVA\s*(.*)/);

  const regex = /^Mensaje No: \d+-\d+([A-Z\s]+?) -/;

  // Aplicar la expresión regular al mensaje
  const match = plainTextBody.match(regex);

  const cliente = match[1];
  //console.log(fecha);

  const formatoEntrada = "yyyy-MM-dd - HH.mm.ss";
  const fechaObjeto = parse(fecha, formatoEntrada, new Date());


  await CncBbva.create({
    amount: amountNumeric,
    orderingCompany: cliente,
    dateTime: fechaObjeto,
  });

};


module.exports = {
  processBcpAlertsEmail,
  processBcpNotificationsEmail,
  processInterbankCompanysEmail,
  processBcpOwnCompanyEmail,
  processCNCBBVAEmail,
};
