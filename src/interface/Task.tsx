export interface Task {
  id: number;
  title: string;
  status: "À faire" | "En cours" | "Terminé";
}