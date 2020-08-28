import MailService from "../Services/Mail/MailService"
import express from 'express'

class MailController {
    public path: string = '/email'
    public router = express.Router()
    public service = new MailService()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.post(this.path + '/send', this.sendMail)
    }

    async sendMail(request: express.Request, response: express.Response) {
        const config = {
            to: request.body.to,
            subject: request.body.subject,
            message: request.body.message,
        }
        const sendEmailResponse = await this
            .service
            .send(config)
            .catch(reason => console.log('email-failed: ' + reason.toString()))

        return response.json(sendEmailResponse)
    }
}

export default MailController