// libreria para controlar las rutas de las apis
// route => trabaja el protocolo de salida http o https
/**
 * request=> se encarga de gestionar las solicitudes que vienen en el path(urlapi)
 * reponse=> regresa las respuestas
 */
import { Router, Request, Response } from 'express';

// modelo de la tabla deliveries
import DeliveryModel from '../models/Delivery';

// se importa una funcion que regresa datos de prueba para cargar en base de datos
import {dataDemo} from '../config/test';

//libreria para trabajar fechas y formatos en relación
import moment from 'moment';

//libreria de envio de correo que se instala por automatico
import { transporter } from '../config/nodemailer';

// retorna la plantilla de html del correo a enviar junto con sus paramentros
import {emailOne} from '../emails/templatesEmails';

export default class DeliveriesController {

    public router(): Router {
        let router = Router()

        router.post('/:email', this.verifyEntrega)

        router.get('/new_data', this.createDataDemo)

        return router
    }

    private async verifyEntrega(req: Request, res: Response): Promise<Response>{
        try {
            // recibe el un email
         let { email } = req.params;
         // si no exite el email retorna un estatus para solicitarlo
         if(!email) return res.status(400).json({ message: 'email is required'})
        
         // busca dentro de la tabla deliveries el email que se esta recibiendo
        let user = await DeliveryModel.find({ email: email})
        // si hay dos coincidencias retorna un email de solicitud rechazada
        // porque sabemos que ya existen en el servidor
        if(user.length == 2){
            //crear una variable tipo objeto con datos a mostrar en el email que se envia
            let data = {
              email,
              note: "CAMCELACION DE EVENTO",
              status: "Solicitud Cancelada, ya tienes dos eventos creados espera a que se culmine alguno.",
              date: moment().format("YYYY-MM-DD HH:mm"),// da formato a la fecha
            };
            // la funcion transporter sendMail sirve para mandar el correo y este depende de la libreria
            await transporter.sendMail({
              from: `"PAZ Y BIEN | TALLER ESCUELA DE CARPINTERÍA ALERTA 👻" <${email}>`, // sender address
              to: email, // list of receivers
              subject: "Ya tienes dos eventos creados ✔", // Subject line
              html: emailOne(data), // html body plantilla creada en el folder emails/templatesEmails
            });
        }
        /** 
         * va a enviar un correo con mensaje exitoso de envento creado
         * este se va seguir enviando al correo que se agregue siempre y
         * cuando este no se este controlando en la base de datos (llevando su registro del email)
         */
        else{
            let data = {
                email,
                note: "EVENTO CREADO",
                status: "Solicitud Exitosa",
                date: moment().format("YYYY-MM-DD HH:mm"),
            };

            await transporter.sendMail({
                from: `"PAZ Y BIEN | TALLER ESCUELA DE CARPINTERÍA ALERTA 👻" <${email}>`, // sender address
                to: email, // list of receivers
                subject: "Tu evento se a creado con exito ✔", // Subject line
                html: emailOne(data), // html body
            });
        }
        
          return res.status(200).json({message:'email enviado'})
            
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: 'error to send email'})
        }
    }

    private async createDataDemo(req: Request, res: Response): Promise<Response> {
        try {

            // verifica si hay datos en la tabla de bd
            let total = await DeliveryModel.find({})
            // si no exiten datos crea los datos de prueba que estan en el archivo config/test.ts
            if(total.length === 0){
                //guarda los datos de prueba en la variable entregas
                let entregas = dataDemo()
                // guarda los datos que estan en un formato array en la tabla de deliveries
                let result = await DeliveryModel.insertMany(entregas)
                // si existe un error al crear los documentos retorna una respuesta
                if(!result) return res.status(400).json({ message: 'error to create data'})
                //si se crearon los datos y como de inicio la variable total es igual a cero o []vacio  asignale 
                // la variable result que tiene los nuevos registros
                else total = result
            }
            //if total tiene por lo menos un dato regresa la respuesta de manera exitosa
            return res.status(200).json({ message:'exito', total})

        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: `error trying insert entrega`, error })
        }
    }

}