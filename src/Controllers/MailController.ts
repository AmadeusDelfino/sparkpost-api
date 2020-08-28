import MailService from "../Services/Mail/MailService"
import express from 'express'
const service = new MailService()

class MailController {
    public path: string = '/email'
    public router = express.Router()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.post('/send', this.sendMail)
    }

    async sendMail(request: express.Request, response: express.Response) {
        console.log(this)
        const config = {
            to: request.body.to,
            subject: request.body.subject,
            message: request.body.message,
        }
        const sendEmailResponse = await service
            .send(config)
            .catch(reason => console.log('email-failed: ' + reason.toString()))

        return response.json(sendEmailResponse)
    }
}

export default MailController