jQuery.sap.declare("zktbldg.utils.formatter");
zktbldg.utils.formatter = {
  priceFormatted: function (e) {
    jQuery.sap.require("sap.ui.core.format.NumberFormat");
    var r = sap.ui.core.format.NumberFormat.getFloatInstance({
      maxFractionDigits: 2,
      // burada virgülden sonra kaç hane olsun anlamında ben sıfır dersem hiç olmaz
      groupingEnabled: true,
      groupingSeparator: ".",
      decimalSeparator: ",",
    });
    return r.format(e);
  },
  RBchange: function (Tip) {
    if (Tip == "0") {
      return "Success";
    } else {
      return "Warning";
    }
  },
  highlight: function (Tip) {
    if (Tip == "0") {
      return "Success";
    } else {
      return "Warning";
    }
  },
};
