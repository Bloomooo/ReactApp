import React from "react";
import "../styles/components/_summarywidget.scss";
const SummaryWidget = () => {
  return (
    <div className="summary-widget">
      <div className="summary-item">
        <h4>Total Utilisateurs</h4>
        <p>1,234</p>
      </div>
      <div className="summary-item">
        <h4>Taux de Croissance</h4>
        <p>5.4%</p>
      </div>
      <div className="summary-item">
        <h4>Transactions</h4>
        <p>987</p>
      </div>
    </div>
  );
};
export default SummaryWidget;
