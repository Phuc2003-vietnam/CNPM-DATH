const swagger_doc = {
	openapi: '3.0.0',
	info: {
		title: 'Student Smart Printing System  API',
		version: '1.0.0',
	},
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				in: 'header',
				name: 'Authorization',
				description: 'Bearer Token',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
		},
	},
	security: [
		{
			bearerAuth: [],
		},
	],
	paths: {
		'/v1/user/login': {
			post: {
				summary: 'Login',
				tags: ['User'],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									email: {
										type: 'string',
										example: 'phuc@gmail.com',
									},
									password: {
										type: 'string',
										example: '1',
									},
								},
							},
						},
					},
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										data: {
											type: 'object',
											properties: {
												accessToken: {
													type: 'string',
												},
												refreshToken: {
													type: 'string',
												},
											},
										},
									},
								},
							},
						},
					},
					401: {
						description: 'Email not correct',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										message: {
											type: 'string',
											example: 'Email not correct',
										},
									},
								},
							},
						},
					},
					404: {
						description: 'Password not correct',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										message: {
											type: 'string',
											example: 'Password not correct',
										},
									},
								},
							},
						},
					},
				},
			},
		},
		'/v1/user/register': {
			post: {
				summary: 'Register a new user ONLY FOR TESTING',
				tags: ['User'],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									email: {
										type: 'string',
									},
									password: {
										type: 'string',
									},
									role: {
										type: 'string',
									},
									mssv: {
										type: 'string',
									},
									firstName: {
										type: 'string',
									},
									lastName: {
										type: 'string',
									},
									balance: {
										type: 'integer',
									},
									facility: {
										type: 'string',
									},
									department: {
										type: 'string',
									},
									room: {
										type: 'string',
									},
								},
							},
							examples: {
								Student: {
									value: {
										email: 'user1@example.com',
										password: 'password1',
										role: 'student',
										firstName: 'fname',
										lastName: 'lname',
										balance: 10,
										mssv: '2144452',
									},
								},
								Staff: {
									value: {
										email: 'user1@example.com',
										password: 'password1',
										role: 'student',
										firstName: 'fname',
										lastName: 'lname',
										location: {
											facility: 'CS1',
										},
									},
								},
								Spso: {
									value: {
										email: 'user1@example.com',
										password: 'password1',
										role: 'student',
										firstName: 'fname',
										lastName: 'lname',
										location: {
											facility: 'CS1',
											department: 'H3',
											room: '202',
										},
									},
								},
							},
						},
					},
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										data: {
											type: 'object',
											properties: {
												email: {
													type: 'string',
												},
												password: {
													type: 'string',
												},
												role: {
													type: 'string',
												},
												mssv: {
													type: 'string',
												},
												firstName: {
													type: 'string',
												},
												lastName: {
													type: 'string',
												},
												balance: {
													type: 'integer',
												},
												location: {
													type: 'object',
													properties: {
														facility: {
															type: 'string',
														},
														department: {
															type: 'string',
														},
														room: {
															type: 'string',
														},
													},
												},
											},
										},
									},
								},
							},
						},
					},
					403: {
						description: 'Email has been registered',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										message: {
											type: 'string',
											example: 'The email has been registered',
										},
									},
								},
							},
						},
					},
				},
			},
		},
		'/v1/user/refresh-access-token': {
			post: {
				summary: 'Refresh access token',
				tags: ['User'],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									refreshToken: {
										type: 'string',
										example: 'string',
									}
								},
							},
						},
					},
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										data: {
											type: 'object',
											properties: {
												accessToken: {
													type: 'string',
												},
												refreshToken: {
													type: 'string',
												},
											},
										},
									},
								},
							},
						},
					},
					401: {
						description: 'Wrong refresh token',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										message: {
											type: 'string',
											example: 'Unauthorized',
										},
									},
								},
							},
						},
					},
				},
			},
		},
		'/v1/spso/printer': {
			post: {
				summary: 'Add a new printer',
				tags: ['Spso'],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									printerId: {
										type: 'string',
										example: 'H1202',
									},
									status: {
										type: 'boolean',
										example: 1,
									},
									description: {
										type: 'string',
										example: 'abcdxyz',
									},
									brand: {
										type: 'string',
										example: 'Ford',
									},
									model: {
										type: 'string',
										example: 'X1',
									},
									location: {
										type: 'object',
										properties: {
											facility: {
												type: 'string',
												example: 'CS!',
											},
											department: {
												type: 'string',
												example: 'H1',
											},
											room: {
												type: 'string',
												example: '202',
											},
										},
									},
								},
							},
						},
					},
				},
				responses: {
					200: {
						description: 'OK',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										data: {
											type: 'object',
											properties: {
												printerId: {
													type: 'string',
													example: 'H1202',
												},
												status: {
													type: 'boolean',
													example: 1,
												},
												description: {
													type: 'string',
													example: 'abcdxyz',
												},
												brand: {
													type: 'string',
													example: 'Ford',
												},
												model: {
													type: 'string',
													example: 'X1',
												},
												location: {
													type: 'object',
													properties: {
														facility: {
															type: 'string',
															example: 'CS!',
														},
														department: {
															type: 'string',
															example: 'H1',
														},
														room: {
															type: 'string',
															example: '202',
														},
													},
												},
											},
										},
									},
								},
							},
						},
					},
					403: {
						description: 'The ID has already bean used',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										message: {
											type: 'string',
											example: 'The ID has already bean used',
										},
									},
								},
							},
						},
					},
				},
			},
		},
	},
}
export default swagger_doc
