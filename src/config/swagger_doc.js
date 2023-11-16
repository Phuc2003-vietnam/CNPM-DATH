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
		'/v1/spso/printers-by-id/{printerId}': {
			get: {
				tags: ['Spso'],
				summary: 'Filter and return list of printers',
				parameters: [
					{
						name: 'printerId',
						in: 'path',
						type: 'string',
						description: 'ID of a printer',
						required: true,
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
		'v1/student/confirm_print': {
			post: {
				tags: ['Student'],
				summary: 'Student upload document and confirm print',
				parameters: [
					{
						in: 'body',
						name: 'printingRequestBody',
						description: 'Printing request body',
						required: true,
						schema: {
							type: 'object',
							properties: {
								paperSize: {
									type: 'string',
									description: 'Size of the paper (A3, A4)',
								},
								numVersion: {
									type: 'integer',
									description: 'Number of versions',
								},
								colorOption: {
									type: 'boolean',
									description:
										'Whether color option is selected',
								},
								landScapeOption: {
									type: 'boolean',
									description:
										'Whether landscape option is selected',
								},
								pagesPerSheet: {
									type: 'integer',
									description: 'Number of pages per sheet',
								},
								document: {
									type: 'object',
									properties: {
										title: {
											type: 'string',
											description:
												'Title of the document',
										},
										pages: {
											type: 'integer',
											description:
												'Number of pages in the document',
										},
										fileType: {
											type: 'string',
											description:
												'File type of the document',
										},
									},
									required: ['title', 'pages', 'fileType'],
								},
								printerId: {
									type: 'string',
									description: 'ID of the printer',
								},
							},
							required: [
								'paperSize',
								'numVersion',
								'colorOption',
								'landScapeOption',
								'pagesPerSheet',
								'document',
								'printerId',
							],
						},
					},
				],
				responses: {
					200: {
						description: 'Successful response',
						schema: {
							type: 'object',
							properties: {
								data: {
									type: 'object',
									properties: {
										_id: {
											$oid: 'string',
											description:
												'ID of the printing job',
										},
										status: {
											type: 'string',
											description:
												'Status of the printing job',
										},
										finishDate: {
											type: 'string',
											description:
												'Finish date of the printing job',
										},
										paperSize: {
											type: 'string',
											description:
												'Paper size (e.g., A4)',
										},
										numVersion: {
											$numberInt: 'integer',
											description: 'Number of versions',
										},
										colorOption: {
											type: 'boolean',
											description:
												'Whether color option is selected',
										},
										landScapeOption: {
											type: 'boolean',
											description:
												'Whether landscape option is selected',
										},
										pagesPerSheet: {
											$numberInt: 'integer',
											description:
												'Number of pages per sheet',
										},
										document: {
											type: 'object',
											properties: {
												title: {
													type: 'string',
													description:
														'Title of the document',
												},
												pages: {
													$numberInt: 'integer',
													description:
														'Number of pages in the document',
												},
												fileType: {
													type: 'string',
													description:
														'File type of the document',
												},
											},
											required: [
												'title',
												'pages',
												'fileType',
											],
										},
										user_id: {
											type: 'string',
											description:
												'User ID associated with the printing job',
										},
										printerId: {
											type: 'string',
											description: 'ID of the printer',
										},
										createdAt: {
											$date: {
												$numberLong: 'integer',
												description:
													'Creation date of the printing job',
											},
										},
										updatedAt: {
											$date: {
												$numberLong: 'integer',
												description:
													'Update date of the printing job',
											},
										},
										__v: {
											$numberInt: 'integer',
											description:
												'Version field for the printing job',
										},
									},
									required: [
										'_id',
										'status',
										'paperSize',
										'numVersion',
										'colorOption',
										'landScapeOption',
										'pagesPerSheet',
										'document',
										'user_id',
										'printerId',
										'createdAt',
										'updatedAt',
										'__v',
									],
								},
							},
						},
					},
				},
			},
		},
		'v1/student/filterLogs': {
			get: {
				tags: ['Student'],
				summary: 'Filter and search by printerId return list printingLogs',
				parameters: [
					{
						name: 'searchField',
						in: 'query',
						description: 'Search by printerId',
						required: false,
						type: 'string',
					},
					{
						name: 'status',
						in: 'query',
						description:
							'Could be Queued, InProgress, Completed, Failed, all. Do not enter if want to get all',
						required: false,
						schema: {
							enum: [
								'Queued',
								'InProgress',
								'Completed',
								'Failed',
								'all',
								'100',
							],
							type: 'string',
							default: 'all',
						},
					},
					{
						name: 'facility',
						in: 'query',
						description: 'handle random facility input:100',
						required: false,
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
						required: false,
						schema: {
							enum: [-1, 1, 100],
							type: 'integer',
							default: -1,
						},
					},
					{
						name: 'startDate',
						in: 'query',
						type: 'string',
						format: 'date-time',
						description: 'Start Date of the filter',
						required: false,
					},
					{
						name: 'endDate',
						in: 'query',
						type: 'string',
						format: 'date-time',
						description: 'End Date of the filter',
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
				//
				responses: {
					200: {
						description: 'Successful response',
						schema: {
							type: 'object',
							properties: {
								data: {
									type: 'object',
									properties: {
										printedA3: {
											type: 'integer',
											description:
												'Number of A3 pages printed',
										},
										printedA4: {
											type: 'integer',
											description:
												'Number of A4 pages printed',
										},
										printingLogs: {
											type: 'array',
											items: {
												type: 'object',
												properties: {
													_id: {
														type: 'string',
														description:
															'Printing log ID',
													},
													status: {
														type: 'string',
														description:
															'Status of the printing job',
													},
													finishDate: {
														type: 'string',
														format: 'date-time',
														description:
															'Finish date of the printing job',
													},
													paperSize: {
														type: 'string',
														description:
															'Paper size (e.g., A4)',
													},
													numVersion: {
														type: 'integer',
														description:
															'Number of versions',
													},
													colorOption: {
														type: 'boolean',
														description:
															'Whether color option is selected',
													},
													landScapeOption: {
														type: 'boolean',
														description:
															'Whether landscape option is selected',
													},
													pagesPerSheet: {
														type: 'integer',
														description:
															'Number of pages per sheet',
													},
													document: {
														type: 'object',
														properties: {
															title: {
																type: 'string',
																description:
																	'Title of the document',
															},
															pages: {
																type: 'integer',
																description:
																	'Number of pages in the document',
															},
															fileType: {
																type: 'string',
																description:
																	'File type of the document',
															},
														},
													},
													user_id: {
														type: 'string',
														description:
															'User ID associated with the printing job',
													},
													printerId: {
														type: 'string',
														description:
															'ID of the printer',
													},
													createdAt: {
														type: 'string',
														format: 'date-time',
														description:
															'Creation date of the printing log',
													},
													updatedAt: {
														type: 'string',
														format: 'date-time',
														description:
															'Update date of the printing log',
													},
													printers: {
														type: 'array',
														items: {
															type: 'object',
															properties: {
																_id: {
																	type: 'string',
																	description:
																		'Printer ID',
																},
																printerId:
																	{
																		type: 'string',
																		description:
																			'ID of the printer',
																	},
																status: {
																	type: 'integer',
																	description:
																		'Status of the printer',
																},
																description:
																	{
																		type: 'string',
																		description:
																			'Description of the printer',
																	},
																brand: {
																	type: 'string',
																	description:
																		'Brand of the printer',
																},
																model: {
																	type: 'string',
																	description:
																		'Model of the printer',
																},
																location:
																	{
																		type: 'object',
																		properties:
																			{
																				facility:
																					{
																						type: 'string',
																						description:
																							'Facility of the printer location',
																					},
																				department:
																					{
																						type: 'string',
																						description:
																							'Department of the printer location',
																					},
																				room: {
																					type: 'string',
																					description:
																						'Room of the printer location',
																				},
																			},
																	},
																activatedTime:
																	{
																		type: 'string',
																		format: 'date-time',
																		description:
																			'Activation time of the printer',
																	},
																createdAt:
																	{
																		type: 'string',
																		format: 'date-time',
																		description:
																			'Creation date of the printer',
																	},
																updatedAt:
																	{
																		type: 'string',
																		format: 'date-time',
																		description:
																			'Update date of the printer',
																	},
																__v: {
																	type: 'integer',
																	description:
																		'Version field for the printer',
																},
																printingLog:
																	{
																		type: 'array',
																		items: {
																			type: 'string',
																			description:
																				'ID of the printing log associated with the printer',
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
			},
		},
	},
}
export default swagger_doc
