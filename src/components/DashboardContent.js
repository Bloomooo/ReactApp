// DashboardContent.js
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
} from "recharts";

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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DashboardContent = () => {
  return (
    <div>
      <div className="dashboard-content">
        <h1>Tableau de Bord</h1>
        <div className="dashboard-widgets">
          <div className="widget">
            <h2>Graphique des Ventes</h2>
            <LineChart width={600} height={300} data={data}>
              <Line type="monotone" dataKey="ventes" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>
          <div className="widget">
            <h2>Répartition des Catégories</h2>
            <PieChart width={400} height={400}>
              <Pie
                data={dataPie}
                cx={200}
                cy={200}
                outerRadius={60}
                fill="#8884d8"
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
          </div>
          {/* Ajoutez ici d'autres widgets si nécessaire */}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
