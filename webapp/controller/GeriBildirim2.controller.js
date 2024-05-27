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
    "sap/m/TextArea",
    "sap/ui/core/library",
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
    TextArea,
    coreLibrary
  ) {
    "use strict";

    return Controller.extend("zktbldg.controller.GeriBildirim2", {
      onInit: function () {
        var oRouter = this.getRouter();
        oRouter
          .getRoute("geribildirim2")
          .attachMatched(this._onRouteMatched, this);
      },
      _onRouteMatched: function (oEvent) {
        var oArgs = oEvent.getParameter("arguments"); // bu hangisine tıklandığının bilgisini yakalıyor arguments kısmı
        this.id = oArgs.Id;
        this.tip = oArgs.Tip;

        if (this.id == "0") {
          var NotAdd = this.getView()
            .getModel("i18n")
            .getResourceBundle()
            .getText("NotAdd");

          this.getView().byId("page").setTitle(NotAdd);
          this.getView().byId("btn_send").setEnabled(true);
          this.getView().byId("TextAreaLong").setValue(null);
          this.getView().byId("GroupA").setSelectedIndex(0);
          this.getView().byId("counter").setText(null);
          this.RB = "0";
        } else {
          var Edit = this.getView()
            .getModel("i18n")
            .getResourceBundle()
            .getText("Edit");

          this.getView().byId("page").setTitle(Edit);
          this.getView().byId("btn_send").setEnabled(false);
          this._bindInfo(this.id);
        }
      },
      _bindInfo: function (ID) {
        var Tip = this.tip;
        var that = this;

        this.getView()
          .getModel()
          .read("/GetTextSet('" + ID + "')", {
            async: true,
            success: function (oData) {
              that.getView().byId("TextAreaLong").setValue(oData.Txtlong);

              var Text = that.getView().byId("TextAreaLong").getValue();
              var counter = Text.length;
              that.getView().byId("counter").setText(counter);

              if (Tip == "0") {
                that.getView().byId("GroupA").setSelectedIndex(0);
              } else {
                that.getView().byId("GroupA").setSelectedIndex(1);
              }
            },
            error: function (error) {
              debugger;
            },
          });
      },
      pressSend: function () {
        var Text = this.getView().byId("TextAreaLong").getValue();

        if (
          Text == undefined ||
          Text == "" ||
          Text == null ||
          Text.length < 5
        ) {
          var message = this.getView()
            .getModel("i18n")
            .getResourceBundle()
            .getText("FillAll");
          MessageBox.error(message, {});
        } else {
          this.RB = this.getView().byId("GroupA").getSelectedIndex();
          this.RB = String(this.RB);

          var oJsonData = {
            Id: this.id,
            Tip: this.RB,
            Txtlong: Text,
          };
          var that = this;
          sap.ui.core.BusyIndicator.show(0);
          that
            .getView()
            .getModel()
            .create("/CreateSet", oJsonData, {
              async: false,
              success: function (oData) {
                sap.ui.core.BusyIndicator.hide(0);
                var msg1 = that
                  .getView()
                  .getModel("i18n")
                  .getResourceBundle()
                  .getText("sent");
                MessageToast.show(msg1, {
                  closeOnBrowserNavigation: false,
                });
                that.onPageNavButtonPress();
              },
              error: function (error) {
                sap.ui.core.BusyIndicator.show(0);
                var msger = that
                  .getView()
                  .getModel("i18n")
                  .getResourceBundle()
                  .getText("Notsent");
                MessageToast.show(msger, {
                  closeOnBrowserNavigation: false,
                });
                that.onPageNavButtonPress();
              },
            });
          this.getView().getModel().refresh(true);
          this.getView().byId("TextAreaLong").setValue(null);
          this.getView().byId("GroupA").setSelectedIndex(0);
        }
      },
      changeText: function () {
        this.getView().byId("btn_send").setEnabled(true);

        var Text = this.getView().byId("TextAreaLong").getValue();
        var counter = Text.length;
        this.getView().byId("counter").setText(counter);
      },
      RBchange: function () {
        this.getView().byId("btn_send").setEnabled(true);
      },
      onPageNavButtonPress: function () {
        this.getRouter().navTo("geribildirim1", {
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
