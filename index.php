<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <meta charset="utf-8" />
    <title>InAgent</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no" />
    <link rel="apple-touch-icon" href="pages/ico/60.png">
    <link rel="apple-touch-icon" sizes="76x76" href="pages/ico/76.png">
    <link rel="apple-touch-icon" sizes="120x120" href="pages/ico/120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="pages/ico/152.png">
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <link href="assets/plugins/pace/pace-theme-flash.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/jquery-scrollbar/jquery.scrollbar.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="assets/plugins/select2/css/select2.min.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="assets/plugins/switchery/css/switchery.min.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="assets/plugins/nvd3/nv.d3.min.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="assets/plugins/mapplic/css/mapplic.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/rickshaw/rickshaw.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/bootstrap-datepicker/css/datepicker3.css" rel="stylesheet" type="text/css" media="screen">
    <link href="assets/plugins/jquery-metrojs/MetroJs.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="pages/css/pages-icons.css" rel="stylesheet" type="text/css">
    <link class="main-stylesheet" href="pages/css/pages.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/controls.css" rel="stylesheet" type="text/css"/>
  </head>
  <body class="fixed-header dashboard">
    <!-- BEGIN SIDEBAR-->
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
            <span class="bg-secondary icon-thumbnail"><i class="pg-home"></i></span>
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
            <span class="icon-thumbnail"><i class="fa fa-file-text"></i></span>
            <ul class="sub-menu">
              <li class="">
                <a href="representation_list.php">Lista de contratos</a>
                <span class="icon-thumbnail"><i class="fa fa-list-ul"></i></span>
              </li>
              <li class="">
                <a href="representation_new.php">Adicionar contrato</a>
                <span class="icon-thumbnail"><i class="fa fa-plus"></i></span>
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
        <div class="content sm-gutter">

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
                        <button type="button" onclick="location.href='index.php'" class="btn btn-primary btn-block btn-animated from-left pg pg-save">
                          <span>Guardar</span>
                        </button>
                        <button type="button" onclick="location.href='index.php'" class="btn btn-primary btn-block btn-animated from-left pg pg-close">
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
          <div class="container-fluid padding-25 sm-padding-10">
          <div class="row">
            <div class="col-lg-12 col-xlg-12">
              <div class="row">
                <div class="col-sm-3 m-b-10">
                  <div class="ar-1-1">
                    <!-- START WIDGET widget_imageWidgetBasic-->
                    <div class="widget-2-1 card no-border bg-primary widget widget-loader-circle-lg no-margin">
                      <div class="card-body">
                        <div class="pull-bottom bottom-left bottom-right padding-25">
                          <span class="label font-montserrat fs-11">Atletas</span>
                          <br>
                          <h4 class="text-white">
                            <a href="players_list.php">Jogadores</a>
                           </h4>
                           <h4 class="text-white">
                            <a href="coaches_list.php">Treinadores</a>
                           </h4>
                        </div>
                      </div>
                    </div>
                    <!-- END WIDGET -->
                  </div>
                </div>
                <div class="col-sm-3 m-b-10">
                  <div class="ar-1-1">
                    <!-- START WIDGET widget_imageWidgetBasic-->
                    <div class="widget-2-2 card no-border bg-primary widget widget-loader-circle-lg no-margin">
                      <div class="card-body">
                        <div class="pull-bottom bottom-left bottom-right padding-25">
                          <span class="label font-montserrat fs-11">Contratos</span>
                          <br>
                          <h4 class="text-white">
                            <a href="representation_list.php">Representação</a>
                           </h4>
                           <h4 class="text-white">
                            <a href="clubs_list.php">Clube</a>
                           </h4>
                        </div>
                      </div>
                    </div>
                    <!-- END WIDGET -->
                  </div>
                </div>
                <div class="col-sm-3 m-b-10">
                  <div class="ar-1-1">
                    <!-- START WIDGET widget_imageWidgetBasic-->
                    <div class="widget-2-3 card no-border bg-primary widget widget-loader-circle-lg no-margin">
                      <div class="card-body">
                        <div class="pull-bottom bottom-left bottom-right padding-25">
                          <span class="label font-montserrat fs-11">Intermediações</span>
                          <br>
                          <h4 class="text-white">
                            <a href="mandates_list.php">Mandatos</a>
                           </h4>
                           <br><br>
                        </div>
                      </div>
                    </div>
                    <!-- END WIDGET -->
                  </div>
                </div>
                <div class="col-sm-3 m-b-10">
                  <div class="ar-1-1">
                    <!-- START WIDGET widget_imageWidgetBasic-->
                    <div class="widget-2-4 card no-border bg-primary widget widget-loader-circle-lg no-margin">
                      <div class="card-body">
                        <div class="pull-bottom bottom-left bottom-right padding-25">
                          <span class="label font-montserrat fs-11">Contatos</span>
                          <br>
                          <h4 class="text-white">
                            <a href="agents_list.php">Agentes</a>
                           </h4>
                           <br><br>
                        </div>
                      </div>
                    </div>
                    <!-- END WIDGET -->
                  </div>
                </div>
              </div>
            </div>
          </div>

            <div class="row">
              <div class="col-lg-6 col-xl-4 m-b-10 hidden-xlg">
                <!-- START WIDGET widget_tableWidgetBasic-->
                <div class="widget-11-2 card no-border card-condensed no-margin widget-loader-circle full-height d-flex flex-column">
                  <div class="padding-25">
                    <div class="pull-left">
                      <h2 class="text-success no-margin">Contratos representação</h2>
                      <p class="no-margin">Data do fim de contratos</p>
                    </div>
                    <h3 class="marketTotalLeague pull-right semi-bold"></h3>
                    <div class="clearfix"></div>
                  </div>

                  <div class="auto-overflow widget-11-2-table">
                    <table class="table table-hover">
                      <tbody role="row" class="row_league"></tbody>
                    </table>
                  </div>
                </div>
                <!-- END WIDGET -->
              </div>

              <div class="col-lg-6 col-xl-4 m-b-10 hidden-xlg">
                <!-- START WIDGET widget_tableWidgetBasic-->
                <div class="widget-11-2 card no-border card-condensed no-margin widget-loader-circle full-height d-flex flex-column">
                  <div class="padding-25">
                    <div class="pull-left">
                      <h2 class="text-success no-margin">Aniversário</h2>
                      <p class="no-margin">O próximo aniversário</p>
                    </div>
                    <div class="clearfix"></div>
                  </div>

                  <div class="auto-overflow widget-11-2-table">
                    <table class="table table-hover">
                      <tbody role="row" class="row_birth"></tbody>
                    </table>
                  </div>
                </div>
                <!-- END WIDGET -->
              </div>

              <div class="col-lg-6 col-xl-4 m-b-10 hidden-xlg">
                <!-- START TABLE MARKET VALUE-->
                <div class="widget-11-2 card no-border card-condensed no-margin widget-loader-circle full-height d-flex flex-column">
                  <div class="padding-25">
                    <div class="pull-left">
                      <h2 class="text-success no-margin">Valor de mercado</h2>
                      <p class="no-margin">Mais valiosos</p>
                    </div>
                      <h3 class="marketTotalValue pull-right semi-bold"></h3>
                    <div class="clearfix"></div>
                  </div>

                  <div class="auto-overflow widget-11-2-table">
                    <table class="table table-hover">
                      <tbody role="row" class="row_value"></tbody>
                    </table>
                  </div>
                </div>
                <!-- END WIDGET -->
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6 col-xl-4 m-b-10 hidden-xlg">
                <!-- START WIDGET widget_tableWidgetBasic-->
                <div class="widget-11-2 card no-border card-condensed no-margin widget-loader-circle full-height d-flex flex-column">
                  <div class="padding-25">
                    <div class="pull-left">
                      <h2 class="text-success no-margin">Clube</h2>
                      <p class="no-margin">Total de clubes</p>
                    </div>
                    <h3 class="marketTotalClubs pull-right semi-bold"></h3>
                    <div class="clearfix"></div>
                  </div>

                  <div class="auto-overflow widget-11-2-table">
                    <table class="table table-hover">
                      <tbody role="row" class="row_clubs_index"></tbody>
                    </table>
                  </div>
                </div>
                <!-- END WIDGET -->
              </div>
              
              <div class="col-lg-6 col-xl-4 m-b-10 hidden-xlg">
                <!-- START WIDGET widget_tableWidgetBasic-->
                <div class="widget-11-2 card no-border card-condensed no-margin widget-loader-circle full-height d-flex flex-column">
                  <div class="padding-25">
                    <div class="pull-left">
                      <h2 class="text-success no-margin">Posição</h2>
                      <p class="no-margin">Totais por posição</p>
                    </div>
                    <h3 class="marketTotalPosition pull-right semi-bold"></h3>
                    <div class="clearfix"></div>
                  </div>
                  <div class="auto-overflow widget-11-2-table">
                    <table class="table table-hover">
                      <tbody role="row" class="row_position"></tbody>
                    </table>
                  </div>
                </div>
                <!-- END WIDGET -->
              </div>
             
              <div class="col-lg-6 col-xl-4 m-b-10 hidden-xlg">
                <!-- START WIDGET widget_tableWidgetBasic-->
                <div class="widget-11-2 card no-border card-condensed no-margin widget-loader-circle full-height d-flex flex-column">
                  <div class="padding-25">
                    <div class="pull-left">
                      <h2 class="text-success no-margin">Nacionalidades</h2>
                      <p class="no-margin">Totais por nacionalidades</p>
                    </div>
                    <h3 class="marketTotalNationality pull-right semi-bold"></h3>
                    <div class="clearfix"></div>
                  </div>
                  
                  <div class="auto-overflow widget-11-2-table">
                    <table class="table table-hover">
                      <tbody role="row" class="row_nationality"></tbody>
                    </table>
                  </div>
                </div>
                <!-- END WIDGET -->
              </div>
            </div>
          </div>
          <!-- END CONTAINER FLUID -->
        </div>
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
    <script src="assets/plugins/nvd3/lib/d3.v3.js" type="text/javascript"></script>
    <script src="assets/plugins/nvd3/nv.d3.min.js" type="text/javascript"></script>
    <script src="assets/plugins/nvd3/src/utils.js" type="text/javascript"></script>
    <script src="assets/plugins/nvd3/src/tooltip.js" type="text/javascript"></script>
    <script src="assets/plugins/nvd3/src/interactiveLayer.js" type="text/javascript"></script>
    <script src="assets/plugins/nvd3/src/models/axis.js" type="text/javascript"></script>
    <script src="assets/plugins/nvd3/src/models/line.js" type="text/javascript"></script>
    <script src="assets/plugins/nvd3/src/models/lineWithFocusChart.js" type="text/javascript"></script>
    <script src="assets/plugins/mapplic/js/hammer.min.js"></script>
    <script src="assets/plugins/mapplic/js/jquery.mousewheel.js"></script>
    <script src="assets/plugins/mapplic/js/mapplic.js"></script>
    <script src="assets/plugins/rickshaw/rickshaw.min.js"></script>
    <script src="assets/plugins/jquery-metrojs/MetroJs.min.js" type="text/javascript"></script>
    <script src="assets/plugins/jquery-sparkline/jquery.sparkline.min.js" type="text/javascript"></script>
    <script src="assets/plugins/skycons/skycons.js" type="text/javascript"></script>
    <script src="assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js" type="text/javascript"></script>
    <!-- END VENDOR JS -->
    <!-- BEGIN CORE TEMPLATE JS -->
    <script src="pages/js/pages.js"></script>
    <!-- END CORE TEMPLATE JS -->
    <!-- BEGIN PAGE LEVEL JS -->
    <script src="assets/js/scripts.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL JS -->
    <!-- BEGIN PAGE LEVEL JS -->
    <script src="assets/js/dashboard.js" type="text/javascript"></script>
    <script src="assets/js/scripts.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL JS -->
    <script src="js/toolkit.js"></script>
    <script src="js/controls.js"></script>
    <script src="js/default.js"></script>

    <script type='text/javascript'>
      $(document).ready(function () {
        list_index();
        ///list_nationality();
      });
    </script>
  </body>
</html>