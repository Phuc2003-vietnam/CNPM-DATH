import swaggerUi from 'swagger-ui-express'
import swaggerDoc from './swagger_doc.js'

const configSwagger = (express_app) => {
	express_app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
}

export default configSwagger
