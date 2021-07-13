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
    <link href="assets/plugins/jquery-datatable/media/css/dataTables.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/jquery-datatable/extensions/FixedColumns/css/dataTables.fixedColumns.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables-responsive/css/datatables.responsive.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="pages/css/pages-icons.css" rel="stylesheet" type="text/css">
    <link class="main-stylesheet" href="pages/css/pages.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/controls.css" rel="stylesheet" type="text/css"/>
  </head>
  <body class="fixed-header  menu-pin">
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
            <span class="bg-secondary icon-thumbnail"><i class="fa fa-file-text"></i></span>
            <ul class="sub-menu">
              <li class="">
                <a href="clubs_list.php">Lista de contratos</a>
                <span class="bg-secondary icon-thumbnail"><i class="fa fa-list-ul"></i></span>
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
            <span class="icon-thumbnail"><i class="pg-note"></i></span>
            <ul class="sub-menu">
              <li class="">
                <a href="mandates_list.php">Lista de mandatos</a>
                <span class="icon-thumbnail"><i class="fa fa-list-ul"></i></span>
              </li>
              <<li class="">
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
                        <button type="button" onclick="location.href='clubs_list.php'" class="btn btn-primary btn-block btn-animated from-left pg pg-save">
                          <span>Guardar</span>
                        </button>
                        <button type="button" onclick="location.href='clubs_list.php'" class="btn btn-primary btn-block btn-animated from-left pg pg-close">
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
          <div class=" container-fluid   container-fixed-lg ">
            <!-- START card -->
            <div class="card card-transparent">
              <div class="card-header ">
                <div class="row h-100">
                  <div class="col-lg-6 col-xs-12 my-auto">
                    <div class="card-title">
                      <h5>Lista de Contratos de Clubes</h5>
                    </div>
                  </div>
                  <div class="col-lg-6 col-xs-12 my-auto">
                  <div class="float-right">
                        <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  class="btn2 dropdown-toggle btn-primary btn-cons btn-animated from-left pg pg-arrow_minimize">
                          <span>Adicionar</span>
                        </button>
                        <div class="dropdown-menu" style="width: 97.3438px; position: absolute; transform: translate3d(0px, -169px, 0px); will-change: transform; background-color: rgb(50, 130, 184);" x-placement="top-start">
                          <a class="dropdown-item" href="clubs_new_player.php">Jogador</a>
                          <a class="dropdown-item" href="clubs_new_coach.php">Treinador </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th style="width:1%" class="text-center">
                          <button class="btn btn-link btn-remove"><i class="pg-trash"></i>
                          </button>
                        </th>
                        <th style="width:20%; text-align: center; vertical-align: middle;">Nome</th>
                        <th style="width:17%; text-align: center; vertical-align: middle;">Data início</th>
                        <th style="width:17%; text-align: center; vertical-align: middle;">Data fim</th>
                        <th style="width:15%; text-align: center; vertical-align: middle;">Clube</th>
                        <th style="width:17%; text-align: center; vertical-align: middle;">Valor</th>
                        <th style="width:17%; text-align: center; vertical-align: middle;">Cláusala de Rescisão</th>
                      </tr>
                    </thead>
                    <tbody role="row" class="row_club" style="width:20%; text-align: center; vertical-align: middle;"></tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- END card -->
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
    <!-- END VENDOR JS -->
    <!-- BEGIN CORE TEMPLATE JS -->
    <script src="pages/js/pages.js"></script>
    <!-- END CORE TEMPLATE JS -->
    <!-- BEGIN PAGE LEVEL JS -->
    <script src="assets/js/scripts.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL JS -->
    <!-- BEGIN PAGE LEVEL JS -->
    <script src="assets/js/tables.js" type="text/javascript"></script>
    <script src="assets/js/scripts.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL JS -->
    <script src="js/toolkit.js"></script>
    <script src="js/controls.js"></script>
    <script src="js/default.js"></script>

    <script type='text/javascript'>
      $(document).ready(function () {
        list_club();
      });
    </script>
  </body>
</html>