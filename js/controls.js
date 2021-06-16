//#region DEFAULTS

$(document).ready(function () {
	controls.init();
});

//#endregion

//#region CONTROLS

var controls = {
	design: {
		base: undefined,
		feedback: {
			template: $('<div class="feedback"><ul class="messages"><li class="feed Template"><i></i><span></span><div class="window-alert-timer"></div></li></ul></div>')
		},
		message: {
			template: $('<div class="modal-message"><div class="box"><div class="title"></div><div class="wrapper"><div class="icon"></div><div class="message" style="color:black;"></div><ul class="options"><li class="btnYes"><button id="btnYes" class="btn btn-primary">Sim</button></li><li class="btnNo"><button id="btnNo" class="btn btn-primary">Não</button></li><li class="btnOk"><cite></cite><button id="btnOk" class="btn btn-primary">Ok</button></li></ul></div></div></div>')
		},
		update_password: {
			template: $('<div class="modal-message update-user-password"><div class="box"><div class="title"><i class="fa fa-key"/>Alterar senha de acesso</div><div class="wrapper"><div class="password-info"><p>A senha de acesso deverá obedecer às seguintes regras:</p><ul><li>ter entre 8 e 15 caracteres</li><li>ter pelo menos uma letra maiúscula e uma minúscula</li><li>ter pelo menos um algarismo</li></ul></div><div class="form-content"><div class="fields no-gutters col-12"><div class="form-fields row ctrCurrentPassword"><label class="col-xs-12 col-md-5"><span>Senha de acesso atual: <cite class="label-mandatory">*</cite></span></label><div class="form-field col-xs-12 col-md-7"><div class="form-field-group-append"><i class="fas fa-key"/></div><div class="form-field-group"><input id="txtCurrentPassword" class="form-control mandatory-field" type="password" maxlength="15"></div></div></div><div class="clear ctrCurrentPassword"/><div class="form-fields row ctrNewPassword"><label class="col-xs-12 col-md-5"><span>nova senha de acesso: <cite class="label-mandatory">*</cite></span></label><div class="form-field col-xs-12 col-md-7"><div class="form-field-group-append"><i class="fas fa-key"/></div><div class="form-field-group"><input id="txtNewPassword" class="form-control mandatory-field" type="password" maxlength="15"></div></div></div><div class="clear ctrNewPassword"/><div class="form-fields row ctrConfirmNewPassword"><label class="col-xs-12 col-md-5"><span>Confirmar senha de acesso: <cite class="label-mandatory">*</cite></span></label><div class="form-field col-xs-12 col-md-7"><div class="form-field-group-append"><i class="fas fa-key"/></div><div class="form-field-group"><input id="txtConfirmNewPassword" class="form-control mandatory-field" type="password" maxlength="15"></div></div></div><div class="clear ctrConfirmNewPassword"/></div><div class="clear"/></div><ul class="options"><li class="btnSave"><button id="btnSave" class="btn btn-primary">Guardar</button></li><li class="btnCancel"><button id="btnCancel" class="btn btn-primary">Cancelar</button></li></ul></div></div></div>')
		}
	},
	feedback: {
		base: undefined,
		/** @description Function used to show feedback messages
		 	* @property type: Type of message [ error | success | warning | info ].
			* @property message: Text of message.
			* @property after: Function to run after close message.
			* @example "{ type: 'error', message: 'Ocorreu um erro' }"
		*/
		bind: function (parameters) {
			var me = this.base,
				ds = me.design.feedback,
				template = ds.template,
				item = template.find('.feed');

			if ($('body').find('.feedback').length == 0) {
				//[ SET PARAMETERS ]
				with (item) {
					//[ SET MESSAGE ]
					find('span').html(ifUndefinedOrNull(parameters.message, ''));

					//[ SET TYPE AND ICON ]
					switch (ifUndefinedOrNull(parameters.type, '')) {
						case 'error':
							addClass('label-danger');
							find('i').addClass('fa fa-times');
							break;

						case 'success':
							addClass('label-success');
							find('i').addClass('fa fa-check');
							break;

						case 'warning':
							addClass('label-warning');
							find('i').addClass('fa fa-info-circle');
							break;

						case 'info':
							addClass('label-info');
							find('i').addClass('fa fa-exclamation-circle');
							break;

						default:
							break;
					}
				}

				//[ APPEND TEMPLATE TO HTML ]
				$('body').append(template);

				//[ SHOW FEEDBACK ELEMENT ]
				setTimeout(function () {
					item.addClass('on');

					setTimeout(function () {
						item.stop();
						item.transitionend(function () {
							item.parents('.feedback').remove();

							if (!isUndefinedOrNull(parameters.after)) {
								parameters.after();
							}
						});
						item.removeClass('on');
					}, 4000);
				}, 100);
			};
		}
	},
	message: {
		base: undefined,
		/** @description Function used to show messages
		 	* @property type: Type of message [ error | success | warning | info ].
			* @property message: Text of message.
			* @property afteryes: Function to run after click yes.
			* @property afterno: Function to run after click no.
			* @property afterok: Function to run after click ok.
			* @example "{ type: 'error', message: 'Ocorreu um erro' }"
		*/
		bind: function (parameters) {
			var me = this.base,
				ds = me.design.message,
				template = ds.template,
				box = template.find('.box'),
				wrapper = template.find('.wrapper'),
				options = template.find('.options'),
				icon = '',
				title = '';

			//[ SET TYPE AND ICON ]
			with (box) {
				switch (ifUndefinedOrNull(parameters.type, '')) {
					case 'error':
						prop('class', 'box danger');
						title = 'Erro';
						icon = '<i class="fa fa-times-circle"></i>';

						//[ SET OPTIONS ]
						with (options) {
							find('li.btnOk').show();
							find('li.btnYes').hide();
							find('li.btnNo').hide();
						};
						break;

					case 'success':
						prop('class', 'box success');
						title = 'Sucesso';
						icon = '<i class="fa fa-check-circle"></i>';

						//[ SET OPTIONS ]
						with (options) {
							find('li.btnOk').show();
							find('li.btnYes').hide();
							find('li.btnNo').hide();
						};
						break;

					case 'warning':
						prop('class', 'box warning');
						title = 'Aviso';
						icon = '<i class="fa fa-exclamation-circle"></i>';

						//[ SET OPTIONS ]
						with (options) {
							find('li.btnOk').show();
							find('li.btnYes').hide();
							find('li.btnNo').hide();
						};
						break;

					case 'info':
						prop('class', 'box info');
						title = 'Informação';
						icon = '<i class="fa fa-info-circle"></i>';

						//[ SET OPTIONS ]
						with (options) {
							find('li.btnOk').show();
							find('li.btnYes').hide();
							find('li.btnNo').hide();
						};
						break;

					case 'question':
						prop('class', 'box question');
						title = 'Questão';
						icon = '<i class="fa fa-question"></i>';

						//[ SET OPTIONS ]
						with (options) {
							find('li.btnOk').hide();
							find('li.btnYes').show();
							find('li.btnNo').show();
						};
						break;

					default:
						break;
				};

				//[ SET YES ACTION ]
				if (find('li.btnYes').length > 0) {
					find('li.btnYes').click(function () {
						me.message.close(template, function () {
							if (!isUndefinedOrNull(parameters.afteryes)) {
								parameters.afteryes();
							}
						});
					});
				};

				//[ SET NO ACTION ]
				if (find('li.btnNo').length > 0) {
					find('li.btnNo').click(function () {
						me.message.close(template, function () {
							if (!isUndefinedOrNull(parameters.afterno)) {
								parameters.afterno();
							}
						});
					});
				};

				//[ SET OK ACTION ]
				if (find('li.btnOk').length > 0) {
					find('li.btnOk').click(function () {
						me.message.close(template, function () {
							if (!isUndefinedOrNull(parameters.afterok)) {
								parameters.afterok();
							}
						});
					});
				};
			};

			//[ SET TITLE ]
			template.find('.title').html(ifUndefinedOrNull(title, ''));

			//[ SET WRAPPER ICON ]
			wrapper.find('.icon').html(icon);

			//[ SET WRAPPER MESSAGE ]
			wrapper.find('.message').html(ifUndefinedOrNull(parameters.message, ''));

			//[ APPEND TEMPLATE TO HTML ]
			$('body').append(template);

			//[ SHOW CONTROL ]
			box.transitionend(function () {
				box.offtransitionend();
			});

			template.fadeIn('fast', function () {
				box.addClass('on');
			});
		},
		close: function (template, after) {
			var me = this.base,
				box = template.find('.box'),
				wrapper = template.find('.wrapper'),
				options = template.find('.options'),
				icon = '',
				title = '';

			if (box.is(':visible')) {
				box.transitionend(function () {
					box.offtransitionend();

					template.fadeOut('fast', function () {
						template.remove();

						if (!isUndefinedOrNull(after)) { after(); };
					});
				});
			} else {
				template.remove();

				if (!isUndefinedOrNull(after)) { after(); };
			};

			box.removeClass('on');
		}
	},
	session: {
		base: undefined,
		currentuser: undefined,
		/** @description Function set session as expired*/
		without: function (redirect_page) {
			//[ ADD SESSION_HAS_EXPIRED TO STORAGE TO ALLOW TO SHOW MESSAGE AFTER REDIRECT TO LOGIN ]
			controls.storage.write('session_has_expired', true);

			//[ REDIRECT ]
			window.open(redirect_page, '_self');
		}
	},
	storage: {
		/** @description Functions used to read, write or remove on browser storage*/
		base: undefined,
		version: 's0',
		key: function (name) {
			return '{0}_{1}'.format(this.version, name);
		},
		read: function (name) {
			var key = this.key(name);

			return Modernizr.localstorage ? localStorage[key] : $.cookie(key);
		},
		remove: function (name) {
			var key = this.key(name);

			return Modernizr.localstorage ? localStorage.removeItem(key) : $.cookie(name, '', { expires: new Date(0) });
		},
		write: function (name, value, expires) {
			var key = this.key(name);

			if (Modernizr.localstorage) {
				localStorage[key] = value;
			} else {
				if (isUndefined(expires)) {
					expires = 7;
				}

				$.cookie(key, value, { expires: expires });
			}
		}
	},
	pager: {
		base: undefined,
		/** @description Function used to add pager to grid controls
		 	* @property total: total pages associated to grid datasource
			* @property total_records: total records associated to grid datasource
			* @property current: current page
			* @property update: function used to update pager
		*/
		bind: function (parameters) {
			var me = this.base,
				ds = {
					me: $('.grid-pager'),
					ctrpages: $('.grid-pager .pagination'),
					previouspage: $('.grid-pager .page-item.previous'),
					nextpage: $('.grid-pager .page-item.next'),
					pagenumber: $('.grid-pager .page-number'),
					total: $('.grid-pager .total-records p')
				},
				total = ifUndefinedOrNull(parameters.total, 0);

			//[ REMOVE PAGE NUMBER BEFORE INSERTING NEW ]
			ds.pagenumber.remove();

			//[ UNBIND EVENTS ]
			ds.previouspage.unbind('click');
			ds.nextpage.unbind('click');

			//[ BUILD PAGER ]
			if (!isUndefinedOrNull(ds.me) && ds.me.length > 0) {
				//[ PREVIOUS PAGE ]
				ds.previouspage.on('click', function (e) {
					var currentpage = parseInt(ds.me.find('.page-number.active a').attr('data')),
						page = (currentpage - 1);

					if (!isUndefinedOrNull(parameters.update) && page > 0) { parameters.update(page); };
					e.stopPropagation();
					e.preventDefault();
				});

				//[ NEXT PAGE ]
				ds.nextpage.on('click', function (e) {
					var currentpage = parseInt(ds.me.find('.page-number.active a').attr('data')),
						page = (currentpage + 1);

					if (!isUndefinedOrNull(parameters.update) && page <= total) { parameters.update(page); };
					e.stopPropagation();
					e.preventDefault();
				});

				//[ BY PAGE ]
				if (total > 1) {
					for (i = 0; i < total; i++) {
						var page = (i + 1),
							current = ifUndefinedOrNull(parameters.current, 1),
							pagehtml = $('<li class="page-item{1} page-number"><a class="page-link" data="{0}">{0}</a></li>'.format(page, (current == page) ? ' active' : ''));

						pagehtml.find('a.page-link[data={0}]'.format(page)).on('click', function (e) {
							var currentpage = parseInt(ds.me.find('.page-number.active a').attr('data')),
								selectedpage = parseInt($(this).attr('data'));

							if (!isUndefinedOrNull(parameters.update) && selectedpage != currentpage) { parameters.update(selectedpage); };
							e.preventDefault();
						});

						pagehtml.insertBefore(ds.nextpage);
					};
				} else {
					ds.ctrpages.hide();
				};

				//[ SET TOTALS ]
				ds.total.html('Página {0} de {1} ( {2} registos )'.format(parameters.current, parameters.total, ifUndefinedOrNull(parameters.total_records, 0)));
			};
		}
	},
	/** @description FUNCTION USED TO CONNECT WITH PHP PAGE USING POST METHOD TO SEND PARAMETERS
		* @property url: page url.
		* @property functionname: function name.
		* @property data: object with required parameters
	*/
	ajax: function (parameters, success, error, fail) {
		var me = this;

		if (!isUndefinedOrNull(parameters)) {
			$.ajax({
				url: ifUndefinedOrNull(parameters.url, 'data/database.php'),
				type: 'POST',
				data: {
					functionname: ifUndefinedOrNull(parameters.functionname, ''),
					data: (!isUndefinedOrNull(parameters.data)) ? encodeURIComponent(JSON.stringify(parameters.data)) : undefined
				},
				success: function (data) {
					if (!isUndefinedOrNull(success)) { success(data); };
				},
				error: function (data) {
					if (!isUndefinedOrNull(error)) { error(data); };
				},
				fail: function (data) {
					if (!isUndefinedOrNull(fail)) { fail(data); };
				}
			});
		};
	},
	post: function (page, parameters) {
		if (!isUndefinedOrNull(parameters)) {
			var form = document.createElement('form'),
				inputobject = document.createElement('input');

			//[ FORM ]
			with (form) {
				id = 'frmPage'
				target = '_self';
				method = 'POST';
				action = (window.location.href.indexOf('modules') != -1) ? ('../../' + page) : page;
			};

			//[ PARAMETERS ]
			with (inputobject) {
				type = 'hidden';
				name = 'parameters';
				value = JSON.stringify(parameters).urlEncode();
			};

			form.appendChild(inputobject);

			with (form) {
				document.body.appendChild(form);

				submit();
				$(form).remove();
			};
		};
	},
	redirect: function (page, target) {
		if (!isStringVoid(page)) {
			window.open((window.location.href.indexOf('modules') != -1) ? ('../../' + page) : page, ifUndefinedOrNull(target, '_self'));
		};
	},
	/** @description control for update password*/
	update_password: {
		base: undefined,
		detail: function (userid) {
			var me = this.base,
				ds = me.design.update_password,
				template = ds.template,
				box = template.find('.box'),
				options = template.find('.options'),
				obj = {
					user_id: userid,
					current_password: null,
					new_password: null,
					confirm_new_password: null
				};

			//[ BOX ]
			with (box) {
				//[ SAVE ]
				find('li.btnSave').click(function () {
					//[ VALIDATE MANDATORY FIELDS ]
					controls.validate(box.find('.fields'), function () {
						with (obj) {
							current_password = ifUndefinedOrNull(template.find('.ctrCurrentPassword input').val(), '');
							new_password = ifUndefinedOrNull(template.find('.ctrNewPassword input').val(), '');
							confirm_new_password = ifUndefinedOrNull(template.find('.ctrConfirmNewPassword input').val(), '');
						};

						var samepassword = (obj.new_password == obj.confirm_new_password),
							insecurepassword = ((zxcvbn(obj.new_password).score) > 1),
							passwordlength = (obj.new_password.length >= 8);

						if (samepassword && insecurepassword && passwordlength) {
							controls.ajax({
								functionname: 'update_password',
								data: {
									user_id: obj.user_id,
									current_password: obj.current_password,
									new_password: obj.new_password
								}
							}, function (data) {
								if (ifUndefinedOrNull(data.success, false)) {
									controls.message.bind({
										type: 'success',
										message: 'A senha de acesso foi atualizad com sucesso.',
										afterok: function () {
											//[ CLOSE MODAL ]
											me.update_password.close(template);
										}
									});
								} else {
									var type,
										feedback;

									switch (ifUndefinedOrNull(data.error, '').toLowerCase()) {
										case 'invalid_current_password':
											type = 'info';
											feedback = 'A senha de acesso atual está incorreta, por favor altere.';
											break;

										default:
											type = 'error';
											feedback = 'Ocorreu um erro ao inserir a prova, por favor tente novamente.';
											break;
									}

									controls.message.bind({ type: type, message: feedback });
								};
							}, function () {
								//[ ERROR ]
								controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro, por favor tente novamente.' });
							}, function () {
								controls.feedback.bind({ type: 'error', message: 'Ocorreu um erro, por favor tente novamente.' });
							});
						} else {
							var type,
								feedback;

							switch (true) {
								case (!samepassword):
									type = 'info';
									feedback = 'A nova senha de acesso não coincide com a confirmação, por favor altere.';
									break;

								case (!insecurepassword):
									type = 'info';
									feedback = 'A senha de acesso é demasiado insegura, utilize maiúsculas, minúsculas, números e símbolos.';
									break;

								case (!passwordlength):
									type = 'info';
									feedback = 'A nova senha de acesso deve conter entre 8 e 15 caracteres, por favor altere.';
									break;
							};

							controls.message.bind({ type: type, message: feedback });
						};
					});
				});

				//[ CANCEL ]
				find('li.btnCancel').click(function () {
					//[ CLOSE MODAL ]
					me.update_password.close(template);
				});
			};

			//[ APPEND TEMPLATE TO HTML ]
			$('body').append(template);

			//[ SHOW CONTROL ]
			box.transitionend(function () {
				box.offtransitionend();
			});

			template.fadeIn('fast', function () {
				box.addClass('on');
			});
		},
		close: function (template, after) {
			var me = this.base,
				box = template.find('.box'),
				wrapper = template.find('.wrapper'),
				options = template.find('.options'),
				icon = '',
				title = '';

			if (box.is(':visible')) {
				box.transitionend(function () {
					box.offtransitionend();

					template.fadeOut('fast', function () {
						template.remove();

						if (!isUndefinedOrNull(after)) { after(); };
					});
				});
			} else {
				template.remove();

				if (!isUndefinedOrNull(after)) { after(); };
			};

			box.removeClass('on');
		}
	},
	resources: {
		generic_error: 'Ocorreu um erro por favor tente novamente.',
	},
	init: function () {
		var me = this;

		this.design.base = this;
		this.feedback.base = this;
		this.message.base = this;
		this.session.base = this;
		this.storage.base = this;
		this.pager.base = this;
		this.update_password.base = this;
	}
};

//#endregion