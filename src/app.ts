import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { userRouter } from './app/module/user.router'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application router
app.use('/api/v1/users', userRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('work done')
})

export default app
