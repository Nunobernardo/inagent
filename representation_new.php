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
    <meta content="" name="description" />
    <meta content="" name="author" />
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
  </head>
  <body class="fixed-header ">
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
          <li>
            <a href="javascript:;"><span class="title">Representação</span>
            <span class=" arrow"></span></a>
            <span class="bg-secondary icon-thumbnail"><i class="fa fa-file-text"></i></span>
            <ul class="sub-menu">
              <li class="">
                <a href="representation_list.php">Lista de contratos</a>
                <span class="icon-thumbnail"><i class="fa fa-list-ul"></i></span>
              </li>
              <li class="">
                <a href="representation_new.php">Adicionar contrato</a>
                <span class="bg-secondary icon-thumbnail"><i class="fa fa-plus"></i></span>
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
                <a href="clubs_new.php">Adicionar contrato</a>
                <span class="icon-thumbnail"><i class="fa fa-plus"></i></span>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:;"><span class="title">Mandatos</span>
            <span class=" arrow"></span></a>
            <span class="icon-thumbnail"><i class="pg-note"></i></span>
            <ul class="sub-menu">
              <li class="">
                <a href="mandates_list.php">Lista de mandatos</a>
                <span class="icon-thumbnail"><i class="fa fa-list-ul"></i></span>
              </li>
              <li class="">
                <a href="mandates_new.php">Adicionar mandato</a>
                <span class="icon-thumbnail"><i class="fa fa-plus"></i></span>
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
          <!-- START NOTIFICATION LIST -->
          <ul class="d-lg-inline-block d-none notification-list no-margin d-lg-inline-block b-grey b-l b-r no-style p-l-30 p-r-20">
            <li class="p-r-10 inline">
              <div class="dropdown">
                <a href="javascript:;" id="notification-center" class="header-icon pg pg-world" data-toggle="dropdown">
                  <span class="bubble"></span>
                </a>
                <!-- START Notification Dropdown -->
                <div class="dropdown-menu notification-toggle" role="menu" aria-labelledby="notification-center">
                  <!-- START Notification -->
                  <div class="notification-panel">
                    <!-- START Notification Body-->
                    <div class="notification-body scrollable">
                      <!-- START Notification Item-->
                      <div class="notification-item unread clearfix">
                        <!-- START Notification Item-->
                        <div class="heading">
                          <a href="#" class="text-complete pull-left">
                          <i class="fa fa-exclamation-triangle m-r-10 text-danger"></i>
                            <span class="bold">Fábio Abreu</span>
                            <span class="fs-12 m-l-10 text-white">Contrato a terminar</span>
                          </a>
                          <div class="pull-right">
                            <div class="thumbnail-wrapper d16 circular inline m-t-15 m-r-10 toggle-more-details">
                              <div><i class="fa fa-angle-left"></i>
                              </div>
                            </div>
                          </div>
                          <div class="more-details" >
                            <div class="small hint-text">
                              <h5 class="semi-bold fs-16">Contrato de representação termina a 21/12/2021<br></h5>
                            </div>
                          </div>
                        </div>
                        <!-- END Notification Item-->
                      </div>

                      <div class="notification-item unread clearfix">
                        <!-- START Notification Item-->
                        <div class="heading">
                          <a href="#" class="text-complete pull-left">
                          <i class="fa fa-birthday-cake m-r-10 text-danger"></i>
                            <span class="bold">Vitorino Antunes</span>
                            <span class="fs-12 m-l-10 text-white">Aniversário</span>
                          </a>
                          <div class="pull-right">
                            <div class="thumbnail-wrapper d16 circular inline m-t-15 m-r-10 toggle-more-details">
                              <div><i class="fa fa-angle-left"></i>
                              </div>
                            </div>
                          </div>
                          <div class="more-details" >
                            <div class="small hint-text">
                              <h5 class="semi-bold fs-16">Faz anos no dia 21/12/2021<br></h5>
                            </div>
                          </div>
                        </div>
                        <!-- END Notification Item-->
                      </div>
                    </div>
                    <!-- END Notification Body-->
                  </div>
                  <!-- END Notification -->
                </div>
                <!-- END Notification Dropdown -->
              </div>
            </li>
          </ul>
          <!-- END NOTIFICATIONS LIST -->
          <a href="#" class="search-link d-lg-inline-block d-none" data-toggle="search"><i class="pg-search"></i>Procurar</a>
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
                          <input type="text" class="form-control">
                        </div>
                        <div class="form-group form-group-default required">
                          <label>Primeiro nome</label>
                          <input type="text" class="form-control">
                        </div>
                        <div class="form-group form-group-default required">
                          <label>último nome</label>
                          <input type="text" class="form-control">
                        </div>
                        <div class="form-group form-group-default">
                          <label>Alterar password</label>
                          <input type="text" class="form-control" required>
                        </div>
                        <br>
                        <button type="button" onclick="location.href='representation_new.php'" class="btn btn-primary btn-block btn-animated from-left pg pg-save">
                          <span>Guardar</span>
                        </button>
                        <button type="button" onclick="location.href='representation_new.php'" class="btn btn-primary btn-block btn-animated from-left pg pg-close">
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
          <div class="modal fade slide-right" id="modalSlideLeft" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
              <div class="modal-content-wrapper">
                <div class="modal-content">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="pg-close fs-14"></i>
                  </button>
                  <div class="container-xs-height full-height">
                    <div class="row-xs-height">
                      <div class="modal-body col-xs-height col-middle">
                        <h5 style="text-align:center">Jogador</h5>
                        <br>
                        <div class="form-group form-group-default required">
                          <label>Nome completo</label>
                          <input type="text" class="form-control">
                        </div>
                        <div class="form-group form-group-default required">
                          <label>Primeiro nome</label>
                          <input type="text" class="form-control">
                        </div>
                        <div class="form-group form-group-default required">
                          <label>último nome</label>
                          <input type="text" class="form-control">
                        </div>
                        <div class="form-group form-group-default input-group ">
                          <div class="form-input-group disabled">
                            <label>Data de nascimento</label>
                            <input type="email" class="form-control" placeholder="Selecione a data" id="datepicker-component2">
                          </div>
                          <div class="input-group-append ">
                            <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                          </div>
                        </div>
                        <div class="form-group form-group-default required">
                          <label>Nacionalidade</label>
                          <input type="text" class="form-control" required>
                        </div>
                        <div class="form-group form-group-default input-group">
                          <div class="form-input-group">
                            <label>Altura</label>
                            <input type="text" class="form-control usd" required>
                          </div>
                          <div class="input-group-append ">
                            <span class="input-group-text">CM
                                  </span>
                          </div>
                        </div>
                        <div class="form-group form-group-default input-group">
                          <div class="form-input-group">
                            <label>Peso</label>
                            <input type="text" class="form-control usd" required>
                          </div>
                          <div class="input-group-append ">
                            <span class="input-group-text">KG
                                  </span>
                          </div>
                        </div>
                        <div class="form-group form-group-default">
                          <label>Pé dominante</label>
                          <input type="text" class="form-control" required>
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
                            <select class="cs-select cs-skin-slide" data-init-plugin="cs-select">
                              <option value="sightseeing">Guarda-redes</option>
                              <option value="business">Defesa direito</option>
                              <option value="honeymoon">Defesa central</option>
                              <option value="honeymoon">Defesa esquerdo</option>
                              <option value="honeymoon">Médio centro</option>
                              <option value="honeymoon">Defesa direito</option>
                              <option value="honeymoon">Defesa esquerdo</option>
                              <option value="honeymoon">Defesa ofensivo</option>
                              <option value="honeymoon">Extremo esquerdo</option>
                              <option value="honeymoon">Extremo direito</option>
                              <option value="honeymoon">Avançado</option>
                              <option value="honeymoon">Ponta de lança</option>
                            </select> 
                          </div>
                        </div>
                        <div class="form-group form-group-default required ">
                          <label>Clube</label>
                          <input type="text" class="form-control" required>
                        </div>
                        <div class="form-group form-group-default input-group">
                          <div class="form-input-group">
                            <label>Valor Mercado</label>
                            <input type="text" class="form-control usd" required>
                          </div>
                          <div class="input-group-append ">
                            <span class="input-group-text">EUR
                                  </span>
                          </div>
                        </div>
                        <div class="form-group form-group-default required">
                          <label>CC/Passaporte</label>
                          <input type="text" class="form-control" required>
                        </div>
                        <div class="form-group form-group-default input-group">
                          <div class="form-input-group">
                            <label>Validade</label>
                            <input type="email" class="form-control" placeholder="Selecione a data" id="datepicker-component2">
                          </div>
                          <div class="input-group-append ">
                            <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                          </div>
                        </div>
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
                          <div class="card-body no-scroll no-padding">
                            <form action="/file-upload" class="dropzone no-margin">
                              <div class="fallback">
                                <input name="file" type="file" multiple/>
                              </div>
                            </form>
                          </div>
                        </div>
                        <br>
                        <button type="button" onclick="location.href='representation_new.php'" class="btn btn-primary btn-block btn-animated from-left pg pg-save">
                          <span>Guardar</span>
                        </button>
                        <button type="button" onclick="location.href='representation_new.php'" class="btn btn-primary btn-block btn-animated from-left pg pg-close">
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
                    <h5>Adicionar Contrato de Representação</h5>
                  </div>
                </div>
                <div class="col-lg-6 col-xs-12 my-auto">
                  <div class="float-right">
                      <button type="button" onclick="location.href='representation_list.php'" class="btn btn-primary btn-cons btn-animated from-left pg pg-close">
                        <span>Cancelar</span>
                      </button>
                      <button type="button" class="btn btn-primary btn-cons btn-animated from-left pg pg-save btnSaveRepresentation">
                        <span>Guardar</span>
                      </button>
                  </div>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <!-- START card -->
                <div class="card card-transparent">
                  <div class="card-body">
                    <form class="" role="form">
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
                          <select class="cs-select cs-skin-slide ddlRepresentationPlayer" data-init-plugin="cs-select">
                            <option value="sightseeing">Fábio Abreu</option>
                            <option value="business">Antunes</option>
                          </select> 
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group form-group-default input-group">
                            <div class="form-input-group">
                              <label class="inline">Menor</label>
                            </div>
                            <div class="input-group-append h-c-50">
                              <span class="input-group-text transparent">
                                  <input type="checkbox" id = "boxchecked" name="CheckboxGroup1" data-size="small" data-color="success" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group form-group-default" id="hidden" style="display:none;">
                        <label>Nome do Pai</label>
                        <input type="text" class="form-control txtRepresentationFather" >
                      </div>
                      <div class="form-group form-group-default" id="hidden2" style="display:none;">
                        <label>Nome da Mãe</label>
                        <input type="text" class="form-control txtRepresentationMother">
                      </div>
                      <div class="form-group form-group-default required">
                        <label>Data inicio e fim</label>
                        <div class="input-daterange input-group" id="datepicker-range">
                          <input type="text" class="input-sm form-control txtRepresentationDateStart" name="start" />
                          <div class="input-group-addon">até</div>
                          <input type="text" class="input-sm form-control txtRepresentationDateEnd" name="end" />
                        </div>
                      </div>
                      <div class="form-group form-group-default input-group">
                        <div class="form-input-group">
                          <label>Comissão</label>
                          <input type="text" class="form-control usd txtRepresentationCommission" required>
                        </div>
                        <div class="input-group-append ">
                          <span class="input-group-text">EUR
                                </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <!-- END card -->
              </div>

              <div class="col-lg-6">
                <!-- START card -->
                <div class="card card-transparent">
                  <div class="card-body">
                    <form class="" role="form">
                      
                      <div class="card-header">
                        <div class="row h-100">
                          <div class="col-lg-6 col-xs-12 my-auto">
                            <div class="card-title">
                              <h5>Dados do Jogador</h5>
                            </div>
                          </div>
                          <div class="col-lg-6 col-xs-12 my-auto">
                            <div class="float-right">
                              <div class="btn-group">
                                <button type="button" class="btn btn-primary" data-target="#modalSlideLeft" data-toggle="modal" data-toggle="tooltip" data-placement="top" title="Adicionar"><i class="fa fa-plus"></i>
                                </button>
                                <button type="button" class="btn btn-primary" data-target="#modalSlideLeft" data-toggle="modal" data-toggle="tooltip" data-placement="top" title="Editar"><i class="fa fa-pencil"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group form-group-default disabled">
                            <label>Primeiro nome</label>
                            <input type="text" class="form-control">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group form-group-default disabled">
                            <label>Último nome</label>
                            <input type="text" class="form-control">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group form-group-default input-group disabled">
                            <div class="form-input-group disabled">
                              <label>Data de nascimento</label>
                              <input type="email" class="form-control" placeholder="Selecione a data" id="datepicker-component2">
                            </div>
                            <div class="input-group-append ">
                              <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group form-group-default disabled">
                            <label>Idade</label>
                            <input type="text" class="form-control">
                          </div>
                        </div>
                      </div>
                      <div class="form-group form-group-default disabled">
                        <label>Nacionalidade</label>
                        <input type="text" class="form-control">
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group form-group-default disabled">
                            <label>Altura</label>
                            <input type="text" class="form-control">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group form-group-default disabled">
                            <label>Peso</label>
                            <input type="text" class="form-control">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group form-group-default disabled">
                            <label>Clube</label>
                            <input type="text" class="form-control">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group form-group-default disabled">
                            <label>Valor de mercardo</label>
                            <input type="text" class="form-control">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group form-group-default disabled ">
                            <label>CC/Passaporte</label>
                            <input type="text" class="form-control" required>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group form-group-default input-group disabled">
                            <div class="form-input-group">
                              <label>Validade</label>
                              <input type="email" class="form-control" placeholder="Selecione a data" id="datepicker-component2">
                            </div>
                            <div class="input-group-append ">
                              <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <!-- END card -->
              </div>

              <div class="col-lg-12" style="padding-left: 30px;padding-right: 30px;">
                <!-- START card -->
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
                  <div class="card-body no-scroll no-padding">
                    <form action="/file-upload" class="dropzone no-margin">
                      <div class="fallback">
                        <input name="file" type="file" multiple/>
                      </div>
                    </form>
                  </div>
                </div>
                <!-- END card -->
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
    
    <!-- START OVERLAY -->
    <div class="overlay hide" data-pages="search">
      <!-- BEGIN Overlay Content !-->
      <div class="overlay-content has-results m-t-20">
        <!-- BEGIN Overlay Header !-->
        <div class="container-fluid-search">
          <!-- BEGIN Overlay Logo !-->
          <img class="overlay-brand" src="assets/img/logo.png" alt="logo" data-src="assets/img/logo.png" data-src-retina="assets/img/logo_2x.png" width="78" height="22">
          <!-- END Overlay Logo !-->
          <!-- BEGIN Overlay Close !-->
          <a href="#" class="close-icon-light overlay-close text-black fs-16">
            <i class="pg-close"></i>
          </a>
          <!-- END Overlay Close !-->
        </div>
        <!-- END Overlay Header !-->
        <div class="container-fluid-search">
          <!-- BEGIN Overlay Controls !-->
          <input id="overlay-search" class="no-border overlay-search bg-transparent" style="color:white" placeholder="Procurar..." autocomplete="off" spellcheck="false">
          <br>
          <!-- END Overlay Controls !-->
        </div>
        <!-- BEGIN Overlay Search Results, This part is for demo purpose, you can add anything you like !-->
        <div class="container-fluid-search">
          <div class="search-results m-t-40">
            <p class="bold">Resultados:</p>
            <div class="row">
              <div class="col-md-6">
                <!-- BEGIN Search Result Item !-->
                <div class="">
                  <!-- BEGIN Search Result Item Thumbnail !-->
                  <div class="thumbnail-wrapper d48 circular bg-success text-white inline m-t-10">
                    <div>
                      <img width="50" height="50" src="assets/img/profiles/avatar.jpg" data-src="assets/img/profiles/avatar.jpg" data-src-retina="assets/img/profiles/avatar2x.jpg" alt="">
                    </div>
                  </div>
                  <!-- END Search Result Item Thumbnail !-->
                  <div class="p-l-10 inline p-t-5">
                    <h5 class="m-b-5"><span class="semi-bold result-name">ice cream</span> on pages</h5>
                    <p class="hint-text">via john smith</p>
                  </div>
                </div>
                <!-- END Search Result Item !-->
                <!-- BEGIN Search Result Item !-->
                <div class="">
                  <!-- BEGIN Search Result Item Thumbnail !-->
                  <div class="thumbnail-wrapper d48 circular bg-success text-white inline m-t-10">
                    <div>T</div>
                  </div>
                  <!-- END Search Result Item Thumbnail !-->
                  <div class="p-l-10 inline p-t-5">
                    <h5 class="m-b-5"><span class="semi-bold result-name">ice cream</span> related topics</h5>
                    <p class="hint-text">via pages</p>
                  </div>
                </div>
                <!-- END Search Result Item !-->
              </div>
            </div>
          </div>
        </div>
        <!-- END Overlay Search Results !-->
      </div>
      <!-- END Overlay Content !-->
    </div>
    <!-- END OVERLAY -->

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
     <script type="text/javascript" src="assets/plugins/dropzone/dropzone.min.js"></script>
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
     <!-- END VENDOR JS -->
    <!-- BEGIN CORE TEMPLATE JS -->
    <script src="pages/js/pages.js"></script>
    <!-- END CORE TEMPLATE JS -->
    <!-- BEGIN PAGE LEVEL JS -->
    <script src="assets/js/scripts.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL JS -->
    <!-- BEGIN PAGE LEVEL JS -->
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
        representation({ data: <?php echo (isset($_POST['parameters'])) ? urldecode($_POST['parameters']) : '{}'; ?>, representation: <?php echo json_encode(new representation(null)); ?>});
      });
      
      $(document).ready(function(){
        $("#boxchecked").click(function ()
        {
          if ($("#boxchecked").is(':checked'))
          {
              $("#hidden").show();
              $("#hidden2").show();
          }
          else
          {
              $("#hidden").hide();
              $("#hidden2").hide();
          }              
        });
      });
    </script>
  </body>
</html>