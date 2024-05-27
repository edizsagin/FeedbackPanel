sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/BusyIndicator",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History",
    "sap/ui/core/Core",
    "sap/ui/core/ID",
    "zktbldg/utils/formatter",
  ],

  function (
    Controller,
    MessageToast,
    JSONModel,
    MessageBox,
    BusyIndicator,
    Filter,
    FilterOperator,
    History,
    Core,
    ID,
    formatter
  ) {
    "use strict";

    return Controller.extend("zktbldg.controller.GeriBildirim1", {
      formatter: formatter,
      onInit: function () {
        var oRouter = this.getRouter();
        oRouter
          .getRoute("geribildirim1")
          .attachMatched(this._onRouteMatched, this);
      },
      _onRouteMatched: function () {
        this.getView().getModel().setSizeLimit(1000);

        this.getView().getModel().refresh(true);
      },
      onBeforeRebindTable: function (oEvent) {
        var oBindingParams = oEvent.getParameter("bindingParams");

        var cbTip = this.getView().byId("cbTip").getSelectedKey();
        if (cbTip) {
          oBindingParams.filters.push(
            new sap.ui.model.Filter(
              "Tip",
              sap.ui.model.FilterOperator.Contains,
              cbTip
            )
          );
        }
      },
      pressAdd: function () {
        this.getRouter().navTo("geribildirim2", {
          Id: "0",
          Tip: "0",
          Type: "DISPLAY",
        });
      },
      onColumnListItemPress: function (oEvent) {
        var source = oEvent.getSource().getBindingContext().getProperty();
        var ID = source.Id;
        var TIP = source.Tip;

        this.getRouter().navTo("geribildirim2", {
          Id: ID,
          Tip: TIP,
          Type: "DISPLAY",
        });
      },
      getMessage: function (msgName) {
        var message = this.getView()
          .getModel("i18n")
          .getResourceBundle()
          .getText(msgName);
        MessageToast.show(message, {
          width: "25em",
        });
      },
      getRouter: function () {
        return sap.ui.core.UIComponent.getRouterFor(this);
      },
    });
  }
);
