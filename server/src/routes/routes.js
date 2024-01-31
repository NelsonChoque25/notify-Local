const eventController = require('../app/controllers/alertsCctv/eventController'); 
const CustomThemeController = require('../app/controllers/CustomThemeController');
const emailCctv = require('../app/controllers/alertsCctv/emailControllerCctv');
const testController = require('../app/controllers/alertsCctv/testController');
const emailTs = require('../app/controllers/teleservices/emailControllerTs');
const eventControllerTs = require('../app/controllers/teleservices/eventControllerTs'); 
const sendEmailController = require('../app/controllers/sendEmailController');
const userController = require('../app/controllers/userController');
const authController = require('../app/controllers/authController');
const routes = require('express').Router();

// Middlewares
const { createUserSchema, updateUserSchema } = require('../app/validators/userSchema');
const { validateSchema } = require('../app/middleware/validateSchema');
const { loginSchema } = require("../app/validators/authSchema");
const authRequired = require('../app/middleware/validateToken');


routes.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

routes.get('/api', (req, res) => {
  res.send('API');
});

/**
 * @swagger
 * tags:
 * name: Email
 * description: Email API
 */
// Email CCTV routes
routes.get('/process-emails-cctv', authRequired, emailCctv.readAndProcessUnreadEmails);
routes.get('/tests/samsung/counts', authRequired, testController.getCountOfTestSamsung);
routes.get('/events/samsung', authRequired, eventController.getEventsSamsung);
routes.get('/tests/hv/counts', authRequired, testController.getCountOfTestHv);
routes.get('/tests/samsung', authRequired, testController.getTestSamsung);
routes.get('/events/hv', authRequired, eventController.getEventsHv);
routes.get('/tests/hv', authRequired, testController.getTestHv);
routes.get('/events/samsung/last', authRequired, eventController.getLastEventsSamsung);
routes.get('/events/hv/last', authRequired, eventController.getLastEventsHv);
routes.get('/tests/hv/duplicates', authRequired, testController.removeDuplicateTestHv);


// Email Send Email routes
routes.post('/send-email', authRequired, async (req, res) => {
  const { recipient, subject, message } = req.body;
  const result = await sendEmailController.sendEmail(recipient, subject, message);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ error: result.message });
  }
});


/**
 * @swagger
 * tags:
 * name: Email
 * description: Email API
 */
 // Email Teleservices routes
 routes.get('/process-emails-ts', authRequired, emailTs.readAndProcessUnreadEmails);
 routes.get('/events/bcp-alerts', authRequired, eventControllerTs.getBcpAlert);
 routes.get('/events/bcp-notification', authRequired, eventControllerTs.getBcpNotification);
 routes.get('/events/bcp-own-account', authRequired, eventControllerTs.getBcpOwnAccount);
 routes.get('/events/cnc-bbva', authRequired, eventControllerTs.getCncBbva);
 routes.get('/events/interbank-company', authRequired, eventControllerTs.getInterbankCompany);

 routes.get('/events/bcp-filter', authRequired, eventControllerTs.getBcpAlertByFilters);

/**
 * @swagger
 * tags:
 * name: Users
 * description: Users API
 */
// Users
routes.post('/users', validateSchema(createUserSchema), authRequired, userController.createUser);
routes.put('/users/:id', validateSchema(updateUserSchema), authRequired, userController.updateUser);
routes.get('/users', authRequired, userController.getAllUsers);
routes.get('/users/:id', authRequired, userController.getUser);
routes.delete('/users/:id', authRequired, userController.deleteUser);
routes.get('/users/:userId/theme', authRequired, CustomThemeController.getTheme);
routes.put('/users/:userId/theme', authRequired, CustomThemeController.updateTheme);

/**
 * @swagger 
 * tags:
 * name: Auth
 * description: Auth API
 */
// Auth
routes.post("/auth/login", validateSchema(loginSchema), authController.Login);
routes.post("/auth/logout", authController.Logout);
routes.get("/profile", authRequired, authController.profile);
routes.get("/auth/verify-token", authController.verifyToken);


module.exports = routes;
