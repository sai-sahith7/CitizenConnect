import "./Dashboard.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>{cookies.get("user").name}</h1>
    </div>
  );
}
