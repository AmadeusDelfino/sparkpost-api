import express from 'express'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'

class App {
    public app: express.Application
    public port: number

    constructor(controllers: Object[], port: number) {
        this.app = express()
        this.port = port

        this.initializeDotenv()
        this.initializeMiddleware()
        this.initializeControllers(controllers)
    }

    private initializeMiddleware() {
        this.app.use(bodyParser.json())
        this.app.use(express.urlencoded({extended: false}))
    }

    private initializeDotenv() {
        const {error} = dotenv.config()
        if (error != undefined) {
            console.log('DotEnv - import error: ' + error.message)
        }
    }

    private initializeControllers(controllers: Object[]) {
        // @ts-ignore
        controllers.map((controller) => new controller).forEach(({path, router}) => this.app.use(path, router))
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`)
        })
    }
}

export default App