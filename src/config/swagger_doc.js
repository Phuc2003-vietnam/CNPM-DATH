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
									classes: {
										type: 'string',
									},
									major: {
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
										email: 'student1@gmail.com',
										password: '1',
										role: 'student',
										firstName: 'fname',
										lastName: 'lname',
										balance: 100,
										mssv: '2144452',
										classes: 'MT21KH12',
										major: 'Khoa hoc va ky thuat may tinh',
									},
								},
								Staff: {
									value: {
										email: 'staff1@gmail.com',
										password: '1',
										role: 'staff',
										firstName: 'fname',
										lastName: 'lname',
										location: {
											facility: 'CS1',
										},
									},
								},
								Spso: {
									value: {
										email: 'spso1@gmail.com',
										password: '1',
										role: 'spso',
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
												classes: {
													type: 'string',
												},
												major: {
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
		'/v1/user/information/': {
			get: {
				tags: ['User'],
				summary: 'Get infomation of user',
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
												printingLog: {
													type: 'array',
													items: 'string',
													example: [
														'asduhui12h31xcxc',
														'12dhuaschxd213',
													],
												},
												updated_at: {
													type: 'string',
													format: 'date-time',
													example: '2023-07-23T16:47:49.000Z',
												},
												created_at: {
													type: 'string',
													format: 'date-time',
													example: '2023-07-23T16:47:49.000Z',
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
												example: 'CS1',
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
		'/v1/spso//printer': {
			put: {
				summary: 'Edit a printer',
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
												example: 'CS1',
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
					404: {
						description: 'The printerID is not found',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										message: {
											type: 'string',
											example: 'The printerID is not found',
										},
									},
								},
							},
						},
					},
				},
			},
		},
		'/v1/spso/printers/': {
			get: {
				tags: ['Spso'],
				summary: 'Filter and return list of printers',
				parameters: [
					{
						name: 'status',
						in: 'query',
						description:
							'activated : 1 , deactivated : 0, handle random status input beside 0,1 : 100',
						required: true,
						schema: {
							enum: [0, 1, 100],
							type: 'integer',
							default: 1,
						},
					},
					{
						name: 'facility',
						in: 'query',
						description: 'handle random facility input:100',
						required: true,
						schema: {
							enum: ['CS1', 'CS2', 'all', '100'],
							type: 'string',
							default: 'all',
						},
					},
					{
						name: 'sortDirection',
						in: 'query',
						description:
							'Descending : -1, Ascending : 1, handle random sortDirection input beside -1,1:100',
						required: true,
						schema: {
							enum: [-1, 1, 100],
							type: 'integer',
							default: -1,
						},
					},
					{
						name: 'searchField',
						in: 'query',
						type: 'string',
						description: 'Search printerID',
						required: false,
					},
					{
						name: 'per_page',
						in: 'query',
						type: 'integer',
						description: 'Number of items per page',
						required: false,
					},
					{
						name: 'current_page',
						in: 'query',
						type: 'integer',
						description: 'Current page number',
						required: false,
					},
				],
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
												per_page: {
													type: 'integer',
													example: 20,
												},
												current_page: {
													type: 'integer',
													example: 1,
												},
												total_pages: {
													type: 'integer',
													example: 1,
												},
												totalPrinter: {
													type: 'integer',
													example: 5,
												},
												activatedPrinter: {
													type: 'integer',
													example: 1,
												},
												printers: {
													type: 'array',
													items: {
														type: 'object',
														properties: {
															location: {
																type: 'object',
																properties:
																	{
																		facility:
																			{
																				type: 'string',
																				example: 'CS2',
																			},
																		department:
																			{
																				type: 'string',
																				example: 'H1',
																			},
																		room: {
																			type: 'string',
																			example: '202',
																		},
																	},
															},
															printingLog: {
																type: 'array',
																items: 'string',
																example: [
																	'asduhui12h31xcxc',
																	'12dhuaschxd213',
																],
															},
															_id: {
																type: 'string',
																example: 'fa',
															},
															printerId: {
																type: 'string',
																example: 'H1101',
															},
															status: {
																type: 'Number',
																example: '1',
															},
															description: {
																type: 'string',
																example: 'This is a printer',
															},
															brand: {
																type: 'string',
																example: 'Ford',
															},
															model: {
																type: 'string',
																example: 'XYZ',
															},
															activatedTime:
																{
																	type: 'string',
																	format: 'date-time',
																	example: '2023-07-23T16:47:49.000Z',
																},
															updated_at: {
																type: 'string',
																format: 'date-time',
																example: '2023-07-23T16:47:49.000Z',
															},
															created_at: {
																type: 'string',
																format: 'date-time',
																example: '2023-07-23T16:47:49.000Z',
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
					},
				},
			},
		},
		'/v1/student/payment': {
			post: {
				summary: 'Confirm the payment to create paymemnt',
				tags: ['Student'],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									money: {
										type: 'integer',
										example: 10000,
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
												stt: {
													type: 'integer',
													example: '1',
												},
												shortContent: {
													type: 'string',
													example: 'SSPS',
												},
												money: {
													type: 'integer',
													example: 10000,
												},
												paidMoney: {
													type: 'integer',
													example: 0,
												},
												leftMoney: {
													type: 'integer',
													example: 10000,
												},
												endDate: {
													type: 'string',
													example: '2023-11-16T17:08:00.000',
												},
												user_id: {
													type: 'string',
													example: '6555983eddab67d1ccad2cf9',
												},
												_id: {
													type: 'string',
													example: '65564ce62268f1d6ec017e91',
												},
												updated_at: {
													type: 'string',
													format: 'date-time',
													example: '2023-07-23T16:47:49.000Z',
												},
												created_at: {
													type: 'string',
													format: 'date-time',
													example: '2023-07-23T16:47:49.000Z',
												},
											},
										},
									},
								},
							},
						},
					},
					400: {
						description: 'The money value is wrong <0',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										message: {
											type: 'string',
											example: 'Invalid money value. Please check whether it is larger than 0',
										},
									},
								},
							},
						},
					},
				},
			},
		},
		'/v1/student/payments/': {
			get: {
				tags: ['Student'],
				summary: 'Get list of payments of a specific user',
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
												stt: {
													type: 'integer',
													example: '1',
												},
												shortContent: {
													type: 'string',
													example: 'SSPS',
												},
												money: {
													type: 'integer',
													example: 10000,
												},
												paidMoney: {
													type: 'integer',
													example: 0,
												},
												leftMoney: {
													type: 'integer',
													example: 10000,
												},
												endDate: {
													type: 'string',
													example: '2023-11-16T17:08:00.000',
												},
												user_id: {
													type: 'string',
													example: '6555983eddab67d1ccad2cf9',
												},
												_id: {
													type: 'string',
													example: '65564ce62268f1d6ec017e91',
												},
												updated_at: {
													type: 'string',
													format: 'date-time',
													example: '2023-07-23T16:47:49.000Z',
												},
												created_at: {
													type: 'string',
													format: 'date-time',
													example: '2023-07-23T16:47:49.000Z',
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
		},
		'/v1/student/printing': {
			post: {
				summary: "Confirm printing button to create 'QUEUED printing request' to printer and assign printingLog ID to student and printer for query",
				tags: ['Student'],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									documents: {
										type: 'array',
										items:{
											type: 'object',
											properties:{
												paperSize:{
													
												}
											}
										}
									},
									printers: {
										type: 'array',
										items: {
											type: 'object',
											properties: {
												location: {
													type: 'object',
													properties:
														{
															facility:
																{
																	type: 'string',
																	example: 'CS2',
																},
															department:
																{
																	type: 'string',
																	example: 'H1',
																},
															room: {
																type: 'string',
																example: '202',
															},
														},
												},
												printingLog: {
													type: 'array',
													items: 'string',
													example: [
														'asduhui12h31xcxc',
														'12dhuaschxd213',
													],
												},
												_id: {
													type: 'string',
													example: 'fa',
												},
												printerId: {
													type: 'string',
													example: 'H1101',
												},
												status: {
													type: 'Number',
													example: '1',
												},
												description: {
													type: 'string',
													example: 'This is a printer',
												},
												brand: {
													type: 'string',
													example: 'Ford',
												},
												model: {
													type: 'string',
													example: 'XYZ',
												},
												activatedTime:
													{
														type: 'string',
														format: 'date-time',
														example: '2023-07-23T16:47:49.000Z',
													},
												updated_at: {
													type: 'string',
													format: 'date-time',
													example: '2023-07-23T16:47:49.000Z',
												},
												created_at: {
													type: 'string',
													format: 'date-time',
													example: '2023-07-23T16:47:49.000Z',
												},
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
												stt: {
													type: 'integer',
													example: '1',
												},
												shortContent: {
													type: 'string',
													example: 'SSPS',
												},
												money: {
													type: 'integer',
													example: 10000,
												},
												paidMoney: {
													type: 'integer',
													example: 0,
												},
												leftMoney: {
													type: 'integer',
													example: 10000,
												},
												endDate: {
													type: 'string',
													example: '2023-11-16T17:08:00.000',
												},
												user_id: {
													type: 'string',
													example: '6555983eddab67d1ccad2cf9',
												},
												_id: {
													type: 'string',
													example: '65564ce62268f1d6ec017e91',
												},
												updated_at: {
													type: 'string',
													format: 'date-time',
													example: '2023-07-23T16:47:49.000Z',
												},
												created_at: {
													type: 'string',
													format: 'date-time',
													example: '2023-07-23T16:47:49.000Z',
												},
											},
										},
									},
								},
							},
						},
					},
					400: {
						description: 'The money value is wrong <0',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										message: {
											type: 'string',
											example: 'Invalid money value. Please check whether it is larger than 0',
										},
									},
								},
							},
						},
					},
				},
			},
		},
		// '/v1/spso/printers-by-id/{printerId}': {
		// 	get: {
		// 		tags: ['Spso'],
		// 		summary: 'Filter and return list of printers',
		// 		parameters: [
		// 			{
		// 				name: 'printerId',
		// 				in: 'path',
		// 				type: 'string',
		// 				description: 'ID of a printer',
		// 				required: true,
		// 			},
		// 			{
		// 				name: 'per_page',
		// 				in: 'query',
		// 				type: 'integer',
		// 				description: 'Number of items per page',
		// 				required: false,
		// 			},
		// 			{
		// 				name: 'current_page',
		// 				in: 'query',
		// 				type: 'integer',
		// 				description: 'Current page number',
		// 				required: false,
		// 			},
		// 		],
		// 		responses: {
		// 			200: {
		// 				description: 'OK',
		// 				content: {
		// 					'application/json': {
		// 						schema: {
		// 							type: 'object',
		// 							properties: {
		// 								data: {
		// 									type: 'object',
		// 									properties: {
		// 										per_page: {
		// 											type: 'integer',
		// 											example: 20,
		// 										},
		// 										current_page: {
		// 											type: 'integer',
		// 											example: 1,
		// 										},
		// 										total_pages: {
		// 											type: 'integer',
		// 											example: 1,
		// 										},
		// 										totalPrinter: {
		// 											type: 'integer',
		// 											example: 5,
		// 										},
		// 										printers: {
		// 											type: 'array',
		// 											items: {
		// 												type: 'object',
		// 												properties: {
		// 													location: {
		// 														type: 'object',
		// 														properties:
		// 															{
		// 																facility:
		// 																	{
		// 																		type: 'string',
		// 																		example: 'CS2',
		// 																	},
		// 																department:
		// 																	{
		// 																		type: 'string',
		// 																		example: 'H1',
		// 																	},
		// 																room: {
		// 																	type: 'string',
		// 																	example: '202',
		// 																},
		// 															},
		// 													},
		// 													printingLog: {
		// 														type: 'array',
		// 														items: 'string',
		// 														example: [
		// 															'asduhui12h31xcxc',
		// 															'12dhuaschxd213',
		// 														],
		// 													},
		// 													_id: {
		// 														type: 'string',
		// 														example: 'fa',
		// 													},
		// 													printerId: {
		// 														type: 'string',
		// 														example: 'H1101',
		// 													},
		// 													status: {
		// 														type: 'Number',
		// 														example: '1',
		// 													},
		// 													description: {
		// 														type: 'string',
		// 														example: 'This is a printer',
		// 													},
		// 													brand: {
		// 														type: 'string',
		// 														example: 'Ford',
		// 													},
		// 													model: {
		// 														type: 'string',
		// 														example: 'XYZ',
		// 													},
		// 													activatedTime:
		// 														{
		// 															type: 'string',
		// 															format: 'date-time',
		// 															example: '2023-07-23T16:47:49.000Z',
		// 														},
		// 													updated_at: {
		// 														type: 'string',
		// 														format: 'date-time',
		// 														example: '2023-07-23T16:47:49.000Z',
		// 													},
		// 													created_at: {
		// 														type: 'string',
		// 														format: 'date-time',
		// 														example: '2023-07-23T16:47:49.000Z',
		// 													},
		// 												},
		// 											},
		// 										},
		// 									},
		// 								},
		// 							},
		// 						},
		// 					},
		// 				},
		// 			},
		// 		},
		// 	},
		// },
	},
}
export default swagger_doc
