import React from "react";
import "../styles/components/_dashboardcontent.scss";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import SummaryWidget from "./SummaryWidget";

const data = [
  { name: "Jan", ventes: 400 },
  { name: "Fév", ventes: 300 },
  { name: "Mar", ventes: 200 },
  { name: "Avr", ventes: 278 },
  { name: "Mai", ventes: 189 },
];

const dataPie = [
  { name: "Catégorie A", value: 400 },
  { name: "Catégorie B", value: 300 },
  { name: "Catégorie C", value: 300 },
  { name: "Catégorie D", value: 200 },
];

const dataVisits = [
  { name: "Réseaux Sociaux", visites: 1200 },
  { name: "Recherche Organique", visites: 3000 },
  { name: "Email", visites: 800 },
  { name: "Référence", visites: 1600 },
  { name: "Direct", visites: 900 },
];

const marketingData = [
  { nom: "Campagne A", tauxConversion: "3.5%", cpc: "0.45€", roi: "120%" },
  { nom: "Campagne B", tauxConversion: "2.8%", cpc: "0.50€", roi: "95%" },
  { nom: "Campagne C", tauxConversion: "4.2%", cpc: "0.40€", roi: "150%" },
];

const COLORS = ["#ff6363", "#63dfff", "#ffc163", "#63ff63"];

const DashboardContent = () => {
  return (
    <div className="dashboard-content">
      <h1>Tableau de Bord</h1>
      <SummaryWidget />
      <div className="dashboard-widgets">
        <div className="widget sales-widget">
          <h2>Graphique des Ventes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="ventes"
                stroke="#ff6363"
                strokeWidth={2}
                dot={{ stroke: "#ff6363", strokeWidth: 2 }}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="widget categories-widget">
          <h2>Répartition des Catégories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {dataPie.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="widget products-widget">
          <h2>Performance des Produits</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventes" fill="#ffc163" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Nouveaux widgets */}
        <div className="widget visits-widget">
          <h2>Tendances des Visites</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataVisits}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visites" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="widget new-widget">
          <h2>Performances des Campagnes Marketing</h2>
          <div className="marketing-performance">
            {marketingData.map((campagne, index) => (
              <div key={index} className="campagne">
                <h3>{campagne.nom}</h3>
                <p>Taux de Conversion: {campagne.tauxConversion}</p>
                <p>CPC: {campagne.cpc}</p>
                <p>ROI: {campagne.roi}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
