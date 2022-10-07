import "./LoadingSpiral.css";

export default function LoadingSpiral(props) {
  return (
    <div className="lds-circle">
      <div></div>
      <p>Loading...</p>
    </div>
  );
}
