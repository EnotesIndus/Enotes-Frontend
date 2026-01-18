export default function OutputBox({ output, error }) {
  return (
    <pre
      className="overflow-auto"
      style={{
        height: "73.7vh",
        background: "#111",
        color: error ? "red" : "#0f0",
        padding: "10px",
        margin: 0
      }}
    >
      {error || output}
    </pre>
  );
}
