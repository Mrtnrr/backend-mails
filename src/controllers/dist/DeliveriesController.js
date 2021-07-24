"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// libreria para controlar las rutas de las apis
// route => trabaja el protocolo de salida http o https
/**
 * request=> se encarga de gestionar las solicitudes que vienen en el path(urlapi)
 * reponse=> regresa las respuestas
 */
var express_1 = require("express");
// modelo de la tabla deliveries
var Delivery_1 = require("../models/Delivery");
// se importa una funcion que regresa datos de prueba para cargar en base de datos
var test_1 = require("../config/test");
//libreria para trabajar fechas y formatos en relación
var moment_1 = require("moment");
//libreria de envio de correo que se instala por automatico
var nodemailer_1 = require("../config/nodemailer");
// retorna la plantilla de html del correo a enviar junto con sus paramentros
var templatesEmails_1 = require("../emails/templatesEmails");
var DeliveriesController = /** @class */ (function () {
    function DeliveriesController() {
    }
    DeliveriesController.prototype.router = function () {
        var router = express_1.Router();
        router.post('/:email', this.verifyEntrega);
        router.get('/new_data', this.createDataDemo);
        return router;
    };
    DeliveriesController.prototype.verifyEntrega = function (req, res) {
        return __awaiter(this, void 0, Promise, function () {
            var email, user, data, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        email = req.params.email;
                        // si no exite el email retorna un estatus para solicitarlo
                        if (!email)
                            return [2 /*return*/, res.status(400).json({ message: 'email is required' })
                                // busca dentro de la tabla deliveries el email que se esta recibiendo
                            ];
                        return [4 /*yield*/, Delivery_1["default"].find({ email: email })
                            // si hay dos coincidencias retorna un email de solicitud rechazada
                            // porque sabemos que ya existen en el servidor
                        ];
                    case 1:
                        user = _a.sent();
                        if (!(user.length == 2)) return [3 /*break*/, 3];
                        data = {
                            email: email,
                            note: "CAMCELACION DE EVENTO",
                            status: "Solicitud Cancelada, ya tienes dos eventos creados espera a que se culmine alguno.",
                            date: moment_1["default"]().format("YYYY-MM-DD HH:mm")
                        };
                        // la funcion transporter sendMail sirve para mandar el correo y este depende de la libreria
                        return [4 /*yield*/, nodemailer_1.transporter.sendMail({
                                from: "\"PAZ Y BIEN | TALLER ESCUELA DE CARPINTER\u00CDA ALERTA \uD83D\uDC7B\" <" + email + ">",
                                to: email,
                                subject: "Ya tienes dos eventos creados ✔",
                                html: templatesEmails_1.emailOne(data)
                            })];
                    case 2:
                        // la funcion transporter sendMail sirve para mandar el correo y este depende de la libreria
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        data = {
                            email: email,
                            note: "EVENTO CREADO",
                            status: "Solicitud Exitosa",
                            date: moment_1["default"]().format("YYYY-MM-DD HH:mm")
                        };
                        return [4 /*yield*/, nodemailer_1.transporter.sendMail({
                                from: "\"PAZ Y BIEN | TALLER ESCUELA DE CARPINTER\u00CDA ALERTA \uD83D\uDC7B\" <" + email + ">",
                                to: email,
                                subject: "Tu evento se a creado con exito ✔",
                                html: templatesEmails_1.emailOne(data)
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, res.status(200).json({ message: 'email enviado' })];
                    case 6:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, res.status(400).json({ message: 'error to send email' })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    DeliveriesController.prototype.createDataDemo = function (req, res) {
        return __awaiter(this, void 0, Promise, function () {
            var total, entregas, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, Delivery_1["default"].find({})
                            // si no exiten datos crea los datos de prueba que estan en el archivo config/test.ts
                        ];
                    case 1:
                        total = _a.sent();
                        if (!(total.length === 0)) return [3 /*break*/, 3];
                        entregas = test_1.dataDemo();
                        return [4 /*yield*/, Delivery_1["default"].insertMany(entregas)
                            // si existe un error al crear los documentos retorna una respuesta
                        ];
                    case 2:
                        result = _a.sent();
                        // si existe un error al crear los documentos retorna una respuesta
                        if (!result)
                            return [2 /*return*/, res.status(400).json({ message: 'error to create data' })
                                //si se crearon los datos y como de inicio la variable total es igual a cero o []vacio  asignale 
                                // la variable result que tiene los nuevos registros
                            ];
                        //si se crearon los datos y como de inicio la variable total es igual a cero o []vacio  asignale 
                        // la variable result que tiene los nuevos registros
                        else
                            total = result;
                        _a.label = 3;
                    case 3: 
                    //if total tiene por lo menos un dato regresa la respuesta de manera exitosa
                    return [2 /*return*/, res.status(200).json({ message: 'exito', total: total })];
                    case 4:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, res.status(400).json({ message: "error trying insert entrega", error: error_2 })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return DeliveriesController;
}());
exports["default"] = DeliveriesController;
