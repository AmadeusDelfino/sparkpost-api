const SparkPost = require('sparkpost')
//Create an env var as SPARKPOST_API_KEY
let client: any
class MailService {
    constructor() {
        client = new SparkPost(process.env.SPARKPOST_API_KEY)
    }
    // @ts-ignore
    send({to, subject, message}): Promise<any> {
        console.log(to.split(',').map((email: string) =>  {return {address: email}}))
        const sandbox = process.env.SPARKPOST_SANDBOX || false
        return client.transmissions.send({
            options: {
                sandbox: sandbox
            },
            content: {
                from: process.env.MAIL_FROM || 'amadeus@telep.com.br',
                subject: subject,
                html: message,
            },
            recipients: to.split(',').map((email: string) =>  {return {address: email}})
        })
    }
}

export default MailService