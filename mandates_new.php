<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <meta charset="utf-8" />
    <title>InAgent</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <link href="assets/plugins/pace/pace-theme-flash.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/jquery-scrollbar/jquery.scrollbar.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="assets/plugins/select2/css/select2.min.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="assets/plugins/switchery/css/switchery.min.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="assets/plugins/bootstrap3-wysihtml5/bootstrap3-wysihtml5.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/bootstrap-tag/bootstrap-tagsinput.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/dropzone/css/dropzone.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/bootstrap-datepicker/css/datepicker3.css" rel="stylesheet" type="text/css" media="screen">
    <link href="assets/plugins/summernote/css/summernote.css" rel="stylesheet" type="text/css" media="screen">
    <link href="assets/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css" rel="stylesheet" type="text/css" media="screen">
    <link href="assets/plugins/bootstrap-timepicker/bootstrap-timepicker.min.css" rel="stylesheet" type="text/css" media="screen">
    <link href="pages/css/pages-icons.css" rel="stylesheet" type="text/css">
    <link class="main-stylesheet" href="pages/css/pages.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/controls.css" rel="stylesheet" type="text/css"/>
  </head>
  <body class="fixed-header menu-pin">
    <!-- BEGIN SIDEBPANEL-->
    <nav class="page-sidebar" data-pages="sidebar">
      <!-- BEGIN SIDEBAR MENU HEADER-->
      <div class="sidebar-header">
        <img src="assets/img/logo_inagent_white.png" alt="logo" class="brand" data-src="assets/img/logo_inagent_white.png" data-src-retina="assets/img/logo_inagent_white_2x.png" width="78" height="22">
        <div class="float-right">
          <div class="sidebar-header-controls">
            <button type="button" class="btn btn-link d-lg-inline-block d-xlg-inline-block d-md-inline-block d-sm-none d-none" data-toggle-pin="sidebar"><i class="fa fs-12"></i>
            </button>
          </div>
        </div>
      </div>
      <!-- END SIDEBAR MENU HEADER-->

      <!-- START SIDEBAR MENU -->
      <div class="sidebar-menu">
        <!-- BEGIN SIDEBAR MENU ITEMS-->
        <ul class="menu-items">
          <li class="m-t-30 ">
            <a href="index.php" class="detailed">
              <span class="title">Inicio</span>
            </a>
            <span class="icon-thumbnail"><i class="pg-home"></i></span>
          </li>
          <div class="small hint-text" style="text-align: center; margin: 2px 0 5px 0;">
            <h3 class="semi-bold" style = "font-size: 12.5px; ";>Agenciados<br></h3>
          </div>
          <li>
            <a href="javascript:;"><span class="title">Jogadores</span>
            <span class=" arrow"></span></a>
            <span class="icon-thumbnail"><i class="fa fa-user"></i></span>
            <ul class="sub-menu">
              <li class="">
                <a href="players_list.php">Lista de jogadores</a>
                <span class="icon-thumbnail"><i class="fa fa-users"></i></span>
              </li>
              <li class="">
                <a href="players_new.php">Adicionar jogador</a>
                <span class="icon-thumbnail"><i class="fa fa-plus"></i></span>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:;"><span class="title">Treinadores</span>
            <span class=" arrow"></span></a>
            <span class="icon-thumbnail"><i class="fa fa-user"></i></span>
            <ul class="sub-menu">
              <li class="">
                <a href="coaches_list.php">Lista de treinadores</a>
                <span class="icon-thumbnail"><i class="fa fa-users"></i></span>
              </li>
              <li class="">
                <a href="coaches_new.php">Adicionar treinador</a>
                <span class="icon-thumbnail"><i class="fa fa-plus"></i></span>
              </li>
            </ul>
          </li>
          <div class="small hint-text" style="text-align: center; margin: 2px 0 5px 0;">
            <h3 class="semi-bold" style = "font-size: 12.5px; ";>Contratos<br></h3>
          </div>
          <li>
            <a href="javascript:;"><span class="title">Representação</span>
            <span class=" arrow"></span></a>
            <span class="icon-thumbnail"><i class="fa fa-file-text"></i></span>
            <ul class="sub-menu">
              <li class="">
                <a href="representation_list.php">Lista de contratos</a>
                <span class="icon-thumbnail"><i class="fa fa-list-ul"></i></span>
              </li>
              <li class="">
                <a href="javascript:;"><span class="title">Adiconar contrato</span>
                <span class=" arrow"></span></a>
                <span class="icon-thumbnail"><i class="fa fa-file-text"></i></span>
                <ul class="sub-menu">
                  <li class="">
                    <a href="representation_new_player.php">Jogadores</a>
                    <span class="icon-thumbnail"><i class="fa fa-user"></i></span>
                  </li>
                  <li class="">
                    <a href="representation_new_coach.php">Treinadores</a>
                    <span class=" icon-thumbnail"><i class="fa fa-user"></i></span>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:;"><span class="title">Clubes</span>
            <span class=" arrow"></span></a>
            <span class="icon-thumbnail"><i class="fa fa-file-text"></i></span>
            <ul class="sub-menu">
              <li class="">
                <a href="clubs_list.php">Lista de contratos</a>
                <span class="icon-thumbnail"><i class="fa fa-list-ul"></i></span>
              </li>
              <li class="">
                <a href="javascript:;"><span class="title">Adiconar contrato</span>
                <span class=" arrow"></span></a>
                <span class="icon-thumbnail"><i class="fa fa-file-text"></i></span>
                <ul class="sub-menu">
                  <li class="">
                    <a href="clubs_new_player.php">Jogadores</a>
                    <span class="icon-thumbnail"><i class="fa fa-user"></i></span>
                  </li>
                  <li class="">
                    <a href="clubs_new_coach.php">Treinadores</a>
                    <span class=" icon-thumbnail"><i class="fa fa-user"></i></span>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <div class="small hint-text" style="text-align: center; margin: 2px 0 5px 0;">
            <h3 class="semi-bold" style = "font-size: 12.5px; ">Mandatos<br></h3>
          </div>
          <li>
            <a href="javascript:;"><span class="title">Mandatos</span>
            <span class=" arrow"></span></a>
            <span class="bg-secondary icon-thumbnail"><i class="pg-note"></i></span>
            <ul class="sub-menu">
              <li class="">
                <a href="mandates_list.php">Lista de mandatos</a>
                <span class="icon-thumbnail"><i class="fa fa-list-ul"></i></span>
              </li>
              <li class="">
              <a href="javascript:;"><span class="title">Adiconar mandato</span>
                <span class=" arrow"></span></a>
                <span class="icon-thumbnail"><i class="fa fa-file-text"></i></span>
                <ul class="sub-menu">
                  <li class="">
                    <a href="mandates_new.php">Jogadores</a>
                    <span class="icon-thumbnail"><i class="fa fa-user"></i></span>
                  </li>
                  <li class="">
                    <a href="mandates_new_coach.php">Treinadores</a>
                    <span class=" icon-thumbnail"><i class="fa fa-user"></i></span>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:;"><span class="title">Agentes</span>
            <span class=" arrow"></span></a>
            <span class="icon-thumbnail"><i class="pg-suitcase"></i></span>
            <ul class="sub-menu">
              <li class="">
                <a href="agents_list.php">Lista de agentes</a>
                <span class="icon-thumbnail"><i class="fa fa-list-ul"></i></span>
              </li>
              <li class="">
                <a href="agents_new.php">Adicionar agente</a>
                <span class="icon-thumbnail"><i class="fa fa-plus"></i></span>
              </li>
            </ul>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <!-- END SIDEBAR MENU -->
    </nav>
    <!-- END SIDEBAR -->

    <!-- START PAGE-CONTAINER -->
    <div class="page-container ">
      <!-- START HEADER -->
      <div class="header ">
        <!-- START MOBILE SIDEBAR TOGGLE -->
        <a href="#" class="btn-link toggle-sidebar d-lg-none pg pg-menu" data-toggle="sidebar">
        </a>
        <!-- END MOBILE SIDEBAR TOGGLE -->
        <div class="">
          <div class="brand inline   ">
            <img src="assets/img/logo.png" alt="logo" data-src="assets/img/logo.png" data-src-retina="assets/img/logo_2x.png" width="78" height="22">
          </div>
        </div>
        <div class="d-flex align-items-center">
          <!-- START User Info-->
          <div class="pull-left p-r-10 fs-14 font-heading d-lg-block d-none">
            <span class="semi-bold">Joaquim</span> <span class="text-master">Ribeiro</span>
          </div>
          <div class="dropdown pull-right d-lg-block d-none">
            <button class="profile-dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="thumbnail-wrapper d32 circular inline">
              <img src="assets/img/profiles/avatar.jpg" alt="" data-src="assets/img/profiles/avatar.jpg" data-src-retina="assets/img/profiles/avatar_small2x.jpg" width="32" height="32">
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-right profile-dropdown" role="menu">
              <a href="#" class="dropdown-item text-success" data-target="#modalSlideLeft_profile" data-toggle="modal"><i class="pg-settings_small"></i> Configurações</a>
              <a href="#" class="clearfix bg-master-lighter dropdown-item text-success">
                <span class="pull-left">Sair</span>
                <span class="pull-right"><i class="pg-power"></i></span>
              </a>
            </div>
          </div>
          <!-- END User Info-->
        </div>
      </div>
      <!-- END HEADER -->

      <!-- START PAGE CONTENT WRAPPER -->
      <div class="page-content-wrapper ">
        <!-- START PAGE CONTENT -->
        <div class="content ">

          <!-- Modal Profile -->
          <div class="modal fade slide-right" id="modalSlideLeft_profile" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
              <div class="modal-content-wrapper">
                <div class="modal-content">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="pg-close fs-14"></i>
                  </button>
                  <div class="container-xs-height full-height">
                    <div class="row-xs-height">
                      <div class="modal-body col-xs-height col-middle">
                        <h5 style="text-align:center">Perfil</h5>
                        <br>
                        <div class="form-group form-group-default required">
                          <label>Nome completo</label>
                          <input type="text" class="form-control txtNameUser">
                        </div>
                        <div class="form-group form-group-default required">
                          <label>username</label>
                          <input type="text" class="form-control txtUserNameUser">
                        </div>
                        <div class="form-group form-group-default">
                          <label>Alterar password</label>
                          <input type="text" class="form-control txtPasswordUser" required>
                        </div>
                        <br>
                        <button type="button" onclick="location.href='representation_list.php'" class="btn btn-primary btn-block btn-animated btnSaveUser from-left pg pg-save">
                          <span>Guardar</span>
                        </button>
                        <button type="button" onclick="location.href='representation_list.php'" class="btn btn-primary btn-block btn-animated from-left pg pg-close">
                          <span>Cancelar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- END Modal -->

        <!-- Modal New Player -->
        <div class="modal fade slide-right" id="modalSlideLeft_playerNewMandate" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-sm">
            <div class="modal-content-wrapper">
              <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="pg-close fs-14"></i>
                </button>
                <div class="container-xs-height full-height">
                  <div class="row-xs-height">
                    <div class="modal-body col-xs-height col-middle">
                      <h5 style="text-align:center">ADICIONAR JOGADOR</h5>
                      <br>
                      <div class="form-group form-group-default required">
                        <label>Nome completo</label>
                        <input type="text" class="form-control txtPlayerNameNewMandate" required>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>Primeiro nome</label>
                        <input type="text" class="form-control txtPlayerFirstNameNewMandate">
                      </div>
                      <div class="form-group form-group-default required">
                        <label>último nome</label>
                        <input type="text" class="form-control txtPlayerLastNameNewMandate">
                      </div>
                      <div class="form-group form-group-default input-group ">
                        <div class="form-input-group disabled">
                          <label>Data de nascimento</label>
                          <input type="email" class="form-control txtPlayerBirthNewMandate" placeholder="Selecione a data" id="datepicker-component2">
                        </div>
                        <div class="input-group-append ">
                          <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                        </div>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>Nacionalidade</label>
                        <input type="text" class="form-control txtPlayerNationalityNewMandate" required>
                      </div>
                      <div class="form-group form-group-default input-group">
                        <div class="form-input-group">
                          <label>Altura</label>
                          <input type="text" class="form-control usd txtPlayerHeightNewMandate" required>
                        </div>
                        <div class="input-group-append ">
                          <span class="input-group-text">CM
                                </span>
                        </div>
                      </div>
                      <div class="form-group form-group-default input-group">
                        <div class="form-input-group">
                          <label>Peso</label>
                          <input type="text" class="form-control usd txtPlayerWeightNewMandate" required>
                        </div>
                        <div class="input-group-append ">
                          <span class="input-group-text">KG
                                </span>
                        </div>
                      </div>
                      <div class="card card-default">
                      <div class="card-header ">
                        <div class="card-title">Pé Dominante</div>
                        <div class="tools">
                          <a href="javascript:;" class="collapse"></a>
                          <a href="#grid-config" data-toggle="modal" class="config"></a>
                          <a href="javascript:;" class="reload"></a>
                          <a href="javascript:;" class="remove"></a>
                        </div>
                      </div>
                      <div class="card-body">
                        <select class="cs-select cs-skin-slide ddlPlayerFootNewMandate" data-init-plugin="cs-select">
                          <option value="selected" disabled="disabled">Escolha o pé dominante</option>
                          <option value="g">Esquerdo</option>
                          <option value="dd">Direito</option>
                          <option value="dc">Ambos</option>
                        </select> 
                      </div>
                    </div>
                      <div class="card card-default">
                        <div class="card-header ">
                          <div class="card-title">Posição</div>
                          <div class="tools">
                            <a href="javascript:;" class="collapse"></a>
                            <a href="#grid-config" data-toggle="modal" class="config"></a>
                            <a href="javascript:;" class="reload"></a>
                            <a href="javascript:;" class="remove"></a>
                          </div>
                        </div>
                        <div class="card-body">
                          <select class="cs-select cs-skin-slide ddlPlayerPositionNewMandate" data-init-plugin="cs-select">
                            <option value="selected" disabled="disabled">Escolha a posição</option>
                            <option value="g">Guarda-redes</option>
                            <option value="dd">Defesa direito</option>
                            <option value="dc">Defesa central</option>
                            <option value="de">Defesa esquerdo</option>
                            <option value="dc">Médio centro</option>
                            <option value="md">Médio direito</option>
                            <option value="me">Médio esquerdo</option>
                            <option value="mo">Médio ofensivo</option>
                            <option value="ee">Extremo esquerdo</option>
                            <option value="ed">Extremo direito</option>
                            <option value="a">Avançado</option>
                            <option value="pl">Ponta de lança</option>
                          </select> 
                        </div>
                      </div>
                      <div class="form-group form-group-default required ">
                        <label>Clube</label>
                        <form role="form">
                          <div class="form-group ">
                            <select class="full-width ddlPlayerMandateNew" data-init-plugin="select2"></select>
                          </div>
                        </form>
                      </div>
                      <div class="form-group form-group-default input-group">
                        <div class="form-input-group">
                          <label>Valor Mercado</label>
                          <input type="text" class="form-control usd txtPlayerValueNewMandate" required>
                        </div>
                        <div class="input-group-append ">
                          <span class="input-group-text">EUR
                                </span>
                        </div>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>CC/Passaporte</label>
                        <input type="text" class="form-control txtPlayerPassportNewMandate" required>
                      </div>
                      <div class="form-group form-group-default input-group">
                        <div class="form-input-group">
                          <label>Validade</label>
                          <input type="email" class="form-control txtPlayerPassportValNewMandate" placeholder="Selecione a data" id="datepicker-component2">
                        </div>
                        <div class="input-group-append ">
                          <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                        </div>
                      </div>
                      <br>
                      <button type="button" class="btn btn-primary btn-block btn-animated from-left pg pg-save btnSavePlayerNewMandate">
                        <span>Guardar</span>
                      </button>
                      <button type="button" data-dismiss="modal" class="btn btn-primary btn-block btn-animated from-left pg pg-close">
                        <span>Cancelar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END Modal -->

        <!-- Modal Edit Player -->
        <div class="modal fade slide-right" id="modalSlideLeft_playerEditMandate" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-sm">
            <div class="modal-content-wrapper">
              <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="pg-close fs-14"></i>
                </button>
                <div class="container-xs-height full-height">
                  <div class="row-xs-height">
                    <div class="modal-body col-xs-height col-middle">
                      <h5 style="text-align:center">EDITAR JOGADOR</h5>
                      <br>
                      <div class="form-group form-group-default required">
                        <label>Nome completo</label>
                        <input type="text" class="form-control txtPlayerNameEditMandate" required>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>Primeiro nome</label>
                        <input type="text" class="form-control txtPlayerFirstNameEditMandate">
                      </div>
                      <div class="form-group form-group-default required">
                        <label>último nome</label>
                        <input type="text" class="form-control txtPlayerLastNameEditMandate">
                      </div>
                      <div class="form-group form-group-default input-group ">
                        <div class="form-input-group disabled">
                          <label>Data de nascimento</label>
                          <input type="email" class="form-control txtPlayerBirthEditMandate" placeholder="Selecione a data" id="datepicker-component2">
                        </div>
                        <div class="input-group-append ">
                          <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                        </div>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>Nacionalidade</label>
                        <input type="text" class="form-control txtPlayerNationalityEditMandate" required>
                      </div>
                      <div class="form-group form-group-default input-group">
                        <div class="form-input-group">
                          <label>Altura</label>
                          <input type="text" class="form-control usd txtPlayerHeightEditMandate" required>
                        </div>
                        <div class="input-group-append ">
                          <span class="input-group-text">CM
                                </span>
                        </div>
                      </div>
                      <div class="form-group form-group-default input-group">
                        <div class="form-input-group">
                          <label>Peso</label>
                          <input type="text" class="form-control usd txtPlayerWeightEditMandate" required>
                        </div>
                        <div class="input-group-append ">
                          <span class="input-group-text">KG
                                </span>
                        </div>
                      </div>
                      <div class="card card-default">
                      <div class="card-header ">
                        <div class="card-title">Pé Dominante</div>
                        <div class="tools">
                          <a href="javascript:;" class="collapse"></a>
                          <a href="#grid-config" data-toggle="modal" class="config"></a>
                          <a href="javascript:;" class="reload"></a>
                          <a href="javascript:;" class="remove"></a>
                        </div>
                      </div>
                      <div class="card-body">
                        <select class="cs-select cs-skin-slide ddlPlayerFootEditMandate" data-init-plugin="cs-select">
                          <option value="selected" disabled="disabled">Escolha o pé dominante</option>
                          <option value="g">Esquerdo</option>
                          <option value="dd">Direito</option>
                          <option value="dc">Ambos</option>
                        </select> 
                      </div>
                    </div>
                      <div class="card card-default">
                        <div class="card-header ">
                          <div class="card-title">Posição</div>
                          <div class="tools">
                            <a href="javascript:;" class="collapse"></a>
                            <a href="#grid-config" data-toggle="modal" class="config"></a>
                            <a href="javascript:;" class="reload"></a>
                            <a href="javascript:;" class="remove"></a>
                          </div>
                        </div>
                        <div class="card-body">
                          <select class="cs-select cs-skin-slide ddlPlayerPositionEditMandate" data-init-plugin="cs-select">
                            <option value="selected" disabled="disabled">Escolha a posição</option>
                            <option value="g">Guarda-redes</option>
                            <option value="dd">Defesa direito</option>
                            <option value="dc">Defesa central</option>
                            <option value="de">Defesa esquerdo</option>
                            <option value="dc">Médio centro</option>
                            <option value="md">Médio direito</option>
                            <option value="me">Médio esquerdo</option>
                            <option value="mo">Médio ofensivo</option>
                            <option value="ee">Extremo esquerdo</option>
                            <option value="ed">Extremo direito</option>
                            <option value="a">Avançado</option>
                            <option value="pl">Ponta de lança</option>
                          </select> 
                        </div>
                      </div>
                      <div class="form-group form-group-default required ">
                        <label>Clube</label>
                        <form role="form">
                          <div class="form-group ">
                            <select class="full-width ddlPlayerMandateEdit" data-init-plugin="select2"></select>
                          </div>
                        </form>
                      </div>
                      <div class="form-group form-group-default input-group">
                        <div class="form-input-group">
                          <label>Valor Mercado</label>
                          <input type="text" class="form-control usd txtPlayerValueEditMandate" required>
                        </div>
                        <div class="input-group-append ">
                          <span class="input-group-text">EUR
                                </span>
                        </div>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>CC/Passaporte</label>
                        <input type="text" class="form-control txtPlayerPassportEditMandate" required>
                      </div>
                      <div class="form-group form-group-default input-group">
                        <div class="form-input-group">
                          <label>Validade</label>
                          <input type="email" class="form-control txtPlayerPassportValEditMandate" placeholder="Selecione a data" id="datepicker-component2">
                        </div>
                        <div class="input-group-append ">
                          <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                        </div>
                      </div>
                      <br>
                      <button type="button" class="btn btn-primary btn-block btn-animated from-left pg pg-save btnSavePlayerEditMandate">
                        <span>Guardar</span>
                      </button>
                      <button type="button" data-dismiss="modal" class="btn btn-primary btn-block btn-animated from-left pg pg-close">
                        <span>Cancelar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END Modal -->

        <!-- Modal New Agent -->
        <div class="modal fade slide-right" id="modalSlideLeft_agentNew" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-sm">
            <div class="modal-content-wrapper">
              <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="pg-close fs-14"></i>
                </button>
                <div class="container-xs-height full-height">
                  <div class="row-xs-height">
                    <div class="modal-body col-xs-height col-middle">
                      <h5 style="text-align:center">ADICIONAR AGENTE</h5>
                      <br>
                      <div class="form-group form-group-default required">
                        <label>Nome completo</label>
                        <input type="text" class="form-control txtAgentNewMandate">
                      </div>
                      <div class="form-group form-group-default required">
                        <label>Primeiro nome</label>
                        <input type="text" class="form-control txtAgentFirstNameNewMandate">
                      </div>
                      <div class="form-group form-group-default required">
                        <label>último nome</label>
                        <input type="text" class="form-control txtAgentLastNameNewMandate">
                      </div>
                      <div class="form-group form-group-default input-group ">
                        <div class="form-input-group disabled">
                          <label>Data de nascimento</label>
                          <input type="email" class="form-control txtAgentBirthNewMandate" placeholder="Selecione a data" id="datepicker-component2">
                        </div>
                        <div class="input-group-append ">
                          <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                        </div>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>Nacionalidade</label>
                        <input type="text" class="form-control txtAgentnationalityNewMandate" required>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>CC/Passaporte</label>
                        <input type="text" class="form-control txtAgentPassportNewMandate" required>
                      </div>
                      <div class="form-group form-group-default input-group">
                        <div class="form-input-group">
                          <label>Validade</label>
                          <input type="email" class="form-control txtAgentPassporValNewMandate" placeholder="Selecione a data" id="datepicker-component2">
                        </div>
                        <div class="input-group-append ">
                          <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                        </div>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>Nome da Empresa</label>
                        <input type="text" class="form-control txtAgentCompanyNewMandate" required>
                      </div>
                      <div class="form-group form-group-default required ">
                        <label>Clube</label>
                        <div class="col ctrClubsActions">
                              <button type="button" class="btn3 btn-primary float-right btnAddClubNew"style="margin-left: 7px; margin-top: 11px;" ><i class="fa fa-plus"></i></button>
                              <button type="button" class="btn3 btn-primary float-right btnDeleteClubNew" style="margin-top: 11px;" ><i class="fa fa-minus"></i></button>
                        </div>
                        <form role="form">
                          <div class="row">
                            <div class="col-md-11 ctrClubsListNew">    
                              <div class="form-group ">
                                <select class="full-width ddlAgentClubNewMandate" data-init-plugin="select2"></select>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>Países</label>
                        <input type="text" class="form-control txtAgentCountryNewMandate" required>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>Contactos</label>
                        <input type="text" class="form-control txtAgentContactNewMandate" required>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>Observações</label>
                        <input type="text" class="form-control txtAgentObsNewMandate" required>
                      </div>
                      <br>
                      <button type="button" class="btn btn-primary btn-block btn-animated from-left pg pg-save btnSaveAgentNewMandate">
                        <span>Guardar</span>
                      </button>
                      <button type="button" data-dismiss="modal" class="btn btn-primary btn-block btn-animated from-left pg pg-close">
                        <span>Cancelar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END Modal -->

        <!-- Modal edit Agent -->
        <div class="modal fade slide-right" id="modalSlideLeft_agentEdit" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-sm">
            <div class="modal-content-wrapper">
              <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="pg-close fs-14"></i>
                </button>
                <div class="container-xs-height full-height">
                  <div class="row-xs-height">
                    <div class="modal-body col-xs-height col-middle">
                      <h5 style="text-align:center">EDITAR AGENTE</h5>
                      <br>
                      <div class="form-group form-group-default required">
                        <label>Nome completo</label>
                        <input type="text" class="form-control txtAgentEditMandate">
                      </div>
                      <div class="form-group form-group-default required">
                        <label>Primeiro nome</label>
                        <input type="text" class="form-control txtAgentFirstNameEditMandate">
                      </div>
                      <div class="form-group form-group-default required">
                        <label>último nome</label>
                        <input type="text" class="form-control txtAgentLastNameEditMandate">
                      </div>
                      <div class="form-group form-group-default input-group ">
                        <div class="form-input-group disabled">
                          <label>Data de nascimento</label>
                          <input type="email" class="form-control txtAgentBirthEditMandate" placeholder="Selecione a data" id="datepicker-component2">
                        </div>
                        <div class="input-group-append ">
                          <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                        </div>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>Nacionalidade</label>
                        <input type="text" class="form-control txtAgentNationalityEditMandate" required>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>CC/Passaporte</label>
                        <input type="text" class="form-control txtAgentPassportEditMandate" required>
                      </div>
                      <div class="form-group form-group-default input-group">
                        <div class="form-input-group">
                          <label>Validade</label>
                          <input type="email" class="form-control txtAgentPassportValEditMandate" placeholder="Selecione a data" id="datepicker-component2">
                        </div>
                        <div class="input-group-append ">
                          <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                        </div>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>Nome da Empresa</label>
                        <input type="text" class="form-control txtAgentCompanyEditMandate" required>
                      </div>
                      <div class="form-group form-group-default required ">
                        <label>Clube</label>
                        <div class="col ctrClubsActions">
                              <button type="button" class="btn3 btn-primary float-right btnAddClubEdit"style="margin-left: 7px; margin-top: 11px;" ><i class="fa fa-plus"></i></button>
                              <button type="button" class="btn3 btn-primary float-right btnDeleteClubEdit" style="margin-top: 11px;" ><i class="fa fa-minus"></i></button>
                        </div>
                        <form role="form">
                          <div class="row">
                            <div class="col-md-11 ctrClubsListEdit">    
                              <div class="form-group ">
                                <select class="full-width ddlAgentClubEditMandate" data-init-plugin="select2"></select>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>Países</label>
                        <input type="text" class="form-control txtAgentCountryEditMandate" required>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>Contactos</label>
                        <input type="text" class="form-control txtAgentContactEditMandate" required>
                      </div>
                      <div class="form-group form-group-default required">
                        <label>Observações</label>
                        <input type="text" class="form-control txtAgentObsEditMandate" required>
                      </div>
                      <br>
                      <button type="button" class="btn btn-primary btn-block btn-animated from-left pg pg-save btnSaveAgentEditMandate">
                        <span>Guardar</span>
                      </button>
                      <button type="button" data-dismiss="modal" class="btn btn-primary btn-block btn-animated from-left pg pg-close">
                        <span>Cancelar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END Modal -->

          <!-- START CONTAINER FLUID -->
          <div class=" container-fluid container-fixed-lg">
            <div class="card-header">
              <div class="row h-100">
                <div class="col-lg-6 col-xs-12 my-auto">
                  <div class="card-title">
                  <h5 class="titleMandate"> ADICIONAR MANDATO</h5>
                  </div>
                </div>
                <div class="col-lg-6 col-xs-12 my-auto">
                  <div class="float-right">
                      <button type="button" onclick="location.href='mandates_list.php'" class="btn2 btn-primary btn-cons btn-animated from-left pg pg-close">
                        <span>Cancelar</span>
                      </button>
                      <button type="button" class="btn2 btn-primary btn-cons btn-animated from-left pg pg-save btnSaveMandates">
                        <span>Guardar</span>
                      </button>
                  </div>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
            
            <div class="row">
              <div class="col-lg-12">
                <!-- START card -->
                <div class="card card-transparent">
                  <div class="card-body">
                    <form class="" role="form">

                      <div class="col-lg-12 col-xs-12 my-auto">
                        <div class="float-left">
                          <div class="btn-group">
                            <button type="button" class="btn3 btn-primary addNewPlayer" style="margin-bottom: 15px; margin-right:10px;" data-target="#modalSlideLeft_playerNewMandate" data-toggle="modal" data-toggle="tooltip" data-placement="top" title="Adicionar"><i class="fa fa-plus"></i>
                            </button>
                            <button type="button" class="btn3 btn-primary editPlayer" style="margin-bottom: 15px; margin-right:10px;" data-target="#modalSlideLeft_playerEditMandate" data-toggle="modal" data-toggle="tooltip" data-placement="top" title="Editar"><i class="fa fa-pencil"></i>
                            </button>
                          </div>
                        </div>
                      </div> 

                      <div class="card card-default">
                        <div class="card-header ">
                          <div class="card-title">Jogador</div>
                            <div class="tools">
                              <a href="javascript:;" class="collapse"></a>
                              <a href="#grid-config" data-toggle="modal" class="config"></a>
                              <a href="javascript:;" class="reload"></a>
                              <a href="javascript:;" class="remove"></a>
                            </div>
                          </div>
                          <div class="card-body">
                            <select class="full-width ddlMandatePlayer" data-init-plugin="select2">
                            </select> 
                          </div>
                        </div>
                        <div class="form-group form-group-default required ">
                        <label>Agente</label>
                        <div class="col ctrAgentsActions">
                          <button type="button" class="btn3 btn-primary float-right btnAddAgent"style="margin-left: 7px; margin-top: 10px;" ><i class="fa fa-plus"></i></button>
                          <button type="button" class="btn3 btn-primary float-right btnDeleteAgent" style="margin-top: 10px;" ><i class="fa fa-minus"></i></button>
                        </div>
                        <div class="row">
                          <div class="col-md-12 ctrAgentsList"  style="padding-right: 30px;"> 
                            <select class="full-width ddlMandateAgent" data-init-plugin="select2"></select>
                            <div class="card-body" style="margin-top: -13px;">
                            </div>
                          </div>
                        </div>
                      </div>
                        
                        <div class="form-group form-group-default disabled">
                          <label>Empresa do agente</label>
                          <input type="text" class="form-control txtMandatesCompany">
                        </div>
                        <div class="form-group form-group-default disabled">
                          <label>Clubes do mandato</label>
                          <input type="text" class="form-control txtMandatesClub">
                        </div>
                        <div class="form-group form-group-default disabled">
                          <label>Países do mandato</label>
                          <input type="text" class="form-control txtMandatesCountry">
                        </div>
                        <div class="form-group form-group-default required">
                          <label>Data inicio e fim</label>
                          <div class="input-daterange input-group" id="datepicker-range">
                            <input type="text" class="input-sm form-control txtMandatesDateStart" name="start" />
                            <div class="input-group-addon">até</div>
                            <input type="text" class="input-sm form-control txtMandatesDateEnd" name="end" />
                          </div>
                        </div>
                        <div class="form-group form-group-default">
                          <label>Observações</label>
                          <input type="text" class="form-control txtMandatesObs">
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <!-- END card -->
              </div>
              <div class="row">
                <div class=" ctrFiles col-md-12"  style="padding-left: 25px;padding-right: 25px;">
                  <div class="card card-default">
                    <div class="card-header ">
                      <div class="card-title">
                        Documentos
                      </div>
                    </div>
                    <div class="card-body no-scroll no-padding ctrUploader">
                      <div class="dropzone no-margin">
                          <div class="files"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12" style="padding-left: 25px;padding-right: 25px;">
                  <div class="card card-default">
                    <div class="card-header ">
                      <div class="card-title">
                        upload de documentos
                      </div>
                      <div class="tools">
                        <a class="collapse" href="javascript:;"></a>
                        <a class="config" data-toggle="modal" href="#grid-config"></a>
                        <a class="reload" href="javascript:;"></a>
                        <a class="remove" href="javascript:;"></a>
                      </div>
                    </div>
                    <div class="card-body no-scroll no-padding ctrUploader">
                      <div id="box" class="dropzone no-margin">
                          <div class="files dz-default dz-message"></div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <!-- END CONTAINER FLUID -->
        </div>
        <!-- END PAGE CONTENT -->
      </div>
      <!-- END PAGE CONTENT WRAPPER -->
    </div>
    <!-- END PAGE CONTAINER -->
    
    <!-- BEGIN VENDOR JS -->
    <script src="assets/plugins/pace/pace.min.js" type="text/javascript"></script>
    <script src="assets/plugins/jquery/jquery-3.2.1.min.js" type="text/javascript"></script>
    <script src="assets/plugins/modernizr.custom.js" type="text/javascript"></script>
    <script src="assets/plugins/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>
    <script src="assets/plugins/popper/umd/popper.min.js" type="text/javascript"></script>
    <script src="assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="assets/plugins/jquery/jquery-easy.js" type="text/javascript"></script>
    <script src="assets/plugins/jquery-unveil/jquery.unveil.min.js" type="text/javascript"></script>
    <script src="assets/plugins/jquery-ios-list/jquery.ioslist.min.js" type="text/javascript"></script>
    <script src="assets/plugins/jquery-actual/jquery.actual.min.js"></script>
    <script src="assets/plugins/jquery-scrollbar/jquery.scrollbar.min.js"></script>
    <script type="text/javascript" src="assets/plugins/select2/js/select2.full.min.js"></script>
    <script type="text/javascript" src="assets/plugins/classie/classie.js"></script>
    <script src="assets/plugins/switchery/js/switchery.min.js" type="text/javascript"></script>
    <script src="assets/plugins/jquery-datatable/media/js/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="assets/plugins/jquery-datatable/extensions/TableTools/js/dataTables.tableTools.min.js" type="text/javascript"></script>
    <script src="assets/plugins/jquery-datatable/media/js/dataTables.bootstrap.js" type="text/javascript"></script>
    <script src="assets/plugins/jquery-datatable/extensions/Bootstrap/jquery-datatable-bootstrap.js" type="text/javascript"></script>
    <script type="text/javascript" src="assets/plugins/datatables-responsive/js/datatables.responsive.js"></script>
    <script type="text/javascript" src="assets/plugins/datatables-responsive/js/lodash.min.js"></script>
      <script src="assets/plugins/bootstrap3-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
     <script type="text/javascript" src="assets/plugins/jquery-autonumeric/autoNumeric.js"></script>
     <script type="text/javascript" src="assets/plugins/bootstrap-tag/bootstrap-tagsinput.min.js"></script>
     <script type="text/javascript" src="assets/plugins/jquery-inputmask/jquery.inputmask.min.js"></script>
     <script src="assets/plugins/bootstrap-form-wizard/js/jquery.bootstrap.wizard.min.js" type="text/javascript"></script>
     <script src="assets/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
     <script src="assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js" type="text/javascript"></script>
     <script src="assets/plugins/summernote/js/summernote.min.js" type="text/javascript"></script>
     <script src="assets/plugins/moment/moment.min.js"></script>
     <script src="assets/plugins/bootstrap-daterangepicker/daterangepicker.js"></script>
     <script src="assets/plugins/bootstrap-timepicker/bootstrap-timepicker.min.js"></script>
     <script src="assets/plugins/bootstrap-typehead/typeahead.bundle.min.js"></script>
     <script src="assets/plugins/bootstrap-typehead/typeahead.jquery.min.js"></script>
     <script src="assets/plugins/handlebars/handlebars-v4.0.5.js"></script>
     <script src="js/dropzone/file-dropzone.js"></script>
     <!-- END VENDOR JS -->
    <!-- BEGIN CORE TEMPLATE JS -->
    <script src="pages/js/pages.js"></script>
    <!-- END CORE TEMPLATE JS -->
    <!-- BEGIN PAGE LEVEL JS -->
    <script src="assets/js/scripts.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL JS -->
    <!-- BEGIN PAGE LEVEL JS -->
    <script src="assets/js/demo.js" type="text/javascript"></script>
    <script src="assets/js/form_elements.js" type="text/javascript"></script>
    <script src="assets/js/scripts.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL JS -->
    <script src="js/toolkit.js"></script>
    <script src="js/controls.js"></script>
    <script src="js/default.js"></script>
    <?php
      include('data/objects.php');
    ?>
    <script type="text/javascript">
      $(document).ready(function(){
        mandates({ data: <?php echo (isset($_POST['parameters'])) ? urldecode($_POST['parameters']) : '{}'; ?>, mandates: <?php echo json_encode(new mandates(null)); ?>, player: <?php echo json_encode(new player(null)); ?>, agent: <?php echo json_encode(new agent(null)); ?>, coach: <?php echo json_encode(new coach(null)); ?>});
        user();
      });
    </script>
  </body>
</html>
