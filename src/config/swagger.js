import swaggerDocument from './swagger.json' assert {type: 'json'}

import swaggerUi from 'swagger-ui-express'

const configSwagger = (express_app) => {
	express_app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

export default configSwagger
